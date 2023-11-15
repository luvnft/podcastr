import { useParams } from "react-router-dom";
import { SeasonPreview } from "../components/index.js";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { NavbarTop } from "../components";

export default function PodcastInfo({ session }) {
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `https://podcast-api.netlify.app/id/${id}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDetailsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PulseLoader color="#1E3A8A" size={15} margin={2} />
      </div>
    );
  }

  return (
    <>
      <NavbarTop />
      <div className="bg-lightBlue">
        <Card className="flex-col lg:flex-row w-full max-w-[screen] p-4 bg-lightBlue">
          <div className="lg:w-[26vw] lg:h-[54vh]">
            <CardHeader
              shadow={false}
              floated={false}
              className="w-full h-full"
            >
              <img
                src={detailsData.image}
                alt={detailsData.title}
                className="w-full h-full object-cover"
              />
            </CardHeader>
          </div>
          <div className="lg:flex-1 lg:ml-4">
            <CardBody className="p-6">
              <Typography className="mb-2 text-black text-3xl font-semibold">
                {detailsData.title}
              </Typography>
              <Typography
                variant="h6"
                color="blue"
                className="uppercase mb-4 bg-white w-[8rem] px-2"
              >
                {detailsData.seasons.length} Seasons
              </Typography>
              <Typography variant="h6" className="mb-4 text-slate-700">
                {detailsData.genres.length > 0 && (
                  <div>
                    {detailsData.genres
                      .filter((genre) => genre !== "All") // Exclude 'All' from the array
                      .map((genre, index) => (
                        <span
                          key={index}
                          className="bg-lightGreen mr-2 px-2 py-1 rounded"
                        >
                          {genre}
                        </span>
                      ))}
                  </div>
                )}
              </Typography>
              <Typography className="font-normal mb-8 text-slate-800">
                {detailsData.description}
              </Typography>
            </CardBody>
          </div>
        </Card>
      </div>
      <SeasonPreview detailsData={detailsData} />
    </>
  );
}
