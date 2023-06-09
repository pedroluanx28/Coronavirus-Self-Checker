import '../css/Atendimento.css'
import '../css/Global.css'
import { Form } from 'react-bootstrap'
import DataPaciente from '../componentes/DataPaciente'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Footer from '../componentes/Footer';

export default function Atendimento() {
  const [itens, setItens] = useState([])
  const [temp, setTemp] = useState<Number>()
  const [systolic, setSystolic] = useState<Number>()
  const [diastolic, setDiastolic] = useState<Number>()
  const [respiratory, setRespiratory] = useState<Number>()
  const [pulse, setPulse] = useState<Number>()
  const [symptoms, setSymptoms] = useState<Number[]>([])
  const [lastConsulte, setLastConsulte] = useState([])
  const { id } = useParams()
  let url = `http://covid-checker.sintegrada.com.br/api/patients/${id}/attendances`
  const navigate = useNavigate()
  const exemplo: any = lastConsulte[lastConsulte.length - 1]

  function postSymptoms(event: FormEvent) {
    event.preventDefault()

    axios
      .post('http://covid-checker.sintegrada.com.br/api/attendance', {
        patient_id: Number(id),
        temperature: temp,
        systolic_pressure: systolic,
        diastolic_pressure: diastolic,
        respiratory_rate: respiratory,
        pulse: pulse,
        symptoms: symptoms
      })
      .then(res => setItens(res.data.data.symptoms))
      .catch(err => console.log(err.message))

    getAttendances()
    navigate(`/`)
  }
  console.log(lastConsulte)
  function getAttendances() {

    axios
      .get(`http://covid-checker.sintegrada.com.br/api/attendance/200`)
      .then(res => setItens(res.data.data.symptoms))
      .catch(err => console.log(err.message))

    axios
      .get(url)
      .then(res => setLastConsulte(res.data.data))
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getAttendances()
  }, [])

  function getDiastolicDiagnostic() {
    if (lastConsulte[lastConsulte.length - 1] == undefined) {
      return ("Carregando dados...")
    } else {
      const diastolic = lastConsulte[lastConsulte.length - 1]['diastolic_pressure']
      const systolic = lastConsulte[lastConsulte.length - 1]['systolic_pressure']

      if (diastolic < 60 && systolic < 90) {
        return `${systolic}x${diastolic} | Hipotenso`
      }
      if (diastolic >= 60 && diastolic < 85 && systolic >= 90 && systolic < 130) {
        return `${systolic}x${diastolic} | Normotenso`
      }
      if (diastolic >= 85 && diastolic < 89 && systolic >= 130 && systolic < 139) {
        return `${systolic}x${diastolic} | Normotenso Limítrofe`
      }
      if (diastolic >= 90 && diastolic < 99 && systolic >= 140 && systolic < 159) {
        return `${systolic}x${diastolic} | Hipertenso Leve`
      }
      if (diastolic >= 100 && diastolic < 109 && systolic >= 160 && systolic < 179) {
        return `${systolic}x${diastolic} | Hipertenso Moderado`
      }
      if (diastolic > 110 && systolic > 180) {
        return "Hipertenso Grave"
      }
    }
  }
  const pressureDiagnostic = getDiastolicDiagnostic()

  function getRespiratoryDiagnostic() {
    if (lastConsulte[lastConsulte.length - 1] == undefined) {
      return ("Carregando dados...")
    } else {
      const respiratory = lastConsulte[lastConsulte.length - 1]['respiratory_rate']

      if (respiratory < 14) {
        return `${respiratory} irpm | Bradicárdico`
      }
      if (respiratory >= 14 && respiratory < 20) {
        return `${respiratory} irpm | Normocárdico`
      }
      if (respiratory >= 20) {
        return `${respiratory} irpm | Taquicárdico`
      }
    }
  }
  const respiratoryDiagnostic = getRespiratoryDiagnostic()

  function getPulseDiagnostic() {
    if (lastConsulte[lastConsulte.length - 1] == undefined) {
      return ("Carregando dados...")
    } else {
      const pulse = lastConsulte[lastConsulte.length - 1]['pulse']

      if (pulse < 60) {
        return `${pulse} bpm | Bradipnéico`
      }
      if (pulse >= 60 && pulse < 100) {
        return `${pulse} bpm | Eupéico`
      }
      if (pulse >= 100) {
        return `${pulse} bpm | Taquipnéico`
      }
    }
  }
  const pulseDiagnostic = getPulseDiagnostic()

  function getTemperatureDiagnostic() {
    if (lastConsulte[lastConsulte.length - 1] == undefined) {
      return ("Carregando dados...")
    } else {
      const temperature = lastConsulte[lastConsulte.length - 1]['temperature']

      if (temperature <= 35) {
        return `${temperature}°C | Hipotermia`
      }
      if (temperature >= 35.1 && temperature <= 37.2) {
        return `${temperature}°C | Afebril`
      }
      if (temperature >= 37.3 && temperature <= 37.7) {
        return `${temperature}°C | Subfebril`
      }
      if (temperature >= 37.8 && temperature <= 38.9) {
        return `${temperature}°C | Febre`
      }
      if (temperature >= 39 && temperature <= 40) {
        return `${temperature}°C | Pirexia`
      }
      if (temperature > 40) {
        return `${temperature}°C | Hiperpirexia`
      }
    }
  }
  const temperatureDiagnostic = getTemperatureDiagnostic()

  return (
    <>
      <DataPaciente />
      <div className='bodyPage'>
        <div className="returnButton">
          <Link to="/">
            <AiOutlineArrowLeft />
          </Link>
        </div>
        <h1 className="atendimentoPaciente">Atendimento do paciente</h1>
        <p className='atendimentoPacienteParagrafo'>Preencha os formulários a seguir e clique em "enviar" para dar o laudo do paciente.</p>
        <Form onSubmit={postSymptoms} className="multiForm">
          <div className="formSintomas">
            <h3 className='tituloFormSintomas'>
              Dados de saúde
            </h3>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control onChange={e => setSystolic(Number(e.target.value))} type="text" placeholder="Pressão Arterial Sistólica" required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control onChange={e => setDiastolic(Number(e.target.value))} type="text" placeholder="Pressão Arterial Diastólica" required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setPulse(Number(e.target.value))} type="text" placeholder="Frequência Cardíaca" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setRespiratory(Number(e.target.value))} type="text" placeholder="Frequência Respiratória" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setTemp(Number(e.target.value))} type="text" placeholder="Temperatura" required />
            </Form.Group>
          </div>
          <Container className="formSintomasCheck">
            <Row>
              <h3 className="tituloFormSintomasChecks">Sintomas</h3>
              {itens.map(data => {
                const itemId = Number(data['id']);
                const isChecked = symptoms.includes(itemId);

                const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                  const isChecked = e.target.checked;

                  setSymptoms(prevSelected => {
                    if (isChecked) {
                      return [...prevSelected, itemId];
                    } else {
                      return prevSelected.filter(id => id !== itemId);
                    }
                  });
                }

                return (
                  <Col xs='3' sm='3' md='3' lg='3' style={{ textAlign: 'left' }}>
                    <Form.Check
                      className='checkboxInput'
                      type='checkbox'
                      value={itemId}
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p>{data['name']}</p>
                  </Col>
                );
              })}

            </Row>
          </Container>
          <button type='submit' className="enviar">Enviar</button>
        </Form>
        <div className="lastConsulte">
          <h3 className='tituloFormSintomas'> Sintomas da última consulta </h3>
          <Container>
            <Row>
              {
                exemplo === undefined
                  ? <p>Sintomas anteriores indisponíveis!</p>
                  : exemplo.symptoms.map((data: any) => {
                    return (
                      <Col md='6'>
                        <p className='lastSymptoms'>
                          {data['name']}
                        </p>
                      </Col>
                    )
                  })}
            </Row>
            <h3 className='tituloFormSintomas'> Diagnósticos da última consulta </h3>
            <Row>
              {lastConsulte[0] == undefined
                ? <p>Diagnósticos anteriores indisponíveis!</p>
                : <>
                  <Col lg="6" sm="12">
                    <p className="lastDiagnostics">
                      <h5>Pressão Arterial</h5>
                      {!lastConsulte[lastConsulte.length - 1]
                        ? ("Carregando dados...")
                        : (
                          <p className='lastSymptoms'>
                            {pressureDiagnostic}
                          </p>
                        )}
                    </p>
                  </Col>
                  <Col lg="6" sm="12">
                    <p className="lastDiagnostics">
                      <h5>Frequência Respiratoria</h5>
                      {!lastConsulte[lastConsulte.length - 1]
                        ? ("Carregando dados...")
                        : (
                          <p className='lastSymptoms'>
                            {respiratoryDiagnostic}
                          </p>
                        )}
                    </p>
                  </Col>
                  <Col lg="6" sm="12">
                    <p className="lastDiagnostics">
                      <h5>Frequência Cardíaca</h5>
                      {!lastConsulte[lastConsulte.length - 1]
                        ? ("Carregando dados...")
                        : (
                          <p className='lastSymptoms'>
                            {pulseDiagnostic}
                          </p>
                        )}
                    </p>
                  </Col>
                  <Col lg="6" sm="12">
                    <p className="lastDiagnostics">
                      <h5>Temperatura</h5>
                      {!lastConsulte[lastConsulte.length - 1]
                        ? ("Carregando dados...")
                        : (
                          <p className='lastSymptoms'>
                            {temperatureDiagnostic}
                          </p>
                        )}
                    </p>
                  </Col>
                </>}
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  )

}
