import {create} from "zustand";
import { useUserStore } from "./UserStore";
import { collection, onSnapshot, query, where, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
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
}

export const useNotesStore = create<NotesState> ((set) => ({
    notes: [],
    archivedNotes: [],

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

                set({notes: notesData});

                return unsubscribe;
            },(error)=>{
                console.error(error);
            });
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
                const notesData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    uid: doc.data().uid,
                    title: doc.data().title,
                    tags: doc.data().tags,
                    text: doc.data().text,
                    lastEdited: doc.data().lastEdited.toDate(),
                }));

                set({archivedNotes: notesData});

                return unsubscribe;
            },(error)=>{
                console.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    },

    addArchivedNote: async (note) => {
        const currentUser = useUserStore.getState().currentUser;
        
        const uid = currentUser?.uid;

        try {
            const notesRef = collection(db, 'archived_notes');
            await addDoc(notesRef, {uid, ...note})
        } catch (error) {
            console.error(error);
        }
    },

     editArchivedNote: async (id, editedNote) => {
        try {
            const noteRef = doc(db,'archived_notes',id);
            await updateDoc(noteRef, editedNote);
        } catch (error) {
            console.error(error);
        }
     },

     deleteArchivedNote: async (id) => {
        try {
            const noteRef = doc(db,'archived_notes',id);
            await deleteDoc(noteRef);
        } catch (error) {
            console.error(error);
        }
     },

    
}))