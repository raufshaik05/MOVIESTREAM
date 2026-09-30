
import React from 'react'
import "./home.css"
import Navbar from "../../components/Navbar/Navbar.jsx"
import Card from '../../components/Cards/Card.jsx'
import jokerImage from "../../assets/Home_big_image.jpg"
import Maincarousel from "../../components/MainCarousels/MainCarousel.jsx"
import MainMovies from '../../components/Cards/MainMoviesCards/MainMovies.jsx'
import HomePageWebseries from '../../components/Cards/Home page web series/HomePageWebseries.jsx'
import HomePageAnime from '../../components/Cards/HomePageAnime/HomePageAnime.jsx'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer.jsx'
// import HomePageShowsCards from '../../components/Cards/Home Page Shows/HomePageShowsCards.jsx'

function Home() {
    return (
        <>
            <Navbar />

            <Maincarousel />

            <Card />


            <div className="home-content-buttons">

                <Link
                    to="/movies"
                    className="home-content-btn"
                >
                    Movies
                </Link>


                <Link
                    to="/webseries"
                    className="home-content-btn"
                >
                    Web Series
                </Link>


                <Link
                    to="/anime"
                    className="home-content-btn"
                >
                    Anime
                </Link>

            </div>




            <div className="section-header">
                <h1 className="headings">Movies</h1>
                <button className="see-all">
                    See All →
                </button>
            </div>

            <MainMovies />

            <h1 className="headings">
                Web Series
            </h1>

            <HomePageWebseries />

            <h1 className="headings">
                Anime
            </h1>

            <HomePageAnime />
            {/* 
            <h1 className="headings">
                Top Reality Shows
            </h1> */}


            <Footer />

        </>
    );
}

export default Home