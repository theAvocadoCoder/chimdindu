interface Note {
  id: string;
  text: string;
  date: string;
}

const STORAGE_KEY = "notes";

export function initNotes() {
  const section = document.getElementById("notes")!;
  section.innerHTML = `
    <div class="w-full max-w-xl flex flex-col justify-center gap-4 my-4 text-center">
      <h2 class="text-2xl font-bold text-red-500">Your Personal Notes</h2>
      <textarea id="msgInput" class="w-full h-24 p-2 border rounded-md"
        placeholder="Write something fun..."></textarea>
      <div class="flex justify-center gap-4">
        <button id="postBtn" class="px-4 py-2 bg-red-600 text-white rounded-lg">Post</button>
        <button id="clearBtn" class="px-4 py-2 bg-gray-700 text-white rounded-lg">Clear</button>
      </div>
      <div id="msgList" class="px-4 py-2 text-left max-h-1/2 overflow-y-auto"></div>
    </div>
  `;

  const input = section.querySelector("#msgInput") as HTMLTextAreaElement;
  const list = section.querySelector("#msgList") as HTMLElement;

  function getNotes(): Note[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  }

  function saveNotes(msgs: Note[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  }

  function deleteNote(btn: Element) {
    const div = list.querySelector(`div:has( #${btn.id})`);
    if (div) {
      if (confirm(`Delete this note? "${div.querySelector("p")?.textContent}"`)) {
        const msgs = getNotes();
        saveNotes(msgs.filter(m => m.id !== div.id));
        renderNotes();
      }
    }
  }

  function renderNotes() {
    const msgs = getNotes();
    list.innerHTML = msgs
      .map(
        (m, i) => `
        <div id="${m.id}" class="p-2 bg-gray-800 rounded-sm mb-2 relative">
          <p>${m.text}</p>
          <span class="text-xs text-gray-400">${m.date}</span>
          <button id="del-${i}" class="delete-btn btn border-none p-0 absolute right-2 text-red-400 font-bold">Delete</button>
        </div>`
      )
      .join("");
    
    list.querySelectorAll(".delete-btn").forEach(btn => btn.addEventListener("click", () => deleteNote(btn)))
  }

  section.querySelector("#postBtn")?.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    const msgs = getNotes();
    msgs.push({ id: crypto.randomUUID?.() ?? `id-${Date.now().toString()}-${Math.random().toString(36).substring(2, 8)}`, text, date: new Date().toLocaleString() });
    saveNotes(msgs);
    input.value = "";
    renderNotes();
  });

  section.querySelector("#clearBtn")?.addEventListener("click", () => {
    if (confirm("Clear all notes?")) {
      localStorage.removeItem(STORAGE_KEY);
      renderNotes();
    }
  });

  renderNotes();
}
