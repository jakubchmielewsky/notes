import { ReactComponent as Archive } from "./../../assets/images/icon-archive.svg";
import { ReactComponent as Delete } from "./../../assets/images/icon-delete.svg";

interface Props{
    archive: ()=>void;
    remove: ()=>void;
}

const RightMenu : React.FC<Props> = ({archive, remove}) => {

    return(
        <div className="h-full w-[258px] flex flex-col py-250 pl-200 gap-150 text-custom-neutral-950 dark:bg-custom-neutral-800 dark:text-white">
            <button onClick={archive} className="w-full flex px-150 py-200 gap-100 border-1 border-custom-neutral-300 rounded-8 dark:border-custom-neutral-600">
                <Archive/>
                Archive Note
            </button>
            <button onClick={remove} className="w-full flex px-150 py-200 gap-100 border-1 border-custom-neutral-300  rounded-8 dark:border-custom-neutral-600">
                <Delete/>
                Delete Note
            </button>
             
        </div>
    )
}

export default RightMenu;