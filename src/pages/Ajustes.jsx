import { TituloPorPagina } from "../components/layout/TituloPorPagina"
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBell, FaLock, FaUserCog, FaUserEdit } from 'react-icons/fa';
import React from 'react';

export const Ajustes = () =>{

    return(
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
                                    <h5>Cambiar Contraseña</h5>
                                </Col>
                                <Col xs={2} className="arrow-col">
                                    <FaUserEdit size={20} />
                                </Col>
                            </Row>
                           
                            <Row className="ajustes-item">
                                <Col xs={2} className="icon-col">
                                    <FaUserEdit size={30} />
                                </Col>
                                <Col xs={8} className="text-col">
                                    <h5>Modificar preferencias de aprendizaje</h5>
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
        </>
    )
}