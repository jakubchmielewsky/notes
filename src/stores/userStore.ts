// import { create } from "zustand";

// interface UserState {
//   currentUser: null | string;
//   loading: boolean;
//   authInitialized: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (email: string, password: string) => Promise<void>;
//   setUser: (user: string | null) => void;
// }

// export const useUserStore = create<UserState>((set) => ({
//   currentUser: null,
//   loading: true,
//   authInitialized: false,

//   login: async (email, password) => {
//     // set({ loading: true });
//     // try {
//     //   await signInWithEmailAndPassword(auth, email, password);
//     //   set({ loading: false });
//     // } catch (error) {
//     //   console.log(error);
//     // }

//     set({ loading: true });
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (!response.ok) console.log("Nie udało się zalogować");
//     } catch (error) {
//       console.log(error);
//     }
//     set({ loading: false });
//   },

//   logout: async () => {
//     // set({ loading: true });
//     // try {
//     //   await signOut(auth);
//     //   set({ loading: false });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   },

//   register: async (email, password) => {
//     // set({ loading: true });
//     // try {
//     //   await createUserWithEmailAndPassword(auth, email, password);
//     //   set({ loading: false });
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   },

//   setUser: (user: string | null) => {
//     //     set({ currentUser: user, authInitialized: true });
//   },
// }));

// // onAuthStateChanged(auth, (user) => {
// //   useUserStore.getState().setUser(user);
// // });
