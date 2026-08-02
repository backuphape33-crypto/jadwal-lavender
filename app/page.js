"use client";
import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, Save, Download, Clock, User, CheckCircle2, AlertCircle, Image as ImageIcon, Eye, Edit3, Loader2 } from 'lucide-react';

const employees = [
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
];

const shiftOptions = [
  { id: 'HK1', label: 'HK (Shift 1)', type: 'HK', color: 'bg-orange-500 text-white' },
  { id: 'LD1', label: 'LD (Shift 1)', type: 'LD', color: 'bg-pink-500 text-white' },
  { id: 'GEN', label: 'GEN (Shift 1)', type: 'GEN', color: 'bg-teal-500 text-white' },
  { id: 'RC1', label: 'RC (Shift 1)', type: 'RC', color: 'bg-blue-500 text-white' },
  { id: 'RC2', label: 'RC (Shift 2)', type: 'RC', color: 'bg-blue-500 text-white' },
  { id: 'RC3', label: 'RC (Shift 3)', type: 'RC', color: 'bg-blue-500 text-white' },
  { id: 'SAKIT', label: 'SAKIT', type: 'STATUS', color: 'bg-yellow-500 text-white' },
  { id: 'IZIN', label: 'IZIN', type: 'STATUS', color: 'bg-purple-500 text-white' },
  { id: 'ALPA', label: 'ALPA', type: 'STATUS', color: 'bg-gray-500 text-white' },
  { id: 'OFF', label: 'OFF', type: 'STATUS', color: 'bg-red-700 text-white font-bold' },
];

