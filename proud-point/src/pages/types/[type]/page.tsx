import Link from "next/link";
import { FileIcon } from "../../../../public/svg/FileIcon";
import { Hash } from "../../../../public/svg/hash";

interface paramsSignature {
  params: Promise<{ type: string }>;
}

interface filesSignature {
  name: string;
  id: number;
}

export default async function FilesGroupedByTypes({ params }: paramsSignature) {
  const { type } = await params;

  const rawFiles = await fetch(`http://localhost:3001/types/${type}`);
  const files: filesSignature[] = (await rawFiles.json()) as filesSignature[];

  return (
    <>
      <div>
        <h1 className="text-4xl flex items-center mb-8">
            <div>
                <Hash className="h-10 w-10"/>
            </div>
            <div>
                Todas as notas de { type }
            </div>
        </h1>
      </div>
      <div>
        <ul className="text-lg flex flex-col gap-2">
          {files.map((item) => {
            return (
              <Link href={`/docs/${item.id}`} key={item.id}>
                <li className="flex items-center gap-1 rounded-md shadow-sm py-1 px-2 hover:bg-blue-400/40 transition-colors active:bg-blue-300/40">
                  <div>
                    <FileIcon />
                  </div>
                  <div>{item.name}</div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
