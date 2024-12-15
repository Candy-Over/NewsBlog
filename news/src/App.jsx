import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav"
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import News from "./components/News";
import ForgetPassword from "./components/ForgetPassword";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Register from "./components/Register";
import SearchPage from "./components/SearchPage";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const App=()=>{

  return(
    <>
      <Routes>
        <Route path="/" element={<Nav/>}>
          <Route index element={<News />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/search/:id" element={<SearchPage />} />
          <Route path="/profile" element={ <Profile /> }/>
        </Route>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/user/login/forgot-password" element={<ForgetPassword />}/>
        <Route path="/login/admin" element={ <AdminLogin /> }/>
        <Route path="/register" element={ <Register /> }/>
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
      
    </>
  )
}

export default App;