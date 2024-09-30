import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useGetAllMembersQuery } from '../store/RTK/mainApi'
import Loading from '../components/Loading'
import PageTitle from '../components/PageTitle'
import { COMMUNITIES, HOW_KNOW } from '../constants'
import React, { PureComponent } from 'react';
import {Pie, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Cell } from 'recharts';
import StatisticCard from '../components/StatisticCard'


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042' , '#f0f0f0'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload,index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text className='flex flex-col' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}% `+ payload.name }
    </text>
  );
};


function HomePage() {
    let moderator = useSelector((state)=> state.moderator)
    let {data , isLoading} = useGetAllMembersQuery()
    let communitiesData = [];
    let knowData  = []
    let acceptedIn  = []
    if(!isLoading){
      communitiesData = COMMUNITIES.reduce((acc,el )=>{
        acc.push({ name: el , count: data?.data?.filter(member=> member.firstCommunity === el || member.secondCommunity === el).length})
          return acc
        } ,[])
    }
    if(!isLoading){
      knowData = HOW_KNOW.reduce((acc, el , i)=>{
        let count = data?.data?.filter(member=> member.how === el).length
        acc.push({ name: el , value: count})
        return acc
      },[])
    }
    if(!isLoading){
      acceptedIn = COMMUNITIES.reduce((acc,el )=>{
        acc.push({ name: el , count: data?.data?.filter(member=> member.acceptedIn.includes(el)).length})
          return acc
        } ,[])
    }
    console.log(knowData)
  return isLoading? <Loading /> :(
    <div>
        <PageTitle  title={"Dashboard"} />
        <div>
          <div>Welcome {moderator.name}</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-7 my-5'>
          <StatisticCard title={"All Requests"} count={data.data.length}  bg={"bg-blue-500"}/>
          <StatisticCard  title={"Accepted Requests"} count={data.data.reduce((acc , el)=>{if(el.status[6].done === true){acc++} return acc},0)} bg={"bg-green-500"}/>
          <StatisticCard  title={"Rejected Requests"} count={data.data.reduce((acc , el)=>{if(el.status[5].done === true){acc++} return acc},0)} bg={"bg-red-500"}/>
          </div>
<div className='h-[500px] min-w-screen-md w-full m-auto overflow-hidden '>
<div className='text-center my-4 text-xl font-bold'>communities statistics </div>
<ResponsiveContainer width="100%" height={450}>
        <BarChart
          width={500}
          height={300}
          data={communitiesData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3F83F8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
</div>
<div className='h-[500px] min-w-screen-md w-full m-auto overflow-hidden '>
<div className='text-center my-4 text-xl font-bold'>Accepted In statistics </div>
<ResponsiveContainer width="100%" height={450}>
        <BarChart
          width={500}
          height={300}
          data={acceptedIn}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#0e9f6e" activeBar={<Rectangle fill="black" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
</div>
<div className=' w-[500px] h-[500px]  m-auto my-6 overflow-hidden'>
  <div className='text-center pt-10 text-xl font-bold'>How did you know us statistics </div>
<ResponsiveContainer width="100%" height="100%">
        <PieChart width={"100%"} height={"100%"}>
          <Pie
            data={knowData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            fill="#8884d8"
            dataKey="value"
          >
            {knowData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
</div>

        </div>
    </div>
  )
}

export default HomePage