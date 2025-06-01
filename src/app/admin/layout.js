
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Create Account', href: '/admin/create-account' },
    { name: 'Manage Accounts', href: '/admin/manage-accounts' },
  ];

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg flex flex-col"> {/* Added flex flex-col */}
        <div> {/* Wrapper for top content */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel</h1>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="mb-3">
                  <Link
                    href={item.href}
                    className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors
                      ${pathname === item.href
                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-auto"> {/* This div will push the button to the bottom */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }} // Slight delay for a nice effect
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150"
          >
            Logout
          </motion.button>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
