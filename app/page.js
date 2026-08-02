"use client";
import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, Save, Download, Clock, User, CheckCircle2, AlertCircle, Image as ImageIcon, Eye, Edit3, Loader2 } from 'lucide-react';

const employees = [
  { id: 1, name: 'Haikal', department: 'Housekeeping', code: 'HK' },
  { id: 2, name: 'Arif', department: 'Housekeeping', code: 'HK' },
  { id: 3, name: 'Siska', department: 'Housekeeping', code: 'HK' },
  { id: 4, name: 'Andre', department: 'Housekeeping', code: 'HK' },
  { id: 5, name: 'Fahmi', department: 'Housekeeping', code: 'HK' },
  { id: 6, name: 'Ady', department: 'Housekeeping', code: 'HK' },
  { id: 7, name: 'Salman', department: 'General', code: 'GEN' },
  { id: 8, name: 'Indah', department: 'Laundry', code: 'LD' },
  { id: 9, name: 'Tabhita', department: 'Receptionist', code: 'RC' },
  { id: 10, name: 'Alit', department: 'Receptionist', code: 'RC' },
  { id: 11, name: 'Billa', department: 'Receptionist', code: 'RC' },
  
];

const shiftOptions = [
  { id: 'HK1', label: 'HK (07-17)', color: 'bg-orange-500 text-white' },
  { id: 'LD1', label: 'LD (07-17)', color: 'bg-pink-500 text-white' },
  { id: 'GEN', label: 'GEN (08-20)', color: 'bg-teal-600 text-white' },
  { id: 'RC1', label: 'RC (07-15)', color: 'bg-blue-600 text-white' },
  { id: 'RC2', label: 'RC (15-23)', color: 'bg-blue-600 text-white' },
  { id: 'RC3', label: 'RC (23-07)', color: 'bg-blue-600 text-white' },
  { id: 'OFF', label: 'OFF', color: 'bg-red-700 text-white' }, // OFF warna merah pekat
];

const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbw6C19I-zTrEHzFkIPdJstt6LQ-h-ySflJXaE0ScQzMOipk24RX7p1fL2IuV8K9YQ0v/exec';

