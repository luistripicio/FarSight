import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import { Badge, Button, Card, Container, Row, Col, Table } from 'react-bootstrap';
import { ContentLoader } from 'component';

class BidsScreen extends Component {
  isLoading = true;
  state = {
    todos: []
  };
  async componentDidMount() {
    var url = '/api/work_order/' + this.props.won + '/bid';
    await fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(async res => {
        let bodyText = await res.text();
        return JSON.parse(bodyText);
      })
      .then(data => {
        this.isLoading = false;
        this.setState({ todos: data });
        console.log('ccs', this.state.todos);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  // [...]
  render() {
    return this.isLoading ? (
      <ContentLoader>Loading Bid Items...</ContentLoader>
    ) : (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Card>
              <Card.Header>
                <Row>
                  <Col xs={4}>
                    <h5>Bid Items</h5>
                  </Col>
                  <Col xs={4}>
                    <Button size="sm" variant="success">
                      <FontAwesomeIcon icon={faPaperPlane} />
                      &nbsp;Submit&nbsp;Bid
                    </Button>
                  </Col>
                  <Col xs={4}>
                    <Button className="float-right" size="sm" onClick={() => this.props.tabChange('createBid')}>
                      <FontAwesomeIcon icon={faPencilRuler} />
                      &nbsp;Add&nbsp;Bid&nbsp;Item
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <Table striped bordered hover>
                <thead>
                  <tr style={{ fontSize: '0.75em' }}>
                    <th>#</th>
                    <th>Description</th>
                    <th>Qty &amp; Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.todos.map(bid_item => (
                    <>
                      <tr>
                        <td style={{ fontSize: '0.75em' }}>{bid_item.bid_item_number}</td>
                        <td>{bid_item.item_description}</td>
                        <td>
                          {bid_item.number_of_units}@&nbsp;$
                          {bid_item.usd_unit_price}&nbsp;
                          <span style={{ fontSize: '0.75em' }}>per</span>&nbsp;
                          {bid_item.unit_of_measure}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <Badge variant="success">{bid_item.status}</Badge>
                        </td>
                        <td>Total:&nbsp;${bid_item.total_price}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default BidsScreen;