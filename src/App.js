import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//axios is getting the link, need to find the way to randomize the number

function App() {
  const [memes, setMemes] = useState('');
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  //
  const [upperTxt, setUpperTxt] = useState('');
  const [lowerTxt, setLowerTxt] = useState('');
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImgUrl = allMemeImgs[randNum].blank;
    setMemes(randMemeImgUrl);
  };
  //
  useEffect(() => {
    axios.get('https://api.memegen.link/templates').then((res) => {
      setAllMemeImgs(res.data);
    });
  }, []);
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <button>Random Meme</button>
          <lable>
            Upper text:
            <input type="text" onChange={(e) => setUpperTxt(e.target.value)} />
          </lable>
          <lable>
            Lower text:
            <input type="text" onChange={(e) => setLowerTxt(e.target.value)} />
          </lable>
        </form>
      </div>
      <div>
        <img src={`${memes.slice(0, -4)}/${upperTxt}/${lowerTxt}.png`} alt="" />
      </div>
    </div>
  );
}
export default App;
