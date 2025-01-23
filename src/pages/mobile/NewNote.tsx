import { ReactComponent as Tag } from "./../../assets/images/icon-tag.svg";
import { ReactComponent as Clock } from "./../../assets/images/icon-clock.svg";
import HeaderControls from "../../components/mobileLayout/HeaderControls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotesStore } from "../../stores/NotesStore";
import { useNotificationsStore } from "../../stores/NotificationsStore";
import { NotificationType } from "../../types/types";

const NewNote : React.FC = ()=>{
    const navigate = useNavigate();
    const {addNote} = useNotesStore();

    const [inputs, setInputs] = useState({
        title: "",
        tags: "",
        text: "",
    });

    const {addNotification} = useNotificationsStore();

    const handleGoBack = () => {
        navigate(-1);
    };
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

    return (
        <div className="flex flex-col h-full px-200 py-250 gap-150">
            <HeaderControls
                goBack={handleGoBack}
                save={handleSave}
            />

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
            </div>
        </div>
    );
}

export default NewNote;