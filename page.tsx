'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';
import CodeEditor from '@/components/Editor';
import Preview from '@/components/Preview';
import FileTree from '@/components/FileTree';
import { Sparkles, Terminal, Play, Save, ChevronRight, Loader2 } from 'lucide-react';

export default function Dashboard() {
    const [files, setFiles] = useState<{ path: string; content: string }[]>([
        { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<title>Welcome</title>\n</head>\n<body>\n<h1>Empty Project</h1>\n</body>\n</html>' },
        { path: 'style.css', content: 'body { font-family: sans-serif; }' },
        { path: 'script.js', content: 'console.log("Hello");' }
    ]);
    const [activeFile, setActiveFile] = useState('index.html');
    const [view, setView] = useState<'editor' | 'preview'>('preview');

    const { input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/generate',
        onFinish: (message) => {
            try {
                const data = JSON.parse(message.content);
                if (data.files) {
                    setFiles(data.files);
                    setActiveFile(data.files[0].path);
                    setView('preview');
                }
            } catch (e) {
                console.error("Failed to parse AI response:", e);
            }
        }
    });

    const updateFileContent = (newContent: string) => {
        setFiles(files.map(f => f.path === activeFile ? { ...f, content: newContent } : f));
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            {/* Header */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 glass-card rounded-none">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary rounded-lg">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Dimo<span className="text-primary italic">AI</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                        <button
                            onClick={() => setView('editor')}
                            className={`px-4 py-1.5 rounded-md text-sm transition-all ${view === 'editor' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Editor
                        </button>
                        <button
                            onClick={() => setView('preview')}
                            className={`px-4 py-1.5 rounded-md text-sm transition-all ${view === 'preview' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Preview
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-all text-sm font-medium">
                        <Save size={16} /> Deploy
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 border-r border-white/10 flex flex-col">
                    <FileTree files={files} activeFile={activeFile} onFileSelect={setActiveFile} />

                    <div className="mt-auto p-4 border-t border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 text-primary font-medium text-sm">
                            <Terminal size={14} /> 2026 Engine Ready
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <section className="flex-1 flex flex-col p-6 bg-slate-900/50">
                    <div className="flex-1 min-h-0 relative">
                        {view === 'editor' ? (
                            <CodeEditor files={files} activeFile={activeFile} onCodeChange={updateFileContent} />
                        ) : (
                            <Preview files={files} />
                        )}
                    </div>

                    {/* Prompt Input Area */}
                    <div className="mt-6">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask DimoAI to build something amazing... (e.g., 'A modern bakery landing page')"
                                className="w-full h-14 pl-14 pr-32 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary/50 text-white placeholder-gray-500 glass-card"
                            />
                            <Sparkles className="absolute left-5 top-4.5 text-primary" size={24} />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute right-3 top-2.5 h-9 px-6 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all flex items-center gap-2 text-sm font-semibold disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={16} /> : <><ChevronRight size={18} /> Generate</>}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
