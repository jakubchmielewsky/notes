import { ReactComponent as Tag } from "./../../assets/images/icon-tag.svg";
import { ReactComponent as Clock } from "./../../assets/images/icon-clock.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotesStore } from "../../stores/NotesStore";
import { useNotificationsStore } from "../../stores/NotificationsStore";
import { NotificationType } from "../../types/types";

const NewNoteDesktop : React.FC = ()=>{
    const navigate = useNavigate();
    const {addNote} = useNotesStore();

    const [inputs, setInputs] = useState({
        title: "",
        tags: "",
        text: "",
    });

    const {addNotification} = useNotificationsStore();


    const handleSave = () => {
        const newNote = {
            title: inputs.title,
            text: inputs.text,
            tags: inputs.tags.toLocaleLowerCase().split(","),
            lastEdited: new Date(),
        };
        addNote(newNote);
        navigate('/home');
        const notification: NotificationType = {id: Date.now().toString(), message: "Note successfully added.", type: "success"};
        addNotification(notification);
    };

    const handleCancel = () => {
        navigate("/home")
    }

    return (
        <div className="flex flex-col h-full px-200 py-250 gap-150 mr-[290px] border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800">

            <div className="grow flex flex-col gap-150 dark:text-white">
                <input
                    type="text"
                    className="text-preset-1 font-bold bg-transparent placeholder-custom-neutral-950 dark:placeholder-white  outline-none"
                    placeholder="Enter a Title..."
                    value={inputs.title}
                    onChange={(e) =>
                        setInputs({ ...inputs, title: e.currentTarget.value })
                    }
                />
                <div className="grid grid-cols-2 text-preset-6">
                    <label className="flex gap-075 items-center py-050">
                        <Tag className="h-200 w-200" />
                        Tags
                    </label>
                    <input
                        name="tags"
                        className="flex items-center py-050 bg-transparent  outline-none"
                        type="text"
                        placeholder="Add tags separated by commas (e.g. Work, Planning)"
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
                    <p className="flex items-center py-050 text-neutral-400">Not yet saved</p>
                </div>
                <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>
                <div className="grow">
                    <textarea
                        name="text"
                        className="h-full w-full bg-transparent text-custom-neutral-950 placeholder-custom-neutral-950 dark:text-custom-neutral-100 dark:placeholder-custom-neutral-100  outline-none resize-none"
                        placeholder="Start typing your note here…"
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
    );
}

export default NewNoteDesktop;