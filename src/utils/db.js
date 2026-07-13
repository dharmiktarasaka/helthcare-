// LocalStorage DB Helpers for Lunara Health & Beauty

const KEYS = {
  CART: "lunara_cart",
  WISHLIST: "lunara_wishlist",
  COMPARE: "lunara_compare",
  BOOKINGS: "lunara_bookings",
  ORDERS: "lunara_orders",
  SUBSCRIBERS: "lunara_subscribers",
  LEADS: "lunara_leads",
  QUIZ: "lunara_quiz_results",
};

// CART OPERATIONS
export const getCart = () => {
  return JSON.parse(localStorage.getItem(KEYS.CART)) || [];
};

export const addToCart = (product, quantity = 1, size = null) => {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id && item.selectedSize === size);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
      selectedSize: size || product.size || "Standard"
    });
  }
  
  localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart_updated"));
  return cart;
};

export const updateCartQuantity = (productId, quantity, size = null) => {
  let cart = getCart();
  cart = cart.map(item => {
    if (item.id === productId && item.selectedSize === size) {
      return { ...item, quantity: Math.max(1, quantity) };
    }
    return item;
  });
  localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart_updated"));
  return cart;
};

export const removeFromCart = (productId, size = null) => {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
  localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart_updated"));
  return cart;
};

export const clearCart = () => {
  localStorage.setItem(KEYS.CART, JSON.stringify([]));
  window.dispatchEvent(new Event("cart_updated"));
};

// WISHLIST OPERATIONS
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(KEYS.WISHLIST)) || [];
};

export const toggleWishlist = (product) => {
  const wishlist = getWishlist();
  const index = wishlist.findIndex(item => item.id === product.id);
  
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(product);
  }
  
  localStorage.setItem(KEYS.WISHLIST, JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlist_updated"));
  return wishlist;
};

export const isInWishlist = (productId) => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

export const clearWishlist = () => {
  localStorage.setItem(KEYS.WISHLIST, JSON.stringify([]));
  window.dispatchEvent(new Event("wishlist_updated"));
};

// COMPARE OPERATIONS
export const getCompareList = () => {
  return JSON.parse(localStorage.getItem(KEYS.COMPARE)) || [];
};

export const addToCompare = (product) => {
  const compare = getCompareList();
  if (compare.some(item => item.id === product.id)) return { success: false, message: "Product already in comparison list" };
  if (compare.length >= 4) return { success: false, message: "You can compare a maximum of 4 products" };
  
  compare.push(product);
  localStorage.setItem(KEYS.COMPARE, JSON.stringify(compare));
  window.dispatchEvent(new Event("compare_updated"));
  return { success: true, list: compare };
};

export const removeFromCompare = (productId) => {
  let compare = getCompareList();
  compare = compare.filter(item => item.id !== productId);
  localStorage.setItem(KEYS.COMPARE, JSON.stringify(compare));
  window.dispatchEvent(new Event("compare_updated"));
  return compare;
};

export const isInCompare = (productId) => {
  const compare = getCompareList();
  return compare.some(item => item.id === productId);
};

export const clearCompare = () => {
  localStorage.setItem(KEYS.COMPARE, JSON.stringify([]));
  window.dispatchEvent(new Event("compare_updated"));
};

// BOOKINGS OPERATIONS
export const getBookings = () => {
  return JSON.parse(localStorage.getItem(KEYS.BOOKINGS)) || [];
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  const mockBooking = {
    ...booking,
    id: "BKG-" + Math.floor(100000 + Math.random() * 900000),
    dateCreated: new Date().toISOString(),
  };
  bookings.push(mockBooking);
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));

  // Also push to CRM leads
  addCRMLead({
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    source: "Booking",
    interest: booking.type,
    concern: booking.concern || "General",
    status: "Consultation Booked",
    notes: `Booked slot: ${booking.preferredDate} at ${booking.preferredTime}. Message: ${booking.message || "None"}`,
    orderValue: 0
  });

  return mockBooking;
};

// ORDERS OPERATIONS
export const getOrders = () => {
  return JSON.parse(localStorage.getItem(KEYS.ORDERS)) || [];
};

export const saveOrder = (order) => {
  const orders = getOrders();
  const mockOrder = {
    ...order,
    id: "LNR-" + Math.floor(100000 + Math.random() * 900000),
    dateCreated: new Date().toISOString(),
  };
  orders.push(mockOrder);
  localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));

  // Also push to CRM leads
  addCRMLead({
    name: order.customer.name,
    email: order.customer.email,
    phone: order.customer.phone,
    source: "Checkout",
    interest: order.items.map(item => item.name).join(", "),
    concern: "Purchase",
    status: "Order Placed",
    notes: `Placed order ${mockOrder.id} containing ${order.items.length} items. Total: ₹${order.total}`,
    orderValue: order.total
  });

  return mockOrder;
};

// SUBSCRIBERS
export const getSubscribers = () => {
  return JSON.parse(localStorage.getItem(KEYS.SUBSCRIBERS)) || [];
};

