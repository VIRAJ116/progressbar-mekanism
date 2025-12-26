import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(5);
  const [timer, setTimer] = useState("0");
  const progressRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [max, setMax] = useState("0");
  const handleProgressbar = () => {
    setTimer("0");
    setMax(String(count * 1000));
    setIsLoading(true);
    progressRef.current.style.transitionDuration = `${count}s`;
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (Number(prev) > String(count * 1000)) return;
        return String(Number(prev) + 10);
      });
    }, 10);
    setTimeout(() => {
      setIsLoading(false);
      clearInterval(interval);
    }, count * 1000);
  };
  return (
    <>
      <div className="bg-black/85 flex items-center justify-center h-dvh">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={count}
              className="border border-white rounded-md p-2 bg-black text-white focus:border-white focus:ring-white active:border-white active:ring-white disabled:bg-gray-600 disabled:cursor-not-allowed"
              onChange={(e) => setCount(e.target.value)}
              disabled={isLoading}
            />
            <button
              className="bg-blue-500 rounded-md hover:cursor-pointer text-white py-2 px-6 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={isLoading}
              onClick={handleProgressbar}
            >
              Start
            </button>
          </div>
          <progress
            ref={progressRef}
            className="w-full bg-transparent text-center transition-all rounded-lg"
            id="file"
            value={timer}
            max={max}
          >
            {count}%
          </progress>
        </div>
      </div>
    </>
  );
}

export default App;
