import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Signup from './pages/Signup';

function App(){
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />}></Route>
            {/* <Route path="/signin" el SendMoney />}></Route> */}
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App

