import React from 'react'

function DataDev({title, value}) {
  return (
    <div className='my-2'>
        <label   className="block mb-2 capitalize text-sm font-medium text-gray-900 dark:text-white">{title}</label>
        <input type="text" disabled defaultValue={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={value}  />
    </div>
  )
}

export default DataDev