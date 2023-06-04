import '../css/Atendimento.css'
import { Button, Form } from 'react-bootstrap'
import FormSintomasChecks from '../componentes/FormSintomasChecks'
import DataPaciente from '../componentes/DataPaciente'
import { Container, Row, Col } from 'react-bootstrap';

export default function Atendimento() {

  return (
    <>
      <DataPaciente
      />
      <div className='bodyPage'>
        <h1 className="atendimentoPaciente">Atendimento do paciente</h1>
        <p className='atendimentoPacienteParagrafo'>Preencha os formulários a seguir e clique em "enviar" para dar o laudo do paciente.</p>
        <Form className="multiForm">
          <div className="formSintomas">
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
          </div>
          <Container className="formSintomasCheck">
            <Row>
              <h3 className="tituloFormSintomasChecks">Sintomas</h3>
              <Col xs='3' sm='3' md='3' lg='3' style={{ textAlign: 'left' }}>

                <p style={{ display: 'inline-block' }}>
                  <Form.Check
                    className='checkboxInput'
                    type='checkbox'
                  />
                  Diarrreia
                </p>
              </Col>
            </Row>
          </Container>
          <button type='submit' className="enviar">Enviar</button>
        </Form>
        <div className="deletePaciente">
          <Button variant="danger">Deletar Paciente</Button>{' '}
        </div>
      </div>
    </>
  )

}
