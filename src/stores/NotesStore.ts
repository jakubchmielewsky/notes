import {create} from "zustand";
import { useUserStore } from "./UserStore";
import { collection, onSnapshot, query, where, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface Note{
    id: string, 
    uid: string, 
    title: string, 
    tags: string[], 
    text: string, 
    lastEdited: Date
}

interface NotesState{
    notes: Note[] | null,
    archivedNotes: Note[] | null,
    getNotes: () => void,
    addNote: (note: {title: string , tags: string[], text: string, lastEdited: Date}) => Promise<void>,
    editNote: (id: string, editedNote: {title: string , tags: string[], text: string, lastEdited: Date}) => Promise<void>,
    deleteNote: (id: string) => Promise<void>,
    getArchivedNotes: () => void,
    addArchivedNote: (note: {title: string , tags: string[], text: string, lastEdited: Date}) => Promise<void>,
    editArchivedNote: (id: string, editedNote: {title: string , tags: string[], text: string, lastEdited: Date}) => Promise<void>,
    deleteArchivedNote: (id: string) => Promise<void>,
    moveToArchive: (id: string) => Promise<void>,
    restoreFromArchive: (id: string) => Promise<void>,
}

export const useNotesStore = create<NotesState  & { unsubscribeNotes?: Function | null, unsubscribeArchivedNotes?: Function | null}> ((set) => ({
    notes: [],
    archivedNotes: [],
    unsubscribeNotes: null,
    unsubscribeArchivedNotes: null,

    getNotes:  () => {
        const currentUser = useUserStore.getState().currentUser;

        if(!currentUser)
            return;

        const uid = currentUser.uid;
        const notesRef = collection(db, 'notes');
        const q = query(notesRef,where('uid','==',uid));

        try {
            const unsubscribe = onSnapshot(q,(snapshot) => {
                const notesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    uid: doc.data().uid,
                    title: doc.data().title,
                    tags: doc.data().tags,
                    text: doc.data().text,
                    lastEdited: doc.data().lastEdited.toDate(),
                }));

                set((state) => {
                    if (JSON.stringify(state.notes) !== JSON.stringify(notesData)) {
                        return { notes: notesData };
                    }
                    return state;
                });
            },(error)=>{
                console.error(error);
            });

            set({unsubscribeNotes: unsubscribe});
        } catch (error) {
            console.error(error);
        }
    },

    addNote: async (note) => {
        const currentUser = useUserStore.getState().currentUser;
        
        const uid = currentUser?.uid;

        try {
            const notesRef = collection(db, 'notes');
            await addDoc(notesRef, {uid, ...note})
        } catch (error) {
            console.error(error);
        }
    },

     editNote: async (id, editedNote) => {
        try {
            const noteRef = doc(db,'notes',id);
            await updateDoc(noteRef, editedNote);
        } catch (error) {
            console.error(error);
        }
     },

     deleteNote: async (id) => {
        try {
            const noteRef = doc(db,'notes',id);
            await deleteDoc(noteRef);
        } catch (error) {
            console.error(error);
        }
     },

    getArchivedNotes: () => {
        const currentUser = useUserStore.getState().currentUser;

        if(!currentUser)
            return;

        const uid = currentUser.uid;
        const notesRef = collection(db, 'archived_notes');
        const q = query(notesRef,where('uid','==',uid));

        try {
            const unsubscribe = onSnapshot(q,(snapshot) => {
                const archivedNotesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    uid: doc.data().uid,
                    title: doc.data().title,
                    tags: doc.data().tags,
                    text: doc.data().text,
                    lastEdited: doc.data().lastEdited.toDate(),
                }));

                set((state) => {
                    if (JSON.stringify(state.archivedNotes) !== JSON.stringify(archivedNotesData)) {
                        return { archivedNotes: archivedNotesData };
                    }
                    return state;
                });
            },(error)=>{
                console.error(error);
            });

            set({unsubscribeArchivedNotes: unsubscribe});
        } catch (error) {
            console.error(error);
        }
    },

    addArchivedNote: async (note) => {
        const currentUser = useUserStore.getState().currentUser;
        
        const uid = currentUser?.uid;

        try {
            const archivedNoteRef = collection(db, 'archived_notes');
            await addDoc(archivedNoteRef, {uid, ...note})
        } catch (error) {
            console.error(error);
        }
    },

     editArchivedNote: async (id, editedNote) => {
        try {
            const archivedNoteRef = doc(db,'archived_notes',id);
            await updateDoc(archivedNoteRef, editedNote);
        } catch (error) {
            console.error(error);
        }
     },

     deleteArchivedNote: async (id) => {
        try {
            const archivedNoteRef = doc(db,'archived_notes',id);
            await deleteDoc(archivedNoteRef);
        } catch (error) {
            console.error(error);
        }
     },

     moveToArchive: async (id) => {
        try{
            const noteRef = doc(db, 'notes', id);
            const noteSnapshot = await getDoc(noteRef);
            const noteData = noteSnapshot.data();

            if (noteData) {
                await addDoc(collection(db, 'archived_notes'), noteData);
                await deleteDoc(noteRef);
              }
        } catch (error) {
            console.error(error);
        }
     },

     restoreFromArchive: async (id) => {
        try {
            const archivedNoteRef = doc(db, 'archived_notes', id);
            const archivedNoteSnapshot = await getDoc(archivedNoteRef);
            const archivedNoteData = archivedNoteSnapshot.data();

            if (archivedNoteData){
                await addDoc(collection(db, 'notes'), archivedNoteData);
                await deleteDoc(archivedNoteRef);
            }
        } catch (error) {
            console.error(error);
        }
     },
}))