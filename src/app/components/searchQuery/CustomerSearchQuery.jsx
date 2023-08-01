"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CustomerSearchQuery = ({
  getSelectedCustomerDataFromQuery,
  currentCustomer,
  requestType,
  setFormDataWithCustomerData,
  currentFormData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customers?filters[name][$contains]=${searchQuery}&pagination[start]=0&pagination[limit]=5`;

  const filteredData =
    searchQuery === ""
      ? data
      : data.filter((item) => {
          const value = item.attributes.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
          return value;
        });

  function setSearchQueryValue(e) {
    setSearchQuery(e.target.value);
  }

  const searchQueryData = useCallback(
    async (url) => {
      if (searchQuery !== "") {
        const response = await fetch(url);
        if (!response?.ok) {
          return;
        }
        const responseData = await response.json();
        setData(responseData?.data);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      searchQueryData(url);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url, searchQueryData]);

  function selectedCustomerData(id) {
    const data = filteredData.find((customer) => customer.id === id);

    getSelectedCustomerDataFromQuery(data);
    setSelectedCustomer(data?.attributes?.name);

    if (requestType === "edit") {
      setFormDataWithCustomerData({ ...currentFormData, customer: id });
    }
  }

  return (
    <Combobox
      as="div"
      value={selectedCustomer || currentCustomer?.attributes?.name || ""}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Customer name
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
          onChange={setSearchQueryValue}
          displayValue={(person) => person}
          name="customer"
          placeholder="Search customer name..."
          autoComplete="off"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredData.length > 0 && (
          <Combobox.Options className="absolute z-1000 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredData.map((element) => (
              <Combobox.Option
                key={element.id}
                value={element.attributes.name || ""}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-red-600 text-white" : "text-gray-900"
                  )
                }
                onClick={() => selectedCustomerData(element.id)}
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {element.attributes.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute z-10 inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-red-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default CustomerSearchQuery;
