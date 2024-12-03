import { useState } from "react";
import Header from "./Header";
import SidebarNav from "./SidebarNav";
import AllNotes from "../NotesList";
import Note from "../Note";
import RightMenu from "./RightMenu";
import { Outlet } from "react-router-dom";


const DesktopLayout = () => {
    const [selectedTab, setSelectedTab] = useState("All Notes");

    return(
        <div className="h-full w-full flex">
            <SidebarNav/>
            <div className="flex flex-col w-full h-full">
                <Header openedTab={selectedTab} handleSearch={()=>{}}/>

                <Outlet/>

            </div>
        </div>
    )
}

export default DesktopLayout;
