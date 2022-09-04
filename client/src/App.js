import { Route, Routes } from "react-router-dom";
import UserContext from "./UserContext";
import { useState } from "react";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navigation from "./pages/components/Navigation";
import EditItem from "./pages/EditItem";
import NotFound from "./pages/NotFound";
import AddItem from "./pages/AddItem";

function App() {
  const [user, setUser] = useState({});
  // add item page
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/items/:id" element={<EditItem />} />
          <Route path="/items/new" element={<AddItem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
