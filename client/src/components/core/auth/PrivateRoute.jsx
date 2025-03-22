
// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  console.log("444444444444444444444444444444444444444444444444"+token)

  useEffect(() => {
    console.log("Token from Redux:", token);
  }, [token]);


  if (token !== null) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
