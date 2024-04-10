import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './auth/context/AuthContext';
import { LoginPage } from './auth/pages/LoginPage';
import { AppRoutes } from './routes/AppRoutes';
import { MisCursos } from './pages/MisCursos';
import './App.css'
import './normalize.css'

function App() {
  const { login } = useContext(AuthContext);
  return (
      <Routes>
          {
              login.isAuth
                  ? (
                      <Route path='/cursos' element={<AppRoutes />} />
                  )
                  : <>
                      <Route path='/login' element={<LoginPage />} />
                      <Route path='/*' element={<Navigate to="/login" /> } />
                  </>
                  
          }
      </Routes>
  );
}

export default App
