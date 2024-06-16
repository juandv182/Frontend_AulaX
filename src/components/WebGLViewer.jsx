import React from 'react';
import { useLocation } from 'react-router-dom';

export const WebGLViewer = ({url}) => {
    const location = useLocation();
    let gameUrl = location.state;
    if(gameUrl==null)
        gameUrl=url
    return (
        <div style={{ height: '90vh', width: '95%', marginTop: '3rem' }}>
            <iframe src={gameUrl} allowFullScreen  frameborder="0" width="100%" height="100%"></iframe>
        </div>
    );
};
