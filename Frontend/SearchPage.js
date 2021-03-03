import React from 'react';
import { useHistory } from "react-router-dom";

import NavBar from './NavBar.js';
import './index.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

class QuickProfile extends React.Component {

  render () {
    const src = "head/" + this.props.player
    return (
      <div className="QuickProfileWrap">
        <div className="QuickProfile" id={this.props.player} onClick={this.props.handler}>
          <Image className="QuickProfileImage" id={this.props.player} src={src}  rounded/>
          <span id={this.props.player}>Click to view the profile for <b>{this.props.player}</b></span>
        </div>
      </div>
    )
  }
}


class SearchPage extends React.Component {
  state = {
    usernameValue: ''
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQuick = this.handleQuick.bind(this);
  }

  handleChange(event) {
    this.setState({usernameValue: event.target.value});
  }

  handleSubmit(event) {
    this.props.history.push('/player/' + this.state.usernameValue)
    event.preventDefault();
  }

  handleQuick(event) {
    console.log(event.target)
    this.props.history.push('/player/' + event.target.id)
    event.preventDefault();
  }

  render () {
    return (
      <div className='SearchPage'>
        <NavBar />
        <Container fluid>
          <Row>
            <Col/>
            <Col xs={8} className='MainCol'>
              <br/><br/>
              <h1>Show statistics for</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Control size="lg" type="text" placeholder="Enter Username"  value={this.state.usernameValue} onChange={this.handleChange}  />
                </Form.Group>
              </Form>

              <QuickProfile handler={this.handleQuick} player="Zayeon"/>
              <QuickProfile handler={this.handleQuick} player="freezray_"/>
              <QuickProfile handler={this.handleQuick} player="g4giraffe"/>
              <QuickProfile handler={this.handleQuick} player="ThirtyVirus"/>
              <QuickProfile handler={this.handleQuick} player="Akinsoft"/>
              <QuickProfile handler={this.handleQuick} player="Refraction"/>


            </Col>
            <Col/>
          </Row>

        </Container>
      </div>
    )
  }
}

export default SearchPage
