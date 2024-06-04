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
import { Inicio } from "../pages/Inicio"
import { Curso } from "../components/Curso"
import { BibliotecaRecursos } from "../components/BibliotecaRecursos"
import { CuestionarioNivelCurso } from "../components/CuestionarioNivelCurso"
import { RecursosPorTema } from "../components/RecursosPorTema"
import { VisualizadorPDF } from "../components/VisualizadorPDF"
import { VideoViewer } from "../components/VideoViewer"
import { ScratchViewer } from "../components/ScratchViewer"
import { WebGLViewer } from "../components/WebGLViewer"
import { Reportes } from "../pages/Reportes"
import { Ajustes } from "../pages/Ajustes"
import { ModoAdaptativo } from "../components/ModoAdaptativo"

export const AppRoutes = () => {
    const { isExpanded } = useContext(SidebarContext);
    return (
        <>

           
            
                <TopBar/>
                <Sidebar />
            <div className={`app-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/register" element={<RegisterPage />} />
                    <Route path="users/edit/:id" element={<RegisterPage />} />
                    <Route path="inicio" element={<Inicio />} />
                    <Route path="cursos" element={<MisCursos />} />
                    <Route path="reportes" element={<Reportes />} />
                    <Route path="ajustes" element={<Ajustes />} />
                    <Route path="/cursos/:tipoCurso" element={<Curso />} />
                    <Route path="/cursos/:tipoCurso/biblioteca" element={<BibliotecaRecursos />} />
                    <Route path="/cursos/:tipoCurso/biblioteca/recursosPorTema/:temaId" element={<RecursosPorTema />} />
                    <Route path="/cursos/:tipoCurso/biblioteca/recursosPorTema/:temaId/ver-pdf/:fileId" element={<VisualizadorPDF />} />
                    <Route path="/cursos/:tipoCurso/biblioteca/recursosPorTema/:temaId/video-viewer/:videoId" element={<VideoViewer />} />
                    <Route path="/cursos/:tipoCurso/biblioteca/recursosPorTema/:temaId/webgl-viewer/:fileId" element={<WebGLViewer />} />
                    <Route path="/cursos/:tipoCurso/biblioteca/recursosPorTema/:temaId/scratch-viewer/:scratchId" element={<ScratchViewer />} />
                    <Route path="/cursos/:tipoCurso/modoAdaptativo" element={<ModoAdaptativo />} />
                    <Route path="/cursos/:tipoCurso/modoAdaptativo/cuestionarioNivelCurso" element={<CuestionarioNivelCurso />} />
                    <Route path="/cursos/:tipoCurso/modoAdaptativo/cuestionarioNivelCurso/video-viewer/:videoId" element={<VideoViewer />} />
                    <Route path="/" element={<Navigate to="/cursos" />} />
                </Routes>
            </div>
           
            

            
        </>
    )
}