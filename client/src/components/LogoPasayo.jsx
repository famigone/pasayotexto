import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../img/pasayo_color.png'

const Wrapper = styled.a.attrs({    
})`
 margin-right:5px
`


const LogoPasayo = () => {

        return (
            <Wrapper>        
                <img src={logo} width="7%" alt="PASAYO Texto" />
            </Wrapper>            
        
        )
    
}

export default LogoPasayo