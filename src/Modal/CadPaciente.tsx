import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

export default function CadPaciente() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="container">
        <button className='cadastrarPaciente' onClick={() => setShow(true)}>
          Cadastrar Paciente
        </button>
      </div>
      

      <Modal
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Cadastro de paciente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-2" controlId="formGroupEmail">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control type="text" placeholder="Nome completo" required/>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupPassword">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control type="date" required/>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupEmail">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" placeholder="CPF" required/>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupEmail">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" placeholder="Telefone" required/>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupEmail">
            <Form.Label>Foto do paciente</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <div className='buttons'>
            <button type='submit' className='enviar'>Enviar</button>
          </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}