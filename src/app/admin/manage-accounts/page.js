'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Keep if you plan to use Link for other navigation
import { useRouter } from 'next/navigation';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const roleOptions = ['Admin', 'Wali Kelas', 'Orang Tua', 'Siswa']; // Define available roles

export default function ManageAccountsPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // --- Modal State ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ username: '', email: '', role: '' });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);


  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const res = await fetch('/api/manage-account');
      const data = await res.json();
      if (data.success) {
        // Assuming API returns 'name' and 'createdAt' and we map to 'username' and 'joined'
        const formattedUsers = data.users.map(user => ({
          ...user,
          username: user.name || 'N/A', // Use name as username, or provide a fallback
          joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A', // Format createdAt
        }));
        setUsers(formattedUsers);
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

  // --- Edit User Functions ---
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditFormData({ username: user.username, email: user.email, role: user.role });
    setIsEditModalOpen(true);
    setError('');
    setSuccessMessage('');
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    if (!editingUser) return;
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/manage-account/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editFormData.username, // Assuming API expects 'name'
          email: editFormData.email,
          role: editFormData.role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message || 'User updated successfully.');
        // Update user in local state
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === editingUser.id ? { ...u, ...editFormData, username: editFormData.username } : u
          )
        );
        handleEditModalClose();
      } else {
        setError(data.error || 'Failed to update user.');
      }
    } catch (err) {
      console.error('Update user error:', err);
      setError('An unexpected error occurred while updating user.');
    }
  };


  // --- Delete User Functions ---
  const handleDeleteClick = (user) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
    setError('');
    setSuccessMessage('');
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeletingUser(null);
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/manage-account/${deletingUser.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message || 'User deleted successfully.');
        setUsers(prevUsers => prevUsers.filter(user => user.id !== deletingUser.id));
        handleDeleteModalClose();
      } else {
        setError(data.error || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('Delete user error:', err);
      setError('An unexpected error occurred while deleting user.');
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

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </motion.div>
      )}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Success: </strong>
          <span className="block sm:inline">{successMessage}</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto"
      >
        {isLoading ? (
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
                      user.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
                        user.role === 'Wali Kelas' ? 'bg-orange-100 text-orange-800 dark:bg-orange-600 dark:text-orange-100' :
                          user.role === 'Orang Tua' ? 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100' :
                            '' // Default fallback
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.joined}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditClick(user)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">Edit</button>
                    <button onClick={() => handleDeleteClick(user)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Edit User Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleEditModalClose} // Close on overlay click
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Edit User: {editingUser.username}</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={editFormData.username}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                  <select
                    name="role"
                    id="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    type="button"
                    onClick={handleEditModalClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && deletingUser && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDeleteModalClose} // Close on overlay click
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent close on modal content click
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Confirm Deletion</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete user: <strong>{deletingUser.username}</strong> (ID: {deletingUser.id})? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <motion.button
                  type="button"
                  onClick={handleDeleteModalClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete User
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}