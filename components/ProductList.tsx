import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Check } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  title: string;
  subtitle?: string;
  id?: string;
  bgColor?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, title, subtitle, id, bgColor = 'bg-white' }) => {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedItems(prev => new Set(prev).add(product.id));
    
    // Reset icon after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id={id} className={`${bgColor} py-16 scroll-mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-brand-dark">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-500">{subtitle}</p>}
          </div>
          <div className="hidden sm:block">
            <button className="text-brand-primary font-medium hover:text-brand-dark transition">
              Ver todo &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-95 transition-opacity lg:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge for category if needed */}
                <div className="absolute top-2 left-2">
                   <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/90 text-brand-dark shadow-sm">
                      {product.category === 'ramo' ? 'Ramo' : product.category === 'caja' ? 'Caja' : 'Decoración'}
                   </span>
                </div>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-serif">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-medium text-brand-dark">${product.price.toLocaleString('es-MX')}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleAdd(product);
                    }}
                    className={`z-20 p-2 rounded-full transition-all duration-300 ${
                      addedItems.has(product.id)
                        ? 'bg-green-500 text-white' 
                        : 'bg-brand-dark text-white hover:bg-brand-primary'
                    }`}
                  >
                    {addedItems.has(product.id) ? <Check size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;