'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ManageAccountsPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const res = await fetch('/api/manage-account'); // <--- PERUBAHAN DI SINI
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.error || 'Failed to fetch users.');
      }
    } catch (err) {
      console.error('Fetch users error:', err);
      setError('An unexpected error occurred while fetching users.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      try {
        const res = await fetch(`/api/manage-account/${userId}`, { // <--- PERUBAHAN DI SINI
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMessage(data.message || 'User deleted successfully.');
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } else {
          setError(data.error || 'Failed to delete user.');
        }
      } catch (err) {
        console.error('Delete user error:', err);
        setError('An unexpected error occurred while deleting user.');
      }
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Manage Accounts
        </h1>
        <Link href="/admin/create-account" legacyBehavior>
          <a className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out">
            + Create New Account
          </a>
        </Link>
      </motion.div>

      {isLoading && <p className="text-center text-gray-600 dark:text-gray-400">Loading users...</p>}
      {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
      {successMessage && <p className="text-center text-green-500 bg-green-100 p-3 rounded-md mb-4">{successMessage}</p>}


      {!isLoading && !error && users.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">No users found.</p>
      )}

      {!isLoading && !error && users.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-x-auto"
        >
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'ADMIN' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                        user.role === 'TEACHER' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/edit-account/${user.id}`} legacyBehavior>
                      <a className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                        Edit
                      </a>
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}