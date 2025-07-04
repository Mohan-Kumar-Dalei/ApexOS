// js/desktop.js

function playSound(name) {
    const audio = new Audio(`assets/sounds/${name}.mp3`);
    audio.play();
}

function openApp(name) {
    playSound("click");

    if (name === "Notes") {
        openNotesApp();
    } else if (name === "This PC") {
        openExplorer();
    } else {
        alert(`${name} is opening...`);
    }
}

// 📝 Notes CRUD App
function openNotesApp() {
    const notesWin = createWindow("Notes App", 400, 300);
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const container = document.createElement("div");
    container.className = "p-4 space-y-2";
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Note";
    addBtn.className = "bg-blue-600 px-2 py-1 rounded";
    container.appendChild(addBtn);

    const list = document.createElement("div");
    container.appendChild(list);

    function renderNotes() {
        list.innerHTML = "";
        notes.forEach((note, index) => {
            const noteEl = document.createElement("div");
            noteEl.className = "flex items-center justify-between bg-white/10 p-2 rounded";
            const input = document.createElement("textarea");
            input.value = note;
            input.className = "w-full bg-transparent text-white resize-none";
            input.oninput = () => {
                notes[index] = input.value;
                saveNotes();
            };
            const del = document.createElement("button");
            del.textContent = "🗑";
            del.onclick = () => {
                playSound("trash");
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            };
            noteEl.appendChild(input);
            noteEl.appendChild(del);
            list.appendChild(noteEl);
        });
    }

    function saveNotes() {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    addBtn.onclick = () => {
        notes.push("New Note");
        saveNotes();
        renderNotes();
    };

    renderNotes();
    notesWin.body.appendChild(container);
}

// 📁 File Explorer
function openExplorer() {
    const win = createWindow("This PC", 450, 250);
    win.body.innerHTML = `
    <div class="p-4">
      <h2 class="text-lg font-bold mb-2">Drives</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/10 p-4 rounded">Local Disk (C:)</div>
        <div class="bg-white/10 p-4 rounded">Data (D:)</div>
      </div>
    </div>
  `;
}

// Recycle Bin Logic
function emptyRecycleBin() {
    localStorage.removeItem("deletedItems");
    alert("Recycle Bin emptied!");
    playSound("trash");
}

// 🪟 Reusable Window Creator
function createWindow(title, w = 300, h = 200) {
    const win = document.createElement("div");
    win.className = `absolute top-20 left-1/4 bg-gray-800 rounded shadow-xl text-white w-[${w}px] h-[${h}px] z-50`;
    win.style.width = w + "px";
    win.style.height = h + "px";
    win.style.resize = "both";
    win.style.overflow = "auto";
    win.style.position = "absolute";

    const header = document.createElement("div");
    header.className = "bg-gray-900 px-2 py-1 cursor-move flex justify-between";
    header.innerHTML = `<span>${title}</span><button onclick="this.parentElement.parentElement.remove()">❌</button>`;
    win.appendChild(header);

    const body = document.createElement("div");
    body.className = "p-2";
    win.appendChild(body);

    document.body.appendChild(win);

    dragElement(win, header);
    return { win, body };
}

// 🖱 Drag Function
function dragElement(elmnt, dragHandle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    dragHandle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
