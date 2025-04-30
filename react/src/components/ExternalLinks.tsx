export default function ExternalLinks() {
    return (
        <div className="fixed left-5 bottom-10 flex flex-col gap-2">
            <a href="../vue" className="group h-6 w-fit flex justify-start items-center gap-2 p-2 bg-[#243444] hover:bg-[#31475E] transition-all overflow-hidden rounded-lg shadow-lg text-white box-content max-w-5 hover:max-w-52">
                <img src="https://cdn.simpleicons.org/vue.js/vue.js" alt="Vue Icon" width={20} />
                <span className="font-medium tracking-wide opacity-0 group-hover:opacity-100 text-nowrap">Visit Vue Version</span>
            </a>
            <a href="https://github.com/Fabian-Kleine/vue-vs-react" target="_blank" className="group h-6 w-fit flex justify-start items-center gap-2 p-2 bg-[#0D1117] hover:bg-[#010409] transition-all overflow-hidden rounded-lg shadow-lg text-white box-content max-w-5 hover:max-w-52">
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="Vue Icon" width={20} />
                <span className="font-medium tracking-wide opacity-0 group-hover:opacity-100 text-nowrap">GitHub Repo</span>
            </a>
        </div>
    );
}