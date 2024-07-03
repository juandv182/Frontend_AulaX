import React, { useState } from 'react';
import { TituloPorPagina } from "../components/layout/TituloPorPagina";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLock, FaUserEdit } from 'react-icons/fa';
import { EncuestaModal } from '../components/EncuestaModal'; // Importar EncuestaModal

export const Ajustes = () => {
    const [showEncuestaModal, setShowEncuestaModal] = useState(false); // Estado para el modal

    const handleOpenEncuestaModal = () => {
        setShowEncuestaModal(true);
    };

    const handleCloseEncuestaModal = () => {
        setShowEncuestaModal(false);
    };

    return (
        <>
        <TituloPorPagina
          titulo="Ajustes"
          />
          <Container fluid className="ajustes-container">
            <Row>
                <Col md={12} className="content">
                    
                    <Card className="ajustes-card">
                        <Card.Body>

                            <Row className="ajustes-item">
                                <Col xs={2} className="icon-col">
                                    <FaLock size={30} />
                                </Col>
                                <Col xs={8} className="text-col">
                                    <h4>Cambiar Contraseña</h4>
                                </Col>
                                <Col xs={2} className="arrow-col">
                                    <FaUserEdit size={20} />
                                </Col>
                            </Row>
                           
                            <Row className="ajustes-item cursor-pointer" onClick={handleOpenEncuestaModal}>
                                
                                <Col xs={2} className="icon-col">
                                    <FaUserEdit size={30} />
                                </Col>
                                <Col xs={8} className="text-col">
                                    <h4>Modificar preferencias de aprendizaje</h4>
                                </Col>
                                <Col xs={2} className="arrow-col">
                                    <FaUserEdit size={20} />
                                </Col>
                                
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

        <EncuestaModal show={showEncuestaModal} handleClose={handleCloseEncuestaModal} /> {/* Agregar EncuestaModal */}
        </>
    )
}
