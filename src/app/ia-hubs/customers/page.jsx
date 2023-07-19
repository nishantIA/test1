import { getData } from "@/app/api/api"
import findPath from "@/app/common/common";
import DeleteButton from "@/app/components/buttons/DeleteButton";
import Link from "next/link";

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]

export default async function CustomersList() {
    const  {responseData, responseStatus, error, errorMessage}  = await getData("customers");
    
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
            <h1 className="text-xl font-semibold text-gray-900">Data List</h1>
            <h2 className="text-lg font-semibold text-gray-900">{"[Hub Name]"}</h2>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href={"/ia-hubs/customers/create"}>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add a Customer
          </button></Link>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Customer name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Contact number
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Hub location
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((customer) => (
              <tr key={customer.name}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {customer.attributes.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">{customer.attributes.email}</dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{customer.attributes.contact_number}</dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{customer.attributes.email}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{customer.attributes.contact_number}</td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">Gurugram</td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link href={`/ia-hubs/customers/view/${customer.id}`} className="text-red-600 hover:text-red-900">
                    View<span className="sr-only">, {customer.name}</span>
                  </Link>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Link href={`/ia-hubs/customers/edit/${customer.id}`} className="text-red-600 hover:text-red-900">
                    Edit<span className="sr-only">, {customer.name}</span>
                  </Link>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <DeleteButton endPoint={"customers"} id={customer.id}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
