import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk'; 
// import rootReducer from './reducers';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

// const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
  
     <BrowserRouter>
 
    <Routes>
    
        <Route path="/Register" element= {<Signup/>} />
        <Route path="/home" element= {<Home/>} />
        <Route path="/" element= {<Login/>} />
    
    </Routes>
    </BrowserRouter>
    
   
    
  );
};

export default App;