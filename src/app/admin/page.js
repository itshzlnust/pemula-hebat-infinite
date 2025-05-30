'use client';

import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-semibold text-gray-800 dark:text-white mb-6"
      >
        Admin Dashboard
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <p className="text-gray-700 dark:text-gray-300">
          Welcome to the admin panel. Use the navigation on the left to create or manage accounts.
        </p>
      </motion.div>
    </div>
  );
}