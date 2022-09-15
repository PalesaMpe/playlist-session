import Login from "./components/login";
import Main from "./components/Main";
import Hash from "./components/hash";
import { NotFound } from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="*" element={<Hash />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
