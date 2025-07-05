// --- Quick Settings Panel Logic ---
window.toggleQuickSettings = function (btn, type) {
    const panel = document.getElementById("quick-settings-panel");
    if (!panel) return;

    // Music playlist global for this function scope
    const localSongs = [
        { title: "Asal Mein - Darshan Raval", file: "assets/music/Asal Mein - Darshan Raval.m4a" },
        { title: "Baarish Lete Aana - Darshan Raval", file: "assets/music/Baarish Lete Aana - Darshan Raval.m4a" },
        { title: "Baarishon Mein - Darshan Raval", file: "assets/music/Baarishon Mein - Darshan Raval.m4a" },
        { title: "Bekhudi - Darshan Raval, Aditi Singh Sharma, Himesh Reshammiya", file: "assets/music/Bekhudi - Darshan Raval, Aditi Singh Sharma, Himesh Reshammiya.m4a" },
        { title: "Bhula Diya - Darshan Raval", file: "assets/music/Bhula Diya - Darshan Raval.m4a" },
        { title: "Bhula Dunga - Darshan Raval", file: "assets/music/Bhula Dunga - Darshan Raval.m4a" },
        { title: "Chogada - Darshan Raval, Asees Kaur", file: "assets/music/Chogada - Darshan Raval, Asees Kaur.m4a" },
        { title: "Dhol Bajaa - Darshan Raval, Prakriti Giri, Javed-Mohsin", file: "assets/music/Dhol Bajaa - Darshan Raval, Prakriti Giri, Javed-Mohsin.m4a" },
        { title: "Do Din - Darshan Raval", file: "assets/music/Do Din - Darshan Raval.m4a" },
        { title: "Duniya Chhor Doon - Darshan Raval", file: "assets/music/Duniya Chhor Doon - Darshan Raval.m4a" },
        { title: "Ek Tarfa - Darshan Raval", file: "assets/music/Ek Tarfa - Darshan Raval.m4a" },
        { title: "Ek Tarfa - Reprise - Darshan Raval", file: "assets/music/Ek Tarfa - Reprise - Darshan Raval.m4a" },
        { title: "Goriye - Darshan Raval", file: "assets/music/Goriye - Darshan Raval.m4a" },
        { title: "Haaye Dard - Darshan Raval", file: "assets/music/Haaye Dard - Darshan Raval.m4a" },
        { title: "Hawa Banke - Darshan Raval, Simran Choudhary", file: "assets/music/Hawa Banke - Darshan Raval, Simran Choudhary.m4a" },
        { title: "Jannat Ve - Darshan Raval", file: "assets/music/Jannat Ve - Darshan Raval.m4a" },
        { title: "Judaiyaan - Darshan Raval, Shreya Ghoshal", file: "assets/music/Judaiyaan - Darshan Raval, Shreya Ghoshal.m4a" },
    ];
    // If already open and same type, close
    if (!panel.classList.contains("hidden") && panel.dataset.type === type) {
        panel.classList.add("hidden");
        panel.innerHTML = "";
        panel.dataset.type = "";
        return;
    }
    // Ensure global music audio element exists (for background play)
    let globalMusicAudio = document.getElementById('global-music-audio');
    if (!globalMusicAudio) {
        globalMusicAudio = document.createElement('audio');
        globalMusicAudio.id = 'global-music-audio';
        globalMusicAudio.style.display = 'none';
        globalMusicAudio.preload = 'auto';
        globalMusicAudio.dataset.idx = '0';
        document.body.appendChild(globalMusicAudio);
    }
    // Panel content for each type
    let content = "";
    if (type === "wifi") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fas fa-wifi text-blue-400"></i> WiFi</div>
            <div class='mb-2'>Status: <span class='text-green-400'>Connected</span></div>
            <div class='mb-2'>Network: <span class='font-semibold'>ApexOS WiFi</span></div>
            <button class='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'>Manage Networks</button>
        `;
    } else if (type === "bluetooth") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fa-brands fa-bluetooth-b text-blue-300"></i> Bluetooth</div>
            <div class='mb-2'>Status: <span class='text-green-400'>On</span></div>
            <button class='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition'>Pair Device</button>
        `;
    } else if (type === "games") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fas fa-gamepad text-pink-400"></i> Poki Games</div>
            <div class='mb-2 text-sm text-gray-200'>Enjoy free games from Poki.com right here!</div>
            <div class='w-full h-72 rounded-lg overflow-hidden border border-gray-700 bg-black'>
                <iframe src="https://poki.com" width="100%" height="100%" style="border:0; min-height:260px; min-width:100%; background:#111;" allowfullscreen loading="lazy"></iframe>
            </div>
            <div class='text-xs text-gray-400 mt-2'>Games load from poki.com. Use at your own discretion.</div>
        `;
    } else if (type === "airplane") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fas fa-plane text-yellow-400"></i> Airplane Mode</div>
            <div class='mb-2'>Status: <span class='text-red-400'>Off</span></div>
            <button class='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition'>Toggle Airplane Mode</button>
        `;
    } else if (type === "accessibility") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fas fa-wheelchair text-purple-400"></i> Accessibility</div>
            <div class='mb-2'>Screen Reader: <span class='text-green-400'>On</span></div>
            <div class='mb-2'>High Contrast: <span class='text-yellow-400'>Off</span></div>
            <button class='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition'>Accessibility Settings</button>
        `;
    } else if (type === "battery") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fas fa-battery-half text-green-400"></i> Battery Saver</div>
            <div class='mb-2'>Battery: <span class='font-semibold'>82%</span></div>
            <div class='mb-2'>Saver: <span class='text-green-400'>On</span></div>
            <button class='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition'>Battery Settings</button>
        `;
    } else if (type === "music") {
        // Modern Hinglish style music player with playlist
        // Use the global localSongs defined above, don't redeclare here!
        // Remove any previous music player if present (and clear panel first)
        panel.innerHTML = '';
        content = `
        <div class="modern-music-player">
            <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
                <div style="font-size:2.2rem;color:#b71c3c;margin-bottom:0.2rem;"><i class='fas fa-music'></i></div>
                <div id="music-current-title" style="font-weight:700;font-size:1.13rem;color:#fff;text-align:center;max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${localSongs[0].title}</div>
                <div style="font-size:0.88rem;color:#f8bbd0;letter-spacing:0.5px;">Hindi Love Playlist</div>
            </div>
            <div style="display:flex;align-items:center;gap:1.1rem;width:100%;justify-content:center;">
                <button id="music-prev-btn" style="background:linear-gradient(135deg,#6d214f 60%,#b71c3c 100%);border:none;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;box-shadow:0 2px 8px #0002;transition:background 0.2s;"><i class="fas fa-backward"></i></button>
                <button id="music-play-btn" style="background:linear-gradient(135deg,#b71c3c 60%,#6d214f 100%);border:none;border-radius:50%;width:54px;height:54px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:2rem;box-shadow:0 2px 8px #0002;transition:background 0.2s;"><i class="fas fa-play"></i></button>
                <button id="music-next-btn" style="background:linear-gradient(135deg,#6d214f 60%,#b71c3c 100%);border:none;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.2rem;box-shadow:0 2px 8px #0002;transition:background 0.2s;"><i class="fas fa-forward"></i></button>
                <input id="music-volume" type="range" min="0" max="1" step="0.01" value="1" style="margin-left:12px;width:70px;accent-color:#b71c3c;">
            </div>
            <div style="display:flex;align-items:center;gap:0.5rem;width:100%;margin-top:-0.3rem;">
                <span id="music-current-time" style="font-size:0.85rem;color:#f8bbd0;width:38px;text-align:right;">0:00</span>
                <input id="music-seek" type="range" min="0" max="100" value="0" style="flex:1;accent-color:#b71c3c;height:4px;border-radius:8px;background:#fff2;">
                <span id="music-duration" style="font-size:0.85rem;color:#f8bbd0;width:38px;text-align:left;">0:00</span>
            </div>
            <div style="width:100%;margin-top:0.2rem;">
                <div style="font-weight:600;font-size:0.97rem;color:#b71c3c;margin-bottom:0.2rem;">Playlist</div>
                <ul id="music-playlist" style="max-height:56px;overflow-y:auto;list-style:none;padding:0;margin:0;">
                    ${localSongs.map((song, i) => `<li><button class="w-full text-left px-2 py-1 rounded hover:bg-[#b71c3c22] transition truncate" style="font-size:13px;background:transparent;color:#fff;outline:none;border:none;cursor:pointer;${i === 0 ? 'font-weight:600;' : ''}" data-src="${song.file}" data-idx="${i}">${song.title}</button></li>`).join('')}
                </ul>
            </div>
            <div style="font-size:0.8rem;color:#f8bbd0;text-align:center;margin-top:0.2rem;">Sab gaane local assets/music se baj rahe hain.<br>Controls: Play/Pause, Next, Previous, Seek, Volume, Playlist.</div>
        </div>
        `;
    } else if (type === "all") {
        content = `
            <div class='font-bold text-lg mb-2 flex items-center gap-2'><i class="fas fa-cog text-gray-300"></i> Quick Settings</div>
            <div class='grid grid-cols-2 gap-3 mb-2'>
                <button onclick="toggleQuickSettings(this, 'wifi')" class='bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded flex flex-col items-center'><i class="fas fa-wifi"></i><span class='text-xs mt-1'>WiFi</span></button>
                <button onclick="toggleQuickSettings(this, 'bluetooth')" class='bg-blue-400 hover:bg-blue-500 text-white px-2 py-2 rounded flex flex-col items-center'><i class="fa-brands fa-bluetooth-b"></i><span class='text-xs mt-1'>Bluetooth</span></button>
                <button onclick="toggleQuickSettings(this, 'airplane')" class='bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-2 rounded flex flex-col items-center'><i class="fas fa-plane"></i><span class='text-xs mt-1'>Airplane</span></button>
                <button onclick="toggleQuickSettings(this, 'accessibility')" class='bg-purple-500 hover:bg-purple-600 text-white px-2 py-2 rounded flex flex-col items-center'><i class="fas fa-wheelchair"></i><span class='text-xs mt-1'>Accessibility</span></button>
                <button onclick="toggleQuickSettings(this, 'battery')" class='bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded flex flex-col items-center'><i class="fas fa-battery-half"></i><span class='text-xs mt-1'>Battery</span></button>
            </div>
            <button class='bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded w-full mt-2'>All Settings</button>
        `;
    }
    panel.innerHTML = content;
    panel.classList.remove("hidden");
    panel.dataset.type = type;
    // Position panel near the button (right side)
    const rect = btn.getBoundingClientRect();
    panel.style.right = "6px";
    panel.style.bottom = "60px";

    // Music player logic (attach events after DOM update)
    // Modern music player logic (Hinglish style)
    if (type === "music") {
        const audio = globalMusicAudio;
        // If src not set, set to first song
        if (!audio.src) {
            audio.src = localSongs[0].file;
            audio.dataset.idx = '0';
        }
        const playBtn = panel.querySelector('#music-play-btn');
        const prevBtn = panel.querySelector('#music-prev-btn');
        const nextBtn = panel.querySelector('#music-next-btn');
        const seekBar = panel.querySelector('#music-seek');
        const volumeBar = panel.querySelector('#music-volume');
        const playlistBtns = panel.querySelectorAll('#music-playlist button');
        const currentTitle = panel.querySelector('#music-current-title');
        const currentTime = panel.querySelector('#music-current-time');
        const durationTime = panel.querySelector('#music-duration');
        let currentIdx = 0;
        let isPlaying = false;
        let userPaused = false;

        function loadSong(idx, autoPlay = true, keepTime = false) {
            currentIdx = idx;
            let prevTime = 0;
            if (keepTime) prevTime = audio.currentTime;
            audio.src = localSongs[idx].file;
            audio.dataset.idx = idx;
            audio.load();
            if (keepTime && prevTime > 0) {
                audio.currentTime = prevTime;
            }
            currentTitle.textContent = localSongs[idx].title;
            playlistBtns.forEach((btn, i) => {
                btn.classList.toggle('bg-pink-600/20', i === idx);
            });
            if (autoPlay && !userPaused) {
                playSong();
            }
        }

        function playSong() {
            audio.play();
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        function pauseSong() {
            audio.pause();
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }

        playBtn.onclick = function () {
            if (isPlaying) {
                pauseSong();
                userPaused = true;
            } else {
                playSong();
                userPaused = false;
            }
        };
        prevBtn.onclick = function () {
            let idx = currentIdx - 1;
            if (idx < 0) idx = localSongs.length - 1;
            loadSong(idx);
            userPaused = false;
        };
        nextBtn.onclick = function () {
            let idx = (currentIdx + 1) % localSongs.length;
            loadSong(idx);
            userPaused = false;
        };
        playlistBtns.forEach((btn, i) => {
            btn.onclick = function () {
                loadSong(i);
                userPaused = false;
            };
        });
        audio.addEventListener('timeupdate', function () {
            if (audio.duration) {
                seekBar.value = (audio.currentTime / audio.duration) * 100;
                currentTime.textContent = formatTime(audio.currentTime);
                durationTime.textContent = formatTime(audio.duration);
            }
        });
        seekBar.oninput = function () {
            if (audio.duration) {
                audio.currentTime = (seekBar.value / 100) * audio.duration;
            }
        };
        volumeBar.oninput = function () {
            audio.volume = volumeBar.value;
        };
        audio.addEventListener('ended', function () {
            if (!userPaused) {
                let idx = (currentIdx + 1) % localSongs.length;
                loadSong(idx, true);
            }
        });
        function formatTime(sec) {
            sec = Math.floor(sec);
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            return `${m}:${s.toString().padStart(2, '0')}`;
        }
        // Restore state if already playing something
        let idx = parseInt(audio.dataset.idx || '0');
        if (isNaN(idx) || idx < 0 || idx >= localSongs.length) idx = 0;
        currentIdx = idx;
        currentTitle.textContent = localSongs[idx].title;
        playlistBtns.forEach((btn, i) => {
            btn.classList.toggle('bg-pink-600/20', i === idx);
        });
        // Seek bar and duration update
        audio.dispatchEvent(new Event('timeupdate'));
        // Play/pause button state
        if (!audio.paused && !audio.ended) {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        // Agar user ne pause nahi kiya toh music background me bajta rahe
        document.addEventListener('visibilitychange', function () {
            if (type === "music" && !userPaused && document.visibilityState === 'visible' && isPlaying) {
                audio.play();
            }
        });
    }
};
// Hide quick settings if clicking outside
document.addEventListener("mousedown", function (e) {
    const panel = document.getElementById("quick-settings-panel");
    if (
        panel &&
        !panel.classList.contains("hidden") &&
        !panel.contains(e.target) &&
        !e.target.closest(
            ".fa-cog,.fa-wifi,.fa-bluetooth-b,.fa-plane,.fa-wheelchair,.fa-battery-half"
        )
    ) {
        panel.classList.add("hidden");
        panel.innerHTML = "";
        panel.dataset.type = "";
    }
});
// --- Global openApp for desktop icons ---
window.openApp = function (appName) {
    if (appName === "Poki Games") {
        window.windowManager.createWindow(
            "Poki Games",
            `<div class='w-full h-full flex flex-col'>
                <div class='mb-2 text-sm text-gray-200'>Enjoy free games from Poki.com right here!</div>
                <div class='w-full h-[400px] rounded-lg overflow-hidden border border-gray-700 bg-black flex-1' id='poki-iframe-container'>
                    <div id='poki-iframe-custom' style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;'>
                        <button id='loadPokiIframe' style='padding:12px 24px;background:#f472b6;color:#fff;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;'>
                            <i class='fas fa-gamepad mr-2'></i>Load Poki Games
                        </button>
                        <div class='text-xs text-gray-400 mt-2 ml-4'>Click to load games in a secure iframe.<br>Some browsers may block 3rd party iframes by default.</div>
                    </div>
                </div>
                <div class='text-xs text-gray-400 mt-2'>Games load from poki.com. Use at your own discretion.</div>
            </div>`,
            "800px",
            "520px",
            "poki-games-window"
        );
        // Add custom context for iframe loading
        setTimeout(() => {
            const btn = document.getElementById("loadPokiIframe");
            if (btn) {
                btn.onclick = function () {
                    const container = document.getElementById("poki-iframe-container");
                    if (container) {
                        container.innerHTML = `<iframe src='https://poki.com' width='100%' height='100%' style='border:0; min-height:360px; min-width:100%; background:#111;' allowfullscreen loading='lazy'></iframe>`;
                    }
                };
            }
        }, 100);
        return;
    }
    // ...existing code for other apps...
    if (typeof window._openAppOriginal === "function") {
        window._openAppOriginal(appName);
    }
};
// (Removed duplicate/old openApp definition to avoid conflicts)
// --- Utility Functions ---
function generateUniqueId() {
    return "id_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Error saving to localStorage:", e);
    }
}

