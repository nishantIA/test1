/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

"use client"
import React from "react";
import { useState } from "react";
import { signin } from "../api/api";
import Image from "next/image";
// import { cookies } from "next/headers";

export default function LoginPage() {
    const initialFormData = {identifier:"", password:""};
    const [formData, setFormData] = useState(initialFormData);
    const [disabled, setDiasbled] = useState(false);
    const [invalidCredentials,setInvalidCredentials] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility(e) {
        e.preventDefault()
        setIsPasswordVisible((prev) => !prev);
    }

    function getFormData(e){
        const {name, value} = e.target;
        setFormData(prev=>({...prev, [name]:value.trim()}))
        setDiasbled(false)
        setInvalidCredentials(false)
    }

    function checkEmptyInput(){
       for(let key in formData){
        if(!formData[key]){
            return true
        }
       }
       return false
    }

    // async function addItem(data) {
    //     'use server'
    //     const cartId = cookies().get('cartId')?.value
    //     await saveToDb({ cartId, data })
    //   }

    async function submitFormData(e){
        e.preventDefault();
        const isInputFieldEmpty = checkEmptyInput();

        if(isInputFieldEmpty){
            setEmptyInput(true)
        }else{
            setDiasbled(true)
            let data = await signin(formData)

            if(data?.jwt && typeof window !== "undefined"){
                window.localStorage.setItem("userToken", data.jwt);
                window.localStorage.setItem("user", JSON.stringify(data.user));
            }else{
                setInvalidCredentials(true)
            }
            console.log(data)
        }
        console.log(formData)
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="relative mx-auto w-3/5 aspect-[8/1]">
                <Image src={"/assets/logos/IA-logo.png"} alt="IA Logo" fill/>
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="sm:mx-auto mt-4 sm:w-full h-6 sm:max-w-sm"> 
                {invalidCredentials? <p className="text-center transition-opacity ease-in-out delay-300 bg-gray-200 text-red-500">Invalid credentials!</p>:null}
           </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  User ID
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="identifier"
                    type="text"
                    autoComplete="email"
                    required
                    onChange={getFormData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-none px-1 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="text-red-500 text-sm h-5 mt-1">{emptyInput && !formData.identifier ? <p>Field required*</p>:""}</div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-red-600 hover:text-red-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="relative mt-2">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    onChange={getFormData}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm outline-none px-1 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                    </svg>
                    ) : (
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    )}
                </button>
                </div>
                <div className="text-red-500 text-sm h-5 mt-1">{emptyInput && !formData.password ? <p>Field required*</p>:""}</div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={submitFormData}
                  disabled={disabled}
                  className="flex disabled:opacity-25 w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  