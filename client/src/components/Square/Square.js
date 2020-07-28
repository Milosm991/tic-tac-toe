import React from 'react'

import style from './Square.module.scss'

const Square = ({ value, handleFunc }) => {
    return (
    <button className={style.btn} onClick={() => handleFunc()}><h1>{value}</h1></button>
    )
}

export { Square }