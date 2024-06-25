import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../services/operations/authAPI';
import { setProfile } from '../../../slices/profileSlice';
import { expenseEndpoints } from '../../../services/apis';


const MyProfile = () => {
  const {token} = useSelector((state) => state.auth);
  const {profile, user} = useSelector((state) => state.profile);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [dateRange, setDateRange] = useState({});
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async() => {
      const response = await getUser(token, dispatch);
      if(response){
        dispatch(setProfile(response));
      }
    })()
  }, [token])

  const generateData = () => {
    let totalPrice = 0;
    profile?.expenses?.forEach(expense => {
      totalPrice += expense.amount;
    })

    let averageExpense = totalPrice / profile?.expenses?.length;

    let categories = [];
    profile?.categories?.forEach(category => {
      let total = 0;
      category?.expenses?.forEach(expense => {
        total += expense.amount;
      })
      categories.push({
        category: category?.name,
        total: total
      })
    })

    let dateWiseExpense = [];
    profile?.expenses?.forEach(expense => {
      let date = expense.date;
      dateWiseExpense.push({
        [date]: expense,
      })
    })
    dateWiseExpense.sort((a, b) => {return a.date - b.date})
    
    let dateRanges = [];
    for(let i = 0; i < dateWiseExpense.length; i++){
      for(let j = 0; j < dateWiseExpense.length; j++){
        let range = {"start": Object.keys(dateWiseExpense[i])[0], "end": Object.keys(dateWiseExpense[j])[0]}
        dateRanges.push(range);
      }
    }
    let data = {
      totalExpense: totalPrice,
      averageExpense: averageExpense,
      categories: categories,
      dateRanges: dateRanges,
      dateWiseExpense: dateWiseExpense
    }
    setData(data);
    setDateRange(dateRanges[0])
  } 

  console.log("Date wise expense", data?.dateWiseExpense)
  useEffect(() => {
    if(profile){
      generateData();
    }
  } , [profile])
  return (
    <div className='overflow-x-hidden'>
      <div>
        <h3 className='text-2xl'>
          Hi,  
          <span className='text-purple-500 font-semibold '>
            {" "}{user?.firstName}
          </span>👋
        </h3>

        <div className='gap-x-10 overflow-hidden flex'>
          {/* LEFT */}
          <div className='w-[60%] mt-6'>
            {/* TOP */}
            <div className='border py-4 px-2 rounded-lg'>
              <div className='flex items-center justify-between px-3'>
                <h3 className='text-xl font-semibold'>
                  Category wise expense
                </h3>

                <select name="" id=""
                  className='block w-[25%] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => {
                    setCurrentCategory(e.target.value);
                  }}
                >
                  
                  {profile?.categories && profile?.categories.length > 0 
                    ? (profile?.categories.map((item, index) => (
                      <option key={index} value={index} 
                        className='text-gray-900 text-sm font-semibold'
                      >
                        {item?.name}
                      </option>)
                    ))
                    : (<option value="" disabled selected> 
                          No Category Found
                      </option>)
                  }
                </select>
              </div>

              <div className='mt-5'>
                <div className='grid grid-cols-4 w-full border-b py-3 px-5 font-semibold'>
                  <h2>Date</h2>
                  <h2>Category</h2>
                  <h2>Amount</h2>
                  <h2>Description</h2>        
                </div>
                <div className=''>
                  {
                    profile?.categories && profile?.categories[currentCategory]?.expenses?.length > 0 ?
                    (profile?.categories[currentCategory]?.expenses?.map((item, index) => (
                      <div key={index} className='grid grid-cols-4 gap-x-2 gap-y-2 w-full py-3 border-y px-5'>
                        <p>{item.date}</p>
                        <p>{profile?.categories[currentCategory]?.name}</p>
                        <p>₹ {item.amount}</p>
                        <p>{item.description}</p>
                      </div>
                    )))
                    :( <p className='text-center mt-10 font-bold text-lg'>No Expenses Found</p>)
                  }
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className='border py-4 px-2 rounded-lg mt-3'>
              <div className='flex items-center justify-between px-3'>
                <h3 className='text-xl font-semibold'>
                  Date wise expense
                </h3>

                <select name="" id=""
                  className='block w-[30%] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => {
                    setDateRange(data?.dateRanges[e.target.value]);
                  }}
                >
                  
                  {data?.dateRanges && data?.dateRanges.length > 0 
                    ? (data?.dateRanges.map((item, index) => (
                      <option key={index} value={index} 
                        className='text-gray-900 text-sm font-semibold'
                      >
                        {item?.start} - {item?.end}
                      </option>)
                    ))
                    : (<option value="" disabled selected> 
                          No Date Range Found
                      </option>)
                  }
                </select>
              </div>

              <div className='mt-5'>
                <div className='grid grid-cols-4 w-full border-b py-3 px-5 font-semibold'>
                  <h2>Date</h2>
                  <h2>Category</h2>
                  <h2>Amount</h2>
                  <h2>Description</h2>        
                </div>
                <div className=''>
                  {
                    data?.dateWiseExpense && data?.dateWiseExpense?.length > 0 ?
                    (data?.dateWiseExpense.filter((obj) => Object.keys(obj)[0] <= dateRange.start && Object.keys(obj)[0] >= dateRange.end)
                    ?.map((item, index) => {
                      console.log("Item", Object.values(item)[0])
                      const expense = Object.values(item)[0];
                      return (
                      <div key={index} className='grid grid-cols-4 gap-x-2 gap-y-2 w-full py-3 border-y px-5'>
                        <p>{expense?.date}</p>
                        <p>{expense?.category?.name}</p>
                        <p>₹ {expense.amount}</p>
                        <p>{expense.description}</p>
                      </div>)
                    }))
                    :( <p className='text-center mt-10 font-bold text-lg'>No Expenses Found</p>)
                  }
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT */}
          <div>
            <div className='mt-6 flex gap-y-4 items-start gap-x-3'>
              <div className='py-5 px-8 border rounded-md flex flex-col gap-y-1'>
                <h3 className='text-xl font-light uppercase'>
                  Total Expense
                </h3>
                <p className='text-2xl font-semibold text-green-600'>
                  ₹ {data?.totalExpense}
                </p>
              </div>

              <div className='py-5 px-8 border rounded-md flex flex-col gap-y-1'>
                <h3 className='text-xl font-light uppercase'>
                  Average Expense
                </h3>
                <p className='text-2xl font-semibold text-green-600'>
                  ₹ {data?.averageExpense}
                </p>
              </div>

            </div>
            <div className='py-5 px-8 border rounded-md flex flex-col gap-y-1 mt-10 h-4/6'>
              <h3 className='text-xl font-semibold'>
                Category wise expense 
              </h3>
              <div className='flex flex-col gap-y-2 mt-3'>
                {
                  data?.categories && data?.categories.length > 0 
                  ? (data?.categories.map((item, index) => (
                    <div key={index} className='flex justify-between items-center gap-x-2'>
                      <p>{item?.category}</p>
                      <p>₹ {item?.total}</p>
                    </div>
                  ))
                  )
                  : (<p>No Category Found</p>)
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
