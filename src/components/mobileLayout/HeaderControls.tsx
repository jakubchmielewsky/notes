import { ReactComponent as Archive } from './../../assets/images/icon-archive.svg';
import { ReactComponent as Delete } from './../../assets/images/icon-delete.svg';
import { ReactComponent as ArrowLeft } from './../../assets/images/icon-arrow-left.svg';


interface Props{
    goBack: ()=>void;
    remove: ()=>void;
    archive: ()=>void;
    cancel: ()=>void;
    save: ()=>void;
}

const Header : React.FC<Props> = ({goBack, remove, archive, cancel, save}) => {

    return(
        <div className="w-full pb-150 flex justify-between text-preset-5 text-custom-neutral-600 border-b-1 border-custom-neutral-200 dark:bg-custom-neutral-800 dark:text-custom-neutral-300 tablet:pt-150">
            {/* left */}
            <button onClick={goBack} className='flex gap-050 items-center'>
                <ArrowLeft className="w-[18px] h-[18px]"/>
                Go Back
            </button>

            {/* right */}
            <div className='flex items-center gap-200'>
                <button onClick={remove}>
                    <Delete className="w-[18px] h-[18px]"/>
                </button>
                <button onClick={archive}>
                    <Archive className="w-[18px] h-[18px]"/>
                </button>
                <button onClick={cancel}>
                    Cancel
                </button>
                <button onClick={save} className='text-custom-blue-500'>
                    Save Note
                </button>
            </div>
        </div>
    )
} 

export default Header;