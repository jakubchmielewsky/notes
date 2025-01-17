import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NotesList from "../../components/NotesList";
import { useNotesStore } from "../../stores/NotesStore";
import { ReactComponent as Plus } from "./../../assets/images/icon-plus.svg";

const Home: React.FC = () => {
    const { notes } = useNotesStore();
    const navigate = useNavigate();
    const location = useLocation();

    const filteredNotes = notes?.filter((note) => !note.archived) || null;

    const isNoteOpen = location.pathname.includes("/note/");

    return (
        <>
            {!isNoteOpen && 
                <div
                    className={`relative h-full flex flex-col px-200 pt-250 gap-200 w-full border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800 dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
                >
                    <>
                        <h2 className="text-preset-1 font-semibold">
                            All Notes
                        </h2>

                        <NotesList
                            desktopLayout={false}
                            filteredNotes={filteredNotes}
                            route="/home"
                        />

                        <button
                            className="absolute bottom-200 right-200 bg-custom-blue-500 h-600 w-600 tablet:h-800 tablet:w-800 rounded-full flex items-center justify-center"
                            onClick={() => navigate("/newnote")}
                        >
                            <Plus className="w-400 h-400 text-white" />
                        </button>
                    </>
                </div>
            }
            <Outlet />
        </>
    );
};

export default Home;
