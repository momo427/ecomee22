import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-2'>Copyright &copy; JJDT</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer