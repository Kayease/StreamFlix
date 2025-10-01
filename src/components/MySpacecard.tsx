// components/MySpaceItemCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MySpaceItem } from "@/types/MySpaceItem";

interface MySpaceItemCardProps {
  item: MySpaceItem;
}

const MySpaceItemCard: React.FC<MySpaceItemCardProps> = ({ item }) => (
  <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-48 object-cover"
    />
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-sm">{item.genre}</p>
      <p className="text-sm">{item.rating}</p>
      <p className="text-sm">{item.year}</p>
      <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
    </CardContent>
  </Card>
);

export default MySpaceItemCard;
