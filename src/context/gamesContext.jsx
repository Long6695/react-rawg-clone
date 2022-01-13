import React, {createContext, useContext, useState, useEffect} from 'react' 

//service
import httpRequest from 'services/httpRequest'
// Api
import {KEY} from 'constants/api'


const GamesContext = createContext()

const GamesProvider = ({children}) => {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalGames, setTotalGames] = useState(1)
  const [gameDetail, setGameDetail] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  })
  const [searchedGame, setSearchedGame] = useState([])


  const fetchGames = async(page = 1) => {
    if(totalGames === games.length){
      setIsLoading(false)
      return
    }

    const res = await httpRequest.get(`https://api.rawg.io/api/games/lists/main?discover=true&key=${KEY}&ordering=-relevance&page=${page}&page_size=10`)
    const data = res.data.results

    setTotalGames(res.data.count)

    setGames(prev => [...prev,...data])
  }

  const getGameDetailBySlug = async (slug) => {
    

    const res = await httpRequest.get(`https://rawg.io/api/games/${slug}?key=${KEY}`)

    const data = res.data 
    setGameDetail(data)
  }

  // search
  // api : https://rawg.io/api/users/current/games?page_size=20&search=infi&page=1&key=f77aa8a32f4f4bf9872b2c46bf2bdb4f

  const getGameBySearchName = async (name) => {
    const res = await httpRequest.get(` https://rawg.io/api/games?page_size=20&search=${name}&page=1&key=f77aa8a32f4f4bf9872b2c46bf2bdb4f`)

    setSearchedGame(res.data.results)
  }


  useEffect(() => {
    try {
      fetchGames(pageNumber)
    } catch (error) {
    throw new Error(error)
    }
    // eslint-disable-next-line
  },[pageNumber])

  
  
  useEffect(() => {

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      })
    };

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }

  },[])

useEffect(() => {
  if(windowSize.width < 900) {
    setIsMobile(true)
  }else{
    setIsMobile(false)
  }
}, [isMobile,windowSize])

  return (
    <GamesContext.Provider value={{games, isLoading, setPageNumber, getGameDetailBySlug, gameDetail, isMobile, setGameDetail, setGames, getGameBySearchName, searchedGame}}>
      {children}
    </GamesContext.Provider>
  )
}

const useGamesContext = () => useContext(GamesContext)

export {useGamesContext}
export default GamesProvider