export default function App() {
  const [schedule, setSchedule] = useState({});
  const [startDate, setStartDate] = useState('');
  const [dates, setDates] = useState([]);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' atau 'view'
  const [isSaving, setIsSaving] = useState(false);
  const scheduleRef = useRef(null);

  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate);
      const newDates = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        newDates.push({
          day: currentDate.toLocaleDateString('id-ID', { weekday: 'long' }),
          date: currentDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        });
      }
      setDates(newDates);
    }
  }, [startDate]);

  const handleShiftChange = (empId, dayIdx, shiftId) => {
    if (viewMode === 'view') return;
    setSchedule(prev => ({
      ...prev,
      [`${empId}-${dayIdx}`]: shiftId
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbw6C19I-zTrEHzFkIPdJstt6LQ-h-ySflJXaE0ScQzMOipk24RX7p1fL2IuV8K9YQ0v/exec';
      
      await fetch(URL_SCRIPT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: startDate,
          schedule: schedule
        })
      });
      
      alert('Jadwal berhasil disimpan ke sistem!');
    } catch (error) {
      alert('Terjadi kesalahan saat menyimpan data.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportImage = async (format) => {
    if (!scheduleRef.current) return;
    
    try {
      // Sembunyikan elemen yang tidak perlu dicetak (seperti tombol-tombol)
      const actionButtons = document.getElementById('action-buttons');
      const exportButtons = document.getElementById('export-buttons');
      if (actionButtons) actionButtons.style.display = 'none';
      if (exportButtons) exportButtons.style.display = 'none';

      // Beri sedikit jeda agar DOM terupdate
      await new Promise(resolve => setTimeout(resolve, 100));

      // Memuat library html-to-image secara otomatis via script (tanpa perlu npm install)
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

      // Download gambar
      const link = document.createElement('a');
      link.download = `Jadwal_Lavender_${startDate || 'Tabel'}.${format}`;
      link.href = dataUrl;
      link.click();

    } catch (error) {
      console.error('Export gagal:', error);
      alert('Gagal mengekspor gambar. Pastikan browser mendukung fitur ini.');
    } finally {
      // Tampilkan kembali tombol
      const actionButtons = document.getElementById('action-buttons');
      const exportButtons = document.getElementById('export-buttons');
      if (actionButtons) actionButtons.style.display = 'flex';
      if (exportButtons) exportButtons.style.display = 'flex';
    }
  };

  const getDeptColor = (dept) => {
    switch (dept) {
      case 'Housekeeping': return 'bg-orange-500 text-white';
      case 'Laundry': return 'bg-pink-500 text-white';
      case 'General': return 'bg-teal-500 text-white';
      case 'Receptionist': return 'bg-blue-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getCellColor = (empId, dayIdx) => {
    const shiftId = schedule[`${empId}-${dayIdx}`];
    if (!shiftId) return 'bg-white';
    const shift = shiftOptions.find(s => s.id === shiftId);
    return shift ? shift.color : 'bg-white';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-6 text-white flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <CalendarDays className="w-8 h-8 text-purple-200" />
            <div>
              <h1 className="text-2xl font-bold">Jadwal Shift Tim</h1>
              <p className="text-purple-200 text-sm">Hotel Lavender</p>
            </div>
          </div>

          <div id="action-buttons" className="flex items-center space-x-4 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
            <button 
              onClick={() => setViewMode('edit')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${viewMode === 'edit' ? 'bg-white text-purple-900 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
            >
              <Edit3 className="w-4 h-4" /> <span>Buat Jadwal</span>
            </button>
            <button 
              onClick={() => setViewMode('view')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${viewMode === 'view' ? 'bg-white text-purple-900 font-bold shadow-md' : 'text-white hover:bg-white/20'}`}
            >
              <Eye className="w-4 h-4" /> <span>Lihat Jadwal</span>
            </button>
          </div>
        </div>

        {/* Kontrol Penanggalan & Tombol */}
        <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" id="export-buttons">
          <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
            <Clock className="text-gray-400 w-5 h-5" />
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Mulai Hari Senin:</label>
              <input 
                type="date" 
                className="border-none bg-gray-100 text-sm p-2 rounded-md focus:ring-2 focus:ring-purple-500 outline-none w-48"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={viewMode === 'view'}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            {viewMode === 'edit' && (
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
               >
                 {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
               </button>
            )}
            
            <button onClick={() => window.print()} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
              <Download className="w-4 h-4" /> <span>PDF / Cetak</span>
            </button>
            <button onClick={() => handleExportImage('jpg')} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
              <ImageIcon className="w-4 h-4" /> <span>JPG</span>
            </button>
            <button onClick={() => handleExportImage('png')} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
              <ImageIcon className="w-4 h-4" /> <span>PNG</span>
            </button>
          </div>
        </div>

        {/* Area Jadwal yang akan diexport */}
        <div ref={scheduleRef} className="bg-white">
          <div className="p-6">
            {!startDate ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Silakan pilih tanggal "Mulai Hari Senin" di atas untuk memunculkan tabel jadwal.</p>
              </div>
            ) : (
              <div className="overflow-x-auto shadow-inner rounded-xl border border-gray-200">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-white border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1/5 border-r border-gray-200 bg-gray-50/80">
                        Karyawan
                      </th>
                      {dates.map((d, idx) => (
                        <th key={idx} className="py-4 px-3 text-center border-r border-gray-200 last:border-r-0 bg-gradient-to-b from-purple-50/60 to-transparent">
                          <div className="text-xs font-bold text-purple-800 uppercase tracking-wide">{d.day}</div>
                          <div className="text-[10px] text-purple-600 mt-1 bg-purple-100/50 inline-block px-2.5 py-0.5 rounded-full border border-purple-200/50 backdrop-blur-sm">{d.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 border-b border-gray-200">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                        
                        {/* Kolom Nama Karyawan (Warna Solid Full Block) */}
                        <td className="p-0 border-r border-gray-200 align-top">
                          <div className={`flex items-center space-x-3 py-3 px-4 h-full w-full ${getDeptColor(emp.department)}`}>
                            <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center shadow-sm shrink-0">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm">{emp.name}</div>
                              <div className="text-[10px] text-white/90 font-medium mt-0.5 tracking-wide">
                                {emp.department}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Kolom Jadwal Hari (Desain Dropdown Modern) */}
                        {dates.map((_, dayIdx) => (
                          <td key={dayIdx} className={`p-2 border-r border-gray-200 last:border-r-0 text-center align-middle bg-white group-hover:bg-gray-50 transition-colors`}>
                            {viewMode === 'edit' ? (
                              <div className="relative inline-block w-full max-w-[85px]">
                                <select
                                  className={`w-full appearance-none text-[11px] font-bold py-2 pl-2 pr-6 rounded-md cursor-pointer outline-none transition-all shadow-sm border
                                  ${schedule[`${emp.id}-${dayIdx}`]
                                    ? getCellColor(emp.id, dayIdx) + ' border-transparent'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-purple-300 focus:ring-2 focus:ring-purple-200'
                                  }`}
                                  value={schedule[`${emp.id}-${dayIdx}`] || ''}
                                  onChange={(e) => handleShiftChange(emp.id, dayIdx, e.target.value)}
                                >
                                  <option value="" className="text-gray-500 bg-white">- Pilih -</option>
                                  {shiftOptions.map(opt => (
                                    <option key={opt.id} value={opt.id} className="text-gray-800 bg-white">
                                      {opt.id}
                                    </option>
                                  ))}
                                </select>
                                {/* Ikon Panah Kustom Minimalis */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5">
                                  <svg className={`fill-current h-3 w-3 ${schedule[`${emp.id}-${dayIdx}`] ? 'text-white' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                  </svg>
                                </div>
                              </div>
                            ) : (
                               <div className="flex justify-center">
                                 <div className={`inline-block text-[11px] font-bold py-1.5 px-3 rounded-md shadow-sm min-w-[70px] ${schedule[`${emp.id}-${dayIdx}`] ? getCellColor(emp.id, dayIdx) : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
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

          {/* Keterangan / Legend (Ikut ter-export) */}
          <div className="bg-gray-50 p-6 border-t border-gray-200 text-sm">
             <h3 className="font-bold text-gray-700 mb-4 flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500"/> Keterangan Shift & Divisi</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-orange-500">
                  <div className="font-bold text-orange-600 mb-1">Housekeeping (HK)</div>
                  <div className="text-gray-600 text-xs">HK1: 07:00 - 17:00</div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-pink-500">
                  <div className="font-bold text-pink-600 mb-1">Laundry (LD)</div>
                  <div className="text-gray-600 text-xs">LD1: 07:00 - 17:00</div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-teal-500">
                  <div className="font-bold text-teal-600 mb-1">General (GEN)</div>
                  <div className="text-gray-600 text-xs">GEN1: 08:00 - 20:00</div>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 shadow-sm border-l-4 border-l-blue-500">
                  <div className="font-bold text-blue-600 mb-1">Receptionist (RC)</div>
                  <div className="text-gray-600 text-xs flex flex-col space-y-1 mt-1">
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