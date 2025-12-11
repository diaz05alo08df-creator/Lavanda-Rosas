import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative bg-lavender-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl tracking-tight font-serif font-extrabold text-brand-dark sm:text-5xl md:text-6xl">
            <span className="block">Emociones que</span>{' '}
            <span className="block text-brand-primary">florecen</span>
          </h1>
          <p className="mt-6 text-base text-gray-500 sm:text-lg md:text-xl max-w-2xl mx-auto">
            Entregamos los arreglos florales más frescos y exclusivos de la ciudad. 
            Cada tallo es seleccionado a mano para garantizar una sonrisa inolvidable.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
            <div className="rounded-md shadow">
              <button 
                onClick={() => onNavigate('catalog')}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary hover:bg-brand-dark transition md:py-4 md:text-lg"
              >
                Ver Catálogo
              </button>
            </div>
            <div>
              <button 
                onClick={() => onNavigate('ai-helper')}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-primary bg-purple-100 hover:bg-purple-200 transition md:py-4 md:text-lg"
              >
                Asistente Virtual <ArrowRight className="ml-2 w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;