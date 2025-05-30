'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Placeholder data - replace with API call
const sampleUsers = [
  { id: 1, username: 'john.admin', email: 'john.doe@example.com', role: 'Admin', joined: '2023-01-15' },
  { id: 2, username: 'jane.parent', email: 'jane.smith@example.com', role: 'Orang Tua', joined: '2023-02-20' },
  { id: 3, username: 'bob.teacher', email: 'bob.johnson@example.com', role: 'Guru', joined: '2023-03-10' },
];

export default function ManageAccountsPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call to fetch users
    setTimeout(() => {
      setUsers(sampleUsers);
      setLoading(false);
    }, 1000); // Simulate API delay
  }, []);

  const handleEdit = (userId) => {
    // TODO: Implement edit functionality
    alert(`Edit user with ID: ${userId} (not implemented)`);
  };

  const handleDelete = (userId) => {
    // TODO: Implement delete functionality
    if (window.confirm(`Are you sure you want to delete user ID: ${userId}?`)) {
      alert(`Delete user with ID: ${userId} (not implemented)`);
      // setUsers(users.filter(user => user.id !== userId)); // Optimistic update example
    }
  };


  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-semibold text-gray-800 dark:text-white mb-6"
      >
        Manage Accounts
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto"
      >
        {loading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">No users found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Username</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Guru' ? 'bg-orange-100 text-orange-800 dark:bg-orange-600 dark:text-orange-100' :
                      user.role === 'Orang Tua' ? 'bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-100' :
                      user.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100' // Default color
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(user.id)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">Edit</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}