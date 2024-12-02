import apiClient from './apiClient';

const getMetricsDropdown = async () => {
  const authToken = localStorage.getItem('authToken');

  const { data } = await apiClient.post(
    '/api/day-parting/DayPartingFilterList',
    {
      type: 'customizeMetrics',
    },
    {
      headers: {
        'X-USER-IDENTITY':
          'U2FsdGVkX1+GZ5mnAUMis4VC8jL5g2BdcRai8iXYI29OIStJwwzI4Wf6H8+/nJjEDGl4ly0lR3JXZddDjqwuWaZMDyCIOc4WW586U//KMIUVsM2kMN3KMJf8eGAcW7X0aRgkNwkQKVlyZNf1sQqvusuFbb3XFl5GP+otaIQh7NrOgEMvBxMYmiA9OIla8iLAbKkHVCdAIFW+/qjDlZWq6u5fs9k266mMdr4UuFxvEDS6U0+xjei5BdwUaZvWmlETmKDT4JtLHVcTECPxcxHJllRClmUPcnjC5xRJV0mfsG1sRpHLHDW5o5GanBbdQU5yDYrJEj/OYXrYySZ2tzQu/b6EqzTguqNISSNhjxNtSlK3MXBisf5aSZQanXxIpKoYkXaNmo2k45y1tl0xe66TWw==',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};

const getMetricsPerformanceLineChart = async (startDate, endDate, metrics) => {
  const authToken = localStorage.getItem('authToken');

  const { data } = await apiClient.post(
    '/api/day-parting/DayPartingPerformanceGraphList',
    {
      startDate,
      endDate,
      metrics,
    },
    {
      headers: {
        'X-USER-IDENTITY':
          'U2FsdGVkX1+GZ5mnAUMis4VC8jL5g2BdcRai8iXYI29OIStJwwzI4Wf6H8+/nJjEDGl4ly0lR3JXZddDjqwuWaZMDyCIOc4WW586U//KMIUVsM2kMN3KMJf8eGAcW7X0aRgkNwkQKVlyZNf1sQqvusuFbb3XFl5GP+otaIQh7NrOgEMvBxMYmiA9OIla8iLAbKkHVCdAIFW+/qjDlZWq6u5fs9k266mMdr4UuFxvEDS6U0+xjei5BdwUaZvWmlETmKDT4JtLHVcTECPxcxHJllRClmUPcnjC5xRJV0mfsG1sRpHLHDW5o5GanBbdQU5yDYrJEj/OYXrYySZ2tzQu/b6EqzTguqNISSNhjxNtSlK3MXBisf5aSZQanXxIpKoYkXaNmo2k45y1tl0xe66TWw==',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};

const getMetricsHeatmapTable = async (startDate, endDate, metrics) => {
  const authToken = localStorage.getItem('authToken');

  const { data } = await apiClient.post(
    '/api/day-parting/heatmap-list',
    {
      startDate,
      endDate,
      metrics,
    },
    {
      headers: {
        'X-USER-IDENTITY':
          'U2FsdGVkX1+GZ5mnAUMis4VC8jL5g2BdcRai8iXYI29OIStJwwzI4Wf6H8+/nJjEDGl4ly0lR3JXZddDjqwuWaZMDyCIOc4WW586U//KMIUVsM2kMN3KMJf8eGAcW7X0aRgkNwkQKVlyZNf1sQqvusuFbb3XFl5GP+otaIQh7NrOgEMvBxMYmiA9OIla8iLAbKkHVCdAIFW+/qjDlZWq6u5fs9k266mMdr4UuFxvEDS6U0+xjei5BdwUaZvWmlETmKDT4JtLHVcTECPxcxHJllRClmUPcnjC5xRJV0mfsG1sRpHLHDW5o5GanBbdQU5yDYrJEj/OYXrYySZ2tzQu/b6EqzTguqNISSNhjxNtSlK3MXBisf5aSZQanXxIpKoYkXaNmo2k45y1tl0xe66TWw==',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return data;
};

export const metricsService = {
  getMetricsDropdown,
  getMetricsPerformanceLineChart,
  getMetricsHeatmapTable,
};
