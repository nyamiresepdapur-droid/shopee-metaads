'use client';
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar 
} from 'recharts';
import { 
  LayoutDashboard, Megaphone, Receipt, RefreshCw, Settings, 
  Activity, MousePointerClick, DollarSign, Wallet, Menu, Search, Bell,
  TrendingUp, CheckCircle2, Clock, AlertCircle, Database, Users, LogOut, Lock,
  PiggyBank, CreditCard, ArrowDownRight, ArrowUpRight, Building2
} from 'lucide-react';

// ==========================================
// DATA MOCKUP (Finansial & Relasional)
// ==========================================

const globalChartData = [
  { name: '1 Mei', spend: 320000, komisi: 450000, roas: 1.4 },
  { name: '2 Mei', spend: 335000, komisi: 490000, roas: 1.46 },
  { name: '3 Mei', spend: 310000, komisi: 575000, roas: 1.85 },
  { name: '4 Mei', spend: 345000, komisi: 620000, roas: 1.79 },
  { name: '5 Mei', spend: 360000, komisi: 780000, roas: 2.16 },
  { name: '6 Mei', spend: 375000, komisi: 810000, roas: 2.16 },
  { name: '7 Mei', spend: 485508, komisi: 1045000, roas: 2.15 },
];

const campaignData = [
  { id: 1, pic: 'Andi', platform: 'Meta', date: '2026-05-07', name: 'CBO_Scale_Rak Dapur_2', status: 'active', spend: 75121, clicks: 833, roas: 5.77 },
  { id: 2, pic: 'Budi (Admin)', platform: 'Google', date: '2026-05-07', name: 'Search_Kategori_Rumah', status: 'active', spend: 150000, clicks: 420, roas: 4.12 },
  { id: 3, pic: 'Siti', platform: 'TikTok', date: '2026-05-07', name: 'Video_Shopping_Rak', status: 'active', spend: 200000, clicks: 1200, roas: 6.05 },
  { id: 4, pic: 'Andi', platform: 'Meta', date: '2026-05-07', name: 'OFF_Test_Baru', status: 'inactive', spend: 110387, clicks: 466, roas: 3.52 },
];

// Data Dompet & Keuangan (Simulasi Database)
const financeData = {
  admin: {
    totalManagementFee: 373047, // 30% dari total net profit global
    totalDepositDiterima: 15000000,
  },
  member: { // Data spesifik untuk Andi
    saldoIklan: 450000, // Sisa topup yang belum ter-spend
    grossKomisi: 345000,
    baseSpend: 185508,
    // Kalkulasi Real-time:
    // Pajak 5% = 9.275, Kode Unik Avg = 125
    // Effective Cost = 185.508 + 9.275 + 125 = 194.908
    effectiveCost: 194908, 
    // Net Profit = 345.000 - 194.908 = 150.092
    netProfit: 150092,
    // Share: Member (70%) = 105.064 | Mgmt (30%) = 45.027
    memberShare: 105064,
    mgmtShare: 45027
  }
};

const teamData = [
  { id: 1, name: 'Budi (Admin)', totalSpend: 175000, effectiveCost: 183875, totalKomisi: 654000, netProfit: 470125, share70: 329087, mgmt30: 141037, saldo: 1250000 },
  { id: 2, name: 'Andi', totalSpend: 185508, effectiveCost: 194908, totalKomisi: 345000, netProfit: 150092, share70: 105064, mgmt30: 45027, saldo: 450000 },
  { id: 3, name: 'Siti', totalSpend: 245000, effectiveCost: 257375, totalKomisi: 850000, netProfit: 592625, share70: 414837, mgmt30: 177787, saldo: 80000 },
];

