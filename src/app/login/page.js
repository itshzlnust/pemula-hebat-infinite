'use client'; // Required for Framer Motion components

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-2">
      <motion.main
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center"
      >
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 sm:p-12 w-full max-w-md">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Welcome Back!
          </motion.h1>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-6"
            >
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2 text-left" htmlFor="username">
                Email
              </label>
              <input
                className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="email"
                type="text"
                placeholder="Enter your email"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold text-left" htmlFor="password">
                  Password
                </label>
                <a className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" href="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <input
                className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="password"
                type="password"
                placeholder="••••••••••••"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center justify-center"
            >
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-all duration-150 ease-in-out hover:scale-105"
                type="button"
              >
                Sign In
              </button>
            </motion.div>
          </motion.form>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400"
          >
          </motion.p>
        </div>
      </motion.main>
    </div>
  );
}
