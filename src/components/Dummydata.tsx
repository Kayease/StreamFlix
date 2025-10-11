import { title } from "process";

const DummyWatchlistItems=[
{
    id:1,
    title: "Thunder Strike",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
    genre: "Action",
    rating: "4.8",
    year: "2023",
    description: "Special forces operative takes on a global terrorist organization."
},

{
    id:2,
    title: "Kerala Crime files",
        image: "https://m.media-amazon.com/images/M/MV5BYTQ1NDRlOTgtZTFlMS00YWQyLWJiOTYtNzE4ZmVkYTU5OWJkXkEyXkFqcGc@._V1_.jpg",
        genre: "Crime",
        rating: "4.8",
        year: "2023",
        description: "Corrupt cops face justice in this gritty crime drama."

},

{
    id:3,
    title: "Broken Mirrors",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    genre: "Drama",
    rating: "4.9",
    year: "2023",
    description: "A psychological drama exploring the fragments of human memory."
},

{
    
  
        id: 34,
        title: "Comedy Central",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjfnoKGMT-UbB-2GPBmMtxJtiH3wg8kPJBw&s",
        genre: "Comedy",
        rating: "4.6",
        year: "2024",
        description: "Stand-up comedians compete for the ultimate prize."
      },

      {
        id: 38,
        title: "City of Dreams",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=225&fit=crop",
        genre: "Drama",
        rating: "4.8",
        year: "2023",
        description: "Immigrants chase the American dream in this touching story."
      },
      {
        id: 39,
        title: "The Last Letter",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
        genre: "Drama",
        rating: "4.6",
        year: "2023",
        description: "A wartime romance told through letters never sent."
      },


]

const DummyFavoritesItems=[
    {
        id: 50,
        title: "Asur",
        image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS95tygQP8K7hiIQJx_yGlYGrJBWvfxKvqAVw&s",
        rating: "4.8",
        year: "2023",
        description: "Corrupt cops face justice in this gritty crime drama."
      }, 

      {
        id: 51,
        title: "Drishyam",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Drishyam_2015_film.jpg/250px-Drishyam_2015_film.jpg",
        genre: "Crime",
        rating: "4.8",
        year: "2023",
        description: "Corrupt cops face justice in this gritty crime drama."
      }, 

      {
        id: 62,
        title: "Moana",
        image: "https://snworksceo.imgix.net/cds/f4f2ba30-5e1e-4273-8360-d79a3012d12a.sized-1000x1000.jpg?w=1000&dpr=2",
        genre: "kids",
        rating: "4.8",
        year: "2024",
        description: "A yound women uses her navigational talents to set sail for a fabled island . joining her on the adventure is her hero,the legendary demi-god Maui."
      },
    

];

const DummyHistoryItems=[
    {
        id: 59,
        title: "Boss Baby",
        image: "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/3717/1740399723717-i",
        genre: "kids",
        rating: "4.8",
        year: "2024",
        description: "Boss baby needs backup! the entire templeton clan tackles a villainous plot to turn all babies into spoiled brats."
      },
      {
        id: 60,
        title: "The Good dinosour",
        image: "https://jonnegroni.com/wp-content/uploads/2015/11/arlo_spot_the_good_dinosaur-hd.jpg",
        genre: "Family",
        rating: "3.8",
        year: "2024",
        description: "A yound Apatosaurus named Arlo makes a unlikely human friend,and learn what he's truly capable of."
      },
      {
        id: 61,
        title: "LUCA",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyZR2d0hKQ80lbwAJtuCwzj3sDI3wEn0J9Q&s",
        genre: "entertainment",
        rating: "3.8",
        year: "2024",
        description: "In a italian seaside town ,luca and his friend alberto enjoy an adventurous and unforgettable summer while trying to conceal a deeply-held secret. "
      },
      {
        id: 62,
        title: "Moana",
        image: "https://snworksceo.imgix.net/cds/f4f2ba30-5e1e-4273-8360-d79a3012d12a.sized-1000x1000.jpg?w=1000&dpr=2",
        genre: "kids",
        rating: "4.8",
        year: "2024",
        description: "A yound women uses her navigational talents to set sail for a fabled island . joining her on the adventure is her hero,the legendary demi-god Maui."
      },
      {
        id: 63,
        title: "Zootopia",
        image: "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/71c47741-e31c-4911-8d2d-2ebc0278de75/compose?aspectRatio=1.78&format=webp&width=1200",
        genre: "entertainment",
        rating: "4.8",
        year: "2024",
        description: "Judy Hoops , the first rabbit to join the city police force , is determined to solve a dangerous case. Despite ,everyone's  lack of belief in her ability."
      },


    
 
      {
        id:64,
        title:"Bigg Boss",
        image:"https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/8899/1758045988899-i",
        genre:"Drama",
        rating:"4.9",
        year:"2024",
        description:"Your Host and Dost Salman khan is back.Brace! fro another high octane season of greatest reality show,serving entertainment and drama."  

      },
      {

        id:65,
        title:"Trade Up",
        image:"https://i.ytimg.com/vi/P6g24XUvGQE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAHJ4T7rDHLc27M0ZVJLNdgEyiCFA",
        genre:"Reality",
        rating:"3.5",
        year:"2025",
        description:"Walk in with old tech,walk out with new? Earn upgrade by answering questions and making bold bets.trade up and win big!"  
      },

{

        id:66,
        title:"Indian game Adda",
        image:"https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/3/1742659920003-h",
        genre:"Reality",
        rating:"3.5",
        year:"2025",
        description:"Welcome to Indian Game Adda! a wild game of wit and strategy"  
      },

      {

        id:67,
        title:"The Voice",
        image:"https://m.media-amazon.com/images/M/MV5BM2VjMjJlMjctNWFlZC00OTRmLTljNmMtNTZkYmEwNDJiMjE5XkEyXkFqcGc@._V1_.jpg",
        genre:"Drama",
        rating:"4.9",
        year:"2025",
        description:"The word voice has multiple meanings across various contexts, including a reality television show, a property of human speech, a writing style, and a grammatical structure."  
      },

      {
        id:68,
        title:" The Society" , 
        image:"https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/1464/1753121881464-i",
        genre:"Reality",
        rating:"2.9",
        year:"2025",
        description:"25 players live in a giant vault , divided by a class, in a brutal society social experiment. over 200 hours ,they fight to survive relentless challenges."
      },


  
]

export { DummyWatchlistItems, DummyHistoryItems ,DummyFavoritesItems};






















