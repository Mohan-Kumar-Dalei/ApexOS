// js/windows.js

window.windowManager = {
    zIndex: 10,
    activeWindow: null,
    openedWindowInstances: {}, // Stores references to window elements

    createWindow: function (title, content, width = '700px', height = '500px', id) {
        if (!id) id = generateUniqueId(); // Use utility function
        const existingWindow = document.getElementById(id);

        if (existingWindow) {
            this.focusWindow(existingWindow);
            return existingWindow;
        }

        const desktop = document.body;
        const win = document.createElement('div');
        win.id = id;
        win.className = 'window';
        win.style.width = width;
        win.style.height = height;

        // Position new windows slightly offset from each other
        const offset = Object.keys(this.openedWindowInstances).length * 20;
        win.style.top = `${100 + offset}px`;
        win.style.left = `${100 + offset}px`;

        win.style.zIndex = this.zIndex++;

        win.innerHTML = `
            <div class="window-header">
                <span class="text-sm font-semibold">${title}</span>
                <div class="window-controls">
                    <button class="minimize-btn" title="Minimize"><i class="fas fa-minus"></i></button>
                    <button class="maximize-btn" title="Maximize"><i class="far fa-square"></i></button>
                    <button class="close-btn" title="Close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="window-body"></div>
        `;
        desktop.appendChild(win);

        // Append content to window-body, not innerHTML of win
        win.querySelector('.window-body').innerHTML = content;

        this.openedWindowInstances[id] = win;
        this.makeDraggable(win);
        this.attachWindowControls(win);
        this.focusWindow(win);

        // GSAP animation for opening
        gsap.fromTo(win,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.2)" }
        );

        return win;
    },

    makeDraggable: function (element) {
        const header = element.querySelector('.window-header');
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            // Only drag if left mouse button is pressed and not on control buttons
            if (e.button === 0 && !e.target.closest('.window-controls')) {
                isDragging = true;
                offsetX = e.clientX - element.getBoundingClientRect().left;
                offsetY = e.clientY - element.getBoundingClientRect().top;
                element.style.cursor = 'grabbing';
                element.style.userSelect = 'none';
                element.style.transition = 'none'; // Disable transition during drag
                this.focusWindow(element);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            e.preventDefault(); // Prevent selection
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Constrain to viewport (optional, but good practice)
            const minX = 0;
            const minY = 0;
            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight - document.getElementById('taskbar').offsetHeight; // Account for taskbar

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'grab';
                element.style.userSelect = 'auto';
                element.style.transition = ''; // Re-enable transition after drag
            }
        });
    },

    attachWindowControls: function (win) {
        const minimizeBtn = win.querySelector('.minimize-btn');
        const maximizeBtn = win.querySelector('.maximize-btn');
        const closeBtn = win.querySelector('.close-btn');

        minimizeBtn.addEventListener('click', () => {
            gsap.to(win, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                onComplete: () => {
                    win.style.display = 'none';
                    window.taskbarManager.deactivateTaskbarApp(win.id);
                }
            });
            if (this.activeWindow === win) {
                this.activeWindow = null;
            }
        });

        maximizeBtn.addEventListener('click', () => {
            if (win.dataset.maximized === 'true') {
                // Restore original size and position
                gsap.to(win, {
                    width: win.dataset.originalWidth,
                    height: win.dataset.originalHeight,
                    top: win.dataset.originalTop,
                    left: win.dataset.originalLeft,
                    borderRadius: '0.5rem',
                    duration: 0.3,
                    ease: "power2.out"
                });
                win.dataset.maximized = 'false';
                maximizeBtn.innerHTML = '<i class="far fa-square"></i>';
            } else {
                // Save original size and position
                win.dataset.originalWidth = win.style.width;
                win.dataset.originalHeight = win.style.height;
                win.dataset.originalTop = win.style.top;
                win.dataset.originalLeft = win.style.left;

                // Maximize
                gsap.to(win, {
                    width: '100vw',
                    height: `calc(100vh - ${document.getElementById('taskbar').offsetHeight}px)`,
                    top: '0',
                    left: '0',
                    borderRadius: '0',
                    duration: 0.3,
                    ease: "power2.out"
                });
                win.dataset.maximized = 'true';
                maximizeBtn.innerHTML = '<i class="fas fa-compress-alt"></i>';
            }
        });

        closeBtn.addEventListener('click', () => {
            gsap.to(win, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                onComplete: () => {
                    win.remove();
                    window.taskbarManager.removeTaskbarApp(win.id);
                    delete this.openedWindowInstances[win.id];
                    if (this.activeWindow === win) {
                        this.activeWindow = null;
                    }
                }
            });
        });

        // Bring to front on click
        win.addEventListener('mousedown', () => this.focusWindow(win));
    },

    focusWindow: function (win) {
        if (this.activeWindow && this.activeWindow !== win) {
            this.activeWindow.style.zIndex = this.activeWindow.dataset.previousZIndex || (this.zIndex - 1);
            window.taskbarManager.deactivateTaskbarApp(this.activeWindow.id);
        }
        win.style.zIndex = this.zIndex++;
        win.dataset.previousZIndex = win.style.zIndex;
        this.activeWindow = win;
        window.taskbarManager.activateTaskbarApp(win.id);
    },

    toggleWindowVisibility: function (id) {
        const win = document.getElementById(id);
        if (win) {
            if (win.style.display === 'none') {
                gsap.fromTo(win, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.2, onComplete: () => win.style.display = 'flex' });
                this.focusWindow(win);
            } else {
                gsap.to(win, { opacity: 0, scale: 0.9, duration: 0.2, onComplete: () => win.style.display = 'none' });
                window.taskbarManager.deactivateTaskbarApp(id);
                if (this.activeWindow === win) {
                    this.activeWindow = null;
                }
            }
        }
    }
};

window.taskbarManager = {
    taskbarAppsContainer: document.getElementById('taskbar-apps'),
    openedTaskbarButtons: {},

    addTaskbarApp: function (id, title, iconClass) {
        if (this.openedTaskbarButtons[id]) {
            this.activateTaskbarApp(id);
            return;
        }

        const btn = document.createElement('button');
        btn.className = 'taskbar-app-btn flex flex-col items-center px-3 py-1 hover:bg-white/10 rounded transition duration-200 relative group';
        btn.dataset.windowId = id;
        btn.innerHTML = `<i class="${iconClass} text-2xl"></i>
                         <span class="text-xs mt-1 absolute -top-6 bg-gray-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">${title}</span>`;
        btn.onclick = () => {
            window.windowManager.toggleWindowVisibility(id);
        };
        this.taskbarAppsContainer.appendChild(btn);
        this.openedTaskbarButtons[id] = btn;
        this.activateTaskbarApp(id); // Activate on creation
    },

    removeTaskbarApp: function (id) {
        if (this.openedTaskbarButtons[id]) {
            this.openedTaskbarButtons[id].remove();
            delete this.openedTaskbarButtons[id];
        }
    },

    activateTaskbarApp: function (id) {
        Object.values(this.openedTaskbarButtons).forEach(btn => btn.classList.remove('active'));
        const btn = this.openedTaskbarButtons[id];
        if (btn) btn.classList.add('active');
    },

    deactivateTaskbarApp: function (id) {
        const btn = this.openedTaskbarButtons[id];
        if (btn) btn.classList.remove('active');
    }
};