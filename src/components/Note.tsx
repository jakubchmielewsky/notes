import {ReactComponent as Tag} from "./../assets/images/icon-tag.svg"
import {ReactComponent as Clock} from "./../assets/images/icon-clock.svg"
import Header from "./mobileLayout/HeaderControls"

interface Props{
    note:{title: "Shopping List",
    tags: ["groceries", "weekly"],
    lastEdited: Date,
    text: "Remember to buy milk, eggs, and bread.",}
}

const Note : React.FC<Props> = ({note}) => {

    let tags="";
    note.tags.forEach(tag=>tags=tags+tag+", ")

    return(
        <div className="h-screen">
            <div className="w-full h-full flex flex-col px-200 py-250 gap-150">
                <Header goBack= {()=>{}} remove= {()=>{}} archive= {()=>{}} cancel= {()=>{}} save= {()=>{}}/>
                <h2 className="text-preset-1 font-bold">{note.title}</h2>
                <div className="grid grid-cols-2 text-preset-6">
                    <label className="flex gap-075 items-center py-050"><Tag className="h-200 w-200"/>Tags</label>
                    <input className="flex items-center py-050" type="text" value={tags}/>
                    <label className="flex gap-075 items-center py-050"><Clock className="h-200 w-200"/>Last edited</label>
                    <p className="flex items-center py-050">{note.lastEdited.toDateString()}</p>
                </div>
                <div className="border-t-1 "></div>
                <div>
                    <textarea className="h-full w-full " value={note.text}/>
                </div>
            </div>
        </div>
        
    )
}

export default Note;