function loadFromLocalStorage(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error("Error loading from localStorage:", e);
        return defaultValue;
    }
}

// Global function to hide context menu
function hideContextMenu() {
    // Remove any context menu (old or new)
    const existingMenu = document.getElementById("contextMenu");
    if (existingMenu) existingMenu.remove();
    const paletteMenu = document.getElementById("paletteMenu");
    if (paletteMenu) paletteMenu.remove();
}

// --- Window Manager ---
window.windowManager = {
    zIndex: 10,
    activeWindow: null,
    openedWindowInstances: {},

    createWindow: function (
        title,
        content,
        width = "700px",
        height = "500px",
        id
    ) {
        if (!id) id = generateUniqueId();
        const existingWindow = document.getElementById(id);

        if (existingWindow) {
            this.focusWindow(existingWindow);
            return existingWindow;
        }

        const desktop = document.body;
        const win = document.createElement("div");
        win.id = id;
        win.className = "window"; // Apply base window class
        win.style.width = width;
        win.style.height = height;

        // Ensure initial position is set explicitly for draggable
        const offset = Object.keys(this.openedWindowInstances).length * 20;
        win.style.top = `${100 + offset}px`;
        win.style.left = `${100 + offset}px`;
        win.style.position = "absolute"; // Ensure position is absolute

        // Initial z-index, will be updated by focusWindow
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

        win.querySelector(".window-body").innerHTML = content;

        this.openedWindowInstances[id] = win;
        this.makeDraggable(win);
        this.attachWindowControls(win);
        this.focusWindow(win); // Focus the newly created window

        gsap.fromTo(
            win,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.2)" }
        );

        return win;
    },

    makeDraggable: function (element) {
        const header = element.querySelector(".window-header");
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener("mousedown", (e) => {
            // Prevent dragging if click is on a control button
            if (e.button === 0 && !e.target.closest(".window-controls button")) {
                isDragging = true;
                // Get mouse position relative to the element's current top/left
                const rect = element.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;

                // Apply grabbing cursor to the header, not the whole element initially
                header.classList.add("dragging");
                element.style.userSelect = "none";
                element.style.transition = "none"; // Disable transition during drag
                this.focusWindow(element);
            }
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            e.preventDefault(); // Prevent selection
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Constrain to viewport
            const minX = 0;
            const minY = 0;
            const maxX = window.innerWidth - element.offsetWidth;
            const maxY =
                window.innerHeight -
                element.offsetHeight -
                document.getElementById("taskbar").offsetHeight; // Account for taskbar

            newX = Math.max(minX, Math.min(newX, maxX));
            newY = Math.max(minY, Math.min(newY, maxY));

            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                header.classList.remove("dragging"); // Remove grabbing cursor from header
                element.style.userSelect = "auto";
                element.style.transition = ""; // Re-enable transition after drag
            }
        });
    },

    attachWindowControls: function (win) {
        const minimizeBtn = win.querySelector(".minimize-btn");
        const maximizeBtn = win.querySelector(".maximize-btn");
        const closeBtn = win.querySelector(".close-btn");

        minimizeBtn.addEventListener("click", () => {
            gsap.to(win, {
                opacity: 0,
                scale: 0.9,
                duration: 0.2,
                onComplete: () => {
                    win.style.display = "none";
                    window.taskbarManager.deactivateTaskbarApp(win.id);
                },
            });
            if (this.activeWindow === win) {
                this.activeWindow = null;
                win.classList.remove("active-focused"); // Ensure class is removed when minimized
            }
        });

        maximizeBtn.addEventListener("click", () => {
            if (win.dataset.maximized === "true") {
                gsap.to(win, {
                    width: win.dataset.originalWidth,
                    height: win.dataset.originalHeight,
                    top: win.dataset.originalTop,
                    left: win.dataset.originalLeft,
                    borderRadius: "0.8rem", // Restore original border-radius
                    duration: 0.3,
                    ease: "power2.out",
                });
                win.dataset.maximized = "false";
                maximizeBtn.innerHTML = '<i class="far fa-square"></i>';
            } else {
                win.dataset.originalWidth = win.style.width;
                win.dataset.originalHeight = win.style.height;
                win.dataset.originalTop = win.style.top;
                win.dataset.originalLeft = win.style.left;

                gsap.to(win, {
                    width: "100vw",
                    height: `calc(100vh - ${document.getElementById("taskbar").offsetHeight
                        }px)`,
                    top: "0",
                    left: "0",
                    borderRadius: "0", // Remove border-radius when maximized
                    duration: 0.3,
                    ease: "power2.out",
                });
                win.dataset.maximized = "true";
                maximizeBtn.innerHTML = '<i class="fas fa-compress-alt"></i>';
            }
        });

        closeBtn.addEventListener("click", () => {
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
                        win.classList.remove("active-focused"); // Ensure class is removed on close
                    }
                },
            });
        });

        win.addEventListener("mousedown", () => this.focusWindow(win));
    },

    focusWindow: function (win) {
        if (this.activeWindow && this.activeWindow !== win) {
            this.activeWindow.style.zIndex =
                this.activeWindow.dataset.previousZIndex || this.zIndex - 1;
            this.activeWindow.classList.remove("active-focused"); // Remove active class from previous
            window.taskbarManager.deactivateTaskbarApp(this.activeWindow.id);
        }
        win.style.zIndex = this.zIndex++;
        win.dataset.previousZIndex = win.style.zIndex;
        this.activeWindow = win;
        win.classList.add("active-focused"); // Add active class to current
        window.taskbarManager.activateTaskbarApp(win.id);
    },

    toggleWindowVisibility: function (id) {
        const win = document.getElementById(id);
        if (win) {
            if (win.style.display === "none") {
                gsap.fromTo(
                    win,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.2,
                        onComplete: () => (win.style.display = "flex"),
                    }
                );
                this.focusWindow(win);
            } else {
                gsap.to(win, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.2,
                    onComplete: () => (win.style.display = "none"),
                });
                window.taskbarManager.deactivateTaskbarApp(id);
                if (this.activeWindow === win) {
                    this.activeWindow = null;
                    win.classList.remove("active-focused"); // Ensure class is removed when minimized
                }
            }
        }
    },
};

// --- Taskbar Manager ---
window.taskbarManager = {
    taskbarAppsContainer: document.getElementById("taskbar-apps"),
    openedTaskbarButtons: {},

    addTaskbarApp: function (id, title, iconClass) {
        if (this.openedTaskbarButtons[id]) {
            this.activateTaskbarApp(id);
            return;
        }

        const btn = document.createElement("button");
        btn.className =
            "taskbar-app-btn flex flex-col items-center px-3 py-1 hover:bg-white/10 rounded transition duration-200 relative group";
        btn.dataset.windowId = id;
        btn.innerHTML = `<i class="${iconClass} text-2xl"></i>
                                     <span class="text-xs mt-1 absolute -top-6 bg-gray-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">${title}</span>`;
        btn.onclick = () => {
            window.windowManager.toggleWindowVisibility(id);
        };
        this.taskbarAppsContainer.appendChild(btn);
        this.openedTaskbarButtons[id] = btn;
        this.activateTaskbarApp(id);
    },

    removeTaskbarApp: function (id) {
        if (this.openedTaskbarButtons[id]) {
            this.openedTaskbarButtons[id].remove();
            delete this.openedTaskbarButtons[id];
        }
    },

    activateTaskbarApp: function (id) {
        Object.values(this.openedTaskbarButtons).forEach((btn) =>
            btn.classList.remove("active")
        );
        const btn = this.openedTaskbarButtons[id];
        if (btn) btn.classList.add("active");
    },

    deactivateTaskbarApp: function (id) {
        const btn = this.openedTaskbarButtons[id];
        if (btn) btn.classList.remove("active");
    },
};

