import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Badge, Card, Container, Row, Col, Nav, Popover, Overlay, Accordion, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useRedux } from '@redux';
import { get as getWorkOrderDetail } from '@redux/workOrderDetail/actions';
import { AccordionToggleCaret, ContentLoader, RenderRoutes } from 'component';
import ModalUpdateStatus from '../components/ModalUpdateStatus';

import { useShowScroll, useIsOpenControls } from 'hooks';
import { getStatus, getStatusClass } from 'helpers';

const getMenuButtons = won => [
  { path: 'photos/before', name: 'Before Photos', key: 'before_photos' },
  { path: `submit/${won?.survey_name || 'basic'}`, name: 'Submit Survey', key: 'submit_survey' },
  { path: 'photos/during', name: 'During Photos', key: 'during_photos' },
  { path: 'bids', name: 'Add Bids', key: 'bids' },
  { path: 'photos/after', name: 'After Photos', key: 'after_photos' },
  { path: 'submit/final', name: 'Review & Submit', key: 'submit' }
];

const WorkOrderDetails = props => {
  const { match, routes = [] } = props;
  const wonId = match?.params?.won || null;

  const wonState = useRedux('workOrderDetail');
  const { data: won = {} } = wonState;

  const d = useDispatch();
  const scrollControl = useIsOpenControls();
  const statusModalControl = useIsOpenControls();
  const detailButtonRef = React.useRef();

  React.useEffect(() => {
    d(getWorkOrderDetail(wonId));
    window.addEventListener('scroll', handleScroll);
  }, []);

  useShowScroll(() => {
    scrollControl.handleOpen();
  });

  const handleScroll = event => {
    scrollControl.handleClose();
  };

  if (wonState.isLoading) {
    return <ContentLoader>Loading Work Order Details...</ContentLoader>;
  }

  const getItemStatus = () => {
    if (won.approval_status === 'Pre-Pending' || won.approval_status === 'Pending') {
      return 'Pending';
    }
    return getStatus(won.due_date);
  };

  return (
    <Container>
      <Card style={{ marginBottom: '0.5em' }}>
        <Card.Img style={{ maxHeight: '200px' }} variant="top" src={won.image_url_small} />
        <Card.ImgOverlay style={{ paddingTop: '160px' }}>
          <Badge variant="primary" onClick={statusModalControl.handleOpen}>
            Expected on Time
          </Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Badge variant="primary">{`Due: ${new Date(won.due_date).toDateString()}`}</Badge>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Badge variant={getStatusClass(won.due_date)}>{getItemStatus()}</Badge>
        </Card.ImgOverlay>
      </Card>
      <Row>
        <h5 className="col">
          <Link to={match.url}>{won.work_ordered}</Link>
        </h5>
        <h6 className="col">
          <a href={`geo://${won.gps_latitude},${won.gps_longitude}`}>
            {won.address_street}
            <br />
            {`${won.address_city}, ${won.address_state}`}
          </a>
        </h6>
      </Row>
      <Row style={{ marginBottom: '150px' }}>
        <Col>
          <RenderRoutes routes={routes} />
        </Col>
      </Row>
      <Accordion defaultActiveKey="orderActions">
        <Card className="fixed-bottom" bg="secondary">
          <AccordionToggleCaret block eventKey="orderActions" variant="dark-outline" ref={detailButtonRef}>
            Actions Menu...
          </AccordionToggleCaret>
          <Accordion.Collapse eventKey="orderActions">
            <Card.Footer>
              <Nav justify variant="pills">
                <Container>
                  <Row>
                    {getMenuButtons(won).map(({ path, name }, index) => (
                      <Col key={index} sm={6}>
                        <Nav.Item>
                          <NavLink to={`${match.url}/${path}`}>
                            <Nav.Link as={Button} size="sm" block>
                              {name}
                            </Nav.Link>
                          </NavLink>
                        </Nav.Item>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </Nav>
            </Card.Footer>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Overlay
        placement="top"
        target={detailButtonRef}
        show={scrollControl.isOpen}
        // onHide={() => console.log('hideNav')}
      >
        <Popover id="nav-popover" className="alert-info">
          <Popover.Content>
            <FontAwesomeIcon icon={['fas', 'angle-double-down']} size="2x" />
            &nbsp;&nbsp;Scroll down to read all instructions.
          </Popover.Content>
        </Popover>
      </Overlay>
      <ModalUpdateStatus won={won} {...statusModalControl} />
    </Container>
  );
};

export default WorkOrderDetails;
