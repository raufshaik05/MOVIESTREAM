
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./webSeriesShortCards.css";

function WebSeriesShortCards() {

    const [ShortCardsData, setShortCardsData] = useState([]);

    const navigate = useNavigate();


    // =========================================
    // GET WEB SERIES
    // =========================================

    useEffect(() => {

        ShortCardsAPiData();

    }, []);


    async function ShortCardsAPiData() {

        try {

            const ShortCardsDatainfo = await axios.get(
                "http://localhost:8080/api/newMoviePostData?type=webseries"
            );


            console.log(
                "Web Series Data:",
                ShortCardsDatainfo.data.data
            );


            setShortCardsData(
                ShortCardsDatainfo.data.data
            );


        } catch (error) {

            console.log(
                "Web Series API Error:",
                error.response?.data || error.message
            );

        }

    }


    return (

        <section className="trending-section">


            <div className="section-header">

                <h2>🔥 Trending Web Series</h2>

                <button className="see-all">
                    See All →
                </button>

            </div>


            <div className="series-row">


                {
                    ShortCardsData.map((series) => (

                        <div
                            className="series-card"
                            key={series._id}

                            onClick={() =>
                                navigate(
                                    `/content/webseries/${series._id}`
                                )
                            }
                        >


                            <img
                                src={series.image}
                                alt={series.title}
                            />


                            <div className="series-info">


                                <h3>
                                    {series.title}
                                </h3>


                                <p>

                                    ⭐ {series.rating}

                                    &nbsp; • &nbsp;

                                    {series.year}

                                </p>


                                <span>

                                    {
                                        Array.isArray(series.genre)
                                            ? series.genre.join(", ")
                                            : series.genre
                                    }

                                </span>


                            </div>


                            <button
                                className="play-btn"

                                onClick={(e) => {

                                    e.stopPropagation();

                                    navigate(
                                        `/content/webseries/${series._id}`
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


export default WebSeriesShortCards;