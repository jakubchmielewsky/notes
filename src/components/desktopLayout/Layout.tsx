import { useState } from "react";
import Header from "./Header";
import SidebarNav from "./SidebarNav";
import AllNotes from "../NotesList";
import Note from "../Note";
import RightMenu from "./RightMenu";
import { Outlet } from "react-router-dom";


const DesktopLayout = () => {
    const [selectedTab, setSelectedTab] = useState("All Notes")

    return(
        <div className="h-full w-full flex">
            <SidebarNav/>
            <div className="flex flex-col w-full h-full">
                <Header openedTab={selectedTab} handleSearch={()=>{}}/>

                <Outlet/>
                {/* <div className="flex h-full">
                    <AllNotes/>
                    <Note note={{
                        title: "Shopping List",
                        tags: ["groceries", "weekly"],
                        lastEdited: new Date("2024-11-01"),
                        text: "Remember to buy milk, eggs, and bread.",
                    }} desktopLayout/>
                    <RightMenu archive={()=>{}} remove={()=>{}}/>
                </div> */}

            </div>
        </div>
    )
}

export default DesktopLayout;
