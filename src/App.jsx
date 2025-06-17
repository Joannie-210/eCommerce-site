import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { CartProvider } from "./contexts/cartContext";
import Products from "./pages/Products";
import Product from './pages/Product'
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
// import Settings from './pages/Settings'
import Order from "./pages/Order";
// import Wishlist from "./pages/Wishlist";
import UserRegistration from "./pages/UserRegistration";
import HomePage from "./pages/Homepage";
import CategoryPage from "./pages/categoryPage";
import CartPage from "./pages/cart";
import { Toaster } from "react-hot-toast";
import LogoutPage from "./pages/Logout";
import SuperAdminDashboard from "./pages/Admin/SuperAdminDashboard";
import CreateProductForm from "./pages/Admin/CreateProductForm";
import AdminUsersList from "./pages/Admin/AdminUsersList";
import AdminViewUser from "./pages/Admin/AdminViewUser";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

const App = () => {
  
  return (
    <AuthProvider>
      <CartProvider>
      <Router>

        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/logout" element={<LogoutPage/>} />
            <Route path="/order" element={<Order/>} />
          <Route path="/product/:id" element={<Products/>}/>
          {/* <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/settings" element={<Settings/>} /> */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/superadmin-dashboard"
            element={
              <ProtectedRoute>
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="products" element={<CreateProductForm />} />
            <Route path="users" element={<AdminUsersList />} />
            <Route path="users/:id" element={<AdminViewUser />} />
          </Route>

          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;