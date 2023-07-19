"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const people = [
  { id: 1, name: "Leslie Alexander" },
  { id: 1, name: "Lesl" },
  { id: 1, name: "Niel" },
  { id: 1, name: "John Alexander" },
  { id: 1, name: "John Alexander" },
  { id: 1, name: "John Alexander" },
  { id: 1, name: "Jack Alexander" },
  { id: 1, name: "Leslie Alexander" },
  // More users...
];

const Occupancy = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // 
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventories?filters[seat_id][$contains]=${searchQuery}&pagination[start]=0&pagination[limit]=5`;
  const [data, setData] = useState([]);

  const [selectedSeat, setSelectedSeat] = useState(null);

  const filteredData =
    searchQuery === ""
      ? data
      : data.filter((item) => {
          const value = item.attributes.seat_id.toLowerCase().includes(searchQuery.toLowerCase());
          console.log(value)
          return value
        });

  function setSearchQueryValue(e) {
    setSearchQuery(e.target.value);
  }

  const searchQueryData = useCallback(
    async (url) => {
      if (searchQuery !== "") {
        const response = await fetch(url);
        if(!response?.ok){
          return
        }
        const responseData = await response.json();
        setData(responseData?.data);
      }
    },[searchQuery])

  useEffect(() => {
    let timer = setTimeout(() => {
      searchQueryData(url)
    }, 1000);
    return () => clearTimeout(timer);
  }, [url, searchQueryData]);

  return (
    <div className="py-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <div className="m-auto w-1/2  space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <form action="#" method="POST">
          <div className="shadow sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Customer Information
                </h3>
                {/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p> */}
              </div>
              <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
              <Combobox
                as="div"
                value={selectedSeat}
                onChange={setSelectedSeat}
              >
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  Seat ID
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                    onChange={setSearchQueryValue}
                    displayValue={(person) => person}
                    placeholder="Search seat id..."
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
                          value={element.attributes.seat_id}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                              active
                                ? "bg-red-600 text-white"
                                : "text-gray-900"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  "block truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {element.attributes.seat_id}
                              </span>

                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute z-10 inset-y-0 right-0 flex items-center pr-4",
                                    active ? "text-white" : "text-red-600"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
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
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Occupancy;
