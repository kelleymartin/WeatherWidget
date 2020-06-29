import WeatherWindPatterns from '../data/weather-wind-patterns.json';
import LappiceByMonth from '../months';

const ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
const ONE_DAY_IN_MILLISECONDS = ONE_HOUR_IN_MILLISECONDS * 24;

function getWeatherInXHours(inXHours) {

  const hourTimestamp = Date.now() + ONE_HOUR_IN_MILLISECONDS * inXHours;
  const hour = Number(new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  }).format(hourTimestamp));
  const hourOffset = (24 + hour - 5) % 24;

  let dayTimestamp = hourTimestamp;
  if (hour < 5 || hour === 24) {
    // The hours from 12am to 5am ("4:59am") count as the previous day's pattern.
    dayTimestamp = dayTimestamp - ONE_DAY_IN_MILLISECONDS;
  }
  const monthString = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit',
    timeZone: 'America/Los_Angeles',
  }).format(new Date(dayTimestamp));
  const dayOffset = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format(new Date(dayTimestamp)) - 1;

  const lappiceDays = LappiceByMonth[monthString].days;
  const patternName = lappiceDays[dayOffset].patternName;

  const weatherPattern = WeatherWindPatterns[patternName].weather;
  return {
    date: `${monthString} ${dayOffset + 1} / ${hour}`,
    isDay: hour >= 5 && hour < 19,
    weather: weatherPattern[hourOffset],
  };
}

export default () => {

  const now = getWeatherInXHours(0);
  const next = getWeatherInXHours(1);
  const prev = getWeatherInXHours(-1);

  const nexts = Array.from({length: 20}, (_, idx) => {
    return getWeatherInXHours(idx);
  });

  return (
    <div>
      <h4>Local weather</h4>
      <div className="time">
        Now: {now.weather} at {now.isDay ? 'day' : 'night'}
        Next: {next.weather} at {next.isDay ? 'day' : 'night'}
        Before: {prev.weather} at {prev.isDay ? 'day' : 'night'}
        {
          nexts.map((n, idx) => (
            <div>
              At #{idx} ({n.date}): {n.weather} at {n.isDay ? 'day' : 'night'}
            </div>
          ))
        }
      </div>
      <style jsx global>{`
      html,
      body {
        padding: 0px;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  );
};
