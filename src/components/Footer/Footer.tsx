import { motion } from "framer-motion";
import "./footer.css";

const Footer = () => {
  return (
    <motion.footer
      className="footer-container text-white text-center py-3 mt-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
   <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>

    </motion.footer>
  );
};

export default Footer;
