import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Footer.css'
const Footer = () => {
    return (
        <footer className="fot">
        <Container>
            <Row className='info'>
                <Col>
                    <h5 >FlatFinders</h5>
                    <Row>
                    <Col>
                    <p className='pyk'>г.Минск пр.Дзержинского 65</p>
                    </Col>
                    <Col>
                    <p className='pyk'>Email: flatfinders@gmail.com</p>
                    </Col>
                    <Col>
                    <p className='pyk'>+375 (29) 256-45-85</p>
                    </Col>
                    </Row>
                </Col>
            </Row>
            <hr />
           
        </Container>
    </footer>

    );
};

export default Footer;