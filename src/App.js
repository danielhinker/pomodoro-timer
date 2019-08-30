import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      break: 5,
      sessionLength: 25,
      timeLeft: 25,
      isTimerOn: false,
      isBreak: false,
      // seconds: '00',
      // minutes: '00',
    };

    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleIntervals = this.handleIntervals.bind(this);
    this.handleBreakInterval = this.handleBreakInterval.bind(this);
    this.handleBeep = this.handleBeep.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.setBreakTimer = this.setBreakTimer.bind(this);
    this.setReset = this.setReset.bind(this);
  }

componentDidMount() {
  this.setTimer()
}

  handleBeep = (e) => {
    const beep = document.getElementById("beep");
    beep.play();
  }

  handleBreak = (e) => {
    e.persist();

    if (e.target.id === "break-increment" && this.state.break < 60) {
      this.setState((prevState) => ({
        break: prevState.break += 1
      }), () => {
        this.setBreakTimer()
      });
    } else if (e.target.id === "break-decrement" && this.state.break > 1) {
      this.setState((prevState) => ({
        break: prevState.break -= 1
      }), () => {
        this.setBreakTimer()
      });
    }
  }

  handleSession = (e) => {
    e.persist();

    if (e.target.id === "session-increment" && this.state.sessionLength < 60) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength += 1,
        timeLeft: prevState.sessionLength += 1
      }), () => {
        this.setTimer()
      });
    } else if (e.target.id === "session-decrement" && this.state.sessionLength > 1) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength -= 1,
        timeLeft: prevState.sessionLength -= 1
      }), () => {
        this.setTimer()
      });
    }
  }

  handleBreakInterval = () => {
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);

    this.setState((prevState) => ({
      minutes: min,
      seconds: sec,
      timeLeft: min
    }));
  
    if (min === 0 & sec === 0) {
      this.handleBeep();
      clearInterval(this.timerBreakInterval);

      this.setState({
        isBreak: false,
        isTimerOn: true,
       
      })

      this.setTimer()
      this.timerInterval = setInterval(this.handleIntervals, 1000);
    }
    this.secondsRemaining--
  }

  setTimer = () => {

    this.secondsRemaining = this.state.sessionLength * 60
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);

    this.setState((prevState) => ({
      minutes: min,
      seconds: sec,
      timeLeft: min
    }));

  }

  handleIntervals = () => {
    // this.secondsRemaining = this.state.sessionLength * 60
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);
    
    this.setState((prevState) => ({
      minutes: min,
      seconds: sec,
      timeLeft: min
    }));
 
    if (min === 0 & sec === 0) {
      this.handleBeep();
      clearInterval(this.timerInterval);

      this.setState({
        isBreak: true,
        isTimerOn: true,
      })
     this.setBreakTimer()
    this.timerBreakInterval = setInterval(this.handleBreakInterval, 1000);
      
    }
    this.secondsRemaining--
  }

  setBreakTimer = () => {

    this.secondsRemaining = this.state.break * 60
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);

    this.setState((prevState) => ({
      minutes: min,
      seconds: sec,
      timeLeft: min
    }));

  }

  handleStart = (e) => {
    e.persist();

    this.setState((prevState) => ({
      isTimerOn: true,
      isBreak: false
    }));

    this.timerInterval = setInterval(this.handleIntervals, 1000);

  }

  handleStop = (e) => {
    e.persist();

    this.setState((prevState) => ({
      isTimerOn: false
    }));
    clearInterval(this.timerInterval)
    clearInterval(this.timerBreakInterval)
  }

  setReset = () => {
    this.secondsRemaining = this.state.sessionLength * 60
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);

    this.setState((prevState) => ({
      minutes: min,
      seconds: sec,
      timeLeft: min
    }));
  }

  handleReset = (e) => {
    e.persist();
    const beep = document.getElementById("beep");
    beep.pause()
    beep.currentTime = 0;
    this.secondsRemaining = 25 * 60
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);

    // this.secondsRemaining = this.state.sessionLength * 60
    // let min = Math.floor(this.secondsRemaining / 60);
    // let sec = this.secondsRemaining - (min * 60);

    this.setState((prevState) => ({
      break: 5,
      sessionLength: 25,
      timeLeft: min,
      isTimerOn: false,
      isBreak: false,
      minutes: min,
      seconds: sec,
      
    }));
    // this.setTimer()
    clearInterval(this.timerInterval)
    clearInterval(this.timerBreakInterval)
    
  }

  render() {

    let button;
    let breakIncrement;
    let breakDecrement;
    let sessionIncrement;
    let sessionDecrement;
    let timeLeft;
    let timerLabel;

    // this.secondsRemaining = this.state.timeLeft * 60
    let min = Math.floor(this.secondsRemaining / 60);
    let sec = this.secondsRemaining - (min * 60);

    if (this.state.isTimerOn) {
      button = <button id="start_stop" onClick={this.handleStop}>Stop</button>
      breakIncrement = <button id="break-increment">Increase</button>
      breakDecrement = <button id="break-decrement">Decrease</button>
      sessionIncrement = <button id="session-increment">Increase</button>
      sessionDecrement = <button id="session-decrement">Decrease</button>
      if (min < 10 && sec < 10) {
        timeLeft = <div id="time-left">0{this.state.minutes}:0{this.state.seconds}</div>
      } else if (min < 10) {
        timeLeft = <div id="time-left">0{this.state.minutes}:{this.state.seconds}</div>  
      } else if (sec < 10) {
        timeLeft = <div id="time-left">{this.state.minutes}:0{this.state.seconds}</div>
      } else {
      timeLeft = <div id="time-left">{this.state.minutes}:{this.state.seconds}</div>
      }
    } else {
      button = <button id="start_stop" onClick={this.handleStart}>Start</button>
      breakIncrement = <button id="break-increment" onClick={this.handleBreak}>Increase</button>
      breakDecrement = <button id="break-decrement" onClick={this.handleBreak}>Decrease</button>
      sessionIncrement = <button id="session-increment" onClick={this.handleSession}>Increase</button>
      sessionDecrement = <button id="session-decrement" onClick={this.handleSession}>Decrease</button>
      
      if (min < 10 && sec < 10) {
        timeLeft = <div id="time-left">0{this.state.minutes}:0{this.state.seconds}</div>
      } else if (min < 10) {
        timeLeft = <div id="time-left">0{this.state.minutes}:{this.state.seconds}</div>
      } else if (sec < 10) {
        timeLeft = <div id="time-left">{this.state.minutes}:0{this.state.seconds}</div>
      } else {
        timeLeft = <div id="time-left">{this.state.minutes}:{this.state.seconds}</div>
      }
    }

    if (this.state.isBreak) {
      timerLabel = <h1 id="timer-label">Break</h1>
    } else {
      timerLabel = <h1 id="timer-label">Session</h1>
    }

    return (
      <div>
        <h1 id="break-label">Break Length</h1>
     
        {breakIncrement}
        <div id="break-length">{this.state.break}</div>     
        {breakDecrement}

        <h1 id="session-label">Session Length</h1>
        {sessionIncrement}
        <div id="session-length">{this.state.sessionLength}</div>
        {sessionDecrement}

        {timerLabel}
        {timeLeft}

        {button}

        <button id="reset" onClick={this.handleReset}>Reset</button>

        <audio className="clip" id="beep" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3" />
      </div>
    );
  }
}

export default App;
