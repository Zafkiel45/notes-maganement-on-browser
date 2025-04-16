"use client";
import { useEffect, useState } from "react";
import { Hash } from "../../svg/hash";
import { NavbarBtn } from "./Button.navbar";
import { SectionDivider } from "./SectionDivider.navbar";
import { AddFolder } from "../../svg/AddFolder.svg";
import { AddNote } from "../../svg/AddNote.svg";

export const NavbarContainer = () => {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    const folders = async () => {
      try {
        const folderFetch = await fetch("http://localhost:3001/folders");
        const folderArray = await folderFetch.json();
        setFolders(folderArray);
      } catch (err) {
        console.error(err);
      }
    };

    folders();
  }, []);

  return (
    <nav className="w-[20vw] bg-[#151515] p-5 h-screen flex flex-col gap-3 overflow-y-auto border-r border-[#5C5C5C] ">
      <SectionDivider sectionName="➕ Criar" />
      <div className="flex flex-col lg:gap-2 ">
        <NavbarBtn svg={<AddFolder />} content="Criar nova pasta" />
        <NavbarBtn svg={<AddNote />} content="Criar nova nota" />
      </div>
      <SectionDivider sectionName="📂 Pastas" />
      <ul className="w-full flex flex-col gap-4">
        {folders.map((item, idx) => {
          return (
            <a key={idx + 1} href={`/types/${item}/filesTypes`}>
              <li className="flex w-full items-center group text-lg gap-1 hover:bg-blue-400/40 transition-colors active:bg-blue-300/40 cursor-pointer rounded-md py-1 px-2 truncate">
                <div>
                  <Hash className="fill-gray-400 group-hover:fill-cyan-200 transition-colors" />
                </div>
                <div>{item}</div>
              </li>
            </a>
          );
        })}
      </ul>
    </nav>
  );
};
