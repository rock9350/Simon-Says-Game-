import React, { useEffect, useState } from "react";
import Timeout from "../timer";
import "./block.css";

function Enter() {
  let [get, set] = useState(0);
  let [arr, setarr] = useState([]);
  let [first_color, set_first_color] = useState({ backgroundColor: "rgb(252, 58, 58)" });
  let [sec_color, set_sec_color] = useState({ backgroundColor: "green" });
  let [third_color, set_third_color] = useState({ backgroundColor: "blue" });
  let [four_color, set_four_color] = useState({ backgroundColor: "pink" });
  let [game, setgame] = useState(false);
  let [disabled, setdisabled] = useState(false);
  let [start, setstart] = useState(false);
  let [click, setclick] = useState(false);
  let [round, setround] = useState(false);
  let [count, setcount] = useState(0);
  let i = 0;

  const onStart = () => {
    setstart(true);
  };

  useEffect(() => {
    if (start == true) {
      colorChange();
      setdisabled(true);
    }
  }, [start]);

  useEffect(() => {
    if (start == true && round == true) {
      colorChange();
      setcount((count += 1));
    }
  }, [start, round]);

  useEffect(() => {}, [click]);

  async function colorChange() {
    let arr1 = [];
    set((get += 1));

    for (let i = 0; i < get; i++) {
      let random = Math.ceil(Math.random() * 4);

      if (random == 1) {
        arr1.push("first");
      } else if (random == 2) {
        arr1.push("sec");
      } else if (random == 3) {
        arr1.push("third");
      } else if (random == 4) {
        arr1.push("four");
      }
      await Timeout(1000);
      flash(random);
      await Timeout(1000);
      set_first_color({ backgroundColor: "rgb(252, 58, 58)" });
      set_sec_color({ backgroundColor: "green" });
      set_third_color({ backgroundColor: "blue" });
      set_four_color({ backgroundColor: "pink" });
    }

    setarr(arr1);
    setround(false);
  }

  function flash(arr) {
    if (arr == 1) {
      set_first_color({ backgroundColor: "black" });
    } else if (arr == 2) {
      set_sec_color({ backgroundColor: "black" });
    } else if (arr == 3) {
      set_third_color({ backgroundColor: "black" });
    } else if (arr == 4) {
      set_four_color({ backgroundColor: "black" });
    }
  }

  const Checking = (e) => {
    console.log(e + " " + arr[i]);
    if (e == arr[i]) {
      console.log("right");
    } else {
      setgame(true);
      setstart(false);
      console.log("lose");
    }

    i++;
    if (i == arr.length) {
      setround(true);
    }
  };
  const Check = (e) => {
    setclick(true);
    Checking(e.target.id);
    // setDemo(e.target.id);
  };

  const onRestart = () => {
    setgame(false);
    setdisabled(false);
    setstart(false);
    setarr([]);
    set(0);
    setcount(0);
    setclick(false);
    setround(false);
  };

  return (<>
    <h1> Simon Says</h1>
    <p>Score :{count}</p>
    <div id="box">
      <div id="part_1">
        <div id="first" style={first_color} onClick={Check}></div>
        <div id="sec" style={sec_color} onClick={Check}></div>
        <div id="third" style={third_color} onClick={Check}></div>
        <div id="four" style={four_color} onClick={Check}></div>
      </div>

      {game ? (
        <button id="button" onClick={onRestart}>
          Gamr over
        </button>
      ) : (
        <button id="button" disabled={disabled} onClick={onStart}>
          {count == 0 ? "start" : count}
        </button>
      )}
    </div>
    </>
  );
}

export default Enter;
