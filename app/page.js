import React, { useState, useRef, useEffect } from 'react';
import { 
  Hotel, ShieldCheck, LogOut, Loader2, ArrowLeft, 
  CalendarDays, Save, Download, Clock, User, 
  CheckCircle2, AlertCircle, Image as ImageIcon, 
  Eye, Edit3, Building, Users 
} from 'lucide-react';

const employees = {
  'Hotel Lavender': [
    { id: 1, name: 'Haikal', department: 'Housekeeping', code: 'HK' },
    { id: 2, name: 'Arif', department: 'Housekeeping', code: 'HK' },
    { id: 3, name: 'Siska', department: 'Housekeeping', code: 'HK' },
    { id: 4, name: 'Andre', department: 'Housekeeping', code: 'HK' },
    { id: 5, name: 'Fahmi', department: 'Housekeeping', code: 'HK' },
    { id: 6, name: 'Salman', department: 'General', code: 'GEN' },
    { id: 7, name: 'Indah', department: 'Laundry', code: 'LD' },
    { id: 8, name: 'Tabhita', department: 'Receptionist', code: 'RC' },
    { id: 9, name: 'Alit', department: 'Receptionist', code: 'RC' },
    { id: 10, name: 'Billa', department: 'Receptionist', code: 'RC' },
    { id: 11, name: 'Budi', department: 'Housekeeping', code: 'HK' },
  ],
  'Hotel Mawar': [
     { id: 101, name: 'Andi', department: 'Housekeeping', code: 'HK' },
     { id: 102, name: 'Budi', department: 'Receptionist', code: 'RC' },
     { id: 103, name: 'Cici', department: 'General', code: 'GEN' },
  ]
};

