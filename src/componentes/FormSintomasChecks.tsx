import { Form, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Atendimento.css'

function FormSintomasChecks() {
  return (
        <Container className="formSintomasCheck">
          <Row>
            <h3 className="tituloFormSintomasChecks">Sintomas</h3>
          <Col xs='3' sm='3' md='3' lg='3' style={{textAlign: 'left'}}>
                    <label>
                    <Form.Check 
                    className='checkboxInput'
                    type='checkbox'
                    label="Diarreia"
                    />
                    </label>
            </Col>
            
          </Row>
        </Container>
  );
}

export default FormSintomasChecks;