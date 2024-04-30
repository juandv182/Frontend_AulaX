import { useParams , useLocation ,useNavigate} from 'react-router-dom';
import { Document, Page , pdfjs } from 'react-pdf';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { TituloPorPagina } from './layout/TituloPorPagina';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export const VisualizadorPDF = () => {
    const location = useLocation();
    const temaUrl = location.state;
    const navigate = useNavigate();
  return (
    <div>
        <div className="d-flex align-items-center justify-content-start">
                    <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                        <RiArrowGoBackLine size={27} />
                    </button>
                    <TituloPorPagina titulo="Biblioteca" />
        </div>
        <h1> aaaaaa</h1>
      <Document file={temaUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};