import React from 'react';
import { withRouter } from 'react-router'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class NavBar extends React.Component {
  state = {
    username_value: null
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    //<Redirect to={"/player/" + this.state.username_value} />
  }

  handleChange (event) {
    this.setState({
      username_value: event.target.value
    })
  }

  render () {

    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/">Skyblock Made Easy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form onSubmit={() => { this.props.history.push('/player/' + this.state.username_value)}} inline>
            <FormControl type="text" placeholder="Enter Player" className=" mr-sm-2" value={this.state.username_value} onChange={this.handleChange}  />
            <Button variant="secondary" type="submit">View Stats</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default withRouter(NavBar)
