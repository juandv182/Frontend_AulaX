import React from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useParams ,useNavigate} from 'react-router-dom';
import { TituloPorPagina } from './layout/TituloPorPagina';

export const VideoViewer = ({url}) => {
    let { videoId } = useParams();
    if(videoId==null)
        videoId=url;
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
    const navigate = useNavigate();
    return (
        <div>
        <div className="d-flex align-items-center justify-content-start">
                    <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                        <RiArrowGoBackLine size={27} />
                    </button>
                    <TituloPorPagina titulo="Visualizador de Video de YouTube" />
        </div>
        <div style={{height: '80vh', width: '99%'}}>
            <iframe
                width="100%"
                height="100%"
                src={youtubeUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
        </div>
    );
}
