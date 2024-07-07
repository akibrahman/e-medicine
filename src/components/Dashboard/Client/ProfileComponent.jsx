import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const ProfileComponent = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center min-h-full px-20 md:px-32 py-5 bg-dashboard text-slate-100">
      <div className={`w-full md:w-1/2 flex flex-col items-center relative`}>
        <Image
          alt={`Profile picture of ${user.name}`}
          src={user.photo}
          width={200}
          height={200}
          className="mb-5 rounded-full aspect-square"
        />
        <p className="mb-1 text-blue-500 font-medium text-xl text-center w-max">
          {user.name}
        </p>
        <p>{user.email}</p>
        <p>Role: {convertCamelCaseToCapitalized(user.role)}</p>

        {/* {user.isVerified ? (
          <div className="flex flex-col md:flex-row items-center gap-3 mt-2">
            {" "}
            <p
              className={`flex items-center gap-1 w-max px-4 py-1 rounded-full font-semibold ${
                user.role === "owner" ? "text-blue-500" : "text-green-500"
              }`}
            >
              <TiTick className="text-xl" />
              Verified
            </p>
          </div>
        ) : (
          <p
            className={`flex items-center gap-1 w-max px-4 py-1 rounded-full font-semibold mt-2 bg-red-500 select-none`}
          >
            <FaTimes className="text-xl" />
            Unverified
          </p>
        )} */}
      </div>
      <div className="w-full md:w-1/2"></div>
    </div>
  );
};

export default ProfileComponent;
