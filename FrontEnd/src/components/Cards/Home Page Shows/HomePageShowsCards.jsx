
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HomePageShowsCards() {

    const [ShowsData, setShowsData] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        HomePageShowsCards()
    }, [page])



    async function HomePageShowsCards() {


        try {

            const ShowsCardsData = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/HomePageShowsCard?page=${page}&limit=10`
            );
            // console.log("hi");
            // console.log(AnimeCardsData.data.data);
            setShowsData((prev) => [...prev, ...ShowsCardsData.data.data])

        } catch (error) {
            console.log(error.message);
        }


    }



    return (
        <>

            <section>

                <div className="card-container">

                    {
                        ShowsData.map((item) => (

                            <div className="movie-card" key={item._id}>

                                <img src={item.image} alt={item.title} className="card-image" />

                                <div className="card-content">

                                    <h3>{item.title}</h3>

                                    <div className="card-info">
                                        <span>⭐ {item.rating}</span>
                                        <span>{item.year}</span>
                                    </div>

                                    <p>{item.genre}</p>

                                </div>

                            </div>

                        ))
                    }

                </div>
            </section>


            <div className="load-more-container">
                <button
                    className="load-more-btn"
                    onClick={() => setPage(page + 1)}
                >
                    Show More
                </button>
            </div>

        </>
    )
}

export default HomePageShowsCards