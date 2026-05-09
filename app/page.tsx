'use client';

import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { 
  LayoutDashboard, Megaphone, Receipt, RefreshCw, Settings, 
  Activity, MousePointerClick, DollarSign, Wallet, Menu, Bell,
  TrendingUp, CheckCircle2, Clock, AlertCircle, Database, Users, LogOut, Lock,
  PiggyBank, CreditCard, ArrowDownRight, Building2, ChevronRight, Search,
  TrendingDown, Percent, Calculator, History, ShieldCheck, ExternalLink
} from 'lucide-react';

// ==========================================
// DATA MOCKUP (Simulasi Database BerkahHub)
// ==========================================

const globalStats = {
  totalManagementFee: 15450000,
  totalTeamSpend: 35000000,
  totalGlobalCommission: 85000000,
};

const teamMembers = [
  { id: '1', name: 'Andi (Media Buyer)', saldoIklan: 1250000, spendHariIni: 450000, komisi: 2500000, status: 'Active' },
  { id: '2', name: 'Siti (Media Buyer)', saldoIklan: 800000, spendHariIni: 300000, komisi: 1800000, status: 'Active' },
  { id: '3', name: 'Budi (Admin)', saldoIklan: 5000000, spendHariIni: 1200000, komisi: 7500000, status: 'Active' },
];

