import React from 'react';
import { useParams } from 'react-router-dom';

export const ScratchViewer = () => {
    const { scratchId } = useParams();

    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <iframe src={`https://turbowarp.org/${scratchId}/embed`} width="100%" height="100%" allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen></iframe>
        </div>
    );
};