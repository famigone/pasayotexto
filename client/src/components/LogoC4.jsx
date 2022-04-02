import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../img/c4_warning.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})`

 margin-left:10px
`


const LogoC4 = () => {

        return (
            <Wrapper href="/">
                <img src={logo} width="100%" height="50" alt="C4" />
            </Wrapper>
        )
    
}

export default LogoC4