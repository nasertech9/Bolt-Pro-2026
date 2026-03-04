'use client';

import { useEffect, useState } from 'react';

interface PreviewProps {
    files: { path: string; content: string }[];
}

export default function Preview({ files }: PreviewProps) {
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const htmlFile = files.find((f) => f.path === 'index.html');
        const cssFiles = files.filter((f) => f.path.endsWith('.css'));
        const jsFiles = files.filter((f) => f.path.endsWith('.js'));

        if (!htmlFile) return;

        let content = htmlFile.content;

        // Inject CSS
        cssFiles.forEach((f) => {
            const styleTag = `<style>${f.content}</style>`;
            content = content.replace('</head>', `${styleTag}</head>`);
        });

        // Inject JS
        jsFiles.forEach((f) => {
            const scriptTag = `<script>${f.content}</script>`;
            content = content.replace('</body>', `${scriptTag}</body>`);
        });

        setSrcDoc(content);
    }, [files]);

    return (
        <div className="h-full w-full bg-white rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
                title="Live Preview"
                className="h-full w-full"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
            />
        </div>
    );
}
