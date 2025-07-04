// js/apps.js

// --- File System App ---
window.fileSystemApp = {
    // Mimic a more realistic Windows 11 drive/folder structure
    structure: loadFromLocalStorage('fileSystemStructure', {
        'This PC': {
            'Local Disk (C:)': {
                icon: 'fas fa-hdd',
                type: 'drive',
                content: {
                    'Program Files': {
                        icon: 'fas fa-folder',
                        type: 'folder',
                        content: {
                            'Google': { icon: 'fas fa-folder', type: 'folder', content: { 'Chrome': { icon: 'fab fa-chrome', type: 'app-folder', app: 'Chrome' } } },
                            'Microsoft': { icon: 'fas fa-folder', type: 'folder', content: {} },
                            'Utilities': { icon: 'fas fa-folder', type: 'folder', content: {} }
                        }
                    },
                    'Users': {
                        icon: 'fas fa-folder',
                        type: 'folder',
                        content: {
                            'Public': { icon: 'fas fa-folder', type: 'folder', content: {} },
                            'User': {
                                icon: 'fas fa-user-circle',
                                type: 'folder',
                                content: {
                                    'Desktop': { icon: 'fas fa-folder', type: 'folder', content: {} },
                                    'Documents': {
                                        icon: 'fas fa-folder',
                                        type: 'folder',
                                        content: {
                                            'MyNotes': { icon: 'fas fa-file-alt', type: 'file', content: 'This is a sample text file.' },
                                            'MyPhoto.jpg': { icon: 'fas fa-image', type: 'file', content: 'Binary data representing an image.' }
                                        }
                                    },
                                    'Downloads': { icon: 'fas fa-folder', type: 'folder', content: {} },
                                    'Music': { icon: 'fas fa-folder', type: 'folder', content: {} },
                                    'Pictures': { icon: 'fas fa-folder', type: 'folder', content: {} },
                                    'Videos': { icon: 'fas fa-folder', type: 'folder', content: {} }
                                }
                            }
                        }
                    },
                    'Windows': { icon: 'fab fa-windows', type: 'folder', content: {} }
                }
            },
            'Local Disk (D:)': { icon: 'fas fa-hdd', type: 'drive', content: {} },
            'Network Drive (Z:)': { icon: 'fas fa-network-wired', type: 'drive', content: {} },
        }
    }),
    currentPath: 'This PC',

    saveStructure: function () {
        saveToLocalStorage('fileSystemStructure', this.structure);
    },

    getDirectory: function (path) {
        let parts = path.split('/').filter(p => p !== '');
        let current = this.structure;
        let currentPathAcc = [];

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            // Handle 'This PC' as root special case, then drill down into its content
            if (i === 0 && part === 'This PC') {
                current = current['This PC'];
                if (!current) return null; // Should not happen if base structure is correct
                currentPathAcc.push(part);
                if (current.content) { // Move into the content of 'This PC'
                    current = current.content;
                } else {
                    return null; // 'This PC' should have content
                }
                continue;
            }

            // Normal folder/drive navigation
            if (current[part] && typeof current[part] === 'object') {
                currentPathAcc.push(part);
                if (current[part].content) {
                    current = current[part].content;
                } else { // This is a file or empty folder
                    return current[part];
                }
            } else {
                return null; // Path not found or not a directory
            }
        }
        return current; // Returns the content object of the directory
    },

    // Get the actual item (folder/file object) at a path
    getItem: function (path) {
        let parts = path.split('/').filter(p => p !== '');
        let current = this.structure;
        let item = null;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === 0 && part === 'This PC') {
                item = current['This PC'];
                if (!item) return null;
                current = item.content; // Move into 'This PC's content
                continue;
            }
            if (current[part]) {
                item = current[part];
                if (item.content) { // If it has content, it's a directory
                    current = item.content;
                } else { // It's a file or a leaf folder without 'content' property
                    return item;
                }
            } else {
                return null; // Item not found
            }
        }
        return item; // Returns the actual folder/drive object or its content if it's the target directory
    },

    renderFileExplorer: function (targetPath) {
        if (targetPath) {
            this.currentPath = targetPath;
        }

        const currentDirContent = this.getDirectory(this.currentPath);
        const parentPath = this.currentPath.split('/').slice(0, -1).join('/'); // Get parent path

        let html = `
            <div class="fe-toolbar">
                <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="fileSystemApp.goBack()">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <input type="text" class="fe-path-input" value="${this.currentPath}" readonly>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm" onclick="fileSystemApp.createItemPrompt('folder')">
                    <i class="fas fa-folder-plus mr-1"></i> New Folder
                </button>
                 <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm" onclick="fileSystemApp.createItemPrompt('file')">
                    <i class="fas fa-file-medical mr-1"></i> New File
                </button>
            </div>
            <div class="fe-content">
                <div class="fe-sidebar">
                    <h4 class="text-gray-400 text-xs mb-2 uppercase">Drives and Folders</h4>
                    <ul class="space-y-1">
                        <li class="fe-sidebar-item ${this.currentPath === 'This PC' ? 'active' : ''}" onclick="window.fileSystemApp.renderFileExplorer('This PC')">
                            <i class="fas fa-desktop mr-2"></i> This PC
                        </li>
                        <li class="fe-sidebar-item ${this.currentPath.startsWith('This PC/Local Disk (C:)') ? 'active' : ''}" onclick="window.fileSystemApp.renderFileExplorer('This PC/Local Disk (C:)')">
                            <i class="fas fa-hdd mr-2"></i> Local Disk (C:)
                        </li>
                        <li class="fe-sidebar-item ${this.currentPath.startsWith('This PC/Local Disk (D:)') ? 'active' : ''}" onclick="window.fileSystemApp.renderFileExplorer('This PC/Local Disk (D:)')">
                            <i class="fas fa-hdd mr-2"></i> Local Disk (D:)
                        </li>
                        <li class="fe-sidebar-item ${this.currentPath.startsWith('This PC/Users/User/Documents') ? 'active' : ''}" onclick="window.fileSystemApp.renderFileExplorer('This PC/Users/User/Documents')">
                            <i class="fas fa-file-word mr-2"></i> Documents
                        </li>
                        <li class="fe-sidebar-item ${this.currentPath.startsWith('This PC/Users/User/Downloads') ? 'active' : ''}" onclick="window.fileSystemApp.renderFileExplorer('This PC/Users/User/Downloads')">
                            <i class="fas fa-download mr-2"></i> Downloads
                        </li>
                    </ul>
                </div>
                <div class="fe-main">`;

        if (!currentDirContent || typeof currentDirContent !== 'object' || currentDirContent.type === 'file') {
            html += `<div class="text-center w-full mt-8 text-gray-400">
                         <i class="fas fa-exclamation-circle text-5xl mb-4"></i>
                         <p>Cannot display content. This might be a file or an invalid path.</p>
                       </div>`;
        } else {
            const items = Object.entries(currentDirContent).sort(([nameA, itemA], [nameB, itemB]) => {
                // Sort directories first, then files, then alphabetically
                const isDirA = itemA.type === 'folder' || itemA.type === 'drive' || itemA.type === 'app-folder';
                const isDirB = itemB.type === 'folder' || itemB.type === 'drive' || itemB.type === 'app-folder';
                if (isDirA && !isDirB) return -1;
                if (!isDirA && isDirB) return 1;
                return nameA.localeCompare(nameB);
            });

            if (items.length === 0) {
                html += `<div class="text-center w-full mt-8 text-gray-400">
                             <i class="fas fa-folder-open text-5xl mb-4"></i>
                             <p>This folder is empty.</p>
                           </div>`;
            } else {
                items.forEach(([name, item]) => {
                    const fullPath = `${this.currentPath}/${name}`;
                    let iconClass = item.icon || (item.type === 'folder' || item.type === 'drive' || item.type === 'app-folder' ? 'fas fa-folder' : 'fas fa-file');
                    let clickAction = '';

                    if (item.type === 'folder' || item.type === 'drive' || item.type === 'app-folder') {
                        clickAction = `window.fileSystemApp.renderFileExplorer('${fullPath}')`;
                    } else if (item.type === 'file') {
                        clickAction = `window.fileSystemApp.openFile('${fullPath}')`;
                    }

                    html += `
                        <div class="fe-item" ondblclick="${clickAction}" oncontextmenu="event.preventDefault(); fileSystemApp.showContextMenu(event, '${fullPath}', '${item.type}')">
                            <i class="${iconClass} ${item.type === 'drive' ? 'text-blue-400' : (item.type === 'folder' ? 'text-yellow-400' : 'text-gray-400')}"></i>
                            <p>${name}</p>
                        </div>
                    `;
                });
            }
        }
        html += `</div></div>`;
        return html;
    },

    goBack: function () {
        const pathParts = this.currentPath.split('/');
        if (pathParts.length > 1) {
            pathParts.pop(); // Remove current directory
            this.currentPath = pathParts.join('/');
            if (this.currentPath === 'This PC') { // Special case for going back from a drive/folder under This PC
                this.currentPath = 'This PC'; // Ensure it goes to the 'This PC' root
            } else if (this.currentPath === '') { // If we go beyond 'This PC' (e.g., from 'This PC')
                this.currentPath = 'This PC'; // Stay at 'This PC' root
            }
            // Update the window content
            const feWindow = document.querySelector('#window_thispc .window-body');
            if (feWindow) {
                feWindow.innerHTML = this.renderFileExplorer();
            }
        }
    },

    openFile: function (filePath) {
        const file = this.getItem(filePath);
        if (file && file.type === 'file') {
            alert(`Opening file: ${filePath}\n\nContent:\n${file.content}`);
        } else {
            alert(`Could not open ${filePath}. It's not a file.`);
        }
    },

    createItemPrompt: function (type) {
        const name = prompt(`Enter name for new ${type}:`);
        if (name) {
            this.createItem(name, type);
        }
    },

    createItem: function (name, type) {
        const currentDir = this.getDirectory(this.currentPath);
        if (currentDir && !currentDir[name]) {
            if (type === 'folder') {
                currentDir[name] = { icon: 'fas fa-folder', type: 'folder', content: {} };
            } else if (type === 'file') {
                currentDir[name] = { icon: 'fas fa-file', type: 'file', content: '' };
            }
            this.saveStructure();
            const feWindow = document.querySelector('#window_thispc .window-body');
            if (feWindow) {
                feWindow.innerHTML = this.renderFileExplorer();
            }
            alert(`${name} created successfully!`);
        } else {
            alert(`Error: A ${type} with that name already exists or path is invalid.`);
        }
    },

    deleteItem: function (path) {
        if (!confirm(`Are you sure you want to delete ${path}? This cannot be undone.`)) return;

        const pathParts = path.split('/');
        const itemName = pathParts.pop(); // Get item name
        const parentPath = pathParts.join('/'); // Get parent path
        let parentDir = this.getDirectory(parentPath);

        if (parentPath === 'This PC') { // Special handling for items directly under 'This PC'
            parentDir = this.structure['This PC'].content;
        }

        if (parentDir && parentDir[itemName]) {
            // Add to Recycle Bin before deleting
            window.recycleBinApp.addItem({
                id: generateUniqueId(),
                name: itemName,
                originalPath: path,
                type: parentDir[itemName].type,
                icon: parentDir[itemName].icon
            });
            delete parentDir[itemName];
            this.saveStructure();
            const feWindow = document.querySelector('#window_thispc .window-body');
            if (feWindow) {
                feWindow.innerHTML = this.renderFileExplorer();
            }
            alert(`${itemName} moved to Recycle Bin.`);
        } else {
            alert(`Error: Could not find ${itemName} to delete.`);
        }
    },

    renameItem: function (path, newName) {
        const pathParts = path.split('/');
        const oldName = pathParts.pop();
        const parentPath = pathParts.join('/');
        let parentDir = this.getDirectory(parentPath);

        if (parentPath === 'This PC') {
            parentDir = this.structure['This PC'].content;
        }

        if (parentDir && parentDir[oldName] && !parentDir[newName]) {
            parentDir[newName] = parentDir[oldName];
            delete parentDir[oldName];
            this.saveStructure();
            const feWindow = document.querySelector('#window_thispc .window-body');
            if (feWindow) {
                feWindow.innerHTML = this.renderFileExplorer();
            }
            alert(`Renamed ${oldName} to ${newName}.`);
        } else {
            alert(`Error renaming item. Either item not found or new name already exists.`);
        }
    },

    showContextMenu: function (event, path, type) {
        const existingMenu = document.getElementById('feContextMenu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement('div');
        menu.id = 'feContextMenu';
        menu.className = 'absolute bg-gray-700 text-white rounded-md shadow-lg py-1 z-50 text-sm';
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;
        menu.style.minWidth = '120px';

        let menuHtml = '';
        if (type === 'folder' || type === 'drive') {
            menuHtml += `<div class="px-3 py-1 hover:bg-blue-600 cursor-pointer" onclick="fileSystemApp.renderFileExplorer('${path}'); document.getElementById('feContextMenu').remove();">Open</div>`;
            menuHtml += `<div class="px-3 py-1 hover:bg-blue-600 cursor-pointer" onclick="fileSystemApp.createItemPrompt('folder'); document.getElementById('feContextMenu').remove();">New Folder</div>`;
            menuHtml += `<div class="px-3 py-1 hover:bg-blue-600 cursor-pointer" onclick="fileSystemApp.createItemPrompt('file'); document.getElementById('feContextMenu').remove();">New File</div>`;
            menuHtml += `<div class="px-3 py-1 hover:bg-blue-600 cursor-pointer" onclick="const newName = prompt('Enter new name for ${path.split('/').pop()}'); if(newName) fileSystemApp.renameItem('${path}', newName); document.getElementById('feContextMenu').remove();">Rename</div>`;
            if (path !== 'This PC' && !path.includes('Local Disk')) { // Prevent deleting drives or This PC
                menuHtml += `<div class="px-3 py-1 hover:bg-red-600 cursor-pointer" onclick="fileSystemApp.deleteItem('${path}'); document.getElementById('feContextMenu').remove();">Delete</div>`;
            }
        } else if (type === 'file') {
            menuHtml += `<div class="px-3 py-1 hover:bg-blue-600 cursor-pointer" onclick="fileSystemApp.openFile('${path}'); document.getElementById('feContextMenu').remove();">Open</div>`;
            menuHtml += `<div class="px-3 py-1 hover:bg-blue-600 cursor-pointer" onclick="const newName = prompt('Enter new name for ${path.split('/').pop()}'); if(newName) fileSystemApp.renameItem('${path}', newName); document.getElementById('feContextMenu').remove();">Rename</div>`;
            menuHtml += `<div class="px-3 py-1 hover:bg-red-600 cursor-pointer" onclick="fileSystemApp.deleteItem('${path}'); document.getElementById('feContextMenu').remove();">Delete</div>`;
        }

        menu.innerHTML = menuHtml;
        document.body.appendChild(menu);

        const clickListener = (e) => {
            if (!menu.contains(e.target) && e.button !== 2) { // Close if clicked outside or left-clicked
                menu.remove();
                document.removeEventListener('click', clickListener);
                document.removeEventListener('contextmenu', clickListener); // Remove if right-clicked outside
            }
        };
        document.addEventListener('click', clickListener);
        document.addEventListener('contextmenu', clickListener); // To close if another right-click happens
    }
};

