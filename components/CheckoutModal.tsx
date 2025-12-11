import React, { useState, useRef } from 'react';
import { X, Calendar, MapPin, Phone, MessageSquare, CreditCard, Store, Truck, Banknote, Printer, CheckCircle } from 'lucide-react';
import { User, OrderDetails, CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: (shouldClearCart: boolean) => void;
  onSubmit: (details: OrderDetails) => void;
  user: User | null;
  total: number;
  cart: CartItem[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSubmit, user, total, cart }) => {
  const [step, setStep] = useState<'form' | 'ticket'>('form');
  const [formData, setFormData] = useState<OrderDetails>({
    fullName: user?.name || '',
    address: '',
    phone: '',
    deliveryDate: '',
    dedication: '',
    deliveryMethod: 'shipping',
    paymentMethod: 'card'
  });
  const [ticketId, setTicketId] = useState('');

  // Update name if user logs in after modal mount
  React.useEffect(() => {
    if (user && !formData.fullName) {
      setFormData(prev => ({ ...prev, fullName: user.name }));
    }
  }, [user]);

  // Generate ID when ticket opens
  React.useEffect(() => {
    if (step === 'ticket') {
      setTicketId(`TKT-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Si es recoger en tienda, limpiamos la dirección visualmente, 
    // pero internamente guardamos "Recoger en Sucursal"
    const finalData = {
      ...formData,
      address: formData.deliveryMethod === 'pickup' ? 'Recoger en Sucursal Oxtotitlán' : formData.address
    };

    onSubmit(finalData);
    setStep('ticket');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    if (step === 'ticket') {
      // Si cerramos desde el ticket, limpiamos el carrito
      onClose(true);
      // Resetear para la próxima
      setTimeout(() => {
        setStep('form');
        setFormData(prev => ({ ...prev, dedication: '', address: '', deliveryDate: '' }));
      }, 500);
    } else {
      // Si cerramos desde el formulario, no limpiamos el carrito
      onClose(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleCloseModal}></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          
          {step === 'form' ? (
            /* --- FORMULARIO DE COMPRA --- */
            <>
              {/* Header */}
              <div className="bg-brand-dark px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white font-serif" id="modal-title">
                  Finalizar Compra
                </h3>
                <button onClick={handleCloseModal} className="text-white hover:text-gray-200">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[70vh] overflow-y-auto">
                  
                  {/* Método de Entrega */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b pb-2">1. Método de Entrega</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition ${formData.deliveryMethod === 'shipping' ? 'border-brand-primary bg-purple-50 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}>
                        <input 
                          type="radio" 
                          name="deliveryMethod" 
                          value="shipping" 
                          checked={formData.deliveryMethod === 'shipping'} 
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Truck size={24} className={formData.deliveryMethod === 'shipping' ? 'text-brand-primary' : 'text-gray-400'}/>
                        <span className="font-bold text-sm text-gray-800">Envío a Domicilio</span>
                      </label>
                      <label className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center gap-2 transition ${formData.deliveryMethod === 'pickup' ? 'border-brand-primary bg-purple-50 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}>
                        <input 
                          type="radio" 
                          name="deliveryMethod" 
                          value="pickup" 
                          checked={formData.deliveryMethod === 'pickup'} 
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Store size={24} className={formData.deliveryMethod === 'pickup' ? 'text-brand-primary' : 'text-gray-400'}/>
                        <span className="font-bold text-sm text-gray-800">Recoger en Tienda</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Datos Personales */}
                    <div className="col-span-1 md:col-span-2">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b pb-2">2. Datos de Contacto</h4>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Nombre Completo del Destinatario</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-3 sm:text-sm border-gray-300 rounded-md py-2.5"
                        />
                      </div>
                    </div>

                    {formData.deliveryMethod === 'shipping' && (
                      <div className="col-span-1 md:col-span-2 animate-fade-in">
                        <label className="block text-sm font-medium text-gray-700">Dirección de Entrega</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="address"
                            required={formData.deliveryMethod === 'shipping'}
                            placeholder="Calle, Número, Colonia, Ciudad"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha de {formData.deliveryMethod === 'shipping' ? 'Entrega' : 'Recolección'}</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="deliveryDate"
                          required
                          value={formData.deliveryDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5"
                        />
                      </div>
                    </div>

                    {/* Dedication */}
                    <div className="col-span-1 md:col-span-2 mt-2">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b pb-2">3. Dedicatoria (Opcional)</h4>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          name="dedication"
                          rows={2}
                          value={formData.dedication}
                          onChange={handleChange}
                          placeholder="Escribe un mensaje especial para la tarjeta..."
                          className="bg-white text-gray-900 focus:ring-brand-primary focus:border-brand-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                        />
                      </div>
                    </div>

                     {/* Método de Pago */}
                    <div className="col-span-1 md:col-span-2 mt-2">
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b pb-2">4. Forma de Pago</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <label className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition ${formData.paymentMethod === 'card' ? 'border-brand-primary bg-purple-50 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="card" 
                            checked={formData.paymentMethod === 'card'} 
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`p-2 rounded-full ${formData.paymentMethod === 'card' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <CreditCard size={20} />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-gray-800 block">Tarjeta Crédito/Débito</span>
                            <span className="text-xs text-gray-500">Pago seguro online</span>
                          </div>
                        </label>

                        <label className={`cursor-pointer border rounded-lg p-4 flex items-center gap-3 transition ${formData.paymentMethod === 'cash' ? 'border-brand-primary bg-purple-50 ring-1 ring-brand-primary' : 'border-gray-200 hover:border-brand-primary/50'}`}>
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="cash" 
                            checked={formData.paymentMethod === 'cash'} 
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`p-2 rounded-full ${formData.paymentMethod === 'cash' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <Banknote size={20} />
                          </div>
                          <div>
                            <span className="font-bold text-sm text-gray-800 block">Efectivo / En Tienda</span>
                            <span className="text-xs text-gray-500">Paga al recibir o recoger</span>
                          </div>
                        </label>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-between">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-brand-primary text-base font-medium text-white hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirmar Orden (${total.toLocaleString('es-MX')})
                  </button>
                  <div className="mt-3 sm:mt-0 text-xs text-gray-400 text-center sm:text-left">
                    * Al confirmar, aceptas nuestros términos de servicio.
                  </div>
                </div>
              </form>
            </>
          ) : (
            /* --- TICKET GENERADO --- */
            <div className="bg-white flex flex-col items-center">
              <div className="bg-green-500 w-full py-4 text-center text-white relative">
                 <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                   <CheckCircle size={28} /> ¡Pedido Confirmado!
                 </h3>
                 <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white/80 hover:text-white">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-8 w-full max-w-md bg-white">
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 font-mono text-sm relative">
                  {/* Decoración Ticket */}
                  <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full"></div>

                  <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
                    <h2 className="font-serif font-bold text-xl uppercase tracking-wider text-brand-dark">Lavanda & Rosas</h2>
                    <p className="text-xs text-gray-500 mt-1">Sucursal Oxtotitlán</p>
                    <p className="text-xs text-gray-500">Ticket: #{ticketId}</p>
                    <p className="text-xs text-gray-500">{new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</p>
                  </div>

                  {/* Items */}
                  <div className="space-y-2 mb-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <span className="flex-1">{item.quantity} x {item.name}</span>
                        <span className="font-bold">${(item.price * item.quantity).toLocaleString('es-MX')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-dashed border-gray-300 pt-4 mb-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>TOTAL</span>
                      <span>${total.toLocaleString('es-MX')}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                      <span>Método de Pago:</span>
                      <span className="uppercase">{formData.paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo'}</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200 mb-4">
                    <p className="font-bold mb-1">Datos de Entrega:</p>
                    <p>{formData.deliveryMethod === 'pickup' ? 'RECOGER EN TIENDA' : 'ENVÍO A DOMICILIO'}</p>
                    <p>Cliente: {formData.fullName}</p>
                    <p>Fecha: {formData.deliveryDate}</p>
                    {formData.deliveryMethod === 'shipping' && <p className="truncate">Dir: {formData.address}</p>}
                  </div>

                  <div className="text-center text-xs text-gray-400 mt-4">
                    <p>¡Gracias por tu preferencia!</p>
                    <p>www.lavandayrosas.com</p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={handlePrint}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Printer size={18} /> Imprimir
                  </button>
                  <button 
                    onClick={handleCloseModal}
                    className="flex-1 py-3 bg-brand-dark hover:bg-brand-primary text-white rounded-lg font-medium transition"
                  >
                    Cerrar
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;