import { ReactComponent as Logo } from './../../assets/images/logo.svg';
import { ReactComponent as Home } from './../../assets/images/icon-home.svg';
import { ReactComponent as Archived } from './../../assets/images/icon-archive.svg';
import { ReactComponent as Tag} from './../../assets/images/icon-tag.svg';
import { useState } from 'react';

import MenuItem from './MenuItem';


interface Props{
    tags?: string[];
}

const SidebarNav: React.FC<Props> = ({tags}) => {
    const [selected,setSelected] = useState("");

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.name);
    }            

    return(
        <div className="w-[272px] h-full py-150 px-200 border-r-1 flex flex-col gap-100 dark:bg-custom-neutral-950 dark:border-custom-neutral-800">
            <div className='py-150 mb-200'>
                <Logo className="dark:text-white" />
            </div>

            <div className='flex flex-col gap-050'>
                <MenuItem name='All Notes' Icon={Home} selected={selected} onClick={handleClick}/>

                <MenuItem name='Archived Notes' Icon={Archived} selected={selected} onClick={handleClick}/>
            </div>

            <div className='border-t-1 dark:border-custom-neutral-800'></div>
            <h3 className='px-100 text-custom-neutral-500'>Tags</h3>

            <ul className='flex flex-col gap-050'>
                {tags?.map((tag, index) => {
                    return(
                        <li key={index}>
                            <MenuItem name={tag} Icon={Tag} selected={selected} onClick={handleClick}/>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default SidebarNav;