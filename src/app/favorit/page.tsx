import { FavoriteList } from "@/components/favorites/FavoriteList";

const FavoritePage = () => {
  return (
    <div className="container mx-auto p-4 text-white min-h-screen">
      {/* Bagian ini dirender di server */}
      <h1 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
        Komik Favoritku
      </h1>
      <FavoriteList />
    </div>
  );
};

export default FavoritePage;