const depositHistory = [
  { id: 'DP-001', date: '06 Mei 2026', pic: 'Andi', amount: 500000, tax: 25000, unique: 112, totalTransfer: 525112, status: 'Success' },
  { id: 'DP-002', date: '05 Mei 2026', pic: 'Siti', amount: 1000000, tax: 50000, unique: 88, totalTransfer: 1050088, status: 'Success' },
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = (role, name) => {
    setUserRole(role);
    setUserName(name);
    setIsLoggedIn(true);
    setActiveTab(role === 'admin' ? 'global' : 'overview');
  };

  const handleLogout = () => setIsLoggedIn(false);

  // --- SCREEN: LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-900 p-8 text-center text-white">
            <h1 className="text-3xl font-bold mb-2">Berkah Affiliate</h1>
            <p className="text-slate-300 text-sm">Agency Ads & Financial Management</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="text-center"><p className="text-gray-600 text-sm mb-4">Pilih Role Akses:</p></div>
            <button onClick={() => handleLogin('admin', 'Budi (Admin)')} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors font-medium">
              <Lock size={18} /> Masuk sebagai Manajemen (Admin)
            </button>
            <button onClick={() => handleLogin('member', 'Andi (Tim)')} className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 p-3 rounded-xl transition-colors font-medium">
              <Users size={18} /> Masuk sebagai Media Buyer (Tim)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- SCREEN: DASHBOARD ---
  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'global': return 'Manajemen Agensi & Bagi Hasil';
      case 'overview': return `Overview Performa (${userName})`;
      case 'keuangan': return 'Dompet, Deposit & Tagihan Iklan';
      case 'performa': return 'Laporan Iklan Multi-Channel';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'} transition-all duration-300 ease-in-out bg-slate-900 text-slate-300 flex flex-col justify-between hidden md:flex shrink-0 z-20`}>
        <div>
          <div className="h-16 flex items-center justify-center border-b border-slate-800 px-4 text-white">
            {isSidebarOpen ? <span className="text-xl font-bold truncate w-full">Berkah<span className="text-indigo-400">Hub</span></span> : <span className="text-xl font-bold text-indigo-400">BH</span>}
          </div>
          
          <div className="p-4">
            <div className={`mb-6 px-3 py-2 bg-slate-800 rounded-lg flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
              <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {userName.charAt(0)}
              </div>
              {isSidebarOpen && (
                <div className="truncate">
                  <p className="text-sm font-semibold text-white truncate">{userName}</p>
                  <p className="text-xs text-indigo-300 font-medium">{userRole === 'admin' ? 'Management' : 'Media Buyer'}</p>
                </div>
              )}
            </div>

            <nav className="space-y-1.5">
              {userRole === 'admin' && <SidebarItem id="global" icon={<Building2 size={20} />} label="Global Agency" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} isAdminOnly />}
              <SidebarItem id="overview" icon={<LayoutDashboard size={20} />} label="Overview Saya" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
              <SidebarItem id="keuangan" icon={<Wallet size={20} />} label="Keuangan & Deposit" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
              <SidebarItem id="performa" icon={<Megaphone size={20} />} label="Performa Iklan" activeId={activeTab} onClick={setActiveTab} isOpen={isSidebarOpen} />
            </nav>
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-800 space-y-1.5">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-400 hover:bg-slate-800 transition-colors group">
              <LogOut size={20} />
              {isSidebarOpen && <span className="font-medium">Keluar Sistem</span>}
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-100 text-gray-600 hidden md:block">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800 leading-tight">{getHeaderTitle()}</h1>
              <p className="text-xs text-gray-500">Skema Bagi Hasil (Tim 70% | Management 30%)</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {userRole === 'member' && (
               <div className="hidden sm:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-indigo-100">
                 <PiggyBank size={16} /> Saldo Iklan: Rp {financeData.member.saldoIklan.toLocaleString('id-ID')}
               </div>
            )}
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors">
              <RefreshCw size={16} /> <span className="hidden sm:inline">Sync Data</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'global' && userRole === 'admin' && <AdminGlobalView />}
            {activeTab === 'overview' && <OverviewView data={financeData.member} />}
            {activeTab === 'keuangan' && <KeuanganView role={userRole} data={financeData} />}
            {activeTab === 'performa' && <PerformaView />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// VIEWS COMPONENTS
// ==========================================

function AdminGlobalView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Global Agensi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <KPICard title="Total Pendapatan Manajemen (30%)" amount={`Rp ${financeData.admin.totalManagementFee.toLocaleString('id-ID')}`} trend="Laba bersih hak agensi" icon={<Building2 />} bgIcon="bg-indigo-100 text-indigo-700" />
        <KPICard title="Total Spend Tim (Include Pajak)" amount="Rp 636.158" trend="Dibebankan dari Saldo Iklan Tim" icon={<Activity />} bgIcon="bg-orange-100 text-orange-700" />
        <KPICard title="Total Deposit Diterima" amount={`Rp ${financeData.admin.totalDepositDiterima.toLocaleString('id-ID')}`} trend="Menunggu dieksekusi ke platform ads" icon={<CreditCard />} bgIcon="bg-emerald-100 text-emerald-700" />
      </div>

      {/* Leaderboard & Split Report */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Laporan Bagi Hasil Tim (Ledger)</h2>
          <p className="text-sm text-gray-500">Otomatis dihitung setelah dikurangi beban biaya iklan + pajak 5%.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Nama Tim</th>
                <th className="px-6 py-4 text-right">Gross Komisi</th>
                <th className="px-6 py-4 text-right">Effective Ad Cost</th>
                <th className="px-6 py-4 text-right">Net Profit</th>
                <th className="px-6 py-4 text-right bg-indigo-50/50 text-indigo-800 font-bold">Mgmt Cut (30%)</th>
                <th className="px-6 py-4 text-right bg-emerald-50/50 text-emerald-800 font-bold">Member Payout (70%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {teamData.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{m.name}</td>
                  <td className="px-6 py-4 text-right text-gray-600">Rp {m.totalKomisi.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right text-rose-600">- Rp {m.effectiveCost.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">Rp {m.netProfit.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right font-bold text-indigo-600 bg-indigo-50/30">+ Rp {m.mgmt30.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600 bg-emerald-50/30">Rp {m.share70.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OverviewView({ data }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Pribadi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Gross Komisi (Shopee)" amount={`Rp ${data.grossKomisi.toLocaleString('id-ID')}`} trend="Total uang masuk" icon={<Wallet />} bgIcon="bg-blue-50 text-blue-600" />
        <KPICard title="Effective Ad Cost" amount={`Rp ${data.effectiveCost.toLocaleString('id-ID')}`} trend="Spend + Pajak 5% + Kode" icon={<ArrowDownRight />} bgIcon="bg-rose-50 text-rose-600" />
        <KPICard title="Net Profit (Komisi - Cost)" amount={`Rp ${data.netProfit.toLocaleString('id-ID')}`} trend="Keuntungan murni" icon={<Activity />} bgIcon="bg-slate-100 text-slate-700" />
        <KPICard title="Penghasilan Anda (70%)" amount={`Rp ${data.memberShare.toLocaleString('id-ID')}`} trend="Siap ditarik / Re-invest" icon={<DollarSign />} bgIcon="bg-emerald-50 text-emerald-600" isProfit />
      </div>

      {/* CHART SECTION */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Tren Korelasi (Spend vs Komisi)</h2>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={globalChartData.slice(0, 7)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(val) => `Rp ${val/1000}k`} />
              <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)} />
              <Legend iconType="circle" />
              <Line yAxisId="left" type="monotone" name="Pengeluaran Iklan" dataKey="spend" stroke="#f97316" strokeWidth={3} dot={false} />
              <Line yAxisId="left" type="monotone" name="Estimasi Komisi" dataKey="komisi" stroke="#4f46e5" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Potongan Manajemen */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-indigo-900 font-semibold flex items-center gap-2"><Building2 size={18}/> Potongan Manajemen (30%)</h3>
          <p className="text-indigo-700 text-sm mt-1">Sistem otomatis memotong Rp {data.mgmtShare.toLocaleString('id-ID')} untuk kas manajemen dari net profit Anda hari ini.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shrink-0 transition-colors">
          Lihat Detail Ledger
        </button>
      </div>
    </div>
  );
}

function KeuanganView({ role, data }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel Saldo & Topup (Hanya untuk Member) */}
        {role === 'member' && (
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet size={100} /></div>
              <p className="text-slate-400 text-sm font-medium mb-1">Total Saldo Iklan Aktif</p>
              <h2 className="text-4xl font-bold mb-6">Rp {data.member.saldoIklan.toLocaleString('id-ID')}</h2>
              
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Simulasi Request Deposit Baru:</p>
                <div className="bg-slate-800 p-3 rounded-lg flex justify-between text-sm border border-slate-700">
                  <span className="text-slate-300">Nominal Iklan</span>
                  <span>Rp 1.000.000</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg flex justify-between text-sm border border-slate-700">
                  <span className="text-rose-400">+ Pajak Jasa (5%)</span>
                  <span className="text-rose-400">Rp 50.000</span>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg flex justify-between text-sm border border-slate-700">
                  <span className="text-amber-400">+ Kode Unik</span>
                  <span className="text-amber-400">Rp 123</span>
                </div>
                <div className="pt-2 flex justify-between items-center font-bold text-emerald-400">
                  <span>Total Transfer:</span>
                  <span className="text-lg">Rp 1.050.123</span>
                </div>
                <button className="w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-medium transition-colors">
                  Buat Invoice Deposit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel Riwayat Transaksi */}
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${role === 'admin' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Riwayat Deposit Saldo Tim</h2>
            <button className="text-indigo-600 text-sm font-medium">Download CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 uppercase font-medium text-xs">
                <tr>
                  <th className="px-6 py-4">ID / Tanggal</th>
                  {role === 'admin' && <th className="px-6 py-4">Akun Tim</th>}
                  <th className="px-6 py-4 text-right">Nominal Topup</th>
                  <th className="px-6 py-4 text-right">Tax (5%)</th>
                  <th className="px-6 py-4 text-right font-bold">Total Transfer</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {depositHistory.map((d, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{d.id}</p>
                      <p className="text-xs text-gray-500">{d.date}</p>
                    </td>
                    {role === 'admin' && <td className="px-6 py-4 font-medium text-indigo-600">{d.pic}</td>}
                    <td className="px-6 py-4 text-right text-gray-600">Rp {d.amount.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-right text-rose-500">Rp {d.tax.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800">Rp {d.totalTransfer.toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">Selesai</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function PerformaView() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-gray-100"><h2 className="text-lg font-semibold text-gray-800">Pemotongan Iklan Harian</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-600 uppercase font-medium text-xs">
            <tr>
              <th className="px-6 py-4">Kampanye</th>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4 text-right">Klik</th>
              <th className="px-6 py-4 text-right">Base Spend (Meta/GAds)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaignData.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{c.name}</td>
                <td className="px-6 py-4 text-gray-600">{c.platform}</td>
                <td className="px-6 py-4 text-right">{c.clicks.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4 text-right text-rose-600 font-medium">Rp {c.spend.toLocaleString('id-ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

function SidebarItem({ id, icon, label, activeId, onClick, isOpen, isAdminOnly }) {
  const active = id === activeId;
  return (
    <button onClick={() => onClick(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${active ? 'bg-indigo-500 text-white font-medium shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
      <div className={`${active ? 'text-white' : 'text-slate-500'}`}>{icon}</div>
      {isOpen && (
        <span className="whitespace-nowrap flex items-center justify-between w-full">
          {label}
          {isAdminOnly && <span className="text-[9px] bg-slate-900 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded font-bold tracking-wider uppercase">Admin</span>}
        </span>
      )}
    </button>
  );
}

function KPICard({ title, amount, trend, icon, bgIcon, isProfit = false }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${bgIcon}`}>{icon}</div></div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className={`text-2xl font-bold tracking-tight ${isProfit ? 'text-emerald-600' : 'text-gray-800'}`}>{amount}</h3>
        <p className="text-xs text-gray-400 mt-2">{trend}</p>
      </div>
    </div>
  );
}