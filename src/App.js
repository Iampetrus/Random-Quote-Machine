import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import iconImage from './twitteroldicon.svg';

let citasDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
const tlogo = "./580b57fcd9996e24bc43c53e.png"
function App() {
  const [quote, setQuote] = useState("This is an ibru sentence: hkb fhuiog hgv goiug sd");
  const [author, setAuthor] = useState("The Author");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotes, setQuotes] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    
    setQuotes(parsedJSON.quotes)
    
  }
  
  useEffect(() => {
   fetchQuotes(citasDB)
  }, [citasDB])

  const generateRandomNumber = () => {
    let randomInteger = Math.floor(quotes.length * Math.random())
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotes[randomInteger].quote);
    setAuthor(quotes[randomInteger].author);
  }

  const textShadowStyle = '.1px .1px 1px black';

  return (
    <div className="App">
      <header className="App-header" style={
        {backgroundColor: accentColor}
      }>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text" style={{ textShadow: textShadowStyle }}>
            "{quote}"
          </p>
          <p id="author" style={{ textShadow: textShadowStyle }}>
            - {author}
          </p>
          <div id="buttons" style={{}}>
            <button id="new-quote" style={
        {backgroundColor: accentColor, display: 'flex', alignItems: 'center', textShadow: '.1px .1px 2px black' }
      } onClick={() => generateRandomNumber()}>New quote</button>
              
              <a id="tweet-quote" style={
        {backgroundColor: accentColor, display: 'flex', alignItems: 'center' }
      } href={encodeURI('http://www.twitter.com/intent/tweet?text=${quote} -${author}')}>
              <img src={iconImage} alt="old tweeter icon" style={{ width: '2vw', borderRadius: '20vw', backgroundColor: "white" }} /></a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
