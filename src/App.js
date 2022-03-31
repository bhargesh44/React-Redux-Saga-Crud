import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import About from "./Pages/About";
import AddEditUser from "./Pages/AddEditUser";
import Home from "./Pages/Home";
import UserInfo from "./Pages/UserInfo";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addUser" element={<AddEditUser />} />
          <Route exact path="/editUser/:id" element={<AddEditUser />} />
          <Route exact path="/userInfo/:id" element={<UserInfo />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
