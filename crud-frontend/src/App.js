import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // Removed BrowserRouter
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', imageUrl: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  const navigate = useNavigate(); // useNavigate is now within a Router context

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://crudapp-wdls.onrender.com/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(`https://crudapp-wdls.onrender.com/api/users/${editingUserId}`, form);
        setEditingUserId(null);
      } else {
        await axios.post('https://crudapp-wdls.onrender.com/api/users', form);
      }
      setForm({ name: '', email: '', imageUrl: '' });
      fetchUsers();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://crudapp-wdls.onrender.com/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleEdit = (user) => {
    setForm(user); // Set form data
    setEditingUserId(user._id); // Track the editing user's ID
    navigate('/'); // Redirect to the create user page
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <nav>
        <Link to="/">Create User</Link> | <Link to="/users">Read Users</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <form onSubmit={handleSubmit} className="user-form">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
              <button type="submit">{editingUserId ? 'Update User' : 'Create User'}</button>
            </form>
          }
        />
        <Route
          path="/users"
          element={
            <div className="user-cards">
              {users.map((user) => (
                <div key={user._id} className="user-card">
                  <img
                    src={user.imageUrl || 'https://via.placeholder.com/150'}
                    alt={user.name}
                    className="user-image"
                  />
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <div className="card-buttons">
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
