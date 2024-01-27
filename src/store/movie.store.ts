import { defineStore } from "pinia";
import { EGenre, EType, EMovieGetters } from "../enums/store/movie.enum";
import { IMovieState } from "../interfaces/movie.interface";
export const useMovieStore = defineStore("movie", {
  state: (): IMovieState => ({
    movies: [
      {
        name: "Arcane",
        imageUrl:
          "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt8739d07baed7d77d/5ed9b1c197379739c07664d9/Arcane_Announcement_Banner.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2021",
        seasons: 1,
        rating: "9.0",
        genre: EGenre.Action,
        duration: "40",
        type: EType.TVseries,
        featured: true,
      },
      {
        name: "Alice in Borderland",
        imageUrl:
          "https://thekeegshow.com/wp-content/uploads/2022/12/Alice-in-Borderland_poster_2.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2020",
        seasons: 2,
        rating: "8.2",
        genre: EGenre.Thriller,
        duration: "50",
        type: EType.TVseries,
        featured: true,
      },
      {
        name: "Your Name",
        imageUrl: "https://wallpaperaccess.com/full/130467.png",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2016",
        seasons: 1,
        rating: "8.4",
        genre: EGenre.Romance,
        duration: "106",
        type: EType.TVseries,
        featured: true,
      },
      {
        name: "Weathering with you",
        imageUrl:
          "https://miro.medium.com/v2/resize:fit:3840/format:webp/1*3UfsMUAyT9jDQqnSP6aprQ.png",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2016",
        seasons: 1,
        rating: "8.4",
        genre: EGenre.Romance,
        duration: "106",
        type: EType.Movie,
        featured: false,
      },
      {
        name: "Suzume",
        imageUrl:
          "https://pic-bstarstatic.akamaized.net/ugc/83c8985f73c7a04a111c5fbafbe689f9.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2016",
        seasons: 1,
        rating: "8.4",
        genre: EGenre.Romance,
        duration: "106",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "The lord of the rings",
        imageUrl:
          "https://image.tmdb.org/t/p/original/uexxR7Kw1qYbZk0RYaF9Rx5ykbj.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2016",
        seasons: 1,
        rating: "8.4",
        genre: EGenre.Romance,
        duration: "106",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "The Shawshank Redemption",
        imageUrl:
          "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1994",
        rating: "9.3",
        genre: EGenre.Drama,
        duration: "142",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "Pulp Fiction",
        imageUrl:
          "https://www.themoviedb.org/t/p/original/pbWgQPC6l9pkpEpi3WNRSfWYNP6.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1994",
        rating: "8.9",
        genre: EGenre.Crime,
        duration: "154",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "Forrest Gump",
        imageUrl:
          "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15829_v_h8_aa.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1994",
        rating: "8.8",
        genre: EGenre.Drama,
        duration: "142",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "The Matrix",
        imageUrl:
          "https://www.themoviedb.org/t/p/original/avHyolEHCvVgDEWaBzDODwc9tfr.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1999",
        rating: "8.7",
        genre: EGenre.Action,
        duration: "136",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "The Godfather",
        imageUrl:
          "https://tse4.mm.bing.net/th?id=OIP.M5fcFM2ZSBv_dWD_IwthSwHaEK&pid=Api&P=0&h=220",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1972",
        rating: "9.2",
        genre: EGenre.Crime,
        duration: "175",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "Schindler's List",
        imageUrl:
          "https://2.bp.blogspot.com/-fVsmERCejW8/VmobaI8M2XI/AAAAAAAAcP0/YdaVJ0ZaCZw/s1600/schindlers_list_pic02.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1993",
        rating: "8.9",
        genre: EGenre.Biography,
        duration: "195",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "Fight Club",
        imageUrl:
          "http://3.bp.blogspot.com/_3N0VetpYvQE/S9jg0AGYwyI/AAAAAAAACz8/OP6C90Or-5s/s1600/Fight_Club_3.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1999",
        rating: "8.8",
        genre: EGenre.Drama,
        duration: "139",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "The Silence of the Lambs",
        imageUrl:
          "https://miro.medium.com/max/1400/1*3uzTwlRxAOWSBCvAuup6oA@2x.jpeg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "1991",
        rating: "8.6",
        genre: EGenre.Thriller,
        duration: "118",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "Inception",
        imageUrl: "https://flxt.tmsimg.com/assets/p7825626_p_v8_af.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2010",
        rating: "8.8",
        genre: EGenre.SciFi,
        duration: "148",
        type: EType.Movie,
        featured: true,
      },
      {
        name: "The Dark Knight",
        imageUrl:
          "https://www.hdwallpaper.nu/wp-content/uploads/2015/10/The_Dark_Knight_wallpaper_021.jpg",
        loadVideo: () => import("../assets/videos/cute_cat.mp4"),
        releaseDate: "2008",
        rating: "9.0",
        genre: EGenre.Action,
        duration: "152",
        type: EType.Movie,
        featured: true,
      },
    ],
  }),
  getters: {
    [EMovieGetters.getAllMovies]: (
      state: IMovieState
    ): IMovieState["movies"] => {
      return state.movies;
    },

    [EMovieGetters.getMoviesByGenre]: (state: IMovieState) => {
      return (genre: EGenre) =>
        state.movies.filter((movie: any) => movie.genre === genre);
    },
    [EMovieGetters.getMoviesByType]: (state: IMovieState) => {
      return (type: EType) =>
        state.movies.filter((movie: any) => movie.type === type);
    },
    [EMovieGetters.getFeaturedMovies]: (state: IMovieState) => {
      return state.movies.filter((movie: any) => movie.featured === true);
    },
  },
});
