import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Layout, PlotData, Config } from 'plotly.js'; // Importing Plotly's types
import dynamic from 'next/dynamic';
interface DataPoint {
  x: number;
  y: number;
}

const InteractivePlot: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  // Generate random data points for demonstration
  const generateRandomData = () => {
    const data: DataPoint[] = [];
    for (let i = 0; i < 20; i++) {
      data.push({ x: i, y: Math.floor(Math.random() * 100) });
    }
    setChartData(data);
  };

  useEffect(() => {
    generateRandomData(); // Generate random data on component mount
  }, []);

  // Define the data for the plot
  const plotData: Partial<PlotData>[] = [
    {
      x: chartData.map((point) => point.x),
      y: chartData.map((point) => point.y),
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: '#BB86FC' }, // Magenta color for the markers
      line: { color: '#8E44AD' }, // Purple for the lines
    },
  ];

  // Define the layout for the plot
  const layout: Partial<Layout> = {
    xaxis: {
      title: { text: 'X Axis', font: { family: 'Poppins, sans-serif', color: 'rgba(255, 255, 255, 0.6)' } },
      color: 'rgba(187, 134, 252, 0.6)', // Faded axis line color
      tickcolor: 'rgba(255, 255, 255, 0.4)', // Faded tick marks color
      gridcolor: 'transparent', // Remove gridlines
    },
    yaxis: {
      title: { text: 'Y Axis', font: { family: 'Poppins, sans-serif', color: 'rgba(255, 255, 255, 0.6)' } },
      color: 'rgba(187, 134, 252, 0.6)', // Faded axis line color
      tickcolor: 'rgba(255, 255, 255, 0.4)', // Faded tick marks color
      gridcolor: 'transparent', // Remove gridlines
    },
    plot_bgcolor: 'transparent', // Transparent background
    paper_bgcolor: 'transparent', // Transparent outer background
    responsive: true,
  };
  
  
  

  // Define the configuration for the plot
  const config: Partial<Config> = {
    responsive: true,
  };

  return (
    <div
    className="flex flex-col items-center justify-center m-6 p-6 max-w-full"
    style={{ width: '100%', maxWidth: '800px' }} // Limiting the max width to prevent it from overflowing
    >
        {/* <h2 className="text-2xl font-semibold mb-4 text-center">
            Interactive ML Graph with Plotly
        </h2> */}
        <Plot
            data={plotData} // Use the correctly typed `data`
            layout={layout} // Use the correctly typed `layout`
            config={config} // Use the correctly typed `config`
            style={{ width: '150%', height: '600px' }} // Ensure it is responsive
        />
    </div>

  );
};

export default InteractivePlot;