// --- File System App ---
window.fileSystemApp = {
    // Main file system structure (for This PC)
    structure: loadFromLocalStorage("fileSystemStructure", {
        "This PC": {
            // This is the root for navigation purposes
            icon: "fas fa-desktop", // Icon for 'This PC' itself
            type: "system-root", // A new type for the root
            content: {
                // Content directly under 'This PC'
                "Local Disk (C:)": {
                    icon: "fas fa-hdd",
                    type: "drive",
                    content: {
                        "Program Files": {
                            icon: "fas fa-folder",
                            type: "folder",
                            content: {
                                Google: {
                                    icon: "fas fa-folder",
                                    type: "folder",
                                    content: {
                                        Chrome: {
                                            icon: "fab fa-chrome",
                                            type: "app-folder",
                                            app: "Chrome",
                                        },
                                    },
                                },
                                Microsoft: {
                                    icon: "fas fa-folder",
                                    type: "folder",
                                    content: {},
                                },
                                Utilities: {
                                    icon: "fas fa-folder",
                                    type: "folder",
                                    content: {},
                                },
                            },
                        },
                        Users: {
                            icon: "fas fa-folder",
                            type: "folder",
                            content: {
                                Public: { icon: "fas fa-folder", type: "folder", content: {} },
                                User: {
                                    icon: "fas fa-user-circle",
                                    type: "folder",
                                    content: {
                                        Desktop: {
                                            icon: "fas fa-folder",
                                            type: "folder",
                                            content: {},
                                        }, // This is the actual desktop folder in C:
                                        Documents: {
                                            icon: "fas fa-folder",
                                            type: "folder",
                                            content: {
                                                "MyNotes.txt": {
                                                    icon: "fas fa-file-alt",
                                                    type: "file",
                                                    content: "This is a sample text file.",
                                                },
                                                "MyPhoto.jpg": {
                                                    icon: "fas fa-image",
                                                    type: "file",
                                                    content: "Binary data representing an image.",
                                                },
                                            },
                                        },
                                        Downloads: {
                                            icon: "fas fa-folder",
                                            type: "folder",
                                            content: {},
                                        },
                                        Music: {
                                            icon: "fas fa-folder",
                                            type: "folder",
                                            content: {},
                                        },
                                        Pictures: {
                                            icon: "fas fa-folder",
                                            type: "folder",
                                            content: {},
                                        },
                                        Videos: {
                                            icon: "fas fa-folder",
                                            type: "folder",
                                            content: {},
                                        },
                                    },
                                },
                            },
                        },
                        Windows: { icon: "fab fa-windows", type: "folder", content: {} },
                        "README.txt": {
                            icon: "fas fa-file-alt",
                            type: "file",
                            content:
                                "Welcome to Local Disk (C:). This is a simulated file system!",
                        },
                        System32: { icon: "fas fa-folder", type: "folder", content: {} },
                    },
                },
                "Local Disk (D:)": {
                    icon: "fas fa-hdd",
                    type: "drive",
                    content: {
                        Games: {
                            icon: "fas fa-gamepad",
                            type: "folder",
                            content: {
                                "Game.exe": {
                                    icon: "fas fa-gamepad",
                                    type: "file",
                                    content: "This is a game executable.",
                                },
                            },
                        },
                        Movies: {
                            icon: "fas fa-film",
                            type: "folder",
                            content: {
                                "Movie.mp4": {
                                    icon: "fas fa-film",
                                    type: "file",
                                    content: "This is a movie file.",
                                },
                            },
                        },
                    },
                },
                "Network Drive (Z:)": {
                    icon: "fas fa-network-wired",
                    type: "drive",
                    content: {
                        Shared: { icon: "fas fa-folder-open", type: "folder", content: {} },
                    },
                },
            },
        },
    }),
    // Separate storage for items directly on the desktop (visual, not part of C: drive)
    desktopItems: loadFromLocalStorage("desktopItems", {
        // Initial example items for desktop, these are not system shortcuts
        // Removed 'My Desktop Folder' and 'My Desktop File.txt' as per user request
    }),
    currentPath: "This PC", // Tracks the current path in the File Explorer window

    saveStructure: function () {
        saveToLocalStorage("fileSystemStructure", this.structure);
        saveToLocalStorage("desktopItems", this.desktopItems); // Save desktop items separately
    },

    // Helper to traverse the file system structure and return the item or its parent's content
    // path is like "This PC/Local Disk (C:)/Users/User/Documents" (for main FS)
    // or "My Folder/My File.txt" (for desktopItems)
    // If `isDesktopContext` is true, it traverses `desktopItems`
    _traversePath: function (
        path,
        returnParentContent = false,
        isDesktopContext = false
    ) {
        let parts = path.split("/").filter((p) => p !== "");
        let current;
        let parentRef = null;

        if (isDesktopContext) {
            current = this.desktopItems;
            // If path starts with "Desktop/", remove it for internal traversal of desktopItems
            if (parts[0] === "Desktop") {
                // Handle paths like "Desktop/MyFolder/MyFile.txt"
                parts.shift(); // Remove 'Desktop'
            }
        } else {
            // Standard file system traversal (This PC)
            current = this.structure;
            if (parts[0] === "This PC") {
                if (!current["This PC"]) return null;
                parentRef = current;
                current = current["This PC"];
                parts.shift(); // Remove 'This PC'
                if (current.content) {
                    parentRef = current;
                    current = current.content;
                } else if (parts.length > 0) {
                    return null;
                }
            } else if (path === "") {
                return returnParentContent ? null : this.structure;
            } else {
                return null;
            }
        }

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current[part]) {
                return null; // Part not found
            }

            if (i === parts.length - 1) {
                // Last part of the path
                return returnParentContent ? current : current[part];
            }

            if (current[part].content) {
                parentRef = current[part];
                current = current[part].content;
            } else {
                return null;
            }
        }

        return current;
    },

    // Gets a directory's content (object of children)
    // Example: getDirectory("This PC/Local Disk (C:)") returns { "Program Files": {...}, "Users": {...} }
    // Example: getDirectory("My Desktop Folder", true) returns { "Important Notes.txt": {...} }
    getDirectory: function (path, isDesktopContext = false) {
        if (isDesktopContext && path === "desktop-root") {
            return this.desktopItems;
        }
        if (!isDesktopContext && path === "This PC") {
            return this.structure["This PC"].content;
        }
        const item = this._traversePath(path, false, isDesktopContext);
        if (item && item.content) {
            return item.content;
        }
        return null;
    },

    // Gets a specific item (file or folder object)
    // Example: getItem("This PC/Local Disk (C:)/Users/User/Documents/MyNotes.txt") returns { icon: '...', type: 'file', content: '...' }
    // Example: getItem("My Desktop Folder", true) returns { icon: '...', type: 'folder', content: '...' }
    getItem: function (path, isDesktopContext = false) {
        if (isDesktopContext && path === "desktop-root") {
            return {
                name: "Desktop",
                icon: "fas fa-desktop",
                type: "system-root",
                content: this.desktopItems,
            };
        }
        if (!isDesktopContext && path === "This PC") {
            return this.structure["This PC"];
        }
        return this._traversePath(path, false, isDesktopContext);
    },

    // Renders the file explorer content based on currentPath (for This PC app)
    renderFileExplorer: function (targetPath) {
        if (targetPath) {
            this.currentPath = targetPath;
        }

        const currentDirContent = this.getDirectory(this.currentPath);
        const currentItem = this.getItem(this.currentPath); // Get the item itself to check its type

        let html = `
                    <div class="fe-toolbar">
                        <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="fileSystemApp.goBack()">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <input type="text" class="fe-path-input" value="${this.currentPath
            }" readonly>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm" onclick="fileSystemApp.createItemPrompt('folder', false)">
                            <i class="fas fa-folder-plus mr-1"></i> New Folder
                        </button>
                           <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm" onclick="fileSystemApp.createItemPrompt('file', false)">
                            <i class="fas fa-file-medical mr-1"></i> New File
                        </button>
                    </div>
                    <div class="fe-content">
                        <div class="fe-sidebar">
                            <h4 class="text-gray-400 text-xs mb-2 uppercase">Drives and Folders</h4>
                            <ul class="space-y-1">
                                <li class="fe-sidebar-item ${this.currentPath === "This PC" ? "active" : ""
            }" onclick="window.fileSystemApp.renderFileExplorer('This PC')">
                                    <i class="fas fa-desktop mr-2"></i> This PC
                                </li>`;

        // Dynamically add drives to sidebar from 'This PC' content
        const thisPCContent = this.getDirectory("This PC");
        if (thisPCContent) {
            for (const itemName in thisPCContent) {
                const item = thisPCContent[itemName];
                if (item.type === "drive") {
                    const fullPath = `This PC/${itemName}`;
                    html += `<li class="fe-sidebar-item ${this.currentPath.startsWith(fullPath) ? "active" : ""
                        }" onclick="window.fileSystemApp.renderFileExplorer('${fullPath}')">
                                        <i class="${item.icon
                        } mr-2"></i> ${itemName}
                                    </li>`;
                }
            }
        }

        // Add common user folders to sidebar for quick access (These are specific paths in C: drive)
        html += `
                                <li class="fe-sidebar-item ${this.currentPath.startsWith(
            "This PC/Local Disk (C:)/Users/User/Documents"
        )
                ? "active"
                : ""
            }" onclick="window.fileSystemApp.renderFileExplorer('This PC/Local Disk (C:)/Users/User/Documents')">
                                    <i class="fas fa-file-word mr-2"></i> Documents
                                </li>
                                <li class="fe-sidebar-item ${this.currentPath.startsWith(
                "This PC/Local Disk (C:)/Users/User/Downloads"
            )
                ? "active"
                : ""
            }" onclick="window.fileSystemApp.renderFileExplorer('This PC/Local Disk (C:)/Users/User/Downloads')">
                                    <i class="fas fa-download mr-2"></i> Downloads
                                </li>
                            </ul>
                        </div>
                        <div class="fe-main" oncontextmenu="event.preventDefault(); fileSystemApp.showContextMenu(event, fileSystemApp.currentPath, 'folder-bg', false)">`; // Added context menu for empty space

        // Check if currentDirContent is valid and is a folder/drive type
        if (
            !currentDirContent ||
            currentItem.type === "file" ||
            currentItem.type === "app-folder"
        ) {
            html += `<div class="text-center w-full mt-8 text-gray-400">
                                   <i class="fas fa-exclamation-circle text-5xl mb-4"></i>
                                   <p>Cannot display content. This might be a file or an invalid path.</p>
                                 </div>`;
        } else {
            const items = Object.entries(currentDirContent).sort(
                ([nameA, itemA], [nameB, itemB]) => {
                    const isDirA =
                        itemA.type === "folder" ||
                        itemA.type === "drive" ||
                        itemA.type === "app-folder";
                    const isDirB =
                        itemB.type === "folder" ||
                        itemB.type === "drive" ||
                        itemB.type === "app-folder";
                    if (isDirA && !isDirB) return -1;
                    if (!isDirA && isDirB) return 1;
                    return nameA.localeCompare(nameB);
                }
            );

            if (items.length === 0) {
                html += `<div class="text-center w-full mt-8 text-gray-400">
                                           <i class="fas fa-folder-open text-5xl mb-4"></i>
                                           <p>This folder is empty.</p>
                                          </div>`;
            } else {
                items.forEach(([name, item]) => {
                    const fullPath = `${this.currentPath}/${name}`;
                    let iconClass =
                        item.icon ||
                        (item.type === "folder" ||
                            item.type === "drive" ||
                            item.type === "app-folder"
                            ? "fas fa-folder"
                            : "fas fa-file");
                    let clickAction = "";

                    if (
                        item.type === "folder" ||
                        item.type === "drive" ||
                        item.type === "system-root"
                    ) {
                        clickAction = `fileSystemApp.renderFileExplorer('${fullPath}')`;
                    } else if (item.type === "app-folder" && item.app) {
                        clickAction = `openApp('${item.app}')`;
                    } else if (item.type === "file") {
                        clickAction = `fileSystemApp.openFile('${fullPath}')`;
                    }

                    html += `
                                <div class="fe-item" ondblclick=\"${clickAction}\" oncontextmenu=\"event.preventDefault(); hideContextMenu(); setTimeout(() => { fileSystemApp.showContextMenu(event, '${fullPath}', '${item.type
                        }', false); }, 10);\">
                                    <i class=\"${iconClass} ${item.type === "drive" || item.type === "system-root"
                            ? "text-blue-400"
                            : item.type === "folder" || item.type === "app-folder"
                                ? "text-yellow-400"
                                : "text-gray-400"
                        }\"></i>
                                    <p>${name}</p>
                                </div>
                            `;
                });
            }
        }
        html += `</div></div>`;

        // Update the file explorer window content if it's already open
        const feWindowBody = document.querySelector("#window_thispc .window-body");
        if (feWindowBody) {
            feWindowBody.innerHTML = html; // Directly update the innerHTML
        }
        return html;
    },

    // For This PC's back button
    goBack: function () {
        const pathParts = this.currentPath.split("/");
        if (pathParts.length > 1) {
            pathParts.pop();
            this.currentPath = pathParts.join("/");
            if (this.currentPath === "") {
                // If it becomes empty, means we were at "This PC"
                this.currentPath = "This PC";
            }
            this.renderFileExplorer(this.currentPath);
        } else if (this.currentPath === "This PC") {
            alert("You are already at the top level of 'This PC'.");
        } else {
            // Fallback, should not happen with proper path management
            this.currentPath = "This PC";
            this.renderFileExplorer(this.currentPath);
        }
    },

    openFile: function (filePath, isDesktopContext = false) {
        const file = this.getItem(filePath, isDesktopContext);
        if (file && file.type === "file") {
            alert(`Opening file: ${filePath}\n\nContent:\n${file.content}`);
        } else {
            alert(`Could not open ${filePath}. It's not a file or does not exist.`);
        }
    },

    // isDesktopContext: true for desktop right-click context, false for File Explorer
    // parentPathForCreate: For desktop, this could be 'desktop-root' or 'Desktop/MyFolder'
    createItemPrompt: function (
        type,
        isDesktopContext,
        parentPathForCreate = null
    ) {
        const name = prompt(`Enter name for new ${type}:`);
        if (name && name.trim() !== "") {
            this.createItem(
                name.trim(),
                type,
                parentPathForCreate ||
                (isDesktopContext ? "desktop-root" : this.currentPath),
                isDesktopContext
            );
        } else if (name !== null) {
            // If user clicked OK but entered empty
            alert("Name cannot be empty.");
        }
    },

    // Create item in specified parentPath (either currentPath or 'desktop-root' or 'Desktop/FolderName')
    createItem: function (name, type, parentPath, isDesktopContext) {
        let targetCollection;
        if (isDesktopContext) {
            if (parentPath === "desktop-root") {
                targetCollection = this.desktopItems;
            } else if (parentPath.startsWith("Desktop/")) {
                // Creating inside a nested desktop folder
                const folderRelativePath = parentPath.substring("Desktop/".length); // e.g., "MyFolder" or "MyFolder/SubFolder"
                const folderItem = this._traversePath(folderRelativePath, false, true); // Get the folder item
                if (folderItem && folderItem.content) {
                    targetCollection = folderItem.content;
                } else {
                    alert(
                        `Error: Desktop folder '${folderRelativePath}' not found or is not a folder.`
                    );
                    return;
                }
            } else {
                alert(`Error: Invalid desktop parent path: ${parentPath}.`);
                return;
            }
        } else {
            // Standard file system (This PC)
            targetCollection = this.getDirectory(parentPath);
        }

        if (!targetCollection) {
            alert(`Error: Cannot find target location to create item.`);
            return;
        }

        if (targetCollection[name]) {
            alert(
                `Error: An item with the name "${name}" already exists in this location.`
            );
            return;
        }

        if (type === "folder") {
            targetCollection[name] = {
                icon: "fas fa-folder",
                type: "folder",
                content: {},
            };
        } else if (type === "file") {
            targetCollection[name] = {
                icon: "fas fa-file",
                type: "file",
                content: "",
            };
        } else {
            alert(`Error: Invalid item type "${type}".`);
            return;
        }

        this.saveStructure(); // Save both structures

        if (isDesktopContext) {
            // If creating directly on desktop, re-render desktop icons
            if (parentPath === "desktop-root") {
                window.desktopManager.renderDesktopIcons();
            } else {
                // If creating inside a desktop folder, re-render that specific folder's FE window
                const folderWinId = `window_desktop_folder_${parentPath
                    .substring("Desktop/".length)
                    .replace(/\s/g, "")
                    .toLowerCase()}`;
                const folderWin = document.getElementById(folderWinId);
                if (folderWin) {
                    // Re-render the content of that specific desktop folder window
                    folderWin.querySelector(".window-body").innerHTML =
                        window.desktopManager.renderFileExplorerForDesktopFolder(
                            parentPath.substring("Desktop/".length)
                        );
                }
            }
        } else if (document.querySelector("#window_thispc .window-body")) {
            this.renderFileExplorer(this.currentPath); // Re-render file explorer if open
        }
        alert(`${name} created successfully!`);
    },

    // Delete item from specified path (either desktop or file system)
    deleteItem: function (path, isDesktopContext) {
        hideContextMenu();
        if (
            !confirm(
                `Are you sure you want to delete ${path}? This cannot be undone.`
            )
        ) {
            return;
        }
        const pathParts = path.split("/");
        const itemName = pathParts.pop();
        const parentPath = pathParts.join("/");
        let targetCollection;
        let itemToDelete = null;
        if (isDesktopContext) {
            if (parentPath === "") {
                targetCollection = this.desktopItems;
                itemToDelete = this.desktopItems[itemName];
            } else if (parentPath.startsWith("Desktop/")) {
                const folderRelativePath = parentPath.substring("Desktop/".length);
                const folderItem = this._traversePath(folderRelativePath, false, true);
                if (folderItem && folderItem.content) {
                    targetCollection = folderItem.content;
                    itemToDelete = folderItem.content[itemName];
                }
            }
        } else {
            targetCollection = this.getDirectory(parentPath);
            itemToDelete = this.getItem(path, false);
        }
        if (!targetCollection || !itemToDelete) {
            alert(`Error: Could not find ${itemName} to delete at ${path}.`);
            return;
        }
        if (!isDesktopContext) {
            const fullPathForCheck = path;
            if (
                [
                    "This PC",
                    "This PC/Local Disk (C:)",
                    "This PC/Local Disk (D:)",
                    "This PC/Network Drive (Z:)",
                    "This PC/Local Disk (C:)/Windows",
                    "This PC/Local Disk (C:)/Program Files",
                    "This PC/Local Disk (C:)/Users",
                ].includes(fullPathForCheck)
            ) {
                alert("System drives/folders cannot be deleted.");
                return;
            }
        } else {
            const hardcodedAppNames = ["This PC", "Chrome", "Notes", "Recycle Bin"];
            if (hardcodedAppNames.includes(itemName)) {
                alert("Default application shortcuts cannot be deleted from desktop.");
                return;
            }
        }
        window.recycleBinApp.addItem({
            id: generateUniqueId(),
            name: itemName,
            originalPath: isDesktopContext ? `Desktop/${path}` : path,
            type: itemToDelete.type,
            icon: itemToDelete.icon,
            content:
                itemToDelete.content ||
                (itemToDelete.type === "folder" || itemToDelete.type === "drive"
                    ? {}
                    : ""),
        });
        delete targetCollection[itemName];
        this.saveStructure();
        if (isDesktopContext) {
            if (parentPath === "") {
                window.desktopManager.renderDesktopIcons();
            } else {
                const folderWinId = `window_desktop_folder_${parentPath
                    .substring("Desktop/".length)
                    .replace(/\s/g, "")
                    .toLowerCase()}`;
                const folderWin = document.getElementById(folderWinId);
                if (folderWin) {
                    folderWin.querySelector(".window-body").innerHTML =
                        window.desktopManager.renderFileExplorerForDesktopFolder(
                            parentPath.substring("Desktop/".length)
                        );
                }
            }
        } else if (document.querySelector("#window_thispc .window-body")) {
            this.renderFileExplorer(this.currentPath);
        }
        alert(`${itemName} moved to Recycle Bin.`);
    },

    // Rename item from specified path (either desktop or file system)
    renameItem: function (path, newName, isDesktopContext) {
        // To hide the context menu after action
        hideContextMenu();

        const newNameTrimmed = newName.trim();
        if (!newNameTrimmed) {
            alert("New name cannot be empty.");
            return;
        }

        const pathParts = path.split("/");
        const oldName = pathParts.pop();
        const parentPath = pathParts.join("/");

        let targetCollection;
        let itemToRename = null;

        if (isDesktopContext) {
            if (parentPath === "") {
                // Top-level desktop item
                targetCollection = this.desktopItems;
                itemToRename = this.desktopItems[oldName];
            } else if (parentPath.startsWith("Desktop/")) {
                // Nested desktop item
                const folderRelativePath = parentPath.substring("Desktop/".length);
                const folderItem = this._traversePath(folderRelativePath, false, true);
                if (folderItem && folderItem.content) {
                    targetCollection = folderItem.content;
                    itemToRename = folderItem.content[oldName];
                }
            }
        } else {
            // Standard file system (This PC)
            targetCollection = this.getDirectory(parentPath);
            itemToRename = this.getItem(path, false);
        }

        if (!targetCollection || !itemToRename) {
            alert(`Error: Could not find ${oldName} to rename at ${path}.`);
            return;
        }

        if (targetCollection[newNameTrimmed]) {
            alert(
                `Error: An item named "${newNameTrimmed}" already exists in this location.`
            );
            return;
        }

        // Prevent renaming core system items or hardcoded desktop app shortcuts
        if (!isDesktopContext) {
            const fullPathForCheck = path;
            if (
                [
                    "This PC",
                    "This PC/Local Disk (C:)",
                    "This PC/Local Disk (D:)",
                    "This PC/Network Drive (Z:)",
                    "This PC/Local Disk (C:)/Windows",
                    "This PC/Local Disk (C:)/Program Files",
                    "This PC/Local Disk (C:)/Users",
                ].includes(fullPathForCheck)
            ) {
                alert("System drives/folders cannot be renamed.");
                return;
            }
        } else {
            // For desktop items, if it's an app shortcut, only allow renaming its display text
            const hardcodedAppNames = ["This PC", "Chrome", "Notes", "Recycle Bin"];
            if (hardcodedAppNames.includes(oldName)) {
                // Check original name
                // For hardcoded icons, only update the displayed text, not the underlying data structure
                const iconDiv = document.getElementById(
                    `desktop_${oldName.replace(/\s/g, "").toLowerCase()}_icon`
                );
                if (iconDiv) {
                    iconDiv.querySelector("p").textContent = newNameTrimmed; // Only update display name
                    alert(`Desktop icon display name changed to ${newNameTrimmed}.`);
                }
                return;
            }
        }

        // Perform rename for dynamically created items
        targetCollection[newNameTrimmed] = targetCollection[oldName];
        delete targetCollection[oldName];
        this.saveStructure();

        if (isDesktopContext) {
            if (parentPath === "") {
                // Top-level desktop item
                window.desktopManager.renderDesktopIcons();
            } else {
                // Nested desktop item
                const folderWinId = `window_desktop_folder_${parentPath
                    .substring("Desktop/".length)
                    .replace(/\s/g, "")
                    .toLowerCase()}`;
                const folderWin = document.getElementById(folderWinId);
                if (folderWin) {
                    folderWin.querySelector(".window-body").innerHTML =
                        window.desktopManager.renderFileExplorerForDesktopFolder(
                            parentPath.substring("Desktop/".length)
                        );
                }
            }
        } else if (document.querySelector("#window_thispc .window-body")) {
            // Update current path if the renamed item was part of it
            if (this.currentPath.startsWith(path)) {
                this.currentPath = this.currentPath.replace(
                    path,
                    `${parentPath}/${newNameTrimmed}`
                );
            }
            this.renderFileExplorer(this.currentPath); // Re-render file explorer
        }
        alert(`Renamed ${oldName} to ${newNameTrimmed}.`);
    },

    // showContextMenu is now shared by desktop & file explorer
    // `pathOrId`: For FE, it's the full path. For desktop icons, it's the item's name.
    // `type`: 'file', 'folder', 'drive', 'app-folder', 'system-root', 'desktop-bg', 'folder-bg', 'desktop-icon'
    // `isDesktopContext`: true if called from desktop, false if from File Explorer
    showContextMenu: function (event, pathOrId, type, isDesktopContext = false) {
        hideContextMenu(); // Always hide any existing menu first

        const menu = document.createElement("div");
        menu.id = "contextMenu";
        menu.className = "context-menu";
        menu.style.left = `${event.clientX}px`;
        menu.style.top = `${event.clientY}px`;

        let menuHtml = "";
        let actualItemName = "";

        // Determine the item's name for prompts
        if (type === "desktop-icon") {
            // For hardcoded desktop icons, pathOrId is like 'desktop_thispc_icon'
            actualItemName =
                document.getElementById(pathOrId)?.querySelector("p").textContent ||
                pathOrId;
        } else {
            const pathParts = pathOrId.split("/");
            actualItemName = pathParts[pathParts.length - 1];
        }

        // --- Universal Options for Items (Open, Rename, Delete) ---
        if (type !== "desktop-bg" && type !== "folder-bg") {
            // Open
            if (type === "desktop-icon") {
                // Try openApp for hardcoded, else open file/folder for dynamic
                const desktopItem = window.fileSystemApp.desktopItems[actualItemName];
                if (desktopItem) {
                    if (desktopItem.type === "folder") {
                        menuHtml += `<div class="context-menu-item" onclick="window.windowManager.createWindow('Desktop - ${actualItemName}', window.desktopManager.renderFileExplorerForDesktopFolder('${actualItemName}'), '700px', '500px', 'window_desktop_folder_${actualItemName
                            .replace(/\s/g, "")
                            .toLowerCase()}')"><i class='fas fa-folder-open'></i> Open</div>`;
                    } else if (desktopItem.type === "file") {
                        menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.openFile('${actualItemName}', true)"><i class='fas fa-file-alt'></i> Open</div>`;
                    } else {
                        menuHtml += `<div class="context-menu-item" onclick="openApp('${actualItemName}')"><i class='fas fa-folder-open'></i> Open</div>`;
                    }
                } else {
                    menuHtml += `<div class="context-menu-item" onclick="openApp('${actualItemName}')"><i class='fas fa-folder-open'></i> Open</div>`;
                }
            } else if (
                type === "folder" ||
                type === "drive" ||
                type === "system-root"
            ) {
                menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.renderFileExplorer('${pathOrId}')"><i class='fas fa-folder-open'></i> Open</div>`;
            } else if (type === "file") {
                menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.openFile('${pathOrId}', ${isDesktopContext})"><i class='fas fa-file-alt'></i> Open</div>`;
            } else if (type === "app-folder") {
                const itemData = fileSystemApp.getItem(pathOrId, isDesktopContext);
                menuHtml += `<div class="context-menu-item" onclick="openApp('${itemData?.app}')"><i class='${itemData?.icon}'></i> Open Application</div>`;
            }

            // Rename
            const hardcodedDesktopAppNames = [
                "This PC",
                "Chrome",
                "Notes",
                "Recycle Bin",
            ];
            const isSystemOrAppFolder =
                [
                    "This PC",
                    "This PC/Local Disk (C:)",
                    "This PC/Local Disk (D:)",
                    "This PC/Network Drive (Z:)",
                    "This PC/Local Disk (C:)/Windows",
                    "This PC/Local Disk (C:)/Program Files",
                    "This PC/Local Disk (C:)/Users",
                ].includes(pathOrId) || type === "app-folder";

            if (
                !isSystemOrAppFolder &&
                !hardcodedDesktopAppNames.includes(actualItemName)
            ) {
                menuHtml += `<div class="context-menu-item" onclick="const newName = prompt('Rename ${actualItemName} to:'); if(newName !== null) fileSystemApp.renameItem('${pathOrId}', newName, ${isDesktopContext})"><i class='fas fa-i-cursor'></i> Rename</div>`;
                menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.deleteItem('${pathOrId}', ${isDesktopContext})"><i class='fas fa-trash-alt'></i> Delete</div>`;
            }
            if (menuHtml.trim() !== "") {
                menuHtml += `<div class="context-menu-separator"></div>`;
            }
        }

        // --- Create New (Folder/File) Options ---
        // Available on desktop-bg, folder-bg, and actual folder/drive/system-root items
        if (
            type === "desktop-bg" ||
            type === "folder-bg" ||
            type === "folder" ||
            type === "drive" ||
            type === "system-root"
        ) {
            menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.createItemPrompt('folder', ${isDesktopContext}, '${pathOrId}');"><i class="fas fa-folder-plus"></i> New Folder</div>`;
            menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.createItemPrompt('file', ${isDesktopContext}, '${pathOrId}');"><i class="fas fa-file-medical"></i> New File</div>`;
            if (menuHtml.trim() !== "") {
                // Add separator if any create actions were added
                menuHtml += `<div class="context-menu-separator"></div>`;
            }
        }

        // --- Desktop-Specific Options ---
        if (type === "desktop-bg") {
            // Removed 'Change Wallpaper' option from desktop right-click
        }

        // --- Refresh Option ---
        if (type === "desktop-bg") {
            // For desktop background, refresh means re-render desktop icons
            menuHtml += `<div class="context-menu-item" onclick="window.desktopManager.renderDesktopIcons();"><i class="fas fa-sync-alt"></i> Refresh</div>`;
        } else if (
            type === "folder-bg" ||
            type === "folder" ||
            type === "drive" ||
            type === "system-root"
        ) {
            // For File Explorer background/folders, refresh means re-render current FE path
            menuHtml += `<div class="context-menu-item" onclick="fileSystemApp.renderFileExplorer(fileSystemApp.currentPath);"><i class="fas fa-sync-alt"></i> Refresh</div>`;
        }

        // Append menu to body and adjust position
        menu.innerHTML = menuHtml;
        if (menuHtml.trim() === "") return; // Don't show empty menu if no options

        document.body.appendChild(menu);

        const menuRect = menu.getBoundingClientRect();
        // Adjust menu position to fit within viewport
        if (menuRect.bottom > window.innerHeight) {
            menu.style.top = `${event.clientY - menuRect.height}px`;
        }
        if (menuRect.right > window.innerWidth) {
            menu.style.left = `${event.clientX - menuRect.width}px`;
        }

        // This handles hiding the context menu when clicking outside it
        const clickOutsideHandler = (e) => {
            // Check if the click was outside the menu AND not on the element that triggered the context menu
            if (menu && !menu.contains(e.target) && e.button !== 2) {
                // e.button !== 2 for right-click itself
                hideContextMenu();
                document.removeEventListener("click", clickOutsideHandler);
                document.removeEventListener("contextmenu", contextOutsideHandler);
            }
        };

        const contextOutsideHandler = (e) => {
            // If a new right-click happens outside the current menu, close the current one
            if (menu && !menu.contains(e.target)) {
                hideContextMenu();
                document.removeEventListener("click", clickOutsideHandler);
                document.removeEventListener("contextmenu", contextOutsideHandler);
            }
        };

        // Add event listeners globally to hide context menu on any click outside
        // Use a short timeout to prevent the current right-click event from immediately closing the menu
        setTimeout(() => {
            document.addEventListener("click", clickOutsideHandler);
            document.addEventListener("contextmenu", contextOutsideHandler); // Also close if another right-click happens
        }, 50); // Small delay
    },
};

