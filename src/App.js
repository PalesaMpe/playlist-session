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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Admin" element={<Admin />} />

          <Route path="/Update" element={<Update />} />
          <Route path="*" element={<Hash />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Enquiry" element={<Enquiry />} />

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
