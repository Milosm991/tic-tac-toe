import React from 'react'
import { Link } from 'react-router-dom'


import { Square } from '../Square/Square'
import { Header } from '../Header/Header'
import { Button } from 'react-materialize'
import { Row, Container, Col } from 'react-materialize'

import { findWinner, isThereMoreMoves } from '../../utils/functions'
import queryString from 'query-string'
import io from 'socket.io-client'

import style from './Board.module.scss'

let socket; 
let ENDPOINT = 'localhost:7000/?id=';

class Board extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            xIsNext: true,
            boardFields: [Array(9).fill(null)],
            name: '',
            id: '',
            message: ''
        }
    }

    clickOnField = (index) => {
        const fields = this.state.boardFields
        
        let { roomId } = queryString.parse(this.props.location.search)
        
        if(fields[index] === 'X' || fields[index] === 'O') return ;

        fields[index] = this.state.xIsNext ? 'X' : 'O'

        let turn = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            xIsNext: !this.state.xIsNext, 
            boardFields: fields 
        })

        
        socket = io(`${ENDPOINT}${roomId}/`) 
   
        socket.emit('clickedField', { index, turn, roomId });

        socket.on('field', ({data}) => {
           console.log(data);

        });

        
    }

    status = () => {
        let winner = findWinner(this.state.boardFields)
        let leftMoves = isThereMoreMoves(this.state.boardFields)

        if(winner){
            return `Winner is ${winner}`
        } else if (leftMoves === 9){
            return 'Game drawn!'
        } else {
            return `Next player is ${this.state.xIsNext ? 'X' : 'O'}`
        }
    }

    restart = () => {
        this.setState({
            xIsNext: true,
            boardFields: [Array(9).fill(null)]
        })
    }

    componentDidMount() {
        let { name, id, roomId } = queryString.parse(this.props.location.search)
        this.setState({ name, id })

        socket = io(`${ENDPOINT}${roomId}/`) 
        
        socket.emit('join_room', {roomId, name}, responseCode => {
            console.log(`Ack: ${responseCode}`)})
       
        socket.on('message', (message) => {
            this.setState({ message: message })
        })

        
        
    }

    render () {
        return(
            <>
            <Header />
            <Container className={style.table}>
                <div><h4>{this.status()}</h4></div>
                <p>{this.state.message.text}</p>
                
                    <Row className={style.table_row}>
                        <Square value={this.state.boardFields[0]} handleFunc={() => this.clickOnField(0)}/>
                        <Square value={this.state.boardFields[1]} handleFunc={() => this.clickOnField(1)}/>
                        <Square value={this.state.boardFields[2]} handleFunc={() => this.clickOnField(2)}/>
                    </Row>
                    <Row className={style.table_row}>
                        <Square value={this.state.boardFields[3]} handleFunc={() => this.clickOnField(3)}/>
                        <Square value={this.state.boardFields[4]} handleFunc={() => this.clickOnField(4)}/>
                        <Square value={this.state.boardFields[5]} handleFunc={() => this.clickOnField(5)}/>
                    </Row>
                    <Row className={style.table_row}>
                        <Square value={this.state.boardFields[6]} handleFunc={() => this.clickOnField(6)}/>
                        <Square value={this.state.boardFields[7]} handleFunc={() => this.clickOnField(7)}/>
                        <Square value={this.state.boardFields[8]} handleFunc={() => this.clickOnField(8)}/>
                    </Row>
               
                <Row>
                    <Col xl={6} l={6} m={6} s={6}>
                        <Button onClick={this.restart}>Restat Game</Button>
                    </Col>
                    <Col xl={6} l={6} m={6} s={6}>
                        <Link to={`/lobby?name=${this.state.name}&id=${this.state.id}`}><Button>Back to lobby</Button></Link>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}
export { Board }

