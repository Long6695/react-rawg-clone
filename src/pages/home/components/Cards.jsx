import React, {useEffect, useRef} from 'react'
//style
import styled from 'styled-components'
//context
import { useGamesContext } from 'context/gamesContext'
// router
import { Link } from 'react-router-dom'
// components
import Spinner from 'components/spinner/Spinner'
import IconPlatform from './IconPlatform'
//libraries
import Fade from 'react-reveal/Fade';
// icons
import {AiFillWindows, AiFillApple, AiOutlinePlus, AiOutlineCheck} from 'react-icons/ai'
import {FaPlaystation, FaXbox} from 'react-icons/fa'
import { SiNintendo } from 'react-icons/si'
import { DiLinux } from 'react-icons/di'
const icons = [
  { 
    name: 'pc',
    icon: <AiFillWindows size='20px'/>
  },
  {
    name: 'playstation 4' || 'playstation 4',
    icon: <FaPlaystation size='20px'/>
  },
  {
    name: 'xbox one' || 'xbox series s/x',
    icon: <FaXbox size='20px'/>
  },
  {
    name: 'nintendo switch',
    icon: <SiNintendo size='20px'/>
  },
  {
    name: 'linux',
    icon : <DiLinux size='20px'/>
  },
  {
    name: 'macos',
    icon : <AiFillApple size='20px'/>
  },
]


const Cards = () => {
  
  const {games, setPageNumber, setGames} = useGamesContext()
  const observerRef = useRef();


  useEffect(() => {
    if(!observerRef.current) return 

    let observerRefValue = null

    const options = {
      root: null,
      rootMargin: '400px',
      threshold: 1.0,
    }


    const observer = new IntersectionObserver((entries) => {
      if(!entries[0].isIntersecting) return 
      console.log(entries)
      setPageNumber(prev => prev + 1)
    }, options)

    let value = observerRef.current
    observer.observe(value)
    observerRefValue = value

    return () => {
      if(observerRefValue) {
        observer.unobserve(value)
      }
    }


  },[setPageNumber])


  const handlePlatforms = (platform) => {
    return icons.filter(icon => {
      if(platform.includes(icon.name)){
        return icon.icon
      }else {
        return
      }
    })
  }

  const handleAdded = (id) => {
    const copyGame = [...games] 
    const currentIndex = copyGame.findIndex(game => game.id === id)
    copyGame[currentIndex].tba = copyGame[currentIndex].tba ? false : true
    if(copyGame[currentIndex].tba) {
      copyGame[currentIndex].added++
    }else {
      copyGame[currentIndex].added--
    }
    setGames(copyGame)
  }

  return (
    <>
    <Container>
        <Row>
     {games.length > 0 && games.map(game => {
       return (
              
            <Fade top>
              <Column key={game.id}>
                  <Image src={game.background_image}/> 

                  <WrapContent>
                            <Platform>
                            {handlePlatforms(game.platforms
                            .map(item => item.platform.name.toLowerCase()))
                            .map((icon,index) => <IconPlatform key={index} icons={icon}/>)}
                            </Platform>


                        <Link style={{color: '#fff'}} to={`/detail/${game.slug}`}>
                            <Content>
                              <Title>{game.name}</Title>
                              <Ratings style={game.ratings_count > 60 ? {color: '#6dc849' , border: '1px solid rgba(109,200,73,.4)'} : {color: "#fdca52", border: '1px solid rgba(253,202,82,.4)'}}>{game.ratings_count < 10 ? `0${game.ratings_count}` : game.ratings_count} </Ratings>
                            </Content>
                        </Link>
                        <Added>
                            <button style={game.tba ? {backgroundColor: 'green'} : {backgroundColor: 'hsla(0,0%,100%,.1)'}} onClick={() => handleAdded(game.id)}>
                              <>
                              {
                                game.tba 
                                ? 
                                (<AiOutlineCheck size="16px"/>) 
                                : 
                                (<AiOutlinePlus size='16px'/>)
                              }  
                                
                              </>
                              <span>{game.added}</span>
                            </button>
                              
                        </Added>
                  </WrapContent>
              </Column>
            </Fade>
          
       )
     })}
       </Row>
    </Container>

     <Spinner innerRef={observerRef}/>
      
      </>
  )
}

export default Cards

const Container = styled.div`
  width: 100%;
`


const Row = styled.div`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(382px, 1fr));
  place-items: center;

 

  @media (max-width: 500px) {
    grid-template-columns: 1fr
  },
`

const Column = styled.div`
  border: 1px solid #777;
  border-radius: 20px;
  overflow: hidden;
  margin: 8px;
  height: auto;

`


const Image = styled.img`
  width: 100%;
  min-height: 300px;
  object-fit: cover

`

const WrapContent = styled.div`
  padding: 15px;
  min-height: 200px;

  display:flex;
  flex-direction: column;
  justify-content: space-between;
`


const Content = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
`


const Title = styled.h3`
  font-size: 30px;
  line-height: 28px;
  font-weight: 700;
  max-width: 80%;
`

const Ratings = styled.span`
  padding: 4px 8px;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
`

const Platform = styled.div`

` 

const Added = styled.div`


  button {
      display: flex;
      align-items: center;
      font-size: 14px;
      border: none;
      outline: none;
      padding: 6px 10px;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease-in;
      
      &:hover {
       background-color: #fff;
       color: #000;
      }
    }
`