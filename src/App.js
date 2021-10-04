import { useState } from "react";
import "./styles.css";

export default function App() {
  const [result, setResult] = useState("");
  const [cp, setCp] = useState();
  const [sp, setSp] = useState();
  const [quantity, setQuantity] = useState();
  const [flag, setFlag] = useState(true);
  const [resultColor, setResultColor] = useState("");
  let loss = 0,
    lossp = 0,
    gain = 0,
    gainp = 0,
    totalCP = 0,
    totalSP = 0;

  const checkLucky = () => {
    if (cp <= 0 || quantity <= 0 || sp <= 0) {
      setFlag(false);
      setResult("");
    } else {
      setFlag(true);
      totalCP = cp * quantity;
      totalSP = sp * quantity;
      let ans = totalSP - totalCP;
      if (ans > 0) {
        gain = ans;
        gainp = ((gain / totalSP) * 100).toFixed(2);
        loss = 0;

        if (gainp > 60) {
          setResult(
            `Brilliant! you must be an expert at this. \nYour profit is at ${gainp}%.
          \n Your investment made a gain of ₹ ${gain}.`
          );
          setResultColor("violet");
        } else if (gainp > 30 && gainp <= 60) {
          setResult(
            `Wow! You must be a visionary. You are looking at a profit of ${gainp}%.
          \n Your investment gained ₹ ${gain}.`
          );
          setResultColor("cyan");
        } else {
          setResult(
            `You are looking at a profit of ${gainp}%.
            \n Your investment gained ₹ ${gain}. 
            \n Have patience with all things but, 
            \n first of all with your self.`
          );
          setResultColor("green");
        }
      } else if (ans === 0) {
        setResult(
          "Your investment neither made a profit nor did it incur a loss. Always remember no pain no gain."
        );
        setResultColor("yellow");
      } else {
        loss = ans * -1;
        lossp = ((loss / totalCP) * 100).toFixed(2);
        gain = 0;

        if (lossp < 45) {
          setResult(
            `It's not going well. You have a loss of ${lossp}%.\n Your investment is at a loss of ₹ ${loss}.`
          );
          setResultColor("loss");
        } else {
          setResult(
            `It's your call. \nYou are looking at a loss of ${lossp}%.\n Your investment has lost ₹ ${loss}. \nRome wasn't built in a day but, Nagasaki was destroyed in one.`
          );
          setResultColor("heavyloss");
        }
      }
    }
  };

  return (
    <div className={`App ${resultColor}`}>
      <header>
        <h1>Stock Analysis</h1>
      </header>
      <div className="Inputbar">
        <label>Price during purchase: </label>
        <input
          className="userInput"
          type="number"
          onChange={(event) => {
            setCp(event.target.value);
          }}
          style={{ cursor: "pointer" }}
          placeholder="Enter initial price"
        />
      </div>
      <div className="Inputbar">
        <label>Quantity: </label>
        <input
          className="userInput"
          type="number"
          onChange={(event) => {
            setQuantity(Number(event.target.value));
          }}
          placeholder="Enter number of stocks"
        />
      </div>

      <div className="Inputbar">
        <label>Price now: </label>
        <input
          className="userInput"
          type="number"
          onChange={(event) => {
            setSp(Number(event.target.value));
          }}
          placeholder="Enter current price"
        />
      </div>

      <div>
        <button className="btn" onClick={checkLucky}>
          Print
        </button>
      </div>

      <div className="output">
        <>
          {flag === false ? (
            <p className="warning">Enter valid inputs</p>
          ) : (
            <></>
          )}
        </>
        <>
          {result.length === "" ? (
            <></>
          ) : (
            <p className="resultText">{result}</p>
          )}
        </>
      </div>
    </div>
  );
}
