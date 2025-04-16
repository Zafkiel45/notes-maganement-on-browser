export const NavbarBtn = ({
    content,
    svg,
    ...props
}:{content: string, svg: React.JSX.Element}) => {
    return (
        <div {...props} className={`bg-[#1B1B1B] lg:px-3 lg:py-2 w-full border border-[#464646] rounded-lg shadow-sm cursor-pointer hover:bg-[#242424] active:bg-[#2e2e2e] transition-colors`}>
            <button className="flex gap-2 items-center">
                <div>
                    {svg}
                </div>
                <div>
                    {content}
                </div>
            </button>
        </div>
    )
}