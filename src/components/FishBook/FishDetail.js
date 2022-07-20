import React from "react";

export default function FishDetail({ fishData, current }) {
  let stars;
  if (fishData.length <= 0) {
    stars = "";
  } else if ((fishData[current].rarity === 1)) {
    stars = <i class="fa-solid fa-star"></i>;
  } else if ((fishData[current].rarity === 2)) {
    stars = (
      <span>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </span>
    );
  } else if ((fishData[current].rarity === 3)) {
    stars = (
      <span>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </span>
    );
  }

  let imageGallery;
  if (fishData.length <= 0) {
    imageGallery = <p>loading image gallery</p>;
  } else if (fishData[current].image_gallery === null) {
    imageGallery = "";
  } else if (fishData[current].image_gallery.length === undefined) {
    imageGallery = (
      <img
        src={fishData[current].image_gallery.src}
        alt={fishData[current].image_gallery.alt}
      />
    );
  } else {
    imageGallery = fishData[current].image_gallery.map((image, index) => {
      console.log(image);
      return <img src={image.src} alt={image.alt} />;
    });
  }

  let detailDisplay;
  if (fishData.length <= 0) {
    detailDisplay = <h1>loading</h1>;
  } else {
    console.log(fishData[current]);
    detailDisplay = (
      <div>
        <h1 id="detail-title" className="text-center text-5xl mb-5">
          {fishData[current].species_name}
        </h1>
        <h1 className="text-center text-xl">{stars}</h1>
        <p>Scientific Name: {fishData[current].scientific_name}</p>
        <br />
        <div className="flex content-center justify-center">
          <img
            src={fishData[current].species_illustration_photo.src}
            alt={fishData[current].species_illustration_photo.alt}
          />
        </div>
        <br />
        <p>Physical Description:</p>
        <div
          dangerouslySetInnerHTML={{
            __html: fishData[current].physical_description,
          }}
        />
        <br />
        <p>NOAA Fisheries Region:</p>
        <p>{fishData[current].noaa_fisheries_region}</p>
        <br />
        <p>Location:</p>
        {fishData[current].location !== null && (
          <div
            dangerouslySetInnerHTML={{
              __html: fishData[current].location,
            }}
          />
        )}
        <br />
        <p>Population:</p>
        {fishData[current].population !== null && (
          <p>{fishData[current].population}</p>
        )}
        <br />
        <p>Biology:</p>
        <div
          dangerouslySetInnerHTML={{
            __html: fishData[current].biology,
          }}
        />
        <br />
        <p>Taste:</p>
        <div
          dangerouslySetInnerHTML={{
            __html: fishData[current].taste,
          }}
        />
        <br />
        <p>Texture:</p>
        <div
          dangerouslySetInnerHTML={{
            __html: fishData[current].texture,
          }}
        />
        <br />
        <p>Image Gallery:</p>
        {imageGallery}
      </div>
    );
  }
  return (
    <div className="fish-detail bg-gradient-to-b from-teal-100 via-cyan-500 to-blue-500 bg-local animate__animated animate__fadeIn">
      {detailDisplay}
    </div>
  );
}