export const addSubscriber = (subscriber) => {
  const subs = getSubscribers();
  if (subs.some(s => s.email === subscriber.email)) return false;
  
  const mockSub = {
    ...subscriber,
    id: "SUB-" + Math.floor(10000 + Math.random() * 90000),
    dateCreated: new Date().toISOString(),
  };
  subs.push(mockSub);
  localStorage.setItem(KEYS.SUBSCRIBERS, JSON.stringify(subs));

  // Push to CRM
  addCRMLead({
    name: subscriber.name || "Subscriber",
    email: subscriber.email,
    phone: "-",
    source: "Newsletter",
    interest: "Weekly updates",
    concern: "Newsletter",
    status: "New",
    notes: "Subscribed to newsletter updates.",
    orderValue: 0
  });

  return true;
};

// CRM LEADS
export const getCRMLeads = () => {
  const stored = localStorage.getItem(KEYS.LEADS);
  if (stored) return JSON.parse(stored);
  
  // Seed initial CRM Leads if empty
  const defaultLeads = [
    {
      id: "L-101",
      name: "Sneha Patel",
      email: "sneha.p@gmail.com",
      phone: "+91 98765 43210",
      source: "Contact Form",
      interest: "Skincare",
      concern: "Dry Skin",
      product: "Ceramide Barrier Defense Moisturizer",
      status: "New",
      notes: "Enquired about suitable creams for severe dry patches.",
      orderValue: 0,
      date: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: "L-102",
      name: "Aarav Shah",
      email: "aarav.shah@yahoo.com",
      phone: "+91 87654 32109",
      source: "Live Chat",
      interest: "Haircare",
      concern: "Hair Fall",
      product: "Rosemary & Onion Hair Growth Oil",
      status: "Contacted",
      notes: "Asked about how to apply rosemary oil overnight.",
      orderValue: 0,
      date: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: "L-103",
      name: "Divya Sharma",
      email: "divya@gmail.com",
      phone: "+91 76543 21098",
      source: "Booking",
      interest: "Skin Consultation",
      concern: "Acne and Breakouts",
      product: "Salicylic Acid Clarifying Cleanser",
      status: "Consultation Booked",
      notes: "Booked visual skin check slot.",
      orderValue: 0,
      date: new Date(Date.now() - 3600000 * 6).toISOString()
    },
    {
      id: "L-104",
      name: "Meera Vyas",
      email: "meera.vyas@gmail.com",
      phone: "+91 95554 12345",
      source: "Checkout",
      interest: "Hyaluronic Acid Serum, Tinted Balm",
      concern: "Purchase",
      product: "-",
      status: "Order Placed",
      notes: "Placed order LNR-492948. Standard delivery.",
      orderValue: 1198,
      date: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ];
  localStorage.setItem(KEYS.LEADS, JSON.stringify(defaultLeads));
  return defaultLeads;
};

export const addCRMLead = (lead) => {
  const leads = getCRMLeads();
  const newLead = {
    id: "L-" + Math.floor(100 + Math.random() * 900),
    product: "-",
    date: new Date().toISOString(),
    ...lead
  };
  leads.unshift(newLead);
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  return newLead;
};

export const updateLeadStatus = (leadId, newStatus) => {
  let leads = getCRMLeads();
  leads = leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l);
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  return leads;
};

export const addLeadNote = (leadId, note) => {
  let leads = getCRMLeads();
  leads = leads.map(l => {
    if (l.id === leadId) {
      const existingNotes = l.notes ? l.notes + " | " : "";
      return { ...l, notes: existingNotes + note };
    }
    return l;
  });
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  return leads;
};

export const deleteLead = (leadId) => {
  let leads = getCRMLeads();
  leads = leads.filter(l => l.id !== leadId);
  localStorage.setItem(KEYS.LEADS, JSON.stringify(leads));
  return leads;
};

// QUIZ RESULTS
export const saveQuizResults = (results) => {
  localStorage.setItem(KEYS.QUIZ, JSON.stringify(results));
  
  // Create lead from quiz
  addCRMLead({
    name: results.name || "Quiz Taker",
    email: results.email || "quiz@visitor.com",
    phone: results.phone || "-",
    source: "Beauty Quiz",
    interest: results.recommendations ? results.recommendations.map(p => p.name).join(", ") : "Quiz Recommendations",
    concern: results.skinConcern || results.hairConcern || "General Quiz",
    status: "Product Recommended",
    notes: `Quiz answers: Skin: ${results.skinType || "-"}, Concern: ${results.skinConcern || "-"}, Hair: ${results.hairType || "-"}, Hair Concern: ${results.hairConcern || "-"}`,
    orderValue: 0
  });
};

export const getQuizResults = () => {
  return JSON.parse(localStorage.getItem(KEYS.QUIZ)) || null;
};

// RESET DEMO DATA
export const resetCRMData = () => {
  localStorage.removeItem(KEYS.CART);
  localStorage.removeItem(KEYS.WISHLIST);
  localStorage.removeItem(KEYS.COMPARE);
  localStorage.removeItem(KEYS.BOOKINGS);
  localStorage.removeItem(KEYS.ORDERS);
  localStorage.removeItem(KEYS.SUBSCRIBERS);
  localStorage.removeItem(KEYS.QUIZ);
  localStorage.removeItem(KEYS.LEADS);
  
  // Trigger events
  window.dispatchEvent(new Event("cart_updated"));
  window.dispatchEvent(new Event("wishlist_updated"));
  window.dispatchEvent(new Event("compare_updated"));
  
  // Reinitialize default leads
  getCRMLeads();
};
