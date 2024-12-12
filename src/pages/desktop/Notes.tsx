import { Outlet, useNavigate } from "react-router-dom";
import NotesList from "../../components/NotesList";
import React, { useEffect, useState } from "react";
import { NoteType } from "../../types/types";
import { useNotesStore } from "../../stores/NotesStore";

const Notes: React.FC = () => {
    const { getFilteredNotes } = useNotesStore();
    const filteredNotes = getFilteredNotes();
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const noteId = e.currentTarget.getAttribute("name");
        if (noteId && filteredNotes) {
            setSelectedNote(
                filteredNotes.find((note) => note.id === noteId) || null
            );
        }
    };

    if (selectedNote && !filteredNotes?.includes(selectedNote)) {
        setSelectedNote(null);
    }

    useEffect(() => {
        if(selectedNote){
            navigate(`/dashboard/notes/${selectedNote?.id}`);
        } else {
            navigate(`/dashboard/notes`);
        }
        
    }, [selectedNote, navigate]);
    return (
        <div className="flex h-full">
            <NotesList
                filteredNotes={filteredNotes}
                desktopLayout={true}
                selectedNote={selectedNote}
                handleClick={handleClick}
            />
            <Outlet context={selectedNote}/>
        </div>
    );
};

export default Notes;
