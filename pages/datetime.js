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
    <div className="box">
      <h4>Local time</h4>
      <div className="time">
        {timeString}
        {" "}
        {dateString}
      </div>
      <style jsx>{`
      .box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 220px;
        height: 105px;

      }
      .time {
        color: #333;
        font-size: 20px;
        font-weight: 400;
        text-align: center;
      }
      h4 { 
        color: #bd8163;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        margin: 0px;
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
