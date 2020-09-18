import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//axios is getting the link, need to find the way to randomize the number

function App() {
  const [memes, setMemes] = useState(
    'https://api.memegen.link/images/ackbar.jpg',
  );
  const [allMemeImgs, setAllMemeImgs] = useState([]);
  //
  const [upperTxt, setUpperTxt] = useState('stretch goals');
  const [lowerTxt, setLowerTxt] = useState('it' + "'" + 's a trap');
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImgUrl = allMemeImgs[randNum].blank;
    setMemes(randMemeImgUrl);
  };
  //
  const [count, setCount] = useState(0);
  //
  const nextMeme = () => {
    const memeUrl = allMemeImgs[count].blank;
    setMemes(memeUrl);
  };
  //
  useEffect(() => {
    axios.get('https://api.memegen.link/templates').then((res) => {
      setAllMemeImgs(res.data);
    });
  }, []);
  //
  const download = () => {
    axios({
      url: `${memes.slice(0, -4)}/${upperTxt}/${lowerTxt}.png`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'meme.png');
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <div className="outter-box">
      <div className="inner-box">
        <h1>Meme Generator</h1>
        <div className="text-line">
          <form onSubmit={handleSubmit}>
            <button className="button">Random Meme</button>
            <lable className="text-box">
              Upper text:
              <input
                type="text"
                onChange={(e) => setUpperTxt(e.target.value)}
              />
            </lable>
            <lable>
              Lower text:
              <input
                type="text"
                onChange={(e) => setLowerTxt(e.target.value)}
              />
            </lable>
          </form>
        </div>
        <div className="meme">
          <button
            className="side-button"
            onClick={(e) => {
              setCount(count - 1);
              nextMeme();
            }}
            disabled={count <= 0}
          >
            Previous meme
          </button>
          <img
            src={`${memes.slice(0, -4)}/${upperTxt}/${lowerTxt}.png`}
            alt=""
          />
          <button
            className="side-button"
            onClick={(e) => {
              setCount(count + 1);
              nextMeme();
            }}
          >
            Next meme
          </button>
        </div>
        <div className="download">
          <button onClickonClick={download}>Download Meme</button>
        </div>
      </div>
    </div>
  );
}
export default App;
