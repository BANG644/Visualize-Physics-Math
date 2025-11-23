import React, { useEffect, useRef } from 'react';
import { RefreshCw, Download, ArrowLeft } from 'lucide-react';

interface SimulationViewProps {
  code: string;
  type: string;
  onReset?: () => void;
}

const SimulationView: React.FC<SimulationViewProps> = ({ code, type, onReset }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gemini-sim-${type.toLowerCase()}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 animate-fade-in transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 flex-wrap">
           {onReset && (
            <button 
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              type === 'Mechanics' ? 'bg-blue-500' :
              type === 'Electricity' ? 'bg-amber-400' :
              type === 'Geometry' ? 'bg-emerald-500' :
              type === 'Algebra' ? 'bg-pink-500' : 'bg-slate-400'
            }`} />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 tracking-tight">{type} Simulation</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <button 
             onClick={handleDownload}
             className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700"
             title="Download HTML"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export HTML</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-white dark:bg-slate-950">
        {/* The Sandbox Environment */}
        <iframe
          ref={iframeRef}
          title="Generated Simulation"
          srcDoc={code}
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  );
};

export default SimulationView;
