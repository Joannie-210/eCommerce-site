import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import {
  fetchProductsList,
  fetchUsersList2,
} from "../../services/adminService";
import { Outlet, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

const COLORS = ["#6366f1", "#10b981", "#facc15", "#f97316"];

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
    <div className="bg-gray-100 p-3 rounded-full">
      <Icon className="w-6 h-6 text-gray-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, products] = await Promise.all([
          fetchUsersList2(),
          fetchProductsList(),
        ]);
        setUserCount(users.length);
        setProductCount(products.length);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  const barData = [
    { name: "Users", value: userCount },
    { name: "Products", value: productCount },
    { name: "Orders", value: 845 },
    { name: "Revenue", value: 76230 },
  ];

  const pieData = [
    { name: "Users", value: userCount },
    { name: "Products", value: productCount },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#cc5500] text-white p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Admin Dahboard</h2>
        <ul className="space-y-3 text-gray-700 text-sm">
          <li>
            <Link
              to="/superadmin-dashboard"
              className="hover:text-indigo-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/products"
              className="hover:text-indigo-600"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/users"
              className="hover:text-indigo-600"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/orders"
              className="hover:text-indigo-600"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/colors"
              className="hover:text-indigo-600"
            >
              Colors
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/brands"
              className="hover:text-indigo-600"
            >
              Brands
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/reviews"
              className="hover:text-indigo-600"
            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin-dashboard/statistics"
              className="hover:text-indigo-600"
            >
              Statistics
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.fullName}
          </h1>
          <p className="text-gray-600 text-sm">You have admin privileges.</p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Users" value={userCount} icon={Users} />
          <StatCard title="Total Products" value={productCount} icon={Package} />
          <StatCard title="Total Orders" value="845" icon={ShoppingCart} />
          <StatCard title="Total Revenue" value="₦76,230" icon={DollarSign} />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Data Overview (Bar)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Distribution (Pie)
            </h3>
            {pieData.every((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">
                Not enough data to display pie chart.
              </p>
            )}
          </div>
        </section>

        {/* Nested Routes Outlet */}
        <section className="bg-[#cc5500] p-6 rounded-xl shadow">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
