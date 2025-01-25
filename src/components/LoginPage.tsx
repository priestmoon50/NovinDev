import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("https://reqres.in/api/login", data);
      sessionStorage.setItem("token", response.data.token);
      onLogin();
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-group"]}>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className={styles["error"]}>{errors.email.message}</p>}
        </div>
        <div className={styles["form-group"]}>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p className={styles["error"]}>{errors.password.message}</p>}
        </div>
        {error && <p className={styles["error"]}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