// --- Notes App ---
// --- Notes App ---
window.notesApp = {
    notes: loadFromLocalStorage("notesApp_notes", []),
    currentNoteId: null,

    saveNotes: function () {
        saveToLocalStorage("notesApp_notes", this.notes);
    },

    renderNotesApp: function () {
        this.notes = loadFromLocalStorage("notesApp_notes", []);
        if (!this._mode || this._mode === "home") {
            let notesList = "";
            if (this.notes.length === 0) {
                notesList = `<div class="text-gray-400 text-center text-sm mt-4">No notes yet.<br>Click \"Create Note\" to add one.</div>`;
            } else {
                notesList = `<div class="notes-list mt-4 overflow-auto max-h-[350px]">${this.notes
                    .map(
                        (note) => `
                    <div class="notes-list-item flex justify-between items-center" data-id="${note.id
                            }">
                        <div onclick=\"notesApp.openView('${note.id
                            }')\" style=\"flex:1;cursor:pointer;\">
                            <div class="font-semibold text-blue-900">${note.title
                                ? note.title
                                    .replace(/</g, "&lt;")
                                    .replace(/>/g, "&gt;")
                                : "Untitled Note"
                            }</div>
                            <div class="text-gray-500 text-xs mt-1">${note.content.length > 60
                                ? note.content
                                    .substring(0, 60)
                                    .replace(/</g, "&lt;")
                                    .replace(/>/g, "&gt;") + "..."
                                : note.content
                                    .replace(/</g, "&lt;")
                                    .replace(/>/g, "&gt;")
                            }</div>
                        </div>
                        <button class="notes-glass-btn text-xs ml-2" onclick=\"notesApp.openEdit('${note.id
                            }');event.stopPropagation();\">Edit</button>
                        <button class="notes-glass-btn text-xs ml-2" onclick=\"notesApp.deleteSimpleNote('${note.id
                            }');event.stopPropagation();\">Delete</button>
                    </div>
                `
                    )
                    .join("")}</div>`;
            }
            return `
                <div class="notes-app flex flex-col items-center justify-center h-full w-full p-0 overflow-auto">
                    <button class="notes-glass-btn mt-12 mb-8 text-lg" onclick="notesApp.openCreate()"><i class="fas fa-plus mr-2"></i>Create Note</button>
                    <div class="w-full max-w-lg mx-auto">${notesList}</div>
                </div>
            `;
        }
        if (this._mode === "create") {
            return `
                <div class="notes-app flex flex-col items-center justify-center h-full w-full p-0">
                    <div class="notes-glass-card w-full max-w-lg mt-16">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Create Note</h2>
                        <form class="notes-editor">
                            <input type="text" id="note-title" placeholder="Heading..." class="w-full" />
                            <textarea id="note-content" placeholder="Description..." class="w-full mb-6" style="min-height:120px;"></textarea>
                            <div class="notes-editor-actions">
                                <button type="button" class="notes-glass-btn" onclick="notesApp.goHome()">Cancel</button>
                                <button type="button" class="notes-glass-btn" onclick="notesApp.saveSimpleNote()">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        }
        if (this._mode && this._mode.startsWith("view:")) {
            const noteId = this._mode.split(":")[1];
            const note = this.notes.find((n) => n.id === noteId);
            if (!note) return this.goHome();
            return `
                <div class="notes-app flex flex-col items-center justify-center h-full w-full p-0">
                    <div class="notes-glass-card w-full max-w-lg mt-16">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-gray-800">Note</h2>
                        </div>
                        <div class="mb-4">
                            <div class="font-semibold text-lg mb-2">${note.title
                    ? note.title
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                    : "Untitled Note"
                }</div>
                            <div class="text-gray-700 whitespace-pre-line">${note.content
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</div>
                        </div>
                        <div class="notes-editor-actions">
                            <button type="button" class="notes-glass-btn" onclick="notesApp.goHome()">Back</button>
                            <button type="button" class="notes-glass-btn" onclick="notesApp.openEdit('${note.id
                }')">Edit</button>
                            <button type="button" class="notes-glass-btn" onclick="notesApp.deleteSimpleNote('${note.id
                }')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }
        if (this._mode && this._mode.startsWith("edit:")) {
            const noteId = this._mode.split(":")[1];
            const note = this.notes.find((n) => n.id === noteId);
            if (!note) return this.goHome();
            return `
                <div class="notes-app flex flex-col items-center justify-center h-full w-full p-0">
                    <div class="notes-glass-card w-full max-w-lg mt-16">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-gray-800">Edit Note</h2>
                        </div>
                        <form class="notes-editor">
                            <input type="text" id="note-title" value="${note.title.replace(
                /"/g,
                "&quot;"
            )}" placeholder="Heading..." class="w-full" />
                            <textarea id="note-content" placeholder="Description..." class="w-full mb-6" style="min-height:120px;">${note.content
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")}</textarea>
                            <div class="notes-editor-actions">
                                <button type="button" class="notes-glass-btn" onclick="notesApp.goHome()">Cancel</button>
                                <button type="button" class="notes-glass-btn" onclick="notesApp.updateSimpleNote('${note.id
                }')">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        }
    },
    openEdit: function (id) {
        this._mode = "edit:" + id;
        const win = document.getElementById("window_notes");
        if (win) {
            win.querySelector(".window-body").innerHTML = this.renderNotesApp();
        } else {
            window.windowManager.createWindow(
                "Notes",
                this.renderNotesApp(),
                "700px",
                "400px",
                "window_notes"
            );
        }
    },
    openCreate: function () {
        this._mode = "create";
        const win = document.getElementById("window_notes");
        if (win) {
            win.querySelector(".window-body").innerHTML = this.renderNotesApp();
        } else {
            window.windowManager.createWindow(
                "Notes",
                this.renderNotesApp(),
                "700px",
                "400px",
                "window_notes"
            );
        }
        setTimeout(() => {
            const titleInput = document.getElementById("note-title");
            if (titleInput) titleInput.focus();
        }, 100);
    },
    goHome: function () {
        this._mode = "home";
        const win = document.getElementById("window_notes");
        if (win) {
            win.querySelector(".window-body").innerHTML = this.renderNotesApp();
        } else {
            window.windowManager.createWindow(
                "Notes",
                this.renderNotesApp(),
                "700px",
                "400px",
                "window_notes"
            );
        }
    },
    openView: function (id) {
        this._mode = "view:" + id;
        const win = document.getElementById("window_notes");
        if (win) {
            win.querySelector(".window-body").innerHTML = this.renderNotesApp();
        } else {
            window.windowManager.createWindow(
                "Notes",
                this.renderNotesApp(),
                "700px",
                "400px",
                "window_notes"
            );
        }
    },
    saveSimpleNote: function () {
        const titleInput = document.getElementById("note-title");
        const contentInput = document.getElementById("note-content");
        if (!titleInput || !contentInput) return;
        const newNote = {
            id: generateUniqueId(),
            title: titleInput.value,
            content: contentInput.value,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.notes.unshift(newNote);
        this.saveNotes();
        this.goHome();
    },
    updateSimpleNote: function (id) {
        const titleInput = document.getElementById("note-title");
        const contentInput = document.getElementById("note-content");
        if (!titleInput || !contentInput) return;
        const idx = this.notes.findIndex((n) => n.id === id);
        if (idx !== -1) {
            this.notes[idx].title = titleInput.value;
            this.notes[idx].content = contentInput.value;
            this.notes[idx].updatedAt = new Date().toISOString();
            this.saveNotes();
            this.goHome();
        }
    },
    deleteSimpleNote: function (id) {
        this.notes = this.notes.filter((n) => n.id !== id);
        this.saveNotes();
        this.goHome();
    },
};

// --- Chrome App ---
window.chromeApp = {
    history: loadFromLocalStorage("chromeApp_history", []),
    bookmarks: loadFromLocalStorage("chromeApp_bookmarks", []),
    currentUrl: "about:blank", // Default starting page is blank

    saveData: function () {
        saveToLocalStorage("chromeApp_history", this.history);
        saveToLocalStorage("chromeApp_bookmarks", this.bookmarks);
    },

    renderChromeApp: function () {
        var appContent = `
            <div class="browser-window">
                <div class="browser-toolbar bg-gray-800" style="position:sticky; top:0; left:0; right:0; z-index:10; box-shadow:0 2px 8px #0002;">
                    <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="chromeApp.goBackHistory()"><i class="fas fa-arrow-left"></i></button>
                    <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="chromeApp.goForwardHistory()"><i class="fas fa-arrow-right"></i></button>
                    <select id="search-engine-select" class="bg-gray-600 text-white p-1 rounded mr-2">
                        <option value="https://www.bing.com/search?q=">Bing</option>
                        <option value="https://www.google.com/search?q=">Google</option>
                        <option value="https://duckduckgo.com/?q=">DuckDuckGo</option>
                        <option value="https://searx.tiekoetter.com/?q=">Searx</option>
                    </select>
                    <input type="text" id="browser-search-input" class="bg-gray-600 text-white p-1 rounded focus:ring-2 focus:ring-blue-500 outline-none"  placeholder="Search or enter URL..." onkeydown="if(event.key === 'Enter') chromeApp.searchFromForm()">
                    <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded transition duration-200" id="gosearch" onclick="chromeApp.searchFromForm()">Search</button>
                    <input type="text" id="browser-url-input" class="flex-1 bg-gray-600 text-white p-1 rounded focus:ring-2 focus:ring-blue-500 outline-none ml-2" value="${this.currentUrl}" placeholder="Enter URL..." onkeydown="if(event.key === 'Enter') chromeApp.loadUrl(this.value)">
                    <button class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded transition duration-200" onclick="chromeApp.toggleBookmarksPanel()">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded transition duration-200" onclick="chromeApp.toggleHistoryPanel()">
                        <i class="fas fa-history"></i>
                    </button>
                </div>
                <div id="chrome-home-content" style="display:none;">
                    <div style="width:100%; min-height:calc(100vh - 56px - 48px); display:flex; align-items:flex-start; justify-content:center; background:rgba(0,0,0,0.15); padding-top:40px; padding-bottom:40px; box-sizing:border-box;">
                        <div style="width:100%;" class="flex flex-col gap-3">
                            <div style="display:flex; align-items:center; justify-content:center; gap:2.5rem; width:100%; flex-wrap:wrap;">
                                <div style="flex:1 1 0; min-width:320px; max-width:940px; background:rgba(255,255,255,0.18); box-shadow:0 8px 32px 0 rgba(31,38,135,0.37); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0; border:1.5px solid rgba(255,255,255,0.18); backdrop-filter:blur(14px) saturate(170%); -webkit-backdrop-filter:blur(14px) saturate(170%); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0;">
                                    <div style="font-size:2rem; font-weight:700; color:#fff; margin-bottom:0.4rem; width:100%; text-align:left;">Tech News</div>
                                    <div style="font-size:1.1rem; color:#fff; max-width:600px; width:100%; text-align:left; margin-bottom:1.2rem;">Latest technology updates from around the world.</div>
                                    <iframe src="https://www.bing.com/news/search?q=technology&FORM=HDRSC6" style="width:100%; height:320px; border-radius:1.5rem; border:none; box-shadow:0 4px 32px #0008; background:#fff;" allowfullscreen loading="lazy"></iframe>
                                </div>
                                <div style="flex:1 1 0; min-width:320px; max-width:540px; background:rgba(255,255,255,0.18); box-shadow:0 8px 32px 0 rgba(31,38,135,0.37); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0; border:1.5px solid rgba(255,255,255,0.18); backdrop-filter:blur(14px) saturate(170%); -webkit-backdrop-filter:blur(14px) saturate(170%); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0;">
                                    <div style="font-size:2rem; font-weight:700; color:#fff; margin-bottom:0.4rem; width:100%; text-align:left;">Economy News</div>
                                    <div style="font-size:1.1rem; color:#fff; max-width:600px; width:100%; text-align:left; margin-bottom:1.2rem;">Latest economy and finance headlines.</div>
                                    <iframe src="https://www.bing.com/news/search?q=economy&FORM=HDRSC6" style="width:100%; height:320px; border-radius:1.5rem; border:none; box-shadow:0 4px 32px #0008; background:#fff;" allowfullscreen loading="lazy"></iframe>
                                </div>
                            </div>
                            <div style="display:flex; align-items:center; justify-content:center; gap:2.5rem; width:100%; flex-wrap:wrap;" class:"mt-2">
                                <div style="flex:1 1 0; min-width:320px; max-width:540px; background:rgba(255,255,255,0.18); box-shadow:0 8px 32px 0 rgba(31,38,135,0.37); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0; border:1.5px solid rgba(255,255,255,0.18); backdrop-filter:blur(14px) saturate(170%); -webkit-backdrop-filter:blur(14px) saturate(170%); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0;">
                                    <div style="font-size:2rem; font-weight:700; color:#fff; margin-bottom:0.4rem; width:100%; text-align:left;">Cricket News</div>
                                    <div style="font-size:1.1rem; color:#fff; max-width:600px; width:100%; text-align:left; margin-bottom:1.2rem;">Latest Cricket updates.</div>
                                    <iframe src="https://www.bing.com/news/search?q=cricket&FORM=HDRSC6" style="width:100%; height:320px; border-radius:1.5rem; border:none; box-shadow:0 4px 32px #0008; background:#fff;" allowfullscreen loading="lazy"></iframe>
                                </div>
                                <div style="flex:1 1 0; min-width:320px; max-width:940px; background:rgba(255,255,255,0.18); box-shadow:0 8px 32px 0 rgba(31,38,135,0.37); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0; border:1.5px solid rgba(255,255,255,0.18); backdrop-filter:blur(14px) saturate(170%); -webkit-backdrop-filter:blur(14px) saturate(170%); border-radius:1.5rem; padding:2rem 1.5rem; box-sizing:border-box; margin-bottom:0;">
                                    <div style="font-size:2rem; font-weight:700; color:#fff; margin-bottom:0.4rem; width:100%; text-align:left;">software News</div>
                                    <div style="font-size:1.1rem; color:#fff; max-width:600px; width:100%; text-align:left; margin-bottom:1.2rem;">Latest software Developer and AI headlines.</div>
                                    <iframe src="https://www.bing.com/news/search?q=software+developer+AI&FORM=HDRSC6" style="width:100%; height:320px; border-radius:1.5rem; border:none; box-shadow:0 4px 32px #0008; background:#fff;" allowfullscreen loading="lazy"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <iframe id="browser-iframe" src="${this.currentUrl}" class="browser-content" style="position:relative; z-index:1; background:transparent;"></iframe>
                <div class="browser-footer" style="position:fixed; bottom:0; left:0; right:0; box-shadow:0 -2px 8px #0002;">
                    <span id="browser-status">Loaded: about:blank</span>
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
        setTimeout(function () {
            try {
                var iframe = document.getElementById('browser-iframe');
                var homeContent = document.getElementById('chrome-home-content');
                if (iframe && homeContent) {
                    function toggleHomeContent() {
                        var src = iframe.src || '';
                        if (
                            src.endsWith('about:blank') ||
                            src === '' ||
                            src === 'about:blank' ||
                            src.endsWith('/about:blank') ||
                            src === window.location.origin + '/about:blank' ||
                            src === window.location.protocol + '//' + window.location.host + '/about:blank'
                        ) {
                            homeContent.style.display = 'block';
                            iframe.style.display = 'none';
                        } else {
                            homeContent.style.display = 'none';
                            iframe.style.display = 'block';
                        }
                    }
                    iframe.addEventListener('load', toggleHomeContent);
                    toggleHomeContent();
                }
            } catch (e) { console.error(e); }
        }, 400);
        return appContent;
        // Show carousel on about:blank
        setTimeout(function () {
            try {
                var iframe = document.getElementById("browser-iframe");
                var carousel = document.getElementById("chrome-home-carousel");
                if (iframe && carousel) {
                    function showApexHomeIfBlank() {
                        var src = iframe.src || "";
                        if (
                            src.endsWith("about:blank") ||
                            src === "" ||
                            src === "about:blank" ||
                            src.endsWith("/about:blank") ||
                            src === window.location.origin + "/about:blank" ||
                            src ===
                            window.location.protocol +
                            "//" +
                            window.location.host +
                            "/about:blank"
                        ) {
                            carousel.style.display = "flex";
                            carousel.style.visibility = "visible";
                            iframe.style.visibility = "hidden";
                        } else {
                            carousel.style.display = "none";
                            carousel.style.visibility = "hidden";
                            iframe.style.visibility = "visible";
                        }
                    }
                    iframe.addEventListener("load", showApexHomeIfBlank);
                    showApexHomeIfBlank();
                }
            } catch (e) {
                console.error(e);
            }
        }, 400);
    },

    // Search using selected engine and load in iframe
    searchFromForm: function () {
        var e = document.getElementById("search-engine-select");
        var urlPrefix = e.options[e.selectedIndex].value;
        var searchTerm = document
            .getElementById("browser-search-input")
            .value.trim();
        if (!searchTerm) {
            alert("Please enter a search term.");
            return;
        }
        var theUrl = urlPrefix + encodeURIComponent(searchTerm);
        this.loadUrl(theUrl);
        var gosearch = document.getElementById("gosearch");
        if (gosearch) gosearch.href = theUrl;
        this.lastUrl = theUrl;
    },

    initChromeApp: function () {
        this.renderBookmarksList();
        this.renderHistoryList();
        const iframe = document.getElementById("browser-iframe");
        if (iframe) {
            this.loadUrl(this.currentUrl); // Ensure iframe loads the currentUrl when the app is initialized
        }
        const urlInput = document.getElementById("browser-url-input");
        if (urlInput) urlInput.value = this.currentUrl;
    },

    loadUrl: function (url) {
        const iframe = document.getElementById("browser-iframe");
        const urlInput = document.getElementById("browser-url-input");
        const statusSpan = document.getElementById("browser-status");

        if (!iframe || !urlInput || !statusSpan) return;

        let formattedUrl = url;
        // Add https:// if missing, unless it's about:blank
        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://") &&
            url !== "about:blank"
        ) {
            formattedUrl = "https://" + url;
        }
        // Handle a common default search scenario if user types just a word (no dot)
        if (!formattedUrl.includes(".") && formattedUrl !== "about:blank") {
            // Open Bing search in a new tab to bypass iframe/CORS issues
            window.open(
                "https://bing.com/search?q=" + encodeURIComponent(formattedUrl),
                "_blank"
            );
            statusSpan.textContent = `Opened search for "${url}" in a new tab (Bing).`;
            // Keep the iframe on about:blank or previous valid page
            iframe.src = this.currentUrl;
            return; // Exit here as we've opened a new tab
        }

        statusSpan.textContent = `Loading ${formattedUrl}...`;
        urlInput.value = formattedUrl; // Update input field immediately

        // Clear iframe content for new load
        iframe.src = "about:blank"; // Clear current content
        // Use a timeout to ensure 'about:blank' loads before setting new src
        setTimeout(() => {
            try {
                iframe.src = formattedUrl; // Attempt to load the new URL
                this.currentUrl = formattedUrl; // Update internal currentUrl

                iframe.onload = () => {
                    let loadedUrl = "about:blank";
                    try {
                        loadedUrl = iframe.contentWindow.location.href;
                    } catch (e) {
                        // CORS security: cannot access cross-origin iframe content
                        console.warn(
                            "CORS blocked accessing iframe content. Displaying requested URL."
                        );
                        loadedUrl = formattedUrl; // Fallback to what we tried to load
                    }
                    statusSpan.textContent = `Loaded: ${loadedUrl}`;
                    urlInput.value = loadedUrl; // Update URL input with actual loaded URL or requested one
                    this.addToHistory(loadedUrl); // Add the actually loaded (or attempted) URL to history
                };
                iframe.onerror = () => {
                    // This will fire for network errors, not necessarily CORS
                    statusSpan.textContent = `Error loading ${formattedUrl}. This domain might block embedding (CORS Policy).`;
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(
                        `<div class="p-4 text-red-500">
                                <h3>Error Loading Page</h3>
                                <p>Could not load <strong>${formattedUrl}</strong>.</p>
                                <p>This is often due to **security restrictions (CORS Policy)** where websites prevent themselves from being embedded in iframes from other domains, or the URL is invalid/down.</p>
                                <p>Try a different URL or search directly on a new tab.</p>
                                <p>For example, try: ` +
                        `<span class="bg-gray-700 p-1 rounded">about:blank</span> or <span class="bg-gray-700 p-1 rounded">example.com</span></p>
                                </div>`
                    );
                    iframe.contentDocument.close();
                    this.currentUrl = "about:blank"; // Reset to blank on error
                };
            } catch (e) {
                console.error("Critical error setting iframe src:", e);
                iframe.src = "about:blank";
                statusSpan.textContent = `Critical error: Could not load ${url}.`;
                iframe.contentDocument.open();
                iframe.contentDocument.write(
                    `<div class="p-4 text-red-500">Critical Error: Cannot load ${url}.</div>`
                );
                iframe.contentDocument.close();
                this.currentUrl = "about:blank"; // Reset to blank on error
            }
        }, 50); // Small delay to ensure about:blank loads first
    },

    addToHistory: function (url) {
        // Check if the current URL is already the first in history (to avoid duplicates from iframe reloads)
        if (this.history.length > 0 && this.history[0].url === url) return;

        this.history.unshift({
            id: generateUniqueId(),
            url: url,
            time: new Date().toLocaleString(),
        });
        this.history = this.history.slice(0, 50); // Keep history to a max of 50 entries
        this.saveData();
        this.renderHistoryList();
    },

    renderHistoryList: function () {
        const historyList = document.getElementById("history-list");
        if (!historyList) return;
        historyList.innerHTML = "";
        if (this.history.length === 0) {
            historyList.innerHTML =
                '<p class="text-gray-400 text-center text-sm mt-4">No history yet.</p>';
            return;
        }
        this.history.forEach((entry) => {
            const div = document.createElement("div");
            div.className =
                "bg-gray-600 p-2 rounded text-xs truncate hover:bg-gray-500 cursor-pointer";
            div.innerHTML = `<p class="font-semibold">${entry.url}</p><p class="text-gray-400">${entry.time}</p>`;
            div.onclick = () => {
                this.loadUrl(entry.url);
                this.toggleHistoryPanel();
            };
            historyList.appendChild(div);
        });
    },

    clearHistory: function () {
        if (confirm("Are you sure you want to clear all Browse history?")) {
            this.history = [];
            this.saveData();
            this.renderHistoryList();
            alert("History cleared!");
        }
    },

    goBackHistory: function () {
        // Find the current URL in history
        const currentIndex = this.history.findIndex(
            (entry) => entry.url === this.currentUrl
        );
        // If current URL is found and there's an older entry (higher index in unshift-ed array)
        if (currentIndex !== -1 && currentIndex < this.history.length - 1) {
            const targetUrl = this.history[currentIndex + 1].url; // Go to older entry
            this.loadUrl(targetUrl);
        } else {
            alert("No previous page in history.");
        }
    },

    goForwardHistory: function () {
        // Find the current URL in history
        const currentIndex = this.history.findIndex(
            (entry) => entry.url === this.currentUrl
        );
        // If current URL is found and there's a newer entry (lower index in unshift-ed array)
        if (currentIndex > 0) {
            const targetUrl = this.history[currentIndex - 1].url; // Go to newer entry
            this.loadUrl(targetUrl);
        } else {
            alert("No next page in history.");
        }
    },

    toggleBookmarksPanel: function () {
        const panel = document.getElementById("bookmarks-panel");
        if (panel) {
            panel.classList.toggle("translate-x-full");
            if (!panel.classList.contains("translate-x-full")) {
                this.renderBookmarksList();
            }
        }
    },

    addBookmark: function () {
        const nameInput = document.getElementById("bookmark-name-input");
        const urlInput = document.getElementById("bookmark-url-input");
        if (!nameInput || !urlInput) return;

        const name = nameInput.value.trim();
        let url = urlInput.value.trim();

        if (name && url) {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }
            this.bookmarks.push({ id: generateUniqueId(), name: name, url: url });
            this.saveData();
            nameInput.value = "";
            urlInput.value = "";
            this.renderBookmarksList();
            alert("Bookmark added!");
        } else {
            alert("Please enter both name and URL for the bookmark.");
        }
    },

    renderBookmarksList: function () {
        const bookmarksList = document.getElementById("bookmarks-list");
        if (!bookmarksList) return;
        bookmarksList.innerHTML = "";
        if (this.bookmarks.length === 0) {
            bookmarksList.innerHTML =
                '<p class="text-gray-400 text-center text-sm mt-4">No bookmarks yet.</p>';
            return;
        }
        this.bookmarks.forEach((bookmark) => {
            const div = document.createElement("div");
            div.className =
                "bg-gray-600 p-2 rounded text-xs truncate flex justify-between items-center";
            div.innerHTML = `
                        <span class="cursor-pointer hover:underline" onclick="chromeApp.loadUrl('${bookmark.url}'); chromeApp.toggleBookmarksPanel();">${bookmark.name}</span>
                        <button class="text-red-400 hover:text-red-500 ml-2" onclick="chromeApp.deleteBookmark('${bookmark.id}')"><i class="fas fa-trash-alt"></i></button>
                    `;
            bookmarksList.appendChild(div);
        });
    },

    deleteBookmark: function (id) {
        if (confirm("Are you sure you want to delete this bookmark?")) {
            this.bookmarks = this.bookmarks.filter((b) => b.id !== id);
            this.saveData();
            this.renderBookmarksList();
            alert("Bookmark deleted!");
        }
    },

    toggleHistoryPanel: function () {
        const panel = document.getElementById("history-panel");
        if (panel) {
            panel.classList.toggle("translate-x-full");
            if (!panel.classList.contains("translate-x-full")) {
                this.renderHistoryList();
            }
        }
    },
};

