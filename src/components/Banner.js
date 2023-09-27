import React, { useEffect, useState } from "react";
import requests from "./Request";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Banner.css";

function Banner() {
	let oneVideo;
	const mainUrl =
		"https://api.themoviedb.org/3" + requests.fetchNetflixOriginals;

	let [video, setVideo] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");
	useEffect(() => {
		fetch(mainUrl)
			.then((response) => response.json())
			.then((data) => {
				setVideo(data.results);
			});
	}, []);

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	if (video.length !== 0) {
		oneVideo = video[Math.floor(Math.random() * video.length)];
	}

	function playButton() {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(oneVideo?.original_name || oneVideo?.title)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get("v"));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	function overviewFun(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<>
			{
					<div
						style={{
							backgroundSize: "cover",
							backgroundImage: `url("https://image.tmdb.org/t/p/original/${oneVideo?.backdrop_path}")`,
							backgroundPosition: "center center",
						}}
					>
						
						<div className="banner__contents">
							<h1 className="banner__title title">
								{oneVideo?.title || oneVideo?.name || oneVideo?.original_name}
							</h1>
							<div className="banner__buttons">
								<button onClick={playButton} className="banner__button ">
									Play
								</button>
								<button className="banner__button ">My List</button>
							</div>
							<h1 className="banner__description title">
								{overviewFun(oneVideo?.overview, 150)}
							</h1>
						</div>
						<div className="banner__fadeBottom" />
					</div>
			}

			{
				<div className="row__youtube">
					{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
				</div>
			}
		</>
	);
}

export default Banner;
