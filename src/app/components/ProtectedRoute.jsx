
"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Auth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const user = (localStorage.getItem('userToken'));
    const userIsAuthenticated = user !== null;

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push('/login');
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}




// "use client"

// import { redirect } from 'next/navigation';

// const ProtectedRoute = (component) => {
//     let token="";
//     if(typeof window !== "undefined"){
//         token = (window.localStorage.getItem("userToken"))
//     }

//     console.log("token", !token, token)
//     if(token){
//         redirect("/login")
//     }

//   return component
// }

// export default ProtectedRoute