// --- Recycle Bin App ---
window.recycleBinApp = {
    items: loadFromLocalStorage("recycleBinApp_items", []),

    saveItems: function () {
        saveToLocalStorage("recycleBinApp_items", this.items);
        this.updateRecycleBinList(); // Ensure the list updates after save
    },

    addItem: function (item) {
        this.items.unshift(item);
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
        const listContainer = document.getElementById("recycle-bin-list");
        if (!listContainer) return;
        listContainer.innerHTML = "";

        if (this.items.length === 0) {
            listContainer.innerHTML = `
                        <div class="text-center flex flex-col items-center justify-center h-full p-4">
                            <i class="fas fa-trash-alt text-6xl text-gray-500 mb-4"></i>
                            <p class="text-xl text-gray-400">Recycle Bin is empty</p>
                        </div>
                    `;
            return;
        }

        this.items.forEach((item) => {
            const div = document.createElement("div");
            div.className = "recycle-bin-item";
            div.innerHTML = `
                        <input type="checkbox" data-item-id="${item.id
                }" class="mr-3">
                        <i class="${item.icon || "fas fa-file"
                } mr-2 text-gray-400"></i>
                        <span>${item.name
                } <span class="text-gray-400 text-xs">(${item.originalPath
                })</span></span>
                    `;
            listContainer.appendChild(div);
        });
    },

    getSelectedItems: function () {
        const checkboxes = document.querySelectorAll(
            '#recycle-bin-list input[type="checkbox"]:checked'
        );
        return Array.from(checkboxes).map((cb) =>
            this.items.find((item) => item.id === cb.dataset.itemId)
        );
    },

    restoreSelected: function () {
        const selected = this.getSelectedItems();
        if (selected.length === 0) {
            alert("No items selected to restore.");
            return;
        }

        selected.forEach((item) => {
            // Try to restore to original path
            const pathParts = item.originalPath.split("/");
            const itemName = pathParts.pop();
            const parentPath = pathParts.join("/"); // e.g., "Desktop" or "This PC/Local Disk (C:)/Users/User"

            let targetCollection;
            let isDesktopRestore = false;

            if (parentPath.startsWith("Desktop")) {
                // Item originated from Desktop
                isDesktopRestore = true;
                // If parentPath is just "Desktop", target is fileSystemApp.desktopItems itself
                if (parentPath === "Desktop") {
                    targetCollection = window.fileSystemApp.desktopItems;
                } else {
                    // It's a nested desktop folder, e.g., "Desktop/MyFolder"
                    const desktopFolderRelativePath = parentPath.substring(
                        "Desktop/".length
                    );
                    const desktopFolderItem = window.fileSystemApp.getItem(
                        desktopFolderRelativePath,
                        true
                    );
                    if (desktopFolderItem && desktopFolderItem.content) {
                        targetCollection = desktopFolderItem.content;
                    } else {
                        targetCollection = null; // Parent desktop folder not found
                    }
                }
            } else {
                // Item originated from main file system (This PC)
                targetCollection = window.fileSystemApp.getDirectory(parentPath);
            }

            if (targetCollection) {
                if (!targetCollection[itemName]) {
                    // Only restore if target location doesn't have item with same name
                    targetCollection[itemName] = {
                        // Restore the item with its properties
                        icon: item.icon,
                        type: item.type,
                        content:
                            item.content ||
                            (item.type === "folder" || item.type === "drive" ? {} : ""),
                    };
                    window.fileSystemApp.saveStructure(); // Save both FS and desktopItems
                    alert(`Restored ${item.name} to ${item.originalPath}.`);

                    // Re-render affected views
                    if (isDesktopRestore) {
                        window.desktopManager.renderDesktopIcons();
                    } else if (document.querySelector("#window_thispc .window-body")) {
                        window.fileSystemApp.renderFileExplorer(
                            window.fileSystemApp.currentPath
                        );
                    }
                } else {
                    alert(
                        `Could not restore ${item.name}. An item with that name already exists at ${item.originalPath}.`
                    );
                }
            } else {
                alert(
                    `Could not restore ${item.name}. Original path parent not found.`
                );
            }
        });
        this.items = this.items.filter((item) => !selected.includes(item));
        this.saveItems();
        // After restoring, it might be good to re-render the file explorer if it's open
        if (document.querySelector("#window_thispc .window-body")) {
            window.fileSystemApp.renderFileExplorer(window.fileSystemApp.currentPath);
        }
    },

    deleteSelected: function () {
        const selected = this.getSelectedItems();
        if (selected.length === 0) {
            alert("No items selected to delete.");
            return;
        }
        if (
            !confirm(
                `Are you sure you want to permanently delete ${selected.length} item(s)? This cannot be undone.`
            )
        )
            return;

        this.items = this.items.filter((item) => !selected.includes(item));
        this.saveItems();
        alert(`${selected.length} item(s) permanently deleted.`);
    },

    emptyBin: function () {
        if (this.items.length === 0) {
            alert("Recycle Bin is already empty.");
            return;
        }
        if (
            !confirm(
                "Are you sure you want to permanently empty the Recycle Bin? All items will be lost."
            )
        )
            return;

        this.items = [];
        this.saveItems();
        alert("Recycle Bin emptied!");
    },
};

