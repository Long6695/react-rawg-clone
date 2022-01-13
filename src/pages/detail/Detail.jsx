import React, {useEffect} from 'react'

// components
import SideBar from 'components/sidebar/SideBar'

// style
import styled from 'styled-components'
// context
import { useGamesContext } from 'context/gamesContext'
// react-router
import { useParams } from 'react-router-dom';

//components
import Spinner from 'components/spinner/Spinner';

const Detail = () => {
  const {gameDetail, getGameDetailBySlug, isMobile, setGameDetail} = useGamesContext()
  const {slug} = useParams()

  useEffect(() =>{
    if(!slug) return 

    getGameDetailBySlug(slug)

    return () => {
      setGameDetail({})
    }
  // eslint-disable-next-line
  },[slug])

  

  return (
    <Container>
      {!isMobile && <SideBar/>}

      {Object.keys(gameDetail).length === 0 && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}><Spinner/></div>}

      {Object.keys(gameDetail).length > 0 && 
        <Wrap isMobile = {isMobile}>
        <Content>
          <Header>
            <Title>{gameDetail.name}</Title>  
            <Ratings>{gameDetail.metacritic}</Ratings>
          </Header>
          <Description>
            <h3>About</h3>
            <div  dangerouslySetInnerHTML={{ __html: `${gameDetail.description}` }}/>
          </Description>
            <button style={{width: '100px'}} >Show</button>
        </Content>

        <Image>
          <img src={gameDetail.background_image} alt="" />
          <SubImage>
            <img src={gameDetail.background_image_additional} alt="" />
            <img src={gameDetail.background_image_additional} alt="" />
            <img src={gameDetail.background_image_additional} alt="" />
          </SubImage>
        </Image>
        
      </Wrap>
      }
      
    </Container>
  )
}

export default Detail

const Container = styled.div`
  display:flex;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
`
const Wrap = styled.div`
  display:flex;
  flex-direction: ${props => (props.isMobile ? `column` : `row`)};
  gap: 20px;
  width: 100%;
  padding: 10px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`

const Ratings = styled.div``

const Description = styled.div`
`

const Image = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 6px;
  }
`

const SubImage = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
  cursor: pointer;
  img {
    width: 100%;
    border-radius: 6px;
  }
`