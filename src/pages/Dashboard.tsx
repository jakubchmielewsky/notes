import { useState, useEffect } from "react";
import DesktopLayout from "../components/desktopLayout/Layout";
import MobileLayout from "../components/mobileLayout/Layout";

const Dashboard : React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <div className="w-screen h-screen overflow-hidden bg-white dark:bg-custom-neutral-950">
            {isMobile?<MobileLayout/>:<DesktopLayout/>}
        </div>
    )
}

export default Dashboard;