// --- Desktop Manager (for Wallpaper & Desktop Context Menu) ---
window.desktopManager = {
    applyWallpaper: function () {
        // Always use apexos_wallpaper from localStorage
        let savedWallpaper = localStorage.getItem("apexos_wallpaper");
        if (!savedWallpaper) {
            savedWallpaper = "assets/bg-1.png";
            localStorage.setItem("apexos_wallpaper", savedWallpaper);
        }
        document.body.style.backgroundImage = `url('${savedWallpaper}')`;
    },

    changeWallpaperPrompt: function () {
        const newWallpaperUrl = prompt(
            "Enter new wallpaper URL (e.g., from Unsplash):",
            this.currentWallpaper
        );
        if (newWallpaperUrl && newWallpaperUrl.trim() !== "") {
            this.currentWallpaper = newWallpaperUrl.trim();
            saveToLocalStorage("desktop_wallpaper", this.currentWallpaper);
            this.applyWallpaper();
            alert("Wallpaper changed successfully!");
        } else if (newWallpaperUrl !== null) {
            // User clicked OK but entered empty
            alert("Wallpaper URL cannot be empty.");
        }
    },

    // New function to render desktop icons from desktopItems
    renderDesktopIcons: function () {
        const desktopDiv = document.getElementById("desktop");
        if (!desktopDiv) return;

        // Clear existing dynamically added icons
        Array.from(desktopDiv.children).forEach((child) => {
            // Dynamically added items have IDs starting with 'desktop_item_' or 'desktop_dynamic_item_'
            if (
                child.id.startsWith("desktop_item_") ||
                child.id.startsWith("desktop_dynamic_item_")
            ) {
                child.remove();
            }
        });

        let nextTopForDynamic = 4; // Starting position for new icons, offset from top of desktop div
        const dynamicLeftStart = 90; // Starting left position for dynamic icons, after hardcoded ones
        const iconHeight = 106; // Approx. height of an icon + margin. You can adjust this.

        // Re-position hardcoded icons first (if they exist) and find the next available top position
        const hardcodedIcons = [
            "desktop_thispc_icon",
            "desktop_chrome_icon",
            "desktop_notes_icon",
            "desktop_recyclebin_icon",
        ];
        hardcodedIcons.forEach((id, index) => {
            const icon = document.getElementById(id);
            if (icon) {
                icon.style.top = `${4 + index * iconHeight}px`;
                icon.style.left = `4px`;
                nextTopForDynamic = Math.max(
                    nextTopForDynamic,
                    4 + (index + 1) * iconHeight
                ); // Ensure dynamic items start below last hardcoded
            }
        });

        const sortedItems = Object.entries(window.fileSystemApp.desktopItems).sort(
            ([nameA, itemA], [nameB, itemB]) => {
                const isDirA = itemA.type === "folder" || itemA.type === "drive";
                const isDirB = itemB.type === "folder" || itemB.type === "drive";
                if (isDirA && !isDirB) return -1;
                if (!isDirA && isDirB) return 1;
                return nameA.localeCompare(nameB);
            }
        );

        sortedItems.forEach(([name, item]) => {
            const div = document.createElement("div");
            // Use a more predictable ID for dynamic items for easier reference in context menu
            const itemId = `desktop_dynamic_item_${name
                .replace(/\s/g, "_")
                .toLowerCase()}`;
            div.id = itemId;
            div.className =
                "text-center cursor-pointer p-2 hover:bg-white/10 rounded";
            div.style.position = "absolute"; // Explicitly set position
            div.style.top = `${nextTopForDynamic}px`;
            div.style.left = `${dynamicLeftStart}px`; // Dynamic items start at a different X position
            div.style.width = "80px"; // Match fe-item width

            let iconClass =
                item.icon || (item.type === "folder" ? "fas fa-folder" : "fas fa-file");

            div.innerHTML = `
                        <i class="${iconClass} text-4xl mx-auto ${item.type === "folder" ? "text-yellow-400" : "text-gray-400"
                }"></i>
                        <p class="text-sm mt-1">${name}</p>
                    `;
            div.ondblclick = () => {
                if (item.type === "folder") {
                    // Open a new File Explorer window for this desktop folder
                    window.windowManager.createWindow(
                        `Desktop - ${name}`,
                        window.desktopManager.renderFileExplorerForDesktopFolder(name), // Pass just the folder name
                        "700px",
                        "500px",
                        `window_desktop_folder_${name.replace(/\s/g, "").toLowerCase()}`
                    );
                } else if (item.type === "file") {
                    fileSystemApp.openFile(name, true); // Pass true to indicate desktop context
                }
            };
            div.oncontextmenu = (e) => {
                e.preventDefault();
                // For dynamic desktop icons, use 'desktop-icon' type so context menu logic works
                // Also ensure the menu is not blocked by another open menu
                hideContextMenu();
                setTimeout(() => {
                    fileSystemApp.showContextMenu(e, name, "desktop-icon", true);
                }, 10);
            };
            desktopDiv.appendChild(div);

            nextTopForDynamic += iconHeight; // Move to next position
        });
    },

    // New function to render content of a desktop folder in a new FE window
    // folderName: This is the name of the folder directly under desktopItems (e.g., "My Desktop Folder")
    renderFileExplorerForDesktopFolder: function (folderName) {
        // Get the content of the specified desktop folder
        const folderItem = window.fileSystemApp.getItem(folderName, true);
        const folderContent = folderItem ? folderItem.content : null;

        let html = `
                    <div class="fe-toolbar">
                        <button class="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-sm" onclick="this.closest('.window').remove()">
                            <i class="fas fa-times"></i> Close
                        </button>
                        <input type="text" class="fe-path-input" value="Desktop/${folderName}" readonly>
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm" onclick="fileSystemApp.createItemPrompt('folder', true, 'Desktop/${folderName}')">
                            <i class="fas fa-folder-plus mr-1"></i> New Folder
                        </button>
                           <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm" onclick="fileSystemApp.createItemPrompt('file', true, 'Desktop/${folderName}')">
                            <i class="fas fa-file-medical mr-1"></i> New File
                        </button>
                    </div>
                    <div class="fe-content">
                        <div class="fe-main" oncontextmenu="event.preventDefault(); fileSystemApp.showContextMenu(event, 'Desktop/${folderName}', 'folder-bg', true)">`;

        if (!folderContent || typeof folderContent !== "object") {
            html += `<div class="text-center w-full mt-8 text-gray-400">
                               <i class="fas fa-exclamation-circle text-5xl mb-4"></i>
                               <p>Cannot display content. This is not a folder or is empty.</p>
                             </div>`;
        } else {
            const items = Object.entries(folderContent).sort(
                ([nameA, itemA], [nameB, itemB]) => {
                    const isDirA = itemA.type === "folder";
                    const isDirB = itemB.type === "folder";
                    if (isDirA && !isDirB) return -1;
                    if (!isDirA && isDirB) return 1;
                    return nameA.localeCompare(nameB);
                }
            );

            if (items.length === 0) {
                html += `<div class="text-center w-full mt-8 text-gray-400">
                                   <i class="fas fa-folder-open text-5xl mb-4"></i>
                                   <p>This folder is empty.</p>
                                  </div>`;
            } else {
                items.forEach(([name, item]) => {
                    const fullPathInDesktopContext = `${folderName}/${name}`; // Path for context menu within desktopItems
                    let iconClass =
                        item.icon ||
                        (item.type === "folder" ? "fas fa-folder" : "fas fa-file");
                    let clickAction = "";

                    if (item.type === "folder") {
                        clickAction = `window.windowManager.createWindow('Desktop - ${name}', window.desktopManager.renderFileExplorerForDesktopFolder('${fullPathInDesktopContext}'), '700px', '500px', 'window_desktop_folder_${fullPathInDesktopContext
                            .replace(/\s/g, "")
                            .toLowerCase()}')`;
                    } else if (item.type === "file") {
                        clickAction = `fileSystemApp.openFile('${fullPathInDesktopContext}', true)`;
                    }

                    html += `
                                <div class="fe-item" ondblclick="${clickAction}" oncontextmenu="event.preventDefault(); fileSystemApp.showContextMenu(event, '${fullPathInDesktopContext}', '${item.type
                        }', true)">
                                    <i class="${iconClass} ${item.type === "folder" ? "text-yellow-400" : "text-gray-400"
                        }"></i>
                                    <p>${name}</p>
                                </div>
                            `;
                });
            }
        }
        html += `</div></div>`;
        return html;
    },

    // This function handles the desktop background right-click
    showDesktopContextMenu: function (event) {
        event.preventDefault(); // Prevent default browser context menu
        hideContextMenu(); // Ensure no other context menus are open

        // Display a context menu for the desktop background
        window.fileSystemApp.showContextMenu(
            event,
            "desktop-root",
            "desktop-bg",
            true
        );
    },
};

