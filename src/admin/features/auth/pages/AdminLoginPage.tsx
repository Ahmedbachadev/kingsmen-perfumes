import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();

 const handleLogin = (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);
 // Simulate API call
 setTimeout(() => {
 setIsLoading(false);
 navigate('/admin');
 }, 1000);
 };

 return (
 <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
 {/* Background glowing orbs */}
 <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
 <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

 <div className="relative w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
 <div className="flex justify-center mb-8">
 <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/10 transform transition-transform hover:scale-105 hover:rotate-3 duration-300 cursor-default">
 <ShieldCheck className="w-8 h-8 text-white" />
 </div>
 </div>

 <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
 <div className="text-center mb-8">
 <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Admin Portal</h1>
 <p className="text-neutral-400 text-sm">Sign in to manage your ecommerce platform</p>
 </div>

 <form onSubmit={handleLogin} className="space-y-5">
 <div className="space-y-1">
 <label className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
 <div className="relative group">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 <Mail className="h-5 w-5 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
 </div>
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="block w-full pl-11 pr-4 py-3.5 bg-neutral-950/50 border border-white/5 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all sm:text-sm"
 placeholder="admin@kingsmen.com"
 required
 />
 </div>
 </div>

 <div className="space-y-1">
 <label className="text-sm font-medium text-neutral-300 ml-1">Password</label>
 <div className="relative group">
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 <Lock className="h-5 w-5 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
 </div>
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="block w-full pl-11 pr-4 py-3.5 bg-neutral-950/50 border border-white/5 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all sm:text-sm"
 placeholder="••••••••"
 required
 />
 </div>
 </div>

 <div className="flex items-center justify-between pt-2 pb-4">
 <div className="flex items-center group cursor-pointer">
 <input
 id="remember-me"
 name="remember-me"
 type="checkbox"
 className="h-4 w-4 bg-neutral-950 border-white/10 rounded text-indigo-500 focus:ring-indigo-500 focus:ring-offset-neutral-900 cursor-pointer transition-colors"
 />
 <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors cursor-pointer">
 Remember me
 </label>
 </div>

 <div className="text-sm">
 <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
 Forgot password?
 </a>
 </div>
 </div>

 <button
 type="submit"
 disabled={isLoading}
 className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-indigo-500 transition-all overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
 >
 <span className="relative z-10 flex items-center gap-2">
 {isLoading ? 'Authenticating...' : 'Sign In'}
 {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
 </span>
 <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
 </button>
 </form>
 </div>
 
 <p className="text-center text-neutral-500 text-sm mt-8">
 &copy; {new Date().getFullYear()} Kingsmen Perfumes. All rights reserved.
 </p>
 </div>
 </div>
 );
}
