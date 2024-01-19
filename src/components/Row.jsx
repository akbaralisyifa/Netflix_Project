import axios from 'axios';
import Movie from './organism/Movie';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export default function Row(props) {
  const { title, fetchURL, rowID } = props;

  const [movies, setMovies] = useState([]);
  // const [scrollCustom, setScrollCustom] = useState(0);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  // const handleScroll = (e) => {
  //   setScrollCustom(e.target.scrollLeft);
  // };

  const slideLeft = () => {
    let slider = document.getElementById(`slider ${rowID}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById(`slider ${rowID}`);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft onClick={slideLeft} className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition duration-300 left-3" size={40} />
        <div id={`slider ${rowID}`} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
        <MdChevronRight onClick={slideRight} className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition duration-300  right-2" size={40} />
      </div>
    </>
  );
}
