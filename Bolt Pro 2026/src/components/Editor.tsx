'use client';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    files: { path: string; content: string }[];
    activeFile: string;
    onCodeChange: (content: string) => void;
}

export default function CodeEditor({ files, activeFile, onCodeChange }: CodeEditorProps) {
    const file = files.find((f) => f.path === activeFile);

    const getLanguage = (path: string) => {
        if (path.endsWith('.html')) return 'html';
        if (path.endsWith('.css')) return 'css';
        if (path.endsWith('.js')) return 'javascript';
        return 'plaintext';
    };

    return (
        <div className="h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
            <Editor
                height="100%"
                theme="vs-dark"
                language={getLanguage(activeFile)}
                value={file?.content || ''}
                onChange={(value) => onCodeChange(value || '')}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    padding: { top: 16 },
                }}
            />
        </div>
    );
}
