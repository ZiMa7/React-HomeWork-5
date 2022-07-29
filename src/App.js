import "./App.css";
import React, { useState, useEffect } from "react";
import clock_s from "./img/ClockFace_S.png";
import clock_m from "./img/ClockFace_M.png";
import clock_h from "./img/ClockFace_H.png";

const Spoiler = ({ header = "Open", open, children }) => {
  const [Visibility, setVisibility] = useState(open);
  const ShowText = () => {
    setVisibility(Visibility ? false : true);
  };

  return (
    <div className="spoiler" onClick={ShowText}>
      <div className="header">{header} </div>
      {Visibility ? children : ""}
    </div>
  );
};

const RangeInput = ({ min, max }) => {
  const [Min, setMin] = useState(min);
  const [Max, setMax] = useState(max);
  let [Length, setLength] = useState();
  const handleChange = (event) => {
    let length = event.target.value.length;
    setLength((Length = length));
  };
  return (
    <div className="ranges_input">
      <p className="header">
        The text you enter must start from {Min} to {Max}. At the moment, the
        length of the entered text is {Length} .
      </p>
      <input
        className="input_all"
        type="text"
        onChange={handleChange}
        style={
          Length > Min && Length < Max
            ? { background: "white" }
            : { background: "red" }
        }
      ></input>
    </div>
  );
};

const PasswordConfirm = ({ min }) => {
  let [FirstPassword, SetFirstPassword] = useState("");
  let [SecondPassword, SetSecondPassword] = useState("");
  const handleChangeFirst = (event) => {
    let firstPass = event.target.value;
    SetFirstPassword((FirstPassword = firstPass));
  };
  const handleChangeSecond = (event) => {
    let secondPass = event.target.value;
    SetSecondPassword((SecondPassword = secondPass));
  };
  const isValid =
    /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]+/.test(FirstPassword) &&
    FirstPassword.length > min;
  return (
    <>
      <div class="password_confirm">
        <p className="title">First Password</p>
        <input
          className="input_all"
          type="password"
          onChange={handleChangeFirst}
          value={FirstPassword}
        />

        {
          <p style={isValid ? { color: "green" } : { color: "red" }}>
            {isValid
              ? "Great"
              : "The password must contain at least one capital letter and one number and min length 2 chars."}
          </p>
        }

        <p>
          <b>You must repeat the password.</b>
        </p>
        <p className="title">Second Password</p>
        <input
          className="input_all"
          type="password"
          onChange={handleChangeSecond}
          value={SecondPassword}
        />
        {
          <p
            style={
              FirstPassword === SecondPassword
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {FirstPassword === SecondPassword
              ? "Great"
              : "Passwords do not match."}
          </p>
        }
      </div>
    </>
  );
};

class Timer extends React.Component {
  state = {
    seconds: this.props.seconds,
    minutes: 0,
    hour: 0,
  };

  componentWillMount() {
    this.state.seconds = this.props.seconds % 60;
    this.state.minutes = Math.floor(this.props.seconds / 60);
    this.state.hour = Math.floor(this.state.minutes / 60);
    this.state.minutes = Math.floor(this.state.minutes % 60);
  }

  timer = () => {
    const { seconds, minutes, hour } = this.state;
    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
    }
    if (seconds === 0) {
      if (minutes === 0) {
        if (hour === 0) {
          clearInterval(this.timer);
        } else {
          this.setState(({ hour }) => ({
            hour: hour - 1,
            minutes: 59,
            seconds: 59,
          }));
        }
      } else {
        this.setState(({ minutes, hour }) => ({
          hour: hour,
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
    }
  };
  stopInterval = () => {
    clearInterval(this.time);
    this.setState({ timerStatus: false });
  };

  startInterval = () => {
    this.time = setInterval(this.timer, 1000);
    this.setState({ timerStatus: true });
  };

  render() {
    return (
      <div className="timer">
        <h1 className="title">Timer</h1>
        <p className="header">
          {this.state.hour}:{this.state.minutes}:{this.state.seconds}
        </p>

        <button
          className="timer_button"
          onClick={
            !this.state.timerStatus ? this.startInterval : this.stopInterval
          }
        >
          {this.state.timerStatus ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
}

const TimerControl = ({ seconds, minute, hours }) => {
  let [Seconds, setSeconds] = useState(seconds);
  let [Minute, setMinute] = useState(minute);
  let [Hours, setHours] = useState(hours);
  let [TimeInSeconds, setTimeInSeconds] = useState(0);
  const handleChangeSeconds = (event) => {
    let seconds = event.target.value;
    setSeconds((Seconds = seconds));
  };
  const handleChangeMinute = (event) => {
    let minute = event.target.value;
    setMinute((Minute = minute));
  };
  const handleChangeHours = (event) => {
    let hours = event.target.value;
    setHours((Hours = hours));
  };
  const onClick = () => {
    setTimeInSeconds((TimeInSeconds = 0));
    setTimeInSeconds(
      (TimeInSeconds =
        Number(Seconds) + Number(Minute * 60) + Number(Hours * 3600))
    );
    console.log(TimeInSeconds);
  };
  return (
    <div className="timer_control">
      <p className="title">Timer Control</p>
      <div>
        <p className="header">Seconds</p>
        <input
          className="input_all"
          type="number"
          min="0"
          max="60"
          onChange={handleChangeSeconds}
        />
      </div>
      <div>
        <p className="header">Minute</p>
        <input
          className="input_all"
          type="number"
          min="0"
          max="60"
          onChange={handleChangeMinute}
        />
      </div>
      <div>
        <p className="header">Hours</p>{" "}
        <input
          className="input_all"
          type="number"
          min="0"
          onChange={handleChangeHours}
        />
      </div>
      <button className="timer_control_button" onClick={onClick}>
        Start
      </button>
      {TimeInSeconds > 0 ? <Timer seconds={TimeInSeconds} /> : ""}
    </div>
  );
};

const TimerContainer = ({ hours, minutes, seconds, refresh, render }) => {
  let [Hours, setHours] = useState(hours);
  let [Minutes, setMinutes] = useState(minutes);
  let [Seconds, setSeconds] = useState(seconds);
  const [timerStatus, SetTimerStatus] = useState(false);

  const RenderField = render;

  const handleChangeHours = (event) => {
    let hours = event.target.value;
    setHours((hours = hours));
  };
  const handleChangeMinutes = (event) => {
    let minute = event.target.value;
    setMinutes((Minutes = minute));
  };
  const handleChangeSeconds = (event) => {
    let seconds = event.target.value;
    setSeconds((seconds = seconds));
  };
  const TimeButton = () =>
    SetTimerStatus((timerStatus) => {
      return !timerStatus;
    });

  useEffect(() => {
    let interval = null;
    if (timerStatus) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 0) setSeconds(seconds - 1);
          else if (seconds === 0) {
            setMinutes((minutes) => {
              if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds((seconds = 59));
              }
              if (minutes === 0 && seconds === 0) {
                if (Hours > 0) {
                  setHours(Hours - 1);
                  setMinutes((minutes = 59));
                  setSeconds((seconds = 59));
                } else if (Hours === 0) {
                  setHours((hours) => {
                    if (hours === 0 && minutes === 0 && seconds === 0) {
                      clearInterval(interval);
                      return hours;
                    }
                    setMinutes((minutes = 59));
                    setSeconds((seconds = 59));
                  });
                }
                return minutes;
              }
            });
          }
          return seconds;
        });
      }, refresh);
    } else if (!timerStatus && Seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerStatus, Seconds, refresh]);

