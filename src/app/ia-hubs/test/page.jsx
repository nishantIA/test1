import TestChildComponent from "@/app/components/test/TestChildComponent";
import { ContextProvider } from "@/app/context/ContextProvider";
import React, { useContext } from 'react'
import ProtectedRoute from "@/app/context/ProtextedRoute";


const Page = () => {
    
  return (
    <ContextProvider>
      <ProtectedRoute>
       <TestChildComponent/>
      </ProtectedRoute>
    </ContextProvider> 
  )
}

export default Page