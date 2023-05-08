import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth';
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './components/CreateEvent';
import UserEvents from './components/UserEvents';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute> }/>
      <Route path='/createEvent' element={<ProtectedRoute><CreateEvent/></ProtectedRoute>}/>
      <Route path='/createdEvents' element={<ProtectedRoute><UserEvents/></ProtectedRoute>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;