import { FaRegUser } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
const HowItWorks = () => {
  return (
    <div className='my-10'>
      <h3 className="text-4xl font-bold">
      How it Works
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-10'>
        {/* Card 1 */}

        <div>
        <div className="flex flex-col  gap-2 items-center p-4 border rounded-lg shadow-md bg-white">
    <div className="text-blue-500 text-3xl mr-4">
    <FaRegUser />
    </div>
    <div>
        <h3 className="text-lg font-semibold">Create Account</h3>
        <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam consectetur sit amet ante nec vulputate.
        </p>
    </div>
</div>

        </div>
        <div>
        <div className="flex flex-col  gap-2 items-center p-4 border rounded-lg shadow-md bg-white">
    <div className="text-blue-500 text-3xl mr-4">
    <FaEraser />
    </div>
    <div>
        <h3 className="text-lg font-semibold">Post your Ad</h3>
        <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam consectetur sit amet ante nec vulputate.
        </p>
    </div>
</div>

        </div>
        <div>
        <div className="flex flex-col  gap-2 items-center p-4 border rounded-lg shadow-md bg-white">
    <div className="text-blue-500 text-3xl mr-4">
    <FaVolumeUp />
    </div>
    <div>
        <h3 className="text-lg font-semibold">Get Offers</h3>
        <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit aliquam consectetur sit amet ante nec vulputate.
        </p>
    </div>
</div>

        </div>

      </div>
    </div>
  )
}

export default HowItWorks
