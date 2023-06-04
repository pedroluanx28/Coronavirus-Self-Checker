import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios'
import { FormEvent } from 'react';
import InputMask from 'react-input-mask'

export default function CadPaciente() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState('');

  const requestData = new FormData()
  requestData.append('name', name)
  requestData.append('identifier', identifier)
  requestData.append('birthdate', birthdate)
  requestData.append('phone_number', phoneNumber)
  requestData.append('image', image);

  function postData(event: FormEvent) {
    event.preventDefault()

    axios
    .post('http://covid-checker.sintegrada.com.br/api/patients', requestData)
    .then(res => console.log(res.data.data))
    .catch(err => console.log(err.message))
  }

  function refresh() {
    if (name == '' || identifier == '' || birthdate == '' || phoneNumber == '') {

    }else {
      location.reload()
    }
  }

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
          <Form onSubmit={postData}>
            <Form.Group className="mb-2" controlId="formGroupName">
              <Form.Label>Nome completo</Form.Label>
              <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Nome completo" required/>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupBirthdate">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control onChange={e => setBirthdate(e.target.value)} type="date" required />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupCpf">
              <Form.Label>CPF</Form.Label>
              <InputMask className="inputMask" mask='999.999.999-99' onChange={e => setIdentifier(e.target.value)} type="text" placeholder="CPF" required />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupTelefone">
              <Form.Label>Telefone</Form.Label>
              <InputMask className="inputMask" mask="(99)9 9999-9999" onChange={e => setPhoneNumber(e.target.value)} type="text" placeholder="Telefone" required />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupImage">
              <Form.Label>Foto do paciente</Form.Label>
              <Form.Control onChange={e => setImage(e.target?.files[0])} type="file" />
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