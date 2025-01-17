import { ReactComponent as Search } from "./../../assets/images/icon-search.svg";
import { ReactComponent as Settings } from "./../../assets/images/icon-settings.svg";
import { useNotesStore } from "../../stores/NotesStore";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Header: React.FC<{ className?: string }> = ({ className }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { filters, setFilter } = useNotesStore();
    const params = useParams();

    const setTitle = () => {
        if (location.pathname.includes("home")) {
            return "All Notes";
        } else if (location.pathname.includes("archived")) {
            return "Archived";
        } else if (location.pathname.includes("tag")) {
            return "Tagged: " + params.tagName;
        } else if (location.pathname.includes("search")) {
            return "Showing results for: " + filters.query;
        } else if (location.pathname.includes("settings")) {
            return "Settings";
        }
    };

    const pageTitle = setTitle();

    return (
        <div
            className={`w-full px-400 flex border-b-1 border-custom-neutral-200 justify-between items-center min-h-[81px] dark:border-custom-neutral-800 ${className}`}
        >
            {/* Opened tab */}
            <h2 className="text-custom-neutral-950  text-preset-1 font-semibold dark:text-white ">
                {pageTitle}
            </h2>

            <div className="flex gap-200 items-center text-custom-neutral-500 dark:text-custom-neutral-400">
                <div className="border-1 border-custom-neutral-300 px-200 py-150 flex rounded-8 w-[300px] gap-075 dark:border-custom-neutral-500">
                    <label htmlFor="search">
                        <Search className="w-[20px] h-[20px]" />
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by title, content, or tags…"
                        value={filters.query}
                        onChange={(e) => {
                            setFilter("query", e.currentTarget.value);
                            navigate("/search");
                        }}
                        className="text-preset-5 w-full border-none outline-none shadow-none bg-transparent"
                    />
                </div>
                <Link
                    to={"/settings"}
                >
                    <Settings />
                </Link>
            </div>
        </div>
    );
};

export default Header;
