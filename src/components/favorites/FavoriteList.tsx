"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { FavoriteComicCard } from "./FavoriteComicCard";
import { EmptyState } from "./EmptyState";
import { Loader } from "lucide-react";

export const FavoriteList = () => {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-white">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {favorites.map((comic) => (
        <FavoriteComicCard key={comic.href} comic={comic} />
      ))}
    </div>
  );
};
