import { useState, useEffect } from 'react';
import { PreviewCard, SortButtons, NavbarTop } from '../components';
import {Input} from "@material-tailwind/react";
import Fuse from 'fuse.js'
import '../../src/index.css'

export default function Discover() {

    const [data, setData] = useState([]); // State to store the podcast data
    const [isLoading, setIsLoading] = useState(true); // State to store the loading status
    const [sortBy, setSortBy] = useState(''); // State to store the current sorting option
    const [query, setQuery] = useState('')


    useEffect(() => {
        // Fetch data from the podcast API
        fetch('https://podcast-api.netlify.app/shows')
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData);
                setIsLoading(false); // Data fetching completed
            })
            .catch((error) => {
                // Data fetching completed with an error
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <h1>Loading</h1>;
    }

    if (!data.length) {
        return <h1>No podcasts found</h1>;
    }

    const handleSort = (sortType) => {
        setSortBy(sortType);
        // Implement your sorting logic here based on the 'sortType' value
        // For this example, assuming 'name' is the property to sort by
        const sortedData = [...data];
        if (sortType === 'A-Z') {
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortType === 'Z-A') {
            sortedData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortType === 'Newest') {
            sortedData.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        } else if (sortType === 'Oldest') {
            sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        }
        setData(sortedData);
    };

    const fuse = new Fuse(data, {
        keys: [
            'title',
        ],
        includeScore: true
    })

    const results = fuse.search(query)
    const podcastResults = query ? results.map(result => result.item) : data

    function handleSearch({ currentTarget = {}}) {
        const { value } = currentTarget;
        setQuery(value)

    }

    return (
        <>
        <NavbarTop />
            <div className='flex flex-col w-[90vw] p-3'>
                <div className='flex justify-between gap-10 items-center w-[87vw] md:flex-row flex-col mt-4 mb-4'>
                    <h1 className='text-slate-600 font-bold text-3xl m-left-20'>Discover</h1>
                    <div className="relative flex gap-4 w-full md:w-auto ">
                        <Input
                            type="search"
                            onChange={handleSearch}
                            placeholder='Search Here'
                            className="min-w-[288px] h-[2rem] bg-gray-100 rounded-sm p-4 outline-none outline-yellow-400"
                        />
                    </div>
                    <SortButtons onSort={handleSort} />
                </div>
                <div className='flex justify-center'>
                    <div className='flex flex-wrap mx-4 sm:justify-start justify-center gap-10'>
                        {podcastResults.map((preview, i) => (
                            <PreviewCard key={preview.id} preview={preview} i={i} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
