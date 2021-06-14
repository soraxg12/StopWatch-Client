import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch20 } from '@fortawesome/free-solid-svg-icons'

export function Header() {
  return (
    <Nav variant="pills" activeKey="1" >
      <Nav.Item>
        <Nav.Link eventKey="1" href="#/home" disabled>
          stopwatch<FontAwesomeIcon icon={faStopwatch20} />
          </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}