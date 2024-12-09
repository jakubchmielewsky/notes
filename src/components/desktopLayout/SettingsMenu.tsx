import { useState } from "react";
import {ReactComponent as Theme} from "./../../assets/images/icon-sun.svg";
import {ReactComponent as Font} from "./../../assets/images/icon-font.svg";
import {ReactComponent as Password} from "./../../assets/images/icon-lock.svg";
import {ReactComponent as Logout} from "./../../assets/images/icon-logout.svg";
import MenuItem from "./MenuItem";



const SettingsMenu : React.FC = () => {
    const logout = ()=>{};

    const [selected,setSelected] = useState("");

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.name);
    }

    const options = [
        {icon:Theme, name:"Color Theme", onClick:handleClick, selected:selected},
        {icon:Font, name:"Font Theme", onClick:handleClick, selected:selected},
        {icon:Password, name:"Change Password", onClick:handleClick, selected:selected},
    ]

    return(
        // <ul className="h-full w-[258px] py-250 pl-400 pr-200 flex flex-col gap-100 border-r-1 text-custom-neutral-950 border-custom-neutral-200 dark:text-custom-neutral-200    dark:bg-custom-neutral-950">
        //     {options.map((option,index)=>{
        //         return(
        //             <li key={index}>
        //                 <MenuItem name={option.name} selected={option.selected} onClick={option.onClick} Icon={option.icon}/>
        //             </li>
        //         )
        //     })}

        //     <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>

        //     <MenuItem name={"Logout"} selected={selected} onClick={logout} Icon={Logout}/>

        // </ul>
        <></>
    )
}

export default SettingsMenu;