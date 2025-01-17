import { NoteType } from "../types/types";
import NoteListItem from "./NoteListItem";

interface Props {
    desktopLayout?: boolean;
    filteredNotes: NoteType[] | null;
    route: string;
}

const NotesList: React.FC<Props> = ({
    desktopLayout = false,
    filteredNotes,
    route,
}) => {

    return (
        <>
            
            <ul className="h-full divide-y  divide-custom-neutral-100 dark:divide-custom-neutral-800
                overflow-y-auto
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-custom-neutral-200
                dark:[&::-webkit-scrollbar-thumb]:bg-custom-neutral-800"
            >
                {filteredNotes?.map((note) => {
                    return (
                        <li key={note.id}>
                            <NoteListItem
                                note={note}
                                route={route}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default NotesList;
