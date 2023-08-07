import { useState } from 'react';

export default function FavCard({ favourites }) {
	const [isFavourite, setIsFavourite] = useState(!!favourites);

	return (
		<div className="flex flex-row w-[80vw] mx-auto gap-8 p-8 shadow-md">
			<img className="h-20 w-16 sm:h-[20vh] sm:w-[12vw]" src={favourites.season_image} alt={favourites.episode_title} />
			<div className='my-0'>
            <p className="font-bold text-sm">Episode {favourites.episode_number}</p>
				<h4 className="font-bold text-lg">{favourites.episode_title}</h4>
                
				<p className="text-sm text-gray-500">Added: {favourites.time}</p>
			</div>

		</div>
	);
}