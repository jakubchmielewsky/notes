import { ReactComponent as Tag } from "./../../assets/images/icon-tag.svg";
import { ReactComponent as Clock } from "./../../assets/images/icon-clock.svg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNotesStore } from "../../stores/NotesStore";
import RightMenu from "../../components/desktopLayout/RightMenu";
import Modal from "../../components/Modal";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon-delete.svg";
import { ReactComponent as ArchiveIcon } from "../../assets/images/icon-archive.svg";

interface ModalState {
    isActive: boolean;
    icon: React.FC<React.SVGProps<SVGSVGElement>> | null;
    title: string;
    description: string;
    buttonColor: string;
    onClick: () => void;
}



const NoteDesktop: React.FC = () => {
    const { notes, deleteNote, editNote } = useNotesStore();
    const navigate = useNavigate();
    const params = useParams();
    const [modal, setModal] = useState<ModalState>({
            isActive: false,
            icon: null,
            title: "",
            description: "",
            buttonColor: "",
            onClick: () => {},
        });

    const note = notes?.find((item) => item.id === params.noteId) || null;

    const [inputs, setInputs] = useState({
        title: note?.title || "",
        tags: note?.tags.join(",") || "",
        text: note?.text || "",
    });

    useEffect(()=>{
        setInputs({title: note?.title || "",
            tags: note?.tags.join(",") || "",
            text: note?.text || "",})
    },[note])

    if (!note) return <Navigate to={"/home"} />;

    const resetModal = () => {
        setModal({isActive: false, icon: null, title: "", description: "", buttonColor: "", onClick: ()=>{}});
    }
    const handleDelete = () => {
        setModal({
            isActive: true, 
            icon: DeleteIcon, 
            title: "Delete Note", 
            description: "Are you sure you want to permanently delete this note? This action cannot be undone.",
            buttonColor: "custom-red-500",
            onClick: () => {
                deleteNote(note.id);
                navigate(-1);
            }
        })
    };
    const handleArchive = () => {
        setModal({
            isActive: true, 
            icon: ArchiveIcon, 
            title: "Archive Note", 
            description: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
            buttonColor: "custom-blue-500",
            onClick: () => {
                editNote({ ...note, archived: true });
                navigate(-1);
            }
        })
    };
    const handleRestore = () => {
        editNote({ ...note, archived: false });
        navigate(-1);
    };
    const handleCancel = () => {
        setInputs({
            title: note.title,
            tags: note.tags.join(","),
            text: note.text,
        });
    };
    const handleSave = () => {
        const editedNote = {
            ...note,
            title: inputs.title,
            text: inputs.text,
            tags: inputs.tags.toLocaleLowerCase().split(","),
        };
        editNote(editedNote);
    };

    return (
        <div className="flex h-full w-full">
            <div className="grow flex px-200 py-250 gap-150">
                <div className="grow flex flex-col gap-150 text-custom-neutral-950 dark:text-white">
                    <input
                        type="text"
                        className="text-preset-1 font-bold bg-transparent outline-none"
                        placeholder="Enter a Title..."
                        value={inputs.title}
                        onChange={(e) =>
                            setInputs({
                                ...inputs,
                                title: e.currentTarget.value,
                            })
                        }
                    />
                    <div className="grid grid-cols-2 text-preset-6">
                        <label className="flex gap-075 items-center py-050">
                            <Tag className="h-200 w-200" />
                            Tags
                        </label>
                        <input
                            name="tags"
                            className="flex items-center py-050 bg-transparent outline-none"
                            type="text"
                            placeholder="Enter tags divided by comma"
                            value={inputs.tags}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    tags: e.currentTarget.value,
                                })
                            }
                        />
                        <label className="flex gap-075 items-center py-050">
                            <Clock className="h-200 w-200" />
                            Last edited
                        </label>
                        <p className="flex items-center py-050">
                            {note.lastEdited.toLocaleDateString()}
                        </p>
                    </div>
                    <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>
                    <div className="grow">
                        <textarea
                            name="text"
                            className="h-full w-full bg-transparent outline-none resize-none"
                            placeholder="Enter yor note here"
                            value={inputs.text}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    text: e.currentTarget.value,
                                })
                            }
                        />
                    </div>
                    <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>
                    <div className="flex gap-200 items-center">
                        {/* primary button */}
                        <button className="w-[99px] bg-custom-blue-500 px-200 py-150 rounded-8 text-preset-4 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400" onClick={handleSave}>
                            Save Note
                        </button>
                        {/* secondary button */}
                        <button className="w-[99px] bg-custom-neutral-100 dark:bg-custom-neutral-800 text-custom-neutral-600 dark:text-custom-neutral-400 px-200 py-150 rounded-8 text-preset-4 hover:bg-transparent border border-transparent hover:border-custom-neutral-300 focus:border-custom-neutral-950 dark:focus:border-white focus:outline outline-offset-2 outline-2 outline-custom-neutral-400" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[258px] mr-400">
                {note.archived ? (
                    <RightMenu restore={handleRestore} remove={handleDelete} />
                ) : (
                    <RightMenu archive={handleArchive} remove={handleDelete} />
                )}
            </div>
            {modal.isActive&& 
                <Modal 
                    icon={modal.icon} 
                    title={modal.title} 
                    description={modal.description} 
                    buttonColor={modal.buttonColor} 
                    onSubmit={modal.onClick}
                    resetModal={resetModal}

                />
            }
        </div>
    );
};

export default NoteDesktop;
