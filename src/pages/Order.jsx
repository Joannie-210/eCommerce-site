import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Order = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const ordersData = [
    { name: 'Jan', orders: 30 },
    { name: 'Feb', orders: 45 },
    { name: 'Mar', orders: 60 },
    { name: 'Apr', orders: 40 },
    { name: 'May', orders: 75 },
    { name: 'Jun', orders: 50 },
  ];

  const recentOrders = [
    { id: "001", item: "Women's heals", date: "2025-05-25", status: "Delivered" },
    { id: "002", item: "Women's casual shoe", date: "2025-05-27", status: "Processing" },
    { id: "003", item: "Women's sneakers", date: "2025-05-29", status: "Shipped" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <aside className="w-48 h-auto rounded-lg bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-md hidden md:block p-4">
        <div className="text-2xl font-extrabold tracking-wide mb-6">
          <Link to='/'>LuxeStride</Link>
        </div>
        <nav className="space-y-4">
          <NavLink to="/" className="block py-2 px-4 hover:bg-indigo-600 rounded">Dashboard</NavLink>
          <NavLink to="/order" className="block py-2 px-4 hover:bg-indigo-600 rounded">Orders</NavLink>
          <NavLink to="/wishlist" className="block py-2 px-4 hover:bg-indigo-600 rounded">Wishlist</NavLink>
          <NavLink to="/settings" className="block py-2 px-4 hover:bg-indigo-600 rounded">Settings</NavLink>
          <NavLink to="/profile" className="block py-2 px-4 hover:bg-indigo-600 rounded">Profile</NavLink>
          <button onClick={handleLogout} className="block w-full text-left py-2 px-4 hover:bg-indigo-600 rounded">Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Order Trends</h2>
          <div className="bg-white p-4 rounded shadow w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersData}>
                <Line type="monotone" dataKey="orders" stroke="#4f46e5" strokeWidth={2} />
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.item}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Order;
