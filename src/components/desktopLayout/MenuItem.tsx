import {ReactComponent as ChevronRight} from './../../assets/images/icon-chevron-right.svg';

interface Props{
    name: string;
    Icon: any;
    id: string;
    onClick: ( e: React.MouseEvent<HTMLButtonElement>) => void,
    active: boolean,
}

const MenuItem : React.FC<Props> = ({name, Icon, onClick, active}) => {

    return(
        <button 
            className={`flex justify-between w-full px-150 py-[10px] text-preset-4 rounded-8 dark:text-custom-neutral-200 
                ${active&& 'bg-custom-neutral-100 dark:bg-custom-neutral-700'}`}
            onClick={(e)=>onClick(e)}
        >
            <div className='flex items-center gap-100'>
                <Icon className={`w-[20px] h-[20px] ${active&& 'text-custom-blue-500'}`}/> {name} 
            </div>
            {active&&<ChevronRight className="w-[20px] h-[20px] dark:text-custom-neutral-200"/>}
        </button>
    )
}

export default MenuItem;