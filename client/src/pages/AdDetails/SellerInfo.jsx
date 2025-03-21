import React from "react";
import { Link } from "react-router";

const SellerInfo = ({ author }) => {
  const { email, phone, facebook, instagram, business_email } = author;
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold border-b pb-2 mb-4 text-[#014D48]">
          Seller Contact Information
        </h3>

        <div className="mt-4 space-y-2">
          <div className="border p-2 rounded-md bg-[#FFE5D5] text-center space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {email && (
              <a href={`mailto:${email}`} className="w-full max-w-xs">
                <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white w-full max-w-xs">
                  <p className="whitespace-normal break-words overflow-hidden text-ellipsis text-sm text-center leading-tight break-all">
                    {email}
                  </p>
                </div>
              </a>
            )}

            {business_email && (
              <a href={`mailto:${email}`} className="w-full max-w-xs">
                <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white w-full max-w-xs">
                  <p className="whitespace-normal break-words overflow-hidden text-ellipsis text-sm text-center leading-tight break-all">
                    {business_email}
                  </p>
                </div>
              </a>
            )}

            {phone && (
              <a href={`tel:${phone}`} className="w-full max-w-xs">
                <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white w-full max-w-xs">
                  <p className="whitespace-normal break-words text-sm text-center leading-tight">
                    {phone}
                  </p>
                </div>
              </a>
            )}

            {facebook && (
              <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white">
                <a
                  href={facebook}
                  target="_blank"
                  className="text-[#001C27] hover:text-white"
                >
                  Facebook
                </a>
              </div>
            )}

            {instagram && (
              <div className="btn bg-white text-[#001C27] p-2 rounded-md border border-[#001C27] hover:bg-[#FA8649] hover:text-white">
                <a
                  href={instagram}
                  target="_blank"
                  className="text-[#001C27] hover:text-white"
                >
                  Instagram
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#FFE5D5] p-6 rounded-2xl shadow-lg border border-[#FA8649] text-[#001C27] my-10">
        <h2 className="text-xl font-semibold mb-3">
          Stay Safe When Using Our Platform
        </h2>
        <p className="text-sm text-[#001C27] mb-4">
          Always verify offers and avoid sharing personal details. Read our
          safety guidelines to stay protected.
        </p>
        <Link className="flex justify-center" to="/safety-guide">
          <button className="px-6 py-3 bg-[#014D48] text-white rounded-lg shadow-md hover:bg-[#FA8649] transition md:w-40">
            Safety Guides
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SellerInfo;
