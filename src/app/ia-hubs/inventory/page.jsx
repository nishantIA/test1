import { getData } from "@/app/api/api"
import findPath from "@/app/common/common";
import DeleteButton from "@/app/components/buttons/DeleteButton";
import Link from "next/link";

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

export default async function CustomersList() {
    const  {responseData, responseStatus, error, errorMessage}  = await getData("inventories");
    
    if (error) {
      return <h1>{JSON.stringify(error)}</h1>
    }

    if(!responseData?.data && responseStatus!=="OK"){
      return <h1>{JSON.stringify(responseStatus)}</h1>
    }

    const {data} = responseData;


  return (
    <div className="px-4 m-auto max-w-7xl mt-4 sm:px-6 lg:px-8">
      {/* {JSON.stringify(data)} */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
            {/* <h1 className="text-xl font-semibold text-gray-900">Data List</h1>
            <h2 className="text-lg font-semibold text-gray-900">{"[Hub Name]"}</h2> */}
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href={"/ia-hubs/inventory/create"}>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Inventory
          </button></Link>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Seat ID
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Seat type
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Capacity
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Price
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Currency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((seat) => (
              <tr key={seat.seat_id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {seat.attributes.seat_id}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Seat ID</dt>
                    <dd className="mt-1 truncate text-gray-700">{seat.attributes.type}</dd>
                    <dt className="sr-only sm:hidden">Seat type</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{seat.attributes.capacity}</dd>
                    <dt className="sr-only sm:hidden">Capacity</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{seat.attributes.seat_price}</dd>
                    <dt className="sr-only sm:hidden">Currency</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{seat.attributes.currency}</dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{seat.attributes.type}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{seat.attributes.capacity}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{new Intl.NumberFormat().format(seat.attributes.seat_price)}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{seat.attributes.currency}</td>
                {/* <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link href={`/ia-hubs/customers/view/${seat.id}`} className="text-red-600 hover:text-red-900">
                    View<span className="sr-only">, {seat.name}</span>
                  </Link>
                </td> */}
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link href={`/ia-hubs/inventory/edit/${seat.id}`} className="text-red-600 hover:text-red-900">
                    Edit<span className="sr-only">, {seat.name}</span>
                  </Link>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <DeleteButton endPoint={"inventories"} id={seat.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
