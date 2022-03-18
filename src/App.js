import { useEffect, useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);   //...currentarray= 기존배열요소에 추가하기
    setToDo("");
  };
  

  const [coins, setCoins] = useState([]);
  const getCoins = async () => {
  const json = await (
    await fetch(
      `https://api.coinpaprika.com/v1/tickers`
    )
  ).json();
  setCoins(json);
  };

  useEffect(() => {getCoins();}, []);

  return (
    <div>
      <h1>My ToDos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} type="text" placeholder="Write your to do..."/>
        <button>Add To Do</button>
      </form>
      <ul>
        {toDos.map((item) => (<li key={item}>{item}</li>))}
      </ul>

      <h2>The Coins! {`${coins.length}`}</h2>
      <select>{coins.map((coin) => (<option>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</option>))}</select> 
    </div>
  )
}

export default App;
