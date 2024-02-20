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
  const exemplo: any = lastConsulte[lastConsulte.length - 1]
  const navigate = useNavigate()

  async function postSymptoms(event: FormEvent) {
    event.preventDefault()

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/consultas/cadastrarConsulta', {
        id_paciente: Number(id),
        consulta_temperaturaPaciente: temp,
        consulta_pressaoArterialSistolicaPaciente: systolic,
        consulta_pressaoArterialDiastolicaPaciente: diastolic,
        consulta_frequenciaRespiratoriaPaciente: respiratory,
        consulta_frequenciaCardiacaPaciente: pulse,
        ids_sintomas: symptoms
      })
      getAttendances()
      navigate("/Coronavirus-Self-Checker")
      alert('Atendimento realizado com sucesso!')
      console.log(res)
    } catch (err: any) {
      console.log(err.message)
      const p: any = document.getElementById('alertParagraph')
      p.innerHTML = 'Falha ao atender paciente! Verifique se todos os campos estão preenchidos!'
    }
  }
  function getAttendances() {
    axios
      .get(url)
      .then(res => setLastConsulte(res.data.data))
      .catch(err => console.log(err.message))

    axios
      .get(`http://localhost:8000/api/getSintomas`)
      .then(res => setItens(res.data))
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getAttendances()
  }, [])

  function getSystolicDiagnostic() {
    if (lastConsulte[lastConsulte.length - 1] == undefined) {
      return ("Carregando dados...")
    } else {
      const systolic = lastConsulte[lastConsulte.length - 1]['systolic_pressure']

      if (systolic < 90) {
        return `${systolic} | Hipotenso`
      }
      else if (systolic >= 90 && systolic < 130) {
        return `${systolic} | Normotenso`
      }
      else if (systolic >= 130 && systolic < 139) {
        return `${systolic} | Normotenso Limítrofe`
      }
      else if (systolic >= 140 && systolic < 159) {
        return `${systolic} | Hipertenso Leve`
      }
      else if (systolic >= 160 && systolic < 179) {
        return `${systolic} | Hipertenso Moderado`
      }
      else if (systolic > 180) {
        return `${systolic} | Hipertenso Grave`
      }
    }
  }
  const systolicDiagnostic = getSystolicDiagnostic()

  function getDiastolicDiagnostic() {
    if (lastConsulte[lastConsulte.length - 1] == undefined) {
      return ("Carregando dados...")
    } else {
      const diastolic = lastConsulte[lastConsulte.length - 1]['diastolic_pressure']

      if (diastolic < 60) {
        return `${diastolic} | Hipotenso`
      }
      else if (diastolic >= 60 && diastolic < 85) {
        return `${diastolic} | Normotenso`
      }
      else if (diastolic >= 85 && diastolic < 89) {
        return `${diastolic} | Normotenso Limítrofe`
      }
      else if (diastolic >= 90 && diastolic < 99) {
        return `${diastolic} | Hipertenso Leve`
      }
      else if (diastolic >= 100 && diastolic < 109) {
        return `${diastolic} | Hipertenso Moderado`
      }
      else if (diastolic > 110) {
        return `${systolic}x${diastolic} | Hipertenso Grave`
      }
    }
  }
  const DiastolicDiagnostic = getDiastolicDiagnostic()

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
      if (temperature >= 35.19 && temperature <= 37.29) {
        return `${temperature}°C | Afebril`
      }
      if (temperature >= 37.39 && temperature <= 37.79) {
        return `${temperature}°C | Subfebril`
      }
      if (temperature >= 37.89 && temperature <= 38.99) {
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
  const temperatureDiagnostic = getTemperatureDiagnostic();

  return (
    <>
      <DataPaciente />
      <div className='bodyPage'>
        <div className="returnButton">
          <Link to="/Coronavirus-Self-Checker">
            <AiOutlineArrowLeft className="buttonHome" />
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
                  <Form.Control onChange={e => setSystolic(Number(e.target.value))} type="text" placeholder="Pressão Arterial Sistólica" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control onChange={e => setDiastolic(Number(e.target.value))} type="text" placeholder="Pressão Arterial Diastólica" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setPulse(Number(e.target.value))} type="text" placeholder="Frequência Cardíaca" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setRespiratory(Number(e.target.value))} type="text" placeholder="Frequência Respiratória" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={e => setTemp(Number(e.target.value))} type="text" placeholder="Temperatura" />
            </Form.Group>
          </div>
          <Container className="formSintomasCheck">
            <Row>
              <h3 className="tituloFormSintomasChecks">Sintomas</h3>
              {itens.map(data => {
                const itemId = Number(data['sintoma_id']);

                const handleChangeCheck = (e: any) => e.currentTarget.checked 
                ? setSymptoms([...symptoms, itemId])
                : setSymptoms(symptoms.filter(id => id != itemId));

                return (
                  <Col xs="6" sm='6' md='4' lg='3' style={{ textAlign: 'left' }}>
                    <Form.Check
                      className='checkboxInput'
                      type='checkbox'
                      value={itemId}
                      onClick={handleChangeCheck}
                    />
                    <p>{data['sintoma_nome']}</p>
                  </Col>
                );
              })}

            </Row>
          </Container>
          <div className="attendaceSubmitSpace">
            <p id="alertParagraph"></p>
            <button type='submit' className="enviar">Enviar</button>
          </div>
        </Form>
        <div className="lastConsulte">
          <h3 className='tituloFormSintomas'> Sintomas da última consulta </h3>
          <Container>
            <Row>
              {
                exemplo === undefined
                  ? <p>Sintomas anteriores indisponíveis!</p>
                  : exemplo.symptoms.map((data: { name: String }) => {
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
                      <h5>Pressão Arterial Sistólica</h5>
                      {!lastConsulte[lastConsulte.length - 1]
                        ? ("Carregando dados...")
                        : (
                          <p className='lastSymptoms'>
                            {systolicDiagnostic}
                          </p>
                        )}
                    </p>
                  </Col>
                  <Col lg="6" sm="12">
                    <p className="lastDiagnostics">
                      <h5>Pressão Arterial Diastólica</h5>
                      {!lastConsulte[lastConsulte.length - 1]
                        ? ("Carregando dados...")
                        : (
                          <p className='lastSymptoms'>
                            {DiastolicDiagnostic}
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
                  <Col lg="12" sm="12">
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
