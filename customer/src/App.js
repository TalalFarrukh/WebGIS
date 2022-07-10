import React from 'react';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import LoginSignup from './screens/LoginSignup';
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Header  />

      <main>
      <Routes>
        <Route path='/Home/' element={<HomeScreen />} exact />
        <Route path='/Admin/' element={<AdminScreen />} />
        <Route path='/storeowner/' element={<LoginSignup />} >
          <Route path='login' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
        </Route>
      </Routes>


      </main>

    </Router>
  );
}

export default App;
