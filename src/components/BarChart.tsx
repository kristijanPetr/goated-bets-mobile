import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Text, Line } from 'react-native-svg';

interface BarChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  barColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, width = 300, height = 200 }) => {
  const maxValue = Math.max(...data.map((item) => item.value)); // Find the max value in the dataset
  const meanValue = data.reduce((acc, item) => acc + item.value, 0) / data.length; // Calculate the mean value
  const barWidth = width / data.length - 10; // Calculate the width of each bar with some margin

  const meanY = (1 - meanValue / (maxValue || 1)) * (height - 70); // Y-position of the mean line

  return (
    <View
      style={[
        styles.container,
        {
          width: '100%',
          height,
          paddingHorizontal: 20
        }
      ]}>
      <Svg width={'100%'} height={height}>
        {data.map((item, index) => {
          const barHeight = (item.value / (maxValue || 1)) * (height - 70); // Scale bar height based on maxValue
          const x = index * (barWidth + 5) + 5; // X position for each bar
          const y = height - barHeight - 50; // Y position for each bar

          return (
            <React.Fragment key={index}>
              {/* Draw the bar */}
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.value < meanValue ? '#F8696B' : '#63BE7B'}
              />
              {/* Display value above each bar */}
              <Text
                x={x + barWidth / 2}
                y={y - 5}
                fontSize="12"
                fill={item.value < meanValue ? '#F8696B' : '#63BE7B'}
                textAnchor="middle">
                {item.value}
              </Text>
              {/* Display title (label) below each bar */}
              <Text
                x={x + barWidth / 2}
                y={height - 30}
                fontSize="8"
                fill="grey"
                textAnchor="middle">
                {item.label}
              </Text>
            </React.Fragment>
          );
        })}

        <Line
          x1="0"
          y1={meanY}
          x2={width}
          y2={meanY}
          stroke="white"
          strokeWidth=".7"
          strokeDasharray={'2,2'}
        />
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
