const data = [
  // Replace this with your heat map data array
  {
    day: 'Sunday',
    hours: [
      { time: '12am', imp: 4372095, clicks: 27494, cpm: '₹64.42' },
      { time: '1am', imp: 5225709, clicks: 31482, cpm: '₹83.31' },
      // Add more hours for each day...
    ],
  },
  {
    day: 'Monday',
    hours: [
      { time: '12am', imp: 5225709, clicks: 31482, cpm: '₹83.31' },
      { time: '1am', imp: 6328926, clicks: 11406, cpm: '₹113.38' },
      // Add more hours for each day...
    ],
  },
];

const HeatMap = () => {
  return (
    <div className="heatmap">
      {/* Table Header */}
      <div className="grid header">
        <div className="cell empty"></div>
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="cell">
            {i === 0 ? '12am' : i < 12 ? `${i}am` : `${i - 12}pm`}
          </div>
        ))}
      </div>

      {/* Table Body */}
      {data.map((day, dayIndex) => (
        <div key={dayIndex} className="grid row">
          <div className="cell day">{day.day}</div>
          {day.hours.map((hour, hourIndex) => (
            <div key={hourIndex} className={`cell`}>
              <div>Imp: {hour.imp}</div>
              <div>Clicks: {hour.clicks}</div>
              <div>CPM: {hour.cpm}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HeatMap;
