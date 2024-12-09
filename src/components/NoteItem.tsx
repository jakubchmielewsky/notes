

//title="Title",tags=["tag1","tag2"],lastEdited=new Date(),note="your text",onClick=()=>{}, desktopLayout=false

interface Props{
    note: {title:string, tags:string[], lastEdited: Date, text: string},
    selected: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    desktopLayout: boolean,
    idx: string,
}

const NoteItem : React.FC<Props> = ({note, selected, onClick, desktopLayout, idx}) => {

    return(
        <button onClick={onClick} name={String(idx)} className={`w-full flex flex-col gap-150 px-100 py-[10px] items-left rounded-6 text-preset-6 ${selected===String(idx)&&"bg-custom-neutral-100 dark:bg-custom-neutral-800"}`}>
            <h3 className="text-preset-3 font-semibold">{note.title}</h3>
            <ul className="flex gap-050">
                {note.tags.map((tag,index) => {
                    return(
                        <li key={index} className={`bg-custom-neutral-200 py-025 px-100 rounded-4 dark:bg-custom-neutral-700 ${selected===String(idx)&&"dark:bg-custom-neutral-400"}`}>
                            {tag}
                        </li>
                    )
                })}
            </ul>
            <p className="dark:text-custom-neutral-300">{note.lastEdited.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric",})}</p>
            
        </button>
    )
}

export default NoteItem;