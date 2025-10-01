import { useState } from "react";

const[watchlist,Setwatchlist] = useState("");
const handlewatchlist = (movieData) => {
    const newlist=[...watchlist,movieData]
    console.log(newlist)
}
 <Button 
              size="sm" 
              variant="outline" 
              className="h-7 w-7 p-0 border-white/30 text-white hover:bg-white/10 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Plus className="h-3 w-3" />
            </Button>
    