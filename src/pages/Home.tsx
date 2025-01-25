import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* متن خوش‌آمدگویی */}
      <motion.h1
        className="welcome-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Website!
      </motion.h1>

      {/* توضیح کوتاه */}
      <motion.p
        className="welcome-subtext"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        Explore and enjoy your time here!
      </motion.p>

    </div>
  );
};

export default Home;
