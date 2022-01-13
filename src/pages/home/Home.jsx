import React from 'react'

//components
import SideBar from 'components/sidebar/SideBar'
import Cards from './components/Cards';

// icons
import {MdKeyboardArrowDown} from 'react-icons/md'

// hooks
import useComponentVisible from 'hooks/useComponentVisible';
//style
import styled from 'styled-components'

// context
import { useGamesContext } from 'context/gamesContext'
const Home = () => {
  const { ref, isOpen } = useComponentVisible();
  const {isMobile} = useGamesContext()
  
  return (
    <Container>
      {!isMobile &&  <SideBar/>} 
      <Content>
        <Title>New and trending</Title>
        <Subtitle>Based on player counts and release date</Subtitle>
       <Select ref={ref}>
          <DefaultOption>
              Order by:
              <span>Relevance </span>
              <MdKeyboardArrowDown size={"26px"}/>
          </DefaultOption>
         {isOpen ?
          (
          <ListCategory>
              <li>Relevance</li>
              <li>Date added</li>
              <li>Name</li>
              <li>Release date</li>
              <li>Popularity</li>
              <li>Average rating</li>
          </ListCategory>
          )
          :
          null
          }
       </Select>
       <Cards/>
      </Content>
    </Container>
  )
}

export default Home
const Container = styled.div`
  display: flex;


`
const Content = styled.main`
  width: 100%;
`
const Title = styled.h1`
  font-size: 80px;
  font-weight: 700;
`

const Subtitle = styled.p`
  font-size: 18px;
  font-weight: 500;
`

const Select = styled.div`
  display: flex;
  align-item: center;
  justify-content:center;

  border: 1px solid #777;

  width: 200px;
  height: 50px;

  cursor: pointer;

  margin: 30px 0;
  background-color: hsla(0,0%,100%,.07);
  position: relative;

  &:hover {
    color: rgba(249,249,249,0.4)
  }
`
const DefaultOption = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 6px;
  }
`


const ListCategory = styled.ul`
  display:flex;
  flex-direction: column;
  align-item: center;

  background-color: #fff;
  font-size: 16px;
  color: #000;

  position: absolute;
  top: -1px;
  left: -5px;
  right: -5px;

  padding: 20px;

  border-radius: 5px;

  z-index:100;
  li {
    padding: 4px 8px;

    &:hover {
      background-color: rgba(0,0,0,0.04);
      border-radius: 3px;
    }
  }
`