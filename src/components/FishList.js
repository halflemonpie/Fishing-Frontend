import React, { useState } from "react";
import ReactModal from "react-modal";
import FishDetail from "./FishDetail";

export default function FishList({ modalIsOpen, modalOnClose, setModalIsOpen, fishData }) {
    const [current, setCurrent] = useState(0)
  return (
    <div>
      <button
        onClick={() => setModalIsOpen({ ...modalIsOpen, fishListPage: true })}
      >
        Open Modal Fish List
      </button>
      <ReactModal isOpen={modalIsOpen.fishListPage}>
        <button onClick={() => modalOnClose("fishListPage")}>Close</button>
        <h1>fish List</h1>
        {fishData.map((fish, index) => {
            return(

                <div key={index}>
                    <img src={fish.species_illustration_photo.src} />
                    <h1>{fish.species_name}</h1>
                    <FishDetail index={index} setCurrent={setCurrent} current={current} fishData={fishData} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} modalOnClose={modalOnClose}/>
                </div>
            )
        })}
      </ReactModal>
    </div>
  );
}
