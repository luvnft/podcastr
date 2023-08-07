import { useEffect, useState } from 'react';
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { useParams } from 'react-router-dom';

export default function Episodes() {
	const [detailsData, setDetailsData] = useState(null);
	const { id, seasonNumber } = useParams();

	useEffect(() => {
		const apiUrl = `https://podcast-api.netlify.app/id/${id}`;

		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				setDetailsData(data);
			})
			.catch((err) => console.log(err));
	}, [id]);

	if (detailsData === null) {
		return <div>Loading...</div>;
	}

	const curSeasonEps = detailsData.seasons[seasonNumber - 1].episodes;
	const seasonPic = detailsData.seasons[seasonNumber - 1].image;


	return (
		<div className="p-4">
			<Typography
				variant={"h2"}
				color="blue-gray"
				className="text-center m-4 font-bold sm:text-3xl md:text-4xl lg:text-5xl text-slate-600"
			>
				{detailsData.title}
			</Typography>

			<div className="flex justify-center">
				<img
					src={seasonPic}
					alt={detailsData.title}
					className="w-30 h-20 object-cover"
				/>
			</div>
			<Typography
				variant={"h4"}
				color="blue-gray"
				className="text-center mb-4 font-bold sm:text-xl md:text-2xl lg:text-3xl text-slate-400"
			>
				Season {seasonNumber}
			</Typography>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{curSeasonEps.map((episode, index) => (
					<Card
						key={index}
						color="white"
						shadow={false}
						className="px-4 opacity-[0.9] max-w-[40rem] shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
					>
						<CardHeader
							color="transparent"
							floated={false}
							shadow={false}
							className="mx-0 flex items-center gap-4 pt-0 pb-8"
						>
							<div className="flex w-full flex-col gap-0.5">
								<div className="flex items-center justify-between">
									<Typography variant="h5" color="blue-gray">
										Episode {episode.episode}: {episode.title}
									</Typography>
								</div>
								<Typography variant="paragraph" color="inherit" className="truncate h-[10vh]">
									{episode.description}
								</Typography>
								<div className="flex items-center gap-5 mt-1 text-center">
									<Button className="bg-yellow-500 hover:text-white w-40 p-2">
                                        Add Favourite
									</Button>
								</div>
							</div>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}