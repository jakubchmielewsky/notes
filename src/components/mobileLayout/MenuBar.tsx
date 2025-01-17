import { ReactComponent as Home } from "./../../assets/images/icon-home.svg";
import { ReactComponent as Archived } from "./../../assets/images/icon-archive.svg";
import { ReactComponent as Tag } from "./../../assets/images/icon-tag.svg";
import { ReactComponent as Search } from "./../../assets/images/icon-search.svg";
import { ReactComponent as Settings } from "./../../assets/images/icon-settings.svg";

import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
    { icon: Home, label: "Home", route: "/home" },
    { icon: Search, label: "Search", route: "/search" },
    { icon: Archived, label: "Archived", route: "/archived" },
    { icon: Tag, label: "Tag", route: "/tag" },
    { icon: Settings, label: "Settings", route: "/settings" },
];

const MenuBar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (item: string, route: string) => {
        navigate(route);
    };

    return (
        <div className="w-full px-200 py-150 shadow-top dark:bg-custom-neutral-950 border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800">
            <ul className="flex tablet:divide-x divide-custom-neutral-100 dark:divide-custom-neutral-800">
                {menuItems.map((menuItem, index) => {
                    return (
                        <li key={index} className="grow text-center">
                            <button
                                onClick={() =>
                                    handleClick(menuItem.label, menuItem.route)
                                }
                                className={`w-full max-w-[80px] mx-auto py-050 flex justify-center rounded-4 ${
                                    location.pathname.includes(menuItem.route) &&
                                    "bg-custom-blue-50 dark:bg-custom-neutral-800"
                                }`}
                            >
                                <div
                                    className={`flex flex-col items-center ${
                                        location.pathname.includes(menuItem.route)
                                            ? "text-custom-blue-500"
                                            : "text-custom-neutral-600 dark:text-custom-neutral-400"
                                    }`}
                                >
                                    <menuItem.icon />
                                    <p className="hidden tablet:inline text-preset-6">
                                        {menuItem.label}
                                    </p>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MenuBar;
