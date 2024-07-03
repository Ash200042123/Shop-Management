import { getCookie } from "@/utils/cookie-utils";
import { Navigate, Outlet } from "react-router-dom"


const AuthLayout = () => {

    const token = getCookie();
    
    if(token){
      return <Navigate to="/products" replace /> 
    }

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default AuthLayout