import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state || "/";
  const axiosSecure = useAxiosSecure();
  const { signIn, signInWithGoogle, resetPassword, user, loading } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      if (user) {
        const userProfile = {
          name: user.displayName,
          email: user.email,
        };

        // Send user profile to the backend
        const { data } = await axiosSecure.post("/profile", userProfile);
      }
      navigate(destination, { replace: true });
      toast.success("Sign-in Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      navigate(destination, { replace: true });
      toast.success("Sign-in Successful");
    } catch (err) {
      console.log(err);
      console.log(err.message);
      toast.error(err?.message);
      navigate("/");
    }
  };

  const handleResetPassword = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email.");
        return;
      }
      await resetPassword(email);
      toast.success("Password reset email sent. Check your inbox.");
      setIsModalOpen(false); // Close the modal after successful reset request
    } catch (err) {
      toast.error("Failed to send reset email.");
      setIsModalOpen(false); // Close the modal even if it fails
    }
  };

  if (user || loading) return null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-[#014D48] font-semibold">
            Welcome back!
          </p>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-[rgb(1,77,72)] hover:text-white transition"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b"></span>
            <p className="text-xs text-center text-gray-500 uppercase hover:underline">
              or login with email
            </p>
            <span className="w-1/5 border-b"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-[#014D48]">
                Email Address
              </label>
              <input
                name="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#014D48] focus:ring-[#014D48] focus:ring-opacity-40 focus:outline-none focus:ring"
                type="email"
                required
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-[#014D48]">
                  Password
                </label>
                <p
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs text-[#014D48] hover:text-[#FA8649] cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>
              <input
                name="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#014D48] focus:ring-[#014D48] focus:ring-opacity-40 focus:outline-none focus:ring"
                type="password"
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#014D48] border border-[#014D48] rounded-lg hover:bg-[#FA8649] focus:outline-none focus:bg-[#FA8649] focus:ring focus:ring-[#FA8649] focus:ring-opacity-50"
              >
                Sign In
              </button>
            </div>
          </form>
             <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-gray-400 md:w-1/4"></span>
            <Link to="/signup" className="text-xs text-[#001C27] uppercase hover:underline">
              or sign up
            </Link>
            <span className="w-1/5 border-b border-gray-400 md:w-1/4"></span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg text-center text-[#014D48]">Reset Password</h3>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-[#014D48]">Enter your email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-[#014D48] focus:ring-[#014D48] focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={handleResetPassword}
                className="px-4 py-2 bg-[#014D48] text-white rounded-lg hover:bg-[#FA8649]"
              >
                Reset Password
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
