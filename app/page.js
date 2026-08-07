"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Hotel, ShieldCheck, LogOut, Loader2, ArrowLeft, CalendarDays, Save, Download, Clock, User, CheckCircle2, AlertCircle, Edit3, Eye, ImageIcon, Building2, Check, X, Lock, Users } from 'lucide-react';

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
  <div className="w-full text-center py-6 text-gray-400 text-[11px] md:text-xs font-medium tracking-wide relative z-20 mt-10">
    Copyright © 2026. Create by: kenes (kevin yohanes)
  </div>
);

const ToastNotification = ({ msg, type, onClose }) => {
  if (!msg) return null;
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] animate-bounce">
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${type === 'error' ? 'bg-red-50/95 border-red-200 text-red-700' : 'bg-emerald-50/95 border-emerald-200 text-emerald-700'}`}>
        {type === 'error' ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
        <span className="font-bold">{msg}</span>
        <button onClick={onClose} className="ml-4 p-1 hover:bg-black/10 rounded-full transition"><X className="w-5 h-5"/></button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ currentUser, handleLogout, setCurrentView, setSelectedHotel, showNotif }) => {
  const [adminLoading, setAdminLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

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
      if(data.status === 'success') {
        const sortedUsers = data.data.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return 0;
        });
        setUsersList(sortedUsers);
      }
    } catch (err) {
      showNotif('Gagal mengambil daftar pengguna', 'error');
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
      showNotif('Status user berhasil diupdate!', 'success');
      fetchUsers(); 
    } catch (err) {
      showNotif('Gagal mengupdate user', 'error');
    }
  };

  const goToSchedule = (hotelName) => {
    setSelectedHotel(hotelName);
    setCurrentView('schedule');
    localStorage.setItem('msmh_hotel', hotelName);
    localStorage.setItem('msmh_view', 'schedule');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-900 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-white space-y-4 md:space-y-0 rounded-[2rem] shadow-xl border border-gray-800">
           <div className="flex items-center space-x-5">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                 <ShieldCheck className="w-8 h-8 text-indigo-300" />
              </div>
              <div>
                 <h2 className="text-2xl md:text-3xl font-black tracking-tight">Dashboard Admin</h2>
                 <p className="text-xs md:text-sm text-gray-300 flex items-center mt-1">Sistem Manajemen Terpadu • <span className="font-bold text-emerald-400 ml-1 uppercase">{currentUser?.username}</span></p>
              </div>
           </div>
           <div className="flex w-full md:w-auto">
             <button onClick={handleLogout} className="flex-1 md:flex-none justify-center bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center active:scale-95 shadow-sm">
               <LogOut className="w-4 h-4 mr-2"/> Keluar Sistem
             </button>
           </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
           <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
             <h3 className="text-xl font-black text-gray-800 flex items-center"><Building2 className="w-6 h-6 mr-2 text-indigo-500"/> Akses Jadwal Cabang</h3>
             <p className="text-sm text-gray-500 mt-1 md:mt-0 font-medium">Pilih cabang untuk mengatur jadwal shift</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {hotelsList.map(hotel => (
               <div 
                 key={hotel.id} 
                 onClick={() => goToSchedule(hotel.name)}
                 className="bg-slate-50 p-5 md:p-6 rounded-3xl border border-gray-200 hover:shadow-xl hover:border-indigo-400 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
               >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 transition-all duration-300 shadow-sm">
                     <Hotel className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-black text-xl text-gray-900 tracking-tight leading-tight mb-1">{hotel.name}</h3>
                  <p className="text-xs text-gray-500 font-medium mb-4">{hotel.location}</p>
                  <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-4">
                     <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Total Tim</span>
                     <span className="font-black text-indigo-700 bg-indigo-100/50 px-2.5 py-1 rounded-md border border-indigo-200/50">{hotel.empCount} Org</span>
                  </div>
               </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center"><Users className="w-6 h-6 mr-2 text-indigo-500"/> Persetujuan & Akun Staf</h3>
            {adminLoading ? (
               <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-500"/></div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-gray-500 text-[11px] uppercase tracking-widest font-black border-b border-gray-200">
                      <th className="p-5">Username</th>
                      <th className="p-5">Role</th>
                      <th className="p-5">Penempatan</th>
                      <th className="p-5">Hak Akses Sistem</th>
                      <th className="p-5 text-center">Status Akun</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {usersList.map((u) => (
                      <tr key={u.id} className={`transition-colors ${u.status === 'pending' ? 'bg-yellow-50/50 hover:bg-yellow-50' : 'hover:bg-slate-50'}`}>
                        <td className="p-5 font-black text-gray-800 text-base flex items-center">
                          {u.status === 'pending' && <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span>}
                          {u.username}
                        </td>
                        <td className="p-5">
                           <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-red-100 text-red-700 border border-red-200' : u.role === 'manager' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                             {u.role}
                           </span>
                        </td>
                        <td className="p-5 text-gray-600 font-bold">{u.hotel}</td>
                        <td className="p-5">
                           <select 
                             className="text-xs border-2 border-gray-200 rounded-xl p-2.5 bg-white outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 font-bold text-gray-700 cursor-pointer shadow-sm transition-all"
                             value={u.accessType}
                             onChange={(e) => updateUser(u.id, { accessType: e.target.value })}
                             disabled={u.role === 'admin'}
                           >
                              <option value="terbatas">Terbatas (1 Hotel)</option>
                              <option value="bebas">Bebas (Semua Hotel)</option>
                           </select>
                        </td>
                        <td className="p-5 flex justify-center space-x-2">
                           {u.status === 'pending' ? (
                             <>
                               <button onClick={() => updateUser(u.id, { status: 'approved' })} className="flex items-center text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-md transform hover:-translate-y-0.5 active:scale-95">
                                 <Check className="w-4 h-4 mr-1.5" /> Setujui
                               </button>
                               <button onClick={() => updateUser(u.id, { status: 'rejected' })} className="flex items-center text-xs bg-white hover:bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold transition-all border border-red-200 active:scale-95 shadow-sm">
                                 <X className="w-4 h-4 mr-1.5" /> Tolak
                               </button>
                             </>
                           ) : (
                             <span className={`flex items-center justify-center text-xs font-black px-4 py-2.5 rounded-xl shadow-sm w-32 ${u.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
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
      </div>
      <Footer />
    </div>
  );
};

