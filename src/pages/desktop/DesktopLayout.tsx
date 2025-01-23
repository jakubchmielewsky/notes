import Header from "../../components/desktopLayout/Header";
import SidebarNav from "../../components/desktopLayout/SidebarNav"
import { Outlet } from "react-router-dom";
import NotificationsContainer from "../../components/NotificationsContainer";

const DesktopLayout = () => {

    return(
        <div className="h-screen w-screen max-h-screen max-w-screen flex bg-white dark:bg-custom-neutral-950">
            <SidebarNav/>
            <div className="grow flex flex-col">
                <Header/>

                <Outlet/>

            </div>
            <NotificationsContainer duration={4000}/>
        </div>
    )
}

export default DesktopLayout;
