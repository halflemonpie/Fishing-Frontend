import React, { useEffect, useState } from "react";
import FishDetail from "./FishDetail";

export default function FishList({ fishData, current, setCurrent, userFishList }) {
  const [currentList, setCurrentList] = useState(fishData)

  useEffect(() => {
    setCurrentList(fishData)
  }, [fishData])
  
  return (
    <div className="fish-book">
      <div className="fish-list text-center bg-sky-50">
        <h1 className="text-6xl mb-2">FishBook</h1>
        <button onClick={() => setCurrentList(fishData)} className="hover:bg-orange-400 bg-sky-200 rounded-lg border-4">ALL</button> <button onClick={() => setCurrentList(userFishList)} className="hover:bg-orange-400 bg-sky-200 rounded-lg border-4">My Collection</button>
        {currentList.map((fish, index) => {
          let stars;
          if (fish.rarity === 1) {
            stars = <i class="fa-solid fa-star"></i>;
          } else if (fish.rarity === 2) {
            stars = (
              <span>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </span>
            );
          } else if (fish.rarity === 3) {
            stars = (
              <span>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </span>
            );
          }
          return (
            <div className="rounded-lg bg-gradient-to-t from-sky-500 mb-10 hover:bg-teal-200">
              <a
                key={index}
                onClick={() => setCurrent(index)}
                href="#detail-title"
              >
                <h1 className="text-2xl">
                  <i class="fa-solid fa-fish-fins"></i>
                  {index + 1} {fish.species_name} {stars}
                </h1>
                <div className="flex content-center justify-center">
                  <img
                    src={fish.species_illustration_photo.src}
                    alt={fish.species_illustration_photo.alt}
                  />
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <FishDetail fishData={fishData} current={current} />
    </div>
  );
}
