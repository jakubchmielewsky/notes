import Note from "../../components/Note"
import NotesList from "../../components/NotesList"
import RightMenu from "../../components/desktopLayout/RightMenu"

const Notes : React.FC = () => {
    return(
        <div className="flex h-full">
                    <NotesList/>
                    <Note note={{
                        title: "Shopping List",
                        tags: ["groceries", "weekly"],
                        lastEdited: new Date("2024-11-01"),
                        text: "Remember to buy milk, eggs, and bread.",
                    }} desktopLayout/>
                    <RightMenu archive={()=>{}} remove={()=>{}}/>
                </div>
    )
}

export default Notes;