import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-[#cc5500]">Your Profile</h2>

      <div className="space-y-4 text-gray-700 text-lg">
        <div>
          <p className="font-semibold text-gray-900">Full Name</p>
          <p className="mt-1">{user?.fullName || "Not provided"}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-900">Email</p>
          <p className="mt-1">{user?.email || "Not provided"}</p>
        </div>

        <div>
          <p className="font-semibold text-gray-900">ID</p>
          <p className="mt-1">{user?.id || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
