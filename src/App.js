import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'animate.css';
import { Route, Routes, Link } from "react-router-dom";
import Fishing from "./components/Home/Fishing";
import FishList from "./components/FishBook/FishList";

// todo:
// refactor
// detail for my collection

function App() {
  // data from my backend
  const [fishData, setFishData] = useState([]);

  // state for user fish
  const [userFishList, setUserFishList] = useState([])

  // current fish detail page
  const [current, setCurrent] = useState(0);

  // get data from api
  useEffect(() => {
    axios.get("https://fishing-game-backend.herokuapp.com/fish/").then((res) => {
      console.log(res.data);
      setFishData(res.data);
    });
  }, []);
  return (
    <div className="App">
      <header className="bg-gradient-to-t from-sky-500">
        <nav>
          <ul>
            <Link to="/">
              <li className="nav-fish-page flex flex-col justify-center content-center hover:bg-sky-400 rounded-lg hover:border-4 border-orange-200"><div><i class="fa-solid fa-anchor"></i><br/><span>Fish</span></div></li>
            </Link>
            <Link to="/fishBook">
              <li className="nav-fish-page flex flex-col justify-center content-center hover:bg-sky-400 rounded-lg hover:border-4 border-orange-200"><div><i class="fa-solid fa-fish-fins"></i><br/><span>FishBook</span></div></li>
            </Link>
          </ul>
        </nav>
      </header>
      {/* <div
        dangerouslySetInnerHTML={{ __html: data[0]["Physical Description"] }}
      /> */}
      <Routes>
        <Route path="/" element={<Fishing userFishList={userFishList} fishData={fishData} setCurrent={setCurrent} setUserFishList={setUserFishList}/>} />
        <Route path="/fishBook" element={<FishList fishData={fishData} current={current} setCurrent={setCurrent} userFishList={userFishList}/>} />
      </Routes>
    </div>
  );
}

export default App;
