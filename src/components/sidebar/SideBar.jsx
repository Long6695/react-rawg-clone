import React from 'react'

import styled from 'styled-components'
// import { useGamesContext } from 'context/gamesContext'
const SideBar = () => {
  // const {games} = useGamesContext()

  return (
    <Container>
      {/* {
        games.length > 0 && games.map(game => <Tag key={game.id}>{game.name}</Tag>)
      } */}
    </Container>
  )
}

export default SideBar

const Container = styled.aside`
  display:flex;
  flex-direction: column;
  width: 20%;
  min-height: 100vh;
  background: transparent;
`
// const Tag = styled.div`
//   padding: 20px 0;
// `