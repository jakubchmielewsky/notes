import { ReactComponent as Archive } from "./../../assets/images/icon-archive.svg";
import { ReactComponent as Delete } from "./../../assets/images/icon-delete.svg";

interface Props{
    archive: ()=>void;
    remove: ()=>void;
}

const RightMenu : React.FC<Props> = ({archive, remove}) => {

    return(
        <div className="h-full w-[258px] flex flex-col py-250 pl-200 mr-400 gap-150 text-preset-4 text-custom-neutral-950 border-l-1 border-custom-neutral-200 dark:border-custom-neutral-800  dark:text-white">
            <button onClick={archive} className="w-full flex items-center px-150 py-200 gap-100 border-1 border-custom-neutral-300 rounded-8 dark:border-custom-neutral-600 hover:border-transparent hover:bg-custom-neutral-100 dark:hover:bg-custom-neutral-800 focus:border-custom-neutral-950 dark:focus:border-white focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">
                <Archive className="w-250 h-250"/>
                Archive Note
            </button>
            <button onClick={remove} className="w-full flex items-center px-150 py-200 gap-100 border-1 border-custom-neutral-300 rounded-8 dark:border-custom-neutral-600 hover:border-transparent hover:bg-custom-neutral-100 dark:hover:bg-custom-neutral-800 focus:border-custom-neutral-950 dark:focus:border-white focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">
                <Delete className="w-250 h-250"/>
                Delete Note
            </button>
             
        </div>
    )
}

export default RightMenu;