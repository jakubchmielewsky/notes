import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Show } from "./../assets/images/icon-show-password.svg"; // Ensure the correct path
import { ReactComponent as Hide } from "./../assets/images/icon-hide-password.svg";
import { ReactComponent as Info } from "./../assets/images/icon-info.svg";

interface PasswordInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  hintVisible?: boolean;
  placeholder?: string;
  label?: string;
  forgotPasswordLink?: string;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id = "password",
  name = "password",
  value,
  onChange,
  showPassword,
  toggleShowPassword,
  hintVisible = false,
  label = "Password",
  forgotPasswordLink = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-075 ${className}`}>
      {/* Label with "Forgot Password" Link */}
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-preset-4 dark:text-white">
          {label}
        </label>
       {forgotPasswordLink&& <Link
          to={forgotPasswordLink}
          className="text-preset-6 underline text-custom-neutral-600 hover:text-custom-blue-500 dark:text-custom-neutral-400"
        >
          Forgot
        </Link>}
      </div>

      {/* Password Input Field */}
      <div className="relative">
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          className="w-full border-1 text-custom-neutral-500 border-custom-neutral-300 rounded-8 px-200 py-150 text-preset-5 bg-inherit cursor-pointer hover:bg-custom-neutral-50 focus:border-black focus:outline outline-offset-2 outline-2 outline-custom-neutral-500 dark:border-custom-neutral-600 dark:text-custom-neutral-600 hover:dark:bg-custom-neutral-700 dark:text-white"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute top-[50%] translate-y-[-50%] right-200 outline-none"
        >
          {!showPassword ? (
            <Show className="w-[20px] h-[20px] current-color text-custom-neutral-500 dark:text-custom-neutral-300" />
          ) : (
            <Hide className="w-[20px] h-[20px] current-color text-custom-neutral-500 dark:text-custom-neutral-300" />
          )}
        </button>
      </div>

      {/* Hint Message */}
      {hintVisible && (
        <div className="flex gap-100 items-center">
          <Info className="current-color text-custom-neutral-500 w-[16px] h-[16px]" />
          <p className="text-preset-6 text-custom-neutral-500">
            At least 8 characters.
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
