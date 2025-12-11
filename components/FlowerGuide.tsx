import React, { useState } from 'react';
import { X, Palette, BookOpen } from 'lucide-react';

interface FlowerColorMeaning {
  color: string;
  meaning: string;
  hex?: string;
}

interface FlowerInfo {
  name: string;
  generalMeaning: string;
  desc: string;
  colors?: FlowerColorMeaning[];
}

const FLOWERS: FlowerInfo[] = [
  { name: "Rosas", generalMeaning: "Amor y Pasión", desc: "La reina de las flores. Símbolo universal de los sentimientos profundos.", colors: [{ color: "Rojo", meaning: "Amor romántico y pasión.", hex: "#ef4444" }, { color: "Blanco", meaning: "Pureza y nuevos comienzos.", hex: "#ffffff" }, { color: "Rosa", meaning: "Gratitud y admiración.", hex: "#f472b6" }, { color: "Amarillo", meaning: "Amistad.", hex: "#fbbf24" }] },
  { name: "Gerberas", generalMeaning: "Alegría e Inocencia", desc: "Ideales para levantar el ánimo y celebrar la vida.", colors: [{ color: "Naranja", meaning: "Energía.", hex: "#f97316" }, { color: "Rojo", meaning: "Amor intenso.", hex: "#ef4444" }, { color: "Blanco", meaning: "Pureza.", hex: "#ffffff" }] },
  { name: "Lilis (Lirios)", generalMeaning: "Transición y Pureza", desc: "Flores majestuosas utilizadas en bodas y ceremonias.", colors: [{ color: "Blanco", meaning: "Majestad.", hex: "#ffffff" }, { color: "Rosa", meaning: "Prosperidad.", hex: "#ec4899" }] },
  { name: "Girasoles", generalMeaning: "Adoración y Lealtad", desc: "Energía positiva pura, simbolizan la fe inquebrantable.", colors: [{ color: "Amarillo", meaning: "Felicidad.", hex: "#fbbf24" }] },
  { name: "Tulipanes", generalMeaning: "Amor Perfecto", desc: "Declaración de un amor sincero.", colors: [{ color: "Rojo", meaning: "Amor verdadero.", hex: "#ef4444" }, { color: "Morado", meaning: "Realeza.", hex: "#7e22ce" }] },
  { name: "Claveles", generalMeaning: "Fascinación", desc: "Flores duraderas con rica historia." },
  { name: "Hortensias", generalMeaning: "Gratitud", desc: "Evocan abundancia." },
  { name: "Lisianthus", generalMeaning: "Carisma", desc: "Simbolizan una personalidad extrovertida." },
  { name: "Orquídeas", generalMeaning: "Lujo y Belleza", desc: "Representan refinamiento y fuerza." },
  { name: "Peonías", generalMeaning: "Prosperidad", desc: "Flor de la riqueza y honor." },
  { name: "Margaritas", generalMeaning: "Inocencia", desc: "Símbolo de amor leal." },
  { name: "Lavanda", generalMeaning: "Calma", desc: "Serenidad y devoción." },
  { name: "Cerezo", generalMeaning: "Belleza Efímera", desc: "Renovación de la vida." },
  { name: "Amapola", generalMeaning: "Sueño y Paz", desc: "Descanso y consuelo." },
  { name: "Dalia", generalMeaning: "Compromiso", desc: "Vínculo fuerte y duradero." },
  { name: "Jazmín", generalMeaning: "Sensualidad", desc: "Amor divino y cariño." },
  { name: "Iris", generalMeaning: "Sabiduría", desc: "Elocuencia y fe." },
  { name: "Glicinia", generalMeaning: "Bienvenida", desc: "Amor inmortal." },
  { name: "Nube (Gypsofila)", generalMeaning: "Amor Eterno", desc: "Pureza, esencial en bodas." },
  { name: "Eucalipto", generalMeaning: "Protección", desc: "Limpia energías negativas." },
  { name: "Limonium", generalMeaning: "Recuerdo", desc: "Deseo de éxito." },
  { name: "Ruscus", generalMeaning: "Humildad", desc: "Seriedad en sentimientos." }
];

const FlowerGuide: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState<FlowerInfo | null>(null);

  return (
    <section id="flower-guide" className="py-16 bg-lavender-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-brand-dark">Diccionario Floral</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Descubre el mensaje oculto detrás de cada flor.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLOWERS.map((flower, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedFlower(flower)} 
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-left border border-gray-100 hover:border-brand-primary/30 flex flex-col h-full group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-50 rounded-full text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <BookOpen size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-brand-dark font-serif">{flower.name}</h3>
                   <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">{flower.generalMeaning}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 line-clamp-3">{flower.desc}</p>
            </button>
          ))}
        </div>
      </div>
      {selectedFlower && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={() => setSelectedFlower(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 sm:p-8">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button type="button" className="bg-white rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition" onClick={() => setSelectedFlower(null)}><X size={24} /></button>
              </div>
              
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-brand-primary">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-3xl font-serif font-bold text-brand-dark mb-2">{selectedFlower.name}</h3>
                <span className="inline-block px-4 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold uppercase tracking-wider">{selectedFlower.generalMeaning}</span>
              </div>

              <div className="prose prose-purple mx-auto">
                 <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">{selectedFlower.desc}</p>
                 
                 {selectedFlower.colors && selectedFlower.colors.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h4 className="flex items-center justify-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-200 pb-2">
                        <Palette size={18} className="text-brand-accent"/> Significados por color
                      </h4>
                      <div className="space-y-3">
                        {selectedFlower.colors.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center group bg-white p-2 rounded-lg shadow-sm">
                            <div className="w-6 h-6 rounded-full border border-gray-200 shadow-inner flex-shrink-0" style={{ backgroundColor: item.hex || '#ddd' }}></div>
                            <div className="text-left">
                              <span className="font-bold text-brand-dark text-sm block">{item.color}</span>
                              <span className="text-sm text-gray-500 leading-tight">{item.meaning}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlowerGuide;