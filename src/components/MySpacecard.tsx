// components/MySpaceItemCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MySpaceItem } from "@/types/MySpaceItem";

interface MySpaceItemCardProps {
  item: MySpaceItem;
}

const MySpaceItemCard: React.FC<MySpaceItemCardProps> = ({ item }) => (
  <Card className="overflow-hidden shadow-md hover:shadow-lg transition w-full max-w-sm mx-auto sm:max-w-none">
    <div className="flex flex-col sm:flex-row h-full">
      <div className="w-full sm:w-1/3 lg:w-1/4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 sm:h-full object-cover"
        />
      </div>
      <div className="w-full sm:w-2/3 lg:w-3/4">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{item.title}</h3>
            <span className="text-xs sm:text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {item.rating}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground mb-2">
            <span>{item.genre}</span>
            <span>•</span>
            <span>{item.year}</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 sm:line-clamp-4">
            {item.description}
          </p>
        </CardContent>
      </div>
    </div>
  </Card>
);

export default MySpaceItemCard;
