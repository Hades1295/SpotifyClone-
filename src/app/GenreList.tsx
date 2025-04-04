// components/GenreList.tsx
import React from "react";

interface Props {
  genres: any[];
}

export default function GenreList({ genres }: Props) {
  return (
    <ul className="category-list flex flex-wrap justify-center">
      {genres.map((category) => (
        <li key={category.id} className="category-item">
          <img src={category.icons?.[0]?.url} alt={category.name} className="category-image" />
          <div className="category-info">
            <p className="category-name">{category.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
