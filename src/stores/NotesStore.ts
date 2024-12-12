import { create } from "zustand";
import { useUserStore } from "./UserStore";
import {
    collection,
    onSnapshot,
    query,
    where,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { NoteType } from "../types/types";




interface NotesState {
    notes: NoteType[] | null;
    filters: { view: string; tag: string; query: string };
    setFilter: (key: string, value: string) => void;
    activeTabId: string;
    unsubscribeNotes?: Function | null;
    getFilteredNotes: () => NoteType[] | undefined | null;
    getNotes: () => void;
    addNote: (data: {
        title: string;
        tags: string[];
        text: string;
        lastEdited: Date;
    }) => Promise<void>;
    editNote: (
        id: string,
        editedNote: {
            title: string;
            tags: string[];
            text: string;
            lastEdited: Date;
            archived: boolean;
        }
    ) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
    notes: [],
    filters: {
        view: "all", // 'all', 'settings' lub 'archived'
        tag: "",
        query: "",
    },
    activeTabId: "",
    unsubscribeNotes: null,

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

    getFilteredNotes: () => {
        const { notes, filters } = get();

        if (filters.view === "archived")
            return notes?.filter((note) => note.archived === true);

        if (filters.tag)
            return notes?.filter((note) => note.tags.includes(filters.tag));

        if (filters.query)
            return notes?.filter(
                (note) =>
                    note.title.includes(filters.query) ||
                    note.text.includes(filters.query) ||
                    note.tags.includes(filters.query)
            );

        return notes;
    },

    getNotes: () => {
        const currentUser = useUserStore.getState().currentUser;

        if (!currentUser) return;

        const uid = currentUser.uid;
        const notesRef = collection(db, "notes");
        const q = query(notesRef, where("uid", "==", uid));

        try {
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const notesData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        uid: doc.data().uid,
                        title: doc.data().title,
                        tags: doc.data().tags,
                        text: doc.data().text,
                        lastEdited: doc.data().lastEdited.toDate(),
                        archived: doc.data().archived,
                    }));

                    set((state) => {
                        if (
                            JSON.stringify(state.notes) !==
                            JSON.stringify(notesData)
                        ) {
                            return { notes: notesData };
                        }
                        return state;
                    });
                },
                (error) => {
                    console.error(error);
                }
            );

            set({ unsubscribeNotes: unsubscribe });
        } catch (error) {
            console.error(error);
        }
    },

    addNote: async (data) => {
        const currentUser = useUserStore.getState().currentUser;

        const uid = currentUser?.uid;

        try {
            const notesRef = collection(db, "notes");
            await addDoc(notesRef, { uid, ...data, archived: false });
        } catch (error) {
            console.error(error);
        }
    },

    editNote: async (id, editedNote) => {
        try {
            const noteRef = doc(db, "notes", id);
            await updateDoc(noteRef, editedNote);
        } catch (error) {
            console.error(error);
        }
    },

    deleteNote: async (id) => {
        try {
            const noteRef = doc(db, "notes", id);
            await deleteDoc(noteRef);
        } catch (error) {
            console.error(error);
        }
    },
}));
