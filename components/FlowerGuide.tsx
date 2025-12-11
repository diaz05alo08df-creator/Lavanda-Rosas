import React, { useState } from 'react';
import { X, Info, Palette } from 'lucide-react';

interface FlowerColorMeaning {
  color: string;
  meaning: string;
  hex?: string; // Para mostrar un puntito de color
}

interface FlowerInfo {
  name: string;
  generalMeaning: string;
  desc: string;
  image: string;
  colors?: FlowerColorMeaning[];
}

const FLOWERS: FlowerInfo[] = [
  {
    name: "Rosas",
    generalMeaning: "Amor y Pasión",
    desc: "La reina de las flores. Símbolo universal de los sentimientos profundos, su significado varía drásticamente según su tonalidad.",
    image: "https://images.unsplash.com/photo-1548505295-a226b5284898?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Rojo", meaning: "Amor romántico, pasión y respeto.", hex: "#ef4444" },
      { color: "Blanco", meaning: "Pureza, inocencia, humildad y nuevos comienzos (bodas).", hex: "#ffffff" },
      { color: "Rosa", meaning: "Gratitud, aprecio, admiración y simpatía.", hex: "#f472b6" },
      { color: "Amarillo", meaning: "Amistad, alegría y 'bienvenida'.", hex: "#fbbf24" },
      { color: "Naranja", meaning: "Entusiasmo, deseo y energía.", hex: "#f97316" },
      { color: "Lavanda", meaning: "Encantamiento y amor a primera vista.", hex: "#a855f7" }
    ]
  },
  {
    name: "Gerberas",
    generalMeaning: "Alegría e Inocencia",
    desc: "Con sus colores vibrantes y forma perfecta, las gerberas son ideales para levantar el ánimo y celebrar la vida.",
    image: "https://images.unsplash.com/photo-1613539246066-78db6ec4ff0f?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Naranja", meaning: "Energía, euforia y calor.", hex: "#f97316" },
      { color: "Rojo", meaning: "Amor intenso y apasionado (menos tradicional que la rosa).", hex: "#ef4444" },
      { color: "Blanco", meaning: "Pureza e inocencia infantil.", hex: "#ffffff" },
      { color: "Rosa", meaning: "Admiración y simpatía.", hex: "#f472b6" },
      { color: "Amarillo", meaning: "Celebración y alegría pura.", hex: "#fbbf24" }
    ]
  },
  {
    name: "Lilis (Lirios)",
    generalMeaning: "Transición y Pureza",
    desc: "Flores majestuosas y fragantes. Muy utilizadas tanto en bodas como en funerales por su simbolismo de trascendencia.",
    image: "https://images.unsplash.com/photo-1572454591674-2739f30d8c40?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Blanco", meaning: "Pureza, majestad y renacimiento del alma.", hex: "#ffffff" },
      { color: "Rosa (Stargazer)", meaning: "Prosperidad, abundancia y ambición.", hex: "#ec4899" },
      { color: "Naranja", meaning: "Pasión y confianza.", hex: "#f97316" },
      { color: "Amarillo", meaning: "Gratitud y felicidad.", hex: "#fbbf24" }
    ]
  },
  {
    name: "Girasoles",
    generalMeaning: "Adoración y Lealtad",
    desc: "Siempre buscando la luz, simbolizan la fe inquebrantable, la lealtad y la longevidad. Energía positiva pura.",
    image: "https://images.unsplash.com/photo-1521996346255-a6e5541ba3a9?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Amarillo", meaning: "Inteligencia, vitalidad y felicidad.", hex: "#fbbf24" }
    ]
  },
  {
    name: "Tulipanes",
    generalMeaning: "Amor Perfecto",
    desc: "Elegantes y sofisticados. Son la declaración de un amor sincero y perfecto.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Rojo", meaning: "Declaración de amor verdadero.", hex: "#ef4444" },
      { color: "Morado", meaning: "Realeza, elegancia y éxito.", hex: "#7e22ce" },
      { color: "Blanco", meaning: "Perdón y paz.", hex: "#ffffff" },
      { color: "Amarillo", meaning: "Pensamientos alegres y luz del sol.", hex: "#fbbf24" },
      { color: "Rosa", meaning: "Afecto y cuidado (ideal para amigos/familia).", hex: "#f472b6" }
    ]
  },
  {
    name: "Claveles",
    generalMeaning: "Fascinación y Distinción",
    desc: "Flores duraderas con pétalos rizados. Tienen una rica historia simbólica en muchas culturas.",
    image: "https://images.unsplash.com/photo-1563241527-300627d3a436?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Rojo", meaning: "Admiración profunda y orgullo.", hex: "#ef4444" },
      { color: "Rosa", meaning: "Amor maternal incondicional.", hex: "#f472b6" },
      { color: "Blanco", meaning: "Buena suerte y amor puro.", hex: "#ffffff" },
      { color: "Jaspeado", meaning: "Rechazo o 'no puedo estar contigo' (histórico).", hex: "#d946ef" }
    ]
  },
  {
    name: "Hortensias",
    generalMeaning: "Gratitud y Abundancia",
    desc: "Esferas florales que evocan abundancia por su gran cantidad de flores. También simbolizan emociones sinceras.",
    image: "https://images.unsplash.com/photo-1505313886566-b203c9eb38c6?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Azul", meaning: "Frialdad o petición de perdón.", hex: "#3b82f6" },
      { color: "Rosa", meaning: "Emoción sincera y romance.", hex: "#f472b6" },
      { color: "Blanco", meaning: "Pureza y gracia.", hex: "#ffffff" },
      { color: "Morado", meaning: "Deseo de comprender profundamente a alguien.", hex: "#7e22ce" }
    ]
  },
  {
    name: "Lisianthus",
    generalMeaning: "Carisma y Aprecio",
    desc: "Parecidas a las rosas pero más silvestres. Simbolizan una personalidad extrovertida y agradecimiento.",
    image: "https://images.unsplash.com/photo-1563578270-22c7a4023bd2?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Morado", meaning: "Realeza y belleza.", hex: "#7e22ce" },
      { color: "Blanco", meaning: "Espiritualidad y lazos eternos.", hex: "#ffffff" },
      { color: "Rosa", meaning: "Amor tierno.", hex: "#f472b6" }
    ]
  },
  {
    name: "Orquídeas",
    generalMeaning: "Lujo y Belleza Exótica",
    desc: "Representan el refinamiento, la belleza rara y la fuerza. Un regalo de larga duración.",
    image: "https://images.unsplash.com/photo-1588636413233-e4b2d1c68f44?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Blanco", meaning: "Elegancia, inocencia y belleza.", hex: "#ffffff" },
      { color: "Rosa", meaning: "Feminidad, gracia y alegría.", hex: "#f472b6" },
      { color: "Morado", meaning: "Admiración, respeto y dignidad.", hex: "#7e22ce" }
    ]
  },
  {
    name: "Peonías",
    generalMeaning: "Prosperidad y Buena Fortuna",
    desc: "La flor de la riqueza y el honor. Muy popular en bodas por augurar un matrimonio feliz.",
    image: "https://images.unsplash.com/photo-1557367184-663fba4b8b91?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Rosa", meaning: "Romance y prosperidad.", hex: "#f472b6" },
      { color: "Blanco", meaning: "Timidez y arrepentimiento.", hex: "#ffffff" },
      { color: "Rojo", meaning: "Honor y respeto.", hex: "#ef4444" }
    ]
  },
  {
    name: "Margaritas",
    generalMeaning: "Inocencia y Pureza",
    desc: "Símbolo clásico de la inocencia infantil y el amor leal. Representa la sencillez y la alegría pura.",
    image: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Blanco", meaning: "Inocencia, pureza y secreto guardado.", hex: "#ffffff" },
      { color: "Amarillo", meaning: "Felicidad y lealtad.", hex: "#fbbf24" }
    ]
  },
  {
    name: "Lavanda",
    generalMeaning: "Calma y Devoción",
    desc: "Conocida por su aroma relajante, simboliza la serenidad, la pureza, el silencio y la devoción espiritual.",
    image: "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?q=80&w=400&auto=format&fit=crop",
    colors: [
       { color: "Lavanda", meaning: "Refinamiento y gracia.", hex: "#a855f7" }
    ]
  },
  {
    name: "Flor de Cerezo",
    generalMeaning: "Belleza Efímera",
    desc: "En la cultura japonesa (Sakura), representa la fragilidad y la belleza de la vida. Simboliza la renovación y el renacimiento.",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Amapola",
    generalMeaning: "Sueño y Paz",
    desc: "Asociada con el descanso eterno, la paz y el consuelo. Sus vibrantes pétalos rojos también pueden significar placer.",
    image: "https://images.unsplash.com/photo-1528562375548-a734eb8b8359?q=80&w=400&auto=format&fit=crop",
    colors: [
      { color: "Rojo", meaning: "Placer y consuelo.", hex: "#ef4444" },
      { color: "Blanco", meaning: "Consuelo y sueños.", hex: "#ffffff" }
    ]
  },
  {
    name: "Dalia",
    generalMeaning: "Compromiso y Elegancia",
    desc: "Flores complejas y hermosas que simbolizan la dignidad, la elegancia y un vínculo fuerte y duradero.",
    image: "https://images.unsplash.com/photo-1599824316900-54e7d1746f36?q=80&w=400&auto=format&fit=crop",
    colors: [
       { color: "Rojo", meaning: "Fuerza y poder.", hex: "#ef4444" },
       { color: "Rosa", meaning: "Gratitud y delicadeza.", hex: "#f472b6" },
       { color: "Blanco", meaning: "Pureza y enfoque.", hex: "#ffffff" }
    ]
  },
  {
    name: "Jazmín",
    generalMeaning: "Sensualidad y Amabilidad",
    desc: "Famosa por su dulce aroma. Representa el cariño, la modestia y, en muchas culturas, el amor sensual y divino.",
    image: "https://images.unsplash.com/photo-1554521848-154df67a63d9?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Iris",
    generalMeaning: "Sabiduría y Esperanza",
    desc: "Su nombre proviene de la diosa griega del arcoíris. Simboliza la elocuencia, la fe y la sabiduría.",
    image: "https://images.unsplash.com/photo-1563228189-e74f85d26330?q=80&w=400&auto=format&fit=crop",
    colors: [
       { color: "Azul/Morado", meaning: "Realeza y sabiduría.", hex: "#7e22ce" },
       { color: "Blanco", meaning: "Pureza.", hex: "#ffffff" },
       { color: "Amarillo", meaning: "Pasión.", hex: "#fbbf24" }
    ]
  },
  {
    name: "Glicinia",
    generalMeaning: "Bienvenida y Amor Inmortal",
    desc: "Cascadas de flores que simbolizan una vida larga, el romance duradero y la bienvenida cálida.",
    image: "https://images.unsplash.com/photo-1558280666-4d10499d6918?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Gypsofila (Nube)",
    generalMeaning: "Amor Eterno",
    desc: "Pequeñas flores blancas delicadas. Representan la pureza y el amor que nunca muere. Esencial en bodas.",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Eucalipto",
    generalMeaning: "Protección",
    desc: "Follaje aromático que simboliza protección y abundancia. Se dice que sus hojas limpian las energías negativas.",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Limonium",
    generalMeaning: "Recuerdo y Éxito",
    desc: "Conocida como 'Statice', simboliza el recuerdo, la simpatía y el deseo de éxito.",
    image: "https://images.unsplash.com/photo-1463130436814-27988352b22b?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Ruscus",
    generalMeaning: "Humildad",
    desc: "Follaje verde intenso y duradero. Representa la consideración, la humildad y la seriedad en los sentimientos.",
    image: "https://images.unsplash.com/photo-1629737156976-1894d07b461c?q=80&w=400&auto=format&fit=crop"
  }
];