// --- Modern Wallpaper & Theme Palette Context Menu ---
(function () {
    const wallpapers = [
        "assets/bg-1.png",
        "assets/bg-2.png",
        "assets/bg-3.png",
        "assets/bg-4.png",
    ];
    const themeColors = [
        {
            name: "Glass",
            color: "rgba(45,53,72,0.7)",
            taskbar: "rgba(24,24,27,0.7)",
        },
        { name: "Dark", color: "#18181b", taskbar: "rgba(24,24,27,0.95)" },
        { name: "Maroon", color: "#7b2222", taskbar: "rgba(123,34,34,0.95)" },
        { name: "Yellow", color: "#fbbf24", taskbar: "rgba(251,191,36,0.95)" },
        { name: "Green", color: "#22c55e", taskbar: "rgba(34,197,94,0.95)" },
        { name: "Blue", color: "#2563eb", taskbar: "rgba(37,99,235,0.95)" },
        { name: "Red", color: "#ef4444", taskbar: "rgba(239,68,68,0.95)" },
        { name: "Purple", color: "#a21caf", taskbar: "rgba(162,28,175,0.95)" },
    ];
    // Set default wallpaper (4th)
    // Robust: Always use saved wallpaper if present, else set default
    let savedWallpaper = localStorage.getItem("apexos_wallpaper");
    if (!savedWallpaper) {
        savedWallpaper = wallpapers[0];
        localStorage.setItem("apexos_wallpaper", savedWallpaper);
    }
    document.body.style.backgroundImage = `url('${savedWallpaper}')`;
    function showPaletteMenu(x, y) {
        hideContextMenu();
        const menu = document.createElement("div");
        menu.id = "paletteMenu";
        menu.className = "context-menu";
        // Always show menu at center above taskbar for reliability
        const winW = window.innerWidth;
        const menuW = 340;
        menu.style.left = winW / 2 - menuW / 2 + "px";
        menu.style.bottom = "60px";
        menu.style.top = "";
        menu.style.width = menuW + "px";
        // Get current wallpaper from localStorage
        const currentWallpaper = localStorage.getItem("apexos_wallpaper");
        menu.innerHTML = `
            <div class='context-menu-item font-bold'>Theme & Wallpaper</div>
            <div class='flex gap-2 mb-2 ml-3'>
                ${themeColors
                .map(
                    (t, i) =>
                        `<button class='palette-color' data-idx='${i}' style='background:${t.taskbar};width:28px;height:28px;border-radius:50%;border:2px solid #fff;'></button>`
                )
                .join("")}
            </div>
            <div class='wallpaper-grid'>
                ${wallpapers
                .map(
                    (url, idx) =>
                        `<img src='${url}' class='wallpaper-thumb${currentWallpaper === url
                            ? " wallpaper-thumb-selected"
                            : ""
                        }' data-url='${url}' />`
                )
                .join("")}
            </div>
            <div class='context-menu-item'><label style='cursor:pointer;'><input type='file' id='wallpaperUpload' name='wallpaperUpload' accept='image/*' style='display:none;' />Upload Custom Wallpaper</label></div>
            <div class='context-menu-item'>
                <input type='text' id='wallpaperUrlInput' placeholder='Paste image URL...' style='width:70%;padding:4px 8px;border-radius:6px;border:1px solid #ccc;margin-right:6px;'>
                <button id='setWallpaperUrlBtn' class='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded'>Set</button>
            </div>
        `;
        document.body.appendChild(menu);
        // Highlight the 4th wallpaper as selected by default if nothing is set
        if (!currentWallpaper || !wallpapers.includes(currentWallpaper)) {
            const thumbs = menu.querySelectorAll(".wallpaper-thumb");
            if (thumbs[3]) thumbs[3].classList.add("wallpaper-thumb-selected");
        }
        // Theme color click
        menu.querySelectorAll(".palette-color").forEach((btn) => {
            btn.onclick = function () {
                const idx = parseInt(btn.dataset.idx);
                const t = themeColors[idx];
                const taskbar = document.getElementById("taskbar");
                if (taskbar) taskbar.style.backgroundColor = t.taskbar;
                hideContextMenu();
            };
        });
        // Wallpaper click
        menu.querySelectorAll(".wallpaper-thumb").forEach((img) => {
            img.onclick = function () {
                localStorage.setItem("apexos_wallpaper", img.dataset.url);
                document.body.style.backgroundImage = `url('${img.dataset.url}')`;
                // Visually select the clicked wallpaper
                menu
                    .querySelectorAll(".wallpaper-thumb")
                    .forEach((t) => t.classList.remove("wallpaper-thumb-selected"));
                img.classList.add("wallpaper-thumb-selected");
                hideContextMenu();
            };
        });
        // Upload
        const fileInput = menu.querySelector("#wallpaperUpload");
        fileInput.addEventListener("change", function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    document.body.style.backgroundImage = `url('${evt.target.result}')`;
                    localStorage.setItem("apexos_wallpaper", evt.target.result);
                    // Remove selection from all thumbnails
                    menu
                        .querySelectorAll(".wallpaper-thumb")
                        .forEach((t) => t.classList.remove("wallpaper-thumb-selected"));
                    hideContextMenu();
                };
                reader.readAsDataURL(file);
            }
        });
        // Set wallpaper from URL
        const urlInput = menu.querySelector("#wallpaperUrlInput");
        const urlBtn = menu.querySelector("#setWallpaperUrlBtn");
        urlBtn.onclick = function () {
            const url = urlInput.value.trim();
            if (url) {
                document.body.style.backgroundImage = `url('${url}')`;
                localStorage.setItem("apexos_wallpaper", url);
                menu
                    .querySelectorAll(".wallpaper-thumb")
                    .forEach((t) => t.classList.remove("wallpaper-thumb-selected"));
                hideContextMenu();
            }
        };
        document.addEventListener("mousedown", hideMenuOnClick);
        function hideMenuOnClick(e) {
            if (!menu.contains(e.target)) {
                hideContextMenu();
                document.removeEventListener("mousedown", hideMenuOnClick);
            }
        }
    }
    // Add palette button to taskbar (robust event listener)
    function setupPaletteBtn() {
        const paletteBtn = document.getElementById("themeToggleDash");
        if (paletteBtn) {
            paletteBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                const rect = paletteBtn.getBoundingClientRect();
                showPaletteMenu(rect.left, rect.bottom + 8);
            });
        } else {
            // Retry after short delay if not found (for dynamic DOM)
            setTimeout(setupPaletteBtn, 500);
        }
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupPaletteBtn);
    } else {
        setupPaletteBtn();
    }
})();

// --- Dashboard Theme Toggle ---
(function () {
    const themeColors = [
        {
            name: "Glass",
            color: "rgba(45,53,72,0.7)",
            taskbar: "rgba(24,24,27,0.7)",
        },
        { name: "Dark", color: "#18181b", taskbar: "rgba(24,24,27,0.95)" },
        { name: "Maroon", color: "#7b2222", taskbar: "rgba(123,34,34,0.95)" },
        { name: "Yellow", color: "#fbbf24", taskbar: "rgba(251,191,36,0.95)" },
        { name: "Green", color: "#22c55e", taskbar: "rgba(34,197,94,0.95)" },
        { name: "Blue", color: "#2563eb", taskbar: "rgba(37,99,235,0.95)" },
        { name: "Red", color: "#ef4444", taskbar: "rgba(239,68,68,0.95)" },
        { name: "Purple", color: "#a21caf", taskbar: "rgba(162,28,175,0.95)" },
    ];
    let current = 0;
    function applyTheme(idx) {
        const t = themeColors[idx];
        const taskbar = document.getElementById("taskbar");
        if (taskbar) taskbar.style.backgroundColor = t.taskbar;
    }
    window.toggleDashboardTheme = function () {
        current = (current + 1) % themeColors.length;
        applyTheme(current);
    };
    // Set initial theme (glassmorphic)
    applyTheme(current);
})();

// --- Main Script Logic ---
document.addEventListener("DOMContentLoaded", () => {
    // Apply saved wallpaper on load
    window.desktopManager.applyWallpaper();
    // Render desktop icons from desktopItems on load
    window.desktopManager.renderDesktopIcons();

    // Handle Desktop Right-Click. The body's oncontextmenu now calls showDesktopContextMenu
    // And individual icons have their own oncontextmenu listeners.

    // Hide context menu if clicking anywhere else (global listener)
    // This is handled by the showContextMenu function now, adding a temporary listener
    // Re-added the basic function for clarity that it's global
    document.addEventListener("click", (e) => {
        const existingMenu = document.getElementById("contextMenu");
        if (existingMenu && !existingMenu.contains(e.target)) {
            existingMenu.remove();
        }
    });

    // --- Start Menu Logic ---
    const startBtn = document.getElementById("startBtn");
    const startMenu = document.getElementById("startMenu");
    const taskbar = document.getElementById("taskbar");
    let isStartOpen = false;

    if (startBtn && startMenu && taskbar) {
        startBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const startBtnRect = startBtn.getBoundingClientRect();
            const taskbarHeight = taskbar.offsetHeight;

            // Temporarily unhide to get actual dimensions for positioning
            startMenu.classList.remove("hidden");
            const startMenuWidth = startMenu.offsetWidth;

            // Calculate position for Start Menu to appear above the Start button, centered
            const menuLeft =
                startBtnRect.left + startBtnRect.width / 0 - startMenuWidth / 0;
            const menuBottom = taskbarHeight; // Align with the top of the taskbar

            startMenu.style.left = `${menuLeft}px`;
            startMenu.style.bottom = `${menuBottom}px`;

            if (!isStartOpen) {
                // Apply position *before* animation for smooth effect from correct start
                startMenu.classList.remove("hidden");
                gsap.fromTo(
                    startMenu,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
                isStartOpen = true;
            } else {
                gsap.to(startMenu, {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        startMenu.classList.add("hidden");
                        isStartOpen = false;
                    },
                });
            }
        });

        document.addEventListener("mousedown", (e) => {
            if (
                isStartOpen &&
                !startMenu.contains(e.target) &&
                !startBtn.contains(e.target)
            ) {
                gsap.to(startMenu, {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        startMenu.classList.add("hidden");
                        isStartOpen = false;
                    },
                });
            }
        });
    }

    // --- Desktop Icon Drag ---
    const desktop = document.getElementById("desktop");
    let activeDraggableIcon = null;
    let initialIconX, initialIconY, currentIconX, currentIconY;

    // Initial positioning of desktop icons for consistent layout
    // Hardcoded icons already have inline styles. Dynamic icons will be positioned by renderDesktopIcons.
    // We ensure existing hardcoded app icons have their absolute positions set initially.
    const hardcodedDesktopIcons = [
        document.getElementById("desktop_thispc_icon"),
        document.getElementById("desktop_chrome_icon"),
        document.getElementById("desktop_notes_icon"),
        document.getElementById("desktop_recyclebin_icon"),
    ];
    const iconSpacing = 106; // Approx. height of an icon + margin. You can adjust this.
    hardcodedDesktopIcons.forEach((icon, index) => {
        if (icon) {
            // Check if element exists
            icon.style.top = `${4 + index * iconSpacing}px`;
            icon.style.left = `4px`;
        }
    });

    desktop.addEventListener("mousedown", (e) => {
        const targetIcon = e.target.closest("#desktop > div");
        // Ensure we are clicking on an icon and not dragging an already active window
        // Check if the target is indeed a desktop icon and not part of an open window
        if (targetIcon && !e.target.closest(".window")) {
            activeDraggableIcon = targetIcon;
            initialIconX =
                e.clientX - activeDraggableIcon.getBoundingClientRect().left;
            initialIconY =
                e.clientY - activeDraggableIcon.getBoundingClientRect().top;
            activeDraggableIcon.style.zIndex = "50";
            activeDraggableIcon.style.cursor = "grabbing";
            activeDraggableIcon.classList.add("opacity-75"); // Visual feedback for dragging
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (!activeDraggableIcon) return;

        e.preventDefault();
        currentIconX = e.clientX - initialIconX;
        currentIconY = e.clientY - initialIconY;

        const minX = 0;
        const minY = 0;
        const maxX = window.innerWidth - activeDraggableIcon.offsetWidth;
        const maxY =
            window.innerHeight -
            activeDraggableIcon.offsetHeight -
            taskbar.offsetHeight;

        activeDraggableIcon.style.left = `${Math.max(
            minX,
            Math.min(currentIconX, maxX)
        )}px`;
        activeDraggableIcon.style.top = `${Math.max(
            minY,
            Math.min(currentIconY, maxY)
        )}px`;
    });

    document.addEventListener("mouseup", () => {
        if (activeDraggableIcon) {
            activeDraggableIcon.style.cursor = "pointer";
            activeDraggableIcon.classList.remove("opacity-75");
            activeDraggableIcon = null;
        }
    });

    // --- Clock ---
    function updateClock() {
        const clock = document.getElementById("clock");
        if (clock) {
            const now = new Date();
            const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
            const dateOptions = { month: "short", day: "numeric", year: "numeric" };
            const timeString = now.toLocaleTimeString("en-US", timeOptions);
            const dateString = now.toLocaleDateString("en-US", dateOptions);
            clock.innerHTML = `${timeString}<br>${dateString}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- App Opening Function ---
    window.openApp = function (name) {
        let id = "window_" + name.replace(/\s/g, "").toLowerCase();
        let iconClass = "";
        let title = name;
        let content = "";
        let width = "800px",
            height = "600px";

        switch (name) {
            case "VSCode":
                iconClass = "fab fa-vuejs";
                title = "VS Code (Reference)";
                width = "900px";
                height = "600px";
                content = `
                    <div class="flex h-full w-full glassmorph-vscode text-gray-200  overflow-hidden" style="min-height:400px;">
                        <div class="glassmorph-vscode-sidebar w-1/4 min-w-[180px] max-w-[240px] p-2 flex flex-col border-r border-gray-700">
                            <div class="font-bold text-xs mb-2 text-gray-400">EXPLORER</div>
                            <div class="flex-1 overflow-auto">
                                <ul class="text-xs space-y-1">
                                    <li><i class="fas fa-folder text-yellow-400 mr-1"></i> web-os-windows-style
                                        <ul class="ml-4 mt-1 space-y-1">
                                            <li><i class="fas fa-file-code text-blue-400 mr-1"></i> dashboard.html</li>
                                            <li><i class="fas fa-file-code text-blue-400 mr-1"></i> style.css</li>
                                            <li><i class="fas fa-folder text-yellow-400 mr-1"></i> js
                                                <ul class="ml-4 mt-1 space-y-1">
                                                    <li><i class="fas fa-file-code text-blue-400 mr-1"></i> script.js</li>
                                                    <li><i class="fas fa-file-code text-blue-400 mr-1"></i> apps.js</li>
                                                    <li><i class="fas fa-file-code text-blue-400 mr-1"></i> desktop.js</li>
                                                    <li><i class="fas fa-file-code text-blue-400 mr-1"></i> windows.js</li>
                                                    <li><i class="fas fa-file-code text-blue-400 mr-1"></i> auth.js</li>
                                                    <li><i class="fas fa-file-code text-blue-400 mr-1"></i> utils.js</li>
                                                </ul>
                                            </li>
                                            <li><i class="fas fa-folder text-yellow-400 mr-1"></i> assets
                                                <ul class="ml-4 mt-1 space-y-1">
                                                    <li><i class="fas fa-file-image text-green-400 mr-1"></i> bg.jpg</li>
                                                    <li><i class="fas fa-folder text-yellow-400 mr-1"></i> icons
                                                        <ul class="ml-4 mt-1 space-y-1">
                                                            <li><i class="fas fa-file-image text-green-400 mr-1"></i> chrome.svg</li>
                                                            <li><i class="fas fa-file-image text-green-400 mr-1"></i> notes-app.svg</li>
                                                            <li><i class="fas fa-file-image text-green-400 mr-1"></i> recycle-bin.svg</li>
                                                            <li><i class="fas fa-file-image text-green-400 mr-1"></i> start.svg</li>
                                                            <li><i class="fas fa-file-image text-green-400 mr-1"></i> this-pc.svg</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="flex-1 flex flex-col">
                            <div class="glassmorph-vscode-header px-4 py-2 text-xs border-b border-gray-700 flex items-center">
                                <i class="fas fa-file-code text-blue-400 mr-2"></i>
                                <span id="vscode-filename" class="font-semibold">index.html</span>
                            </div>
                            <textarea id="vscode-editor" class="flex-1 w-full bg-transparent text-xs font-mono p-4 outline-none resize-none text-gray-200" style="background:transparent; min-height:0; border:none;" spellcheck="false"><!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>Document</title>
</head>
<body>
    <!-- Start typing your HTML here... -->
</body>
</html>
                            </textarea>
                        </div>
                    </div>
                `;
                break;
            case "This PC":
                iconClass = "fas fa-desktop";
                content = window.fileSystemApp.renderFileExplorer("This PC");
                width = "900px";
                height = "600px";
                break;
            case "Chrome":
                iconClass = "fab fa-chrome";
                content = window.chromeApp.renderChromeApp();
                width = "960px";
                height = "700px";
                break;
            case "Notes":
                iconClass = "fas fa-sticky-note";
                content = window.notesApp.renderNotesApp();
                width = "700px";
                height = "550px";
                break;
            case "Recycle Bin":
                iconClass = "fas fa-trash-alt";
                content = window.recycleBinApp.renderRecycleBin();
                width = "550px";
                height = "400px";
                break;
            case "Terminal":
                iconClass = "fas fa-terminal";
                title = "Terminal";
                width = "700px";
                height = "400px";
                content = `
                    <div id="terminal-app" class="w-full h-full glassmorph-terminal font-mono text-sm p-2  overflow-auto flex flex-col border border-[#001f3f]"style="min-height:300px;">
                        <div id="terminal-output" style="flex:1 1 0%;overflow-y:auto;white-space:pre-wrap;"></div>
                        <div class="flex items-center mt-2">
                            <span class="text-green-400 pr-1 font-bold">C:\User&gt;</span>
                            <input id="terminal-input" type="text" class="flex-1 bg-transparent outline-none border-none text-green-200 placeholder-gray-400" autocomplete="off" autofocus />
                        </div>
                    </div>
                `;
                break;
            case "Poki Games":
                iconClass = "fas fa-gamepad";
                content = `
                    <div class='w-full h-full flex flex-col'>
                        <div class='mb-2 text-sm text-gray-200'>Enjoy free games from GameMonetize.com right here!</div>
                        <div class='flex gap-2 mb-2 justify-center'>
                            <button id='gm-home-btn' title='Home' style='width:38px;height:38px;display:flex;align-items:center;justify-content:center;background:rgba(55,65,81,0.85);color:#fff;border:none;border-radius:50%;font-size:1.3rem;cursor:pointer;box-shadow:0 2px 8px #0002;transition:background 0.2s;'>
                                <i class='fas fa-home'></i>
                            </button>
                        </div>
                        <div class='w-full h-[400px] rounded-lg overflow-hidden border border-gray-700 bg-black flex-1' id='gamemonetize-iframe-container'>
                            <div id='gamemonetize-iframe-custom' style='width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;'>
                                <button id='loadGameMonetizeIframe' style='padding:12px 24px;background:#10b981;color:#fff;border:none;border-radius:8px;font-size:1.1rem;cursor:pointer;'>
                                    <i class='fas fa-gamepad mr-2'></i>Load GameMonetize
                                </button>
                                <div class='text-xs text-gray-400 mt-2 ml-4'>Click to load games in a secure iframe.<br>Some browsers may block 3rd party iframes by default.</div>
                            </div>
                        </div>
                        <div class='text-xs text-gray-400 mt-2'>Games load from gamemonetize.com. Use at your own discretion.</div>
                    </div>`;
                width = "800px";
                height = "560px";
                setTimeout(() => {
                    const btn = document.getElementById("loadGameMonetizeIframe");
                    const homeBtn = document.getElementById("gm-home-btn");
                    let iframeLoaded = false;
                    if (btn) {
                        btn.onclick = function () {
                            const container = document.getElementById(
                                "gamemonetize-iframe-container"
                            );
                            if (container) {
                                container.innerHTML = `<iframe id='gm-iframe' src='https://gamemonetize.com/' width='100%' height='100%' style='border:0; min-height:360px; min-width:100%; background:#111;' allowfullscreen loading='lazy'></iframe>`;
                                iframeLoaded = true;
                                updateBtns();
                            }
                        };
                    }
                    function updateBtns() {
                        if (homeBtn) homeBtn.disabled = !iframeLoaded;
                        homeBtn.style.opacity = homeBtn.disabled ? "0.5" : "1";
                    }
                    if (homeBtn) {
                        homeBtn.onclick = function () {
                            if (iframeLoaded) {
                                const iframe = document.getElementById("gm-iframe");
                                if (iframe) {
                                    iframe.src = "https://gamemonetize.com/";
                                }
                            }
                        };
                    }
                    updateBtns();
                }, 100);
                break;
            default:
                iconClass = "fas fa-puzzle-piece";
                content = `<div class="p-4 text-center"><p>Application "${name}" not found.</p></div>`;
                width = "300px";
                height = "200px";
        }

        let win = document.getElementById(id);
        if (win) {
            window.windowManager.toggleWindowVisibility(id);
            if (name === "Notes") {
                win.querySelector(".window-body").innerHTML =
                    window.notesApp.renderNotesApp();
            }
            if (name === "Chrome") chromeApp.initChromeApp();
            if (name === "Recycle Bin") recycleBinApp.updateRecycleBinList();
            if (name === "Terminal") {
                setTimeout(() => {
                    const input = win.querySelector("#terminal-input");
                    if (input) input.focus();
                }, 100);
            }
            return;
        }

        win = window.windowManager.createWindow(title, content, width, height, id);
        window.taskbarManager.addTaskbarApp(id, title, iconClass);

        if (name === "Chrome") chromeApp.initChromeApp();
        if (name === "Recycle Bin") recycleBinApp.updateRecycleBinList();

        // --- Terminal App Logic ---
        if (name === "Terminal") {
            const output = win.querySelector("#terminal-output");
            const input = win.querySelector("#terminal-input");
            if (input && output) {
                let userName = null;
                let unlocked = false;
                const promptBase = () => `C:\\${userName ? userName : "User"}>`;
                const helpText = `Available commands:\nhelp - Show this help\necho [text] - Print text\ncolor [name] - Change text color\nclear - Clear the terminal\nmkdir [name] - Simulate making a directory\ndate - Show current date/time\nwhoami - Show your username`;
                let color = "green";
                function setColor(c) {
                    color = c;
                    output.style.color = c === "green" ? "#22d3ee" : c;
                    input.style.color = c === "green" ? "#22d3ee" : c;
                }
                setColor("green");
                function print(text) {
                    output.innerHTML += text + "\n";
                    output.scrollTop = output.scrollHeight;
                }
                // Ask for username first
                print("Welcome to Apex OS Terminal!");
                print("Please enter your name to unlock features:");
                input.placeholder = "Enter your name and press Enter...";
                input.value = "";
                input.focus();
                input.addEventListener("keydown", function handler(e) {
                    if (!unlocked && e.key === "Enter") {
                        userName = input.value.trim() || "User";
                        unlocked = true;
                        print(`Hello, ${userName}! Features unlocked.`);
                        print('Type "help" for a list of commands.');
                        input.value = "";
                        input.placeholder = "";
                        input.removeEventListener("keydown", handler);
                        enableTerminal();
                    }
                });
                function enableTerminal() {
                    input.addEventListener("keydown", function terminalHandler(e) {
                        if (e.key === "Enter") {
                            const cmd = input.value.trim();
                            print(`<span style='color:#888'>${promptBase()} ${cmd}</span>`);
                            handleCommand(cmd);
                            input.value = "";
                        }
                    });
                }
                function handleCommand(cmd) {
                    if (!cmd) return;
                    const [base, ...args] = cmd.split(" ");
                    switch (base.toLowerCase()) {
                        case "help":
                            print(helpText);
                            break;
                        case "echo":
                            print(args.join(" "));
                            break;
                        case "color":
                            if (args[0]) {
                                setColor(args[0]);
                                print(`Color changed to ${args[0]}`);
                            } else {
                                print("Usage: color [name]");
                            }
                            break;
                        case "clear":
                            output.innerHTML = "";
                            break;
                        case "mkdir":
                            if (args[0]) {
                                print(`Directory '${args[0]}' created.`);
                            } else {
                                print("Usage: mkdir [name]");
                            }
                            break;
                        case "date":
                            print(new Date().toString());
                            break;
                        case "whoami":
                            print(userName);
                            break;
                        default:
                            print(`'${base}' is not recognized as a command.`);
                    }
                }
                setTimeout(() => input.focus(), 100);
            }
        }

        if (name === "Chrome") {
            const iframe = win.querySelector("#browser-iframe");
            if (iframe) {
                // The loadUrl function now handles initial src setting and error messages
            }
        }
    };

    // --- Apex OS About App ---
    window.openAppApexOS = function () {
        const content = `
            <div class="flex flex-col items-center justify-center h-full w-full p-0">
                <div class="notes-glass-card w-full max-w-lg mt-16 text-center">
                    <div class="flex flex-col items-center mb-6">
                        <i class="fas fa-star text-5xl mb-2 text-yellow-400"></i>
                        <h2 class="text-3xl font-bold mb-2">Apex OS</h2>
                        <div class="text-lg mb-2">Made With ❤️ Mohan</div>
                    </div>
                    <div class="mb-4">
                        <div class="font-semibold text-lg mb-2">Created By: Mohan Kumar Dalei</div>
                        <div class="text-gray-300 mb-2">Connect with me:</div>
                        <div class="flex justify-center gap-4 mb-2">
                            <a href="https://www.linkedin.com/in/mohan-kumar-dalei/" target="_blank" class="text-blue-500 hover:underline"><i class="fab fa-linkedin fa-lg"></i> LinkedIn</a>
                            <a href="https://github.com/Mohan-Kumar-Dalei?tab=overview&from=2025-06-01&to=2025-06-30" target="_blank" class="text-gray-200 hover:underline"><i class="fab fa-github fa-lg"></i> GitHub</a>
                            <a href="https://www.instagram.com/ll_b._.i._.c._.k._.y_ll?igsh=MXZlbXNqMnEzMTl6cg==" target="_blank" class="text-pink-400 hover:underline"><i class="fab fa-instagram fa-lg"></i> Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        window.windowManager.createWindow(
            "Apex OS",
            content,
            "550px",
            "480px",
            "window_apexos"
        );
    };

    // Ensure double-click always opens the custom About window
    window.addEventListener("DOMContentLoaded", function () {
        const apexIcon = document.getElementById("desktop_apexos_icon");
        if (apexIcon) {
            apexIcon.ondblclick = function (e) {
                e.preventDefault();
                window.openAppApexOS();
                return false;
            };
            apexIcon.onclick = function (e) {
                e.preventDefault();
                window.openAppApexOS();
                return false;
            };
        }
    });
});
