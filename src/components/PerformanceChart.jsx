import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import MetricsSelector from './MetricsSelector';
import { useContext, useEffect, useState } from 'react';
import { metricsService } from '../services';
import { AppContext } from '../contexts/AppContext';

// Example formatCurrency function
const formatCurrency = (value) => {
  return value === 0 ? 0 : `${(value / 1000).toFixed(1)}k`; // Converts to thousands with 1 decimal point
};

// Example formatPercentage function
const formatPercentage = (value) => {
  return `${(value * 100).toFixed(0)}%`; // Converts to percentage format (e.g., 0.05 -> 5%)
};

function formatTimeLabels(timeArray) {
  return timeArray.map((time) => {
    // Extract the hour from the time (e.g., "00:00:00" => "0Hr")
    const hour = parseInt(time.split(':')[0], 10);
    return `${hour} Hr`; // Return formatted string like "0Hr", "1Hr", etc.
  });
}

const timeArray = [
  '00:00:00',
  '01:00:00',
  '02:00:00',
  '03:00:00',
  '04:00:00',
  '05:00:00',
  '06:00:00',
  '07:00:00',
  '08:00:00',
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '13:00:00',
  '14:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00',
  '19:00:00',
  '20:00:00',
  '21:00:00',
  '22:00:00',
  '23:00:00',
];

const formattedTimeLabels = formatTimeLabels(timeArray);

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      >
        <p
          className="label"
          style={{ fontWeight: 'bold' }}
        >{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.stroke }}>
            {entry.name}:{' '}
            {entry.value
              ? formatCurrency(entry.value)
              : formatPercentage(entry.value)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const PerformanceChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([
    'CPC',
    'CR_perc',
    'ROAS',
  ]);
  const { selectedStartDate, selectedEndDate, tempSelection } =
    useContext(AppContext);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0'); // pad single digits with leading zero

    // Format the date in YYYY-MM-DD
    return `${year}-${month}-${day}`;
  };

  const getFormattedDates = () => {
    const startDate = selectedStartDate;
    const endDate = selectedEndDate;

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    return { formattedStartDate, formattedEndDate };
  };

  // Example of using the function:
  const { formattedStartDate, formattedEndDate } = getFormattedDates();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { result } = await metricsService.getMetricsPerformanceLineChart(
          formattedStartDate,
          formattedEndDate,
          selectedMetrics
        );
        const { categories, series } = result;

        const transformedData = categories.map((time, index) => {
          const dataPoint = { name: time };
          series.forEach((metric) => {
            if (selectedMetrics.includes(metric.name)) {
              dataPoint[metric.name] = metric.data[index];
            }
          });
          return dataPoint;
        });
        setChartData(transformedData);
      } catch (error) {
        console.log('Error fetching dropdown data:', error);
      }
    };
    fetchChartData();
  }, [selectedMetrics, formattedStartDate, formattedEndDate]);
  return (
    <section className="bg-white rounded-t-lg w-full h-[450px] pb-5">
      <div className="flex justify-between items-center px-3 py-2">
        <div>
          <h2 className="text-base font-medium mb-1">Performance Chart</h2>
          <p className="text-[#9D9D9D] text-xs">
            Key Metrics for Dayparting Schedule Performance Evaluation
          </p>
        </div>
        <MetricsSelector />
      </div>
      <div className="border-t px-4 py-6 w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid
              strokeDasharray="3 5"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#9D9D9D"
              tickLine={false}
              tickMargin={14}
              axisLine={{
                stroke: '#9D9D9D',
              }}
              tick={{ fontSize: 14 }}
              tickFormatter={formattedTimeLabels}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#9D9D9D"
              axisLine={false}
              tickLine={false}
              domain={[0, 24000]}
              tick={{ fontSize: 14 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <YAxis
              yAxisId="right1"
              orientation="right"
              stroke="#9D9D9D"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
              domain={[0, 150000]} // Set domain for the right Y Axis from 25k to 150k
              tickFormatter={(value) => formatCurrency(value)} // Format for right Y Axis
            />
            <YAxis
              yAxisId="right2"
              orientation="right"
              stroke="#9D9D9D"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14 }}
              domain={[0, 0.5]} // Set domain for the right Y Axis from 5% to 50%
              tickFormatter={(value) => formatPercentage(value)} // Format for right Y Axis as percentage
            />

            <Tooltip content={<CustomTooltip />} />

            {selectedMetrics.map((metric, index) => (
              <Line
                key={index}
                yAxisId="left"
                type="monotone"
                dataKey={metric}
                dot={{ r: 5, fill: '#2E8CB8' }}
                stroke={['#2E8CB8', '#BA659C', '#587021'][index % 3]} // Assign colors dynamically
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PerformanceChart;
