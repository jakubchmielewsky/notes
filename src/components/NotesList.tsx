import { NoteType } from "../types/types";
import { ReactComponent as Plus } from "./../assets/images/icon-plus.svg";
import NoteItem from "./NoteItem";

interface Props {
    desktopLayout?: boolean;
    filteredNotes: NoteType[] | null | undefined;
    selectedNote: NoteType | null;
    handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const NotesList: React.FC<Props> = ({
    desktopLayout = false,
    selectedNote,
    handleClick,
    filteredNotes,
}) => {
    return (
        <div
            className={`flex flex-col px-200 pt-250 gap-200 ${
                desktopLayout ? "w-[290px]" : "w-full"
            } border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800 dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
        >
            {!desktopLayout ? (
                <h2 className="text-preset-1 font-semibold">All Notes</h2>
            ) : (
                <button className="flex justify-center items-center gap-050 w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-preset-4 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">
                    <Plus className="h-250 w-250" />
                    Create New Note
                </button>
            )}

            <ul className="overflow-y-auto divide-y divide-custom-neutral-100 dark:divide-custom-neutral-800">
                {filteredNotes?.map((note) => {
                    return (
                        <li key={note.id}>
                            <NoteItem
                                note={note}
                                selected={selectedNote}
                                onClick={handleClick}
                                desktopLayout={desktopLayout}
                            />
                        </li>
                    );
                })}
            </ul>

            {!desktopLayout && (
                <button className="absolute bottom-200 right-200 bg-custom-blue-500 h-600 w-600 tablet:h-800 tablet:w-800 rounded-full flex items-center justify-center">
                    <Plus className="w-400 h-400 text-white" />
                </button>
            )}
        </div>
    );
};

export default NotesList;
