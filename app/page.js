"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Hotel, ShieldCheck, LogOut, Loader2, ArrowLeft, CalendarDays, Save, Download, Clock, User, CheckCircle2, AlertCircle, Edit3, Eye, ImageIcon, Building2, Check, X } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6C19I-zTrEHzFkIPdJstt6LQ-h-ySflJXaE0ScQzMOipk24RX7p1fL2IuV8K9YQ0v/exec';

const employees = {
  'Hotel Lavender': [
    { id: 1, name: 'Haikal', department: 'Housekeeping', code: 'HK' },
    { id: 2, name: 'Arif', department: 'Housekeeping', code: 'HK' },
    { id: 3, name: 'Siska', department: 'Housekeeping', code: 'HK' },
    { id: 4, name: 'Andre', department: 'Housekeeping', code: 'HK' },
    { id: 5, name: 'Fahmi', department: 'Housekeeping', code: 'HK' },
    { id: 6, name: 'Ady', department: 'Housekeeping', code: 'HK' },
    { id: 7, name: 'Salman', department: 'General', code: 'GA' },
    { id: 8, name: 'Indah', department: 'Laundry', code: 'LD' },
    { id: 9, name: 'Alit', department: 'Receptionist', code: 'FO' },
    { id: 10, name: 'Billa', department: 'Receptionist', code: 'FO' },
    { id: 11, name: 'Tabhita', department: 'Receptionist', code: 'FO' }
  ],
  'Hotel Harmony': [
    { id: 12, name: 'Budi (Cabang)', department: 'Housekeeping', code: 'HK' },
    { id: 13, name: 'Citra', department: 'Receptionist', code: 'RC' },
    { id: 14, name: 'Danu', department: 'General', code: 'GEN' },
  ],
  'Ruma Guesthouse': [
    { id: 15, name: 'Eka', department: 'Housekeeping', code: 'HK' },
    { id: 16, name: 'Fikri', department: 'Receptionist', code: 'RC' },
  ],
  'Hotel Kartika': [
    { id: 17, name: 'Gita', department: 'Laundry', code: 'LD' },
    { id: 18, name: 'Hadi', department: 'General', code: 'GEN' },
    { id: 19, name: 'Iwan', department: 'Housekeeping', code: 'HK' },
  ]
};

