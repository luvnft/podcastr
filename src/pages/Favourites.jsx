import supabase from "../supabaseClient.js";
import { useEffect, useState } from "react";
import { FavCard } from "../components/index.js";
import { SortButtons, NavbarTop } from "../components/index.js";
import { RWebShare } from "react-web-share";
import AiOutlineShareAlt from "@meronex/icons/ai/AiOutlineShareAlt";

export default function Favourites({ session }) {
  const [favourites, setFavourites] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("");

  console.log(session.user.id);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const user_id = session.user.id;

        const { data, error } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", user_id);

        if (error) {
          setFetchError(error.message);
          console.log("Error fetching favourites data:", error);
          return;
        } else {
          setDataLoaded(true);
          setFavourites(data || []); // Set the array directly
        }
      } catch (error) {
        console.error("Error fetching favourites data:", error);
      }
    };

    fetchFavourites();
  }, []);

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sortedData = [...favourites];

    if (sortType === "A-Z") {
      sortedData.sort((a, b) => a.episode_title.localeCompare(b.episode_title));
    } else if (sortType === "Z-A") {
      sortedData.sort((a, b) => b.episode_title.localeCompare(a.episode_title));
    } else if (sortType === "Newest") {
      sortedData.sort((a, b) => new Date(b.time) - new Date(a.time));
    } else if (sortType === "Oldest") {
      sortedData.sort((a, b) => new Date(a.time) - new Date(b.time));
    }

    setFavourites(sortedData);
  };

  const handleEpisodeRemove = (episodeId) => {
    // Remove the episode from the list
    const updatedFavourites = favourites.filter(
      (episode) => episode.episode_id !== episodeId
    );

    // Update the state to reflect the removed episode
    setFavourites(updatedFavourites);
  };

  return (
    <>
      <NavbarTop />
      <div className="p-4">
        <div className="flex justify-between gap-10 items-center w-[87vw] md:flex-row flex-col mt-4 mb-4">
          <h1 className="text-slate-600 font-bold text-3xl m-left-20">
            Favourites
          </h1>
          <SortButtons onSort={handleSort} />
        </div>

        <RWebShare
          data={{
            text: "Web Share - GfG",
            url: "https://ksm-podcastr.netlify.app/favourites",
            title: "Link to favourites",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <AiOutlineShareAlt className="text-3xl mb-5 text-slate-600 cursor-pointer" />
        </RWebShare>

        {!dataLoaded && <div>Loading...</div>}
        {fetchError && <div>{fetchError}</div>}

        {/* Check if favorites array is empty */}
        {favourites.length === 0 && dataLoaded && !fetchError && (
          <div>No episodes added to favourites yet!</div>
        )}

        {/* Display favorite cards if the array is not empty */}
        {favourites.length > 0 &&
          Object.keys(favourites).map((key) => {
            return (
              <FavCard
                key={key}
                favourites={favourites[key]}
                onRemove={handleEpisodeRemove}
              />
            );
          })}
      </div>
    </>
  );
}
