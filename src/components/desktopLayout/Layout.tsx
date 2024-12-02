import Header from "./Header";
import SidebarNav from "./SidebarNav";


const DesktopLayout = () => {

    return(
        <div className="h-full w-full flex">
            <SidebarNav/>
            <div className="flex flex-col w-full h-full">
                <Header/>

            </div>
        </div>
    )
}

export default DesktopLayout;
