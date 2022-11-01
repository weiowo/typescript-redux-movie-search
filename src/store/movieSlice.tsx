import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface MovieState {
//     director: string[];
//     id: number[];
//     poster: string[];
//     rating: string[];
//     runtime: number[];
//     title: string[];
//     year: number[];
// }

//   const initialState : MovieState = {
//     director: [],
//     id: [],
//     poster: [],
//     rating: [],
//     runtime: [],
//     title: [],
//     year: []
//   } 

export interface Movie{
    director: string;
    id:number;
    poster: string;
    rating: string;
    runtime: number;
    title: string;
    year: number;   
  }

const initialState = [] as Movie[]

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies:(state, action: PayloadAction<Movie[]>)=>{
            return action.payload;
        },
    }
})

export const { setMovies } = movieSlice.actions
export default movieSlice.reducer

// 整個movieSlice就是關於movie的資料的狀態，你在裡面去定義可以用哪些方法去操作這些資料，以及他們現在的狀態