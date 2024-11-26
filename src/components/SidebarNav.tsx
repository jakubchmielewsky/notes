import { ReactComponent as Logo } from './../assets/images/logo.svg';
import { ReactComponent as ChevronRight } from './../assets/images/icon-chevron-right.svg';
import { ReactComponent as Home } from './../assets/images/icon-home.svg';
import { ReactComponent as Archived } from './../assets/images/icon-archive.svg';
import { ReactComponent as Tag} from './../assets/images/icon-tag.svg';
import { useState } from 'react';


interface Props{
    tags?: string[];
}

const SidebarNav: React.FC<Props> = ({tags}) => {
    const [selected,setSelected] = useState("");

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.name);
    }


    return(
        <div className="h-screen dark:bg-custom-neutral-950">
            <div className="w-[272px] h-full py-150 px-200 border-r-1 flex flex-col gap-100 dark:bg-custom-neutral-950 dark:border-custom-neutral-800">
                <div className='py-150 mb-200'>
                    <Logo className="current-color dark:text-white" />
                </div>

                {/*General Buttons*/}
                <div className='flex flex-col gap-050'>
                    {/*All Notes*/}
                    <button name='All Notes' 
                        className={`flex justify-between w-full px-150 py-[10px] text-preset-4 rounded-8 dark:text-custom-neutral-200 
                            ${selected==='All Notes'&& 'bg-custom-neutral-100 dark:bg-custom-neutral-800'}`}
                        onClick={handleClick}
                    >
                        <div className='flex items-center gap-100'>
                            <Home className={`w-[20px] h-[20px] ${selected==='All Notes'&& 'text-custom-blue-500'}`}/> All Notes 
                        </div>
                        {selected==='All Notes'&&<ChevronRight className="w-[20px] h-[20px] dark:text-custom-neutral-200"/>}
                    </button>

                    {/*Archived Notes*/}
                    <button name='Archived Notes' 
                        className={`flex justify-between w-full px-150 py-[10px] text-preset-4 rounded-8 dark:text-custom-neutral-200 
                            ${selected==='Archived Notes'&& 'bg-custom-neutral-100 dark:bg-custom-neutral-800'}`}
                        onClick={handleClick}
                    >
                        <div className='flex items-center gap-100'>
                            <Archived className={`w-[20px] h-[20px] ${selected==='Archived Notes'&& 'text-custom-blue-500'}`}/> Archived Notes 
                        </div>
                        {selected==='Archived Notes'&&<ChevronRight className="w-[20px] h-[20px] dark:text-custom-neutral-200"/>}
                    </button>
                </div>

                {/* Divider */}
                <div className='border-t-1 dark:border-custom-neutral-800'></div>

                {/* Tags */}
                <h2 className='px-100 text-custom-neutral-500'>Tags</h2>

                <ul className='flex flex-col gap-050'>
                    {tags?.map((tag, index) => {
                        return(
                            <li key={index}>
                                <button name={tag} 
                                    className={`flex justify-between w-full px-150 py-[10px] text-preset-4 rounded-8 dark:text-custom-neutral-200 
                                        ${selected===tag&& 'bg-custom-neutral-100 dark:bg-custom-neutral-800'}`}
                                    onClick={handleClick}
                                >
                                    <div className='flex items-center gap-100'>
                                        <Tag className={`w-[20px] h-[20px] ${selected===tag&& 'text-custom-blue-500'}`}/> {tag} 
                                    </div>
                                    {selected===tag&&<ChevronRight className="w-[20px] h-[20px] dark:text-custom-neutral-200"/>}
                                </button>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}

export default SidebarNav;