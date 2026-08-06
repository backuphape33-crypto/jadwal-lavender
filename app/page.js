import React, { useState, useRef, useEffect } from 'react';
import { 
  Hotel, ShieldCheck, LogOut, Loader2, ArrowLeft, 
  CalendarDays, Save, Download, Clock, User, 
  CheckCircle2, AlertCircle, Image as ImageIcon, 
  Eye, Edit3, Building, Users, Lock, Mail, UserCheck, XCircle
} from 'lucide-react';

const employees = {
  'Hotel Lavender': [
    { id: 1, name: 'Haikal', department: 'Housekeeping', code: 'HK' },
    { id: 2, name: 'Arif', department: 'Housekeeping', code: 'HK' },
    { id: 3, name: 'Siska', department: 'Housekeeping', code: 'HK' },
    { id: 4, name: 'Andre', department: 'Housekeeping', code: 'HK' },
    { id: 5, name: 'Tabhita', department: 'Receptionist', code: 'RC' },
  ],
  'Hotel Harmony': [
    { id: 6, name: 'Budi', department: 'Housekeeping', code: 'HK' },
    { id: 7, name: 'Citra', department: 'Receptionist', code: 'RC' },
    { id: 8, name: 'Danu', department: 'General', code: 'GEN' },
  ],
  'Ruma Guesthouse': [
    { id: 9, name: 'Eka', department: 'Housekeeping', code: 'HK' },
    { id: 10, name: 'Fikri', department: 'Receptionist', code: 'RC' },
  ],
  'Hotel Kartika': [
    { id: 11, name: 'Gita', department: 'Laundry', code: 'LD' },
    { id: 12, name: 'Hadi', department: 'General', code: 'GEN' },
    { id: 13, name: 'Iwan', department: 'Housekeeping', code: 'HK' },
  ]
};

const hotelsList = [
  { id: 'h1', name: 'Hotel Lavender', location: 'Pusat Kota', empCount: 5 },
  { id: 'h2', name: 'Hotel Harmony', location: 'Jakarta Selatan', empCount: 3 },
  { id: 'h3', name: 'Ruma Guesthouse', location: 'Jakarta Barat', empCount: 2 },
  { id: 'h4', name: 'Hotel Kartika', location: 'Jakarta Utara', empCount: 3 },
];

const shiftOptions = [
  { id: 'HK1', label: 'HK (07-17)', color: 'bg-orange-500 text-white' },
  { id: 'LD1', label: 'LD (07-17)', color: 'bg-pink-500 text-white' },
  { id: 'GEN', label: 'GEN (08-20)', color: 'bg-teal-600 text-white' },
  { id: 'RC1', label: 'RC (07-15)', color: 'bg-blue-600 text-white' },
  { id: 'RC2', label: 'RC (15-23)', color: 'bg-blue-600 text-white' },
  { id: 'RC3', label: 'RC (23-07)', color: 'bg-blue-600 text-white' },
  { id: 'OFF', label: 'OFF', color: 'bg-red-700 text-white' },
];

function AppFooter() {
  return (
    <footer className="w-full text-center py-6 text-xs text-gray-500 font-medium mt-auto bg-gray-50 border-t border-gray-200">
      &copy; {new Date().getFullYear()} Multi Sistem Manajemen Hotel. Created by: kenes (kevin yohanes)
    </footer>
  );
}

