import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import EditUserModal from '../../components/editUserModal';
import { User } from '@/types/crypto';
import { toast } from 'react-toastify';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false); // Delete confirmation modal state
  const [userToDelete, setUserToDelete] = useState<User | null>(null); // User to be deleted
  const [tradeModes, setTradeModes] = useState<{ [key: string]: string }>({}); // For storing user trade modes

  // Fetch all users and their trade modes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<User[]>('https://lunotrading.com/api/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort users alphabetically by name
        const sortedUsers = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);

        // Fetch trade modes for sorted users
        sortedUsers.forEach((user: User) => fetchAutoMode(user._id));
        toast.success('Users loaded successfully');
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  // Function to fetch the autoMode for a specific user
  const fetchAutoMode = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://lunotrading.com/api/trade/automode/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Set the trade mode for the user
      setTradeModes((prevModes) => ({
        ...prevModes,
        [userId]: response.data.autoMode,
      }));
    } catch (error) {
      console.error(`Error fetching auto mode for user ${userId}:`, error);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const token = localStorage.getItem('token');
      const userId = updatedUser._id;

      const response = await axios.put(
        `https://lunotrading.com/api/admin/users/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, ...response.data } : user))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user:');
    }
  };

  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lunotrading.com/api/auth/users/${userToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id));
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleToggleTradeMode = async (userId: string, mode: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://lunotrading.com/api/trade/automode/${userId}`,
        { autoMode: mode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTradeModes((prevModes) => ({
        ...prevModes,
        [userId]: mode,
      }));

      toast.success(`Trade mode for user ${userId} set to ${mode}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Error updating trade mode:');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Users Management</h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 font-semibold text-sm">ID</th>
                <th className="py-3 px-4 font-semibold text-sm">Name</th>
                <th className="py-3 px-4 font-semibold text-sm">Email</th>
                <th className="py-3 px-4 font-semibold text-sm">Balance</th>
                <th className="py-3 px-4 font-semibold text-sm text-center">Actions</th>
                <th className="py-3 px-4 font-semibold text-sm text-center">Trade Mode</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{user._id}</td>
                  <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-sm">{user.balance}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-blue-500 hover:underline mr-4"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => confirmDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={tradeModes[user._id] || 'off'}
                      onChange={(e) => handleToggleTradeMode(user._id, e.target.value)}
                      className="bg-gray-200 p-2 rounded-md"
                    >
                      <option value="off">Random</option>
                      <option value="alwaysWin">Win</option>
                      <option value="alwaysLose">Lose</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {isModalOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={handleModalClose}
            onUpdate={handleUpdateUser}
          />
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && userToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
              <p className="mb-6">Do you really want to delete user <b>{userToDelete.name}</b>?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  No
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={handleDeleteUser}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
