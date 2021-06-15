import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FieldTimer } from '../Components/FieldTimer';
import { Header } from '../Components/Header';
import { TimesHistory } from '../Components/TimesHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { api } from '../services/api';

let contdowntimeout:any
function StopWatch() {
  //gera um stado time
  const [time, setTime] = useState<number>(0);
  //gera um stado isActive
  const [isActive, setIsActive] = useState<boolean>(false);
  //gera o stado is paused
  const [isPaused, setIsPaused] = useState<boolean>(false);

  //gera const com os minutos 
  const minutes = Math.floor(time / 60);
  //gera const com os segundos
  const seconds = time % 60;

  //funcao de resetar o contador e seta  setispaused pra falso
  //e seta setisactive pra falso  e settime pra 0 
  // e para com o contador
  function ResetCountDown() {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
    clearTimeout(contdowntimeout);
  }
  //funcao de resetar o contador e seta  setispaused pra falso
  //e seta setisactive pra falso  e settime pra 0 
  // e para com o contador
  // e faz o post dos items para o back end
  async function Stop() {
    clearTimeout(contdowntimeout)
    setIsActive(false);
    setIsPaused(false);
    setTime(0);

    const timeAdd = await api.post("/create", {
      time,
      minutes,
      seconds
    });
  }

  //useeffect que começa quando quando isactive é = a true 
  useEffect(() => {
    if (isActive && !isPaused) {
      contdowntimeout = setTimeout(() => {
        setTime(time + 1);
      }, 1000);
    }
  }, [isActive, time, isPaused]);

  return (
    <>
      <Header />
      <div className="d-flex justify-content-end">
        <Container fluid='lg'>
          <Row>
          </Row>
          <Col >
            <Row className="justify-content-md-center">
              <Col md='auto'>
                <FieldTimer value={`${minutes}`} />
              </Col>
              <Col md='auto'>
                <FieldTimer value={':'} />
              </Col>
              <Col md='auto'>
                <FieldTimer value={`${seconds}`} />
              </Col>
            </Row>

            <Row className="justify-content-md-center">
              {isActive ?
                (
                  <>
                    <Col md="auto">
                      <Button onClick={Stop} variant="danger" >Stop</Button>
                    </Col>
                    {isPaused ?
                      <Col md="auto">
                        <Button onClick={() => setIsPaused(false)}>Continue</Button>
                      </Col>
                      :
                      <Col md="auto">
                        <Button onClick={() => setIsPaused(true)} variant="warning">Pause</Button>
                      </Col>
                    }
                    <Col>
                      <Button onClick={ResetCountDown} variant="dark">Reset</Button>
                    </Col>
                  </>
                ) :
                <Button onClick={() => setIsActive(!isActive)}>Start<FontAwesomeIcon icon={faClock} /></Button>
              }
            </Row>
            <TimesHistory isActive={isActive} />
          </Col>
        </Container>
      </div>
    </>
  );
}

export { StopWatch };