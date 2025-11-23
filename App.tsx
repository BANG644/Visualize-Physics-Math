import React, { useState, useEffect } from 'react';
import { SimulationState, SimulationType } from './types';
import { analyzeAndGenerateSimulation, testGeminiKey } from './services/geminiService';
import InputSection from './components/InputSection';
import SimulationView from './components/SimulationView';
import ExampleGrid from './components/ExampleGrid';
import LoadingOverlay from './components/LoadingOverlay';
import Footer from './components/Footer';
import { PrivacyPolicy, TermsOfService } from './components/LegalDocs';
import { Atom, Github, BookOpen, Settings, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [simState, setSimState] = useState<SimulationState>({
    code: null,
    loading: false,
    error: null,
    type: SimulationType.UNKNOWN,
    logs: [],
  });

  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [providerName, setProviderName] = useState<string>(() => localStorage.getItem('aiProviderName') || 'Gemini 3.0 Pro');
  const [modelName, setModelName] = useState<string>(() => localStorage.getItem('aiModelName') || 'gemini-3-pro-preview');
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('aiApiKey') || '');
  const [providerId, setProviderId] = useState<string>(() => localStorage.getItem('aiProviderId') || 'gemini');
  const [baseUrl, setBaseUrl] = useState<string>(() => localStorage.getItem('aiBaseUrl') || 'https://generativelanguage.googleapis.com');
  const [apiPath, setApiPath] = useState<string>(() => localStorage.getItem('aiApiPath') || 'v1beta/models/{model}:generateContent');
  const [validationMsg, setValidationMsg] = useState<string>('');

  useEffect(() => {
    // Check system preference initially
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGenerate = async (text: string, file: File | null) => {
    setSimState(prev => ({ ...prev, loading: true, error: null, code: null }));
    
    try {
      if (!apiKey) {
        setSimState(prev => ({ ...prev, loading: false, error: '请先在右上角设置中输入API Key' }));
        return;
      }
      await new Promise(r => setTimeout(r, 100));
      const result = await analyzeAndGenerateSimulation(text, file, apiKey, modelName, baseUrl, providerId, apiPath);
      
      setSimState({
        code: result.code,
        type: result.type,
        loading: false,
        error: null,
        logs: [`Generated ${result.type} simulation successfully.`],
      });
    } catch (err: any) {
      setSimState(prev => ({
        ...prev,
        loading: false,
        error: err.message || "An unexpected error occurred",
      }));
    }
  };

  const handleReset = () => {
    setSimState({
      code: null,
      loading: false,
      error: null,
      type: SimulationType.UNKNOWN,
      logs: [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 flex flex-col transition-colors duration-300 font-sans">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleReset}>
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all duration-300 group-hover:rotate-12">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              Visualize Physics Math
            </span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-5 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4 pl-4">
              <a href="https://github.com/BANG644/Visualize-Physics-Math" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors" aria-label="Documentation">
                <BookOpen className="w-5 h-5"/>
              </a>
              <a href="https://github.com/BANG644/Visualize-Physics-Math" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors" aria-label="GitHub Repository">
                <Github className="w-5 h-5"/>
              </a>
            </div>

            <div className="hidden sm:flex items-center">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {providerName} • {modelName}
              </span>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                aria-label="Settings"
              >
                <Settings className={`w-5 h-5 transition-transform duration-500 ${showSettings ? 'rotate-90' : ''}`} />
              </button>
              
              {showSettings && (
                <div className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 animate-fade-in-down z-50">
                  <div className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider mb-1">Appearance</div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {darkMode ? <Moon className="w-4 h-4 text-indigo-400"/> : <Sun className="w-4 h-4 text-amber-500"/>}
                      {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </span>
                    <div className={`w-9 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${darkMode ? 'left-5' : 'left-1'}`} />
                    </div>
                  </button>
                  <div className="mt-3 text-xs font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">AI Settings</div>
                  <div className="space-y-2 px-2">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={providerId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setProviderId(val);
                          localStorage.setItem('aiProviderId', val);
                          if (val === 'gemini') {
                            setProviderName('Gemini');
                            setBaseUrl('https://generativelanguage.googleapis.com');
                            setApiPath('v1beta/models/{model}:generateContent');
                            localStorage.setItem('aiProviderName', 'Gemini');
                            localStorage.setItem('aiBaseUrl', 'https://generativelanguage.googleapis.com');
                          localStorage.setItem('aiApiPath', 'v1beta/models/{model}:generateContent');
                          } else if (val === 'openai') {
                            setProviderName('OpenAI');
                            setBaseUrl('https://api.openai.com');
                            setApiPath('v1/chat/completions');
                            localStorage.setItem('aiProviderName', 'OpenAI');
                            localStorage.setItem('aiBaseUrl', 'https://api.openai.com');
                            localStorage.setItem('aiApiPath', 'v1/chat/completions');
                          } else if (val === 'deepseek') {
                            setProviderName('DeepSeek');
                            setBaseUrl('https://api.deepseek.com');
                            setApiPath('v1/chat/completions');
                            localStorage.setItem('aiProviderName', 'DeepSeek');
                            localStorage.setItem('aiBaseUrl', 'https://api.deepseek.com');
                            localStorage.setItem('aiApiPath', 'v1/chat/completions');
                          } else if (val === 'aliyun') {
                            setProviderName('Aliyun DashScope');
                            setBaseUrl('https://dashscope.aliyuncs.com');
                            setApiPath('v1/chat/completions');
                            localStorage.setItem('aiProviderName', 'Aliyun DashScope');
                            localStorage.setItem('aiBaseUrl', 'https://dashscope.aliyuncs.com');
                            localStorage.setItem('aiApiPath', 'v1/chat/completions');
                          } else if (val === 'anthropic') {
                            setProviderName('Claude (Anthropic)');
                            setBaseUrl('https://api.anthropic.com');
                            setApiPath('v1/messages');
                            localStorage.setItem('aiProviderName', 'Claude (Anthropic)');
                            localStorage.setItem('aiBaseUrl', 'https://api.anthropic.com');
                            localStorage.setItem('aiApiPath', 'v1/messages');
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="gemini">Google Gemini</option>
                        <option value="openai">OpenAI</option>
                        <option value="deepseek">DeepSeek</option>
                        <option value="aliyun">Aliyun DashScope</option>
                        <option value="anthropic">Claude (Anthropic)</option>
                        <option value="custom">自定义</option>
                      </select>
                      <a
                        href={providerId==='gemini' ? 'https://ai.google.dev/gemini-api/docs' : providerId==='openai' ? 'https://platform.openai.com/docs/api-reference' : providerId==='deepseek' ? 'https://platform.deepseek.com/api-docs' : providerId==='aliyun' ? 'https://help.aliyun.com/zh/model-studio/developers/api-reference' : providerId==='anthropic' ? 'https://docs.anthropic.com/en/api' : '#'}
                        target="_blank" rel="noreferrer"
                        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-center hover:bg-slate-200 dark:hover:bg-slate-600"
                      >
                        文档
                      </a>
                    </div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400">访问网址 Base URL</label>
                    <input 
                      value={baseUrl}
                      onChange={(e) => { setBaseUrl(e.target.value); localStorage.setItem('aiBaseUrl', e.target.value); }}
                      placeholder={providerId==='gemini' ? 'https://generativelanguage.googleapis.com' : providerId==='openai' ? 'https://api.openai.com' : providerId==='deepseek' ? 'https://api.deepseek.com' : providerId==='aliyun' ? 'https://dashscope.aliyuncs.com' : providerId==='anthropic' ? 'https://api.anthropic.com' : 'https://example.com'}
                      className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <label className="block text-xs text-slate-500 dark:text-slate-400">API 路径</label>
                    <input 
                      value={apiPath}
                      onChange={(e) => { setApiPath(e.target.value); localStorage.setItem('aiApiPath', e.target.value); }}
                      placeholder={providerId==='gemini' ? 'v1beta/models/{model}:generateContent' : 'v1/chat/completions'}
                      className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <label className="block text-xs text-slate-500 dark:text-slate-400">AI 名称</label>
                    <input 
                      value={providerName}
                      onChange={(e) => { setProviderName(e.target.value); localStorage.setItem('aiProviderName', e.target.value); }}
                      placeholder="AI 名称，例如 Gemini 3.0 Pro"
                      className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <label className="block text-xs text-slate-500 dark:text-slate-400">模型 ID</label>
                    <input 
                      value={modelName}
                      onChange={(e) => { setModelName(e.target.value); localStorage.setItem('aiModelName', e.target.value); }}
                      placeholder={providerId==='gemini' ? '模型ID，例如 gemini-3-pro-preview' : providerId==='openai' ? '模型ID，例如 gpt-4o-mini' : providerId==='deepseek' ? '模型ID，例如 deepseek-chat' : providerId==='aliyun' ? '模型ID，例如 qwen-plus' : providerId==='anthropic' ? '模型ID，例如 claude-3-5-sonnet-20241022' : '模型ID'}
                      className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-slate-500 dark:text-slate-400">API Key</label>
                        <input 
                          type="password"
                          value={apiKey}
                          onChange={(e) => { setApiKey(e.target.value); localStorage.setItem('aiApiKey', e.target.value); }}
                          placeholder={providerId==='gemini' ? '填入 API Key' : 'Bearer Key'}
                          className="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <button 
                        onClick={() => { setApiKey(''); localStorage.removeItem('aiApiKey'); }}
                        className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200"
                      >
                        清空
                      </button>
                      <button
                        onClick={() => {
                          if (providerId === 'gemini') {
                            setBaseUrl('https://generativelanguage.googleapis.com');
                            setApiPath('v1beta/models/{model}:generateContent');
                          } else if (providerId === 'openai') {
                            setBaseUrl('https://api.openai.com');
                            setApiPath('v1/chat/completions');
                          } else if (providerId === 'deepseek') {
                            setBaseUrl('https://api.deepseek.com');
                            setApiPath('v1/chat/completions');
                          } else if (providerId === 'aliyun') {
                            setBaseUrl('https://dashscope.aliyuncs.com');
                            setApiPath('v1/chat/completions');
                          } else if (providerId === 'anthropic') {
                            setBaseUrl('https://api.anthropic.com');
                            setApiPath('v1/messages');
                          }
                        }}
                        className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200"
                      >
                        默认
                      </button>
                      <button
                        onClick={async () => {
                          setValidationMsg('测试中...');
                          try {
                            if (providerId === 'gemini') {
                              await testGeminiKey(apiKey, modelName);
                            } else {
                              const urlBase = baseUrl.replace(/\/$/, '');
                              const path = apiPath.replace('{model}', modelName).replace(/^https?:\/\//, '');
                              const endpoint = `${urlBase}/${path}`;
                              if (providerId === 'anthropic') {
                                const headers: any = { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' };
                                const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ model: modelName, max_tokens: 16, messages: [{ role: 'user', content: 'ping' }] }) });
                                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                              } else {
                                const headers: any = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` };
                                const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify({ model: modelName, messages: [{ role: 'user', content: 'ping' }] }) });
                                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                              }
                            }
                            setValidationMsg('测试通过');
                          } catch (e: any) {
                            setValidationMsg(`测试失败：${e?.message || '未知错误'}`);
                          }
                        }}
                        className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
                      >
                        测试
                      </button>
                    </div>
                    {validationMsg && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 px-2">{validationMsg}</p>
                    )}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 px-2">
                    <p className="text-[10px] text-slate-400 text-center">Version 1.2.0 • Pro Build</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col">
        
        {!simState.code && (
          <div className="flex flex-col items-center justify-center flex-1 animate-fade-in py-8">
             <div className="text-center mb-10 max-w-2xl">
               <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-[1.25] bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                 Visualize Physics Math
               </h1>
               <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-light">
                 Transform abstract problems into clear, interactive simulations instantly.
               </p>
             </div>

             <div className="w-full relative z-10">
               {simState.loading && <LoadingOverlay providerName={providerName} />}
               <InputSection onSubmit={handleGenerate} isLoading={simState.loading} />
             </div>

             {!simState.loading && <ExampleGrid onSelect={(txt) => handleGenerate(txt, null)} disabled={simState.loading} />}

             {simState.error && (
               <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-200 max-w-2xl w-full text-center shadow-sm">
                 <p className="font-semibold">Generation Failed</p>
                 <p className="text-sm opacity-80">{simState.error}</p>
               </div>
             )}
          </div>
        )}

        {simState.code && (
          <div className="h-[calc(100vh-12rem)] w-full animate-fade-in-up">
             <SimulationView 
                code={simState.code} 
                type={simState.type} 
                onReset={handleReset}
             />
          </div>
        )}

      </main>

      <Footer 
        onOpenPrivacy={() => setActiveModal('privacy')} 
        onOpenTerms={() => setActiveModal('terms')} 
      />


      {activeModal === 'privacy' && (
        <PrivacyPolicy onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'terms' && (
        <TermsOfService onClose={() => setActiveModal(null)} />
      )}

    </div>
  );
};

export default App;
