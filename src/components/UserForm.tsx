import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserForm.module.css";

const UserForm = () => {
  const { id } = useParams(); // دریافت ID کاربر برای ویرایش (در صورت وجود)
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      // اگر ID وجود دارد، کاربر را از API دریافت کن
      const fetchUser = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://reqres.in/api/users/${id}`);
          setUser({
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            email: response.data.data.email,
          });
        } catch (err) {
          setError("Failed to load user data.");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        // ویرایش کاربر
        const response = await axios.put(`https://reqres.in/api/users/${id}`, user, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`User updated successfully: ${response.data.first_name} ${response.data.last_name}`);
      } else {
        // ایجاد کاربر جدید
        const response = await axios.post("https://reqres.in/api/users", user, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`User created successfully: ${response.data.first_name} ${response.data.last_name}`);
      }
      navigate("/users");
    } catch (err) {
      setError("Failed to save user data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["user-form-container"]}>
      <h2>{id ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        {error && <p className={styles["error"]}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/users")}
          className={`${styles["cancel-button"]} ${styles["button"]}`}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
