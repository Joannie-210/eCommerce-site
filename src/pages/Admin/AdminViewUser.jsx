import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../../services/adminService";
import toast from "react-hot-toast";
import "../../components/styles/AdminViewUser.css";

const AdminViewUser = () => {
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUserById("" + id);
        setUserDetails(user);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  if (loading) return <p>Loading user details...</p>;
  if (!userDetails) return <p>No user found.</p>;

  return (
    <div className="user-view-container">
      <h2 className="user-view-title">User Details</h2>
      <div className="user-detail-card">
        <p>
          <strong>Name:</strong> {userDetails.fullName}
        </p>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong>Role:</strong> {userDetails.isAdmin ? "Admin" : "Customer"}
        </p>
        <p>
          <strong>Account Created:</strong>{" "}
          {new Date(userDetails.createdAt).toLocaleString()}
        </p>
        {userDetails.hasShippingAddress && userDetails.shippingAddress && (
          <div className="shipping-details">
            <h3>Shipping Address</h3>
            <p>
              {userDetails.shippingAddress.firstName}{" "}
              {userDetails.shippingAddress.lastName}
            </p>
            <p>{userDetails.shippingAddress.address}</p>
            <p>
              {userDetails.shippingAddress.city},{" "}
              {userDetails.shippingAddress.state},{" "}
              {userDetails.shippingAddress.country}
            </p>
            <p>{userDetails.shippingAddress.postalCode}</p>
            <p>{userDetails.shippingAddress.phone}</p>
          </div>
        )}
      </div>
      <div className="user-view-actions">
        <button onClick={() => navigate(-1)} className="back-btn">
          Back
        </button>
        <button
          onClick={() =>
            navigate(`/superadmin-dashboard/users/edit/${userDetails._id}`)
          }
          className="edit-btn"
        >
          Edit User
        </button>
      </div>
    </div>
  );
};

export default AdminViewUser;
