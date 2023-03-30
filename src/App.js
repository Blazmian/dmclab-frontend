import './styles/Global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMain from './components/AdminMain';
import { ToastContainer } from 'react-toastify';
import Register from './components/api/Admin/Users/Register';
import LoginStudents from './components/LoginStudents';
import Login from './components/LoginAdminRec';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<LoginStudents />} />
          <Route path='/admin/*' element={<AdminMain />} />
          <Route exact path="/register/:destiny/:id" element={<Register />} />
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
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;