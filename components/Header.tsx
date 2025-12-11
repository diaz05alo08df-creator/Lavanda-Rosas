import React from 'react';
import { ShoppingBag, Menu, Search, Flower2, User as UserIcon, LogOut, LayoutDashboard, BookHeart, Palette } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, currentView, onNavigate, user, onLoginClick, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavButton = ({ view, label, icon }: { view: string, label: string, icon?: React.ReactNode }) => (
    <button 
      onClick={() => {
        onNavigate(view);
        setIsMobileMenuOpen(false);
      }}
      className={`text-sm lg:text-base font-medium transition flex items-center gap-1 px-3 py-2 rounded-md
        ${currentView === view 
          ? 'text-brand-primary bg-purple-50 font-bold' 
          : 'text-gray-600 hover:text-brand-primary hover:bg-gray-50'
        }`}
    >
      {label} {icon}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-brand-primary p-2"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group">
              <div className="bg-brand-primary/10 p-2 rounded-full group-hover:bg-brand-primary/20 transition-colors">
                <Flower2 size={32} className="text-brand-primary" />
              </div>
              <span className="font-serif text-2xl font-bold text-brand-dark tracking-tight hidden sm:block">
                Lavanda <span className="text-brand-accent">&</span> Rosas
              </span>
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            <NavButton view="home" label="Inicio" />
            <NavButton view="catalog" label="Catálogo" />
            <NavButton view="customization" label="Personalizar" icon={<Palette size={16} />} />
            <NavButton view="ramos" label="Ramos" />
            <NavButton view="flower-guide" label="Significado de Flores" icon={<BookHeart size={16} />} />
            <NavButton view="ai-helper" label="Asistente IA" icon={<span className="text-yellow-400">✨</span>} />
            
            {user?.role === 'admin' && (
              <button 
                onClick={() => onNavigate('admin-dashboard')}
                className={`text-sm lg:text-base font-medium transition flex items-center gap-1 px-3 py-2 rounded-md
                  ${currentView === 'admin-dashboard' 
                    ? 'text-white bg-brand-dark shadow-md' 
                    : 'text-brand-dark bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                <LayoutDashboard size={16} /> Panel Admin
              </button>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* User Auth Section */}
            {user ? (
               <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
                 <div className="text-right hidden sm:block">
                   <p className="text-xs text-gray-500">{user.role === 'admin' ? 'Administrador' : 'Hola,'}</p>
                   <p className="text-sm font-bold text-brand-dark truncate max-w-[100px]">{user.name}</p>
                 </div>
                 <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500 transition" title="Cerrar Sesión">
                   <LogOut size={20} />
                 </button>
               </div>
            ) : (
               <button 
                 onClick={onLoginClick}
                 className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand-primary px-3 py-2 rounded-md hover:bg-gray-50 transition"
               >
                 <UserIcon size={20} />
                 <span className="hidden sm:inline">Entrar</span>
               </button>
            )}

            <button className="text-gray-400 hover:text-brand-primary transition p-2">
              <Search size={22} />
            </button>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-brand-dark hover:bg-purple-50 rounded-full transition group"
            >
              <ShoppingBag size={22} className="group-hover:text-brand-primary transition" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavButton view="home" label="Inicio" />
            <NavButton view="catalog" label="Catálogo" />
            <NavButton view="customization" label="Personalizar" />
            <NavButton view="ramos" label="Ramos" />
            <NavButton view="flower-guide" label="Significado de Flores" />
            <NavButton view="ai-helper" label="Asistente IA ✨" />
            {user?.role === 'admin' && (
               <NavButton view="admin-dashboard" label="Panel de Administración" icon={<LayoutDashboard size={16}/>} />
            )}
            {!user && (
              <button 
                onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-medium text-brand-primary hover:bg-purple-50 rounded-md"
              >
                Iniciar Sesión
              </button>
            )}
            {user && (
              <button 
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-red-50 rounded-md"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
