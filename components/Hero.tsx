import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-lavender-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-lavender-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-serif font-extrabold text-brand-dark sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Emociones que</span>{' '}
                <span className="block text-brand-primary xl:inline">florecen</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Entregamos los arreglos florales más frescos y exclusivos de la ciudad. 
                Cada tallo es seleccionado a mano para garantizar una sonrisa inolvidable.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button 
                    onClick={() => onNavigate('catalog')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark transition md:py-4 md:text-lg"
                  >
                    Ver Catálogo
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button 
                    onClick={() => onNavigate('ai-helper')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-primary bg-purple-100 hover:bg-purple-200 transition md:py-4 md:text-lg"
                  >
                    Asistente Virtual <ArrowRight className="ml-2 w-4 h-4"/>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=1920&auto=format&fit=crop" 
          alt="Mesa de florista con flores frescas"
        />
      </div>
    </div>
  );
};

export default Hero;