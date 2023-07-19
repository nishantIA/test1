"use client"
import { create, getData } from '@/app/api/api'
import { CreditCardIcon, KeyIcon, SquaresPlusIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'



export default function Edit({params}) {
  const initialFormData = {name:"", email:"", contact_number:""}
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();

//   useEffect(()=>{
//     const fetchData = async () => {
//       const  {responseData, responseStatus, error, errorMessage}  = await getData("customers");
//         console.log(responseData.data[0]?.attributes)
//         setFormData(responseData?.data[0]?.attributes);
//       };
//       fetchData();
//   },[])

  function getFormData(e){
    let {name,value} = e.target;
    setFormData({...formData,[name]:value});
  }

  async function submitForm(e){
    e.preventDefault();
    const res = await create("customers",{data:{...formData}});
    if(res?.ok){
      router.refresh()
      router.back()
    }
    console.log(res);
    console.log(res);
  }

  return (
    <div className="py-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <div className="m-auto w-1/2  space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form action="#" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Create new customer</h3>
                {/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p> */}
              </div>

              <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Customer name
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={formData.name}
                    onChange={getFormData}
                  />
                </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Contact number
                  </label>
                  <input
                    type="text"
                    name="contact_number"
                    autoComplete="given-name"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={formData.contact_number}
                    onChange={getFormData}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={formData.email}
                    onChange={getFormData}
                  />
                </div>

                

  
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                onClick={submitForm}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
