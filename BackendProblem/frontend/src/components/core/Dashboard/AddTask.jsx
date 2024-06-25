import React, { useEffect, useState } from 'react';
import {get, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { createCategory, createExpense, getCategories, updateExpense } from '../../../services/operations/expensAPI';
import { setCategory } from '../../../slices/expenseSlice';
import toast from 'react-hot-toast';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddTask = ({handler, editTask}) => {
  const {token} = useSelector((state) => state.auth);
  const {category} = useSelector((state) => state.expense);
  const [addCategory, setAddCategory] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful},
    getValues,
    setValue
  } = useForm();

  const isUpdated = () => {
    const currentValues = getValues();
    console.log("first", currentValues, editTask)
    const isUpdated = Object.keys(currentValues).some((field) => field === 'category' ? currentValues[field] !== editTask[field]._id : currentValues[field] !== editTask[field]);
    return isUpdated;
  }

  const onSubmit = async(data) => {
    if(editTask){
      if(isUpdated()){
        const requestData = {
          amount: data.amount,
          date: data.date,
          description: data.description,
          category: data.category,
          expenseId: editTask._id
        }
        const result = await updateExpense(requestData, token, dispatch);
        if(result.length > 0){
          handler();
        }
      }
      else {
        toast.error("No changes made to the expense");
      }
      return;
    }
    const requestData = {
      amount: data.amount,
      date: data.date,
      description: data.description,
      category: data.category,
    }
    const result = await createExpense(requestData, token, dispatch);
    if(result.length > 0){
      setValue("amount", ""); 
      setValue("date", "");
      setValue("description", "");
      setValue("category", "");
      handler();
    }
  }

  const handleAddCategory = async() => {
    const {category} = getValues();
    const result = await createCategory({"name": category}, token, dispatch);
    if(result.length > 0){
      setAddCategory(!addCategory);
    }
  }

  useEffect(() => {
    if(editTask){
      setValue("amount", editTask?.amount); 
      setValue("date", editTask?.date);
      setValue("description", editTask?.description);
      setValue("category", editTask.category?._id);
    }
  }, [editTask])
  return (
    <div className='fixed inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm mt-0 grid place-items-center overflow-auto'>
      <div className="isolate bg-white px-6 py-24 sm:py-12 lg:px-16 rounded-md">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {editTask ? "Edit a Expense" :"Add a Expense"}
          </h2>
        </div>
        
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-16 max-w-xl sm:mt-12"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            
            <div className=''>
              <label htmlFor="amount" className="block text-sm font-semibold leading-6 text-gray-900">
                Amount
              </label>
              <div className="mt-2.5 flex items-center gap-x-2 relative">
                <div className='h-full px-2 py-[0.35rem]  rounded-md text-lg absolute'>₹</div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  autoComplete="amount"
                  {...register('amount', { required: true })}
                  className="block w-full rounded-md border-0 px-6 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {
                  errors.amount && 
                    <p className='text-red-500 text-sm'>
                      Amount is required
                    </p>
                }
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-semibold leading-6 text-gray-900">
                Date
              </label>
              <div className="mt-2.5">
                <input
                  type="date"
                  name="date"
                  id="date"
                  autoComplete="family-name"
                  {...register('date', { required: true })}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {
                  errors.date && 
                    <p className='text-red-500 text-sm'>
                      Date is required
                    </p>
                }
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="category" className="block text-sm font-semibold leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2.5 flex gap-x-2 justify-between w-full items-center">
                
                {
                  addCategory ?
                  (<div className='flex flex-col w-[65%]'>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      autoComplete="organization"
                      placeholder='Enter Category Name'
                      {...register('category', { required: true })}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {
                      errors.category && 
                        <p className='text-red-500 text-sm'>
                          Category is required
                        </p>
                    }
                  </div>)
                  : (<select name="" id=""
                      className='block w-[65%] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      {...register('category', { required: true })}
                    >
                      <option value="" disabled selected> 
                        Select Category
                      </option>
                      {category && category.length > 0 
                        ? (category.map((item, index) => (
                          <option key={index} value={item?._id} 
                            className='text-gray-900 text-sm font-semibold'
                          >
                            {item?.name}
                          </option>)
                        ))
                        : (<option value="" disabled selected> 
                              No Category Found
                          </option>)
                      }
                    </select>)
                }
                <button 
                  onClick={addCategory ? handleAddCategory : () => setAddCategory(!addCategory)} 
                  className='block w-[45%] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  type='button'
                >
                  {addCategory ? "Save" : "Add Category"}
                </button>
              </div>
            </div>   

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  {...register('description', { required: true })}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
                {
                  errors.description && 
                    <p className='text-red-500 text-sm'>
                      Description is required
                    </p>
                }
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-between gap">
            <button onClick={handler} 
              className='w-[45%] bg-gray-200 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Cancle
            </button>

            <button
              type="submit"
              className="block w-[45%] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask;
