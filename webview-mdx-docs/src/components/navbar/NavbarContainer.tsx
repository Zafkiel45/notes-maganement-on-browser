"use client";
import { useEffect, useState } from "react";
import { Hash } from "../../../public/svg/hash";

export const NavbarContainer = () => {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    const folders = async () => {
      try {
        const folderFetch = await fetch("http://localhost:3001/folders");
        const folderArray = await folderFetch.json();
        setFolders(folderArray);
        console.log(folderArray)
      } catch (err) {
        console.error(err);
      }
    };
    
    folders();
}, []);

  return (
    <nav className="w-[18vw] p-5 h-screen border-r border-[#5C5C5C] ">
      <ul className="w-full flex flex-col gap-4">
        {folders.map((item, idx) => {
            return (
                <li key={idx + 1} className="flex items-center text-lg gap-2 hover:bg-blue-400/50 transition-colors active:bg-blue-300/50 cursor-pointer rounded-md py-1 px-2" >
                  <div><Hash/></div>
                  <div>{item}</div>
                </li>
            )
        })}
      </ul>
    </nav>
  )
};
