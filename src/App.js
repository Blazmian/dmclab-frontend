import './styles/Global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AdminMain from './components/api/Admin/AdminMain';
import OrdersMain from './components/api/Order/OrdersMain';
import { ToastContainer } from 'react-toastify';
import Register from './components/api/Admin/Users/Register';
import LoginStudents from './components/LoginStudents';
import Login from './components/LoginUser';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin/*' element={<AdminMain />} />
          <Route path='/' element={<LoginStudents />} />
          <Route path='/solicitar-equipo/' element={<OrdersMain />} />
          <Route exact path="/register/:type/:id" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme='colored'
        pauseOnHover
      />
    </>
  );
}

export default App;