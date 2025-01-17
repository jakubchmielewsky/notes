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
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { NoteType } from "../types/types";




interface NotesState {
    notes: NoteType[] | null;
    activeNote: NoteType | null;
    filters: { view: string; tag: string; query: string };
    setFilter: (key: string, value: string) => void;
    notesInitialized: boolean;
    setActiveNote: (note : NoteType)=>void;
    unsubscribeNotes?: Function | null;
    getNotes: () => void;
    addNote: (data: {
        title: string;
        tags: string[];
        text: string;
        lastEdited: Date;
    }) => Promise<void>;
    editNote: ( editedNote: NoteType) => Promise<void>;
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
    setActiveNote:(note)=>{
        set({activeNote:note});
    },
    activeTabId: "",
    unsubscribeNotes: null,


    getNotes: () => {
        const currentUser = useUserStore.getState().currentUser;

        if (!currentUser) return;

        const uid = currentUser.uid;
        const notesRef = collection(db, "notes");
        const q = query(notesRef, where("uid", "==", uid), orderBy("lastEdited", "desc"));

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
                    set({notesInitialized: true});
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

    editNote: async (editedNote) => {
        try {
            const noteRef = doc(db, "notes", editedNote.id);
            await updateDoc(noteRef, {...editedNote,lastEdited: new Date()});
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