function LoginView({ onLogin, onNavigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi loading untuk preview
    setTimeout(() => {
      onLogin(username, password);
      setLoading(false);
    }, 1000); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 rotate-3">
            <Hotel className="w-10 h-10 text-white -rotate-3" />
          </div>
          <h2 className="mt-8 text-center text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard</h2>
          <p className="mt-2 text-center text-sm text-gray-500 font-bold uppercase tracking-widest">Multi Sistem Manajemen Hotel</p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required className="appearance-none block w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-900" placeholder="Masukkan username" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="appearance-none block w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium text-gray-900" placeholder="••••••••" />
                </div>
              </div>
              
              <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 background-animate hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk / Login'}
              </button>
            </form>
            
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
               <span className="text-sm text-gray-500">Belum punya akun? </span>
               <button onClick={() => onNavigate('register')} disabled={loading} className="text-sm text-indigo-600 hover:text-indigo-800 font-bold transition-colors">Daftar Sekarang</button>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

function RegisterView({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', hotel: 'Hotel Lavender' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Registrasi berhasil diajukan! Menunggu persetujuan Admin.");
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
           <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Daftar Akun</h2>
           <p className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-widest">Multi Sistem Manajemen Hotel</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
              <input type="text" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Pilih username" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="Buat kata sandi" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Penempatan Hotel</label>
              <select value={formData.hotel} onChange={(e) => setFormData({...formData, hotel: e.target.value})} className="appearance-none block w-full px-4 py-3.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white font-medium">
                {hotelsList.map(h => (
                   <option key={h.id} value={h.name}>{h.name}</option>
                ))}
              </select>
            </div>
             <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-extrabold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 background-animate hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4">
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ajukan Pendaftaran'}
             </button>
          </form>
          <div className="text-center text-sm text-gray-600 mt-8 border-t border-gray-100 pt-6">
            Sudah punya akun? <button type="button" onClick={() => onNavigate('login')} className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors" disabled={loading}>Masuk di sini</button>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

function AdminDashboard({ user, onLogout, onSelectHotel }) {
  // Simulasi data user untuk tabel approval
  const [mockUsers, setMockUsers] = useState([
    { id: 1, username: 'haikal_hk', hotel: 'Hotel Lavender', status: 'pending', accessType: 'terbatas' },
    { id: 2, username: 'budi_manager', hotel: 'Hotel Harmony', status: 'approved', accessType: 'bebas' },
  ]);

  const handleApprove = (id) => {
    setMockUsers(mockUsers.map(u => u.id === id ? { ...u, status: 'approved' } : u));
  };

  const handleReject = (id) => {
    setMockUsers(mockUsers.filter(u => u.id !== id));
  };

  const handleChangeAccess = (id, newAccess) => {
    setMockUsers(mockUsers.map(u => u.id === id ? { ...u, accessType: newAccess } : u));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-grow">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-14 h-14 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">Multi Sistem Manajemen Hotel</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center space-x-2 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-colors font-bold border border-red-100 active:scale-95">
            <LogOut className="w-4 h-4" /> <span>Keluar</span>
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><Building className="w-6 h-6 mr-2 text-indigo-600" /> Daftar Cabang Hotel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {hotelsList.map(hotel => (
             <div 
                key={hotel.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1.5 duration-300 group" 
                onClick={() => onSelectHotel(hotel.name)}
             >
               <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <Hotel className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-md">Beroperasi</span>
               </div>
               <h3 className="text-lg font-extrabold text-gray-900 mb-1">{hotel.name}</h3>
               <p className="text-sm text-gray-500 mb-5">{hotel.location}</p>
               
               <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center text-sm text-gray-600 font-bold">
                    <Users className="w-4 h-4 mr-1.5" />
                    <span>{hotel.empCount} Staf</span>
                  </div>
                  <button className="text-sm font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                    Kelola <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
             </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><UserCheck className="w-6 h-6 mr-2 text-indigo-600" /> Persetujuan Akun Karyawan</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hotel</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Tipe Akses</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   {mockUsers.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-8 text-gray-500 text-sm">Tidak ada pengguna yang perlu disetujui.</td></tr>
                   ) : mockUsers.map(u => (
                      <tr key={u.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{u.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.hotel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                           <select 
                             value={u.accessType} 
                             onChange={(e) => handleChangeAccess(u.id, e.target.value)}
                             className="text-xs font-bold border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-indigo-500"
                           >
                              <option value="terbatas">1 Hotel (Terbatas)</option>
                              <option value="bebas">Semua Hotel (Bebas)</option>
                           </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {u.status === 'pending' ? 
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800">Menunggu</span> : 
                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">Aktif</span>
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {u.status === 'pending' && (
                             <button onClick={() => handleApprove(u.id)} className="text-green-600 hover:text-green-900 mr-4 font-bold bg-green-50 px-3 py-1 rounded-md">Setujui</button>
                          )}
                          <button onClick={() => handleReject(u.id)} className="text-red-600 hover:text-red-900 font-bold bg-red-50 px-3 py-1 rounded-md flex items-center mx-auto space-x-1">
                             <XCircle className="w-3.5 h-3.5" /> <span>Hapus</span>
                          </button>
                        </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </div>
        
      </div>
      <AppFooter />
    </div>
  );
}

function ScheduleDashboard({ hotel, user, onLogout, onBack }) {
  const [schedule, setSchedule] = useState({});
  const [startDate, setStartDate] = useState('');
  const [viewMode, setViewMode] = useState('edit'); 
  const [isSaving, setIsSaving] = useState(false);
  const [dates, setDates] = useState([]);
  
  const scheduleRef = useRef(null);
  const hotelEmployees = employees[hotel] || employees['Hotel Lavender'];

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const newDates = [];
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        newDates.push({
          day: days[currentDate.getDay()],
          date: currentDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
        });
      }
      setDates(newDates);
    }
  }, [startDate]);

  const handleShiftChange = (empId, dayIdx, shiftId) => {
    setSchedule(prev => ({
      ...prev,
      [`${empId}-${dayIdx}`]: shiftId
    }));
  };

  const handleSave = async () => {
    if(!startDate) return alert("Pilih tanggal terlebih dahulu!");
    setIsSaving(true);
    
    // Simulasi save loading
    setTimeout(() => {
      setIsSaving(false);
      alert('Jadwal berhasil disimpan ke sistem MSMH!');
    }, 1500);
  };

  const getDeptColor = (dept) => {
    switch (dept) {
      case 'Housekeeping': return 'bg-orange-500';
      case 'General': return 'bg-teal-600';
      case 'Laundry': return 'bg-pink-500';
      case 'Receptionist': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getCellColor = (empId, dayIdx) => {
    const shiftId = schedule[`${empId}-${dayIdx}`];
    if (!shiftId) return 'bg-white';
    const shift = shiftOptions.find(s => s.id === shiftId);
    return shift ? shift.color : 'bg-white';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <div className="p-2 md:p-8 font-sans text-gray-800 flex-grow">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="bg-gradient-to-r from-indigo-800 to-purple-900 p-4 md:p-6 text-white flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button onClick={onBack} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors active:scale-95" title="Kembali ke Dashboard">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <CalendarDays className="w-7 h-7 md:w-8 md:h-8 text-indigo-200 shrink-0" />
                <div className="text-left">
                  <h1 className="text-lg md:text-2xl font-extrabold leading-tight">Jadwal Shift Tim</h1>
                  <p className="text-indigo-200 text-xs md:text-sm font-bold uppercase tracking-wider mt-0.5">{hotel} | MSMH</p>
                </div>
              </div>
            </div>

            <div id="action-buttons" className="flex items-center space-x-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-sm w-full md:w-auto">
              <button 
                onClick={() => setViewMode('edit')}
                className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'edit' ? 'bg-white text-indigo-900 font-bold shadow-md' : 'text-white hover:bg-white/20 font-medium'}`}
              >
                <Edit3 className="w-4 h-4" /> <span>Edit Jadwal</span>
              </button>
              <button 
                onClick={() => setViewMode('view')}
                className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'view' ? 'bg-white text-indigo-900 font-bold shadow-md' : 'text-white hover:bg-white/20 font-medium'}`}
              >
                <Eye className="w-4 h-4" /> <span>Lihat Jadwal</span>
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0" id="export-buttons">
            <div className="flex items-center space-x-3 bg-white p-2.5 md:p-3 rounded-xl shadow-sm border border-gray-200 w-full lg:w-auto">
              <Clock className="text-indigo-500 w-5 h-5 shrink-0" />
              <div className="w-full flex flex-col">
                <label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-0.5 uppercase tracking-wide">Mulai Hari Senin:</label>
                <input 
                  type="date" 
                  className="border-none bg-gray-50 text-sm md:text-base p-1.5 md:p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-48 cursor-pointer font-medium"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={viewMode === 'view'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:flex gap-2 md:space-x-3 w-full lg:w-auto">
              {viewMode === 'edit' && (
                 <button 
                   onClick={handleSave}
                   disabled={isSaving}
                   className="col-span-2 md:col-span-1 flex justify-center items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 md:py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
                 >
                   {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                   <span>{isSaving ? 'Menyimpan...' : 'Simpan ke Sistem'}</span>
                 </button>
              )}
              
              <button onClick={() => alert("Fitur cetak pada preview")} className="flex justify-center items-center space-x-1.5 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2.5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                <Download className="w-4 h-4" /> <span>PDF / Cetak</span>
              </button>
            </div>
          </div>

          <div ref={scheduleRef} className="bg-white overflow-hidden">
            <div className="p-0 md:p-6 overflow-x-auto">
              {!startDate ? (
                <div className="text-center py-12 md:py-16 bg-gray-50 rounded-none md:rounded-2xl border-y md:border border-dashed border-gray-300 m-4 md:m-0">
                  <CalendarDays className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold text-sm md:text-base px-4">Silakan pilih tanggal "Mulai Hari Senin" di atas untuk memunculkan tabel jadwal.</p>
                </div>
              ) : (
                <div className="min-w-max shadow-inner rounded-none md:rounded-2xl border-y md:border border-gray-200 relative">
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="sticky left-0 z-20 py-3 px-3 md:py-4 md:px-6 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[120px] md:w-1/5 border-r border-gray-200 bg-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                          Staf
                        </th>
                        {dates.map((d, idx) => (
                          <th key={idx} className="py-3 px-2 md:py-4 md:px-3 text-center border-r border-gray-200 last:border-r-0 bg-gradient-to-b from-indigo-50/60 to-transparent min-w-[85px] md:min-w-[100px]">
                            <div className="text-[10px] md:text-xs font-extrabold text-indigo-900 uppercase tracking-wide">{d.day}</div>
                            <div className="text-[9px] md:text-[10px] font-bold text-indigo-700 mt-1 bg-indigo-100/50 inline-block px-2 md:px-2.5 py-0.5 rounded-full border border-indigo-200/50 backdrop-blur-sm shadow-sm">{d.date}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 border-b border-gray-200">
                      {hotelEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                          
                          <td className="sticky left-0 z-10 p-0 border-r border-gray-200 align-top shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] bg-white">
                            <div className={`flex items-center space-x-0 md:space-x-3 py-2 px-2 md:py-3 md:px-4 h-full w-full ${getDeptColor(emp.department)}`}>
                              <div className="hidden md:flex w-8 h-8 rounded-full bg-black/20 items-center justify-center shadow-inner shrink-0">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div className="w-full text-center md:text-left">
                                <div className="font-extrabold text-white text-[11px] md:text-sm tracking-wide leading-tight">{emp.name}</div>
                                <div className="text-[8px] md:text-[10px] text-white/90 font-bold mt-0.5 uppercase tracking-wider">
                                  {emp.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          {dates.map((_, dayIdx) => (
                            <td key={dayIdx} className={`p-1.5 md:p-2 border-r border-gray-100 last:border-r-0 text-center align-middle bg-white group-hover:bg-indigo-50/30 transition-colors`}>
                              {viewMode === 'edit' ? (
                                <div className="relative inline-block w-full max-w-[70px] md:max-w-[80px]">
                                  <select
                                    className={`w-full appearance-none text-[10px] md:text-[11px] font-extrabold py-1.5 md:py-2 pl-2 md:pl-2.5 pr-5 md:pr-6 rounded-md cursor-pointer outline-none transition-all shadow-sm border
                                    ${schedule[`${emp.id}-${dayIdx}`]
                                      ? getCellColor(emp.id, dayIdx) + ' border-transparent'
                                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-200'
                                    }`}
                                    value={schedule[`${emp.id}-${dayIdx}`] || ''}
                                    onChange={(e) => handleShiftChange(emp.id, dayIdx, e.target.value)}
                                  >
                                    <option value="" className="text-gray-400 bg-white">- -</option>
                                    {shiftOptions.map(opt => (
                                      <option key={opt.id} value={opt.id} className="text-gray-800 bg-white font-bold">
                                        {opt.id}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              ) : (
                                 <div className="flex justify-center items-center h-full">
                                   <div className={`inline-flex justify-center items-center text-[10px] md:text-[11px] font-extrabold py-1 md:py-1.5 px-2 rounded-md min-w-[50px] md:min-w-[60px] shadow-sm ${schedule[`${emp.id}-${dayIdx}`] ? getCellColor(emp.id, dayIdx) : 'bg-gray-50 text-gray-300 border border-gray-100'}`}>
                                      {schedule[`${emp.id}-${dayIdx}`] || '-'}
                                   </div>
                                 </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-200 text-sm">
               <h3 className="font-extrabold text-gray-800 mb-3 md:mb-4 flex items-center text-xs md:text-sm"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 text-green-500"/> Keterangan Shift & Divisi</h3>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                  <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
                    <div className="font-extrabold text-orange-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Housekeeping</div>
                    <div className="text-gray-600 text-[9px] md:text-xs font-bold">HK1: 07:00 - 17:00</div>
                  </div>
                  <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-teal-600">
                    <div className="font-extrabold text-teal-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">General</div>
                    <div className="text-gray-600 text-[9px] md:text-xs font-bold">GEN: 08:00 - 20:00</div>
                  </div>
                  <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-blue-600">
                    <div className="font-extrabold text-blue-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Receptionist</div>
                    <div className="text-gray-600 text-[9px] md:text-xs font-bold flex flex-col space-y-0.5 mt-0.5 md:mt-1">
                      <span>RC1: 07:00 - 15:00</span>
                      <span>RC2: 15:00 - 23:00</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleLogin = (username, password) => {
    // Simulasi Login - Langsung masuk sebagai Admin untuk melihat semua fitur di Preview
    setUser({ username, role: 'admin', accessType: 'bebas' });
    setCurrentPage('admin_dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedHotel(null);
    setCurrentPage('login');
  };

  return (
    <>
      <style>{`
        .background-animate {
          background-size: 200% 200%;
          animation: GradientShift 3s ease infinite;
        }
        @keyframes GradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {currentPage === 'login' && <LoginView onLogin={handleLogin} onNavigate={setCurrentPage} />}
      {currentPage === 'register' && <RegisterView onNavigate={setCurrentPage} />}
      {currentPage === 'admin_dashboard' && (
        <AdminDashboard 
          user={user} 
          onLogout={handleLogout} 
          onSelectHotel={(hotel) => {
            setSelectedHotel(hotel);
            setCurrentPage('schedule');
          }} 
        />
      )}
      {currentPage === 'schedule' && (
        <ScheduleDashboard 
          hotel={selectedHotel} 
          user={user} 
          onLogout={handleLogout} 
          onBack={() => {
            setSelectedHotel(null);
            setCurrentPage('admin_dashboard');
          }} 
        />
      )}
    </>
  );
}
