import React from 'react';
import { ExampleScenario, SimulationType } from '../types';
import { Activity, Zap, Triangle, TrendingUp, Box, Waves } from 'lucide-react';

interface ExampleGridProps {
  onSelect: (prompt: string) => void;
  disabled: boolean;
}

const examples: ExampleScenario[] = [
  {
    id: '1',
    title: 'Projectile Motion',
    description: 'A cannonball fired at 45° with initial velocity 50m/s. Show trajectory.',
    category: SimulationType.MECHANICS,
    icon: 'activity'
  },
  {
    id: '2',
    title: 'Simple Pendulum',
    description: 'Simple pendulum with length 2m and mass 1kg. Show period and energy.',
    category: SimulationType.MECHANICS,
    icon: 'box'
  },
  {
    id: '3',
    title: 'Ohm\'s Law Circuit',
    description: 'Circuit with variable voltage source and resistor. Plot V vs I.',
    category: SimulationType.ELECTRICITY,
    icon: 'zap'
  },
  {
    id: '4',
    title: 'Interactive Unit Circle',
    description: 'Interactive unit circle showing Sine, Cosine and Tangent values.',
    category: SimulationType.GEOMETRY,
    icon: 'triangle'
  },
  {
    id: '5',
    title: 'Quadratic Functions',
    description: 'Parabola y = ax² + bx + c with sliders for a, b, c. Show roots.',
    category: SimulationType.ALGEBRA,
    icon: 'trending'
  },
  {
    id: '6',
    title: 'Refraction (Snell\'s Law)',
    description: 'Light ray passing through two media with different indices of refraction.',
    category: SimulationType.MECHANICS, // Or Optics, generally falls under Physics
    icon: 'waves'
  }
];

const ExampleGrid: React.FC<ExampleGridProps> = ({ onSelect, disabled }) => {
  
  const getIcon = (name: string) => {
    switch(name) {
      case 'activity': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'triangle': return <Triangle className="w-5 h-5 text-emerald-500" />;
      case 'trending': return <TrendingUp className="w-5 h-5 text-pink-500" />;
      case 'waves': return <Waves className="w-5 h-5 text-cyan-500" />;
      default: return <Box className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 transition-opacity duration-500 pb-12">
      <h3 className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 ml-1">Try an Example</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {examples.map((ex) => (
          <button
            key={ex.id}
            onClick={() => onSelect(ex.description)}
            disabled={disabled}
            className="flex flex-col items-start p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 rounded-xl transition-all group text-left shadow-sm hover:shadow-md h-full"
          >
            <div className="flex items-center gap-3 mb-2 w-full">
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700 group-hover:border-indigo-100 dark:group-hover:border-indigo-500/20 transition-colors shrink-0">
                {getIcon(ex.icon)}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate w-full">{ex.title}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{ex.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleGrid;