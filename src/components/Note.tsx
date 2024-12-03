import {ReactComponent as Tag} from "./../assets/images/icon-tag.svg"
import {ReactComponent as Clock} from "./../assets/images/icon-clock.svg"
import Header from "./mobileLayout/HeaderControls"

interface Props{
    note:{title: "Shopping List",
        tags: ["groceries", "weekly"],
        lastEdited: Date,
        text: "Remember to buy milk, eggs, and bread.",
    },
    desktopLayout : boolean
}

const Note : React.FC<Props> = ({note, desktopLayout}) => {

    let tags="";
    note.tags.forEach(tag=>tags=tags+tag+", ")

    return(
        <div className="grow flex flex-col px-200 py-250 gap-150 text-custom-neutral-950 dark:text-white">
            {!desktopLayout&&<Header goBack= {()=>{}} remove= {()=>{}} archive= {()=>{}} cancel= {()=>{}} save= {()=>{}}/>}
            <h2 className="text-preset-1 font-bold">{note.title}</h2>
            <div className="grid grid-cols-2 text-preset-6">
                <label className="flex gap-075 items-center py-050"><Tag className="h-200 w-200"/>Tags</label>
                <input className="flex items-center py-050 bg-transparent" type="text" value={tags}/>
                <label className="flex gap-075 items-center py-050"><Clock className="h-200 w-200"/>Last edited</label>
                <p className="flex items-center py-050">{note.lastEdited.toDateString()}</p>
            </div>
            <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>
            <div className="grow">
                <textarea className="h-full w-full bg-transparent" value={note.text}/>
            </div>

            {desktopLayout&&
                <>
                    <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>
                    <div className="flex gap-200 items-center">
                        {/* primary button */}
                        <button className="w-[99px] bg-custom-blue-500 px-200 py-150 rounded-8 text-preset-4 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400"
                        >
                            Save Note
                        </button>
                        {/* secondary button */}
                        <button className="w-[99px] bg-custom-neutral-100 dark:bg-custom-neutral-800 text-custom-neutral-600 dark:text-custom-neutral-400 px-200 py-150 rounded-8 text-preset-4 hover:bg-transparent border border-transparent hover:border-custom-neutral-300 focus:border-custom-neutral-950 dark:focus:border-white focus:outline outline-offset-2 outline-2 outline-custom-neutral-400"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            }
        </div>
        
    )
}

export default Note;