import Header from "../../components/mobileLayout/Header";
import { Outlet } from "react-router-dom";
import MenuBar from "../../components/mobileLayout/MenuBar";
import { useNotesStore } from "../../stores/NotesStore";

const MobileLayout = () => {
    const {activeNote} = useNotesStore();

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-white dark:bg-custom-neutral-950">
            <Header />
            <div className="grow overflow-y-auto">
                <Outlet context={activeNote}/>
            </div>
            <MenuBar/>
        </div>
    );
};

export default MobileLayout;
