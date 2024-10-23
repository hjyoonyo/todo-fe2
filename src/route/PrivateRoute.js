import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({user, children}) => {
  return (
    //children = 자식컨포넌트. react가 자동으로 넘겨줌
    user? children : <Navigate to='/login'/>
  )
}
//user 값이 있으면? Todopage : redirect to /login
export default PrivateRoute