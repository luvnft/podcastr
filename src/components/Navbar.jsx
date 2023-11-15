import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

export default function NavbarTop({ session }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        variant="paragraph"
        className="flex items-center hover:text-lightBlue"
      >
        <Link to={"/"} session={session}>
          Discover
        </Link>
      </Typography>
      <Typography>
        <Link
          to={"/favorites"}
          session={session}
          className="flex items-center hover:text-lightBlue"
        >
          Favourites
        </Link>
      </Typography>
    </ul>
  );

  const mobileNavList = (
    <div>
      {navList}
      <Button
        onClick={() => {
          supabase.auth.signOut();
          setOpenNav(false); // Close the mobile navigation after signing out
        }}
        variant="gradient"
        size="sm"
        className="bg-bodyRed"
      >
        <span>Sign Out</span>
      </Button>
    </div>
  );

  return (
    <Navbar className="mx-auto w-[100vw] py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="py-1.5 text-2xl text-darkBlue font-bold"
        >
          <Link to={"/"} session={session}>
            Podcastr
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          onClick={() => {
            supabase.auth.signOut();
            setOpenNav(false);
          }}
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block bg-bodyRed"
        >
          <span>Sign Out</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">{mobileNavList}</div>
      </MobileNav>
    </Navbar>
  );
}
