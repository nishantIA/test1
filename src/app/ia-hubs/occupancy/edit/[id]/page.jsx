"use client";
import { edit, getOne } from "@/app/api/api";
import {
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavigateBackButton from "@/app/components/buttons/NavigateBackButton";
import CustomerSearchQuery from "@/app/components/searchQuery/CustomerSearchQuery";
import SeatSearchQuery from "@/app/components/searchQuery/SeatSearchQuery";

export default function Edit({ params }) {
  const initialFormData = {
    customer: 0,
    inventory: 0,
    startDate: "",
    endDate: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const [customer, setCustomer] = useState();
  const [inventory, setInventory] = useState();

  const fetchData = useCallback(async()=>{
      const { data } = await getOne("allocations", params.id);
      console.log(data);
      setCustomer(data?.attributes?.customer?.data);
      setInventory(data?.attributes?.inventory?.data);
      setFormData({startDate:data?.attributes?.startDate, endDate:data?.attributes?.endDate,customer:customer?.id,inventory:inventory?.id});
  },[params.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function getFormData(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  async function submitForm(e) {
    e.preventDefault();
    if(formData.endDate===""){
      formData.endDate=null;
    }
    formData.customer = customer?.id
    formData.inventory = inventory?.id
    const res = await edit("allocations", params.id, { data: { ...formData } });
    console.log(res);

    if (res?.ok) {
      router.refresh();
      router.back();
    }
  }

  function selectedCustomer(data) {
    setCustomer({...data});
  }
  console.log(customer)
  function selectedInventory(data) {
    setInventory({...data});
  }

  return (
    <div className="py-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <NavigateBackButton />
      <div className="m-auto w-1/2  space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form action="#" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Update occupancy
                </h3>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <SeatSearchQuery
                    getSelectedInventoryDataFromQuery={selectedInventory}
                    currentSeat = {inventory}
                    setFormDataWithInventoryData = {setFormData}
                    currentFormData = {formData}
                    requestType="edit"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <CustomerSearchQuery
                    getSelectedCustomerDataFromQuery={selectedCustomer}
                    currentCustomer = {customer}
                    setFormDataWithCustomerData = {setFormData}
                    currentFormData = {formData}
                    requestType="edit"
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
