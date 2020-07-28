import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Row, Col, Button } from 'react-materialize'
import { Header } from '../Header/Header'
import Modal from 'react-modal'

import queryString from 'query-string'
import image from '../../img/tictactoeBig.png'
import { createRoom, allRooms } from '../../utils/functions'

import style from './Lobby.module.scss'

class Lobby extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            roomId: '',
            roomIds: [],
            inputValue: '',
            modalIsOpen: false
        }
    }
    
    componentDidMount () {
        allRooms()
        .then(response => {
                let ids = [ ...this.state.roomIds, response.data]
                this.setState({ roomIds: ids }) 
        })
    }

    onPressCreate = (e) => {
        e.preventDefault()
         createRoom()
        .then(response => this.setState({ roomId: response.data.id }))
    }

    onPressJoin = (e) => {
        const { roomIds, inputValue } = this.state;        
        const roomId = roomIds.length && roomIds.map(item => item.find(id => id === inputValue));

        if(roomId){
            return 
        } else {
            e.preventDefault()
            return alert('ID is incorrect!')
        }
    }
    
    getInputValue =(e) => {
        let value = e.target.value;
        
        this.setState({ inputValue: value})
    }
    
    render(){
        const { name, id } = queryString.parse(this.props.location.search)
        
        
        return (
            <>
            <Header />
             
            <Container className={style.main}>
                <Row>
                    <Col xl={3} l={3} m={6} s={12}>
                        <div className={style.info}>
                            <h3>Player: {name}</h3>
                            <h6>Room ID: {this.state.roomId}</h6>
                            <h6>All Rooms: </h6>
                            {this.state.roomIds.length ? <div className={style.rooms}>
                                {this.state.roomIds.length ? 
                                this.state.roomIds.map(item => item.map(room => <p>{room.id}</p>))
                                :null}
                            </div> : null}
                        </div>
                    </Col>
                    <Col xl={9} l={9} m={6} s={12}>
                        <img src={image} alt='tictactoe'></img>
                        <div className={style.btns}>
                            <Button onClick={(e) => this.onPressCreate(e)} >Create Room</Button>
                            <Button onClick={() => this.setState({modalIsOpen: true})} className={style.join}>Join Room</Button>
                        </div>
                    </Col>
                </Row>             
            </Container>
            
            <Modal 
                className={style.modal}
                ariaHideApp={false}
                isOpen={this.state.modalIsOpen}
                onRequestClose={() => 
                this.setState({
                    modalIsOpen: false
                })
            }>
                <div className={style.modal_info}>
                    <input onChange={(e) => this.getInputValue(e)}type='text' placeholder='Room ID...'></input>
                    <Link onClick={(e) => this.onPressJoin(e)} to={`/board?name=${name}&id=${id}&roomId=${this.state.inputValue}`}><Button>Ok</Button></Link> 
                    <Button className={style.cancle} onClick={() => this.setState({ modalIsOpen: false})}>Cancle</Button>
                </div>
            </Modal>
            </>
        )
    }
    
}
export { Lobby }

