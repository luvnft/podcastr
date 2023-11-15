import { useState, useEffect } from "react";
import { PreviewCard, SortButtons, NavbarTop } from "../components";
import { Input } from "@material-tailwind/react";
import Fuse from "fuse.js";
import { PulseLoader } from "react-spinners";
import "../../src/index.css";

export default function Discover({ session }) {
  const [data, setData] = useState([]); // State to store the podcast data
  const [isLoading, setIsLoading] = useState(true); // State to store the loading status
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Fetch data from the podcast API
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
        setIsLoading(false); // Data fetching completed
      })
      .catch((error) => {
        // Data fetching completed with an error
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PulseLoader color="#1E3A8A" size={15} margin={2} />
      </div>
    );
  }

  if (!data.length) {
    return <h1>No podcasts found</h1>;
  }

  const handleSort = (sortType) => {
    setSortBy(sortType);
    // sorting logic
    const sortedData = [...data];
    if (sortType === "A-Z") {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "Z-A") {
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortType === "Newest") {
      sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortType === "Oldest") {
      sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    }
    setData(sortedData);
  };

  const fuse = new Fuse(data, {
    keys: ["title"],
    includeScore: true,
  });

  const results = fuse.search(query);
  const podcastResults = query ? results.map((result) => result.item) : data;

  function handleSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setQuery(value);
  }

  return (
    <div>
      <NavbarTop />
      <div className="flex flex-col mt-4 gap-4 md:flex-row md:justify-between p-3 z-1000 ">
        <h1 className="text-slate-600 font-bold text-3xl m-left-20">
          Discover
        </h1>
        <div className="relative flex gap-4 w-full md:w-auto ">
          <Input
            type="search"
            onChange={handleSearch}
            placeholder="Search Here"
            className="min-w-[288px] h-[1.5rem] bg-gray-100 rounded-md p-4 outline-none outline-yellow-400"
          />
        </div>
        <SortButtons onSort={handleSort} />
      </div>
      <div className="pt-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {podcastResults.map((preview, i) => (
            <PreviewCard
              key={preview.id}
              preview={preview}
              i={i}
              session={session}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
