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
    imageUrl: "",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const navigate = useNavigate();

  const toast = (msg, type = "success") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 2500);
  };

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
        form
      );
      toast("User updated successfully");
      setEditingUserId(null);
    } else {
      await axios.post("https://crudapp-wdls.onrender.com/api/users", form);
      toast("User created successfully");
    }

    setForm({ name: "", email: "", imageUrl: "" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    await axios.delete(`https://crudapp-wdls.onrender.com/api/users/${id}`);
    toast("User deleted", "error");
    fetchUsers();
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    });
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

      {toastMsg && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: toastMsg.type === "success" ? "#4caf50" : "#f44336",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {toastMsg.msg}
        </div>
      )}
    </div>
  );
};

export default App;