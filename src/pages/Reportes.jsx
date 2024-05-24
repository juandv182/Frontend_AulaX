import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TituloPorPagina } from '../components/layout/TituloPorPagina';

export const Reportes = () => {
    // Datos de prueba
    const competenciasData = [
        { curso: 'Matemáticas', progreso: 67 },
        { curso: 'Ciencias', progreso: 46 },
    ];

    const horasData = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Matemáticas',
                data: [2, 3, 1, 4, 5, 4],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Ciencias',
                data: [1, 2, 1, 3, 4, 3],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const recursosData = {
        labels: ['Videos', 'Lecturas', 'Juegos'],
        datasets: [
            {
                label: 'Efectividad',
                data: [40, 35, 25],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    const notasData = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
        datasets: [
            {
                label: 'Evaluaciones por Competencia',
                data: [70, 75, 80, 85, 90],
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
            {
                label: 'Evaluaciones por Tema',
                data: [65, 70, 75, 80, 85],
                fill: false,
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
            },
        ],
    };

    const downloadPDF = () => {
        const input = document.getElementById('reportes');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('reportes.pdf');
        });
    };

    return (
        <Container fluid className="p-4" id="reportes">
        <TituloPorPagina
          titulo="Reportes"
          />

            <Row className="mb-4">
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Progreso por competencias</Card.Title>
                            <Row>
                                {competenciasData.map((comp, index) => (
                                    <Col key={index} md={6} className="text-center">
                                        <Doughnut
                                            data={{
                                                labels: [comp.curso],
                                                datasets: [
                                                    {
                                                        data: [comp.progreso, 100 - comp.progreso],
                                                        backgroundColor: ['#36A2EB', '#E0E0E0'],
                                                        hoverBackgroundColor: ['#36A2EB', '#E0E0E0'],
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true,
                                                plugins: {
                                                    tooltip: {
                                                        enabled: false,
                                                    },
                                                },
                                                cutout: '70%',
                                            }}
                                        />
                                        <h5>{comp.curso}</h5>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Horas por curso por mes</Card.Title>
                            <Bar data={horasData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Tipo de recursos educativos más efectivos</Card.Title>
                            <Pie data={recursosData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Notas obtenidas en evaluaciones</Card.Title>
                            <Line data={notasData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col className="text-center">
                    <Button variant="warning" onClick={downloadPDF}>
                        Descargar PDF
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
