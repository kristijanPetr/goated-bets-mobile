export const variables = {
  colors: {
    backgroundLinearDark: '#000000',
    backgroundLinearBright: '#3E3E3E',
    loginBackgroundColor: '#050629',
    black: '#000000',
    white: '#FFFFFF',
    grey: '#1F1F1F',
    betSlipCircleBlue: '#0078FF',
    betSlipBackground: '#F3F3F3',
    betSlipSendButtonBackground: '#D9D9D9',
    activeGrey: '#B5B5B5',
    lightGrey: '#282828',
    statsYellow: '#FEDC81',
    statsRed: '#F8696B',
    statsGreen: '#A9D27F',
    headerYellow: '#F9AB23'
  },
  colorHeatMap: getColorByProp
};
const colors = [
  '#f8696b',
  '#f98570',
  '#fba276',
  '#fdbf7b',
  '#fedc82',
  '#efe683',
  '#ccde82',
  '#a9d27f',
  '#86c97d',
  '#63be7b'
];
function getColorByProp(
  value: number | string,
  propType: 'streak' | 'l5' | 'l10' | 'hitrate',
  reverseColors: boolean = false
) {
  // Define color ranges for each property
  let scaleValue;

  switch (propType) {
    case 'streak':
      // For streak, map the value to the 1-10 scale
      const [left, right] = (value as string).split('/');
      if (right === '0') scaleValue = 1;
      else {
        scaleValue = Math.min(Math.max((parseInt(left) / parseInt(right)) * 10, 1), 10); // Scale streak to 1-10
      }

      break;

    case 'l5': // Last 5 games (e.g., 0-5)
    case 'l10':
      const parsedValue = (value as string).replace('%', '');
      scaleValue = Math.min(Math.max(parseInt(parsedValue), 1), 10); // Ensure within 1-5
      scaleValue = (scaleValue / 10) * 10; // Scale up to 1-10

      break;

    case 'hitrate': // Hit rate (e.g., percentage from 0 to 100)
      scaleValue = Math.min(Math.max(parseInt(value as string) / 10, 1), 10); // Scale hitrate to 1-10
      break;

    default:
      return '#ccc'; // Default color for unknown properties
  }
  if (reverseColors) {
    scaleValue = 10 - scaleValue;
  }
  return colors[Math.floor(scaleValue) - 1]; // Return color based on scaled value (1-10)
}
