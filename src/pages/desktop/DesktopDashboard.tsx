import Header from "../../components/desktopLayout/Header";
import SidebarNav from "../../components/desktopLayout/SidebarNav";
import { Outlet } from "react-router-dom";

const DesktopDashboard = () => {
    

    return(
        <div className="h-screen w-screen flex overflow-hidden bg-white dark:bg-custom-neutral-950">
            <SidebarNav/>
            <div className="flex flex-col w-full h-full">
                <Header/>

                <Outlet/>

            </div>
        </div>
    )
}

export default DesktopDashboard;
