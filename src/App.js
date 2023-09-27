import React from "react";
import Main from "./components/Main";
import Banner from "./components/Banner";
import requests from "./components/Request";
import "./App.css";
import Nav from "./components/Nav";


function App() {
	return (
		<div>
			<Nav />
			<Banner />
			<Main
				title="NETFLIX ORIGINALS"
				fetchUrl={requests.fetchNetflixOriginals}
				isOriginal="A"
			/>
			<Main title="Trending Now" fetchUrl={requests.fetchTrending} />
			<Main title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
			<Main title="Action Movies" fetchUrl={requests.fetchActionMovies} />
			<Main title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
			<Main title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
			<Main title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
		</div>
	);
}

export default App;
