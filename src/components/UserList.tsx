import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserList.module.css";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false); // Flag برای به‌روزرسانی لیست
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("https://reqres.in/api/users?page=1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedUsers: User[] = response.data.data;
      const filteredUsers = fetchedUsers.filter((user) => !deletedUsers.includes(user.id));
      setUsers(filteredUsers);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate, deletedUsers, refresh]); // وابستگی به `refresh` برای به‌روزرسانی لیست

  const handleDelete = async (id: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully!");
      setDeletedUsers((prev) => [...prev, id]); // افزودن کاربر به لیست حذف شده
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleCreateUser = () => {
    navigate("/user/create", { state: { refresh: true } }); // هدایت به صفحه ایجاد کاربر
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className={styles["error"]}>{error}</p>;

  return (
    <div className={styles["user-list-container"]}>
      <h2>Users List</h2>
      <button
        className={styles["create-button"]}
        onClick={() => {
          handleCreateUser();
          setRefresh(!refresh); // تغییر فلگ برای به‌روزرسانی لیست
        }}
      >
        Create User
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <p>
              {user.first_name} {user.last_name}
            </p>
            <div>
              <button onClick={() => navigate(`/user/${user.id}`)}>View Details</button>
              <button
                onClick={() => navigate(`/user/edit/${user.id}`)}
                className={styles["edit-button"]}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className={styles["delete-button"]}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
