import React, {useState, useRef} from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useGamesContext } from 'context/gamesContext';

import useComponentVisible from 'hooks/useComponentVisible'

const NavBar = () => {
  const [text, setText] = useState('')

  const {getGameBySearchName, searchedGame} = useGamesContext()

  const {ref, isOpen} = useComponentVisible()

  console.log(ref,isOpen)

  const debounceValueRef = useRef

  const handleSearch = (e) => {

    const {value} = e.target

    setText(value)

    if(debounceValueRef.current) {
      clearTimeout(debounceValueRef.current)
    }

    debounceValueRef.current = setTimeout(() => {
      getGameBySearchName(value)
    }, 500)

  }

console.log(searchedGame)
  return (
    <Nav>
      <Logo>
        <Link to="/" >RAWG</Link>
      </Logo>
      <SearchField>
        <Search ref={ref} type="text" value={text} onChange={handleSearch} placeholder='Search games'/>

        {searchedGame.length > 0 && 
        <>
          {isOpen && 
          <Items>
            {searchedGame.length > 0 && searchedGame.map(game => {
              return (
           <Link to={`/detail/${game.slug}`}>

              <Content>
                <img src={game.background_image} alt="" />
                <Name>{game.name}</Name>
                <Ratings>{game.metacritic}</Ratings>
              </Content> 

            </Link>            
            )
            })}
          </Items>}
        </>
        }

      </SearchField>
      <Avatar src="./logo192.png"/>
    </Nav>
  )
}

export default NavBar

const Nav = styled.nav`
  display : flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 70px;

  background-color: transparent;
`

const Logo = styled.div`
  a {
    color: white;
    font-size: 32px;
    font-weight: 700;
    letter-spacing : 1.3px;
  }
`

const SearchField = styled.div`
  flex: 1;
  margin: 0px 50px;
  position: relative;
`

const Items = styled.div`
  background: #c5c5c5;
  color: #000;

  display:flex;
  flex-direction: column;

  position: absolute;
  top: 52px;
  left:0;
  right:0;

  border-radius: 20px;
  overflow: hidden;

  padding: 20px 100px;

  z-index: 10;

  max-height: 600px;
  overflow-y: scroll;

  img {
    width: 80px;
    height: 80px;
    border-radius: 20px;

    margin: 0 50px;

    object-fit:cover;
  }
`

const Content = styled.div`
    display:flex;
    align-items:center;

    margin: 10px 0;
`

const Name = styled.h3`
  font-size: 18px;
  font-weight: 500;
`
const Ratings = styled.span`
  margin-left: auto;
  padding: 4px 8px;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
`
const Search = styled.input`
  width: 100%;
  padding: 0 20px;
  height: 50px;

  border-radius: 20px;
  border: none;

  background-color: #3B3B3B;

  transition: all 0.45s ease-out;

  font-size: 16px;
  font-weight: 500;
    &:hover {
    background-color: #fff;
    }

    &:focus {
      outline: none;
    }
`

const Avatar = styled.img`
  width: 50px;

`