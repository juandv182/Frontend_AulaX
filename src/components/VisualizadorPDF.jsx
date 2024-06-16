import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const VisualizadorPDF = ({url}) => {
    const location = useLocation();
    let temaUrl = location.state;
    if(temaUrl==null)
        temaUrl=url;
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => {
        if (pageNumber > 1) changePage(-1);
    };

    const nextPage = () => {
        if (pageNumber < numPages) changePage(1);
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Visualizador de PDF" />
            </div>
            <div className="pdf-container" style={{ display: 'flex', justifyContent: 'center', maxWidth: '80%', margin: '0 auto' }}>
                <Document
                    file={temaUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="react-pdf__Page__canvas"
                    onError={(error) => console.error('Error loading PDF:', error.message)}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={1.6}
                        renderAnnotationLayer={false}
                        onRenderSuccess={() => console.log('Page rendered')}
                        width={500} // Esto establece el ancho y escala automáticamente la altura
                    />
                </Document>
            </div>
            {numPages && (
                <div className="pagination d-flex justify-content-center align-items-center mt-3">
                    <button onClick={previousPage} disabled={pageNumber <= 1} className="btn btn-primary me-2">Anterior</button>
                    <p>{`Página ${pageNumber} de ${numPages}`}</p>
                    <button onClick={nextPage} disabled={pageNumber >= numPages} className="btn btn-primary ms-2">Siguiente</button>
                </div>
            )}
        </div>
    );
};