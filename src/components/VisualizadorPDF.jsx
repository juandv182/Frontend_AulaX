import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';

export const VisualizadorPDF = () => {
  const { fileId } = useParams();
  const fileUrl = "https://aulax.s3.amazonaws.com/1/Diagrama+de+Base+de+Datos.drawio-1+(4).pdf";

  return (
    <div>
      <Document file={fileUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};