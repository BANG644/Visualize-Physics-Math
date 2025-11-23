import React, { useEffect, useState } from 'react';

interface Props { providerName?: string }

const LoadingOverlay: React.FC<Props> = ({ providerName }) => {
  const [message, setMessage] = useState("Analyzing request...");
  
  const steps = [
    "Identifying physical concepts...",
    "Extracting variables & constraints...",
    "Deriving mathematical models...",
    "Generating visualization code...",
    "Compiling interactive elements..."
  ];

  useEffect(() => {
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setMessage(steps[stepIndex]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
      <div className="flex flex-col items-center p-8">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{providerName || 'AI'} is Thinking</h3>
        <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs min-w-[240px] text-center uppercase tracking-wide">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
