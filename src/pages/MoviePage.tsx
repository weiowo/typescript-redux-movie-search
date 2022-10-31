import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//useDispatch是要改變某個state時用到的,而useSelector是想要拿到某個資料時使用的
//這個addUser的"動作"是我們想要"dispatch"出去的
import { setMovieTitle, setMovieId } from '../store/movieSlice'
import { RootState } from '..';

function Movies(){
    const movieTitles = useSelector((state:RootState)=>state.movies.title)
    //這邊的state會去看index中configuresotre的reducer們，選擇了movies這個reducer，再去movieSlicer選擇要用的key（也就是title）
    const [ movieName, setMovieName ] = useState("")
    const [ searchResultWords, setSearchResultWords] = useState("")
    const [ keyWord, setKeyWord] = useState("")
    const [ keyWordResult, setKeyWordResult] = useState<string[]>([])
    //這邊的movieList使用到的state，等於是index中configuresotre的reducer，所以可以選要哪一個
    //選好後，會使用movieSlice的資料
    const dispatch = useDispatch()

    useEffect(() => {
      fetch('https://json-faker.onrender.com/movies')
        .then(res => res.json())
        .then(data => {
            dispatch(setMovieTitle(data.movies.map((movie: { title: string; }) => movie.title)))
            dispatch(setMovieId(data.movies.map((movie: { id: number; }) => movie.id)))
        });
      },[dispatch]);

    function searchMovie(){
      setMovieName("")
      let searchedResults = movieTitles.filter((title)=> movieName === title)
      if (searchedResults.length > 0){
        setSearchResultWords("查到此電影：" + searchedResults.map((result)=> result))
      } else if (searchedResults.length === 0){
        setSearchResultWords("查無此電影")
      }
    }

    function searchKeyWord(){
      setKeyWord("")
      let keyWordsearchResult = movieTitles.filter((title) => title.includes(keyWord))
      if(keyWordsearchResult.length > 0){
        setKeyWordResult(keyWordsearchResult)
      }
    }
    
    return(
      <div className='movie-page'>
        <div className='sub-area'>
        <div className='title'>搜尋電影資料</div>
          <div className='input-area'>
            <input className='search-input' value={movieName} onChange={(e)=>{setMovieName(e.target.value)}} placeholder='請輸入完整電影名稱.....' />
            <button className='search-button' type='button' onClick={()=>{searchMovie()}}>搜尋</button>
          </div>
        <div className='result-display'>{searchResultWords === "" ? "": searchResultWords }</div>
        </div>
        <div className='middle-line'></div>
        <div className='sub-area'>
          <div className='title'>關鍵字篩選</div>
          <div className='input-area'>
            <input className='search-input' value={keyWord} onChange={(e)=>{setKeyWord(e.target.value)}} placeholder='請輸入關鍵字.....' />
            <button className='search-button' type='button' onClick={()=>{searchKeyWord()}}>搜尋</button> 
          </div>
          {keyWordResult.length === 0 ? 
          <div className='keyword-result-display'>
          {movieTitles?.map((title)=>(
              <div key = {title}>{title}</div>
          ))}
          </div>:
          <div className='keyword-result-display'>
          {keyWordResult?.map((title)=>(
              <div>{title}</div>
          ))}
          </div>
          }
        </div>
      </div>
    )
}

export default Movies