import React, { useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

export default function SavedShows() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    let slider = document.getElementById(`slider ${rowID}`);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById(`slider ${rowID}`);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((movie) => movie.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">
        My Shows<span className="text-gray-300 text-base font-light"> - Double click to delete</span>
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft onClick={slideLeft} className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition duration-300 left-3" size={40} />
        <div id={`slider`} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies.map((movie) => (
            <div onDoubleClick={() => deleteShow(movie.id)} key={movie.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${movie?.img}`} alt={movie.title} />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100  text-white transition duration-300">
                <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">{movie.title}</p>
                {/* <p onClick={() => deleteShow(movie.id)} className="absolute text-gray-300 top-4 right-5 hover:bg-gray-500 hover:text-gray-300 px-2 rounded transition duration-300">X</p> */}
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight onClick={slideRight} className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block transition duration-300  right-2" size={40} />
      </div>
    </>
  );
}
