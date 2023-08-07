import { useState } from "react";
import { Button } from "@material-tailwind/react";
import supabase from "../supabaseClient.js";

export default function FavCard({ favourites, onRemove }) {
  const [isFavourite, setIsFavourite] = useState(!!favourites);

  const handleRemove = async () => {
    try {
      // Remove the episode from Supabase using the episode_id
      await supabase
        .from("favorites")
        .delete()
        .eq("episode_title", favourites.episode_title);

      setIsFavourite(false);
    } catch (error) {
      console.error("Error removing episode from favorites:", error);
    }
  };

  return (
    <div className="flex flex-row w-[80vw] mx-auto gap-8 p-8 shadow-md ">
      <img
        className="h-20 w-16 sm:h-[20vh] sm:w-[12vw]"
        src={favourites.season_image}
        alt={favourites.episode_title}
      />
      <div className="my-0 ">
        <p className="font-bold text-sm">Episode {favourites.episode_number}</p>
        <h4 className="font-bold text-lg">{favourites.episode_title}</h4>

        <p className="text-sm text-gray-500">Added: {favourites.time}</p>
        {isFavourite && (
          <Button
            onClick={handleRemove}
            color="red"
            size="sm"
            ripple="light"
            className="mt-2 bg-bodyRed"
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
