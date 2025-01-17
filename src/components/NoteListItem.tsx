import { useNavigate, useParams } from "react-router-dom";
import { NoteType } from "../types/types";
import { useNotesStore } from "../stores/NotesStore";

interface Props {
    note: NoteType;
    route: string;
}

const NoteListItem: React.FC<Props> = ({
    note,
    route,
}) => {
    const navigate = useNavigate();
    const {setActiveNote} = useNotesStore();
    const params = useParams();

    const handleClick = () => {
        setActiveNote(note);
        navigate(`${route}/note/${note.id}`);
    }

    return (
        <button
            onClick={handleClick}
            className={`w-full flex flex-col gap-150 px-100 py-[10px] items-left rounded-6 text-preset-6 my-[2px] ${
                params.noteId === note.id &&
                "bg-custom-neutral-100 dark:bg-custom-neutral-800"
            }`}
        >
            <h3 className="text-preset-3 font-semibold">{note.title}</h3>
            <ul className="flex gap-050">
                {note.tags.map((tag, index) => {
                    return (
                        <li
                            key={index}
                            className={`bg-custom-neutral-200 py-025 px-100 rounded-4 dark:bg-custom-neutral-700 ${
                                params.noteId === note.id &&
                                "dark:bg-custom-neutral-400"
                            }`}
                        >
                            {tag}
                        </li>
                    );
                })}
            </ul>
            <p className="dark:text-custom-neutral-300">
                {note.lastEdited.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
        </button>
    );
};

export default NoteListItem;