// --- Notes App ---
window.notesApp = {
    notes: loadFromLocalStorage('notesApp_notes', []),
    currentNoteId: null,

    saveNotes: function () {
        saveToLocalStorage('notesApp_notes', this.notes);
        this.renderNotesList();
    },

    renderNotesApp: function () {
        const appContent = `
            <div class="notes-app">
                <div class="notes-list">
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-3 text-sm" onclick="notesApp.createNewNote()">
                        <i class="fas fa-plus mr-1"></i> New Note
                    </button>
                    <div id="notes-list-container" class="space-y-1">
                        </div>
                </div>
                <div class="notes-editor">
                    <input type="text" id="note-title" placeholder="Note Title" class="font-bold">
                    <textarea id="note-content" placeholder="Start typing your notes here..." class="flex-grow"></textarea>
                    <div class="notes-editor-actions">
                        <button id="notes-save-btn" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded hidden" onclick="notesApp.saveCurrentNote()">Save</button>
                        <button id="notes-delete-btn" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded hidden" onclick="notesApp.deleteCurrentNote()">Delete</button>
                    </div>
                </div>
            </div>
        `;
        return appContent;
    },

    renderNotesList: function () {
        const listContainer = document.getElementById('notes-list-container');
        if (!listContainer) return;

        listContainer.innerHTML = '';
        if (this.notes.length === 0) {
            listContainer.innerHTML = '<p class="text-gray-400 text-center text-sm mt-4">No notes yet.<br>Click "New Note" to add one.</p>';
            this.clearEditor();
            return;
        }

        this.notes.forEach(note => {
            const div = document.createElement('div');
            div.className = `notes-list-item ${this.currentNoteId === note.id ? 'active' : ''}`;
            div.innerHTML = `<h4 class="font-semibold text-sm">${note.title || 'Untitled Note'}</h4><p class="text-xs text-gray-400">${note.content.substring(0, 30)}...</p>`;
            div.onclick = () => this.loadNote(note.id);
            listContainer.appendChild(div);
        });

        // Ensure the current note is loaded if there is one and it still exists
        if (this.currentNoteId && !this.notes.some(n => n.id === this.currentNoteId)) {
            this.currentNoteId = null; // Reset if current note was deleted
            this.clearEditor();
        } else if (this.currentNoteId) {
            this.loadNote(this.currentNoteId);
        } else if (this.notes.length > 0) { // Load the first note if none is selected
            this.loadNote(this.notes[0].id);
        } else {
            this.clearEditor();
        }
    },

    createNewNote: function () {
        const newNote = {
            id: generateUniqueId(),
            title: '',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.notes.unshift(newNote); // Add to the beginning
        this.saveNotes();
        this.loadNote(newNote.id);
        document.getElementById('note-title').focus();
    },

    loadNote: function (id) {
        const note = this.notes.find(n => n.id === id);
        if (note) {
            this.currentNoteId = id;
            document.getElementById('note-title').value = note.title;
            document.getElementById('note-content').value = note.content;
            document.getElementById('notes-save-btn').classList.remove('hidden');
            document.getElementById('notes-delete-btn').classList.remove('hidden');
            this.renderNotesList(); // Update active state
        } else {
            this.clearEditor();
        }
    },

    saveCurrentNote: function () {
        const titleInput = document.getElementById('note-title');
        const contentInput = document.getElementById('note-content');
        if (!titleInput || !contentInput) return;

        const noteIndex = this.notes.findIndex(n => n.id === this.currentNoteId);
        if (noteIndex !== -1) {
            this.notes[noteIndex].title = titleInput.value;
            this.notes[noteIndex].content = contentInput.value;
            this.notes[noteIndex].updatedAt = new Date().toISOString();
            this.saveNotes();
            alert('Note saved!');
        }
    },

    deleteCurrentNote: function () {
        if (this.currentNoteId && confirm('Are you sure you want to delete this note?')) {
            this.notes = this.notes.filter(n => n.id !== this.currentNoteId);
            this.currentNoteId = null;
            this.saveNotes();
            this.clearEditor();
            alert('Note deleted!');
        }
    },

    clearEditor: function () {
        const titleInput = document.getElementById('note-title');
        const contentInput = document.getElementById('note-content');
        const saveBtn = document.getElementById('notes-save-btn');
        const deleteBtn = document.getElementById('notes-delete-btn');

        if (titleInput) titleInput.value = '';
        if (contentInput) contentInput.value = '';
        if (saveBtn) saveBtn.classList.add('hidden');
        if (deleteBtn) deleteBtn.classList.add('hidden');
        this.currentNoteId = null;
    }
};


// --- Chrome App ---
window.chromeApp = {
    history: loadFromLocalStorage('chromeApp_history', []),
    bookmarks: loadFromLocalStorage('chromeApp_bookmarks', []),
    currentUrl: 'about:blank',

    saveData: function () {
        saveToLocalStorage('chromeApp_history', this.history);
        saveToLocalStorage('chromeApp_bookmarks', this.bookmarks);
    },

    renderChromeApp: function () {
        const appContent = `
            <div class="browser-window">
                <div class="browser-toolbar">
                    <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="chromeApp.goBackHistory()"><i class="fas fa-arrow-left"></i></button>
                    <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="chromeApp.goForwardHistory()"><i class="fas fa-arrow-right"></i></button>
                    <input type="text" id="browser-url-input" class="flex-1 bg-gray-600 text-white p-1 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                            value="https://www.google.com" placeholder="Enter URL..." onkeydown="if(event.key === 'Enter') chromeApp.loadUrl(this.value)">
                    <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition duration-200" onclick="chromeApp.loadUrl(document.getElementById('browser-url-input').value)">Go</button>
                    <button class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded transition duration-200" onclick="chromeApp.toggleBookmarksPanel()">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded transition duration-200" onclick="chromeApp.toggleHistoryPanel()">
                        <i class="fas fa-history"></i>
                    </button>
                </div>
                <iframe id="browser-iframe" src="about:blank" class="browser-content"></iframe>
                <div class="browser-footer">
                    <span id="browser-status">Ready.</span>
                </div>

                <div id="bookmarks-panel" class="absolute right-0 top-0 bottom-0 w-64 bg-gray-700 border-l border-gray-600 transform translate-x-full transition-transform duration-300 ease-in-out z-10 p-3 flex flex-col">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="font-bold text-lg">Bookmarks</h3>
                        <button class="text-gray-300 hover:text-white" onclick="chromeApp.toggleBookmarksPanel()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="mb-3">
                         <input type="text" id="bookmark-name-input" class="w-full bg-gray-600 text-white p-1 rounded mb-2" placeholder="Bookmark Name">
                         <input type="text" id="bookmark-url-input" class="w-full bg-gray-600 text-white p-1 rounded mb-2" placeholder="Bookmark URL">
                         <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded" onclick="chromeApp.addBookmark()">Add Bookmark</button>
                    </div>
                    <div id="bookmarks-list" class="flex-grow overflow-y-auto space-y-2"></div>
                </div>

                <div id="history-panel" class="absolute right-0 top-0 bottom-0 w-64 bg-gray-700 border-l border-gray-600 transform translate-x-full transition-transform duration-300 ease-in-out z-10 p-3 flex flex-col">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="font-bold text-lg">History</h3>
                        <button class="text-gray-300 hover:text-white" onclick="chromeApp.toggleHistoryPanel()"><i class="fas fa-times"></i></button>
                    </div>
                    <div id="history-list" class="flex-grow overflow-y-auto space-y-2"></div>
                    <button class="mt-4 bg-red-600 hover:bg-red-700 text-white py-1 rounded" onclick="chromeApp.clearHistory()">Clear History</button>
                </div>
            </div>
        `;
        return appContent;
    },

    initChromeApp: function () {
        this.renderBookmarksList();
        this.renderHistoryList();
    },

    loadUrl: function (url) {
        const iframe = document.getElementById('browser-iframe');
        const urlInput = document.getElementById('browser-url-input');
        const statusSpan = document.getElementById('browser-status');

        if (!iframe || !urlInput || !statusSpan) return;

        let formattedUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            formattedUrl = 'https://' + url; // Default to https
        }

        try {
            // This is still a simulation. Real Browse is blocked by CORS/security for local files.
            iframe.src = formattedUrl;
            urlInput.value = formattedUrl; // Update input field
            statusSpan.textContent = `Loading ${formattedUrl}...`;
            this.currentUrl = formattedUrl; // Update current URL

            // Add to history
            this.addToHistory(formattedUrl);

            // Simulate load completion
            iframe.onload = () => {
                statusSpan.textContent = `Loaded ${formattedUrl}`;
            };
            iframe.onerror = () => {
                statusSpan.textContent = `Error loading ${formattedUrl}`;
            };

        } catch (e) {
            console.error("Invalid URL:", e);
            iframe.src = "about:blank";
            statusSpan.textContent = `Error: Could not load ${url}.`;
            iframe.contentDocument.write(`<div class="p-4 text-red-500">Could not load ${url}. Invalid or blocked URL for security reasons.</div>`);
        }
    },

    addToHistory: function (url) {
        // Prevent duplicate consecutive entries
        if (this.history.length > 0 && this.history[0].url === url) return;

        this.history.unshift({ id: generateUniqueId(), url: url, time: new Date().toLocaleString() });
        this.history = this.history.slice(0, 50); // Keep history to last 50 entries
        this.saveData();
        this.renderHistoryList();
    },

    renderHistoryList: function () {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;
        historyList.innerHTML = '';
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="text-gray-400 text-center text-sm mt-4">No history yet.</p>';
            return;
        }
        this.history.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'bg-gray-600 p-2 rounded text-xs truncate hover:bg-gray-500 cursor-pointer';
            div.innerHTML = `<p class="font-semibold">${entry.url}</p><p class="text-gray-400">${entry.time}</p>`;
            div.onclick = () => {
                this.loadUrl(entry.url);
                this.toggleHistoryPanel();
            };
            historyList.appendChild(div);
        });
    },

    clearHistory: function () {
        if (confirm('Are you sure you want to clear all Browse history?')) {
            this.history = [];
            this.saveData();
            this.renderHistoryList();
            alert('History cleared!');
        }
    },

    goBackHistory: function () {
        // This is a simplified history navigation, not a full browser stack
        const currentUrlIndex = this.history.findIndex(entry => entry.url === this.currentUrl);
        if (currentUrlIndex > 0) {
            this.loadUrl(this.history[currentUrlIndex - 1].url);
        } else {
            alert('No previous page in history.');
        }
    },

    goForwardHistory: function () {
        const currentUrlIndex = this.history.findIndex(entry => entry.url === this.currentUrl);
        if (currentUrlIndex < this.history.length - 1) {
            this.loadUrl(this.history[currentUrlIndex + 1].url);
        } else {
            alert('No next page in history.');
        }
    },

    toggleBookmarksPanel: function () {
        const panel = document.getElementById('bookmarks-panel');
        if (panel) {
            panel.classList.toggle('translate-x-full');
            if (!panel.classList.contains('translate-x-full')) {
                this.renderBookmarksList(); // Refresh when opening
            }
        }
    },

    addBookmark: function () {
        const nameInput = document.getElementById('bookmark-name-input');
        const urlInput = document.getElementById('bookmark-url-input');
        if (!nameInput || !urlInput) return;

        const name = nameInput.value.trim();
        let url = urlInput.value.trim();

        if (name && url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            this.bookmarks.push({ id: generateUniqueId(), name: name, url: url });
            this.saveData();
            nameInput.value = '';
            urlInput.value = '';
            this.renderBookmarksList();
            alert('Bookmark added!');
        } else {
            alert('Please enter both name and URL for the bookmark.');
        }
    },

    renderBookmarksList: function () {
        const bookmarksList = document.getElementById('bookmarks-list');
        if (!bookmarksList) return;
        bookmarksList.innerHTML = '';
        if (this.bookmarks.length === 0) {
            bookmarksList.innerHTML = '<p class="text-gray-400 text-center text-sm mt-4">No bookmarks yet.</p>';
            return;
        }
        this.bookmarks.forEach(bookmark => {
            const div = document.createElement('div');
            div.className = 'bg-gray-600 p-2 rounded text-xs truncate flex justify-between items-center';
            div.innerHTML = `
                <span class="cursor-pointer hover:underline" onclick="chromeApp.loadUrl('${bookmark.url}'); chromeApp.toggleBookmarksPanel();">${bookmark.name}</span>
                <button class="text-red-400 hover:text-red-500 ml-2" onclick="chromeApp.deleteBookmark('${bookmark.id}')"><i class="fas fa-trash-alt"></i></button>
            `;
            bookmarksList.appendChild(div);
        });
    },

    deleteBookmark: function (id) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            this.bookmarks = this.bookmarks.filter(b => b.id !== id);
            this.saveData();
            this.renderBookmarksList();
            alert('Bookmark deleted!');
        }
    }
};

