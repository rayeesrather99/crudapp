import "../styles/Dashboard.css";

const Dashboard = ({ form, setForm, handleSubmit, editingUserId, users }) => {
  return (
    <div className="dashboard">
      {/* TOP STATS */}
      <div className="stats-row">
        <div className="stat-box">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div className="stat-box">
          <h3>System Status</h3>
          <p>Active</p>
        </div>

        <div className="stat-box">
          <h3>Operations</h3>
          <p>Real-time CRUD Operations</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        {/* FORM */}
        <div className="form-section">
          <h2>{editingUserId ? "Edit User" : "Create User"}</h2>

          <form onSubmit={handleSubmit} className="user-form">
            <input
              type="text"
              placeholder="Enter Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />

            {/* <input
              type="text"
              placeholder="Instagram URL"
              value={form.instagram || ""}
              onChange={(e) => setForm({ ...form, instagram: e.target.value })}
            />

            <input
              type="text"
              placeholder="Facebook URL"
              value={form.facebook || ""}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            /> 

            <input
              type="text"
              placeholder="X Profile URL"
              value={form.x || ""}
              onChange={(e) => setForm({ ...form, x: e.target.value })}
            /> */}

            <button type="submit">
              {editingUserId ? "Update User" : "Create User"}
            </button>
          </form>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <div className="info-card">
            <h3>About System</h3>
            <p>
              This dashboard allows you to perform CRUD operations with a modern
              UI and real-time updates.
            </p>
          </div>

          <div className="activity-card">
            <h3>Quick Tips</h3>
            <ul>
              <li>Add users with proper image URLs</li>
              <li>Edit users using the edit button</li>
              <li>Delete users carefully</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
