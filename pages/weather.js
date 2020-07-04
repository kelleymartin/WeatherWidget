import WeatherWindPatterns from '../data/weather-wind-patterns.json';
import LappiceByMonth from '../months';

const ONE_HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
const ONE_DAY_IN_MILLISECONDS = ONE_HOUR_IN_MILLISECONDS * 24;

const NICE_NAMES = {
  'Sunny': {
    day: 'Sunny',
    night: 'Moonlit',
  },
  // 'Cloudy': 'Chance of Meatballs',
};

function getDisplayName(weatherName, isDay) {
  const niceName = NICE_NAMES[weatherName];
  if (!niceName) {
    return weatherName;
  }

  if (typeof niceName === 'string') {
    return niceName;
  }
  return niceName[isDay ? 'day' : 'night'];
}

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
  const isDay = hour >= 5 && hour < 19;
  const weatherName = weatherPattern[hourOffset];
  return {
    isDay,
    weather: weatherName,
    label: getDisplayName(weatherName, isDay),
  };
}

function WeatherIcon({ weather, size }) {
  // 'Heavy Rain' -> 'HeavyRain'
  const noSpaceWeather = weather.weather.replace(/ /g, '');

  // 'HeavyRain' -> 'h' + 'eavyRain' -> 'heavyRain'
  const camelWeather = noSpaceWeather[0].toLowerCase() + noSpaceWeather.slice(1);

  const filename = `/weather-icons/${camelWeather}${weather.isDay ? 'Day' : 'Night'}.svg`;
  return <img src={filename} alt={weather.label} title={weather.label} width={size} height={size} />;
}

export default () => {

  const now = getWeatherInXHours(0);
  const nowPlus1 = getWeatherInXHours(1);
  const nowPlus2 = getWeatherInXHours(2);

  const nowLabel = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format();
  const nowPlus1Label = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format(Date.now() + ONE_HOUR_IN_MILLISECONDS);
  const nowPlus2Label = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format(Date.now() + 2 * ONE_HOUR_IN_MILLISECONDS);

  return (
    <div className="wrapper">
      <div className="icon-hero">
        <WeatherIcon weather={now} size={80} />
      </div>
      <div className="time-current">{nowLabel}</div>
      <div className="time-next1">{nowPlus1Label}</div>
      <div className="time-next2">{nowPlus2Label}</div>
      <div className="weather-pattern">
        {now.label}
      </div>
      <div className="icon-next1">
        <WeatherIcon weather={nowPlus1} size={60} />
      </div>
      <div className="icon-next2">
        <WeatherIcon weather={nowPlus2} size={60} />
      </div>
      <div className="hemisphere">Northern Hemisphere</div>
      <style jsx global>{`
      html,
      body {
        padding: 0px;
        margin: 0;
        font-family: Ubuntu, sans-serif;
        font-size: 16px;
        font-weight: 400;
        width: 390px;
        height: 80px;
      }

      .wrapper {
        display: grid;
        grid-template-columns: 80px 160px 80px 80px;
        grid-template-rows: 15px 50px 15px;
        grid-template-areas:
        "a b c d"
        "a e f g"
        "a h f g"
      }

      .icon-hero {
        grid-area: a;
      }

      .icon-next1 {
        align-self: center;
        grid-area: f;
      }

      .icon-next2 {
        align-self: center;
        grid-area: g;
      }

      .weather-pattern {
        grid-area: e;
        font-family: Ubuntu, sans-serif;
        font-size: 20px;
        font-weight: 700;
        align-self: center;
      }

      .hemisphere {
        grid-area: h;
        font-family: Ubuntu, sans-serif;
        font-size: 16px;
        font-weight: 400;
        align-self: end;
      }

      .time-current {
        grid-area: b;
        align-self: start;
      }

      .time-next1 {
        grid-area: c;
        align-self: start;
        justify-self: center;
      }

      .time-next2 {
        grid-area: d;
        align-self: start;
        justify-self: center;
      }
      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  );
};