// --- Recycle Bin App ---
window.recycleBinApp = {
    items: loadFromLocalStorage('recycleBinApp_items', []),

    saveItems: function () {
        saveToLocalStorage('recycleBinApp_items', this.items);
        this.renderRecycleBin();
    },

    addItem: function (item) {
        this.items.unshift(item); // Add to the beginning
        this.saveItems();
    },

    renderRecycleBin: function () {
        const appContent = `
            <div class="recycle-bin-content">
                <div class="recycle-bin-items" id="recycle-bin-list">
                    </div>
                <div class="recycle-bin-actions">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onclick="recycleBinApp.restoreSelected()">
                        <i class="fas fa-undo mr-2"></i> Restore Selected
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onclick="recycleBinApp.deleteSelected()">
                        <i class="fas fa-trash-alt mr-2"></i> Delete Selected
                    </button>
                    <button class="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded" onclick="recycleBinApp.emptyBin()">
                        <i class="fas fa-empty-set mr-2"></i> Empty Recycle Bin
                    </button>
                </div>
            </div>
        `;
        return appContent;
    },

    updateRecycleBinList: function () {
        const listContainer = document.getElementById('recycle-bin-list');
        if (!listContainer) return;
        listContainer.innerHTML = '';

        if (this.items.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center flex flex-col items-center justify-center h-full p-4">
                    <i class="fas fa-trash-alt text-6xl text-gray-500 mb-4"></i>
                    <p class="text-xl text-gray-400">Recycle Bin is empty</p>
                </div>
            `;
            return;
        }

        this.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'recycle-bin-item';
            div.innerHTML = `
                <input type="checkbox" data-item-id="${item.id}" class="mr-3">
                <i class="${item.icon || 'fas fa-file'} mr-2 text-gray-400"></i>
                <span>${item.name} <span class="text-gray-400 text-xs">(${item.originalPath})</span></span>
            `;
            listContainer.appendChild(div);
        });
    },

    getSelectedItems: function () {
        const checkboxes = document.querySelectorAll('#recycle-bin-list input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => this.items.find(item => item.id === cb.dataset.itemId));
    },

    restoreSelected: function () {
        const selected = this.getSelectedItems();
        if (selected.length === 0) {
            alert('No items selected to restore.');
            return;
        }

        selected.forEach(item => {
            // Simulate restoring to original path (simplified)
            // In a real OS, you'd move the data back. Here, we just remove from bin.
            // For file system, we would need to re-add the item to its original location
            // This simulation doesn't track file content for restoration, just metadata
            alert(`Simulating restore of: ${item.name} to ${item.originalPath}`);
        });
        this.items = this.items.filter(item => !selected.includes(item));
        this.saveItems();
        alert(`${selected.length} item(s) restored.`);
    },

    deleteSelected: function () {
        const selected = this.getSelectedItems();
        if (selected.length === 0) {
            alert('No items selected to delete.');
            return;
        }
        if (!confirm(`Are you sure you want to permanently delete ${selected.length} item(s)? This cannot be undone.`)) return;

        this.items = this.items.filter(item => !selected.includes(item));
        this.saveItems();
        alert(`${selected.length} item(s) permanently deleted.`);
    },

    emptyBin: function () {
        if (this.items.length === 0) {
            alert('Recycle Bin is already empty.');
            return;
        }
        if (!confirm('Are you sure you want to permanently empty the Recycle Bin? All items will be lost.')) return;

        this.items = [];
        this.saveItems();
        alert('Recycle Bin emptied!');
    }
};