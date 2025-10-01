// Import all movie images
import digitalDreams from '@/assets/latest/movies/Digital Dreams.jpg';
import criminalJustice from '@/assets/latest/movies/Criminal Justice.jpg';
import bloodyDaddy from '@/assets/latest/movies/Bloody Daddy.jpg';
import raid from '@/assets/latest/movies/Raid.jpg';

// Map movie titles to their corresponding image imports
const movieImages: Record<string, string> = {
  'Digital Dreams': digitalDreams,
  'Criminal Justice': criminalJustice,
  'Bloody Daddy': bloodyDaddy,
  'Raid': raid,
};

export const getMovieImage = (title: string): string => {
  return movieImages[title] || '';
};

export default getMovieImage;
