// import Countdown, { CountdownRenderProps } from 'react-countdown';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime } : any) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
      {/* <div className="text">seconds</div> */}
    </div>
  );
};

const CountdownDisplay = ({ isStarted = false, dispatch }: any) => {
  // cosnt time = new
  // const renderer = (props: CountdownRenderProps) => {
  //   return (
  //     <div>
  //       <CountdownSample {...props} />
  //     </div>
  //   );
  // };

  return (
    <CountdownCircleTimer
      key={isStarted}
      isPlaying={isStarted}
      duration={10}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[10, 6, 3, 0]}
      onComplete={() => {
        dispatch({
          type: "DISABLE_COUNTDOWN"
        })
        return { shouldRepeat: false, delay: 1, newInitialRemainingTime: 10 }
      }}
    >
      {renderTime}
    </CountdownCircleTimer>
  )
};

export default CountdownDisplay;