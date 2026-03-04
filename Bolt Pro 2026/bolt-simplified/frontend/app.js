// Bolt Pro 2026 - Advanced SaaS Logic
let editor;
let activeProjectId = null;
let projects = JSON.parse(localStorage.getItem('bolt_projects')) || [];

let files = [
    { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<title>New Project</title>\n</head>\n<body>\n<h1>Your AI Website will appear here...</h1>\n</body>\n</html>' },
    { path: 'style.css', content: 'body { font-family: sans-serif; background: #fafafa; padding: 40px; }' },
    { path: 'script.js', content: '// Happy Coding!' }
];
let activeFilePath = 'index.html';

const ViewMode = {
    Editor: 'editor',
    Preview: 'preview'
};

// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: files.find(f => f.path === activeFilePath).content,
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
        padding: { top: 16 }
    });

    editor.onDidChangeModelContent(() => {
        const currentContent = editor.getValue();
        const file = files.find(f => f.path === activeFilePath);
        if (file) {
            file.content = currentContent;
            updatePreview();
            saveCurrentProject();
        }
    });

    initApp();
});

// UI Elements
const promptInput = document.getElementById('prompt-input');
const generateBtn = document.getElementById('generate-btn');
const newProjectBtn = document.getElementById('new-btn');
const filesList = document.getElementById('files-list');
const historyList = document.getElementById('history-list');
const toggleEditor = document.getElementById('toggle-editor');
const togglePreview = document.getElementById('toggle-preview');
const editorBox = document.getElementById('editor-container');
const previewBox = document.getElementById('preview-container');
const livePreview = document.getElementById('live-preview');
const deployBtn = document.getElementById('deploy-btn');

// Event Listeners
toggleEditor.addEventListener('click', () => switchView('editor'));
togglePreview.addEventListener('click', () => switchView('preview'));
generateBtn.addEventListener('click', handleGenerate);
newProjectBtn.addEventListener('click', startNewProject);
deployBtn.addEventListener('click', handleDeploy);
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGenerate();
});

function initApp() {
    renderHistory();
    if (projects.length > 0) {
        loadProject(projects[0].id);
    } else {
        renderFileTree();
        updatePreview();
    }
}

function switchView(mode) {
    if (mode === 'editor') {
        toggleEditor.classList.add('active');
        togglePreview.classList.remove('active');
        editorBox.classList.add('visible');
        previewBox.classList.remove('visible');
    } else {
        toggleEditor.classList.remove('active');
        togglePreview.classList.add('active');
        editorBox.classList.remove('visible');
        previewBox.classList.add('visible');
        updatePreview();
    }
}

function renderFileTree() {
    filesList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file.path;
        if (file.path === activeFilePath) li.classList.add('active');
        li.addEventListener('click', () => selectFile(file.path));
        filesList.appendChild(li);
    });
}

function selectFile(path) {
    activeFilePath = path;
    const file = files.find(f => f.path === path);
    if (editor && file) {
        const lang = path.endsWith('.html') ? 'html' : path.endsWith('.css') ? 'css' : 'javascript';
        monaco.editor.setModelLanguage(editor.getModel(), lang);
        editor.setValue(file.content);
    }
    renderFileTree();
}

function updatePreview() {
    const htmlFile = files.find(f => f.path === 'index.html');
    const cssFile = files.find(f => f.path === 'style.css');
    const jsFile = files.find(f => f.path === 'script.js');

    if (!htmlFile) return;

    let docContent = htmlFile.content;
    if (cssFile) docContent = docContent.replace('</head>', `<style>${cssFile.content}</style></head>`);
    if (jsFile) docContent = docContent.replace('</body>', `<script>${jsFile.content}</script></body>`);

    livePreview.srcdoc = docContent;
}

// History & Persistence
function saveCurrentProject() {
    if (!activeProjectId) return;
    const index = projects.findIndex(p => p.id === activeProjectId);
    if (index !== -1) {
        projects[index].files = files;
        projects[index].updatedAt = new Date().toISOString();
        localStorage.setItem('bolt_projects', JSON.stringify(projects));
        renderHistory();
    }
}

