import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (text: string, file: File | null) => void;
  isLoading: boolean;
}

const PLACEHOLDERS = [
  "A 2kg block slides down a 30-degree frictionless incline. Show forces.",
  "Simulate a double pendulum with chaotic motion.",
  "Visual proof of the Pythagorean theorem with adjustable sides.",
  "Show the electric field lines between two charges of opposite magnitude.",
  "Graph the function y = sin(x) + cos(2x) and show the derivative.",
  "A spring-mass system with damping factor 0.5.",
  "Visualize the Doppler effect for a moving sound source.",
  "Interactive unit circle showing Sine, Cosine, and Tangent.",
  "Simulation of ideal gas particles in a container (PV=nRT).",
  "Calculate and visualize the trajectory of a projectile with air resistance."
];

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderFade, setPlaceholderFade] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderFade(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        setPlaceholderFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    onSubmit(text, file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="flex items-center gap-2 mb-1 px-1">
           <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
           <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Describe the Problem</h2>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 p-4 rounded-xl border border-slate-200 dark:border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none transition-all z-10 relative bg-transparent"
            disabled={isLoading}
          />
          {!text && (
            <div 
              className={`absolute top-4 left-4 right-4 pointer-events-none text-slate-400 dark:text-slate-500 transition-opacity duration-300 ${placeholderFade ? 'opacity-100' : 'opacity-0'}`}
            >
              E.g., {PLACEHOLDERS[placeholderIndex]}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              id="file-upload"
            />
            
            {!file ? (
              <label
                htmlFor="file-upload"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors border border-dashed border-slate-300 dark:border-slate-600 ${
                  isLoading ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload Diagram
              </label>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-500/30 rounded-lg">
                <ImageIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-sm text-indigo-700 dark:text-indigo-200 max-w-[150px] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 rounded-full transition-colors"
                  disabled={isLoading}
                >
                  <X className="w-3 h-3 text-indigo-500 dark:text-indigo-300" />
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || (!text && !file)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md ${
              isLoading || (!text && !file)
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95'
            }`}
          >
            {isLoading ? 'Thinking...' : 'Visualize'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputSection;
