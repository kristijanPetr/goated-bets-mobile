import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Line, Rect, Text } from 'react-native-svg';

interface BarChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  barColor?: string;
  meanValue: number;
  showWinOrLose?: boolean;
  hasRevertedColors?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 300,
  height = 200,
  meanValue = 0,
  showWinOrLose = false,
  hasRevertedColors = false
}) => {
  const maxValue = Math.max(...data.map((item) => item.value)); // Find the max value in the dataset
  const barWidth = width / data.length - 10; // Calculate the width of each bar with some margin
  const meanYPosition = height - (meanValue / (maxValue || 1)) * (height - 70) - 50; // Calculate Y position for meanValue

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
          const fillColor = hasRevertedColors
            ? item.value > meanValue
              ? '#F8696B'
              : '#63BE7B'
            : item.value < meanValue
              ? '#F8696B'
              : '#63BE7B';
          return (
            <React.Fragment key={index}>
              {/* Draw the bar */}
              <Rect x={x} y={y} width={barWidth} height={barHeight} fill={fillColor} />
              {/* Display value above each bar */}
              <Text
                x={x + barWidth / 2}
                y={barHeight < 1 ? height - 55 : y - 5}
                fontSize="12"
                fill={fillColor}
                textAnchor="middle">
                {showWinOrLose ? (item.value === 1 ? 'W' : 'L') : item.value}
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

        {/* Mean value line */}
        <Line
          x1="0"
          y1={meanYPosition}
          x2={width}
          y2={meanYPosition}
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
