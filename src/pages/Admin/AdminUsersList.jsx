import { useEffect, useState } from "react";
import { fetchUsersList } from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../components/styles/AdminUsersList.css";

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch initial users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { users: initialUsers, nextCursor } = await fetchUsersList();
        setUsers(initialUsers);
        setNextCursor(nextCursor);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Filter/search logic
  useEffect(() => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) =>
        roleFilter === "admin" ? user.isAdmin : !user.isAdmin
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const handleView = (userId) => {
    navigate(`/superadmin-dashboard/users/${userId}`);
  };

  const handleEdit = (userId) => {
    navigate(`/superadmin-dashboard/users/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const { users: moreUsers, nextCursor: newCursor } = await fetchUsersList(
        nextCursor
      );
      setUsers((prev) => [...prev, ...moreUsers]);
      setNextCursor(newCursor);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm("Are you sure you want to delete selected users?")) {
      toast.success("Selected users deleted successfully");
      setUsers((prev) =>
        prev.filter((user) => !selectedUsers.includes(user._id))
      );
      setSelectedUsers([]);
    }
  };

  return (
    <div className="users-list-container">
      <h2 className="users-list-title">User Management</h2>

      {/* Search & Filter */}
      <div className="users-filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        {selectedUsers.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="delete-selected-btn"
          >
            Delete Selected ({selectedUsers.length})
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={(e) => {
                      setSelectedUsers(
                        e.target.checked
                          ? filteredUsers.map((user) => user._id)
                          : []
                      );
                    }}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => toggleSelectUser(user._id)}
                      />
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Admin" : "Customer"}</td>
                    <td>
                      <button onClick={() => handleView(user._id)}>View</button>
                      <button onClick={() => handleEdit(user._id)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {nextCursor && (
            <div className="load-more-container">
              <button
                onClick={handleLoadMore}
                className="load-more-btn"
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsersList;
