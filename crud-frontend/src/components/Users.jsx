import "../styles/Users.css";

const Users = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="user-cards">
      {users.map((user) => (
        <div key={user._id} className="user-card">
          <img src={user.imageUrl || "https://via.placeholder.com/150"} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <div className="socials">
            {user.instagram && (
              <a href={user.instagram} target="_blank">
                📸
              </a>
            )}
            {user.facebook && (
              <a href={user.facebook} target="_blank">
                📘
              </a>
            )}
            {user.x && (
              <a href={user.x} target="_blank">
                🐦
              </a>
            )}
          </div>

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
      ))}
    </div>
  );
};

export default Users;
