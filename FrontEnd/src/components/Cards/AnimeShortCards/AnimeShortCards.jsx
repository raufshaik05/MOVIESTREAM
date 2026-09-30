
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function AnimeShortCards() {

//     const [AnimeShortCardsData, setAnimeShortCardsData] = useState([])

//     useEffect(() => {
//         AnimeShortCardsApi()
//     }, [])


//     async function AnimeShortCardsApi() {

//         try {

//             const AnimeCardsData = await axios.get("http://localhost:8080/api/AnimeShortCards")
//             setAnimeShortCardsData(AnimeCardsData.data.data)
//         } catch (Error) {
//             console.log(Error.message);

//         }
//     }


//     return (
//         <>

//             <section className="trending-section">

//                 <div className="section-header">

//                     <h2>🔥 Trending Web Series</h2>

//                     <button className="see-all">
//                         See All →
//                     </button>

//                 </div>


//                 <div className="series-row">

//                     {
//                         AnimeShortCardsData.map((series) => (

//                             <div className="series-card" key={series._id}>

//                                 <img
//                                     src={series.image}
//                                     alt={series.title}
//                                 />

//                                 <div className="series-info">

//                                     <h3>{series.title}</h3>

//                                     <p>
//                                         ⭐ {series.rating}
//                                         &nbsp; • &nbsp;
//                                         {series.year}
//                                     </p>

//                                     <span>
//                                         {series.genre}
//                                     </span>

//                                 </div>

//                                 <button className="play-btn">
//                                     ▶
//                                 </button>

//                             </div>

//                         ))
//                     }

//                 </div>

//             </section>



//         </>
//     )
// }

// export default AnimeShortCards




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AnimeShortCards() {

    const [AnimeShortCardsData, setAnimeShortCardsData] = useState([]);

    const navigate = useNavigate();


    // =========================================
    // GET ANIME DATA
    // =========================================

    useEffect(() => {

        AnimeShortCardsApi();

    }, []);


    async function AnimeShortCardsApi() {

        try {

            const AnimeCardsData = await axios.get(
                "http://localhost:8080/api/newMoviePostData?type=anime"
            );


            console.log(
                "Anime Data:",
                AnimeCardsData.data.data
            );


            setAnimeShortCardsData(
                AnimeCardsData.data.data
            );


        } catch (error) {

            console.log(
                "Anime API Error:",
                error.response?.data || error.message
            );

        }

    }


    return (

        <section className="trending-section">

            <div className="section-header">

                <h2>🔥 Trending Anime</h2>

                <button className="see-all">
                    See All →
                </button>

            </div>


            <div className="series-row">

                {
                    AnimeShortCardsData.map((anime) => (

                        <div
                            className="series-card"
                            key={anime._id}

                            onClick={() =>
                                navigate(
                                    `/content/anime/${anime._id}`
                                )
                            }
                        >

                            <img
                                src={anime.image}
                                alt={anime.title}
                            />


                            <div className="series-info">

                                <h3>
                                    {anime.title}
                                </h3>


                                <p>

                                    ⭐ {anime.rating}

                                    &nbsp; • &nbsp;

                                    {anime.year}

                                </p>


                                <span>

                                    {
                                        Array.isArray(anime.genre)
                                            ? anime.genre.join(", ")
                                            : anime.genre
                                    }

                                </span>

                            </div>


                            <button
                                className="play-btn"

                                onClick={(e) => {

                                    e.stopPropagation();

                                    navigate(
                                        `/content/anime/${anime._id}`
                                    );

                                }}
                            >
                                ▶
                            </button>


                        </div>

                    ))
                }

            </div>

        </section>

    );

}

export default AnimeShortCards;