import React, { useState } from 'react';
import { Order, Product } from '../types';
import { Package, DollarSign, TrendingUp, Users, Calendar, MapPin, Edit, Trash2, Plus, X, Image as ImageIcon, Save } from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  
  // Product Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', description: '', price: 0, category: 'ramo', image: '', tags: []
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pendiente').length;
  const totalOrders = orders.length;

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: 0, category: 'ramo', image: '', tags: [] });
    }
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;

    if (editingProduct) {
      onUpdateProduct({ ...formData, id: editingProduct.id } as Product);
    } else {
      onAddProduct({ ...formData, id: Date.now().toString(), tags: formData.tags || [] } as Product);
    }
    setIsFormOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800">Panel de Administración</h1>
            <p className="text-gray-500 text-sm">Gestiona pedidos y actualiza tu catálogo</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
             <button 
               onClick={() => setActiveTab('orders')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'orders' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
             >
               Pedidos
             </button>
             <button 
               onClick={() => setActiveTab('products')}
               className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'products' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
             >
               Gestionar Productos
             </button>
          </div>
        </div>

        {/* Stats Cards (Visible on both tabs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="p-4 bg-green-100 text-green-600 rounded-full">
              <DollarSign size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString('es-MX')}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <Package size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pedidos Totales</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
            <div className="p-4 bg-orange-100 text-orange-600 rounded-full">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pendientes de Entrega</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Users size={20} className="text-gray-500" />
                Órdenes Recientes
              </h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No hay pedidos registrados aún.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3">ID Pedido</th>
                      <th className="px-6 py-3">Cliente</th>
                      <th className="px-6 py-3">Entrega</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="px-6 py-3">Detalles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{order.id.slice(-6)}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="font-bold">{order.details.fullName}</div>
                          <div className="text-xs">{order.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1"><Calendar size={14}/> {order.details.deliveryDate}</div>
                          <div className="flex items-center gap-1 text-xs mt-1 text-gray-400"><MapPin size={12}/> {order.details.address}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-brand-dark">
                          ${order.total.toLocaleString('es-MX')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            order.status === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'entregado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <ul className="list-disc list-inside text-xs">
                            {order.items.map(item => (
                              <li key={item.id}>{item.quantity}x {item.name}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* PRODUCTS TAB */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Package size={20} className="text-gray-500" />
                Catálogo de Productos
              </h2>
              <button 
                onClick={() => handleOpenForm()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
              >
                <Plus size={16} /> Nuevo Producto
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3">Imagen</th>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Descripción</th>
                    <th className="px-6 py-3">Precio</th>
                    <th className="px-6 py-3">Categoría</th>
                    <th className="px-6 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition group">
                      <td className="px-6 py-4">
                        <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover border border-gray-200" />
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">{product.description}</td>
                      <td className="px-6 py-4 text-sm font-medium text-brand-dark">${product.price}</td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full capitalize">
                           {product.category}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                           <button 
                             onClick={() => handleOpenForm(product)}
                             className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition" title="Editar"
                           >
                             <Edit size={16} />
                           </button>
                           <button 
                             onClick={() => {
                               if(confirm('¿Estás seguro de eliminar este producto?')) {
                                 onDeleteProduct(product.id);
                               }
                             }}
                             className="p-2 text-red-600 hover:bg-red-50 rounded-full transition" title="Eliminar"
                           >
                             <Trash2 size={16} />
                           </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsFormOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-brand-dark px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                </h3>
                <button onClick={() => setIsFormOpen(false)} className="text-white hover:text-gray-300">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                <div className="px-4 py-5 bg-white sm:p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      name="description"
                      required
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Precio</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          required
                          min="0"
                          value={formData.price}
                          onChange={handleChange}
                          className="pl-7 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Categoría</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                      >
                        <option value="ramo">Ramo</option>
                        <option value="caja">Caja</option>
                        <option value="centro">Centro/Maceta</option>
                        <option value="funeral">Funeral</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <ImageIcon size={16} />
                      </span>
                      <input
                        type="text"
                        name="image"
                        required
                        placeholder="https://..."
                        value={formData.image}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                      />
                    </div>
                    {formData.image && (
                      <div className="mt-2 h-32 w-full bg-gray-100 rounded-md overflow-hidden">
                        <img src={formData.image} alt="Preview" className="h-full w-full object-contain" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-primary text-base font-medium text-white hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <Save size={18} className="mr-2" /> Guardar Producto
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;