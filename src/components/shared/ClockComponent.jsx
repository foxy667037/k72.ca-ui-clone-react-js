import { Globe } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

const ClockComponent = () => {
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", { // Intl stands for "Internationalization"
        timeZone: "America/Montreal",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      }),
    [],
  );

  const [currentTime, setCurrentTime] = useState(
    dateFormatter.format(new Date()),
  );

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const montrealTime = dateFormatter.format(new Date());
      setCurrentTime(montrealTime);
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [dateFormatter]);

  return (
    <div className="font-[Lausanne-500] flex justify-center items-end gap-3">
      <Globe className="stroke-1 size-7" />{" "}
      <span>
        MONTREAL_
        {currentTime}
      </span>
    </div>
  );
};

export default ClockComponent;