export default function ScheduleDashboard() {
  const [schedule, setSchedule] = useState({});
  const [startDate, setStartDate] = useState('');
  const [viewMode, setViewMode] = useState('edit'); 
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const scheduleRef = useRef(null);

  const fetchData = async (date) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${URL_SCRIPT}?startDate=${date}`);
      const result = await res.json();
      if (result && result.schedule) {
        setSchedule(result.schedule);
      } else {
        setSchedule({}); // Kosongkan jika belum ada jadwal
      }
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      
      // Tarik data otomatis dari Spreadsheet setiap kali tanggal dipilih
      fetchData(startDate);
    }
  }, [startDate]);

  const handleShiftChange = (empId, dayIdx, shiftId) => {
    setSchedule(prev => ({
      ...prev,
      [`${empId}-${dayIdx}`]: shiftId
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Menggunakan URLSearchParams agar lolos dari blokir keamanan browser (CORS)
      const formData = new URLSearchParams();
      formData.append('data', JSON.stringify({
        startDate: startDate,
        schedule: schedule
      }));

      await fetch(URL_SCRIPT, {
        method: 'POST',
        body: formData,
      });
      
      alert('Jadwal berhasil disimpan ke sistem Spreadsheet!');
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data. Cek koneksi.');
      console.error(error);
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
      link.download = `Jadwal_Lavender_${startDate || 'Tabel'}.${format}`;
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
    <div className="min-h-screen bg-gray-50 p-2 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header - Responsif untuk HP */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4 md:p-6 text-white flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3 w-full md:w-auto justify-center md:justify-start">
            <CalendarDays className="w-7 h-7 md:w-8 md:h-8 text-purple-200 shrink-0" />
            <div className="text-center md:text-left">
              <h1 className="text-lg md:text-2xl font-bold leading-tight">Jadwal Shift Tim</h1>
              <p className="text-purple-200 text-xs md:text-sm">Hotel Lavender</p>
            </div>
          </div>

          <div id="action-buttons" className="flex w-full md:w-auto items-center space-x-2 bg-white/10 p-1.5 rounded-lg backdrop-blur-sm">
            <button 
              onClick={() => setViewMode('edit')}
              className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-3 py-2 rounded-md transition-all text-xs md:text-sm ${viewMode === 'edit' ? 'bg-white text-purple-900 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
            >
              <Edit3 className="w-3.5 h-3.5" /> <span>Edit Jadwal</span>
            </button>
            <button 
              onClick={() => setViewMode('view')}
              className={`flex-1 md:flex-none flex justify-center items-center space-x-2 px-3 py-2 rounded-md transition-all text-xs md:text-sm ${viewMode === 'view' ? 'bg-white text-purple-900 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
            >
              <Eye className="w-3.5 h-3.5" /> <span>Lihat Jadwal</span>
            </button>
          </div>
        </div>

        {/* Kontrol Penanggalan & Tombol Action - Menyesuaikan bentuk di HP */}
        <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0" id="export-buttons">
          <div className="flex items-center space-x-3 bg-white p-2.5 md:p-3 rounded-lg shadow-sm border border-gray-200 w-full lg:w-auto">
            <Clock className="text-purple-500 w-5 h-5 shrink-0" />
            <div className="w-full flex flex-col">
              <label className="block text-[10px] md:text-xs font-bold text-gray-500 mb-0.5 uppercase tracking-wide">Mulai Hari Senin:</label>
              <input 
                type="date" 
                className="border-none bg-gray-100 text-sm md:text-base p-1.5 md:p-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none w-full md:w-48 cursor-pointer"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:flex gap-2 md:space-x-3 w-full lg:w-auto">
            {viewMode === 'edit' && (
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="col-span-2 md:col-span-1 flex justify-center items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 md:py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
               >
                 {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 <span>{isSaving ? 'Menyimpan...' : 'Simpan ke Sistem'}</span>
               </button>
            )}
            
            <button onClick={() => window.print()} className="flex justify-center items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all shadow-sm active:scale-95">
              <Download className="w-3.5 h-3.5" /> <span>PDF / Cetak</span>
            </button>
            <button onClick={() => handleExportImage('jpg')} className="flex justify-center items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all shadow-sm active:scale-95">
              <ImageIcon className="w-3.5 h-3.5" /> <span>JPG</span>
            </button>
            <button onClick={() => handleExportImage('png')} className="flex justify-center items-center space-x-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all shadow-sm active:scale-95">
              <ImageIcon className="w-3.5 h-3.5" /> <span>PNG</span>
            </button>
          </div>
        </div>

        {/* Petunjuk Geser Khusus HP */}
        {startDate && (
          <div className="md:hidden bg-indigo-50 border-b border-indigo-100 py-1.5 px-4 text-center">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center justify-center animate-pulse">
              <AlertCircle className="w-3 h-3 mr-1.5" /> Geser tabel ke kanan untuk melihat full 👉
            </span>
          </div>
        )}

        {}
        {/* Area Jadwal yang akan diexport */}
        <div ref={scheduleRef} className="bg-white">
          <div className="p-0 md:p-6">
            {!startDate ? (
              <div className="text-center py-12 md:py-16 bg-gray-50 rounded-none md:rounded-xl border-y md:border border-dashed border-gray-300 m-4 md:m-0">
                <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm md:text-base px-4">Silakan pilih tanggal "Mulai Hari Senin" di atas untuk memunculkan tabel jadwal.</p>
              </div>
            ) : isLoading ? (
              <div className="text-center py-12 md:py-16 bg-white rounded-none md:rounded-xl border-y md:border border-gray-200 m-4 md:m-0 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                <p className="text-gray-500 font-bold animate-pulse">Menarik data dari Spreadsheet...</p>
              </div>
            ) : (
              <div className="overflow-x-auto shadow-inner rounded-none md:rounded-xl border-y md:border border-gray-200 relative">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="sticky left-0 z-20 py-3 px-3 md:py-4 md:px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-[120px] md:w-1/5 border-r border-gray-200 bg-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        Karyawan
                      </th>
                      {dates.map((d, idx) => (
                        <th key={idx} className="py-3 px-2 md:py-4 md:px-3 text-center border-r border-gray-200 last:border-r-0 bg-gradient-to-b from-purple-50/60 to-transparent min-w-[85px] md:min-w-[100px]">
                          <div className="text-[10px] md:text-xs font-bold text-purple-800 uppercase tracking-wide">{d.day}</div>
                          <div className="text-[9px] md:text-[10px] text-purple-600 mt-1 bg-purple-100/50 inline-block px-1.5 md:px-2 py-0.5 rounded-full border border-purple-200/50 backdrop-blur-sm shadow-sm">{d.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                        
                        <td className="sticky left-0 z-10 p-0 border-r border-gray-200 align-top shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] bg-white">
                          <div className={`flex items-center space-x-0 md:space-x-2 py-2 px-2 md:py-3 md:px-3 h-full w-full ${getDeptColor(emp.department)}`}>
                            <div className="hidden md:flex w-7 h-7 rounded-full bg-black/10 items-center justify-center shadow-inner shrink-0">
                              <User className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="w-full text-center md:text-left">
                              <div className="font-extrabold text-white text-[11px] md:text-sm tracking-wide leading-tight">{emp.name}</div>
                              <div className="text-[8px] md:text-[10px] text-white/90 font-medium mt-0.5 uppercase tracking-wider">
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
                                  className={`w-full appearance-none text-[10px] md:text-[11px] font-bold py-1.5 md:py-2 pl-2 md:pl-2.5 pr-5 md:pr-6 rounded cursor-pointer outline-none transition-all shadow-sm border
                                  ${schedule[`${emp.id}-${dayIdx}`]
                                    ? getCellColor(emp.id, dayIdx) + ' border-transparent'
                                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-200'
                                  }`}
                                  value={schedule[`${emp.id}-${dayIdx}`] || ''}
                                  onChange={(e) => handleShiftChange(emp.id, dayIdx, e.target.value)}
                                >
                                  <option value="" className="text-gray-400 bg-white">- -</option>
                                  {shiftOptions.map(opt => (
                                    <option key={opt.id} value={opt.id} className="text-gray-800 bg-white font-medium">
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
                                 <div className={`inline-flex justify-center items-center text-[10px] md:text-[11px] font-bold py-1 md:py-1.5 px-2 rounded min-w-[50px] md:min-w-[60px] shadow-sm ${schedule[`${emp.id}-${dayIdx}`] ? getCellColor(emp.id, dayIdx) : 'bg-gray-50 text-gray-300 border border-gray-100'}`}>
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

          {}
          {/* Keterangan / Legend */}
          <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-200 text-sm">
             <h3 className="font-bold text-gray-700 mb-3 md:mb-4 flex items-center text-xs md:text-sm"><CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2 text-green-500"/> Keterangan Shift & Divisi</h3>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                <div className="bg-white p-2 md:p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
                  <div className="font-extrabold text-orange-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Housekeeping</div>
                  <div className="text-gray-600 text-[9px] md:text-xs font-medium">HK1: 07:00 - 17:00</div>
                </div>
                <div className="bg-white p-2 md:p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-pink-500">
                  <div className="font-extrabold text-pink-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Laundry</div>
                  <div className="text-gray-600 text-[9px] md:text-xs font-medium">LD1: 07:00 - 17:00</div>
                </div>
                <div className="bg-white p-2 md:p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-teal-600">
                  <div className="font-extrabold text-teal-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">General</div>
                  <div className="text-gray-600 text-[9px] md:text-xs font-medium">GEN: 08:00 - 20:00</div>
                </div>
                <div className="bg-white p-2 md:p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-blue-600">
                  <div className="font-extrabold text-blue-600 mb-0.5 md:mb-1 text-[10px] md:text-xs uppercase tracking-wide">Receptionist</div>
                  <div className="text-gray-600 text-[9px] md:text-xs font-medium flex flex-col space-y-0.5 mt-0.5 md:mt-1">
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
  );
}