const FlowerGuide: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState<FlowerInfo | null>(null);

  return (
    <section id="flower-guide" className="py-16 bg-lavender-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-brand-dark">Diccionario Floral</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Descubre el mensaje oculto detrás de cada flor. Haz clic en cada tarjeta para conocer los significados específicos según el color.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLOWERS.map((flower, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelectedFlower(flower)}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group text-left flex flex-col h-full border border-transparent hover:border-purple-200"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img 
                  src={flower.image} 
                  alt={flower.name} 
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <Info size={16} /> Ver detalles y colores
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-brand-dark font-serif mb-1">{flower.name}</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-3 block">{flower.generalMeaning}</span>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {flower.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL DE DETALLES */}
      {selectedFlower && (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
              aria-hidden="true"
              onClick={() => setSelectedFlower(null)}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              
              <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
                <button
                  type="button"
                  className="bg-white rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 shadow-sm"
                  onClick={() => setSelectedFlower(null)}
                >
                  <span className="sr-only">Cerrar</span>
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Columna Imagen */}
                <div className="h-48 md:h-full bg-gray-200 relative">
                  <img 
                    src={selectedFlower.image} 
                    alt={selectedFlower.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:hidden">
                    <h3 className="text-2xl font-serif font-bold text-white">{selectedFlower.name}</h3>
                    <p className="text-purple-200">{selectedFlower.generalMeaning}</p>
                  </div>
                </div>

                {/* Columna Info */}
                <div className="p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
                  <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2 hidden md:block">{selectedFlower.name}</h3>
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4 hidden md:inline-block">
                    {selectedFlower.generalMeaning}
                  </span>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed border-b border-gray-100 pb-6">
                    {selectedFlower.desc}
                  </p>

                  {selectedFlower.colors && selectedFlower.colors.length > 0 ? (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                        <Palette size={18} className="text-brand-accent"/> Significados por color
                      </h4>
                      <div className="space-y-3">
                        {selectedFlower.colors.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start group">
                            <div 
                              className="w-4 h-4 rounded-full mt-1 border border-gray-200 shadow-sm flex-shrink-0" 
                              style={{ backgroundColor: item.hex || '#ddd' }}
                            ></div>
                            <div>
                              <span className="font-bold text-gray-800 text-sm block">{item.color}</span>
                              <span className="text-sm text-gray-500">{item.meaning}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-purple-50 p-4 rounded-lg text-sm text-purple-800">
                      Esta variedad suele tener un significado general único, independientemente de sus variaciones sutiles de tono.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-dark text-base font-medium text-white hover:bg-brand-primary focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedFlower(null)}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlowerGuide;