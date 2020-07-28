import React from 'react'
import { Link } from 'react-router-dom'

import { Button, Container, Row, Col } from 'react-materialize'
import { createCandidate, createNewPlayer } from '../../utils/functions'

import style from './CreatePlayer.module.scss'

class CreatePlayer extends React.Component {
    constructor() {
        super()

        this.state = {
            name: '',
            userId: '',
            error: ''
        }
    }
    getInputValue = (e) => {
        let value = e.target.value;

        this.setState({ name: value })
    }

    componentDidMount() {
        let apikey = localStorage.getItem('apikey');

        apikey === null && createCandidate();      
    }
    

    createPlayer = (e) => {
        if(this.state.name === ''){
            e.preventDefault()
            this.setState({ error: 'You have to enter name!'})
        } else {
            alert('You can now go to lobby')
        }

        createNewPlayer(this.state.name)
        .then(response => response.data)
        .then(player => this.setState({ userId: player.id }))
    }

    checkName = (e) => {
        if(!this.state.name){
            e.preventDefault()
            this.setState({ error: 'You have to enter name!'})
        }
    }
    render() {
        const { userId, name } = this.state;

        return(
            <Container className={style.form}>
                <Row >
                    <Col xl={12} l={12} m={12} s={12}>
                    <h2>TicTacToe</h2>
                    <input type='text' onChange={(event) => this.getInputValue(event)} placeholder='Enter Your name...'></input>
                    <p>{this.state.error}</p>
                    </Col>
                </Row>    
                    <Row>
                        <Col xl={6} l={12} m={12} s={12}>
                    <Link to={`/lobby?name=${name}&id=${userId}`}>
                        <Button className={style.btnC} onClick={(e) => this.checkName(e)}>Go to Lobby</Button>
                    </Link>
                    </Col>
                    <Col xl={6} l={12} m={12} s={12}>
                        <Button onClick={event => this.createPlayer(event)} className={style.btnC}>Create Player</Button>
                        </Col>
                    </Row>
              
            </Container>

        )
    }
}
export { CreatePlayer }