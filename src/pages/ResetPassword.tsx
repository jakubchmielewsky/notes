import { ReactComponent as Logo } from './../assets/images/logo.svg';

import { useState } from 'react';
import PasswordInput from '../components/authForms/PasswordInput';
import FormHeader from '../components/authForms/FormHeader';

const ResetPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({ password: "", confirm: "" });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirm = () => setShowConfirm((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
  };

  return (
    <div className="h-screen flex items-center justify-center bg-custom-neutral-100 px-200 py-100 font-inter dark:bg-custom-neutral-700">
      <div className="container max-w-[540px] tablet:px-600 flex flex-col gap-200 bg-white border-1 border-custom-neutral-200 px-200 py-600 rounded-12 dark:bg-custom-neutral-950 dark:border-custom-neutral-700">

        <div>
          <Logo className="m-auto current-color dark:text-white" />
        </div>

        <FormHeader title='Reset Your Password' subtitle='Choose a new password to secure your account.'/>

        <form onSubmit={handleSubmit} className="flex flex-col gap-200 pt-300">
          <PasswordInput
            label='New Password'
            value={formData.password}
            onChange={handleInputChange}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            hintVisible={true }
          />
          <PasswordInput
            id='confirm'
            label='Confirm New Password'
            name='confirm'
            value={formData.confirm}
            onChange={handleInputChange}
            showPassword={showConfirm}
            toggleShowPassword={toggleShowConfirm}
            hintVisible={false}
          />

          <button type="submit" className="w-full bg-custom-blue-500 px-200 py-150 rounded-8 text-white hover:bg-custom-blue-700 focus:outline outline-offset-2 outline-2 outline-custom-neutral-400">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
