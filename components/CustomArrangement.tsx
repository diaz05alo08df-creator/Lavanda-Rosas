import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { Palette, Check, ShoppingBag, Gift, MessageSquare, Scissors } from 'lucide-react';

interface CustomArrangementProps {
  onAddToCart: (product: Product) => void;
}

const CustomArrangement: React.FC<CustomArrangementProps> = ({ onAddToCart }) => {
  const [baseType, setBaseType] = useState<'ramo' | 'caja'>('ramo');
  const [size, setSize] = useState<'chico' | 'mediano' | 'grande'>('mediano');
  const [flowerType, setFlowerType] = useState('');
  const [flowerColor, setFlowerColor] = useState('');
  const [paperColor, setPaperColor] = useState('');
  const [extras, setExtras] = useState('');
  const [dedication, setDedication] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let calculatedPrice = 0;
    if (baseType === 'ramo') {
      if (size === 'chico') calculatedPrice = 450;
      if (size === 'mediano') calculatedPrice = 850;
      if (size === 'grande') calculatedPrice = 1450;
    } else {
      if (size === 'chico') calculatedPrice = 650;
      if (size === 'mediano') calculatedPrice = 1100;
      if (size === 'grande') calculatedPrice = 1800;
    }
    setPrice(calculatedPrice);
  }, [baseType, size]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullDescription = `
      Tipo: ${baseType === 'ramo' ? 'Ramo' : 'Caja'} - Tamaño: ${size}.
      Flores: ${flowerType || 'A elección del florista'}.
      Color Flores: ${flowerColor || 'Sugerido'}.
      Envoltura/Listón: ${paperColor || 'Combinado'}.
      Extras: ${extras || 'Ninguno'}.
      Dedicatoria: "${dedication}".
    `.trim();

    const customProduct: Product = {
      id: `custom-${Date.now()}`,
      name: `Diseño Personalizado - ${baseType === 'ramo' ? 'Ramo' : 'Caja'} ${size.charAt(0).toUpperCase() + size.slice(1)}`,
      description: fullDescription,
      price: price,
      category: baseType,
      image: baseType === 'ramo' 
        ? 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=800&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1599739291060-4578e77dac5d?q=80&w=800&auto=format&fit=crop',
      tags: ['Personalizado']
    };
    onAddToCart(customProduct);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10"><h2 className="text-3xl font-serif font-bold text-brand-dark">Crea tu Arreglo Ideal</h2><p className="mt-4 text-gray-600 max-w-2xl mx-auto">Diseña cada detalle y nosotros lo haremos realidad.</p></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 mb-4"><span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> Elige la base</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setBaseType('ramo')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${baseType === 'ramo' ? 'border-brand-primary bg-purple-50 text-brand-dark' : 'border-gray-200 hover:border-brand-primary/50'}`}><Gift size={32} className={baseType === 'ramo' ? 'text-brand-primary' : 'text-gray-400'} /><span className="font-bold">Ramo</span></button>
                  <button type="button" onClick={() => setBaseType('caja')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${baseType === 'caja' ? 'border-brand-primary bg-purple-50 text-brand-dark' : 'border-gray-200 hover:border-brand-primary/50'}`}><PackageIcon /><span className="font-bold">Caja / Box</span></button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2 mb-4"><span className="bg-brand-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> Selecciona el tamaño</h3>
                <div className="grid grid-cols-3 gap-3">{['chico', 'mediano', 'grande'].map((s) => (<button key={s} type="button" onClick={() => setSize(s as any)} className={`py-3 px-2 rounded-lg border text-sm font-medium capitalize transition-all ${size === s ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>{s}</button>))}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">¿Qué flores prefieres?</label><textarea rows={3} placeholder="Ej. Rosas, Girasoles..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary bg-gray-50 text-gray-900 p-3" value={flowerType} onChange={(e) => setFlowerType(e.target.value)}/></div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Palette size={16}/> Color flores</label><input type="text" placeholder="Ej. Rojas..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary bg-gray-50 text-gray-900 p-3" value={flowerColor} onChange={(e) => setFlowerColor(e.target.value)}/>
                   <label className="block text-sm font-medium text-gray-700 mt-4 mb-2 flex items-center gap-2"><Scissors size={16}/> Color papel/listón</label><input type="text" placeholder="Ej. Negro..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary bg-gray-50 text-gray-900 p-3" value={paperColor} onChange={(e) => setPaperColor(e.target.value)}/>
                </div>
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">¿Extras?</label><input type="text" placeholder="Chocolates..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary bg-gray-50 text-gray-900 p-3" value={extras} onChange={(e) => setExtras(e.target.value)}/></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><MessageSquare size={16}/> Dedicatoria</label><textarea rows={2} placeholder="Mensaje..." className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary bg-gray-50 text-gray-900 p-3" value={dedication} onChange={(e) => setDedication(e.target.value)}/></div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-brand-dark mb-6 border-b pb-2">Resumen</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between items-center"><span className="font-medium">Tipo:</span><span className="capitalize text-brand-dark">{baseType}</span></div>
                <div className="flex justify-between items-center"><span className="font-medium">Tamaño:</span><span className="capitalize text-brand-dark">{size}</span></div>
                {flowerType && <div className="bg-gray-50 p-2 rounded text-xs"><span className="font-bold block text-gray-500">Flores:</span>{flowerType}</div>}
              </div>
              <div className="mt-8 pt-4 border-t border-dashed border-gray-300">
                <div className="flex justify-between items-end mb-2"><span className="text-gray-500 font-medium">Precio:</span><span className="text-3xl font-bold text-brand-primary">${price.toLocaleString('es-MX')}</span></div>
                <button onClick={handleSubmit} className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-primary transform hover:-translate-y-1 transition-all shadow-lg flex items-center justify-center gap-2"><ShoppingBag size={20} /> Agregar al Carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export default CustomArrangement;