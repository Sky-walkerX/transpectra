import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Dashboard from "./pages/Dashboard";
import Analytics from "./components/core/Dashboard/Analytics";
import Inventory from "./components/core/Dashboard/Inventory";
import Cookies from "js-cookie";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Orders from "./components/core/Dashboard/Orders";
import CreateOrder from "./components/core/Dashboard/CreateOrder";
import TrackDelivery from "./components/core/Dashboard/TrackDelivery";
import { getUserDetails } from "./services/oparations/profileAPI";
import FleetActivity from "./components/core/Dashboard/FleetActivity";
import SupplierOrders from "./components/core/Dashboard/SupplierOrders";
import FulfillOrder from "./components/core/Dashboard/FulfillOrder";
import OrderDetails from "./components/core/Dashboard/OrderDetails";
import WarehouseForm from "./pages/WarehouseForm";
import YardForm from "./pages/YardForm";
import IncomingFleetPage from "./components/core/Dashboard/IncomingFleetPage";
import FleetOverviewPage from "./components/core/Dashboard/FleetOverviewPage";
import CompanyForm from "./pages/CompanyForm";
import ProductSelectionPage from "./components/core/ProductSelectionPage";
import { fetchCompanyDetails } from "./services/oparations/CompanyAPI";
import { fetchWarehouseDetails } from "./services/oparations/warehouseAPI";
import YardProfile from "./components/core/Dashboard/YardProfile"
import SingleProductOrderPage from "./components/core/Dashboard/SingleProductOrderPage";
import { fetchYardDetails } from "./services/oparations/YardAPI";
import FetchedDeliveries from "./components/core/Dashboard/fetchedDeliveries";
import RouteDetails from "./components/core/Dashboard/RouteDetails";
import { setToken } from "./slices/authSlice";
import AboutUs from "./components/core/AboutUs";
import Services from "./components/core/Services";
import ContactUs from "./components/core/ContactUs"; // Assuming you have a ContactUs component
import YardActivities from "./components/core/Dashboard/YardActivites";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("8888888888888888888888888900000000"+storedToken);
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);


  useEffect(() => {
    console.log("I want the token from here :");
    const token = Cookies.get("token");
    if (token) {
      console.log("This is token", token);
      dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user && user._id) {
      console.log("User fetched, triggering dependent dispatches",user);
      if(user?.accountType==="Warehouse_Manager"){
      dispatch(fetchCompanyDetails(user._id));
      }else if(user?.accountType==="Supplier"){
      dispatch(fetchWarehouseDetails(user._id));
      }
      else{
        let a = user._id;
        dispatch(fetchYardDetails({managerId: a}));
      }
    }
  }, [user, dispatch]);

  return (
    <div className="flex min-h-screen w-screen flex-col bg-white font-inter overflow-y-auto hide-horizontal-scroll ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/warehouse-form" element={<WarehouseForm />} />
        <Route path="/yard-form" element={<YardForm />} />
        <Route path="/company-form" element={<CompanyForm />} />
        <Route path="/inventory-selection" element={<ProductSelectionPage />} />
        <Route element={<Dashboard />}>
          {/* private Routes = */}
          <Route
            path="dashboard/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/incomingtruck"
            element={
              <PrivateRoute>
                <IncomingFleetPage />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/route-details"
            element={
              <PrivateRoute>
                <RouteDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/exitingtruck"
            element={
              <PrivateRoute>
                <FleetActivity />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/Settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/order-deliveries"
            element={
              <PrivateRoute>
                <FetchedDeliveries/>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/create-order"
            element={
              <PrivateRoute>
                <CreateOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/order-details/:orderId"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/deliveries"
            element={
              <PrivateRoute>
                <SupplierOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/track-delivery"
            element={
              <PrivateRoute>
                <TrackDelivery />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/fleetActivity"
            element={
              <PrivateRoute>
                <YardActivities />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/fulfill-order"
            element={
              <PrivateRoute>
                <FulfillOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/inventory-select"
            element={
              <PrivateRoute>
                <ProductSelectionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/product-order"
            element={
              <PrivateRoute>
                <SingleProductOrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard/my-profile-yard"
            element={
              <PrivateRoute>
                <YardProfile/>
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;