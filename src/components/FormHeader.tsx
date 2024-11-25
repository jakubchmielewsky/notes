import React from "react";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle}) => {
  return (
    <div className="text-center">
      <h2 className="text-preset-1 font-bold text-custom-neutral-950 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-100 text-preset-5 text-custom-neutral-600 dark:text-custom-neutral-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default FormHeader;
