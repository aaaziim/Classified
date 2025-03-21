import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react"; 
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DynamicTitlePage from "../../Components/DynamicTitlePage";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, user, loading } = useAuth();
  const axiosSecure = useAxiosSecure()
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
      
      toast.success("Sign-in Successful");
    } catch (err) {
      toast.error(err?.message);
    }
  
  };
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
   

    try {
        await createUser(email, password);

        // Send user profile data to backend
        const profile = { name,   email };
        try {
            await axiosSecure.post(`/profile`, profile);
        } catch (err) {
            toast.error(err.response.data);
        }

        // Show toast message to verify email
        
        
        // Do NOT navigate to profile or log the user in
    } catch (err) {
        toast.error(err?.message);
    }
};




  if (user || loading) return null;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-300px)] p-4">
       <DynamicTitlePage title={`Sign Up | SideGurus`} />

      <div className="flex w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
     

          <p className="mt-3 text-xl text-center text-[#001C27]">
            Get Your Free Account Now.
          </p>

          <div
            onClick={handleGoogleSignIn}
            className="flex cursor-pointer items-center justify-center mt-4 border border-[#014D48] rounded-lg hover:bg-[rgb(1,77,72)] hover:text-white transition"
          >
            <div className="px-4 py-2">
            <svg className='w-6 h-6' viewBox='0 0 40 40'>
                  <path
                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                    fill='#FFC107'
                  />
                  <path
                    d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                    fill='#FF3D00'
                  />
                  <path
                    d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                    fill='#1976D2'
                  />
                </svg>
            </div>
            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with Google
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-gray-400 lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase">
              or Register with Email
            </div>
            <span className="w-1/5 border-b border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4 mt-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-[#001C27]">Name</label>
              <input
                name="name"
                className="w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                type="text"
                required
              />
            </div>

         

      
            
      

            <div>
              <label className="block mb-1 text-sm font-medium text-[#001C27]">Email Address</label>
              <input
                name="email"
                className="w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                type="email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-[#001C27]">Password</label>
              <input
                name="password"
                className="w-full border border-[#014D48] rounded-lg p-2 focus:ring focus:ring-[#FA8649]"
                type="password"
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-sm text-[#001C27]">
                I agree to the{" "}
                <Link to="/privacy" className="text-[#FA8649] hover:underline">
                Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#014D48] rounded-lg hover:bg-[#FA8649] focus:outline-none focus:ring focus:ring-[#014D48] focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b border-gray-400 md:w-1/4"></span>
            <Link to="/signin" className="text-xs text-[#001C27] uppercase hover:underline">
              or sign in
            </Link>
            <span className="w-1/5 border-b border-gray-400 md:w-1/4"></span>
          </div>
        </div>

        <div
          className="hidden bg-cover bg-center  lg:w-1/2 lg:flex lg:justify-center lg:items-center"
          
        >
          <h1 className="text-4xl font-extrabold"><span className="text-[#014D48] font-semibold text-2xl">
              SideGurus.com
            </span></h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
