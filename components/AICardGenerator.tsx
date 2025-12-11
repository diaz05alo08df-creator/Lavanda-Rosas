import React, { useState } from 'react';
import { Sparkles, PenTool, Copy, Check, Gift, Search } from 'lucide-react';
import { generateDedication, recommendProducts } from '../services/geminiService';
import { MessageRequest, Product } from '../types';

interface AICardGeneratorProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const AICardGenerator: React.FC<AICardGeneratorProps> = ({ products, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<'message' | 'recommendation'>('recommendation');
  const [msgData, setMsgData] = useState<MessageRequest>({ occasion: '', recipient: '', tone: 'Romántico' });
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [recOccasion, setRecOccasion] = useState('');
  const [recPreferences, setRecPreferences] = useState('');
  const [recommendations, setRecommendations] = useState<{product: Product, reason: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgData.occasion || !msgData.recipient) return;
    setIsLoading(true);
    setGeneratedMessage('');
    const result = await generateDedication(msgData);
    setGeneratedMessage(result);
    setIsLoading(false);
  };

  const handleRecommendationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recOccasion || !recPreferences) return;
    setIsLoading(true);
    setRecommendations([]);
    const results = await recommendProducts(recOccasion, recPreferences, products);
    const fullRecommendations = results.map(res => {
      const product = products.find(p => p.id === res.id);
      return product ? { product, reason: res.reason } : null;
    }).filter(item => item !== null) as {product: Product, reason: string}[];
    setRecommendations(fullRecommendations);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-helper" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 to-brand-dark rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 md:p-12 text-white flex flex-col justify-center bg-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-400" />
                <span className="text-purple-200 font-bold tracking-wider uppercase text-sm">Lavanda AI Studio</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Asistente Floral Inteligente</h2>
              <p className="text-purple-100 text-lg mb-8">Utilizamos inteligencia artificial para ayudarte a expresar tus sentimientos y encontrar el regalo perfecto.</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => setActiveTab('recommendation')} className={`flex items-center gap-3 p-4 rounded-xl transition-all text-left ${activeTab === 'recommendation' ? 'bg-white text-brand-dark shadow-lg' : 'bg-white/10 hover:bg-white/20 text-purple-100'}`}>
                  <div className={`p-2 rounded-full ${activeTab === 'recommendation' ? 'bg-purple-100 text-brand-primary' : 'bg-brand-dark'}`}><Gift size={20} /></div>
                  <div><h3 className="font-bold">Sugerir Regalo Ideal</h3><p className="text-xs opacity-80">Encuentra el arreglo perfecto</p></div>
                </button>
                <button onClick={() => setActiveTab('message')} className={`flex items-center gap-3 p-4 rounded-xl transition-all text-left ${activeTab === 'message' ? 'bg-white text-brand-dark shadow-lg' : 'bg-white/10 hover:bg-white/20 text-purple-100'}`}>
                  <div className={`p-2 rounded-full ${activeTab === 'message' ? 'bg-purple-100 text-brand-primary' : 'bg-brand-dark'}`}><PenTool size={20} /></div>
                  <div><h3 className="font-bold">Redactor de Dedicatorias</h3><p className="text-xs opacity-80">Crea el mensaje perfecto</p></div>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-8 md:p-12 min-h-[500px]">
              {activeTab === 'recommendation' ? (
                <div className="animate-fade-in">
                   <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">¿Qué estamos celebrando hoy?</h3>
                   <form onSubmit={handleRecommendationSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Ocasión</label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary py-3 px-4 bg-white text-gray-900" value={recOccasion} onChange={(e) => setRecOccasion(e.target.value)}>
                          <option value="">Selecciona...</option>
                          <option value="Cumpleaños">Cumpleaños</option>
                          <option value="Aniversario">Aniversario</option>
                          <option value="Primera Cita">Primera Cita</option>
                          <option value="Recuperación">Deseos de recuperación</option>
                          <option value="Agradecimiento">Agradecimiento</option>
                          <option value="Condolencias">Condolencias</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gustos o Detalles</label>
                        <textarea placeholder="Ej. Le encantan los tulipanes, su color favorito es el rosa, es una persona muy elegante..." rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary py-3 px-4 bg-white text-gray-900" value={recPreferences} onChange={(e) => setRecPreferences(e.target.value)}/>
                      </div>
                      <button type="submit" disabled={isLoading || !recOccasion || !recPreferences} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-brand-primary disabled:opacity-50 transition">
                         {isLoading ? "Analizando catálogo..." : <><Search size={18} className="mr-2"/> Buscar Sugerencias</>}
                      </button>
                   </form>

                   {recommendations.length > 0 && (
                     <div className="mt-8 space-y-4">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Recomendaciones para ti</h4>
                        {recommendations.map((item) => (
                          <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition bg-gray-50">
                            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h5 className="font-bold text-brand-dark">{item.product.name}</h5>
                              <p className="text-sm text-gray-600 mt-1 italic">"{item.reason}"</p>
                              <div className="mt-2 flex justify-between items-center">
                                <span className="text-brand-primary font-bold">${item.product.price}</span>
                                <button onClick={() => onAddToCart(item.product)} className="text-xs bg-brand-dark text-white px-3 py-1.5 rounded-full hover:bg-brand-primary transition">Agregar al Carrito</button>
                              </div>
                            </div>
                          </div>
                        ))}
                     </div>
                   )}
                </div>
              ) : (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Redacta el mensaje perfecto</h3>
                  <form onSubmit={handleMessageSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ocasión</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary py-3 px-4 bg-white text-gray-900" value={msgData.occasion} onChange={(e) => setMsgData({...msgData, occasion: e.target.value})}>
                        <option value="">Selecciona...</option>
                        <option value="Cumpleaños">Cumpleaños</option>
                        <option value="Aniversario">Aniversario</option>
                        <option value="Amor">Amor</option>
                        <option value="Condolencias">Condolencias</option>
                        <option value="Perdón">Pedir Perdón</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">¿Para quién es?</label>
                      <input type="text" placeholder="Ej. Mi esposa, Mi mamá..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary py-3 px-4 bg-white text-gray-900" value={msgData.recipient} onChange={(e) => setMsgData({...msgData, recipient: e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tono del mensaje</label>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {['Romántico', 'Divertido', 'Formal', 'Poético'].map((tone) => (
                          <button key={tone} type="button" onClick={() => setMsgData({...msgData, tone})} className={`px-4 py-2 rounded-full text-sm font-medium transition ${msgData.tone === tone ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{tone}</button>
                        ))}
                      </div>
                    </div>
                    <button type="submit" disabled={isLoading || !msgData.occasion || !msgData.recipient} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-brand-primary disabled:opacity-50 transition">
                      {isLoading ? "Escribiendo..." : <><PenTool size={18} className="mr-2"/> Generar Dedicatoria</>}
                    </button>
                  </form>
                  {generatedMessage && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 relative group">
                      <h4 className="text-xs font-bold text-yellow-800 uppercase tracking-wide mb-2">Tu mensaje sugerido:</h4>
                      <p className="font-serif italic text-gray-800 text-lg leading-relaxed">"{generatedMessage}"</p>
                      <button onClick={copyToClipboard} className="absolute top-2 right-2 p-2 text-gray-400 hover:text-brand-dark rounded bg-white/50 hover:bg-white transition" title="Copiar al portapapeles">
                        {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16} />}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICardGenerator;