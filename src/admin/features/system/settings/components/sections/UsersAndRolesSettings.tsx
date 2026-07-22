import React, { useEffect, useState } from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsService } from '../../services/settings.service';
import type { AdminUser } from '../../types';
import { UserPlus, MoreVertical, Edit2, ShieldOff, ShieldAlert } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

export const UsersAndRolesSettings: React.FC = () => {
 const [users, setUsers] = useState<AdminUser[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 fetchUsers();
 }, []);

 const fetchUsers = async () => {
 setLoading(true);
 const data = await SettingsService.getAdminUsers();
 setUsers(data);
 setLoading(false);
 };

 const getRoleBadgeColor = (role: string) => {
 switch(role) {
 case 'Super Admin': return 'bg-purple-100 text-purple-800 border-purple-200 ';
 case 'Admin': return 'bg-blue-100 text-blue-800 border-blue-200 ';
 case 'Content Manager': return 'bg-green-100 text-green-800 border-green-200 ';
 default: return 'bg-neutral-100 text-neutral-800 border-neutral-200 ';
 }
 };

 return (
 <SettingsSection>
 <div className="flex items-center justify-between mb-4">
 <div>
 <h3 className="text-lg font-medium text-neutral-900 ">Admin Users</h3>
 <p className="text-sm text-neutral-500 mt-1">Manage who has access to your admin dashboard.</p>
 </div>
 <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors">
 <UserPlus className="w-4 h-4" />
 Invite User
 </button>
 </div>

 <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
 {loading ? (
 <div className="p-8 text-center text-neutral-500">Loading users...</div>
 ) : users.length === 0 ? (
 <div className="p-8 text-center text-neutral-500">No users found. Add one above.</div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm">
 <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="px-6 py-4 font-medium">User</th>
 <th className="px-6 py-4 font-medium">Role</th>
 <th className="px-6 py-4 font-medium">Status</th>
 <th className="px-6 py-4 font-medium text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-neutral-200 ">
 {users.map(user => (
 <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-600 ">
 {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
 </div>
 <div>
 <div className="font-medium text-neutral-900 ">
 {user.full_name || 'No Name'}
 </div>
 <div className="text-neutral-500 text-xs">{user.email}</div>
 </div>
 </div>
 </td>
 <td className="px-6 py-4">
 <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border", getRoleBadgeColor(user.role))}>
 {user.role}
 </span>
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-2">
 <span className={cn(
 "w-2 h-2 rounded-full",
 user.status === 'active' ? "bg-green-500" : "bg-neutral-300 "
 )} />
 <span className="capitalize text-neutral-600 ">
 {user.status}
 </span>
 </div>
 </td>
 <td className="px-6 py-4 text-right">
 <button className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
 <MoreVertical className="w-4 h-4" />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </div>

 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
 <div className="p-4 rounded-xl border border-neutral-200 bg-white ">
 <h4 className="font-medium text-neutral-900 mb-2">Super Admin</h4>
 <p className="text-sm text-neutral-500">Full access to all settings, users, and financial data.</p>
 </div>
 <div className="p-4 rounded-xl border border-neutral-200 bg-white ">
 <h4 className="font-medium text-neutral-900 mb-2">Admin</h4>
 <p className="text-sm text-neutral-500">Access to orders, products, and customers. Cannot manage roles.</p>
 </div>
 <div className="p-4 rounded-xl border border-neutral-200 bg-white ">
 <h4 className="font-medium text-neutral-900 mb-2">Content Manager</h4>
 <p className="text-sm text-neutral-500">Can manage products, collections, and homepage settings only.</p>
 </div>
 </div>
 </SettingsSection>
 );
};
