import { ReactComponent as Logo } from './../assets/images/logo.svg';
import { ReactComponent as Show } from './../assets/images/icon-show-password.svg';
import { ReactComponent as Hide } from './../assets/images/icon-hide-password.svg';
import { ReactComponent as Google } from './../assets/images/icon-google.svg';
import { ReactComponent as Info } from './../assets/images/icon-info.svg';

//import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  // Toggles the visibility of the password field
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Handles form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" }); // Clear field-specific errors on change
  };

  // Validates the form
  const validate = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!emailRegex.test(formData.email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      isValid = false;
    }

    return isValid;
  };

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);
      // Submit logic here
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-custom-neutral-100 px-200 py-100 font-inter dark:bg-custom-neutral-700">
      <div className="container max-w-[540px] tablet:px-600 flex flex-col gap-200 bg-white border-1 border-custom-neutral-200 px-200 py-600 rounded-12 dark:bg-custom-neutral-950 dark:border-custom-neutral-700">

        {/* Logo Section */}
        <div>
          <Logo className="m-auto current-color dark:text-white" />
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-preset-1 font-bold text-custom-neutral-950 dark:text-white">Welcome to Note</h2>
          <p className="mt-100 text-preset-5 text-custom-neutral-600 dark:text-custom-neutral-300">Please log in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-200 pt-300">
          {/* Email Input */}
          <div className="flex flex-col gap-075">
            <label htmlFor="email" className="text-preset-4 dark:text-white">Email Address</label>
            <input
              id="email"
              name="email"
              onChange={handleInputChange}
              type="text"
              className={`border-1 text-custom-neutral-500 border-custom-neutral-300 rounded-8 px-200 py-150 text-preset-5 bg-inherit cursor-pointer hover:bg-custom-neutral-50 focus:border-black focus:outline outline-offset-2 outline-2 outline-custom-neutral-500 dark:border-custom-neutral-600 dark:text-custom-neutral-600 hover:dark:bg-custom-neutral-700 dark:text-white ${error.email&&"border-custom-red-500 dark:border-custom-red-500"}`}
              placeholder="email@example.com"
            />
            {error.email&&<div className='flex gap-100 items-center'><Info className="current-color text-custom-red-500 w-[16px] h-[16px]"/><p className='text-preset-6 text-custom-red-500'>{error.email}</p></div>}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-075">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-preset-4 dark:text-white">Password</label>
              <a href="#" className="text-preset-6 underline text-custom-neutral-600 hover:text-custom-blue-500 dark:text-custom-neutral-400">Forgot</a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                onChange={handleInputChange}
                type={showPassword ? "text" : "password"}
                className={`w-full border-1 text-custom-neutral-500 border-custom-neutral-300 rounded-8 px-200 py-150 text-preset-5 bg-inherit cursor-pointer hover:bg-custom-neutral-50 focus:border-black focus:outline outline-offset-2 outline-2 outline-custom-neutral-500 dark:border-custom-neutral-600 dark:text-custom-neutral-600 hover:dark:bg-custom-neutral-700 dark:text-white ${error.password&&"border-custom-red-500 dark:border-custom-red-500"}`}
              />
              <button type="button" onClick={toggleShowPassword} className="absolute top-[50%] translate-y-[-50%] right-200">
                {!showPassword ? <Show className="w-[20px] h-[20px] current-color text-custom-neutral-500 dark:text-custom-neutral-300"/> : <Hide className="w-[20px] h-[20px] current-color text-custom-neutral-500 dark:text-custom-neutral-300" />}
              </button>
            </div>
            {error.password&&<div className='flex gap-100 items-center'><Info className="current-color text-custom-red-500 w-[16px] h-[16px]"/><p className='text-preset-6 text-custom-red-500'>{error.password}</p></div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">Login</button>
        </form>

        {/* Alternative Login */}
        <div className="flex flex-col gap-200 pt-300 text-center border-t-1 dark:border-custom-neutral-800">
          <p className="text-preset-5 text-custom-neutral-600 dark:text-custom-neutral-300">Or log in with:</p>
          <button className="flex justify-center items-center gap-200 border-1 border-custom-neutral-300 py-150 rounded-12 text-preset-3 font-medium hover:bg-custom-neutral-50     dark:text-white dark:border-custom-neutral-600 hover:dark:bg-custom-neutral-700">
            <Google className="w-[24px] h-[24px] current-color dark:text-white" />
            Google
          </button>
        </div>

        <div className="border-t-1 dark:border-custom-neutral-800"></div>

        {/* Sign-Up Link */}
        <p className="text-preset-5 text-center text-custom-neutral-600 dark:text-custom-neutral-300">No account yet? <a href="#" className="text-custom-neutral-950 dark:text-custom-neutral-200 hover:text-custom-blue-500">Sign Up</a></p>
      </div>
    </div>
  );
};

export default Login;
