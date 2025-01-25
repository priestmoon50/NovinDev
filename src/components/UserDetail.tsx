import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UserDetail.module.css"; // ایمپورت استایل

const UserDetail = () => {
  const { id } = useParams(); // دریافت ID کاربر از URL
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login"); // اگر توکن وجود ندارد، کاربر را به صفحه لاگین هدایت کنید
        return;
      }

      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.data);
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles["user-detail-container"]}>
      <button onClick={() => navigate(-1)} className={styles.button}>
        Back
      </button>
      {user && (
        <div>
          <img src={user.avatar} alt={user.first_name} />
          <h2>
            {user.first_name} {user.last_name}
          </h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
