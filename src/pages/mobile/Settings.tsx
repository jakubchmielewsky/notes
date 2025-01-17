import { ReactComponent as Theme } from "./../../assets/images/icon-sun.svg";
import { ReactComponent as Font } from "./../../assets/images/icon-font.svg";
import { ReactComponent as Password } from "./../../assets/images/icon-lock.svg";
import { ReactComponent as Logout } from "./../../assets/images/icon-logout.svg";
import MenuItem from "../../components/desktopLayout/MenuItem";
import { useUserStore } from "../../stores/UserStore";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const Settings: React.FC = () => {
    const { logout } = useUserStore();
    const navigate = useNavigate();
    const params = useParams();

    const options = [
        {
            icon: Theme,
            name: "Color Theme",
            onClick: () => navigate("/settings/theme"),
        },
        {
            icon: Font,
            name: "Font Theme",
            onClick: () => navigate("/settings/font"),
        },
        {
            icon: Password,
            name: "Change Password",
            onClick: () => navigate("/settings/changepassword"),
        },
    ];

    return (
        <>
           {!params.setting && <div
                className={`relative h-full flex flex-col px-200 pt-250 gap-200 w-full dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
            >
                <h2 className="text-preset-1 font-semibold">Settings</h2>

                <ul className="h-full w-full flex flex-col gap-100 text-custom-neutral-950 dark:text-custom-neutral-200 dark:bg-custom-neutral-950">
                    {options.map((option, index) => {
                        return (
                            <li key={index}>
                                <MenuItem
                                    name={option.name}
                                    id={String(index)}
                                    active={false}
                                    onClick={option.onClick}
                                    Icon={option.icon}
                                />
                            </li>
                        );
                    })}

                    <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>

                    <MenuItem
                        name={"Logout"}
                        id="xd"
                        active={false}
                        onClick={logout}
                        Icon={Logout}
                    />
                </ul>
            </div>}
            <Outlet/>
        </>
    );
};

export default Settings;
