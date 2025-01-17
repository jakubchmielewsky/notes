import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NotesList from "../../components/NotesList";
import { useNotesStore } from "../../stores/NotesStore";
import { ReactComponent as Plus } from "./../../assets/images/icon-plus.svg";
import { ReactComponent as SearchIcon } from "./../../assets/images/icon-search.svg";
import { useState } from "react";

const Search: React.FC = () => {
    const { notes } = useNotesStore();
    const navigate = useNavigate();
    const location = useLocation();

    const [query, setQuery] = useState("");

    const searchQuery = query.toLowerCase();

    const filteredNotes =
        notes?.filter((note) => {
            if (
                note.title.toLowerCase().includes(searchQuery) ||
                note.text.toLowerCase().includes(searchQuery)
            )
                return true;

            if (
                note.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchQuery)
                )
            ) {
                return true;
            }

            return false;
        }) || null;

        const isNoteOpen = location.pathname.includes("/note/");

    return (
        <>
            {!isNoteOpen&&<div
                className={`relative h-full flex flex-col px-200 pt-250 gap-200 w-full border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800 dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
            >
                <h2 className="text-preset-1 font-semibold">Search</h2>

                <div className="border-1 border-custom-neutral-300 px-200 py-150 flex rounded-8 w-full gap-075 dark:border-custom-neutral-500">
                    <label htmlFor="search">
                        <SearchIcon className="w-[20px] h-[20px]" />
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by title, content, or tags…"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.currentTarget.value);
                        }}
                        className="text-preset-5 w-full border-none outline-none shadow-none bg-transparent"
                    />
                </div>

                <NotesList
                    desktopLayout={false}
                    filteredNotes={filteredNotes}
                    route="/search"
                />

                <button
                    className="absolute bottom-200 right-200 bg-custom-blue-500 h-600 w-600 tablet:h-800 tablet:w-800 rounded-full flex items-center justify-center"
                    onClick={() => navigate("/newnote")}
                >
                    <Plus className="w-400 h-400 text-white" />
                </button>
            </div>}
            <Outlet/>
        </>
    );
};

export default Search;
