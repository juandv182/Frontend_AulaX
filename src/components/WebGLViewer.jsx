import React from 'react';
import { useLocation } from 'react-router-dom';

export const WebGLViewer = () => {
    const location = useLocation();
    const gameUrl = location.state;

    return (
        <div style={{ height: '90vh', width: '95%', marginTop: '3rem' }}>
            <iframe src={gameUrl} allowFullScreen  frameborder="0" width="100%" height="100%"></iframe>
        </div>
    );
};