const HotelSelectionDashboard = ({ currentUser, handleLogout, setCurrentView, setSelectedHotel }) => {
  const goToSchedule = (hotelName) => {
    setSelectedHotel(hotelName);
    setCurrentView('schedule');
    localStorage.setItem('msmh_hotel', hotelName);
    localStorage.setItem('msmh_view', 'schedule');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-900 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-white space-y-4 md:space-y-0 rounded-[2rem] shadow-xl border border-gray-800">
           <div className="flex items-center space-x-5">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                 <Building2 className="w-8 h-8 text-indigo-300" />
              </div>
              <div>
                 <h2 className="text-2xl md:text-3xl font-black tracking-tight">Pilih Cabang</h2>
                 <p className="text-xs md:text-sm text-gray-300 flex items-center mt-1">Sistem Manajemen Terpadu • <span className="font-bold text-emerald-400 ml-1 uppercase">{currentUser?.username}</span></p>
              </div>
           </div>
           <div className="flex w-full md:w-auto space-x-3">
             {currentUser?.role === 'manager' && (
                 <button onClick={() => { setCurrentView('admin'); localStorage.setItem('msmh_view', 'admin'); }} className="flex-1 md:flex-none justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center active:scale-95 shadow-sm">
                   <ShieldCheck className="w-4 h-4 mr-2"/> Admin Dashboard
                 </button>
             )}
             <button onClick={handleLogout} className="flex-1 md:flex-none justify-center bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center active:scale-95 shadow-sm">
               <LogOut className="w-4 h-4 mr-2"/> Keluar Sistem
             </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotelsList.map(hotel => (
             <div
               key={hotel.id}
               onClick={() => goToSchedule(hotel.name)}
               className="bg-white p-5 md:p-6 rounded-3xl border border-gray-200 hover:shadow-xl hover:border-indigo-400 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
             >
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-600 transition-all duration-300 shadow-sm">
                   <Hotel className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-xl text-gray-900 tracking-tight leading-tight mb-1">{hotel.name}</h3>
                <p className="text-xs text-gray-500 font-medium mb-4">{hotel.location}</p>
                <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-4">
                   <span className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Total Tim</span>
                   <span className="font-black text-indigo-700 bg-indigo-100/50 px-2.5 py-1 rounded-md border border-indigo-200/50">{hotel.empCount} Org</span>
                </div>
             </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ScheduleDashboard = ({ selectedHotel, currentUser, setCurrentView, showNotif, handleLogout }) => {
  const [schedule, setSchedule] = useState({});
  const [startDate, setStartDate] = useState('');
  const [viewMode, setViewMode] = useState('edit'); 
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [dates, setDates] = useState([]);
  const scheduleRef = useRef(null);

  const currentEmployees = employees[selectedHotel] || [];

  const fetchJadwalFromDatabase = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'getSchedule', hotel: selectedHotel })
      });
      const data = await response.json();
      
      if (data.status === 'success' && data.schedules) {
        const newScheduleState = {};
        data.schedules.forEach(item => {
          const dateStr = item.date; // Format mutlak 'YYYY-MM-DD'
          Object.keys(item.data).forEach(empId => {
            newScheduleState[`${empId}-${dateStr}`] = item.data[empId];
          });
        });
        setSchedule(newScheduleState);
      }
    } catch (error) {
      showNotif('Gagal menarik riwayat jadwal', 'error');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (selectedHotel) {
      fetchJadwalFromDatabase();
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const newDates = [];
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dd = String(currentDate.getDate()).padStart(2, '0');
        const absoluteDate = `${yyyy}-${mm}-${dd}`;

        newDates.push({
          day: days[currentDate.getDay()],
          date: currentDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
          fullDate: absoluteDate
        });
      }
      setDates(newDates);
    }
  }, [startDate]);

  const handleShiftChange = (empId, dateKey, shiftId) => {
    setSchedule(prev => ({ ...prev, [`${empId}-${dateKey}`]: shiftId }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const dailyData = {};
      
      // Filter hanya data yang berisi shift agar tidak mengirim object kosong
      dates.forEach(d => {
        const dayData = {};
        let hasData = false;
        currentEmployees.forEach(emp => {
          const shiftValue = schedule[`${emp.id}-${d.fullDate}`];
          if (shiftValue) {
            dayData[emp.id] = shiftValue;
            hasData = true;
          }
        });
        if (hasData) {
          dailyData[d.fullDate] = dayData;
        }
      });

      if(Object.keys(dailyData).length === 0) {
         showNotif('Tidak ada jadwal baru untuk disimpan!', 'error');
         setIsSaving(false);
         return;
      }

      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'saveSchedule', hotel: selectedHotel, dailyData: dailyData })
      });
      showNotif('Jadwal berhasil disimpan/diperbarui secara absolut!', 'success');
    } catch (error) {
      showNotif('Gagal menyimpan jadwal.', 'error');
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
          script.onerror = () => reject(new Error('Gagal memuat html-to-image'));
          document.head.appendChild(script);
        });
      }

      const options = { quality: 1, backgroundColor: '#ffffff', pixelRatio: 2 };
      let dataUrl;
      if (format === 'png') dataUrl = await window.htmlToImage.toPng(scheduleRef.current, options);
      else dataUrl = await window.htmlToImage.toJpeg(scheduleRef.current, options);

      const link = document.createElement('a');
      link.download = `Jadwal_${selectedHotel}_${startDate || 'Tabel'}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      showNotif('Gagal mengekspor gambar.', 'error');
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

  const getCellColor = (empId, dateKey) => {
    const shiftId = schedule[`${empId}-${dateKey}`];
    if (!shiftId) return 'bg-white';
    const shift = shiftOptions.find(s => s.id === shiftId);
    return shift ? shift.color : 'bg-white';
  };

  const goBack = () => {
     if(['admin', 'manager'].includes(currentUser?.role)) {
         setCurrentView('admin');
         localStorage.setItem('msmh_view', 'admin');
     }
     else if(currentUser?.accessType === 'bebas') {
         setCurrentView('hotelSelection');
         localStorage.setItem('msmh_view', 'hotelSelection');
     }
  };

  const canGoBack = ['admin', 'manager'].includes(currentUser?.role) || currentUser?.accessType === 'bebas';

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            {canGoBack && (
                <button onClick={goBack} className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-white backdrop-blur-sm border border-white/10 shadow-sm" title="Kembali">
                  <ArrowLeft className="w-5 h-5" />
                </button>
            )}
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm hidden md:block border border-white/10">
                <CalendarDays className="w-7 h-7 text-blue-200" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black leading-tight tracking-tight">Jadwal Shift Tim</h1>
                <p className="text-blue-200 text-xs md:text-sm font-bold uppercase tracking-widest mt-0.5">{selectedHotel}</p>
              </div>
            </div>
          </div>
          <div id="action-buttons" className="flex w-full md:w-auto items-center space-x-2 bg-black/20 p-1.5 rounded-xl backdrop-blur-md">
            <button onClick={() => setViewMode('edit')} className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2.5 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'edit' ? 'bg-white text-indigo-900 font-bold shadow-md scale-100' : 'text-white hover:bg-white/20 font-medium'}`}>
              <Edit3 className="w-4 h-4" /> <span>Edit Jadwal</span>
            </button>
            <button onClick={() => setViewMode('view')} className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2.5 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'view' ? 'bg-white text-indigo-900 font-bold shadow-md scale-100' : 'text-white hover:bg-white/20 font-medium'}`}>
              <Eye className="w-4 h-4" /> <span>Mode Lihat</span>
            </button>
            {!canGoBack && (
              <button onClick={handleLogout} className="flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2.5 rounded-lg transition-all text-xs md:text-sm text-red-200 hover:bg-red-500/30 hover:text-white font-medium" title="Keluar dari Sistem">
                <LogOut className="w-4 h-4" /> <span>Keluar</span>
              </button>
            )}
          </div>
        </div>

        <div id="export-buttons" className="p-4 md:p-6 bg-slate-50 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 bg-white p-3 md:p-4 rounded-2xl shadow-sm border border-gray-200 w-full lg:w-auto relative">
            <div className="bg-indigo-50 p-2.5 rounded-xl">
              <Clock className="text-indigo-600 w-5 h-5" />
            </div>
            <div className="w-full flex flex-col pr-8">
              <label className="block text-[10px] md:text-xs font-black text-gray-500 mb-1 uppercase tracking-wider">Pilih Tanggal Mulai:</label>
              <input 
                type="date" 
                className="border-none bg-transparent text-sm md:text-base p-0 focus:ring-0 outline-none w-full md:w-48 cursor-pointer font-bold text-gray-800"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {isFetching && <Loader2 className="absolute right-4 w-5 h-5 text-indigo-500 animate-spin" />}
          </div>

          <div className="grid grid-cols-2 md:flex gap-2 md:space-x-3 w-full lg:w-auto">
            {viewMode === 'edit' && (
               <button onClick={handleSave} disabled={isSaving || !startDate} className="col-span-2 md:col-span-1 flex justify-center items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] active:scale-95 disabled:opacity-50 border border-emerald-400">
                 {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 <span>{isSaving ? 'Menyimpan...' : 'Simpan Database'}</span>
               </button>
            )}
            <button onClick={() => window.print()} className="flex justify-center items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border border-indigo-200 active:scale-95 shadow-sm">
              <Download className="w-4 h-4" /> <span>Cetak</span>
            </button>
            <button onClick={() => handleExportImage('jpg')} className="flex justify-center items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all border border-blue-200 active:scale-95 shadow-sm">
              <ImageIcon className="w-4 h-4" /> <span>JPG</span>
            </button>
          </div>
        </div>

        <div ref={scheduleRef} className="bg-white">
          <div className="p-0 md:p-6">
            {!startDate ? (
              <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-gray-300 m-4 md:m-0 rounded-3xl">
                <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100 transform rotate-3">
                   <AlertCircle className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-bold text-sm md:text-base px-4">Pilih tanggal mulai di atas untuk memuat jadwal riwayat atau membuat baru.</p>
              </div>
            ) : (
              <div className="overflow-x-auto shadow-sm md:rounded-2xl border-y md:border border-gray-200">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="sticky left-0 z-20 py-4 px-4 text-left text-[11px] font-black text-gray-500 uppercase tracking-widest w-[140px] md:w-1/5 border-r border-gray-200 bg-slate-50 shadow-[4px_0_10px_-4px_rgba(0,0,0,0.1)]">
                        Data Karyawan
                      </th>
                      {dates.map((d, idx) => (
                        <th key={idx} className="py-4 px-3 text-center border-r border-gray-200 min-w-[100px] bg-gradient-to-b from-indigo-50/50 to-transparent">
                          <div className="text-xs font-black text-indigo-900 uppercase tracking-widest">{d.day}</div>
                          <div className="text-[10px] text-indigo-600 mt-1.5 font-bold bg-white inline-block px-2.5 py-1 rounded-md border border-indigo-100 shadow-sm">{d.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-indigo-50/20 transition-colors group">
                        <td className="sticky left-0 z-10 p-0 border-r border-gray-200 bg-white shadow-[4px_0_10px_-4px_rgba(0,0,0,0.05)] group-hover:bg-indigo-50/10">
                          <div className={`flex items-center space-x-2 py-3 px-3 md:px-4 h-full w-full ${getDeptColor(emp.department)}`}>
                            <div className="hidden md:flex w-8 h-8 rounded-xl bg-black/15 items-center justify-center shrink-0 shadow-inner">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="w-full">
                              <div className="font-black text-white text-xs md:text-sm tracking-wide leading-tight">{emp.name}</div>
                              <div className="text-[9px] md:text-[10px] text-white/90 font-bold mt-0.5 uppercase tracking-widest">{emp.department}</div>
                            </div>
                          </div>
                        </td>
                        {dates.map((d, dayIdx) => (
                          <td key={dayIdx} className="p-2 md:p-3 border-r border-gray-100 text-center bg-white align-middle">
                            {viewMode === 'edit' ? (
                              <select
                                className={`w-full appearance-none text-[11px] font-bold py-2.5 pl-3 pr-6 rounded-lg cursor-pointer outline-none transition-all shadow-sm border ${schedule[`${emp.id}-${d.fullDate}`] ? getCellColor(emp.id, d.fullDate) + ' border-transparent' : 'bg-slate-50 text-gray-500 border-gray-200 hover:border-indigo-300 focus:ring-2 focus:ring-indigo-200'}`}
                                value={schedule[`${emp.id}-${d.fullDate}`] || ''}
                                onChange={(e) => handleShiftChange(emp.id, d.fullDate, e.target.value)}
                              >
                                <option value="" className="text-gray-400 bg-white font-medium">- Kosong -</option>
                                {shiftOptions.map(opt => <option key={opt.id} value={opt.id} className="text-gray-800 bg-white font-bold">{opt.id}</option>)}
                              </select>
                            ) : (
                              <div className="flex justify-center items-center h-full">
                                 <div className={`inline-flex justify-center items-center text-[11px] font-bold py-2 px-3 rounded-lg min-w-[70px] shadow-sm ${schedule[`${emp.id}-${d.fullDate}`] ? getCellColor(emp.id, d.fullDate) : 'bg-slate-50 text-gray-400 border border-gray-200'}`}>
                                    {schedule[`${emp.id}-${d.fullDate}`] || '-'}
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
          <div className="bg-slate-50 p-4 md:p-6 border-t border-gray-200">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center text-sm"><CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500"/> Keterangan Shift & Divisi</h3>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-orange-500">
                  <div className="font-black text-orange-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">Housekeeping</div>
                  <div className="text-gray-500 text-[10px] md:text-xs font-bold">HK1: 07:00 - 17:00</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-pink-500">
                  <div className="font-black text-pink-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">Laundry</div>
                  <div className="text-gray-500 text-[10px] md:text-xs font-bold">LD1: 07:00 - 17:00</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-teal-600">
                  <div className="font-black text-teal-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">General</div>
                  <div className="text-gray-500 text-[10px] md:text-xs font-bold">GEN: 08:00 - 20:00</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-600">
                  <div className="font-black text-blue-600 mb-1.5 text-[10px] md:text-xs uppercase tracking-widest">Receptionist</div>
                  <div className="text-gray-500 text-[10px] md:text-xs font-bold flex flex-col space-y-1 mt-1">
                    <span>RC1: 07:00 - 15:00</span>
                    <span>RC2: 15:00 - 23:00</span>
                    <span>RC3: 23:00 - 07:00</span>
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
  const [notif, setNotif] = useState({ msg: '', type: '' });
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Load Session from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('msmh_user');
    const savedView = localStorage.getItem('msmh_view');
    const savedHotel = localStorage.getItem('msmh_hotel');

    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setCurrentView(savedView || 'admin');
        if (savedHotel) setSelectedHotel(savedHotel);
      } catch (e) {
        localStorage.clear();
      }
    }
    setIsAppLoaded(true);
  }, []);

  const showNotif = (msg, type = 'error') => {
    setNotif({ msg, type });
    setTimeout(() => setNotif({ msg: '', type: '' }), 5000); 
  };

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
        setUsername('');
        setPassword('');
        
        localStorage.setItem('msmh_user', JSON.stringify(user));
        
        if (user.role === 'admin' || user.role === 'manager') {
          setCurrentView('admin');
          localStorage.setItem('msmh_view', 'admin');
        } else if (user.accessType === 'bebas') {
          setCurrentView('hotelSelection'); 
          localStorage.setItem('msmh_view', 'hotelSelection');
        } else {
          setSelectedHotel(user.hotel);
          setCurrentView('schedule'); 
          localStorage.setItem('msmh_hotel', user.hotel);
          localStorage.setItem('msmh_view', 'schedule');
        }
      } else {
        showNotif(data.message || 'Username atau password salah!', 'error');
      }
    } catch (error) {
      showNotif('Gagal terhubung ke database. Cek koneksi internet.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('msmh_user');
    localStorage.removeItem('msmh_view');
    localStorage.removeItem('msmh_hotel');
    setCurrentUser(null);
    setSelectedHotel('');
    setCurrentView('login');
  };

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
        showNotif('Pendaftaran berhasil! Tunggu persetujuan Admin.', 'success');
        setCurrentView('login');
        setRegUsername('');
        setRegPassword('');
      } else {
        showNotif(data.message || 'Pendaftaran gagal', 'error');
      }
    } catch (error) {
      showNotif('Gagal mendaftar. Cek koneksi internet Anda.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAppLoaded) {
     return (
       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
         <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
       </div>
     );
  }

  return (
    <div className="text-gray-800 antialiased font-sans bg-slate-50 min-h-screen">
      <ToastNotification msg={notif.msg} type={notif.type} onClose={() => setNotif({ msg: '', type: '' })} />
      
      {currentView === 'login' && (
        <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50">
          <style>{`
            @keyframes movingGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            .btn-animated { background: linear-gradient(270deg, #4f46e5, #9333ea, #ec4899, #4f46e5); background-size: 300% 300%; animation: movingGradient 4s ease infinite; }
            .btn-animated:hover { animation: movingGradient 1.5s ease infinite; box-shadow: 0 0 25px rgba(147, 51, 234, 0.6); }
            @keyframes blobBounce { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
            .blob { animation: blobBounce 8s infinite ease-in-out; }
          `}</style>

          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 blob" style={{ animationDelay: '4s' }}></div>

          <div className="relative z-10 max-w-md w-full mx-4 bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/60 p-8 md:p-10 transform transition-all">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 mb-3 tracking-tight">
                Dashboard
              </h1>
              <p className="text-xs md:text-sm font-bold text-indigo-700 bg-indigo-50/80 inline-block px-5 py-2 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100">
                Multi Sistem Manajemen Hotel
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Username</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" required
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-800 font-medium shadow-sm"
                    value={username} onChange={e => setUsername(e.target.value)}
                    placeholder="Masukkan username..."
                  />
                </div>
              </div>
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" required
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-gray-800 font-medium shadow-sm"
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button 
                type="submit" disabled={isLoading}
                className="btn-animated w-full mt-8 flex justify-center items-center space-x-2 text-white p-4 rounded-2xl font-black text-lg shadow-[0_8px_20px_rgba(79,70,229,0.3)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed border border-white/20"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>Masuk ke Sistem</span>}
              </button>
            </form>
            <div className="mt-10 text-center border-t border-gray-200/50 pt-6">
              <p className="text-sm text-gray-500 font-medium">Belum memiliki akun staf?</p>
              <button onClick={() => setCurrentView('register')} className="mt-2 text-indigo-600 font-black hover:text-pink-600 transition-colors uppercase tracking-wide text-sm flex items-center justify-center mx-auto space-x-1">
                <span>Daftar Akun Baru</span> <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {currentView === 'register' && (
        <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-50">
          <style>{`
            @keyframes movingGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            .btn-animated { background: linear-gradient(270deg, #ec4899, #9333ea, #4f46e5, #ec4899); background-size: 300% 300%; animation: movingGradient 4s ease infinite; }
            .btn-animated:hover { animation: movingGradient 1.5s ease infinite; box-shadow: 0 0 25px rgba(236, 72, 153, 0.6); }
            .blob { animation: blobBounce 8s infinite ease-in-out; }
            @keyframes blobBounce { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
          `}</style>
          
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 blob"></div>
          <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 blob" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 max-w-md w-full mx-4 bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white/60 p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-600 mb-2">Pendaftaran</h2>
              <p className="text-xs md:text-sm font-bold text-indigo-700 bg-indigo-50/80 inline-block px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm border border-indigo-100">
                Multi Sistem Manajemen Hotel
              </p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Username Baru</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none text-gray-800 font-medium"
                    value={regUsername} onChange={e => setRegUsername(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none text-gray-800 font-medium"
                    value={regPassword} onChange={e => setRegPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Penempatan Hotel</label>
                <div className="relative flex items-center">
                  <Building2 className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <select 
                    className="w-full pl-12 pr-4 py-3.5 bg-white/80 border border-gray-200 rounded-xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all outline-none text-gray-800 font-medium cursor-pointer appearance-none"
                    value={regHotel} onChange={e => setRegHotel(e.target.value)}
                  >
                    {hotelsList.map(h => <option key={h.id} value={h.name}>{h.name}</option>)}
                  </select>
                </div>
              </div>
              <button 
                type="submit" disabled={isLoading}
                className="btn-animated w-full mt-6 flex justify-center items-center space-x-2 text-white p-4 rounded-xl font-black shadow-[0_8px_20px_rgba(236,72,153,0.3)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed border border-white/20"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Kirim Permintaan Akses</span>}
              </button>
            </form>
            <div className="mt-8 text-center border-t border-gray-200/50 pt-6">
              <button onClick={() => setCurrentView('login')} className="flex items-center justify-center space-x-1.5 text-sm font-bold text-gray-500 hover:text-indigo-600 mx-auto transition-colors">
                <ArrowLeft className="w-4 h-4" /> <span>Kembali ke Login</span>
              </button>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {currentView === 'admin' && (
        <AdminDashboard 
          currentUser={currentUser} 
          handleLogout={handleLogout} 
          setCurrentView={setCurrentView} 
          setSelectedHotel={setSelectedHotel} 
          showNotif={showNotif} 
        />
      )}
      
      {currentView === 'hotelSelection' && (
        <HotelSelectionDashboard 
          currentUser={currentUser}
          handleLogout={handleLogout}
          setCurrentView={setCurrentView}
          setSelectedHotel={setSelectedHotel}
        />
      )}

      {currentView === 'schedule' && (
        <ScheduleDashboard 
          selectedHotel={selectedHotel} 
          currentUser={currentUser} 
          setCurrentView={setCurrentView} 
          showNotif={showNotif} 
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}
