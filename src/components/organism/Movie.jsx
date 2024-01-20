import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

export default function Movie(props) {
  const { movie } = props;
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);
  console.log(movieID);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
      alert('Saved!');
    } else {
      alert('Please log-in to save a movie');
    }
  };

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img className="w-full h-auto block" src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`} alt={movie.title} />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100  text-white transition duration-300">
          <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">{movie.title}</p>
          <p onClick={saveShow} className="absolute text-gray-300 top-4 left-4">
            {like ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </p>
        </div>
      </div>
    </>
  );
}
