import { FaRegUser, FaEraser, FaVolumeUp } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="my-10 text-center">
      <h3 className="text-4xl font-bold text-[#014D48]">How It Works</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {/* Step 1 - Create Account */}
        <div className="flex flex-col items-center p-6 border rounded-2xl shadow-lg bg-[#FFE5D5]">
          <div className="text-[#FA8649] text-4xl">
            <FaRegUser />
          </div>
          <h3 className="text-lg font-semibold mt-3">Create an Account</h3>
          <p className="text-sm text-[#001C27] mt-2">
            Sign up for free and verify your email to start posting ads.
          </p>
        </div>

        {/* Step 2 - Post Your Ad */}
        <div className="flex flex-col items-center p-6 border rounded-2xl shadow-lg bg-[#FA8649] text-white">
          <div className="text-4xl">
            <FaEraser />
          </div>
          <h3 className="text-lg font-semibold mt-3">Post Your Ad</h3>
          <p className="text-sm mt-2">
            List your service or event with details and reach potential customers.
          </p>
        </div>

        {/* Step 3 - Get Offers */}
        <div className="flex flex-col items-center p-6 border rounded-2xl shadow-lg bg-[#014D48] text-white">
          <div className="text-4xl">
            <FaVolumeUp />
          </div>
          <h3 className="text-lg font-semibold mt-3">Get Offers</h3>
          <p className="text-sm mt-2">
            Receive responses from interested users and grow your business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
