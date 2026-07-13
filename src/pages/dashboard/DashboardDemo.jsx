import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area
} from "recharts";
import { 
  TrendingUp, Users, Calendar, ShoppingBag, Landmark, Award, 
  AlertTriangle, ArrowUpRight, Compass, ShieldAlert, Sparkles, RefreshCw
} from "lucide-react";
import SEO from "../../components/SEO";
import { getCRMLeads, getBookings, getOrders } from "../../utils/db";
import { MOCK_PRODUCTS } from "../../data/mockData";

export default function DashboardDemo() {
  const [leads, setLeads] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadData = () => {
    setLeads(getCRMLeads());
    setBookings(getBookings());
    setOrders(getOrders());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("cart_updated", loadData);
    return () => window.removeEventListener("cart_updated", loadData);
  }, []);

  // Compute KPI card stats
  const totalCustomers = new Set(leads.map(l => l.email.toLowerCase())).size;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 3488; // seed standard mock baseline
  const totalBookings = bookings.length + 3; // seed baseline
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 899;

  // Chart 1: Monthly order trend
  const trendData = [
    { month: "Jan", Sales: 1800, Bookings: 5 },
    { month: "Feb", Sales: 2400, Bookings: 8 },
    { month: "Mar", Sales: 3100, Bookings: 12 },
    { month: "Apr", Sales: 2900, Bookings: 10 },
    { month: "May", Sales: 3900, Bookings: 15 },
    { month: "Jun", Sales: totalRevenue, Bookings: totalBookings }
  ];

  // Chart 2: Sales by category (Pie splits)
  const categoryData = [
    { name: "Skincare", value: 45 },
    { name: "Haircare", value: 25 },
    { name: "Wellness", value: 15 },
    { name: "Makeup", value: 10 },
    { name: "Personal Care", value: 5 }
  ];
  const COLORS = ["#D95C8A", "#B8A4E3", "#7FAF98", "#FAD4C0", "#8B6FCF"];

  // Chart 3: Customers by source (Bar splits)
  const getSourceCounts = () => {
    const counts = { Chat: 0, Booking: 0, Checkout: 0, Quiz: 0, Contact: 0, Newsletter: 0 };
    leads.forEach(l => {
      if (l.source.includes("Chat")) counts.Chat += 1;
      else if (l.source.includes("Booking")) counts.Booking += 1;
      else if (l.source.includes("Checkout")) counts.Checkout += 1;
      else if (l.source.includes("Quiz")) counts.Quiz += 1;
      else if (l.source.includes("Contact")) counts.Contact += 1;
      else if (l.source.includes("Newsletter")) counts.Newsletter += 1;
    });
    // Add default seeds if empty
    if (leads.length <= 4) {
      counts.Quiz += 4;
      counts.Chat += 2;
    }
    return [
      { name: "Beauty Quiz", Leads: counts.Quiz },
      { name: "Live Chat", Leads: counts.Chat },
      { name: "Checkout", Leads: counts.Checkout },
      { name: "Bookings", Leads: counts.Booking },
      { name: "Forms", Leads: counts.Contact },
      { name: "Newsletter", Leads: counts.Newsletter }
    ];
  };
  const sourceData = getSourceCounts();

  // Chart 4: Cart conversion funnel (Area stages)
  const funnelData = [
    { stage: "Product Views", Users: 1200 },
    { stage: "Add to Cart", Users: 450 },
    { stage: "Start Checkout", Users: 210 },
    { stage: "Order Placed", Users: totalOrders > 0 ? totalOrders * 12 : 36 }
  ];

  // Best selling products
  const bestSellers = MOCK_PRODUCTS.slice(0, 3);
  
  // Low stock alert products
  const lowStockProds = MOCK_PRODUCTS.filter(p => p.price < 400).slice(0, 2);

  return (
    <>
      <SEO 
        title="Business Analytics Dashboard"
        description="Lunara business operations. Review charts representing sales, leads distribution, and checkout funnels."
        canonicalPath="/dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-brand-borderLight pb-6 mb-8 text-center sm:text-left">
          <div className="space-y-1">
            <h1 className="font-serif font-bold text-3xl text-brand-textDark">Analytics Dashboard</h1>
            <p className="text-xs text-brand-textMuted">Evaluate monthly conversion funnels, category revenue, and lead performance.</p>
          </div>
          
          <div className="flex gap-2">
            <RouterLink 
              to="/crm"
              className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Users className="w-4 h-4" />
              <span>CRM Leads Manager</span>
            </RouterLink>
            <button 
              onClick={loadData}
              className="border border-brand-borderLight hover:border-brand-pink text-brand-textDark text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1 bg-white"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Stats</span>
            </button>
          </div>
        </div>

        {/* KPI Top Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total Customers", value: totalCustomers, icon: Users, color: "text-brand-pink bg-brand-blush" },
            { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "text-emerald-600 bg-emerald-50" },
            { label: "Revenue Demo", value: `₹${totalRevenue}`, icon: Landmark, color: "text-brand-purple bg-brand-purple/10" },
            { label: "Consultation Bookings", value: totalBookings, icon: Calendar, color: "text-amber-600 bg-amber-50" },
            { label: "Cart Conversion", value: `${totalOrders > 0 ? Math.round((totalOrders / 45) * 100) : 8}%`, icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
            { label: "Avg Order Value", value: `₹${avgOrderValue}`, icon: Award, color: "text-teal-600 bg-teal-50" }
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white border border-brand-borderLight p-4 rounded-2xl shadow-xs text-left flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[9.5px] uppercase font-bold text-brand-textMuted tracking-wider">{kpi.label}</span>
                <div className={`p-1.5 rounded-lg shrink-0 ${kpi.color}`}>
                  <kpi.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xl font-bold text-brand-textDark mt-3 leading-none">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Recharts Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 text-left">
          
          {/* Line Chart: Sales Trends */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs">
            <h3 className="font-serif font-bold text-brand-textDark text-base mb-4">Monthly Apothecary Revenue Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1E8EC" />
                  <XAxis dataKey="month" stroke="#786C75" fontSize={11} />
                  <YAxis stroke="#786C75" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Sales" stroke="#D95C8A" strokeWidth={2} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Bookings" stroke="#B8A4E3" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Lead Sources */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs">
            <h3 className="font-serif font-bold text-brand-textDark text-base mb-4">Customer Acquisition by Source</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1E8EC" />
                  <XAxis dataKey="name" stroke="#786C75" fontSize={10} />
                  <YAxis stroke="#786C75" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Leads" fill="#8B6FCF" radius={[4, 4, 0, 0]}>
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Sales splits */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs">
            <h3 className="font-serif font-bold text-brand-textDark text-base mb-4">Sales split by Category (%)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legends list */}
              <div className="space-y-2 text-xs">
                {categoryData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-brand-textMuted">
                    <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="font-semibold text-brand-textDark">{item.name}</span>
                    <span>({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Area Chart: Funnel stages */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs">
            <h3 className="font-serif font-bold text-brand-textDark text-base mb-4">Shopping Conversion Funnel</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1E8EC" />
                  <XAxis dataKey="stage" stroke="#786C75" fontSize={10} />
                  <YAxis stroke="#786C75" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="Users" stroke="#7FAF98" fill="#FCE8F0" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Dashboard Bottom Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          {/* Col 1: Best Sellers & Stock alerts */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-brand-textDark text-base border-b border-brand-borderLight pb-2">Catalog Integrity</h3>
            
            {/* Low stock alerts */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-brand-rose uppercase tracking-wider block">⚠️ Low Stock Alerts (Demo)</span>
              {lowStockProds.map(p => (
                <div key={p.id} className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-brand-textDark">{p.name}</p>
                    <p className="text-[10.5px] text-brand-textMuted">Stock count: 2 units remaining</p>
                  </div>
                  <span className="bg-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded font-bold">REORDER</span>
                </div>
              ))}
            </div>

            {/* Top Categories */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[10px] font-bold text-brand-textDark uppercase tracking-wider block">🏆 Top categories</span>
              <div className="space-y-1.5 text-xs text-brand-textMuted">
                <p className="flex justify-between"><span>1. Skincare (Serums)</span> <span className="font-bold text-brand-textDark">45% sales</span></p>
                <p className="flex justify-between"><span>2. Haircare (Rosemary Oil)</span> <span className="font-bold text-brand-textDark">25% sales</span></p>
                <p className="flex justify-between"><span>3. Wellness (Gummies)</span> <span className="font-bold text-brand-textDark">15% sales</span></p>
              </div>
            </div>
          </div>

          {/* Col 2: Recent bookings */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-brand-borderLight pb-2">
              <h3 className="font-serif font-bold text-brand-textDark text-base">Recent Bookings</h3>
              <RouterLink to="/crm" className="text-[10px] uppercase font-bold text-brand-pink hover:underline">View CRM</RouterLink>
            </div>
            
            {bookings.length === 0 ? (
              <p className="text-xs text-brand-textMuted py-4">No custom bookings registered yet.</p>
            ) : (
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {bookings.slice(0, 3).map(b => (
                  <div key={b.id} className="text-xs space-y-0.5 border-b border-brand-borderLight/30 pb-2 last:border-b-0">
                    <p className="font-bold text-brand-textDark">{b.name} <span className="text-[9.5px] font-mono text-brand-textMuted">({b.id})</span></p>
                    <p className="text-[10.5px] text-brand-textMuted capitalize">{b.type.replace("-", " ")}</p>
                    <p className="text-[10px] text-brand-pink font-semibold">📅 {b.preferredDate} at {b.preferredTime}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Col 3: Recent orders */}
          <div className="bg-white border border-brand-borderLight p-6 rounded-3xl shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-brand-borderLight pb-2">
              <h3 className="font-serif font-bold text-brand-textDark text-base">Recent Orders</h3>
              <RouterLink to="/crm" className="text-[10px] uppercase font-bold text-brand-pink hover:underline">View CRM</RouterLink>
            </div>
            
            {orders.length === 0 ? (
              <p className="text-xs text-brand-textMuted py-4">No checkout orders registered yet.</p>
            ) : (
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {orders.slice(0, 3).map(o => (
                  <div key={o.id} className="text-xs space-y-0.5 border-b border-brand-borderLight/30 pb-2 last:border-b-0 flex justify-between items-center gap-2">
                    <div>
                      <p className="font-bold text-brand-textDark">{o.customer.name}</p>
                      <p className="text-[10.5px] text-brand-textMuted font-mono">{o.id}</p>
                      <p className="text-[10px] text-brand-textMuted">{new Date(o.dateCreated).toLocaleDateString()}</p>
                    </div>
                    <span className="font-bold text-brand-pink shrink-0">₹{o.total}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Disclaimer alert */}
        <div className="bg-brand-cream/15 border border-brand-borderLight p-4 rounded-2xl flex items-start gap-2.5 mt-8 max-w-xl mx-auto text-left">
          <ShieldAlert className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
          <p className="text-[10px] text-brand-textMuted leading-normal">
            <strong>Analytics Sandbox Alert:</strong> Dashboard visualizations render using mock constants combined with active LocalStorage logs from booking scheduler forms and checkout carts.
          </p>
        </div>

      </div>
    </>
  );
}
