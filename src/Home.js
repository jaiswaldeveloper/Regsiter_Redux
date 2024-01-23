import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "./actions/userAction";
import { useNavigate } from "react-router-dom";

const Home = () => {
const dispatch = useDispatch()
const navigate = useNavigate();

// Access the user object from the state
const user = useSelector((store) => store.user.user[0]); // Access the first user in the array
// console.log("state in Home component:", user);

// Check if user object is not empty and has a name property
const userName = user && user.name;
console.log("userName in Home component:", userName);



const handleLogOut = ()=>{
  dispatch(LogOut())
  navigate("/")
}

  return (
    <div>
      {" "}
      <p>Home</p> 
      <p>userName in Home component: {userName}</p>
      <button className="btn btn-warning" onClick={handleLogOut} >Logout</button>
    </div>
  );
};

export default Home;
