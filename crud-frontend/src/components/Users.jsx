import "../styles/Users.css";

const Users = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="user-cards">
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="user-card">
            <img
              src={user?.imageUrl || "https://via.placeholder.com/150"}
              alt="user"
            />

            <h3>{user?.name || "No Name"}</h3>
            <p>{user?.email || "No Email"}</p>

            <div className="card-buttons">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button
                className="delete-button"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No users found
        </p>
      )}
    </div>
  );
};

export default Users;