  import React from "react";
  import { useAuth } from "../contexts/AuthContext";
  import { useNavigate, NavLink, Link } from "react-router-dom";

  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
  } from "recharts";

  const orderData = [
    { name: "Jan", orders: 12 },
    { name: "Feb", orders: 19 },
    { name: "Mar", orders: 5 },
    { name: "Apr", orders: 22 },
  ];

  const pieData = [
    { name: "Delivered", value: 60 },
    { name: "Pending", value: 30 },
    { name: "Cancelled", value: 10 },
  ];

  const COLORS = ["#34D399", "#FBBF24", "#F87171"];

  const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    
  const handleLogout = () => {
    logout();            // Clears localStorage and sets user to null
    navigate("/login");  // Redirects to login page
  };

    return (
      <div className="min-h-screen bg-gray-50 flex font-sans">
        {/* Sidebar */}
        <aside className="w-48 h-auto rounded-lg bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-md hidden md:block p-4">
          <div className="text-2xl font-extrabold tracking-wide mb-6"><Link to='/'>LuxeStride</Link></div>
          <nav className="space-y-4">
            <NavLink to="/" className="block py-2 px-4 hover:bg-indigo-600 rounded">Dashboard</NavLink>
            <NavLink to="/order" className="block py-2 px-4 hover:bg-indigo-600 rounded">Orders</NavLink>
            <NavLink to="/wishlist" className="block py-2 px-4 hover:bg-indigo-600 rounded">Wishlist</NavLink>
            <NavLink to="/settings" className="block py-2 px-4 hover:bg-indigo-600 rounded">Settings</NavLink>
            <NavLink to="/profile" className="block py-2 px-4 hover:bg-indigo-600 rounded">Profile</NavLink>
            <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-indigo-600 rounded">Logout</button>
          </nav>
        </aside>

        {/* Main Section */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="bg-white px-6 py-4 shadow flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {user?.fullName}</h1>
            <div className="flex items-center gap-4">
            
          
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Orders", value: "42" },
                { label: "Pending Orders", value: "3" },
                { label: "Wishlist", value: "9 items" },
                { label: "Total Spent", value: "$1,234" },
              ].map((card, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-shadow">
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">Orders Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={orderData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">Order Status</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <section className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                  <thead className="bg-gray-100 text-gray-500">
                    <tr>
                      <th className="px-4 py-2">Order ID</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">#1234</td>
                      <td className="px-4 py-2">April 20, 2025</td>
                      <td className="px-4 py-2 text-green-500">Delivered</td>
                      <td className="px-4 py-2">$299</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">#1233</td>
                      <td className="px-4 py-2">April 15, 2025</td>
                      <td className="px-4 py-2 text-yellow-500">Pending</td>
                      <td className="px-4 py-2">$89</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Wishlist Preview */}
            <section className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-4">Wishlist</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-gray-100 p-4 rounded-xl hover:shadow-md transition">
                  <img src="/product1.jpg" alt="Product" className="w-full h-32 object-cover rounded-md" />
                  <p className="mt-2 text-sm font-medium">Vintage Leather Bag</p>
                  <span className="text-sm text-gray-500">$120</span>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  };

  export default UserDashboard;
