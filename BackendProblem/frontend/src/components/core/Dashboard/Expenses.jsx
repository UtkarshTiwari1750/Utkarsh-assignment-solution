import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import { deleteExpense, getCategories, getExpenses } from '../../../services/operations/expensAPI';
import { setCategory, setExpense } from '../../../slices/expenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import ConfirmationModal from '../../ConfirmationModal';

const Expenses = () => {
  const [addTaskModal, setAddTaskModal] = useState(false)
  const [editTaskModal, setEditTaskModal] = useState(false)
  const [deleteTaskModal, setDeleteTaskModal] = useState(false)
  const {token} = useSelector((state) => state.auth);
  const {expense} = useSelector((state) => state.expense);
  const dispatch = useDispatch();
  
  const onDeleteHandle = async(expenseId) => {
    const response = await deleteExpense({expenseId}, token, dispatch);
    if(response){
      setDeleteTaskModal(false);
    }
  }

  useEffect(() => {
    (async() => {
      const response = await getCategories(token, dispatch);
      if(response.length > 0){
        dispatch(setCategory(response));
      }
    })();

    (async() => {
      const response = await getExpenses(token, dispatch);
      if(response.length > 0){
        dispatch(setExpense(response));
      }
    })();
  }, [])
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-3'>
            <h2 className='text-3xl font-semibold'>
              Expenses
            </h2>
            <p>
              A list of all the expenses in your account including their amount, date, category and description.
            </p>
          </div>
          <button onClick={() => setAddTaskModal(true)}
            className='bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-all duration-200'  
          >
            Add Expense
          </button>
        </div>      
        
        <div className='mt-5'>
          <div className='grid grid-cols-6 w-full border-b py-3 px-5 font-semibold'>
            <h2>Date</h2>
            <h2>Category</h2>
            <h2>Amount</h2>
            <h2>Description</h2>    
            <h2>Edit</h2>
            <h2>Delete</h2>      
          </div>
          <div className=''>
            {
              expense && expense.length > 0 ?
              (expense.map((item, index) => (
                <div key={index} className='grid grid-cols-6 gap-x-2 gap-y-2 w-full py-3 border-y px-5'>
                  <p>{item.date}</p>
                  <p>{item.category.name}</p>
                  <p>₹ {item.amount}</p>
                  <p>{item.description}</p>
                  <button onClick={() => setEditTaskModal(item)}>
                    <BiEdit size={22} color='blue'/>
                  </button>
                  <button onClick={() => setDeleteTaskModal({
                      text1: 'Delete Expense',
                      text2: 'Are you sure you want to delete this expense?',
                      btn1Text: 'Cancel',
                      btn2Text: 'Delete',
                      btn1Handler: () => setDeleteTaskModal(false),
                      btn2Handler: () => onDeleteHandle(item._id)
                  })}>
                    <MdOutlineDeleteForever size={25} color='red'/>
                  </button>
                </div>
              )))
              :( <p className='text-center mt-10 font-bold text-lg'>No Expenses Found</p>)
            }
          </div>
        </div>


      </div>
      {
        addTaskModal && <AddTask handler={() => setAddTaskModal(false)} editTask={editTaskModal}/>
      }
      {
        editTaskModal && <AddTask handler={() => setEditTaskModal(false)} editTask={editTaskModal}/>
      }
      {
        deleteTaskModal && <ConfirmationModal modalData={deleteTaskModal}/>
      }
    </div>
  );
}

export default Expenses;
