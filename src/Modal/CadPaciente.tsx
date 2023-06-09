import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import axios from 'axios'
import { FormEvent } from 'react';
import Swal from 'sweetalert2'
import { ValidateCpf } from '../componentes/ValidateCpf';


type Props = {
  getPatients: Function
}

export default function CadPaciente({ getPatients }: Props) {

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

    if (ValidateCpf(identifier) == false) {
      Swal.fire({
        icon: 'error',
        title: 'Coloque um CPF válido!',
        position: 'top-right',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
    } else {
      if (name == '' || identifier == '' || birthdate == '' || phoneNumber == '' || image == undefined) {
        let p: any = document.getElementById('paragrafoFoda')
        p.innerHTML = 'Falha ao cadastrar! verifique os campos.'
      } else {
        axios
          .post('http://covid-checker.sintegrada.com.br/api/patients', requestData)
          .then(res => console.log(res.data.data))
          .catch(err => console.log(err.message))

        getPatients()
        setShow(false)
        Swal.fire({
          icon: 'success',
          title: 'Paciente Adicionado com sucesso!',
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
      }
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
              <Form.Control onChange={e => setName(e.target.value)} type="text" placeholder="Nome completo" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupBirthdate">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control onChange={e => setBirthdate(e.target.value)} type="date" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupBirthdate">
              <Form.Label>CPF</Form.Label>
              <Form.Control placeholder="CPF" onChange={e => setIdentifier(e.target.value)} type="text" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control className="inputMask" onChange={e => setPhoneNumber(e.target.value)} type="text" placeholder="Telefone" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGroupImage">
              <Form.Label>Foto do paciente</Form.Label>
              <Form.Control onChange={e => setImage(e.target?.file[0])} type="file" />
            </Form.Group>
            <div className='buttons'>
              <p style={{ color: 'red', textAlign: 'left' }} id="paragrafoFoda"></p>
              <button type='submit' className='enviar'>Enviar</button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}