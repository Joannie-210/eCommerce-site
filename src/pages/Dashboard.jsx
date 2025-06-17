
import React from "react";
import { useAuth } from "../contexts/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { FaTable } from 'react-icons/fa';


const Dashboard = () => {
  const { user} = useAuth(); 
  const navigate = useNavigate();

  return (
    <div className="flex ml-2 h-screen">
      {/* Sidebar */}
      <aside className=" w-34 rounded-2xl h-160 m-auto flex flex-col items-center gap-2 px-4 py-2 bg-accent text-white font-medium">
      <FaTable className="text-2xl cursor-pointer" />
        <nav className="space-y-4">
          <a href="#" className="block hover:text-blue-300">Overview</a>
          <a href="#" className="block hover:text-blue-300">Analytics</a>
          <a href="#" className="block hover:text-blue-300">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex bg-[#fafafa] flex-col">
        {/* Top Nav */}
        <header className="bg-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Welcome back!</h2>
          <div>
            <span className="mr-4">Hi, {user?.username || 'User'}</span>  {/* Display username */}
            <div className="w-50 flex justify-evenly items-center">
           <button className="w-full h-full flex items-center gap-2 px-4 py-2 border-2 border-purple-800 bg-[#6b46ff] text-white rounded-lg bg-accent font-medium"  onClick={()=> navigate("/")}>Home</button>
            <button 
              onClick={()=> navigate("/login")}
              className="w-full h-full flex items-center gap-2 px-4 py-2 border-2 border-purple-800 bg-accent font-medium"
            >
              Logout
            </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6 bg-[#fafafa] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <form className="flex flex-col items-center gap-2 mb-4">
             <span className="flex items-center justify-center gap-5"><label htmlFor="name" className="text-lg font-medium">Name</label>
             <input type="text" value = 'Joanna Enoch' className="border border-gray-300 rounded px-4 py-2" readOnly />
             </span>
             <span className="flex items-center justify-center gap-5"><label htmlFor="role" className="text-lg font-medium">Role</label>
             <input type="text" value = 'Customer' className="border border-gray-300 rounded px-4 py-2" readOnly />
             </span>
             <span className="flex items-center justify-center gap-5">
             <label htmlFor="date" className="text-lg font-medium">Date</label>
             <input type="datw" value = 'Friday 4th April, 2025' className="border border-gray-300 rounded px-4 py-2" readOnly />
             </span>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium">New Users</h3>
              <p className="mt-2 text-2xl font-bold">1,245</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium">Performance</h3>
              <p className="mt-2 text-2xl font-bold">87%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
