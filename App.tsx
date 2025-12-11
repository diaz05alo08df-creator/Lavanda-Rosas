import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import AICardGenerator from './components/AICardGenerator';
import ChatAssistant from './components/ChatAssistant';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import FlowerGuide from './components/FlowerGuide';
import AdminDashboard from './components/AdminDashboard';
import CustomArrangement from './components/CustomArrangement';
import { Product, CartItem, User, OrderDetails, Order } from './types';
import { MapPin, Target, Heart } from 'lucide-react';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: "Ramo “Amor Eterno”", description: "Rosas rojas clásicas envuelto en papel negro, ideal para regalos románticos.", price: 550, category: "ramo", image: "https://images.unsplash.com/photo-1576503918519-612b7df946de?q=80&w=800&auto=format&fit=crop", tags: ["Romántico", "Clásico"] },
  { id: '2', name: "Ramo “Sol Radiante”", description: "Girasoles grandes combinados con verde ruscus; alegre y energético.", price: 450, category: "ramo", image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=800&auto=format&fit=crop", tags: ["Alegría", "Girasoles"] },
  { id: '3', name: "Ramo “Ternura Pastel”", description: "Gerberas rosadas y margaritas blancas con limonium.", price: 480, category: "ramo", image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?q=80&w=800&auto=format&fit=crop", tags: ["Ternura", "Rosa"] },
  { id: '4', name: "Ramo “Elegancia Blanca”", description: "Rosas blancas con nube (gypsofila), estilo clásico y limpio.", price: 520, category: "ramo", image: "https://images.unsplash.com/photo-1582794543139-8ac92a944f21?q=80&w=800&auto=format&fit=crop", tags: ["Elegante", "Blanco"] },
  { id: '5', name: "Ramo “Fantasía Rosa”", description: "Rosas rosa pastel con lisianthus y eucalipto.", price: 650, category: "ramo", image: "https://images.unsplash.com/photo-1516205651411-a8531c670fc3?q=80&w=800&auto=format&fit=crop", tags: ["Romántico", "Pastel"] },
  { id: '6', name: "Ramo “Dulce Primavera”", description: "Gerberas de colores pastel y follaje suave.", price: 450, category: "ramo", image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=800&auto=format&fit=crop", tags: ["Primavera", "Colorido"] },
  { id: '7', name: "Ramo “Romance Champagne”", description: "Rosas en tono champagne con nube y eucalipto.", price: 650, category: "ramo", image: "https://images.unsplash.com/photo-1589123053646-4e0952d88044?q=80&w=800&auto=format&fit=crop", tags: ["Elegante", "Vintage"] },
  { id: '8', name: "Ramo “Atardecer Floral”", description: "Mezcla de flores naranjas/amarillas tipo otoño.", price: 500, category: "ramo", image: "https://images.unsplash.com/photo-1563241527-300627d3a436?q=80&w=800&auto=format&fit=crop", tags: ["Otoño", "Cálido"] },
  { id: '9', name: "Ramo “Pink Love”", description: "Rosas rosadas, gerberas y margaritas; delicado y juvenil.", price: 580, category: "ramo", image: "https://images.unsplash.com/photo-1561542320-9a18cd340469?q=80&w=800&auto=format&fit=crop", tags: ["Juvenil", "Rosa"] },
  { id: '11', name: "Ramo “Encanto Suave”", description: "Tonos pastel con alstroemerias y rosas ligeras.", price: 460, category: "ramo", image: "https://images.unsplash.com/photo-1563578270-22c7a4023bd2?q=80&w=800&auto=format&fit=crop", tags: ["Suave", "Detalle"] },
  { id: '12', name: "Arreglo “Luxury Box Rose”", description: "Caja con rosas rojas o blancas, elegante y minimalista.", price: 900, category: "caja", image: "https://images.unsplash.com/photo-1549416878-b971e909e334?q=80&w=800&auto=format&fit=crop", tags: ["Lujo", "Caja"] },
  { id: '13', name: "Ramo “Brillo Amarillo”", description: "Girasoles con follaje ruscus, muy luminoso.", price: 420, category: "ramo", image: "https://images.unsplash.com/photo-1530299557022-7264a7c067e2?q=80&w=800&auto=format&fit=crop", tags: ["Luz", "Girasoles"] },
  { id: '14', name: "Ramo “Frescor Púrpura”", description: "Lisianthus morado, limonium y detalles verdes.", price: 550, category: "ramo", image: "https://images.unsplash.com/photo-1599577180451-b062dfc92053?q=80&w=800&auto=format&fit=crop", tags: ["Morado", "Original"] },
  { id: '15', name: "Ramo “Romance Rosa Fuerte”", description: "Rosas fucsia con nube y eucalipto.", price: 590, category: "ramo", image: "https://images.unsplash.com/photo-1555050552-320981995a9e?q=80&w=800&auto=format&fit=crop", tags: ["Intenso", "Fucsia"] },
  { id: '16', name: "Ramo “Amanecer Coral”", description: "Flores en tonos coral/naranjas con margaritas.", price: 480, category: "ramo", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800&auto=format&fit=crop", tags: ["Coral", "Vibrante"] },
  { id: '17', name: "Ramo “Pureza Ivory”", description: "Rosas marfil con detalles blancos.", price: 530, category: "ramo", image: "https://images.unsplash.com/photo-1521769641777-6238b75e4785?q=80&w=800&auto=format&fit=crop", tags: ["Marfil", "Sofisticado"] }
];

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-10234',
    date: '2024-05-20',
    status: 'entregado',
    total: 1350,
    customer: { name: 'Juan Pérez', email: 'juan@gmail.com', role: 'client' },
    details: { fullName: 'Maria Lopez', address: 'Av. Vallarta 500', phone: '555-1234', deliveryDate: '2024-05-20', dedication: 'Te amo', deliveryMethod: 'shipping', paymentMethod: 'card' },
    items: [{...INITIAL_PRODUCTS[0], quantity: 1}]
  }
];

type ViewState = 'home' | 'catalog' | 'ramos' | 'flower-guide' | 'ai-helper' | 'admin-dashboard' | 'customization';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lavanda_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [currentView]);
  useEffect(() => { localStorage.setItem('lavanda_products', JSON.stringify(products)); }, [products]);

  const handleAddProduct = (newProduct: Product) => setProducts(prev => [...prev, newProduct]);
  const handleUpdateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      setPendingProduct(product);
      setIsLoginModalOpen(true);
      return;
    }
    addToCartLogic(product);
  };

  const addToCartLogic = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleLogin = (name: string, email: string, role: 'client' | 'admin') => {
    setUser({ name, email, role });
    setIsLoginModalOpen(false);
    if (role === 'admin') { setCurrentView('admin-dashboard'); return; }
    if (pendingProduct) { addToCartLogic(pendingProduct); setPendingProduct(null); }
  };

  const handleLogout = () => { setUser(null); setCurrentView('home'); setCart([]); };
  const handleRemoveFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const handleCheckoutClick = () => {
    if (!user) { setIsLoginModalOpen(true); return; }
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };
  const handlePlaceOrder = (details: OrderDetails) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pendiente',
      total: total,
      customer: user!,
      details: details,
      items: [...cart]
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleCloseCheckout = (shouldClearCart: boolean) => {
    setIsCheckoutModalOpen(false);
    if (shouldClearCart) { setCart([]); setCurrentView('home'); }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const ramosProducts = products.filter(p => p.category === 'ramo');

  const renderContent = () => {
    if (currentView === 'admin-dashboard') {
      if (user?.role !== 'admin') return <div className="text-center py-20 text-red-500">Acceso Denegado</div>;
      return <AdminDashboard orders={orders} products={products} onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} onDeleteProduct={handleDeleteProduct}/>;
    }
    switch (currentView) {
      case 'home':
        return (
          <div className="animate-fade-in">
            <Hero onNavigate={(view) => setCurrentView(view as ViewState)} />
            <section className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    <div className="space-y-6 flex flex-col justify-center">
                       <div className="bg-lavender-50 p-8 rounded-2xl border border-purple-100 hover:shadow-md transition">
                          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-brand-primary rounded-lg text-white"><Target size={24} /></div><h3 className="font-serif text-2xl font-bold text-brand-dark">Nuestra Misión</h3></div>
                          <p className="text-gray-700 italic text-lg leading-relaxed">"Ofrecer arreglos florales de alta calidad que transmitan emociones y embellezcan momentos especiales, mediante un servicio personalizado y el uso de flores frescas cultivadas y seleccionadas con responsabilidad social y ambiental."</p>
                       </div>
                       <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                          <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-brand-accent rounded-lg text-white"><Heart size={24} /></div><h3 className="font-serif text-2xl font-bold text-brand-dark">Nuestra Visión</h3></div>
                          <p className="text-gray-700 italic text-lg leading-relaxed">"Ser una florería reconocida a nivel local y regional por su innovación, creatividad, expandiendo nuestros servicios a ventas en línea y entregas a domicilio para llegar a más clientes."</p>
                       </div>
                    </div>
                    <div className="bg-brand-dark text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-center relative overflow-hidden group">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition duration-700"></div>
                       <h3 className="relative z-10 font-serif text-3xl font-bold mb-8 flex items-center gap-3"><MapPin className="text-brand-accent" size={32} /> Encuéntranos</h3>
                       <div className="relative z-10 space-y-6">
                          <div><p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sucursal Principal</p><p className="text-xl font-medium text-white">Lavanda & Rosas Oxtotitlán</p></div>
                          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm"><p className="text-gray-200 leading-relaxed text-lg font-light">Adolfo López Mateos 1404,<br/>Delegación San Mateo Oxtotitlán,<br/>50100 San Mateo Oxtotitlán, Méx.</p></div>
                          <a href="https://www.google.com/maps/search/?api=1&query=Adolfo+López+Mateos+1404+San+Mateo+Oxtotitlán" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-white transition group/link">Ver en Google Maps <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span></a>
                       </div>
                    </div>
                 </div>
              </div>
            </section>
            <ProductList title="Lo más nuevo" subtitle="Recién llegados a nuestro jardín" products={products.slice(0, 4)} onAddToCart={handleAddToCart} bgColor="bg-white"/>
          </div>
        );
      case 'catalog': return <div className="animate-fade-in"><div className="bg-brand-dark py-12 text-center text-white"><h1 className="text-4xl font-serif font-bold">Catálogo Completo</h1><p className="mt-4 text-purple-200">Explora toda nuestra colección.</p></div><ProductList title="" products={products} onAddToCart={handleAddToCart} bgColor="bg-white"/></div>;
      case 'ramos': return <div className="animate-fade-in"><div className="bg-pink-50 py-12 text-center text-brand-dark"><h1 className="text-4xl font-serif font-bold">Ramos Exclusivos</h1><p className="mt-4 text-gray-600">Diseños unicos.</p></div><ProductList title="" products={ramosProducts} onAddToCart={handleAddToCart} bgColor="bg-white"/></div>;
      case 'customization': return <div className="animate-fade-in pt-6"><CustomArrangement onAddToCart={handleAddToCart} /></div>;
      case 'ai-helper': return <div className="animate-fade-in pt-6"><AICardGenerator products={products} onAddToCart={handleAddToCart} /></div>;
      case 'flower-guide': return <div className="animate-fade-in pt-6"><FlowerGuide /></div>;
      default: return <div>Vista no encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} currentView={currentView} onNavigate={(view) => setCurrentView(view as ViewState)} user={user} onLoginClick={() => setIsLoginModalOpen(true)} onLogout={handleLogout}/>
      <main className="flex-grow">{renderContent()}</main>
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2"><span className="font-serif text-2xl font-bold tracking-tight">Lavanda <span className="text-brand-accent">&</span> Rosas</span><p className="mt-4 text-gray-400 max-w-sm">Llevamos sentimientos convertidos en flores a la puerta de tus seres queridos.</p></div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navegación</h3><ul className="mt-4 space-y-4"><li><button onClick={() => setCurrentView('catalog')} className="text-base text-gray-300 hover:text-white">Catálogo</button></li><li><button onClick={() => setCurrentView('ramos')} className="text-base text-gray-300 hover:text-white">Ramos</button></li><li><button onClick={() => setCurrentView('flower-guide')} className="text-base text-gray-300 hover:text-white">Significado de Flores</button></li></ul></div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Ayuda</h3><ul className="mt-4 space-y-4"><li><button className="text-base text-gray-300 hover:text-white">Envíos</button></li><li><button className="text-base text-gray-300 hover:text-white">Contacto</button></li></ul></div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400"><p>&copy; 2024 Lavanda & Rosas. Todos los derechos reservados.</p></div>
        </div>
      </footer>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckoutClick}/>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin}/>
      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={handleCloseCheckout} onSubmit={handlePlaceOrder} user={user} total={cartTotal} cart={cart}/>
      <ChatAssistant />
    </div>
  );
};

export default App;