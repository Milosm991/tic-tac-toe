import React from 'react'

import image from '../../img/tictactoe.png'
import style from './Header.module.scss'

const Header = () => {
    return (
        <header className={style.head}>
            <h3>TicTacToe</h3>
            <img src={image} alt='tictactoe'></img>
        </header>
    )
}
export { Header }