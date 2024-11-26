import { ReactComponent as Logo } from './../assets/images/logo.svg';
import { ReactComponent as Google } from './../assets/images/icon-google.svg';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailInput from '../components/authForms/EmailInput';
import PasswordInput from '../components/authForms/PasswordInput';
import FormHeader from '../components/authForms/FormHeader';

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
        <FormHeader title='Welcome to Note' subtitle='Please log in to continue'/>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-200 pt-300">
          <EmailInput value={formData.email} onChange={handleInputChange} errorMessage={error.email}/>

          {/* Password Input */}
          <PasswordInput
            value={formData.password}
            onChange={handleInputChange}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            hintVisible={false}
            forgotPasswordLink='/forgotpassword'
          />

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
        <p className="text-preset-5 text-center text-custom-neutral-600 dark:text-custom-neutral-300">No account yet? <Link to="/register" className="text-custom-neutral-950 dark:text-custom-neutral-200 hover:text-custom-blue-500">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
