import { ReactComponent as Theme } from "./../../assets/images/icon-sun.svg";
import { ReactComponent as Font } from "./../../assets/images/icon-font.svg";
import { ReactComponent as Password } from "./../../assets/images/icon-lock.svg";
import { ReactComponent as Logout } from "./../../assets/images/icon-logout.svg";
import MenuItem from "../../components/desktopLayout/MenuItem";
import { useUserStore } from "../../stores/UserStore";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const SettingsDesktop: React.FC = () => {
    const { logout } = useUserStore();
    const navigate = useNavigate();
    const params = useParams();

    const items = [
        {
            icon: Theme,
            name: "Color Theme",
            setting: "theme",
            onClick: () => navigate("/settings/theme"),
        },
        {
            icon: Font,
            name: "Font Theme",
            setting: "font",
            onClick: () => navigate("/settings/font"),
        },
        {
            icon: Password,
            name: "Change Password",
            setting: "changepassword",
            onClick: () => navigate("/settings/changepassword"),
        },
    ];

    return (
        <div className="flex h-full w-full">
            <div
                className={`relative h-full flex flex-col px-200 pt-250 gap-200 w-[290px] border-r-1 border-custom-neutral-200 dark:border-custom-neutral-800 dark:bg-custom-neutral-950 dark:text-white tablet:px-400 tablet:py-300`}
            >
                <ul className="h-full w-full flex flex-col gap-100 text-custom-neutral-950 dark:text-custom-neutral-200 dark:bg-custom-neutral-950">
                    {items.map((item, index) => {
                        return (
                            <li key={index}>
                                <MenuItem
                                    name={item.name}
                                    active={item.setting === params.setting}
                                    onClick={item.onClick}
                                    Icon={item.icon}
                                    id={String(index)}
                                />
                            </li>
                        );
                    })}

                    <div className="border-t-1 border-custom-neutral-200 dark:border-custom-neutral-800"></div>

                    <MenuItem
                        name={"Logout"}
                        id=""
                        active={false}
                        onClick={() => logout()}
                        Icon={Logout}
                    />
                </ul>
            </div>
            <Outlet />
             <div className="w-[290px]"></div>
        </div>
    );
};

export default SettingsDesktop;
