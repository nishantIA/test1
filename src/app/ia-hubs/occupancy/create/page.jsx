"use client";
import { create, getData } from "@/app/api/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import CustomerSearchQuery from "@/app/components/searchQuery/CustomerSearchQuery";
import SeatSearchQuery from "@/app/components/searchQuery/SeatSearchQuery";
import NavigateBackButton from "@/app/components/buttons/NavigateBackButton";

export default function Edit({ searchParams }) {
  const initialFormData = {
    customer: 0,
    inventory: 0,
    startDate: "",
    endDate:""
  };
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const [customer, setCustomer] = useState();
  const [inventory, setInventory] = useState();

  function getFormData(e) {
    let { name, value } = e.target;
    formData.customer = customer?.id;
    formData.inventory = inventory?.id;
    setFormData({ ...formData, [name]: value });
  }


  async function submitForm(e) {
    e.preventDefault();
    if(formData.endDate===""){
      delete formData.endDate;
    }
    const res = await create("allocations", { data: { ...formData } });
    if (res?.ok) {
      router.refresh();
      router.back();
    }
    console.log(formData);
    console.log(res);
  }

  function selectedCustomer(data) {
    setCustomer(data);
    console.log(data.id);
  }

  function selectedInventory(data) {
    console.log(data);
    setInventory(data);
  }

  return (
    <div className="py-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <NavigateBackButton/>
      <div className="m-auto w-1/2  space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form action="#" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Create new occupancy
                </h3>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <SeatSearchQuery
                    getSelectedInventoryDataFromQuery={selectedInventory}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <CustomerSearchQuery
                    getSelectedCustomerDataFromQuery={selectedCustomer}
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={formData.startDate}
                    onChange={getFormData}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={formData.endDate}
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
  );
}
