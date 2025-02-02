---
title: "Building an Interactive Dashboard with React and D3.js"
description: "Create a responsive dashboard with interactive data visualizations using React and D3.js"
pubDate: 2024-03-28
category: "Projects"
author: "Dev Elevate Team"
tags: ["frontend", "react", "d3", "typescript"]
---

# Building an Interactive Dashboard with React and D3.js

In this project, we'll build a responsive dashboard that displays data visualizations using React and D3.js. The dashboard will include various charts, real-time updates, and interactive features.

## Project Overview

- **Tech Stack**: React, TypeScript, D3.js, Tailwind CSS
- **Difficulty**: Intermediate
- **Time**: 4-6 hours

## Features

1. Line chart for time series data
2. Bar chart for comparison data
3. Pie chart for distribution data
4. Real-time data updates
5. Interactive tooltips
6. Responsive layout

## Implementation

### 1. Chart Components

First, let's create a reusable line chart component:

```typescript
// components/LineChart.tsx
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 30, left: 40 }
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([height - margin.bottom, margin.top]);

    // Create line generator
    const line = d3.line<DataPoint>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Create SVG
    const svg = d3.select(svgRef.current);

    // Add line path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add tooltips
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '5px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '4px');

    // Add interactive dots
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.value))
      .attr('r', 4)
      .attr('fill', '#4f46e5')
      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .html(`Date: ${d.date.toLocaleDateString()}<br/>Value: ${d.value}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  }, [data, width, height, margin]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="bg-white rounded-lg shadow-md"
    />
  );
};
```

### 2. Dashboard Layout

Create the main dashboard component:

```typescript
// components/Dashboard.tsx
import { useState, useEffect } from 'react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { PieChart } from './PieChart';

interface DashboardProps {
  refreshInterval?: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ refreshInterval = 5000 }) => {
  const [data, setData] = useState<any>({
    timeSeriesData: [],
    comparisonData: [],
    distributionData: []
  });

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up periodic refresh
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const fetchData = async () => {
    try {
      // Simulate API call
      const response = await fetch('/api/dashboard-data');
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Time Series Data</h2>
          <LineChart
            data={data.timeSeriesData}
            width={500}
            height={300}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Comparison Data</h2>
          <BarChart
            data={data.comparisonData}
            width={500}
            height={300}
          />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Distribution Data</h2>
          <PieChart
            data={data.distributionData}
            width={500}
            height={300}
          />
        </div>

        {/* Stats Summary */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Add summary statistics */}
          </div>
        </div>
      </div>
    </div>
  );
};
```

## Project Structure

```
src/
  components/
    LineChart.tsx
    BarChart.tsx
    PieChart.tsx
    Dashboard.tsx
  hooks/
    useResizeObserver.ts
  types/
    dashboard.ts
  utils/
    formatters.ts
  App.tsx
```

## Key Learning Points

1. D3.js integration with React
2. TypeScript type definitions
3. Responsive chart design
4. Real-time data updates
5. Interactive data visualization
6. Component composition

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred hosting platform (e.g., Vercel, Netlify)

## Next Steps

1. Add more chart types
2. Implement data filters
3. Add export functionality
4. Enhance animations
5. Add unit tests

Remember to handle edge cases and add proper error boundaries around the visualization components!