import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import EmployeeDetail from './Components/EmployeeDetail'
import Profile from './Components/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/adminlogin" />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path="employee" element={<Employee />} />
          <Route path="category" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="add_employee" element={<AddEmployee />} />
          <Route path="edit_employee/:id" element={<EditEmployee />} />
        </Route>
        <Route path="/employee_detail/:id" element={<EmployeeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App