import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
//import { useUserStore } from "./stores/UserStore";
import { useEffect, useState } from "react";
import { useNotesStore } from "./stores/NotesStore";
import Note from "./pages/mobile/Note";
import MobileLayout from "./pages/mobile/MobileLayout";
import Home from "./pages/mobile/Home";
import NewNote from "./pages/mobile/NewNote";
import Search from "./pages/mobile/Search";
import Archived from "./pages/mobile/Archived";
import Tags from "./pages/mobile/Tags";
import Settings from "./pages/mobile/Settings";
import DesktopLayout from "./pages/desktop/DesktopLayout";
import HomeDesktop from "./pages/desktop/HomeDesktop";
import ArchivedDesktop from "./pages/desktop/ArchivedDesktop";
import SearchDesktop from "./pages/desktop/SearchDesktop";
import NoteDesktop from "./pages/desktop/NoteDesktop";
import TagsDesktop from "./pages/desktop/TagsDesktop";
import SettingsDesktop from "./pages/desktop/SettingsDesktop";
import Setting from "./pages/Setting";
import { useSettingsStore } from "./stores/SettingsStore";
import NewNoteDesktop from "./pages/desktop/NewNoteDesktop";
import Loading from "./components/Loading";

function App() {
  //const { authInitialized, currentUser } = useUserStore();
  const { getNotes, unsubscribeNotes, notes } = useNotesStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
  const { theme, font, initializeSettings } = useSettingsStore();

  //   useEffect(() => {
  //     if (currentUser) {
  //       getNotes();
  //     }

  //     return () => {
  //       if (unsubscribeNotes) unsubscribeNotes();
  //     };

  //     // eslint-disable-next-line
  //   }, [currentUser]);

  useEffect(() => {
    initializeSettings();
  }, [initializeSettings]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "Dark Mode") {
      htmlElement.classList.add("dark");
    } else if (theme === "Light Mode") {
      htmlElement.classList.remove("dark");
    } else {
      // system preferences
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }

    htmlElement.classList.remove(
      "font-inter",
      "font-noto-serif",
      "font-source-code-pro"
    );
    if (font === "Serif") {
      htmlElement.classList.add("font-noto-serif");
    } else if (font === "Sans-serif") {
      htmlElement.classList.add("font-inter");
    } else {
      htmlElement.classList.add("font-source-code-pro");
    }
  }, [theme, font]);

  //   if (!authInitialized || !notes) {
  //     // return <Loading/>
  //   }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute replace={false}>
              {isMobile ? <MobileLayout /> : <DesktopLayout />}
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home" />} />

          <Route path="/home" element={isMobile ? <Home /> : <HomeDesktop />}>
            <Route
              path="note/:noteId"
              element={isMobile ? <Note /> : <NoteDesktop />}
            />
          </Route>
          <Route
            path="/search"
            element={isMobile ? <Search /> : <SearchDesktop />}
          >
            <Route
              path="note/:noteId"
              element={isMobile ? <Note /> : <NoteDesktop />}
            />
          </Route>
          <Route
            path="/archived"
            element={isMobile ? <Archived /> : <ArchivedDesktop />}
          >
            <Route
              path="note/:noteId"
              element={isMobile ? <Note /> : <NoteDesktop />}
            />
          </Route>
          <Route path="/tag" element={isMobile ? <Tags /> : <TagsDesktop />}>
            <Route path=":tagName" element={null}>
              <Route
                path="note/:noteId"
                element={isMobile ? <Note /> : <NoteDesktop />}
              />
            </Route>
          </Route>
          <Route
            path="/settings"
            element={isMobile ? <Settings /> : <SettingsDesktop />}
          >
            <Route path="/settings/:setting" element={<Setting />} />
          </Route>

          <Route
            path="/newnote"
            element={isMobile ? <NewNote /> : <NewNoteDesktop />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
