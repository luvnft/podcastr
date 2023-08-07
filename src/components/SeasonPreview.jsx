import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function SeasonPreview({ detailsData }) {

	if (!detailsData || !detailsData.seasons) {
		return "No details available, try again";
	}

	function viewDetails() {
	}

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{detailsData.seasons.map((season) => (
					<Card key={season.season} className="shadow-md mt-8">
						<CardBody>
							<img src={season.image} alt={`Season ${season.season}`} />
							<Typography variant="h5" color="blue-gray" className="mt-2 text-lg">
								{season.title}
							</Typography>
							<h3>{season.description}</h3>
						</CardBody>
						<CardFooter className="flex gap-2 pt-0 ">
							<Button
								onClick={viewDetails}
								size="sm"
								variant="text"
								className="bg-slate-200 h-[2.3rem] text-center cursor-default mb-2 rounded-sm text-black"
							>
								{season.episodes.length} Episodes
							</Button>
							<Link
								to={`/details/${detailsData.id}/season/${season.season}`}
							>
								<Button
									size="sm"
									variant="text"
									className="bg-sky-400 h-[2.3rem] text-center hover:bg-darkBlue mb-2 rounded-sm text-gray-300 hover:text-white"
								>
									Explore
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</>
	);
}