import Login from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
import Hash from "./components/hash";
import Study from "./components/Study";
import Travel from "./components/Travel";
import Exercise from "./components/Exercise";
import Contact from "./components/Contact";

import Admin from "./components/Administrator/Admin";
import Update from "./components/Administrator/Update";
import Enquiry from "./components/Administrator/Enquiry";
import ViewAdmin from "./components/Administrator/ViewAdmin";
import AdminRegister from "./components/Administrator/AdminRegister";
import Profile from "./components/Profile";
import SpotifyProfile from "./components/SpotifyProfile";
import Ratings from "./components/Ratings";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SpotifyProfile" element={<SpotifyProfile />} />

          <Route path="/Update" element={<Update />} />
          <Route path="*" element={<Hash />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Ratings" element={<Ratings />} />

          <Route path="/Admin" element={<Admin />} />
          <Route path="/Enquiry" element={<Enquiry />} />
          <Route path="/ViewAdmin" element={<ViewAdmin />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />

          <Route path="/Main" element={<Main />} />
          <Route path="/Study" element={<Study />} />
          <Route path="/Travel" element={<Travel />} />
          <Route path="/Exercise" element={<Exercise />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
