import React from 'react'
import {FaSpinner} from 'react-icons/fa'

import styled from 'styled-components'
import { useGamesContext } from 'context/gamesContext'

const Spinner = ({innerRef}) => {
  const {isLoading} = useGamesContext()

  return (
    <Wrap ref= {innerRef}>
        {isLoading && <FaSpinner style={{animation: 'spinner 1s ease-in infinite'}} size={"50px"}/>} 
     </Wrap>
  )
}

export default Spinner

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  

  @keyframes spinner {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg);
    }
  }
`