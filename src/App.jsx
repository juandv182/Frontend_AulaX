import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './auth/context/AuthContext';
import { LoginPage } from './auth/pages/LoginPage';
import { AppRoutes } from './routes/AppRoutes';
import { MisCursos } from './pages/MisCursos';
import { SidebarProvider } from "./context/SidebarProvider"
import './App.css'
import './normalize.css'
import { RegisterPage } from './auth/pages/RegisterPage';
import { UserProvider } from './context/UserProvider';


function App() {
  const { login } = useContext(AuthContext);
  return (
    <UserProvider>
    <SidebarProvider>
      <Routes >

          {
              login.isAuth
                  ? (
                      <Route path='/*' element={<AppRoutes />} />
                  )
                  : <>
                      <Route path='/login' element={<LoginPage />} />
                      <Route path='/register' element={<RegisterPage />} />
                      <Route path='/*' element={<Navigate to="/login" /> } />
                  </>
                  
          }

      </Routes>
      </SidebarProvider>
      </UserProvider>
  );
}

export default App
