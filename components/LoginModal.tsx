import React, { useState } from 'react';
import { X, Flower2, User, Shield, Lock, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string, role: 'client' | 'admin') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName && clientEmail) {
      onLogin(clientName, clientEmail, 'client');
      resetForm();
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      onLogin('Administrador', adminEmail || 'admin@lavandayrosas.com', 'admin');
      resetForm();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setAdminEmail('');
    setAdminPassword('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div className="relative inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-0">
          
          <div className="bg-purple-50 p-6 flex flex-col items-center justify-center border-b border-purple-100">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
              <Flower2 className="h-8 w-8 text-brand-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-dark">Bienvenido</h3>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>

          <div className="flex border-b border-gray-100">
            <button onClick={() => { setActiveTab('client'); setError(''); }} className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'client' ? 'text-brand-primary border-b-2 border-brand-primary bg-white' : 'text-gray-500 bg-gray-50 hover:text-gray-700'}`}>
              <div className="flex items-center justify-center gap-2"><User size={18} /> Soy Cliente</div>
            </button>
            <button onClick={() => { setActiveTab('admin'); setError(''); }} className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'admin' ? 'text-brand-primary border-b-2 border-brand-primary bg-white' : 'text-gray-500 bg-gray-50 hover:text-gray-700'}`}>
              <div className="flex items-center justify-center gap-2"><Shield size={18} /> Soy Admin</div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'client' ? (
              <form onSubmit={handleClientSubmit} className="space-y-4">
                <p className="text-sm text-gray-500 text-center mb-4">Ingresa tus datos para gestionar tus pedidos.</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                    <input type="text" required className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" placeholder="Ej. María Pérez" value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
                    <input type="email" required className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" placeholder="tucorreo@ejemplo.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)}/>
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none transition-colors mt-4">Continuar</button>
              </form>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                 <p className="text-sm text-gray-500 text-center mb-4">Acceso exclusivo para personal autorizado.</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Usuario / Correo</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
                    <input type="text" required className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" placeholder="admin" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
                    <input type="password" required className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3" placeholder="••••••" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}/>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-1">Contraseña demo: <span className="font-mono font-bold">admin123</span></p>
                </div>
                {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none transition-colors mt-4">Entrar al Panel</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;