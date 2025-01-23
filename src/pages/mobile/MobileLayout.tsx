import Header from "../../components/mobileLayout/Header";
import { Outlet } from "react-router-dom";
import MenuBar from "../../components/mobileLayout/MenuBar";
import { useNotesStore } from "../../stores/NotesStore";
import NotificationsContainer from "../../components/NotificationsContainer";

const MobileLayout = () => {
    const {activeNote} = useNotesStore();

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-white dark:bg-custom-neutral-950">
            <Header />
            <div className="grow overflow-y-auto
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-custom-neutral-200
                dark:[&::-webkit-scrollbar-thumb]:bg-custom-neutral-800">
                <Outlet context={activeNote}/>
            </div>
            <MenuBar/>
            <NotificationsContainer duration={4000}/>
        </div>
    );
};

export default MobileLayout;
