import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Text } from 'react-native-svg';

interface BarChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  barColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 300,
  height = 200,
  barColor = '#2A9D8F'
}) => {
  const maxValue = Math.max(...data.map((item) => item.value)); // Find the max value in the dataset
  const barWidth = width / data.length - 10; // Calculate the width of each bar with some margin

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 50); // Scale bar height based on maxValue
          const x = index * (barWidth + 10) + 5; // X position for each bar
          const y = height - barHeight - 50; // Y position for each bar

          return (
            <React.Fragment key={index}>
              {/* Draw the bar */}
              <Rect x={x} y={y} width={barWidth} height={barHeight} fill={barColor} />
              {/* Display value above each bar */}
              <Text x={x + barWidth / 2} y={y - 5} fontSize="12" fill="black" textAnchor="middle">
                {item.value}
              </Text>
              {/* Display title (label) below each bar */}
              <Text
                x={x + barWidth / 2}
                y={height - 30}
                fontSize="12"
                fill="black"
                textAnchor="middle">
                {item.label}
              </Text>
              {/* Display additional title (if needed) below the label */}
              <Text
                x={x + barWidth / 2 - 5}
                y={height - 10}
                fontSize="10"
                fill="gray"
                textAnchor="middle">
                Title {index + 1} {/* Replace with actual title if different */}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});

export default BarChart;
