import Spinner from 'react-bootstrap/Spinner';
import UnSpinner from './UnSpinner';
import {Container, Row, Col} from 'react-bootstrap';

function UnSpinnerCentrado() {
  return (
    <Container>
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <Row>
        <Col></Col>
        <Col xs={1}>
          <UnSpinner/><UnSpinner/><UnSpinner/><UnSpinner/>
        </Col>
        <Col></Col>
      </Row>
    </Container>


  )
  ;
}

export default UnSpinnerCentrado;