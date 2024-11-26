import { ReactComponent as Home } from './../../assets/images/icon-home.svg';
import { ReactComponent as Archived } from './../../assets/images/icon-archive.svg';
import { ReactComponent as Tag} from './../../assets/images/icon-tag.svg';
import { ReactComponent as Search} from './../../assets/images/icon-search.svg';
import { ReactComponent as Settings} from './../../assets/images/icon-settings.svg';

import { useState } from 'react';

const MenuBar : React.FC = () => {
    const [selected, setSelected] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.name);
    }

    const menuItems = [
        {icon:Home, name: "Home"},
        {icon:Search, name: "Search"},
        {icon:Archived, name: "Archived"},
        {icon:Tag, name: "Tag"},
        {icon:Settings, name: "Settings"},
    ]

    console.log(selected);

    return(
        <div className='w-full px-200 py-150 shadow-top dark:bg-custom-neutral-950'>
                <ul className='flex tablet:divide-x divide-custom-neutral-100 dark:divide-custom-neutral-800'>
                    {menuItems.map((el,index)=>{
                        return(
                            <li key={index} className='grow text-center'>
                                <button onClick={handleClick}
                                    name={el.name}  
                                    className={`w-full max-w-[80px] mx-auto py-050 flex justify-center rounded-4 ${selected===el.name&&"bg-custom-blue-50"}`}
                                >
                                    <div className={`flex flex-col items-center ${selected===el.name ? "text-custom-blue-500" : "text-custom-neutral-600 dark:text-custom-neutral-400"}`}>
                                        <el.icon/>
                                        <p className='hidden tablet:inline text-preset-6'>{el.name}</p>
                                    </div>
                                </button>
                            </li>
                        )
                    })}

                    
                </ul>
        </div>
    )
} 

export default MenuBar;