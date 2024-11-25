import React from "react";
import { ReactComponent as Info } from "./../assets/images/icon-info.svg"; // Ensure the correct path

interface EmailInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  label?: string;
  className?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  id = "email",
  name = "email",
  value,
  onChange,
  placeholder = "email@example.com",
  errorMessage,
  label = "Email Address",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-075 ${className}`}>
      {/* Label */}
      <label htmlFor={id} className="text-preset-4 dark:text-white">
        {label}
      </label>
      
      {/* Input Field */}
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className={`border-1 text-custom-neutral-500 border-custom-neutral-300 rounded-8 px-200 py-150 text-preset-5 bg-inherit cursor-pointer hover:bg-custom-neutral-50 focus:border-black focus:outline outline-offset-2 outline-2 outline-custom-neutral-500 dark:border-custom-neutral-600 dark:text-custom-neutral-600 hover:dark:bg-custom-neutral-700 dark:text-white ${
          errorMessage && "border-custom-red-500 dark:border-custom-red-500"
        }`}
        placeholder={placeholder}
      />
      
      {/* Error Message */}
      {errorMessage && (
        <div className="flex gap-100 items-center">
          <Info className="current-color text-custom-red-500 w-[16px] h-[16px]" />
          <p className="text-preset-6 text-custom-red-500">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EmailInput;
