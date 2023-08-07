import { useState } from 'react';
import { Navbar, Typography } from "@material-tailwind/react";
import  supabase from '../supabaseClient'
import { Link } from 'react-router-dom';

export default function NavbarTop({session}) {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};


	return (
		<Navbar className="w-[100vw] overflow-x-hidden px-10 py-0 text-black rounded-none">
			<div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900 ">
				<Typography
					as="a"
					href="#"
					variant="h6"
					className="py-1.5 text-2xl text-darkBlue font-bold"
				>
					Podcastr
				</Typography>
				<div className={`flex justify-center items-center gap-10 font-semibold cursor-pointer md:flex ${menuOpen ? 'flex-col-reverse' : 'hidden'}`}>

					<Typography variant="paragraph" className='hover:text-lightBlue'>
					<Link to={"/"} session={session} >Discover</Link>
					</Typography>
					<Typography variant="paragraph" className='hover:text-lightBlue'>
					<Link to={"/favorites"} session={session} >Favourites</Link>
					</Typography>
                    <Typography 
                    onClick={() => supabase.auth.signOut()}
                    variant="paragraph" 
                    className='hover:text-lightBlue text-red-800'>
						Sign Out
					</Typography>
				</div>
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-darkBlue"
					>
						{menuOpen ? 'Close' : 'Menu'}
					</button>
				</div>
			</div>
		</Navbar>
	);
}