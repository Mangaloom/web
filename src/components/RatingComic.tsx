"use client";

import React from "react";
import { Rating, RatingButton } from "./ui/kibo-ui/rating";

interface RatingComicProps {
  rating: string;
  className?: string;
  size?: number;
  radius?: number;
  length?: number;
  starClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export const RatingComic = ({
  rating,
  className,
  size,
  radius,
  length,
  starClassName,
  textClassName,
  showText = true,
}: RatingComicProps) => {
  return (
    <div className={`flex items-center gap-1 ${className ? className : ""}`}>
      <Rating value={Math.round(Number(rating) / 2)} readOnly>
        {Array.from({ length: length || 5 }).map((_, i) => (
          <RatingButton
            radius={radius ? radius : 10}
            size={size ? size : 8}
            key={i}
            className={`${starClassName ? starClassName : "text-yellow-400"}`}
          />
        ))}
      </Rating>
      {showText && (
        <span className={`${textClassName ? textClassName : "text-sm"}`}>
          {rating}
        </span>
      )}
    </div>
  );
};
