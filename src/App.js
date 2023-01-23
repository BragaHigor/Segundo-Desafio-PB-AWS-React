//react
import { Fragment } from 'react';

//routes
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//context
import { AuthProvider } from './context/auth';

//hooks
import useAuth from './hooks/useAuth'

//pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'


const Private = ({ Item }) => {
  const { enter } = useAuth()
  
  return enter > 0 ? <Item /> : <Login />
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route exact path='/home' element={<Private Item={Home} />} />
              {/* <Route exact path='/home' element={<Home />} /> */}
              <Route exact path='/register' element={<Register />} />
              <Route path='*' element={<Login />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
