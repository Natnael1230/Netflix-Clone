import React, {useEffect, useState} from 'react';
import "./Main.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Main({title, fetchUrl, isOriginal}) {
    
let moviesImg="https://image.tmdb.org/t/p/original/";

    let [videos,setVideos]=useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");

    const mainUrl = "https://api.themoviedb.org/3"+fetchUrl;
	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		}}
    useEffect(() => {
			fetch(mainUrl)
				.then((response) => response.json())
				.then((data) => {
					setVideos(data.results);
				})
				.catch((error=>{
			    console.log(error);
			}))
		}, [fetchUrl]);
		
    // console.log(videos);
    
    let originalId;
    if (isOriginal) originalId = "originalWrapper";
    
	const alert = (movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
				movieTrailer(movie?.original_name || movie?.title)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) =>{
					console.log(error);
				}) 
		}
	};

  return (
		<div>
			<h1 className="title">{title}</h1>
			<div className="mainDiv">
				{videos.map((singleVideo) => {
					let theMovie = (
						<img
							onClick={() => alert(singleVideo)}
							className="poster"
							id={originalId}
							src={`${moviesImg}${
								isOriginal ? singleVideo.poster_path : singleVideo.backdrop_path
							}`}
							alt="#"
						/>
					);
					return theMovie;
				})}
			</div>
			<div className="row__youtube">
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			</div>
		</div>
	);
}

export default Main;
