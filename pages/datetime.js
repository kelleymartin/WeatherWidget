export default () => {
  
  const dateString = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'long', weekday: 'long', day: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format();

  const timeString = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric', minute: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format();

  return (
    <div>
      <h4>Local time</h4>
      <div className="time">
        {timeString}
        {" "}
        {dateString}
      </div>
      <style jsx>{`
      .time {
        color: #333;
        font-size: 20px;
        font-weight: normal;
        text-align: center;
        vertical-align: bottom;
        width: 205px;
      }
      h4 { 
        color: #bd8163;
        font-size: 20px;
        font-weight: medium;
        text-align: center;
        vertical-align: top;
      }`}

      </style>
      <style jsx global>{`
      html,
      body {
        padding: 0px;
        margin: 0;
        font-family: Ubuntu, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </div>
  );
};
