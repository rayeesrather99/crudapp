import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";

import "./styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
  name: "",
  email: "",
  imageUrl: ""
});
  const [editingUserId, setEditingUserId] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await axios.get("https://crudapp-wdls.onrender.com/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUserId) {
      await axios.put(
        `https://crudapp-wdls.onrender.com/api/users/${editingUserId}`,
        form,
      );
      toast.success("User updated successfully ✅");
      setEditingUserId(null);
    } else {
      await axios.post("https://crudapp-wdls.onrender.com/api/users", form);
      toast.success("User created successfully 🎉");
    }

    setForm({ name: "", email: "", imageUrl: "" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await axios.delete(`https://crudapp-wdls.onrender.com/api/users/${id}`);
    toast.error("User deleted ❌");
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditingUserId(user._id);
    navigate("/dashboard");
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <h2>CRUD App</h2>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </div>

      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                editingUserId={editingUserId}
                users={users}
              />
            }
          />
          <Route
            path="/users"
            element={
              <Users
                users={users}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            }
          />
        </Routes>
      </div>
      <ToastContainer
      position="top-center"
      autoClose={2000}
      theme="dark"
    />
    </div>
    
  );
};

export default App;
