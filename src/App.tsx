import React, { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Home = React.lazy(() => import("./pages/Home"));
const LoginPage = React.lazy(() => import("./components/LoginPage"));
const UserList = React.lazy(() => import("./components/UserList"));
const UserDetail = React.lazy(() => import("./components/UserDetail"));
const UserForm = React.lazy(() => import("./components/UserForm"));


// Example Login

// id : eve.holt@reqres.in
// password : cityslicka

const App = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/users");
  };

  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/user/create" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;



