import React from 'react'

function StatisticCard({title , count , bg}) {
  return (
    <div className={`p-5 flex flex-col gap-3 ${bg} rounded-lg text-center text-white`}>
        <div className='text-4xl'>{count}</div>
        <div className='text-sm'>{title}</div>
    </div>
  )
}

export default StatisticCard