const hotelsList = [
  { id: 'h1', name: 'Hotel Lavender', location: 'Pusat Kota', empCount: 11 },
  { id: 'h2', name: 'Hotel Mawar', location: 'Jakarta Selatan', empCount: 3 },
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
    <footer className="w-full text-center py-6 text-xs text-gray-500 font-medium mt-auto">
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
    setTimeout(() => {
      onLogin(username, password);
      setLoading(false);
    }, 1000); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
            <Hotel className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h2>
          <p className="mt-2 text-center text-sm text-gray-500 font-bold uppercase tracking-widest">Multi Sistem Manajemen Hotel</p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Username</label>
                <div className="mt-1">
                  <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="Masukkan username" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="mt-1">
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" placeholder="••••••••" />
                </div>
              </div>
              
              <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Masuk / Login'}
              </button>
            </form>
            
            <div className="mt-8 text-center border-t border-gray-100 pt-6">
               <span className="text-sm text-gray-500">Belum punya akun? </span>
               <button onClick={() => onNavigate('register')} disabled={loading} className="text-sm text-purple-600 hover:text-purple-800 font-bold transition-colors">Daftar Sekarang</button>
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
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Registrasi berhasil!");
      onNavigate('login');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="mb-6 text-center">
           <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pendaftaran Akun</h2>
           <p className="mt-2 text-sm text-gray-500 font-bold uppercase tracking-widest">Multi Sistem Manajemen Hotel</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Nama Anda" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="email@contoh.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required className="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Buat kata sandi" />
            </div>
             <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Daftar Sekarang'}
             </button>
          </form>
          <div className="text-center text-sm text-gray-600 mt-8 border-t border-gray-100 pt-6">
            Sudah punya akun? <button type="button" onClick={() => onNavigate('login')} className="text-blue-600 font-bold hover:text-blue-800 transition-colors" disabled={loading}>Masuk di sini</button>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

function AdminDashboard({ user, onLogout, onSelectHotel }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-100 to-blue-50 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-purple-700" />
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

        {/* Hotels Grid */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><Building className="w-6 h-6 mr-2 text-purple-600" /> Daftar Cabang Hotel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsList.map(hotel => (
             <div 
                key={hotel.id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1.5 duration-300" 
                onClick={() => onSelectHotel(hotel.name)}
             >
               <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Hotel className="w-6 h-6 text-blue-600" />
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
                  <button className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center group bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    Kelola <ArrowLeft className="w-4 h-4 ml-1 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
             </div>
          ))}
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
  const [isLoading, setIsLoading] = useState(false);
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
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Jadwal berhasil disimpan ke sistem!');
    }, 1500);
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
          script.onerror = () => reject(new Error('Gagal memuat pembuat gambar'));
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
      link.download = `Jadwal_${hotel}_${startDate || 'Tabel'}.${format}`;
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
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {isLoading && (
         <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
            <span className="font-bold text-gray-700">Memuat data...</span>
         </div>
      )}

      <div className="p-2 md:p-8 font-sans text-gray-800 flex-grow">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Controls */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 md:p-6 text-white flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <button onClick={onBack} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors active:scale-95" title="Kembali ke Dashboard">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <CalendarDays className="w-7 h-7 md:w-8 md:h-8 text-purple-200 shrink-0" />
                <div className="text-left">
                  <h1 className="text-lg md:text-2xl font-extrabold leading-tight">Jadwal Shift Tim</h1>
                  <p className="text-purple-200 text-xs md:text-sm font-bold uppercase tracking-wider mt-0.5">{hotel} | MSMH</p>
                </div>
              </div>
            </div>

            <div id="action-buttons" className="flex items-center space-x-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-sm w-full md:w-auto">
              <button 
                onClick={() => setViewMode('edit')}
                className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'edit' ? 'bg-white text-purple-900 font-bold shadow-md' : 'text-white hover:bg-white/20 font-medium'}`}
              >
                <Edit3 className="w-4 h-4" /> <span>Edit Jadwal</span>
              </button>
              <button 
                onClick={() => setViewMode('view')}
                className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-4 py-2 rounded-lg transition-all text-xs md:text-sm ${viewMode === 'view' ? 'bg-white text-purple-900 font-bold shadow-md' : 'text-white hover:bg-white/20 font-medium'}`}
              >
                <Eye className="w-4 h-4" /> <span>Lihat Jadwal</span>
              </button>
            </div>
          </div>

          {/* Date Picker & Exports */}
          <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0" id="export-buttons">
            <div className="flex items-center space-x-3 bg-white p-2.5 md:p-3 rounded-xl shadow-sm border border-gray-200 w-full lg:w-auto">
              <Clock className="text-purple-500 w-5 h-5 shrink-0" />
              <div className="w-full flex flex-col">
                <label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-0.5 uppercase tracking-wide">Mulai Hari Senin:</label>
                <input 
                  type="date" 
                  className="border-none bg-gray-50 text-sm md:text-base p-1.5 md:p-2 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none w-full md:w-48 cursor-pointer font-medium"
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
              
              <button onClick={() => window.print()} className="flex justify-center items-center space-x-1.5 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2.5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                <Download className="w-4 h-4" /> <span>PDF / Cetak</span>
              </button>
              <button onClick={() => handleExportImage('jpg')} className="flex justify-center items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                <ImageIcon className="w-4 h-4" /> <span>JPG</span>
              </button>
              <button onClick={() => handleExportImage('png')} className="flex justify-center items-center space-x-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 md:py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                <ImageIcon className="w-4 h-4" /> <span>PNG</span>
              </button>
            </div>
          </div>

          {/* Mobile Scroll Indicator */}
          {startDate && (
            <div className="md:hidden bg-blue-50 border-b border-blue-100 py-2 px-4 text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center justify-center animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 mr-1.5" /> Geser tabel ke kanan untuk melihat full 👉
              </span>
            </div>
          )}

          {/* Table Area */}
          <div ref={scheduleRef} className="bg-white">
            <div className="p-0 md:p-6">
              {!startDate ? (
                <div className="text-center py-12 md:py-16 bg-gray-50 rounded-none md:rounded-2xl border-y md:border border-dashed border-gray-300 m-4 md:m-0">
                  <CalendarDays className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold text-sm md:text-base px-4">Silakan pilih tanggal "Mulai Hari Senin" di atas untuk memunculkan tabel jadwal.</p>
                </div>
              ) : (
                <div className="overflow-x-auto shadow-inner rounded-none md:rounded-2xl border-y md:border border-gray-200 relative">
                  <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="sticky left-0 z-20 py-3 px-3 md:py-4 md:px-6 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider w-[120px] md:w-1/5 border-r border-gray-200 bg-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                          Staf
                        </th>
                        {dates.map((d, idx) => (
                          <th key={idx} className="py-3 px-2 md:py-4 md:px-3 text-center border-r border-gray-200 last:border-r-0 bg-gradient-to-b from-purple-50/60 to-transparent min-w-[85px] md:min-w-[100px]">
                            <div className="text-[10px] md:text-xs font-extrabold text-purple-900 uppercase tracking-wide">{d.day}</div>
                            <div className="text-[9px] md:text-[10px] font-bold text-purple-700 mt-1 bg-purple-100/50 inline-block px-2 md:px-2.5 py-0.5 rounded-full border border-purple-200/50 backdrop-blur-sm shadow-sm">{d.date}</div>
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
                            <td key={dayIdx} className={`p-1.5 md:p-2 border-r border-gray-100 last:border-r-0 text-center align-middle bg-white group-hover:bg-purple-50/30 transition-colors`}>
                              {viewMode === 'edit' ? (
                                <div className="relative inline-block w-full max-w-[70px] md:max-w-[80px]">
                                  <select
                                    className={`w-full appearance-none text-[10px] md:text-[11px] font-extrabold py-1.5 md:py-2 pl-2 md:pl-2.5 pr-5 md:pr-6 rounded-md cursor-pointer outline-none transition-all shadow-sm border
                                    ${schedule[`${emp.id}-${dayIdx}`]
                                      ? getCellColor(emp.id, dayIdx) + ' border-transparent'
                                      : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-200'
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
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 md:px-1.5">
                                    <svg className={`fill-current h-2.5 w-2.5 md:h-3 md:w-3 ${schedule[`${emp.id}-${dayIdx}`] ? 'text-white/80' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                  </div>
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

            {/* Legend Component */}
            <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-200 text-sm">
               <h3 className="font-extrabold text-gray-800 mb-3 md:mb-4 flex items-center text-xs md:text-sm"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 text-green-500"/> Keterangan Shift & Divisi</h3>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                  <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
                    <div className="font-extrabold text-orange-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Housekeeping</div>
                    <div className="text-gray-600 text-[9px] md:text-xs font-bold">HK1: 07:00 - 17:00</div>
                  </div>
                  <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-pink-500">
                    <div className="font-extrabold text-pink-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Laundry</div>
                    <div className="text-gray-600 text-[9px] md:text-xs font-bold">LD1: 07:00 - 17:00</div>
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
                      <span>RC3: 23:00 - 07:00</span>
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
    setUser({ username, role: 'admin' });
    setCurrentPage('admin_dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedHotel(null);
    setCurrentPage('login');
  };

  return (
    <>
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