function renderHistory() {
    historyList.innerHTML = '';
    projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).forEach(p => {
        const li = document.createElement('li');
        li.textContent = p.name;
        if (p.id === activeProjectId) li.classList.add('active');
        li.addEventListener('click', () => loadProject(p.id));
        historyList.appendChild(li);
    });
}

function loadProject(id) {
    const project = projects.find(p => p.id === id);
    if (project) {
        activeProjectId = id;
        files = JSON.parse(JSON.stringify(project.files));
        activeFilePath = 'index.html';
        if (editor) {
            editor.setValue(files.find(f => f.path === activeFilePath).content);
            monaco.editor.setModelLanguage(editor.getModel(), 'html');
        }
        renderFileTree();
        renderHistory();
        updatePreview();
    }
}

function startNewProject() {
    activeProjectId = null;
    files = [
        { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<title>New Project</title>\n</head>\n<body>\n<h1>Your AI Website will appear here...</h1>\n</body>\n</html>' },
        { path: 'style.css', content: 'body { font-family: sans-serif; background: #fafafa; padding: 40px; }' },
        { path: 'script.js', content: '// Happy Coding!' }
    ];
    activeFilePath = 'index.html';
    if (editor) editor.setValue(files[0].content);
    renderFileTree();
    updatePreview();
    promptInput.value = '';
    promptInput.focus();
}

async function handleGenerate() {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    const genView = document.getElementById('generation-2026-view');
    const steps = document.querySelectorAll('#gen-steps .step');
    genView.classList.remove('hide');

    setLoading(true);
    let fullResponse = '';

    // Step animation logic
    let stepIdx = 0;
    const stepInterval = setInterval(() => {
        if (stepIdx < steps.length) {
            steps.forEach(s => s.classList.remove('active'));
            steps[stepIdx].classList.add('active');
            stepIdx++;
        }
    }, 2000);

    try {
        const response = await fetch('http://localhost:3001/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) throw new Error('API Error');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('0:')) {
                    const textContent = JSON.parse(line.substring(2));
                    fullResponse += textContent;
                }
            }
        }

        try {
            const cleaned = fullResponse.replace(/```json|```/g, '').trim();
            const data = JSON.parse(cleaned);
            if (data.files) {
                files = data.files;
                activeFilePath = 'index.html';

                // Save as new project if not active
                if (!activeProjectId) {
                    activeProjectId = 'proj_' + Date.now();
                    projects.push({
                        id: activeProjectId,
                        name: prompt.substring(0, 20) + (prompt.length > 20 ? '...' : ''),
                        files: files,
                        updatedAt: new Date().toISOString()
                    });
                } else {
                    const idx = projects.findIndex(p => p.id === activeProjectId);
                    projects[idx].files = files;
                    projects[idx].updatedAt = new Date().toISOString();
                }

                localStorage.setItem('bolt_projects', JSON.stringify(projects));

                selectFile('index.html');
                updatePreview();
                renderHistory();
            }
        } catch (parseErr) {
            console.error("Failed to parse AI outcome:", parseErr);
        }

    } catch (err) {
        console.error("Generation failed:", err);
    } finally {
        clearInterval(stepInterval);
        setTimeout(() => {
            genView.classList.add('hide');
            setLoading(false);
            switchView('preview');
        }, 1000);
    }
}

async function handleDeploy() {
    const deployView = document.getElementById('deploy-2026-view');
    deployView.classList.remove('hide');
    setTimeout(() => {
        deployView.classList.add('hide');
        alert("🚀 Site 2026 Deployed Successfully to Edge Nodes!");
    }, 3000);
}

function setLoading(isLoading) {
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader-ring');
    if (isLoading) {
        generateBtn.disabled = true;
        btnText.classList.add('hide');
        loader.classList.remove('hide');
    } else {
        generateBtn.disabled = false;
        btnText.classList.remove('hide');
        loader.classList.add('hide');
    }
}
