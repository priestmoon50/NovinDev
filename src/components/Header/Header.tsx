import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token"); // بررسی وجود توکن برای احراز هویت

    const handleLogout = () => {
        sessionStorage.removeItem("token"); // حذف توکن از sessionStorage
        navigate("/login"); // انتقال به صفحه لاگین
    };

    return (
        <motion.nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <Link className="navbar-brand" to="/">My Website</Link>
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link text-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
};

export default Header;
