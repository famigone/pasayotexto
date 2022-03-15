import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../img/pasayo_textual.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})`

 margin-left:10px
`


const Logo = () => {

        return (
            <Wrapper href="https://c4.fi.uncoma.edu.ar">
                <img src={logo} width="100%" height="50" alt="PASAYO Texto" />
            </Wrapper>
        )
    
}

export default Logo