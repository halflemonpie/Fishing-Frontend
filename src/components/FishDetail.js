import React from "react";
import ReactModal from "react-modal";

export default function FishDetail({modalIsOpen, modalOnClose, setModalIsOpen, fishData, current, setCurrent, index}) {
  return (
    <div>
      <button
        onClick={() => {
            setCurrent(index)
            setModalIsOpen({ ...modalIsOpen, fishDetailPage: true })}}
      >
        Open Modal Fish Detail
      </button>
      <ReactModal className='detail-page' isOpen={modalIsOpen.fishDetailPage}>
        <button onClick={() => modalOnClose("fishDetailPage")}>Close</button>
        <h1>fish Detail</h1>
        <p>{fishData[current].species_name}</p>
      </ReactModal>
    </div>
  );
}
