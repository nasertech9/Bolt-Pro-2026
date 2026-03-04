'use client';

import { File, Folder } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FileTreeProps {
    files: { path: string; content: string }[];
    activeFile: string;
    onFileSelect: (path: string) => void;
}

export default function FileTree({ files, activeFile, onFileSelect }: FileTreeProps) {
    return (
        <div className="p-4 flex flex-col gap-1">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Project Files</div>
            {files.map((file) => (
                <button
                    key={file.path}
                    onClick={() => onFileSelect(file.path)}
                    className={twMerge(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                        activeFile === file.path
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <File size={16} />
                    <span>{file.path}</span>
                </button>
            ))}
        </div>
    );
}
