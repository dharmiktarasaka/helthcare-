import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, Calendar, ShoppingBag, Mail, MessageSquare, Search, 
  Filter, Download, Trash2, Edit3, X, RefreshCw, Layers, Sparkles
} from "lucide-react";
import SEO from "../../components/SEO";
import { 
  getCRMLeads, updateLeadStatus, addLeadNote, deleteLead, resetCRMData, 
  getBookings, getOrders, getSubscribers 
} from "../../utils/db";

export default function CrmDemo() {
  const [leads, setLeads] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);
  
  // Filters & search
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected lead for detail view drawer
  const [selectedLead, setSelectedLead] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const loadData = () => {
    setLeads(getCRMLeads());
    setBookingsCount(getBookings().length);
    setOrdersCount(getOrders().length);
    setSubscribersCount(getSubscribers().length);
  };

  useEffect(() => {
    loadData();
    window.addEventListener("cart_updated", loadData); // reload on updates
    return () => window.removeEventListener("cart_updated", loadData);
  }, []);

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to clear all custom bookings/orders and reset leads to defaults?")) {
      resetCRMData();
      loadData();
      setSelectedLead(null);
    }
  };

  const handleUpdateStatus = (id, status) => {
    const updated = updateLeadStatus(id, status);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => ({ ...prev, status }));
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedLead) return;
    const updated = addLeadNote(selectedLead.id, noteInput.trim());
    setLeads(updated);
    
    // Update local selected state
    const currentLead = updated.find(l => l.id === selectedLead.id);
    setSelectedLead(currentLead);
    setNoteInput("");
  };

  const handleDeleteLead = (id) => {
    if (window.confirm("Delete this lead record permanently?")) {
      const updated = deleteLead(id);
      setLeads(updated);
      setSelectedLead(null);
    }
  };

  // Filtered Leads list
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.phone.includes(searchQuery);
    
    const matchesSource = sourceFilter === "all" || l.source === sourceFilter;
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;

    return matchesSearch && matchesSource && matchesStatus;
  });

  // Mock Export CSV
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Email,Phone,Source,Interest,Concern,Status,Date,Value\r\n";
    
    filteredLeads.forEach(l => {
      const row = `${l.id},${l.name},${l.email},${l.phone},${l.source},"${l.interest}","${l.concern}",${l.status},${l.date},${l.orderValue || 0}`;
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lunara_crm_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEO 
        title="CRM Business Portal"
        description="Lunara customer relationship logs. Review leads, newsletter signups, bookings, and customer order histories."
        canonicalPath="/crm"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-brand-borderLight pb-6 mb-8 text-center sm:text-left">
          <div className="space-y-1">
            <h1 className="font-serif font-bold text-3xl text-brand-textDark">Lunara CRM Portal</h1>
            <p className="text-xs text-brand-textMuted">Monitor customer registrations, skin consultation schedules, and transaction logs.</p>
          </div>
          
          <div className="flex gap-2">
            <Link 
              to="/dashboard"
              className="bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Layers className="w-4 h-4" />
              <span>Business Analytics</span>
            </Link>
            <button 
              onClick={handleResetData}
              className="border border-brand-rose/30 hover:bg-brand-rose/10 text-brand-rose text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Top KPI Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", count: leads.length, color: "border-l-brand-pink text-brand-pink", desc: "Form & chat entries" },
            { label: "Consultation Bookings", count: bookingsCount, color: "border-l-brand-purple text-brand-purple", desc: "Scheduled meetings" },
            { label: "Demo Orders Placed", count: ordersCount, color: "border-l-emerald-600 text-emerald-600", desc: "Checkout transactions" },
            { label: "Subscribers", count: subscribersCount, color: "border-l-amber-500 text-amber-500", desc: "Newsletter emails" }
          ].map((kpi, i) => (
            <div key={i} className={`bg-white border border-brand-borderLight border-l-4 ${kpi.color} p-4 rounded-xl shadow-xs text-left`}>
              <span className="text-[10px] uppercase font-bold text-brand-textMuted tracking-wider">{kpi.label}</span>
              <p className="text-2xl font-bold text-brand-textDark mt-1 leading-none">{kpi.count}</p>
              <span className="text-[9px] text-brand-textMuted block mt-1">{kpi.desc}</span>
            </div>
          ))}
        </div>

        {/* Filters Controls Panel */}
        <div className="bg-white border border-brand-borderLight p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between shadow-xs mb-6 text-xs text-brand-textDark font-semibold">
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <input 
                type="text" 
                placeholder="Search name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-brand-borderLight rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink"
              />
              <Search className="w-4 h-4 text-brand-textMuted absolute left-3 top-2.5" />
            </div>

            {/* Source Filter */}
            <div className="flex items-center gap-1.5">
              <span>Source:</span>
              <select 
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="border border-brand-borderLight px-2.5 py-1.5 rounded-lg focus:outline-none bg-white font-bold"
              >
                <option value="all">All Sources</option>
                <option value="Contact Form">Contact Form</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Live Chat">Live Chat</option>
                <option value="Booking">Booking Slot</option>
                <option value="Checkout">Checkout</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Beauty Quiz">Beauty Quiz</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span>Status:</span>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-brand-borderLight px-2.5 py-1.5 rounded-lg focus:outline-none bg-white font-bold"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Consultation Booked">Consultation Booked</option>
                <option value="Product Recommended">Product Recommended</option>
                <option value="Order Placed">Order Placed</option>
              </select>
            </div>
          </div>

          {/* Export CSV trigger */}
          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto flex items-center justify-center gap-1 bg-brand-pink hover:bg-brand-rose text-white font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>

        </div>

        {/* Content lists */}
        {filteredLeads.length === 0 ? (
          <div className="bg-brand-cream/10 border border-brand-borderLight rounded-3xl p-12 text-center text-xs text-brand-textMuted">
            No customer lead records matched your filter choices. Try changing search strings or reset datasets.
          </div>
        ) : (
          /* RESPONSIVE TABLE / CARDS */
          <div className="space-y-4">
            
            {/* Desktop Table View */}
            <div className="hidden md:block border border-brand-borderLight rounded-2xl overflow-hidden shadow-xs bg-white">
              <table className="w-full text-left border-collapse text-xs text-brand-textDark">
                <thead>
                  <tr className="bg-brand-cream/10 border-b border-brand-borderLight font-bold uppercase tracking-wider text-[10px] text-brand-textMuted">
                    <th className="p-4 w-20">ID</th>
                    <th className="p-4 w-40">Customer Details</th>
                    <th className="p-4 w-32">Source</th>
                    <th className="p-4 w-48">Interests / Concerns</th>
                    <th className="p-4 w-28">Total Val</th>
                    <th className="p-4 w-36">Status</th>
                    <th className="p-4 w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-borderLight">
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-brand-cream/5 transition-colors">
                      <td className="p-4 font-mono font-semibold">{lead.id}</td>
                      <td className="p-4">
                        <p className="font-bold">{lead.name}</p>
                        <p className="text-[10px] text-brand-textMuted">{lead.email}</p>
                        <p className="text-[10px] text-brand-textMuted">{lead.phone}</p>
                      </td>
                      <td className="p-4">
                        <span className="bg-brand-blush/60 text-brand-rose px-2 py-0.5 rounded font-semibold text-[10px] border border-brand-rose/5">{lead.source}</span>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold line-clamp-1">{lead.interest}</p>
                        <p className="text-[10.5px] text-brand-textMuted italic mt-0.5">Concern: {lead.concern}</p>
                      </td>
                      <td className="p-4 font-bold text-brand-pink">
                        {lead.orderValue > 0 ? `₹${lead.orderValue}` : "-"}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className={`border px-2 py-1 rounded text-[10.5px] font-bold focus:outline-none ${
                            lead.status === "Order Placed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            lead.status === "Consultation Booked" ? "bg-purple-50 text-purple-700 border-purple-200" :
                            lead.status === "New" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Consultation Booked">Consultation Booked</option>
                          <option value="Product Recommended">Product Recommended</option>
                          <option value="Order Placed">Order Placed</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-1 text-brand-purple hover:text-brand-pink"
                            title="Edit notes/details"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1 text-brand-textMuted hover:text-brand-rose"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card list View */}
            <div className="grid grid-cols-1 gap-4 md:hidden text-left">
              {filteredLeads.map(lead => (
                <div key={lead.id} className="bg-white border border-brand-borderLight p-4 rounded-xl shadow-xs space-y-3">
                  <div className="flex justify-between items-center border-b border-brand-borderLight pb-2">
                    <span className="font-mono font-bold text-brand-textMuted">{lead.id}</span>
                    <span className="bg-brand-blush text-brand-rose text-[9px] font-bold px-2 py-0.5 rounded">{lead.source}</span>
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-brand-textDark text-sm">{lead.name}</p>
                    <p className="text-brand-textMuted">{lead.email} • {lead.phone}</p>
                    <p className="pt-1.5"><strong>Interest:</strong> {lead.interest}</p>
                    <p className="text-brand-textMuted">Concern: {lead.concern}</p>
                    {lead.orderValue > 0 && <p className="text-brand-pink font-bold">Value: ₹{lead.orderValue}</p>}
                  </div>

                  <div className="pt-2 border-t border-brand-borderLight flex justify-between items-center text-xs">
                    <span className="text-[10px] font-bold text-brand-textMuted uppercase">Status: {lead.status}</span>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        className="text-brand-purple font-bold text-[11px]"
                      >
                        Notes / Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-brand-rose font-bold text-[11px]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* LEAD LOGS DETAILS DRAWER PANEL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end font-sans text-left">
          
          {/* Drawer backdrop */}
          <div 
            onClick={() => setSelectedLead(null)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Drawer panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 p-6 flex flex-col justify-between overflow-y-auto border-l border-brand-borderLight">
            <div className="space-y-6">
              
              <div className="flex justify-between items-center border-b border-brand-borderLight pb-4">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase text-brand-textMuted">{selectedLead.id}</span>
                  <h3 className="font-serif font-bold text-brand-textDark text-xl mt-0.5">Lead Details</h3>
                </div>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-1 hover:text-brand-pink"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Lead properties info */}
              <div className="space-y-3.5 text-xs text-brand-textDark">
                <p><strong>Customer Name:</strong> {selectedLead.name}</p>
                <p><strong>Email Address:</strong> {selectedLead.email}</p>
                <p><strong>Phone Number:</strong> {selectedLead.phone}</p>
                <p><strong>Lead Source:</strong> <span className="bg-brand-blush text-brand-rose px-2 py-0.5 rounded text-[10px]">{selectedLead.source}</span></p>
                <p><strong>Product Interest:</strong> {selectedLead.interest}</p>
                <p><strong>Primary Concern:</strong> {selectedLead.concern}</p>
                <p><strong>Submission Date:</strong> {new Date(selectedLead.date).toLocaleString("en-IN")}</p>
                {selectedLead.orderValue > 0 && <p className="text-brand-pink font-bold"><strong>Demo Order Value:</strong> ₹{selectedLead.orderValue}</p>}
                
                {/* Notes logs */}
                <div className="space-y-2 border-t border-brand-borderLight pt-4">
                  <p className="font-bold text-brand-textDark uppercase text-[10px] tracking-wider">Historical Logs / Notes:</p>
                  <div className="bg-brand-cream/15 p-3 rounded-lg border border-brand-borderLight leading-relaxed italic text-[11.5px] text-brand-textMuted max-h-36 overflow-y-auto divide-y divide-brand-borderLight/35 pr-1.5 scrollbar-thin">
                    {selectedLead.notes ? selectedLead.notes.split(" | ").map((note, noteIdx) => (
                      <p key={noteIdx} className="py-1.5 first:pt-0">{note}</p>
                    )) : "No additional logs entered yet."}
                  </div>
                </div>
              </div>

            </div>

            {/* Note addition form & Status updating */}
            <div className="border-t border-brand-borderLight pt-6 mt-6 space-y-4">
              
              {/* Note addition */}
              <form onSubmit={handleAddNote} className="space-y-2.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark">Add Note / Log Entry</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Enter visual update note..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="w-full border border-brand-borderLight rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-brand-pink hover:bg-brand-rose text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              </form>

              {/* Status Update Quick */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-textDark">Change Lead Status</label>
                <div className="flex flex-wrap gap-1.5">
                  {["New", "Contacted", "Consultation Booked", "Product Recommended", "Order Placed"].map(st => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-all ${
                        selectedLead.status === st 
                          ? "bg-brand-pink border-brand-pink text-white shadow-xs" 
                          : "border-brand-borderLight text-brand-textMuted hover:border-brand-pink"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 justify-center pt-2 text-[10px] text-brand-textMuted border-t border-brand-borderLight/30">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                <span>Logs update instantly in local cookie sets.</span>
              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