  return (
    <RenderField
      seconds={Seconds}
      minutes={Minutes}
      hours={Hours}
      handleChangeHours={handleChangeHours}
      handleChangeMinutes={handleChangeMinutes}
      handleChangeSeconds={handleChangeSeconds}
      TimeButton={TimeButton}
      timerStatus={timerStatus}
    />
  );
};

function TimerAll({
  seconds,
  minutes,
  hours,
  handleChangeHours,
  handleChangeMinutes,
  handleChangeSeconds,
  TimeButton,
  timerStatus,
}) {
  return (
    <>
      <div className="timer_container">
        <h2 className="title">Timer</h2>
        <p className="header">
          {hours}:{minutes}:{seconds}
        </p>
        <div>
          <p>Hours</p>
          <input
            className="input_all"
            type="number"
            min="0"
            max="24"
            placeholder="Hours"
            onChange={handleChangeHours}
          />
          <p>Minutes</p>
          <input
            className="input_all"
            type="number"
            min="0"
            max="59"
            placeholder="Minutes"
            onChange={handleChangeMinutes}
          />
          <p>Seconds</p>
          <input
            className="input_all"
            type="number"
            min="0"
            max="59"
            placeholder="Seconds"
            onChange={handleChangeSeconds}
          />
        </div>
        <button className="timer_container_button" onClick={TimeButton}>
          {timerStatus ? "Stop" : "Start"}
        </button>
      </div>
    </>
  );
}

class WatchContainer extends React.Component {
  state = {
    seconds: this.props.date.getSeconds(),
    minutes: this.props.date.getMinutes(),
    hours: this.props.date.getHours(),
    secondLine: {},
    minuteLine: {},
    hourLine: {},
  };

  componentWillMount() {
    this.time = setInterval(this.timer, 1000);
    this.setState({ timerStatus: true });
  }

  componentDidUpdate() {
    this.secondLine = {
      transform: "rotate(" + (this.state.seconds / 60) * 360 + "deg)",
    };

    this.minuteLine = {
      transform: `rotate(${
        (this.state.minutes / 60) * 360 + (this.state.seconds / 60) * 6
      }deg)`,
    };

    this.hourLine = {
      transform: `rotate(${
        (this.state.hours / 12) * 360 + (this.state.minutes / 60) * 30
      }deg)`,
    };
  }

  timer = () => {
    console.log(this.state);
    const { seconds, minutes, hours } = this.state;
    this.setState(({ seconds }) => ({
      seconds: seconds + 1,
    }));

    if (seconds === 60) {
      this.setState(({ minutes }) => ({
        minutes: minutes + 1,
        seconds: 1,
      }));
    }
    if (minutes === 60) {
      this.setState(({ hours }) => ({
        hours: hours + 1,
        minutes: 0,
      }));
    }
    if (hours === 24) {
      this.setState(() => ({
        hour: 0,
      }));
    }
  };

  render() {
    return (
      <div className="watch_container">
        <div className="watch">
          <img
            src={clock_s}
            style={this.secondLine}
            className="line second-line"
          />
          <img
            src={clock_m}
            style={this.minuteLine}
            className="line minute-line"
          />
          <img src={clock_h} style={this.hourLine} className="line hour-line" />
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Spoiler header={<h1 className="title">Title 1</h1>} children>
        <p className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Spoiler>
      <Spoiler>
        <h2 className="title">Title 2</h2>
        <p className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Spoiler>
      <RangeInput min={2} max={10} />
      <PasswordConfirm min={2} />
      <Timer seconds={5400} />
      <TimerControl />
      <TimerContainer
        hours={0}
        minutes={0}
        seconds={0}
        refresh={1000}
        render={TimerAll}
      />
      <WatchContainer date={new Date()} />
    </div>
  );
}

export default App;
