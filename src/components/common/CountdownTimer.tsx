import { useState, useEffect, useCallback } from 'react';

interface CountdownTimerProps {
  readonly endDate: Date;
  readonly className?: string;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(endDate: Date): TimeLeft {
  const now = new Date().getTime();
  const distance = endDate.getTime() - now;

  if (distance <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: Math.floor(distance / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

function padTime(num: number): string {
  return num.toString().padStart(2, '0');
}

export default function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(endDate));

  const tick = useCallback(() => {
    setTimeLeft(calculateTimeLeft(endDate));
  }, [endDate]);

  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className={`flex items-center gap-2 ${className}`} role="timer" aria-label="Compte à rebours">
      {[
        { value: timeLeft.hours, label: 'H' },
        { value: timeLeft.minutes, label: 'MIN' },
        { value: timeLeft.seconds, label: 'SEC' },
      ].map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span
              className={`inline-flex items-center justify-center min-w-[48px] h-12 rounded-lg font-bold text-lg ${
                isExpired
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-primary text-white'
              } transition-colors`}
              aria-label={`${item.value} ${item.label}`}
            >
              {padTime(item.value)}
            </span>
            <span className="text-[10px] font-semibold text-muted mt-1 tracking-wider">{item.label}</span>
          </div>
          {index < 2 && <span className="text-primary font-bold text-lg self-start mt-2" aria-hidden="true">:</span>}
        </div>
      ))}
    </div>
  );
}
