import { ReactComponent as Logo } from './../assets/images/logo.svg';
import { ReactComponent as Google } from './../assets/images/icon-google.svg';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmailInput from '../components/authForms/EmailInput';
import PasswordInput from '../components/authForms/PasswordInput';
import FormHeader from '../components/authForms/FormHeader';
import { useUserStore } from '../stores/UserStore';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const {register} =useUserStore();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const validate = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!emailRegex.test(formData.email)) {
      setError((prev) => ({ ...prev, email: "Please enter a valid email address." }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      register(formData.email, formData.password);
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-custom-neutral-100 px-200 py-100 font-inter dark:bg-custom-neutral-700">
      <div className="container max-w-[540px] tablet:px-600 flex flex-col gap-200 bg-white border-1 border-custom-neutral-200 px-200 py-600 rounded-12 dark:bg-custom-neutral-950 dark:border-custom-neutral-700">

        <div>
          <Logo className="m-auto current-color dark:text-white" />
        </div>

        <FormHeader title='Create Your Account' subtitle='Sign up to start organizing your notes and boost your productivity.'/>

        <form onSubmit={handleSubmit} className="flex flex-col gap-200 pt-300">
          <EmailInput value={formData.email} onChange={handleInputChange} errorMessage={error.email}/>

          <PasswordInput
            value={formData.password}
            onChange={handleInputChange}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            hintVisible={true}
          />

          <button type="submit" className="w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">Sign Up</button>
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

        <p className="text-preset-5 text-center text-custom-neutral-600 dark:text-custom-neutral-300">Already have an account? <Link to="/login" className="text-custom-neutral-950 dark:text-custom-neutral-200 hover:text-custom-blue-500">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
