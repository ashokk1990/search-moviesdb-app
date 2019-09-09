import debounce from "../utils"
import React, {useState} from 'react';
import Header from './header'
import './App.css';
import MovieRow from "../components/MovieRow";
import Api from "../api/movieDB"
import config from "../config"

const App = () => {

    const [data, setData] = useState({movies: [], total_pages: 0, initial_load: true, page: 1})

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e) => {
        if (e.target.value === "") {
            setData({movies: [], initial_load: true})
        } else {
            performSearch(searchTerm)
        }
        setSearchTerm(e.target.value)
    }

    const performSearch = debounce(async (term, page = 1) => {
        try {
            const response = await Api.get('/search/movie', {
                params: {
                    api_key: config.movieDB_api_key,
                    include_adult: false,
                    language: "en-US",
                    query: term,
                    page: page
                }
            })
            setData({
                movies: response.data.results,
                total_pages: response.data.total_pages,
                initial_load: false,
                page: page
            })
        } catch (e) {
            console.log(e)
        }
    },250)

    const handleClick = (e, page) => {
        performSearch(searchTerm, page)
    }

    return (
        <div className="App">
            <Header />
            <input
                className="search-bar"
                placeholder="Search here..."
                onKeyUp={e => handleSearch(e)}
            />

            {searchTerm && (
                <div>
                    <div className="movie-list">
                        {data.movies.length > 0 || data.initial_load ? (
                            data.movies.map(movie => {
                                const imageUrl = `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${
                                    movie.poster_path
                                    }`;
                                return (
                                    <MovieRow imageUrl={imageUrl} key={movie.id} movie={movie} />
                                );
                            })
                        ) : (
                            <h4> Sorry! No Data Found on Server for {`"${searchTerm}"`}</h4>
                        )}
                    </div>
                    {data.movies.length > 0 ? (
                        <div>
                            <input
                                disabled={data.page === 1}
                                className="movie-button"
                                type="button"
                                value="prev"
                                id="prev"
                                onClick={e => handleClick(e, data.page - 1)}
                            />
                            <input
                                disabled={data.page === data.total_pages}
                                className="movie-button"
                                type="button"
                                value="next"
                                id="next"
                                onClick={e => handleClick(e, data.page + 1)}
                            />
                        </div>
                    ) : (
                        <div />
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