const performanceData = [
  { name: 'Sen', spend: 400, profit: 2400 },
  { name: 'Sel', spend: 300, profit: 1398 },
  { name: 'Rab', spend: 200, profit: 9800 },
  { name: 'Kam', spend: 278, profit: 3908 },
  { name: 'Jum', spend: 189, profit: 4800 },
  { name: 'Sab', spend: 239, profit: 3800 },
  { name: 'Min', spend: 349, profit: 4300 },
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'member'>('admin');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Mencegah error SSR pada Recharts
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (role: 'admin' | 'member', name: string) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    setActiveTab(role === 'admin' ? 'admin-panel' : 'overview');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // --- UI: LOGIN PAGE ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-6 font-sans antialiased">
        <div className="bg-white max-w-md w-full rounded-[2.5rem] shadow-2xl border border-white overflow-hidden transition-all duration-500">
          <div className="bg-slate-900 p-12 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
               <div className="absolute rotate-45 -top-10 -left-10 w-40 h-40 bg-indigo-500 blur-3xl"></div>
               <div className="absolute rotate-45 -bottom-10 -right-10 w-40 h-40 bg-indigo-500 blur-3xl"></div>
            </div>
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/20 rotate-3">
              <Building2 size={40} className="-rotate-3" />
            </div>
            <h1 className="text-4xl font-black mb-2 tracking-tighter">Berkah<span className="text-indigo-400">Hub</span></h1>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Premium Ads Management</p>
          </div>
          <div className="p-10 space-y-4">
            <button 
              onClick={() => handleLogin('admin', 'Budi Management')} 
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-2xl transition-all font-black shadow-xl shadow-indigo-100 group uppercase text-xs tracking-widest"
            >
              <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" /> Login Management
            </button>
            <button 
              onClick={() => handleLogin('member', 'Andi Tim Buyer')} 
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 p-5 rounded-2xl transition-all font-black group uppercase text-xs tracking-widest"
            >
              <Users size={20} className="group-hover:scale-110 transition-transform" /> Login Media Buyer
            </button>
          </div>
          <div className="pb-8 text-center border-t border-slate-50 pt-6">
            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">Built for Vercel Ecosystem • v2.5</p>
          </div>
        </div>
      </div>
    );
  }

  // --- UI: DASHBOARD ---
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden antialiased">
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 bg-slate-900 text-slate-400 flex flex-col shrink-0 z-30 shadow-2xl relative`}>
        <div className="h-24 flex items-center px-8 border-b border-slate-800/50 text-white font-black text-2xl tracking-tighter italic">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white italic shadow-lg shadow-indigo-500/20">B</div>
              <span>BerkahHub</span>
            </div>
          ) : (
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto text-white italic shadow-lg shadow-indigo-500/20">B</div>
          )}
        </div>
        
        <nav className="flex-1 p-6 space-y-2 mt-4 font-black uppercase text-[10px] tracking-widest">
          {userRole === 'admin' && (
            <SidebarItem id="admin-panel" icon={<Building2 size={20} />} label="Global Agency" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} isAdmin />
          )}
          <SidebarItem id="overview" icon={<LayoutDashboard size={20} />} label="Overview Saya" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
          <SidebarItem id="deposit" icon={<Wallet size={20} />} label="Deposit & Pajak" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
          <SidebarItem id="ads-report" icon={<Megaphone size={20} />} label="Laporan Iklan" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
          <SidebarItem id="history" icon={<History size={20} />} label="Riwayat Bagi Hasil" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
        </nav>

        <div className="p-6 border-t border-slate-800/50">
          <div className={`mb-4 flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl ${!isSidebarOpen && 'justify-center'}`}>
             <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-indigo-500/20">{userName.charAt(0)}</div>
             {isSidebarOpen && <div className="truncate"><p className="text-xs font-black text-white truncate uppercase tracking-tighter">{userName}</p><p className="text-[10px] text-indigo-400 uppercase font-black">{userRole}</p></div>}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 text-rose-400 p-4 w-full hover:bg-rose-500/10 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest">
            <LogOut size={20} /> {isSidebarOpen && "Keluar"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* HEADER */}
        <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 shrink-0 z-20 sticky top-0">
          <div className="flex items-center gap-8">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 transition-all border border-slate-100">
              <Menu size={24}/>
            </button>
            <div>
               <h1 className="font-black text-2xl text-slate-800 tracking-tighter uppercase italic leading-none">{activeTab.replace('-', ' ')}</h1>
               <div className="flex items-center gap-2 mt-1.5">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Real-time Data Synchronized</p>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Membership Status</span>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 uppercase italic shadow-sm shadow-emerald-500/10">
                   Verified {userRole} Account
                </span>
             </div>
             <button className="p-3.5 bg-white text-slate-400 rounded-2xl hover:text-indigo-600 transition-all border border-slate-100 shadow-sm relative group">
               <Bell size={20} className="group-hover:rotate-12 transition-transform" />
               <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
             </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-auto p-10 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto space-y-10 pb-20">
            
            {/* VIEW: ADMIN GLOBAL PANEL */}
            {activeTab === 'admin-panel' && userRole === 'admin' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatCard title="Total Management Fee (30%)" value="Rp 15.450.000" icon={<Building2 size={28}/>} color="text-indigo-600" bgColor="bg-indigo-50" />
                  <StatCard title="Total Ad Spend Team" value="Rp 35.000.000" icon={<Activity size={28}/>} color="text-rose-600" bgColor="bg-rose-50" />
                  <StatCard title="Total Commission Gross" value="Rp 85.000.000" icon={<DollarSign size={28}/>} color="text-emerald-600" bgColor="bg-emerald-50" />
                </div>
                
                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden group">
                   <div className="p-10 border-b border-slate-100 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="font-black text-slate-800 text-xl uppercase italic tracking-tighter">Team Profit-Share Summary</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Automatic 30% Management Cut Deducted from Net Profit</p>
                    </div>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-6 py-3 rounded-2xl hover:bg-indigo-100 transition-all flex items-center gap-2">
                       <Database size={16} /> Export Master Ledger
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                        <tr>
                          <th className="px-10 py-6">Identity</th>
                          <th className="px-10 py-6 text-right">Ad Balance</th>
                          <th className="px-10 py-6 text-right">Comm. Revenue</th>
                          <th className="px-10 py-6 text-right font-black text-indigo-600">Mgmt Cut (30%)</th>
                          <th className="px-10 py-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {teamMembers.map(member => (
                          <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-10 py-8">
                               <p className="font-black text-slate-700 uppercase italic tracking-tighter text-base">{member.name}</p>
                               <div className="flex items-center gap-1.5 mt-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Partner</span>
                               </div>
                            </td>
                            <td className="px-10 py-8 text-right font-black text-slate-600">Rp {member.saldoIklan.toLocaleString('id-ID')}</td>
                            <td className="px-10 py-8 text-right font-black text-slate-600 uppercase">Rp {member.komisi.toLocaleString('id-ID')}</td>
                            <td className="px-10 py-8 text-right text-indigo-600 font-black text-xl italic tracking-tighter">
                               Rp {(member.komisi * 0.3).toLocaleString('id-ID')}
                            </td>
                            <td className="px-10 py-8 text-right">
                               <button className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                  <ChevronRight size={18} />
                               </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: PERSONAL OVERVIEW (MEMBER) */}
            {activeTab === 'overview' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatCard title="Saldo Iklan Aktif" value="Rp 1.250.000" icon={<PiggyBank size={24}/>} color="text-blue-600" bgColor="bg-blue-50" />
                  <StatCard title="Daily Ad Spend" value="Rp 450.000" icon={<Activity size={24}/>} color="text-rose-600" bgColor="bg-rose-50" />
                  <StatCard title="Net Profit (Pre-Split)" value="Rp 1.200.000" icon={<TrendingUp size={24}/>} color="text-emerald-600" bgColor="bg-emerald-50" />
                  <StatCard title="Hak Anda (70%)" value="Rp 840.000" icon={<DollarSign size={24}/>} color="text-indigo-600" bgColor="bg-indigo-50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                   <div className="lg:col-span-2 bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 h-[34rem] relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h2 className="font-black text-slate-800 text-2xl uppercase italic tracking-tighter italic leading-none">Market Performance</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">7 Days Data Visualization</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-200"></div><span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Cost</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-200"></div><span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Rev</span></div>
                      </div>
                    </div>
                    {mounted && (
                      <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={performanceData}>
                          <defs>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} dy={15} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94A3B8'}} />
                          <Tooltip 
                            contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 'bold'}}
                          />
                          <Area type="monotone" dataKey="profit" stroke="#6366f1" strokeWidth={6} fillOpacity={1} fill="url(#colorProfit)" />
                          <Line type="monotone" dataKey="spend" stroke="#f43f5e" strokeWidth={4} strokeDasharray="10 10" />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  <div className="flex flex-col gap-8">
                     <div className="bg-indigo-600 rounded-[3.5rem] p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden flex flex-col justify-between flex-1 italic group cursor-pointer transition-all hover:scale-[1.02]">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-3xl -mr-40 -mt-40 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60 mb-6 italic leading-none">Partner Insights</p>
                          <h3 className="text-4xl font-black italic uppercase leading-[0.85] tracking-tighter">Unlock Higher Tier Split with 5.0 ROAS!</h3>
                        </div>
                        <div className="mt-8 space-y-4">
                           <div className="p-5 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-white/80 mb-2">Monthly Target Progress</p>
                              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-2 shadow-inner">
                                 <div className="w-[64%] h-full bg-white rounded-full shadow-lg"></div>
                              </div>
                              <p className="text-right text-[10px] font-black italic tracking-widest">64% ACHIEVED</p>
                           </div>
                           <button className="w-full bg-white text-indigo-600 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl active:bg-indigo-50 flex items-center justify-center gap-3">
                              View Campaign Brief <ExternalLink size={14} />
                           </button>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: DEPOSITvirtual WALLET (WITH TAX LOGIC) */}
            {activeTab === 'deposit' && (
              <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
                <div className="bg-white p-16 rounded-[4.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col items-center gap-16 relative overflow-hidden">
                   <div className="w-full space-y-12 z-10">
                      <div className="text-center md:text-left">
                        <h2 className="font-black text-slate-800 text-4xl uppercase italic tracking-tighter italic leading-none">Wallet Refill</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-3">Pre-fund your daily ad operations efficiently.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-8">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Input Ad Budget (IDR)</label>
                              <div className="relative group">
                                <Calculator className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={24} />
                                <input 
                                  type="number" 
                                  defaultValue={1000000}
                                  placeholder="e.g. 5,000,000"
                                  className="w-full bg-slate-50 border-2 border-slate-100 p-7 pl-16 rounded-[2.5rem] text-2xl font-black focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-slate-200 shadow-inner" 
                                />
                              </div>
                            </div>

                            <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100 italic">
                               <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                                  <Percent size={14} /> Refill Breakdown
                               </h4>
                               <ul className="space-y-3 font-bold text-xs text-indigo-900/70 uppercase tracking-tighter">
                                  <li className="flex justify-between"><span>Base Budget</span><span>Rp 1.000.000</span></li>
                                  <li className="flex justify-between text-rose-600"><span>Ad Tax (5%)</span><span>+ Rp 50.000</span></li>
                                  <li className="flex justify-between text-amber-600"><span>Unique Verifier</span><span>+ Rp 123</span></li>
                               </ul>
                            </div>
                         </div>

                         <div className="flex flex-col justify-between gap-6">
                            <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group h-full">
                              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mb-8 italic">Final Transfer Amount</p>
                              <h3 className="text-7xl font-black tracking-tighter mb-10 italic drop-shadow-2xl">Rp 1.050.123</h3>
                              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest border-t border-slate-800 pt-6">Must transfer exactly this amount to be verified instantly by management bot.</p>
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.25em] shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all italic leading-none">
                              Generate Payment QR
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* VIEW: ADS DETAILED REPORT */}
            {activeTab === 'ads-report' && (
              <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-700">
                 <div className="p-12 border-b border-slate-100 bg-white flex flex-col lg:row justify-between items-start lg:items-center gap-8">
                  <div>
                    <h2 className="font-black text-slate-800 text-3xl uppercase italic tracking-tighter italic leading-none">Campaign Ledger</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3 italic tracking-[0.2em]">Automated Deduction from Virtual Ad Wallet</p>
                  </div>
                  <div className="relative w-full lg:w-96 group">
                    <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input type="text" placeholder="Search Campaign UID..." className="w-full bg-slate-50 border-2 border-slate-100 pl-16 pr-8 py-6 rounded-[2rem] text-sm font-black focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-[0.35em]">
                      <tr>
                        <th className="px-12 py-8">Network</th>
                        <th className="px-12 py-8">Meta Data</th>
                        <th className="px-12 py-8 text-right">Daily Spend</th>
                        <th className="px-12 py-8 text-right font-black text-indigo-600">ROAS Index</th>
                        <th className="px-12 py-8 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium italic">
                      {teamMembers.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors group group cursor-pointer">
                          <td className="px-12 py-12">
                            <span className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-slate-900/30 group-hover:bg-indigo-600 transition-all">
                              {idx % 2 === 0 ? 'META ADS' : 'TIKTOK ADS'}
                            </span>
                          </td>
                          <td className="px-12 py-12">
                             <p className="font-black text-slate-700 uppercase italic tracking-tighter text-lg leading-tight mb-1">CBO_WINNER_V0{idx+1}_SKU</p>
                             <div className="flex items-center gap-2">
                                <Users size={12} className="text-slate-300" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Buyer: {m.name}</span>
                             </div>
                          </td>
                          <td className="px-12 py-12 text-right text-rose-500 font-black text-2xl tracking-tighter">Rp {m.spendHariIni.toLocaleString('id-ID')}</td>
                          <td className="px-12 py-12 text-right font-black text-indigo-700 text-3xl italic tracking-tighter">{(4 + Math.random()).toFixed(2)}x</td>
                          <td className="px-12 py-12 text-center">
                             <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      
      {/* GLOBAL OVERLAY (LAYOUT BINGKAI) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS (REUSABLE UI)
// ==========================================

function SidebarItem({ id, icon, label, activeId, onClick, isOpen, isAdmin }: any) {
  const active = id === activeId;
  return (
    <button 
      onClick={() => onClick(id)} 
      className={`w-full flex items-center gap-5 px-7 py-6 rounded-[2rem] transition-all group relative overflow-hidden
        ${active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-900/50 scale-[1.05]' : 'text-slate-500 hover:bg-slate-800 hover:text-slate-200'}`}
    >
      <div className={`${active ? 'text-white' : 'text-slate-600 group-hover:text-indigo-400'} transition-all duration-500`}>
        {icon}
      </div>
      {isOpen && (
        <span className="font-black text-[12px] uppercase tracking-[0.25em] flex items-center gap-3 truncate">
          {label}
          {isAdmin && <span className="text-[8px] bg-white/20 text-white px-2.5 py-1 rounded-lg font-black tracking-tighter border border-white/10 backdrop-blur-sm">ADM</span>}
        </span>
      )}
      {active && <div className="absolute right-0 top-0 h-full w-3 bg-white/20 blur-sm"></div>}
    </button>
  );
}

function StatCard({ title, value, icon, color, bgColor }: any) {
  return (
    <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-xl shadow-slate-200/40 flex items-center gap-10 hover:shadow-2xl hover:translate-y-[-6px] transition-all duration-500 group border-b-[10px] border-b-slate-50/50 relative overflow-hidden italic">
      <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-900 group-hover:scale-150 transition-transform duration-1000">
         {icon}
      </div>
      <div className={`p-7 rounded-[2rem] ${bgColor} ${color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-sm relative z-10`}>
        {icon}
      </div>
      <div className="truncate relative z-10">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 italic truncate opacity-80">{title}</p>
        <h3 className={`text-3xl font-black italic tracking-tighter ${color} truncate leading-none`}>{value}</h3>
      </div>
    </div>
  );
}
