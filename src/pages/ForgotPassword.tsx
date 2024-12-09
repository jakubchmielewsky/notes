import { ReactComponent as Logo } from './../assets/images/logo.svg';

import { useState } from 'react';
import EmailInput from '../components/authForms/EmailInput';
import FormHeader from '../components/authForms/FormHeader';

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({ email: ""});
  const [error, setError] = useState({ email: "", password: "" });

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


    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-custom-neutral-100 px-200 py-100 font-inter dark:bg-custom-neutral-700">
      <div className="container max-w-[540px] tablet:px-600 flex flex-col gap-200 bg-white border-1 border-custom-neutral-200 px-200 py-600 rounded-12 dark:bg-custom-neutral-950 dark:border-custom-neutral-700">

        <div>
          <Logo className="m-auto current-color dark:text-white" />
        </div>

        <FormHeader title='Forgotten your password?' subtitle='Enter your email below, and we’ll send you a link to reset it.'/>

        <form onSubmit={handleSubmit} className="flex flex-col gap-200 pt-300">
          <EmailInput value={formData.email} onChange={handleInputChange} errorMessage={error.email}/>

          <button type="submit" className="w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
