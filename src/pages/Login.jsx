import { Link, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/mainLogo.png';
import emailIcon from '../assets/icons/email-icon.png';
import passwordIcon from '../assets/icons/password-icon.png';
import { useState } from 'react';
import { authService } from '../services';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //? Form Validation Function

  const validateForm = () => {
    let isValid = true;
    let errorMessages = {
      email: '',
      password: '',
    };

    // validate email
    if (!email) {
      errorMessages.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessages.email = 'Email is not valid';
      isValid = false;
    }

    // validate password
    if (!password) {
      errorMessages.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      errorMessages.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setError(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await authService.login(email, password);
        console.log(data);

        if (data && data.token) {
          localStorage.setItem('authToken', data.token); // Save the token in localStorage
          localStorage.setItem(
            'userIdentity',
            JSON.stringify(data.userDetails)
          ); // Optionally store user data
          navigate('/main'); // Redirect to main page
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error', error);
      }
    }

    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-bg-image bg-cover bg-center">
      <img
        src={mainLogo}
        alt="main-logo"
        className="lg:w-[250px] w-[180px] relative -top-[45px] mx-auto max-w-full"
      />
      <div className="bg-white rounded-xl p-20 w-[500px] max-w-full mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-7">
            <h2 className="lg:text-3xl text-2xl font-semibold">
              Welcome Back!
            </h2>
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="test@dev.com"
                value={email}
                onChange={handleChange}
                className="border border-[#303030] rounded-md px-10 py-3 placeholder:text-[#303030] placeholder:text-sm w-full"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src={emailIcon} alt="email-icon" className="w-4 h-4" />
              </span>
            </div>
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*********"
                value={password}
                onChange={handleChange}
                className="border border-[#303030] rounded-md px-10 py-3 placeholder:text-[#303030] placeholder:text-sm w-full"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img
                  src={passwordIcon}
                  alt="password-icon"
                  className="w-4 h-4"
                />
              </span>
              <Link
                to=""
                className="text-pink-500 absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-normal"
              >
                Forgot Password?
              </Link>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>
          <div className="flex gap-1 justify-end mt-2 mb-4 text-sm">
            <input type="checkbox" className="w-[17px]" />
            <span>Remember Me</span>
          </div>
          <button
            className="uppercase text-base focus:outline-none text-center w-full bg-[#5932EA] text-white rounded-md px-3 py-3"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
