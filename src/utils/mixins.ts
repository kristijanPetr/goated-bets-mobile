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

  getHeatmapColor
};
const colors: string[] = [
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

function getHeatmapColor(
  value: number | string,
  prop: 'percentage' | 'number',
  reverseColors?: boolean
): string {
  let index: number;
  if (prop === 'percentage') {
    // Convert percentage (0-100) to an index between 0 and 9
    index = Math.floor((parseInt((value as string).replace('%', '')) / 100) * 9);
  } else if (prop === 'number') {
    // Convert positive integer to an index between 0 and 9
    index = Math.min(value as number, 9); // Ensure it doesn't exceed 9
  } else {
    index = 0;
  }

  // Ensure index is within bounds
  index = Math.max(0, Math.min(index, 9));

  return reverseColors ? colors.reverse()[index] : colors[index];
}
