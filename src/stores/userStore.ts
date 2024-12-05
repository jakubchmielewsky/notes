import { create } from "zustand";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"

interface UserState{
    currentUser: null | User,
    loading: boolean,
    authInitialized: boolean,
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    register: (email: string, password: string) => Promise<void>,
    setUser: (user : User | null) => void,
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: null,
    loading: true,
    authInitialized: false,

    login: async (email, password) => {
        set({loading: true});
        try {
            await (signInWithEmailAndPassword(auth, email, password));
            set({loading: false});
        } catch (error) {
            console.log(error);
            
        }
    },

    logout: async () => {
        set({ loading: true});
        try {
            await signOut(auth);
            set({loading: false});
        } catch (error) {
            console.log(error);
        }
    },

    register: async (email, password) => {
        set({loading: true});
        try {
            await (createUserWithEmailAndPassword(auth, email, password));
            set({loading: false});
        } catch (error) {
            console.log(error);
            
        }
    },

    setUser: (user : User | null) => {
        set({currentUser: user, authInitialized: true});
    }
}));

onAuthStateChanged(auth, (user) => {
    useUserStore.getState().setUser(user);
})