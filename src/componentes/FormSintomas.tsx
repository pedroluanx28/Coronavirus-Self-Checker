import { Form, Row, Col } from 'react-bootstrap';

function FormSintomas() {
  return (
    <Form className="formSintomas">
        <h3 className='tituloFormSintomas'>
            Dados de saúde
        </h3>
      <Row>
        <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Pressão Arterial Sistólica" />
            </Form.Group>
        </Col>

        <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="text" placeholder="Pressão Arterial Diastólica" />
            </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="text" placeholder="Frequência Cardíaca" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="text" placeholder="Frequência Respiratória" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="text" placeholder="Temperatura" />
      </Form.Group>
    </Form>
  );
}

export default FormSintomas;