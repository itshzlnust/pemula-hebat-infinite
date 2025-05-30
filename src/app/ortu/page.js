"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

const DashOrtu = () => {
  // Placeholder data - replace with actual data fetched from API
  // Updated data structure to support multiple children
  const allChildrenData = [
    {
      id: 1,
      name: 'Nama Anak 1',
      grade: 'Kelas X',
      progress: [
        { subject: 'Matematika', tugas: 85, uts: 80, uas: 88, predicate: 'A', teacherName: 'Budi Santoso S.Pd' },
        { subject: 'Bahasa Inggris', tugas: 90, uts: 95, uas: 92, predicate: 'A', teacherName: 'Siti Alya S.Pd' },
        { subject: 'IPA Terpadu', tugas: 70, uts: 78, uas: 75, predicate: 'B', teacherName: 'Agustiawan Ramadhani S.Pd' },
        { subject: 'PPKn', tugas: 88, uts: 85, uas: 90, predicate: 'A', teacherName: 'Dewi Lestari S.Pd' },
        { subject: 'Bahasa Indonesia', tugas: 92, uts: 89, uas: 90, predicate: 'A', teacherName: 'Rizky Pratama S.Pd' },
        { subject: 'IPS Terpadu', tugas: 80, uts: 85, uas: 82, predicate: 'B', teacherName: 'Ahmad Fauzi S.Pd' },
        { subject: 'Seni Budaya', tugas: 95, uts: 94, uas: 96, predicate: 'A', teacherName: 'Maya Sari S.Sn' },
        { subject: 'Pendidikan Jasmani', tugas: 88, uts: 90, uas: 89, predicate: 'A', teacherName: 'Joko Susilo S.Pd' },
      ],
      selfDevelopment: [
        { activity: 'Pramuka', notes: 'Mengikuti kegiatan rutin dengan antusias.' },
        { activity: 'Lomba Sains Tingkat Kota', notes: 'Berpartisipasi dan mendapatkan pengalaman berharga.' },
      ],
      attendance: [
        {
          month: 'Mei 2025',
          present: 20, absent: 1, sick: 0, permission: 0, notes: 'Satu hari izin karena keperluan keluarga.',
          dailyStatus: [
            { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' }, { day: 4, status: 'present' }, { day: 5, status: 'present' },
            { day: 6, status: 'present' }, { day: 7, status: 'present' }, { day: 8, status: 'present' }, { day: 9, status: 'present' }, { day: 10, status: 'present' },
            { day: 11, status: 'present' }, { day: 12, status: 'present' }, { day: 13, status: 'present' }, { day: 14, status: 'present' }, { day: 15, status: 'present' },
            { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'present' }, { day: 19, status: 'present' }, { day: 20, status: 'present' },
            { day: 21, status: 'absent' },
            { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'present' }, { day: 25, status: 'present' },
            { day: 26, status: 'present' }, { day: 27, status: 'present' }, { day: 28, status: 'present' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
            { day: 31, status: 'present' },
          ]
        },
        {
          month: 'April 2025',
          present: 22, absent: 0, sick: 0, permission: 0, notes: '-',
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
    },
    {
      id: 2,
      name: 'Nama Anak 2',
      grade: 'Kelas XI',
      progress: [
        { subject: 'Fisika', tugas: 75, uts: 70, uas: 78, predicate: 'B', teacherName: 'Cahyo Utomo S.Pd' },
        { subject: 'Kimia', tugas: 88, uts: 85, uas: 90, predicate: 'A', teacherName: 'Nurul Huda S.Pd' },
      ],
      selfDevelopment: [
        { activity: 'Olimpiade Fisika', notes: 'Persiapan intensif untuk lomba.' },
      ],
      attendance: [
        {
          month: 'Mei 2025',
          present: 18, absent: 0, sick: 2, permission: 1, notes: 'Sakit 2 hari, izin 1 hari.',
          dailyStatus: [
            { day: 1, status: 'present' }, { day: 2, status: 'present' }, { day: 3, status: 'present' }, { day: 4, status: 'present' }, { day: 5, status: 'present' },
            { day: 6, status: 'present' }, { day: 7, status: 'present' }, { day: 8, status: 'present' }, { day: 9, status: 'present' }, { day: 10, status: 'present' },
            { day: 11, status: 'present' }, { day: 12, status: 'present' }, { day: 13, status: 'sick' }, { day: 14, status: 'sick' }, { day: 15, status: 'present' },
            { day: 16, status: 'present' }, { day: 17, status: 'present' }, { day: 18, status: 'present' }, { day: 19, status: 'present' }, { day: 20, status: 'present' },
            { day: 21, status: 'present' }, { day: 22, status: 'present' }, { day: 23, status: 'present' }, { day: 24, status: 'present' }, { day: 25, status: 'present' },
            { day: 26, status: 'permission' }, { day: 27, status: 'present' }, { day: 28, status: 'present' }, { day: 29, status: 'present' }, { day: 30, status: 'present' },
            { day: 31, status: 'present' },
          ]
        },
      ],
    },
  ];

  const [selectedChildIndex, setSelectedChildIndex] = useState(0); // State to track selected child index
  const childData = allChildrenData[selectedChildIndex]; // Get data for the currently selected child

  // Function to handle child selection change
  const handleChildChange = (event) => {
    setSelectedChildIndex(parseInt(event.target.value, 10));
  };

  // Function to handle logout (placeholder)
  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement actual logout logic here (e.g., clear session, redirect)
  };


  // Function to get color based on score
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
        return 'bg-gray-400'; // Light grey for unknown status or non-recorded days
    }
  };

  // Define animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Define animation variants for list items (e.g., table rows or calendar days)
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Helper function to get month number (0-indexed) from month name
  const getMonthNumber = (monthName) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return months.indexOf(monthName);
  };


  return (
    // Use motion.div for the main container with initial animation
    <motion.div
      className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8" // Adjusted padding
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } } // Stagger children animations
      }}
    >
      {/* Header with Title and Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Dashboard Orang Tua</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>


      {/* Informasi Anak Section */}
      <motion.div
        className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6" // Adjusted padding, added grid layout
        variants={sectionVariants}
      >
        {/* Left Column: Child Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Informasi Anak</h2>
          <p className="text-gray-300 mb-2"> {/* Added margin-bottom */}
            <span className="font-medium">Nama:</span> {childData.name}
          </p>
          <p className="text-gray-300">
            <span className="font-medium">Kelas:</span> {childData.grade}
          </p>
        </div>

        {/* Right Column: Child Selection */}
        {allChildrenData.length > 1 && ( // Only show selection if there's more than one child
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Pilih Anak</h2>
            <select
              className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-100"
              value={selectedChildIndex}
              onChange={handleChildChange}
            >
              {allChildrenData.map((child, index) => (
                <option key={child.id} value={index}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </motion.div>

      {/* Progress Pembelajaran Section */}
      <motion.div
        className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6" // Adjusted padding, added mb-6 for spacing below
        variants={sectionVariants}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Progress Pembelajaran</h2>

        {childData.progress.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                    Mata Pelajaran
                  </th>
                  {/* Changed headers */}
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                    Tugas
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                    UTS
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                    UAS
                  </th>
                  {/* Changed header */}
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                    Status
                  </th>
                  <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                    Nama Guru
                  </th>
                </tr>
              </thead>
              {/* Add key to tbody to force re-render and re-trigger animations */}
              <motion.tbody
                key={selectedChildIndex} // Add key here
                className="bg-gray-800 divide-y divide-gray-700"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } } // Stagger row animations
                }}
              >
                {childData.progress.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-gray-700 transition duration-150 ease-in-out"
                    variants={itemVariants} // Apply item animation
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-100"> {/* Adjusted padding */}
                      {item.subject}
                    </td>
                    {/* Added progress bar to Tugas */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300"> {/* Adjusted padding */}
                      <div className="flex items-center">
                        <span className="mr-2">{item.tugas}</span>
                        <div className="w-24 bg-gray-600 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${getScoreColor(item.tugas)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.tugas}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                    </td>
                    {/* Added progress bar to UTS */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300"> {/* Adjusted padding */}
                       <div className="flex items-center">
                        <span className="mr-2">{item.uts}</span>
                        <div className="w-24 bg-gray-600 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${getScoreColor(item.uts)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.uts}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                    </td>
                    {/* Added progress bar to UAS */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300"> {/* Adjusted padding */}
                       <div className="flex items-center">
                        <span className="mr-2">{item.uas}</span>
                        <div className="w-24 bg-gray-600 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${getScoreColor(item.uas)}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.uas}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                    </td>
                    {/* Changed displayed data */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300"> {/* Adjusted padding */}
                      {item.predicate}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-wrap text-sm text-gray-300"> {/* Adjusted padding */}
                      {item.teacherName}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada data progress pembelajaran.</p>
        )}
      </motion.div>

      {/* Grid container for Self Development and Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Pengembangan Diri Section */}
        <motion.div
          className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6" // Adjusted padding
          variants={sectionVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Pengembangan Diri</h2>

          {childData.selfDevelopment.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                      Kegiatan
                    </th>
                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Adjusted padding */}
                      Catatan Guru
                    </th>
                  </tr>
                </thead>
                {/* Add key to tbody to force re-render and re-trigger animations */}
                <motion.tbody
                   key={selectedChildIndex} // Add key here
                   className="bg-gray-800 divide-y divide-gray-700"
                   initial="hidden"
                   animate="visible"
                   variants={{
                     visible: { transition: { staggerChildren: 0.05 } } // Stagger row animations
                   }}
                >
                  {childData.selfDevelopment.map((item, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-700 transition duration-150 ease-in-out"
                      variants={itemVariants} // Apply item animation
                    >
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-100"> {/* Adjusted padding */}
                        {item.activity}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-wrap text-sm text-gray-300"> {/* Adjusted padding */}
                        {item.notes}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Belum ada data pengembangan diri.</p>
          )}
        </motion.div>

        {/* Kalender Presensi Section */}
        <motion.div
          className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6" // Adjusted padding
          variants={sectionVariants}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Kalender Presensi</h2>
          {childData.attendance.length > 0 ? (
            <div className="space-y-6">
              {childData.attendance.map((monthData, monthIndex) => {
                const [monthName, year] = monthData.month.split(' ');
                const monthNumber = getMonthNumber(monthName); // 0-indexed
                const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
                const firstDayOfMonth = new Date(year, monthNumber, 1).getDay(); // 0 for Sunday, 6 for Saturday

                // Create an array for all days of the month
                const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                return (
                  <div key={monthIndex}>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">{monthData.month}</h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
                      {/* Weekday Headers */}
                      {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                        <div key={day} className="font-semibold text-gray-400">{day}</div>
                      ))}
                      {/* Calendar Days */}
                      {/* Add empty divs for days before the 1st */}
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                          <div key={`empty-${monthIndex}-${i}`}></div>
                      ))}
                      {allDays.map((day) => {
                        const currentDate = new Date(year, monthNumber, day);
                        const currentDayOfWeek = currentDate.getDay(); // 0 for Sunday, 6 for Saturday

                        // Find the attendance status for the current day
                        const dayStatusEntry = monthData.dailyStatus.find(status => status.day === day);
                        const status = dayStatusEntry ? dayStatusEntry.status : 'belum terisi';

                        // Determine the background class based on day of week and status
                        let dayBgClass = '';
                        if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
                          dayBgClass = 'bg-gray-700'; // Dark grey for weekends
                        } else {
                          dayBgClass = getAttendanceColor(status); // Green, Red, Yellow, or Light Grey for weekdays
                        }

                        return (
                          <motion.div
                            key={day}
                            className={`p-1 rounded-sm flex items-center justify-center ${dayBgClass} text-gray-900 font-bold`}
                            variants={itemVariants} // Apply item animation
                          >
                            {day}
                          </motion.div>
                        );
                      })}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Hadir: {monthData.present}, Absen: {monthData.absent}, Sakit: {monthData.sick}, Izin: {monthData.permission}
                    </p>
                    {monthData.notes && <p className="text-gray-400 text-sm mt-1">Catatan: {monthData.notes}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">Belum ada data presensi.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Helper function to get month number (0-indexed) from month name
const getMonthNumber = (monthName) => {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return months.indexOf(monthName);
};


export default DashOrtu;