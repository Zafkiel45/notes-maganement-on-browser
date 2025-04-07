"use client";
import { useEffect, useState } from "react";

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
    <nav>
        {folders.map((item, idx) => {
            return (
                <li key={idx + 1} >{item}</li>
            )
        })}
    </nav>
  )
};
