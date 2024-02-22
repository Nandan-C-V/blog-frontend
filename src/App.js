import "./App.css";

import About from "./pages/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import DashBoard from "./pages/DashBoard";
import PrivateRouter from "./component/PrivateRouter";
import Profile_info from "./pages/Profile_info";
import Post from "./component/Post";
import PostPage from "./pages/PostPage";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/posts/:postId" element={<PostPage />} />
        <Route path="/user" element={<PrivateRouter />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="profile-info" element={<Profile_info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
