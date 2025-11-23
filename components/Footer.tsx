import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex flex-col items-center md:items-start">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Visualize Physics Math</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">© {new Date().getFullYear()} Open Source Education</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>using Gemini & React</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <button onClick={onOpenPrivacy} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</button>
            <button onClick={onOpenTerms} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</button>
            <a href="https://github.com/BANG644/Visualize-Physics-Math" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;