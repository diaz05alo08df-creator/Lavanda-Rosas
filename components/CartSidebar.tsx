import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 overflow-hidden z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 overflow-hidden`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className={`w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900 font-serif">Tu Carrito de Flores</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                      <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Tu carrito está vacío.</p>
                      <button onClick={onClose} className="mt-4 text-brand-primary hover:text-brand-dark font-medium">
                        Ir a comprar &rarr;
                      </button>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={product.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{product.name}</h3>
                                  <p className="ml-4">${product.price.toLocaleString('es-MX')}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <p className="text-gray-500">Cant: {product.quantity}</p>
                                <button
                                  type="button"
                                  onClick={() => onRemoveItem(product.id)}
                                  className="font-medium text-brand-accent hover:text-red-600 flex items-center gap-1"
                                >
                                  <Trash2 size={16} /> Eliminar
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-gray-50">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toLocaleString('es-MX')}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">El envío y los impuestos se calculan en el pago.</p>
                  <div className="mt-6">
                    <button
                      onClick={onCheckout}
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-brand-dark transition"
                    >
                      Pagar Ahora
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;