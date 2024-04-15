import { Navigate, Route, Routes } from "react-router-dom"
import { UserProvider } from "../context/UserProvider"
import { useUsers } from "../hooks/useUsers"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { MisCursos } from "../pages/MisCursos"
import { Sidebar } from "../components/layout/Sidebar"
import TopBar from "../components/layout/Topbar"
import { SidebarContext } from "../context/SidebarContext"
import { useContext } from "react"

export const AppRoutes = () => {
    const { isExpanded } = useContext(SidebarContext);
    return (
        <>

            <UserProvider>
            
                <TopBar/>
                <Sidebar />
            <div className={`app-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                    <Route path="cursos" element={<MisCursos />} />
                    
                    <Route path="/" element={<Navigate to="/cursos" />} />
                </Routes>
            </div>
           
            </UserProvider>

            
        </>
    )
}