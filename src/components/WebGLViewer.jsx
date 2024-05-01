import React from 'react';

export const WebGLViewer = () => {
    const { gameUrl } = useParams();

    return (

        <div style={{ height: '90vh', width: '100%' }}>
            <h1>{ gameUrl }</h1>
            <iframe src={gameUrl} frameborder="0" width="100%" height="100%"></iframe>
        </div>
    );
};
