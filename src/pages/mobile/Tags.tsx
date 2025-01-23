import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NotesList from "../../components/NotesList";
import { useNotesStore } from "../../stores/NotesStore";
import { ReactComponent as Plus } from "./../../assets/images/icon-plus.svg";
import { ReactComponent as Tag } from "./../../assets/images/icon-tag.svg";
import { ReactComponent as ChevronLeft } from "./../../assets/images/icon-arrow-left.svg";
import { useState } from "react";

const Tags: React.FC = () => {
    const { notes } = useNotesStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTag, setSelectedTag] = useState("");

    const filteredNotes =
        notes?.filter((note) => {
            if (
                note.tags?.some((tag) =>
                    tag.toLowerCase().includes(selectedTag)
                )
            ) {
                return true;
            }
            return false;
        }) || null;

    const aggregateTags = () => {
        let tagsCount: { [key: string]: number } = {};

        if (!notes) return;

        notes.forEach((note) => {
            note.tags.forEach((tag) => {
                if (tagsCount[tag]) {
                    tagsCount[tag]++;
                } else {
                    tagsCount[tag] = 1;
                }
            });
        });

        const tags = Object.keys(tagsCount).map((tag) => ({
            text: tag,
        }));

        tags.sort((a, b) => tagsCount[b.text] - tagsCount[a.text]);

        return tags;
    };

    const tags = aggregateTags();

    const isNoteOpen = location.pathname.includes("/note/");

    return (
        <>
            {!isNoteOpen && (
                <div
                    className={`relative h-full flex flex-col px-200 pt-250 gap-200 w-full dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
                >
                    {selectedTag ? (
                        <>
                            <button
                                className="flex items-center gap-150 text-preset-5"
                                onClick={() => setSelectedTag("")}
                            >
                                <ChevronLeft className="w-[18px] h-[18px]" />
                                All Tags
                            </button>

                            <h2 className="text-preset-1 font-semibold">{`Notes Tagged: ${selectedTag}`}</h2>

                            <NotesList
                                desktopLayout={false}
                                filteredNotes={filteredNotes}
                                route={`/tag/${selectedTag}`}
                            />

                            <button
                                className="absolute bottom-200 right-200 bg-custom-blue-500 h-600 w-600 tablet:h-800 tablet:w-800 rounded-full flex items-center justify-center"
                                onClick={() => navigate("/newnote")}
                            >
                                <Plus className="w-400 h-400 text-white" />
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-preset-1 font-semibold">
                                Tags
                            </h2>

                            <ul className="flex flex-col dark:text-custom-neutral-300 text-preset-4 divide-y divide-custom-neutral-200 dark:divide-custom-neutral-800">
                                {tags?.map((tag, index) => (
                                    <li key={index}>
                                        <button
                                            className="w-full flex items-center gap-100  py-[10px]"
                                            onClick={() =>
                                                setSelectedTag(tag.text)
                                            }
                                        >
                                            <Tag className="w-[20px] h-[20px]" />
                                            {tag.text}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
            <Outlet />
        </>
    );
};

export default Tags;
