import { useParams , useLocation } from 'react-router-dom';
import { Document, Page , pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export const VisualizadorPDF = () => {
    const location = useLocation();
    const temaUrl = location.state?.temaUrl;
   
  return (
    <div>
        <h1>{temaUrl} aaaaaa</h1>
      <Document file={temaUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};