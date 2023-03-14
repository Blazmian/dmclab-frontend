import './styles/Global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/MainNavBar.js'
import LoginMain from './components/LoginMain';

function App() {
  return (
    <>
      <div className='header-main'>
        <MainNavBar />
      </div>
      <LoginMain />
    </>
  );
}

export default App;
