import {ReactComponent as ChevronRight} from './../../assets/images/icon-chevron-right.svg';

console.log(typeof ChevronRight);

interface Props{
    name: string;
    Icon: any;
    selected: String;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const SettingsItem : React.FC<Props> = ({name,Icon,selected,onClick}) => {

    return(
        <button name={name} 
            className={`flex justify-between w-full px-150 py-[10px] text-preset-4 rounded-8 dark:text-custom-neutral-200 
                ${selected===name&& 'bg-custom-neutral-100 dark:bg-custom-neutral-800'}`}
            onClick={onClick}
        >
            <div className='flex items-center gap-100'>
                <Icon className={`w-[20px] h-[20px] ${selected===name&& 'text-custom-blue-500'}`}/> {name} 
            </div>
            {selected===name&&<ChevronRight className="w-[20px] h-[20px] dark:text-custom-neutral-200"/>}
        </button>
    )
}

export default SettingsItem;