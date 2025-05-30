"use client";

import React, { useEffect, useState } from 'react';

const DashOrtu = () => {
  // Placeholder data - replace with actual data fetched from API
  // Added dailyStatus array for visual calendar representation
  const childData = {
    name: 'Nama Anak',
    grade: 'Kelas X',
    progress: [
      { subject: 'Matematika', score: 85, status: 'Baik', notes: 'Memahami konsep dasar dengan baik.' },
      { subject: 'Bahasa Inggris', score: 92, status: 'Sangat Baik', notes: 'Aktif dalam diskusi kelas.' },
      { subject: 'Fisika', score: 78, status: 'Cukup', notes: 'Perlu latihan tambahan pada soal cerita.' },
      { subject: 'Kimia', score: 60, status: 'Kurang', notes: 'Perlu bimbingan intensif.' },
    ],
    selfDevelopment: [
      { activity: 'Pramuka', status: 'Aktif', notes: 'Mengikuti kegiatan rutin dengan antusias.' },
      { activity: 'Lomba Sains Tingkat Kota', status: 'Peserta', notes: 'Berpartisipasi dan mendapatkan pengalaman berharga.' },
    ],
    character: [
      { aspect: 'Kedisiplinan', rating: 'Baik', notes: 'Selalu datang tepat waktu.' },
      { aspect: 'Kerja Sama', rating: 'Sangat Baik', notes: 'Aktif membantu teman dalam tugas kelompok.' },
      { aspect: 'Inisiatif', rating: 'Cukup', notes: 'Perlu dorongan untuk mengambil inisiatif.' },
    ],
    attendance: [
      {
        month: 'Mei 2025',
        present: 20,
        absent: 1,
        sick: 0,
        permission: 0,
        notes: 'Satu hari izin karena keperluan keluarga.',
        // Sample daily status - replace with actual daily data
        dailyStatus: [
          { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' }, { day: 4, status: 'present' }, { day: 5, status: 'present' },
          { day: 6, status: 'present' }, { day: 7, status: 'present' }, { day: 8, status: 'present' }, { day: 9, status: 'present' }, { day: 10, status: 'present' },
          { day: 11, status: 'present' }, { day: 12, status: 'present' }, { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'present' },
          { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'present' }, { day: 19, status: 'present' }, { day: 20, status: 'present' },
          { day: 21, status: 'absent' }, // Example absent day
          { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'present' }, { day: 25, status: 'present' },
          { day: 26, status: 'present' }, { day: 27, status: 'present' }, { day: 28, status: 'present' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
          { day: 31, status: 'present' },
        ]
      },
      {
        month: 'April 2025',
        present: 22,
        absent: 0,
        sick: 0,
        permission: 0,
        notes: '-',
        // Sample daily status - replace with actual daily data
         dailyStatus: [
          { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' }, { day: 4, status: 'present' }, { day: 5, status: 'present' },
          { day: 6, status: 'present' }, { day: 7, status: 'present' }, { day: 8, status: 'present' }, { day: 9, status: 'present' }, { day: 10, status: 'present' },
          { day: 11, status: 'present' }, { day: 12, status: 'present' }, { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'present' },
          { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'present' }, { day: 19, status: 'present' }, { day: 20, status: 'present' },
          { day: 21, status: 'present' }, { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'present' }, { day: 25, status: 'present' },
          { day: 26, status: 'present' }, { day: 27, status: 'present' }, { day: 28, status: 'present' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
        ]
      },
    ],
  };

  const getScoreColor = (score) => {
    if (score >= 80) {
      return 'bg-green-500';
    } else if (score >= 70) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  // Function to get color for attendance status
  const getAttendanceColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'absent':
        return 'bg-red-500';
      case 'sick':
      case 'permission':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-600'; // Default color for unknown status or non-recorded days
    }
  };


  // State to manage animated widths for progress bars
  const [animatedWidths, setAnimatedWidths] = useState({});

  useEffect(() => {
    // Animate widths after component mounts
    const timer = setTimeout(() => {
      const initialWidths = {};
      childData.progress.forEach((item, index) => {
        initialWidths[index] = item.score;
      });
      setAnimatedWidths(initialWidths);
    }, 100); // Small delay to ensure transition works

    return () => clearTimeout(timer);
  }, [childData.progress]); // Re-run if progress data changes

  return (
    // Remove container mx-auto
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Dashboard Orang Tua</h1>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-opacity duration-700 ease-in opacity-100 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Informasi Anak</h2>
        <p className="text-gray-300">
          <span className="font-medium">Nama:</span> {childData.name}
        </p>
        <p className="text-gray-300">
          <span className="font-medium">Kelas:</span> {childData.grade}
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-opacity duration-700 ease-in opacity-100 animate-fadeIn delay-150">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Progress Pembelajaran</h2>

        {childData.progress.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Mata Pelajaran
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Nilai/Skor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Catatan Guru
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {childData.progress.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center">
                        <span className="mr-2">{item.score}</span>
                        {/* Progress bar graphic */}
                        <div className="w-24 bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${getScoreColor(item.score)}`}
                            // Use animated width from state, default to 0
                            style={{ width: `${animatedWidths[index] || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-300">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada data progress pembelajaran.</p>
        )}
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-opacity duration-700 ease-in opacity-100 animate-fadeIn delay-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Pengembangan Diri</h2>

        {childData.selfDevelopment.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Kegiatan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Catatan Guru
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {childData.selfDevelopment.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {item.activity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-300">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada data pengembangan diri.</p>
        )}
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-opacity duration-700 ease-in opacity-100 animate-fadeIn delay-500">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Karakter</h2>

        {childData.character.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Aspek
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Penilaian
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Catatan Guru
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {childData.character.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                      {item.aspect}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {item.rating}
                    </td>
                    <td className="px-6 py-4 whitespace-wrap text-sm text-gray-300">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada data karakter.</p>
        )}
      </div>

      {/* Attendance Section - Changed to visual calendar summary per month */}
      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-opacity duration-700 ease-in opacity-100 animate-fadeIn delay-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Presensi</h2>

        {childData.attendance.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {childData.attendance.map((monthData, monthIndex) => (
              <div key={monthIndex} className="bg-gray-700 rounded-md p-4 hover:bg-gray-600 transition duration-150 ease-in-out">
                <h3 className="text-lg font-semibold mb-3 text-gray-100">{monthData.month}</h3>
                {/* Simple legend */}
                 <div className="flex justify-center space-x-4 text-xs text-gray-300 mb-4">
                    <span className="flex items-center"><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> Hadir</span>
                    <span className="flex items-center"><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> Alpa</span>
                    <span className="flex items-center"><span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span> Sakit/Izin</span>
                 </div>
                {/* Calendar grid - using flex wrap for simplicity */}
                <div className="flex flex-wrap gap-1">
                  {monthData.dailyStatus.map((dayData, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-medium text-gray-900 ${getAttendanceColor(dayData.status)}`}
                      title={`Day ${dayData.day}: ${dayData.status}`} // Add tooltip for detail
                    >
                      {/* Display day number if needed, or just use color */}
                      {/* {dayData.day} */}
                    </div>
                  ))}
                </div>
                 {monthData.notes && (
                    <p className="text-xs text-gray-400 mt-4">
                      Catatan: {monthData.notes}
                    </p>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada data presensi.</p>
        )}
      </div>
    </div>
  );
};

export default DashOrtu;