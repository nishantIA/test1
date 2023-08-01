"use client"
import { create, getData } from '@/app/api/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NavigateBackButton from '@/app/components/buttons/NavigateBackButton';

export default function AddInventory({searchParams}) {
  const initialFormData = {seat_id:"", type:"", capacity:"",seat_price:0, currency:"INR", hub:Number(searchParams.hubId)}
  const userSession = useSession();
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  
  function setNewFormData(e){
    let {name,value} = e.target;
    setFormData({...formData,[name]:value});
  }

  async function submitForm(e){
    e.preventDefault();
    const newInvetoryData = {data:formData};
    const res = await create("inventories", userSession?.data?.token, newInvetoryData);
    if(res?.ok){
      router.refresh()
      router.back()
    }
    console.log(res)
  }

  return (
    <div className="py-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <div className="m-auto w-1/2  space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form action="#" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Customer Information</h3>
                {/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p> */}
              </div>

              <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="seat_id" className="block text-sm font-medium text-gray-700">
                    Seat ID
                  </label>
                  <input
                    type="text"
                    name="seat_id"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    // value={formData.seat_id}
                    onChange={setNewFormData}
                  />
                </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="" className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    // value={formData.capacity}
                    onChange={setNewFormData}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="country"
                    name="type"
                    // value={formData.type}
                    onChange={setNewFormData}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={""}>Choose an option</option>
                    <option value={"single-seat"}>Single Seat</option>
                    <option value={"cabin"}>Cabin</option>
                    <option value={"meeting-room"}>Meeting Room</option>
                  </select>
                </div>  
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="" className="block text-sm font-medium text-gray-700">
                    Seat Price
                  </label>
                  <input
                    type="text"
                    name="seat_price"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    // value={formData.seat_price}
                    onChange={setNewFormData}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="country"
                    name="currency"
                    // value={formData.currency}
                    onChange={setNewFormData}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value={""}>Choose an option</option>
                    <option value={"INR"}>INR</option>
                    <option value={"USD"}>USD</option>
                  </select>
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
