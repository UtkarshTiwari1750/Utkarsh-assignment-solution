# DSA Problem
    
- Approach
  - The Problem uses Batch Processing and Multi-threading in combination.
  -  First taken input all the "Express" Orders and store them in a list/array.
  -  When a "Priority" Order comes store them in a list/array with the "index" denoting the range of "Express" Orders which can be selected for this "Priority" Order.
  -  The "Priority" Order will be stored, for some limit after which all the stored "Priority" Orders will execute within a thread and will assing the orders delivery agent.

- Usage Instruction
  - Install Python
  - Move inside DSA Folder
  - Run "python Testing.py"

- Additional Notes
  - Language Used:- Python
  - Data Structure Used:- Deque and Array/List
  - Library Used:- threading

# Backend Problem
- Usage Instructions
  - Install Nodejs and npm.
  -  Move inside 'BackendProblem/backend' and run 'npm install'.
  -  Move inside 'BackendProblem/frontend' and run 'npm install'.
  -  Now you will require some environment files for frontend as well as backend for that contact me on :- [utkarshtiwari1750@gmail.com](utkarshtiwari1750@gmail.com)
  -  After adding environment files move inside 'BackendProblem/frontend' and run 'npm run dev'.

- Implementation
  - Database:- MongoDB 
      - All Schema's
        - User: firstName, lastName, email, password, token, expenses[], categories[].
        - OTP: email, otp, createdAt.
        - Expenses: descriprion, amount, category, date.
        - Category: name, expenses[], users[]
  - Server:- Nodejs and Expressjs
    - Middleware:
      - Auth -> Authenticate User using JWT Token.
        
    - Controllers
      - Auth:
        - Signup -> Add new user to database after verifying OTP. 
        - Login -> Create JWT Token for the user and send it to fronted.
        - SendOtp -> Create and Send OTP to user's email.
        - getUser -> Send all expenses and categories to frontend.
      - Category:
        - CreateCategory -> Add a new category.
        - GetCategories -> Send all exisiting categories to frontend.
      - Expenses:-
        - CreateExpense -> Add new Expense to database.
        - UpdateExpense -> Update the exisiting expense data.
        - DeleteExpense -> Delete the exisiting expense.
        - GetExpense -> Send all exisiting expense's to frontend.
          
  - Email Service:- Gmail.
 
  - Frontend:- Reactjs, TailwindCSS and Javascript.
    - Pages
      - Signup -> Register user.
      - Login -> Login exisiting user.
      - VerifyEmail -> Verify OTP.
      - Dashboard -> Shows expense summary and allow user to add new expense.

    - Dependencies
      - Redux-toolkit:- State Management.
      - Axios:- Secure API calls
      
            
