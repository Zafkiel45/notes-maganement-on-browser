import type { FileList } from "../../pages/types/[type]/filesTypes.astro";
import { FileIcon } from "../../svg/FileIcon";

export function FileMap({files}:{files: FileList[]}) {
  return (
    <>
      {files.map((item) => {
        return (
          <a href={`/docs/${item.id}`} key={item.id}>
            <li className="flex items-center gap-1 rounded-md shadow-sm py-1 px-2 hover:bg-blue-400/40 transition-colors active:bg-blue-300/40">
              <div>
                <FileIcon />
              </div>
              <div>{item.name}</div>
            </li>
          </a>
        );
      })}
    </>
  );
}
