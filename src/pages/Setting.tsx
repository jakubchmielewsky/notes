import React, { useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/images/icon-arrow-left.svg";
import { ReactComponent as FontSerif } from "../assets/images/icon-font-serif.svg";
import { ReactComponent as FontSansSerif } from "../assets/images/icon-font-sans-serif.svg";
import { ReactComponent as FontMono } from "../assets/images/icon-font-monospace.svg";
import { ReactComponent as LightIcon } from "../assets/images/icon-sun.svg";
import { ReactComponent as DarkIcon } from "../assets/images/icon-moon.svg";
import { ReactComponent as SystemIcon } from "../assets/images/icon-system-theme.svg";
import PasswordInput from "../components/authForms/PasswordInput";
import { useSettingsStore } from "../stores/SettingsStore";
//import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

type FormData = {
  old: string;
  new: string;
  confirm: string;
};

const Setting: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ setting: string }>();
  const { theme, font, setTheme, setFont } = useSettingsStore();
  const [selectedSettings, setSelectedSettings] = useState({
    theme: theme,
    font: font,
  });
  //const auth = getAuth();

  const [formData, setFormData] = useState<FormData>({
    old: "",
    new: "",
    confirm: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const getSettingConfig = () => {
    switch (params.setting) {
      case "theme":
        return {
          title: "Color Theme",
          subtitle: "Choose your color theme:",
          options: [
            {
              title: "Light Mode",
              subtitle: "Pick a clean and classic light theme.",
              icon: LightIcon,
            },
            {
              title: "Dark Mode",
              subtitle: "Select a sleek and modern dark theme.",
              icon: DarkIcon,
            },
            {
              title: "System",
              subtitle: "Adapts to your device's theme.",
              icon: SystemIcon,
            },
          ],
        };
      case "font":
        return {
          title: "Font Theme",
          subtitle: "Choose your font theme:",
          options: [
            {
              title: "Sans-serif",
              subtitle: "Clean and modern, easy to use.",
              icon: FontSansSerif,
            },
            {
              title: "Serif",
              subtitle: "Classic and elegant for a timeless feel.",
              icon: FontSerif,
            },
            {
              title: "Monospace",
              subtitle: "Code-like, great for a technical vibe.",
              icon: FontMono,
            },
          ],
        };
      default:
        return {
          title: "Change Password",
          subtitle: "",
          options: [],
        };
    }
  };

  const handleSelectSetting = (value: string) => {
    if (params.setting === "theme") {
      setSelectedSettings({ ...selectedSettings, theme: value });
    } else {
      setSelectedSettings({ ...selectedSettings, font: value });
    }
  };

  const handleApplyChanges = () => {
    setTheme(selectedSettings.theme);
    setFont(selectedSettings.font);
  };

  const { title, subtitle, options } = getSettingConfig();

  const validate = () => {
    if (formData.new === formData.confirm) return true;

    return false;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // if (validate()) {
    //   try {
    //     const user = auth.currentUser;
    //     if (user && user.email) {
    //       //re-authentication
    //       const credential = EmailAuthProvider.credential(
    //         user.email,
    //         formData.old
    //       );
    //       await reauthenticateWithCredential(user, credential);
    //       await updatePassword(auth.currentUser, formData.new);
    //       //todo notification success
    //     } else {
    //       console.error("User not logged in");
    //     }
    //   } catch (error: any) {
    //     console.error(error.code, error.message);
    //   }
    //   setFormData({ old: "", new: "", confirm: "" });
    // } else {
    //   console.error("Passwords must be the same");
    // }
  };

  return (
    <div className="grow flex flex-col px-200 py-300 text-custom-neutral-950 dark:text-white">
      <button
        onClick={() => navigate("/settings")}
        className="flex gap-050 items-center text-custom-neutral-600 dark:custom-neutral-400"
      >
        <ArrowLeft className="w-[18px] h-[18px]" />
        Settings
      </button>
      <h2 className="text-preset-2 font-bold py-150">{title}</h2>

      {params.setting === "changepassword" ? (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="space-y-4 flex flex-col"
        >
          <PasswordInput
            id="old"
            label="Old Password"
            value={formData.old}
            onChange={handleInputChange}
          />
          <PasswordInput
            id="new"
            label="New Password"
            value={formData.new}
            onChange={handleInputChange}
            hintVisible
          />
          <PasswordInput
            id="confirm"
            label="Confirm New Password"
            value={formData.confirm}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-[132px] text-preset-4 self-end bg-custom-blue-500 px-200 py-150 rounded-8 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400"
          >
            Save Password
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-250 text-custom-neutral-950 dark:text-white">
          <p className="text-preset-5 text-custom-neutral-700 dark:text-custom-neutral-300">
            {subtitle}
          </p>
          <ul className="flex flex-col gap-200">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectSetting(option.title)}
                  className={`flex items-center gap-200 py-200 px-200 border w-full rounded-12 dark:border-custom-neutral-800 ${
                    (option.title === selectedSettings.theme ||
                      option.title === selectedSettings.font) &&
                    "bg-custom-neutral-100 dark:bg-custom-neutral-800"
                  }`}
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="flex gap-200">
                      <div className="border w-[40px] h-[40px] flex justify-center items-center rounded-12 bg-white dark:bg-custom-neutral-950 dark: border-custom-neutral-800">
                        <option.icon className="w-6 h-6 dark:text-custom-neutral-300" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="font-bold text-preset-4">
                          {option.title}
                        </h3>
                        <p className="text-sm text-preset-6">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`border-2 w-200 h-200 rounded-full ${
                        option.title === selectedSettings.theme ||
                        option.title === selectedSettings.font
                          ? "border-4 border-custom-blue-500 dark:border-custom-blue-500"
                          : "border-custom-neutral-200 dark:border-custom-neutral-600"
                      }`}
                    ></div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleApplyChanges}
            type="button"
            className="w-[132px] text-preset-4 self-end bg-custom-blue-500 px-200 py-150 rounded-8 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400"
          >
            Apply Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Setting;
