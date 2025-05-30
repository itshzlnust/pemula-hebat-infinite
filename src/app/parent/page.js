"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to get month number (0-indexed) from month name - moved outside for clarity
const getMonthNumber = (monthName) => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return months.indexOf(monthName);
}

const DashboardParent = () => {
    const [allChildrenData, setAllChildrenData] = useState([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedChildIndex, setSelectedChildIndex] = useState(0);

    useEffect(() => {
        const fetchParentDashboardData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // ANDA PERLU MEMBUAT API ENDPOINT BARU INI:
                // Contoh: '/api/parent/dashboard-data'
                // API ini harus:
                // 1. Memverifikasi pengguna yang login (misalnya melalui session/token).
                // 2. Mengambil data anak-anak yang terkait dengan orang tua tersebut dari database.
                // 3. Mengembalikan data dalam format yang diharapkan.
                const response = await fetch('/api/parent-dashboard-data'); // GANTI DENGAN ENDPOINT API ANDA

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Gagal mengambil data dashboard.' }));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success && data.childrenData) {
                    setAllChildrenData(data.childrenData);
                    if (data.childrenData.length > 0) {
                        setSelectedChildIndex(0); // Reset to first child if data reloads
                    }
                } else {
                    throw new Error(data.error || 'Format data tidak sesuai atau tidak ada data anak.');
                }
            } catch (err) {
                console.error("Error fetching parent dashboard data:", err);
                setError(err.message);
                setAllChildrenData([]); // Clear data on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchParentDashboardData();
    }, []); // Fetch data hanya sekali saat komponen dimuat

    const handleChildChange = (event) => {
        setSelectedChildIndex(parseInt(event.target.value, 10));
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        // Implementasikan logika logout di sini (misalnya, panggil API logout, hapus session, redirect ke /login)
        // Contoh: router.push('/login'); (jika Anda menggunakan useRouter dari next/navigation)
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getAttendanceColor = (status) => {
        switch (status) {
            case 'present': return 'bg-green-500';
            case 'absent': return 'bg-red-500';
            case 'sick': case 'permission': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <p className="text-xl">Memuat data dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-red-400 p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center">
                <p className="text-xl mb-4">Terjadi Kesalahan</p>
                <p className="text-md bg-gray-800 p-4 rounded">{error}</p>
                {/* Anda bisa menambahkan tombol untuk mencoba lagi */}
            </div>
        );
    }

    if (allChildrenData.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Dashboard Orang Tua</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
                <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                    <p className="text-xl">Tidak ada data anak yang ditemukan untuk akun Anda.</p>
                </div>
            </div>
        );
    }

    // Pastikan childData tidak undefined sebelum diakses
    const childData = allChildrenData[selectedChildIndex];
    if (!childData) {
        // Ini seharusnya tidak terjadi jika allChildrenData.length > 0 dan selectedChildIndex valid
        // Namun, sebagai fallback:
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <p className="text-xl">Data anak tidak tersedia. Silakan pilih anak lain jika ada.</p>
            </div>
        );
    }


    // ... (Sisa JSX Anda yang menggunakan childData tetap sama)
    // Contoh awal JSX:
    return (
        <motion.div
            className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
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
                className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={sectionVariants}
            >
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-100">Informasi Anak</h2>
                    <p className="text-gray-300 mb-2">
                        <span className="font-medium">Nama:</span> {childData.name}
                    </p>
                    <p className="text-gray-300">
                        <span className="font-medium">Kelas:</span> {childData.grade}
                    </p>
                </div>

                {allChildrenData.length > 1 && (
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
                className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-6"
                variants={sectionVariants}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Progress Pembelajaran</h2>
                {childData.progress && childData.progress.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Mata Pelajaran</th>
                                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tugas</th>
                                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">UTS</th>
                                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">UAS</th>
                                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nama Guru</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                key={`progress-${selectedChildIndex}`} // Ensure key changes to re-trigger animation
                                className="bg-gray-800 divide-y divide-gray-700"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } }
                                }}
                            >
                                {childData.progress.map((item, index) => (
                                    <motion.tr
                                        key={index}
                                        className="hover:bg-gray-700 transition duration-150 ease-in-out"
                                        variants={itemVariants}
                                    >
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-100">{item.subject}</td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300">
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
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300">
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
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300">
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
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-300">{item.predicate}</td>
                                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-wrap text-sm text-gray-300">{item.teacherName}</td>
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
                    className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6"
                    variants={sectionVariants}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-100">Pengembangan Diri</h2>
                    {childData.selfDevelopment && childData.selfDevelopment.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kegiatan</th>
                                        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Catatan Guru</th>
                                    </tr>
                                </thead>
                                <motion.tbody
                                    key={`selfdev-${selectedChildIndex}`} // Ensure key changes
                                    className="bg-gray-800 divide-y divide-gray-700"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.05 } }
                                    }}
                                >
                                    {childData.selfDevelopment.map((item, index) => (
                                        <motion.tr
                                            key={index}
                                            className="hover:bg-gray-700 transition duration-150 ease-in-out"
                                            variants={itemVariants}
                                        >
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-100">{item.activity}</td>
                                            <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-wrap text-sm text-gray-300">{item.notes}</td>
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
                    className="bg-gray-800 shadow-md rounded-lg p-4 sm:p-6"
                    variants={sectionVariants}
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-100">Kalender Presensi</h2>
                    {childData.attendance && childData.attendance.length > 0 ? (
                        <div className="space-y-6">
                            {childData.attendance.map((monthData, monthIndex) => {
                                const [monthName, yearStr] = monthData.month.split(' ');
                                const year = parseInt(yearStr, 10);
                                const monthNumber = getMonthNumber(monthName); // 0-indexed

                                if (monthNumber === -1 || isNaN(year)) {
                                    console.error("Invalid month or year:", monthData.month);
                                    return <p key={monthIndex} className="text-red-400">Data bulan tidak valid: {monthData.month}</p>;
                                }

                                const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
                                const firstDayOfMonth = new Date(year, monthNumber, 1).getDay(); // 0 for Sunday

                                const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

                                return (
                                    <div key={monthIndex}>
                                        <h3 className="text-lg font-medium mb-3 text-gray-200">{monthData.month}</h3>
                                        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
                                            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                                                <div key={day} className="font-semibold text-gray-400">{day}</div>
                                            ))}
                                            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                                <div key={`empty-${monthIndex}-${i}`}></div>
                                            ))}
                                            {allDays.map((day) => {
                                                const currentDate = new Date(year, monthNumber, day);
                                                const currentDayOfWeek = currentDate.getDay();
                                                const dayStatusEntry = monthData.dailyStatus?.find(status => status.day === day);
                                                const status = dayStatusEntry ? dayStatusEntry.status : 'belum terisi';
                                                let dayBgClass = (currentDayOfWeek === 0 || currentDayOfWeek === 6) ? 'bg-gray-700' : getAttendanceColor(status);

                                                return (
                                                    <motion.div
                                                        key={day}
                                                        className={`p-1 rounded-sm flex items-center justify-center ${dayBgClass} text-gray-900 font-bold`}
                                                        variants={itemVariants}
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

export default DashboardParent;