const hotelsList = [
  { id: 'h1', name: 'Hotel Lavender', location: 'Pusat Kota', empCount: 11 },
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

const Footer = () => (
  <div className="w-full text-center py-6 text-gray-500 text-[11px] md:text-xs font-medium tracking-wide">
    Copyright © 2026. Create by: kenes (kevin yohanes)
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('login'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regHotel, setRegHotel] = useState('Hotel Lavender');
  
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  // Fungsi Login (Terhubung ke Apps Script Database)
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', username, password })
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        const user = data.user;
        setCurrentUser(user);
        
        if (user.role === 'admin' || user.role === 'manager') {
          setCurrentView('admin');
        } else if (user.accessType === 'bebas') {
          setCurrentView('hotelSelection'); 
        } else {
          setSelectedHotel(user.hotel);
          setCurrentView('schedule'); 
        }
      } else {
        alert(data.message || 'Username atau password salah!');
      }
    } catch (error) {
      alert('Gagal terhubung ke database. Cek koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi Registrasi Baru
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'registerUser',
          user: {
            id: Date.now().toString(),
            username: regUsername,
            password: regPassword,
            role: 'user', 
            hotel: regHotel,
            accessType: 'terbatas', 
            status: 'pending' 
          }
        })
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        alert('Pendaftaran berhasil! Silakan hubungi Admin/Manager untuk persetujuan (Approve).');
        setCurrentView('login');
      } else {
        alert(data.message || 'Pendaftaran gagal');
      }
    } catch (error) {
      alert('Gagal mendaftar. Cek koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderLogin = () => (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 p-8 md:p-10 transform transition-all">
        <div className="text-center mb-10">
          {/* Judul Besar */}
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-3 tracking-tight">
            Dashboard
          </h1>
          {/* Judul Kecil */}
          <p className="text-xs md:text-sm font-bold text-indigo-700 bg-indigo-50/80 inline-block px-5 py-2 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100">
            Multi Sistem Manajemen Hotel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-800 font-medium"
              value={username} onChange={e => setUsername(e.target.value)}
              placeholder="Masukkan username..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-800 font-medium"
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-xl font-bold text-lg shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Masuk ke Sistem</span>}
          </button>
        </form>
        
        <div className="mt-10 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500 font-medium">Belum memiliki akun staf?</p>
          <button onClick={() => setCurrentView('register')} className="mt-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors uppercase tracking-wide text-sm">
            Daftar Akun Baru
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );

  const renderRegister = () => (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-2">Pendaftaran</h2>
          <p className="text-xs md:text-sm font-bold text-indigo-700 bg-indigo-50/80 inline-block px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100">
            Multi Sistem Manajemen Hotel
          </p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Username Baru</label>
            <input 
              type="text" required
              className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-gray-800 font-medium"
              value={regUsername} onChange={e => setRegUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
            <input 
              type="password" required
              className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-gray-800 font-medium"
              value={regPassword} onChange={e => setRegPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Penempatan Hotel</label>
            <select 
              className="w-full p-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none text-gray-800 font-medium cursor-pointer"
              value={regHotel} onChange={e => setRegHotel(e.target.value)}
            >
              {hotelsList.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
            </select>
          </div>
          
          <button 
            type="submit" disabled={isLoading}
            className="w-full mt-6 flex justify-center items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-xl font-bold shadow-[0_8px_20px_rgba(219,39,119,0.3)] hover:shadow-[0_8px_25px_rgba(219,39,119,0.5)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Daftarkan Akun</span>}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <button onClick={() => setCurrentView('login')} className="flex items-center justify-center space-x-1.5 text-sm font-bold text-gray-500 hover:text-indigo-600 mx-auto transition-colors">
            <ArrowLeft className="w-4 h-4" /> <span>Kembali ke Login</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );

  const AdminDashboard = () => {
    const [adminLoading, setAdminLoading] = useState(false);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = async () => {
      setAdminLoading(true);
      try {
        const res = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'getUsers' })
        });
        const data = await res.json();
        if(data.status === 'success') setUsersList(data.data);
      } catch (err) {
        console.error(err);
      }
      setAdminLoading(false);
    };

    const updateUser = async (userId, updateData) => {
      try {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'updateUser', userId, updateData })
        });
        fetchUsers(); 
      } catch (err) {
        alert('Gagal mengupdate user');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-indigo-900 p-6 flex flex-col md:flex-row justify-between items-center text-white space-y-4 md:space-y-0">
             <div className="flex items-center space-x-4">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
                <div>
                   <h2 className="text-xl md:text-2xl font-black tracking-wide">Dasbor Persetujuan</h2>
                   <p className="text-xs md:text-sm text-gray-300 flex items-center mt-1"><User className="w-3.5 h-3.5 mr-1.5"/> Login sebagai: <span className="font-bold text-white ml-1 uppercase">{currentUser?.username}</span> ({currentUser?.role})</p>
                </div>
             </div>
             <div className="flex space-x-3">
               <button onClick={() => setCurrentView('hotelSelection')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md flex items-center transform hover:-translate-y-0.5">
                 <Building2 className="w-4 h-4 mr-2"/> Buka Jadwal
               </button>
               <button onClick={() => { setCurrentUser(null); setCurrentView('login'); }} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center">
                 <LogOut className="w-4 h-4 mr-2"/> Keluar
               </button>
             </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">Daftar Akun Karyawan</h3>
            {adminLoading ? (
               <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-indigo-500"/></div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold border-b">Username</th>
                      <th className="p-4 font-bold border-b">Role</th>
                      <th className="p-4 font-bold border-b">Penempatan</th>
                      <th className="p-4 font-bold border-b">Hak Akses Sistem</th>
                      <th className="p-4 font-bold border-b text-center">Status Akun</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="p-4 font-bold text-gray-800">{u.username}</td>
                        <td className="p-4">
                           <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-red-100 text-red-700' : u.role === 'manager' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                             {u.role}
                           </span>
                        </td>
                        <td className="p-4 text-gray-600 font-medium">{u.hotel}</td>
                        <td className="p-4">
                           <select 
                             className="text-xs border border-gray-300 rounded-lg p-2 bg-white outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-gray-700 cursor-pointer shadow-sm"
                             value={u.accessType}
                             onChange={(e) => updateUser(u.id, { accessType: e.target.value })}
                             disabled={u.role === 'admin'}
                           >
                              <option value="terbatas">Akses Terbatas (1 Hotel)</option>
                              <option value="bebas">Akses Bebas (Semua Hotel)</option>
                           </select>
                        </td>
                        <td className="p-4 flex justify-center space-x-2">
                           {u.status === 'pending' ? (
                             <>
                               <button onClick={() => updateUser(u.id, { status: 'approved' })} className="flex items-center text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm">
                                 <Check className="w-3.5 h-3.5 mr-1" /> Setujui
                               </button>
                               <button onClick={() => updateUser(u.id, { status: 'rejected' })} className="flex items-center text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm">
                                 <X className="w-3.5 h-3.5 mr-1" /> Tolak
                               </button>
                             </>
                           ) : (
                             <span className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm ${u.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                                {u.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                             </span>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const renderHotelSelection = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
       <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Pilih Cabang Hotel</h2>
              <p className="text-indigo-600 font-bold text-sm mt-1 bg-indigo-50 inline-block px-3 py-1 rounded-md">Hak Akses Bebas • {currentUser?.username}</p>
            </div>
            <div className="flex space-x-3 w-full md:w-auto">
              {['admin','manager'].includes(currentUser?.role) && (
                 <button onClick={() => setCurrentView('admin')} className="flex-1 md:flex-none flex items-center justify-center px-5 py-2.5 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold hover:bg-indigo-200 transition-all shadow-sm">
                    <ShieldCheck className="w-4 h-4 mr-2"/> Dasbor Admin
                 </button>
              )}
              <button onClick={() => { setCurrentUser(null); setCurrentView('login'); }} className="flex-1 md:flex-none flex items-center justify-center px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
                <LogOut className="w-4 h-4 mr-2"/> Keluar
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelsList.map(hotel => (
               <div 
                 key={hotel.id} 
                 onClick={() => { setSelectedHotel(hotel.name); setCurrentView('schedule'); }}
                 className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-xl hover:border-indigo-300 transform hover:-translate-y-1.5 transition-all cursor-pointer group"
               >
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:from-indigo-600 group-hover:to-blue-600 transition-all shadow-sm">
                     <Hotel className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-black text-xl text-gray-900">{hotel.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-5 font-medium">{hotel.location}</p>
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-4">
                     <span className="text-gray-500 font-bold">Total Tim:</span>
                     <span className="font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">{hotel.empCount} Org</span>
                  </div>
               </div>
            ))}
          </div>
       </div>
       <Footer />
    </div>
  );

  const ScheduleDashboard = () => {
    const [schedule, setSchedule] = useState({});
    const [startDate, setStartDate] = useState('');
    const [viewMode, setViewMode] = useState('edit'); 
    const [isSaving, setIsSaving] = useState(false);
    const [dates, setDates] = useState([]);
    const scheduleRef = useRef(null);

    const currentEmployees = employees[selectedHotel] || [];

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
        fetchJadwalFromDatabase();
      }
    }, [startDate, selectedHotel]);

    // Mengambil Jadwal dari Spreadsheet
    const fetchJadwalFromDatabase = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?action=getSchedule&hotel=${encodeURIComponent(selectedHotel)}&startDate=${startDate}`);
        const data = await response.json();
        
        if (data.status === 'success' && data.schedule) {
          setSchedule(data.schedule);
        } else {
          setSchedule({});
        }
      } catch (error) {
        console.error('Gagal mengambil jadwal', error);
      }
    };

    const handleShiftChange = (empId, dayIdx, shiftId) => {
      setSchedule(prev => ({ ...prev, [`${empId}-${dayIdx}`]: shiftId }));
    };

    // Menyimpan Jadwal ke Spreadsheet
    const handleSave = async () => {
      setIsSaving(true);
      try {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: 'saveSchedule', hotel: selectedHotel, startDate: startDate, schedule: schedule })
        });
        alert('Jadwal berhasil disimpan ke sistem!');
      } catch (error) {
        alert('Terjadi kesalahan saat menyimpan data. Cek koneksi internet.');
      } finally {
        setIsSaving(false);
      }
    };

    const handleExportImage = async (format) => {
      if (!scheduleRef.current) return;
      try {
        const actionButtons = document.getElementById('action-buttons');
        const exportButtons = document.getElementById('export-buttons');
        if (actionButtons) actionButtons.style.display = 'none';
        if (exportButtons) exportButtons.style.display = 'none';
  
        await new Promise(resolve => setTimeout(resolve, 100));
  
        if (typeof window !== 'undefined' && !window.htmlToImage) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Gagal memuat script html-to-image'));
            document.head.appendChild(script);
          });
        }
  
        const options = { quality: 1, backgroundColor: '#ffffff', pixelRatio: 2 };
        let dataUrl;
  
        if (format === 'png') {
          dataUrl = await window.htmlToImage.toPng(scheduleRef.current, options);
        } else {
          dataUrl = await window.htmlToImage.toJpeg(scheduleRef.current, options);
        }
  
        const link = document.createElement('a');
        link.download = `Jadwal_${selectedHotel}_${startDate || 'Tabel'}.${format}`;
        link.href = dataUrl;
        link.click();
  
      } catch (error) {
        console.error('Export gagal:', error);
        alert('Gagal mengekspor gambar. Pastikan browser mendukung fitur ini.');
      } finally {
        const actionButtons = document.getElementById('action-buttons');
        const exportButtons = document.getElementById('export-buttons');
        if (actionButtons) actionButtons.style.display = 'flex';
        if (exportButtons) exportButtons.style.display = 'flex';
      }
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
      <div className="min-h-screen bg-gray-50 p-2 md:p-8 font-sans">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button 
                onClick={() => {
                   if(currentUser?.accessType === 'bebas') setCurrentView('hotelSelection');
                   else { setCurrentUser(null); setCurrentView('login'); }
                }}
                className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 text-white">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm hidden md:block">
                  <CalendarDays className="w-7 h-7 text-blue-200" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black leading-tight tracking-wide">Jadwal Shift Tim</h1>
                  <p className="text-blue-200 text-xs md:text-sm font-bold uppercase tracking-widest mt-0.5">{selectedHotel}</p>
                </div>
              </div>
            </div>

            <div id="action-buttons" className="flex w-full md:w-auto items-center space-x-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-md">
              <button onClick={() => setViewMode('edit')} className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2.5 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'edit' ? 'bg-white text-indigo-900 font-bold shadow-md scale-100' : 'text-white hover:bg-white/20 font-medium'}`}>
                <Edit3 className="w-4 h-4" /> <span>Edit Jadwal</span>
              </button>
              <button onClick={() => setViewMode('view')} className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2.5 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'view' ? 'bg-white text-indigo-900 font-bold shadow-md scale-100' : 'text-white hover:bg-white/20 font-medium'}`}>
                <Eye className="w-4 h-4" /> <span>Mode Lihat</span>
              </button>
            </div>
          </div>

          <div id="export-buttons" className="p-4 md:p-6 bg-gray-50 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-200 w-full lg:w-auto">
              <div className="bg-indigo-50 p-2 rounded-xl">
                <Clock className="text-indigo-600 w-5 h-5" />
              </div>
              <div className="w-full flex flex-col">
                <label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-0.5 uppercase tracking-wider">Mulai Hari Senin:</label>
                <input 
                  type="date" 
                  className="border-none bg-transparent text-sm md:text-base p-0 focus:ring-0 outline-none w-full md:w-48 cursor-pointer font-bold text-gray-800"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={viewMode === 'view'}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:flex gap-2 md:space-x-3 w-full lg:w-auto">
              {viewMode === 'edit' && (
                 <button onClick={handleSave} disabled={isSaving || !startDate} className="col-span-2 md:col-span-1 flex justify-center items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_4px_15px_rgba(5,150,105,0.3)] hover:shadow-[0_4px_20px_rgba(5,150,105,0.4)] active:scale-95 disabled:opacity-50">
                   {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                   <span>{isSaving ? 'Menyimpan...' : 'Simpan Database'}</span>
                 </button>
              )}
              
              <button onClick={() => window.print()} className="flex justify-center items-center space-x-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all active:scale-95">
                <Download className="w-4 h-4" /> <span>PDF / Cetak</span>
              </button>
              <button onClick={() => handleExportImage('jpg')} className="flex justify-center items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all active:scale-95">
                <ImageIcon className="w-4 h-4" /> <span>JPG</span>
              </button>
            </div>
          </div>

          <div ref={scheduleRef} className="bg-white">
            <div className="p-0 md:p-6">
              {!startDate ? (
                <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-300 m-4 md:m-0 rounded-3xl">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                     <AlertCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-bold text-sm md:text-base px-4">Silakan pilih tanggal "Mulai Hari Senin" untuk memuat jadwal.</p>
                </div>
              ) : (
                <div className="overflow-x-auto shadow-sm md:rounded-2xl border-y md:border border-gray-200">
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50/80">
                      <tr>
                        <th className="sticky left-0 z-20 py-4 px-4 text-left text-xs font-black text-gray-700 uppercase tracking-widest w-[140px] md:w-1/5 border-r border-gray-200 bg-gray-50 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)]">
                          Karyawan
                        </th>
                        {dates.map((d, idx) => (
                          <th key={idx} className="py-4 px-3 text-center border-r border-gray-200 min-w-[100px] bg-gradient-to-b from-indigo-50/50 to-transparent">
                            <div className="text-xs font-black text-indigo-900 uppercase tracking-widest">{d.day}</div>
                            <div className="text-[10px] text-indigo-700 mt-1.5 font-bold bg-white inline-block px-2.5 py-1 rounded-md border border-indigo-100 shadow-sm">{d.date}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-indigo-50/20 transition-colors">
                          <td className="sticky left-0 z-10 p-0 border-r border-gray-200 bg-white shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)]">
                            <div className={`flex items-center space-x-2 py-3 px-3 md:px-4 h-full w-full ${getDeptColor(emp.department)}`}>
                              <div className="hidden md:flex w-8 h-8 rounded-full bg-black/15 items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-white" />
                              </div>
                              <div className="w-full">
                                <div className="font-black text-white text-xs md:text-sm tracking-wide leading-tight">{emp.name}</div>
                                <div className="text-[9px] md:text-[10px] text-white/90 font-bold mt-0.5 uppercase tracking-widest">{emp.department}</div>
                              </div>
                            </div>
                          </td>
                          {dates.map((_, dayIdx) => (
                            <td key={dayIdx} className="p-2 md:p-3 border-r border-gray-100 text-center bg-white align-middle">
                              {viewMode === 'edit' ? (
                                <select
                                  className={`w-full appearance-none text-[11px] font-bold py-2.5 pl-3 pr-6 rounded-lg cursor-pointer outline-none transition-all shadow-sm border ${schedule[`${emp.id}-${dayIdx}`] ? getCellColor(emp.id, dayIdx) + ' border-transparent' : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-200'}`}
                                  value={schedule[`${emp.id}-${dayIdx}`] || ''}
                                  onChange={(e) => handleShiftChange(emp.id, dayIdx, e.target.value)}
                                >
                                  <option value="" className="text-gray-400 bg-white font-medium">- Kosong -</option>
                                  {shiftOptions.map(opt => <option key={opt.id} value={opt.id} className="text-gray-800 bg-white font-bold">{opt.id}</option>)}
                                </select>
                              ) : (
                                <div className="flex justify-center items-center h-full">
                                   <div className={`inline-flex justify-center items-center text-[11px] font-bold py-2 px-3 rounded-lg min-w-[70px] shadow-sm ${schedule[`${emp.id}-${dayIdx}`] ? getCellColor(emp.id, dayIdx) : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
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
            
            <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-200">
               <h3 className="font-bold text-gray-800 mb-4 flex items-center text-sm"><CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500"/> Keterangan Shift & Divisi</h3>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-l-4 border-l-orange-500">
                    <div className="font-black text-orange-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">Housekeeping</div>
                    <div className="text-gray-600 text-[10px] md:text-xs font-bold">HK1: 07:00 - 17:00</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-l-4 border-l-pink-500">
                    <div className="font-black text-pink-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">Laundry</div>
                    <div className="text-gray-600 text-[10px] md:text-xs font-bold">LD1: 07:00 - 17:00</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-l-4 border-l-teal-600">
                    <div className="font-black text-teal-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">General</div>
                    <div className="text-gray-600 text-[10px] md:text-xs font-bold">GEN: 08:00 - 20:00</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border-l-4 border-l-blue-600">
                    <div className="font-black text-blue-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">Receptionist</div>
                    <div className="text-gray-600 text-[10px] md:text-xs font-bold flex flex-col space-y-1 mt-1">
                      <span>RC1: 07:00 - 15:00</span>
                      <span>RC2: 15:00 - 23:00</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <div className="text-gray-800 antialiased font-sans bg-gray-50">
      {currentView === 'login' && renderLogin()}
      {currentView === 'register' && renderRegister()}
      {currentView === 'admin' && <AdminDashboard />}
      {currentView === 'hotelSelection' && renderHotelSelection()}
      {currentView === 'schedule' && <ScheduleDashboard />}
    </div>
  );
}
