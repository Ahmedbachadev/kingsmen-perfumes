import React, { useEffect, useState } from 'react';
import { Plus, User, Shield, CheckCircle, XCircle } from 'lucide-react';
import { getAdminUsers, mockCreateAdminUser, updateAdminUser } from '../services/usersService';
import type { AdminUser } from '../types/settings';

export const UsersRolesSettings: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Super Admin' | 'Content Manager'>('Admin');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAdminUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setUsers(users.map(u => u.id === id ? { ...u, is_active: !currentStatus } : u));
      await updateAdminUser(id, { is_active: !currentStatus });
    } catch (error) {
      console.error('Failed to update status', error);
      fetchUsers(); // Revert
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    try {
      const newUser = await mockCreateAdminUser({
        email: newEmail,
        full_name: newEmail.split('@')[0],
        role: newRole,
        is_active: true
      });
      setUsers([newUser, ...users]);
      setIsAdding(false);
      setNewEmail('');
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-neutral-200 rounded w-3/4"></div></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">Users & Roles</h3>
          <p className="text-sm text-neutral-500">Manage administrator access and permissions.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddUser} className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium text-neutral-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="admin@kingsmen.com"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 text-sm"
            />
          </div>
          <div className="w-48 shrink-0">
            <label className="block text-xs font-medium text-neutral-700 mb-1">Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as any)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 text-sm"
            >
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Content Manager">Content Manager</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-neutral-600 bg-white border border-neutral-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-neutral-900 rounded-lg hover:bg-neutral-800">Send Invite</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-neutral-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 text-sm">{user.full_name || 'Admin User'}</div>
                      <div className="text-xs text-neutral-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-neutral-700">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {user.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                      <XCircle className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleToggleStatus(user.id, user.is_active)}
                    className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
                  >
                    {user.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-neutral-500">
                  No users found. Ensure supabase_setup.sql is run.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
