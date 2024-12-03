import {ReactComponent as Plus} from "./../assets/images/icon-plus.svg";
import NoteItem from "./NoteItem";
import { useState } from "react";

const testNotes = [
    {
      title: "Shopping List",
      tags: ["groceries", "weekly"],
      lastEdited: new Date("2024-11-01"),
      text: "Remember to buy milk, eggs, and bread.",
    },
    {
      title: "Work Project",
      tags: ["urgent", "work"],
      lastEdited: new Date("2024-11-20"),
      text: "Complete the presentation by the end of the week.",
    },
    {
      title: "Holiday Planning",
      tags: [],
      lastEdited: new Date("2024-12-10"),
      text: "Book tickets and plan the itinerary for the trip.",
    },
    {
      title: "Personal Goals",
      tags: ["motivation", "2025"],
      lastEdited: new Date("2024-10-15"),
      text: "Set realistic goals for the upcoming year.",
    },
];
  

const NotesList = ({desktopLayout=true}) => {
    const [selected,setSelected] = useState("");

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        setSelected(e.currentTarget.name);

        //TODO routing
    }
                

    return(
        <div className={`relative flex flex-col px-200 pt-250 gap-200 border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800 dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300 ${desktopLayout?"w-[290px]":"w-full"}`}>
           {!desktopLayout?<h2 className="text-preset-1 font-semibold">All Notes</h2>:
            <button className="flex justify-center items-center gap-050 w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-preset-4 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400"
            >
                <Plus className="h-250 w-250"/>
                Create New Note
            </button>}


            <ul className="overflow-y-auto divide-y divide-custom-neutral-100 dark:divide-custom-neutral-800">
               {
                testNotes.map((note, index)=>{
                    return(
                        <li key={index}>
                            <NoteItem note={note} selected={selected} onClick={handleClick} desktopLayout={desktopLayout} idx={index}/>
                        </li>
                    )
                })
               }
                
            </ul>

            {!desktopLayout&&<button className="absolute bottom-200 right-200 bg-custom-blue-500 h-600 w-600 tablet:h-800 tablet:w-800 rounded-full flex items-center justify-center">
                <Plus className="w-400 h-400 text-white"/>
            </button>}

        </div>
    )
}

export default NotesList;