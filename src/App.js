//react
import { Fragment } from 'react';

//routes
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//context
import { AuthProvider } from './context/auth';

//pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'


function App() {

  const Private = (Item) => {
    return localStorage.getItem('token_API') ? Item : <Login />
  }

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route exact path='/home' element={Private(<Home />)} />
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
