import { Outlet, useNavigate } from "react-router-dom";
import NotesList from "../../components/NotesList";
import { useNotesStore } from "../../stores/NotesStore";
import { ReactComponent as Plus } from "./../../assets/images/icon-plus.svg";

const SearchDesktop: React.FC = () => {
    const { notes, filters } = useNotesStore();
    const navigate = useNavigate();

    const filteredNotes =
        notes?.filter((note) => {
            if (
                note.title.toLowerCase().includes(filters.query) ||
                note.text.toLowerCase().includes(filters.query)
            )
                return true;

            if (
                note.tags?.some((tag) =>
                    tag.toLowerCase().includes(filters.query)
                )
            ) {
                return true;
            }

            return false;
        }) || null;

    return (
        <div className="h-full w-full flex overflow-y-auto">
            <div
                className={`relative h-full w-[290px] flex flex-col px-200 pt-250 gap-200 border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800 dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
            >
                <button
                    className="flex justify-center items-center gap-050 w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-preset-4 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400"
                    onClick={() => navigate("/newnote")}
                >
                    <Plus className="h-250 w-250" />
                    Create New Note
                </button>
                <NotesList
                    desktopLayout={true}
                    filteredNotes={filteredNotes}
                    route="/search"
                />
            </div>
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
};

export default SearchDesktop;
