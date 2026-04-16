import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      <h1>Welcome to CRUD App</h1>
      <p className="subtitle">
        Perform Create, Read, Update, Delete operations in real-time
      </p>

      <div className="features">

        <div className="feature-card">
          <div className="icon">➕</div>
          <h3>Create</h3>
          <p>Add new users to database</p>
        </div>

        <div className="feature-card">
          <div className="icon">📄</div>
          <h3>Read</h3>
          <p>View all stored users</p>
        </div>

        <div className="feature-card">
          <div className="icon">✏️</div>
          <h3>Update</h3>
          <p>Edit user information</p>
        </div>

        <div className="feature-card">
          <div className="icon">🗑️</div>
          <h3>Delete</h3>
          <p>Remove users easily</p>
        </div>

      </div>

      <button className="cta" onClick={() => navigate("/dashboard")}>
        Go to Dashboard →
      </button>

    </div>
  );
};

export default Home;