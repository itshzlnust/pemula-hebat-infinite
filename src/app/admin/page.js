'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Placeholder data - replace with API call in a real application
const sampleUsersData = [
  { id: 1, username: 'john.admin', email: 'john.doe@example.com', role: 'Admin', joined: '2023-01-15' },
  { id: 2, username: 'jane.parent', email: 'jane.smith@example.com', role: 'Orang Tua', joined: '2023-02-20' },
  { id: 3, username: 'bob.teacher', email: 'bob.johnson@example.com', role: 'Wali Kelas', joined: '2023-03-10' },
  { id: 4, username: 'alice.admin', email: 'alice.admin@example.com', role: 'Admin', joined: '2023-04-05'},
  { id: 5, username: 'dave.parent', email: 'dave.parent@example.com', role: 'Orang Tua', joined: '2023-05-12'},
  { id: 6, username: 'eve.teacher', email: 'eve.teacher@example.com', role: 'Wali Kelas', joined: '2023-06-18'},
  { id: 7, username: 'charlie.parent', email: 'charlie.parent@example.com', role: 'Orang Tua', joined: '2023-07-22'},
  { id: 8, username: 'grace.teacher', email: 'grace.teacher@example.com', role: 'Wali Kelas', joined: '2023-08-10'},
  { id: 9, username: 'henry.admin', email: 'henry.admin@example.com', role: 'Admin', joined: '2023-09-01'},
  { id: 10, username: 'olivia.parent', email: 'olivia.parent@example.com', role: 'Orang Tua', joined: '2023-10-15'},
];

const StatCard = ({ title, value, color, iconPlaceholder, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4 border-l-4 ${color}`}
  >
    {iconPlaceholder && (
      <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100 dark:bg-opacity-20')} text-xl font-bold ${color.replace('border-','text-')}`}>
        {iconPlaceholder}
      </div>
    )}
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-2xl font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
  </motion.div>
);

// Simple Donut Chart Component (CSS-based SVG) with Animation and Hover Effects
const DonutChart = ({ data }) => {
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const { AnimatePresence } = motion;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400 py-10">No data for chart.</div>;
  }

  let cumulativePercentage = 0;
  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const segment = {
      percentage,
      color: item.color,
      offset: cumulativePercentage,
      label: item.label,
      value: item.value,
    };
    cumulativePercentage += percentage;
    return segment;
  });

  const baseRadius = 15.915494309189532;
  const baseStrokeWidth = 3.8;
  const scaleDownFactor = 1 / 1.1;

  const r = baseRadius * scaleDownFactor;
  const strokeWidth = baseStrokeWidth * scaleDownFactor;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56 sm:w-64 sm:h-64">
        <svg viewBox="0 0 36 36" className="block w-full h-full">
          {segments.map((segment, index) => (
            <motion.circle
              key={index}
              cx="18"
              cy="18"
              r={r}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDashoffset={25 - segment.offset}
              transform="rotate(-90 18 18)"
              initial={{ strokeDasharray: "0 100" }}
              animate={{ strokeDasharray: `${segment.percentage.toFixed(2)} ${ (100 - segment.percentage).toFixed(2)}` }}
              transition={{
                strokeDasharray: { duration: 0.8, delay: index * 0.2, ease: "easeOut" }
              }}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              onHoverStart={() => {
                // console.log("Hover start:", segment.label); // Optional: for debugging
                setHoveredInfo({ 
                  label: segment.label, 
                  value: segment.value, 
                  percentage: segment.percentage 
                });
              }}
              onHoverEnd={() => {
                // console.log("Hover end:", segment.label); // Optional: for debugging
                setHoveredInfo(null);
              }}
              // Add pointerEvents attribute here
              pointerEvents="visibleStroke"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            {hoveredInfo ? (
              <motion.div
                key="hovered"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="text-center"
              >
                <span className="text-lg font-bold text-gray-800 dark:text-white block truncate max-w-[100px] sm:max-w-[120px]">{hoveredInfo.label}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300 block">
                  {hoveredInfo.value} ({hoveredInfo.percentage.toFixed(1)}%)
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="total"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, delay: segments.length * 0.2 + 0.3 }}
                className="text-center"
              >
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{total}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Akun</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-6 space-y-2 w-full max-w-xs">
        {segments.map((segment, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + (segments.length * 0.2), duration: 0.4 }}
          >
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2.5" style={{ backgroundColor: segment.color }}></span>
              <span className="text-gray-700 dark:text-gray-300">{segment.label}</span>
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-400">{segment.value} ({(segment.percentage).toFixed(1)}%)</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default function AdminDashboardPage() {
  const [userStats, setUserStats] = useState({
    total: 0,
    admin: 0,
    waliKelas: 0, // Changed from 'guru' to 'Wali Kelas' to match role in data
    orangTua: 0,
  });

  useEffect(() => {
    // Simulate API call or data processing
    const total = sampleUsersData.length;
    const admin = sampleUsersData.filter(user => user.role === 'Admin').length;
    const waliKelas = sampleUsersData.filter(user => user.role === 'Wali Kelas').length;
    const orangTua = sampleUsersData.filter(user => user.role === 'Orang Tua').length;

    setUserStats({ total, admin, waliKelas, orangTua });
  }, []);

  const chartData = [
    { label: 'Admin', value: userStats.admin, color: '#EF4444' }, // Tailwind red-500
    { label: 'Wali Kelas', value: userStats.waliKelas, color: '#F97316' }, // Tailwind orange-500
    { label: 'Orang Tua', value: userStats.orangTua, color: '#22C55E' }, // Tailwind green-500
  ].filter(item => item.value > 0); // Filter out roles with 0 users for cleaner chart

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-semibold text-gray-800 dark:text-white mb-8"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Akun"
          value={userStats.total}
          iconPlaceholder="Σ" // Sigma for Total
          color="border-blue-500"
          delay={0.2}
        />
        <StatCard
          title="Akun Admin"
          value={userStats.admin}
          iconPlaceholder="A"
          color="border-red-500"
          delay={0.3}
        />
        <StatCard
          title="Akun Wali Kelas"
          value={userStats.waliKelas}
          iconPlaceholder="W" // W for Wali Kelas
          color="border-orange-500"
          delay={0.4}
        />
        <StatCard
          title="Akun Orang Tua"
          value={userStats.orangTua}
          iconPlaceholder="O" // O for Orang Tua
          color="border-green-500"
          delay={0.5}
        />
      </div>

      {/* Donut Chart and Welcome Message */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4 text-center">KomposisiAkun</h2>
          <DonutChart data={chartData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-3">Selamat Datang!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ini adalah panel admin Anda. Di sini Anda dapat melihat ringkasan statistik akun pengguna.
            Gunakan menu navigasi untuk membuat akun baru atau mengelola akun yang sudah ada.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Pastikan untuk menjaga keamanan data dan mengelola akses pengguna dengan bijak.
          </p>
        </motion.div>
      </div>
    </div>
  );
}