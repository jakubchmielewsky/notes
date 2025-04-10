import { create } from "zustand";
//import { useUserStore } from "./UserStore";
import { NoteType } from "../types/types";

interface NotesState {
  notes: NoteType[] | null;
  activeNote: NoteType | null;
  filters: { view: string; tag: string; query: string };
  setFilter: (key: string, value: string) => void;
  notesInitialized: boolean;
  setActiveNote: (note: NoteType) => void;
  unsubscribeNotes?: Function | null;
  getNotes: () => void;
  addNote: (data: {
    title: string;
    tags: string[];
    text: string;
    lastEdited: Date;
  }) => Promise<void>;
  editNote: (editedNote: NoteType) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  activeNote: null,
  filters: {
    view: "all", // 'all' lub 'archived'
    tag: "",
    query: "",
  },
  setFilter: (key, value) => {
    if (key === "view" && value === "archived") {
      set((state) => ({
        filters: {
          view: "archived",
          tag: "",
          query: "",
        },
      }));
    } else {
      set((state) => ({
        filters: {
          view: "all",
          tag: "",
          query: "",
        },
      }));
    }

    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },
  notesInitialized: false,
  setActiveNote: (note) => {
    set({ activeNote: note });
  },
  activeTabId: "",
  unsubscribeNotes: null,

  getNotes: async () => {
    try {
      const response = await fetch("http://localhost:8080/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Błąd podczas pobierania notatek:", response.status);
        return;
      }

      const data = await response.json();

      const notesData = data.map((doc: any) => ({
        id: doc.id,
        uid: doc.uid,
        title: doc.title,
        tags: doc.tags,
        text: doc.text,
        lastEdited: new Date(doc.lastEdited),
        archived: doc.archived,
      }));

      set({ notes: notesData });
    } catch (error) {
      console.error("Błąd podczas pobierania notatek:", error);
    }
  },

  addNote: async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Błąd podczas wysylania notatki:", response.status);
      } else {
        get().getNotes();
      }
    } catch (error) {
      console.error("Błąd podczas wysylania notatki:", error);
    }
  },

  editNote: async (editedNote) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/notes/${editedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedNote),
        }
      );

      if (!response.ok) {
        console.error("Błąd podczas edutowania notatki:", response.status);
      } else {
        get().getNotes();
      }
    } catch (error) {
      console.error("Błąd podczas edutowania notatki:", error);
    }
  },

  deleteNote: async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Błąd podczas usuwania notatki:", response.status);
      } else {
        get().getNotes();
      }
    } catch (error) {
      console.error("Błąd podczas usuwania notatki:", error);
    }
  },
}));
