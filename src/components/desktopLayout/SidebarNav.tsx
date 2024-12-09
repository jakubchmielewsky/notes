import { ReactComponent as Logo } from './../../assets/images/logo.svg';
import { ReactComponent as Home } from './../../assets/images/icon-home.svg';
import { ReactComponent as Archived } from './../../assets/images/icon-archive.svg';
import { ReactComponent as Tag} from './../../assets/images/icon-tag.svg';
import {v4 as generateId} from "uuid";
import MenuItem from './MenuItem';
import { useNotesStore } from '../../stores/NotesStore';

const SidebarNav: React.FC = () => {
    const { notes, setFilter, filters} = useNotesStore();

    const aggregateTags = () => {
        let tagsCount: {[key: string]: number} = {};

        if(!notes)return;

        notes.forEach((note)=>{
            note.tags.forEach((tag)=>{
                if(tagsCount[tag]){
                    tagsCount[tag]++;
                } else {
                    tagsCount[tag] = 1;
                }
            });
        });

        const tags = Object.keys(tagsCount).map(tag=>({
            text: tag,
            id: generateId(),
        }));

        tags.sort((a,b)=> tagsCount[b.text] - tagsCount[a.text]);

        return tags;
    }

    return(
        <div className="w-[272px] h-full py-150 px-200 border-r-1 flex flex-col gap-100 dark:bg-custom-neutral-950 dark:border-custom-neutral-800">
            <div className='py-150 mb-200'>
                <Logo className="dark:text-white" />
            </div>

            <div className='flex flex-col gap-050'>
                <MenuItem name='All Notes' Icon={Home} id={generateId()} onClick={()=>setFilter("view","all")} active={filters.view==="all"&&!filters.tag&&!filters.query}/>

                <MenuItem name='Archived Notes' Icon={Archived} id={generateId()} onClick={()=>setFilter("view","archived")} active={filters.view==="archived"}/>
            </div>

            <div className='border-t-1 dark:border-custom-neutral-800'></div>
            <h3 className='px-100 text-custom-neutral-500'>Tags</h3>

            <ul className='flex flex-col gap-050'>
                {aggregateTags()?.map((tag) => {
                    return(
                        <li key={tag.id}>
                            <MenuItem name={tag.text} Icon={Tag} id={tag.id} onClick={()=>setFilter("tag",tag.text)} active={filters.tag===tag.text}/>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default SidebarNav;