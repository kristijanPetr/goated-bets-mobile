export const calculateData = (
  selectedStat: string,
  singleton: any,
  item: any,
  side: string,
  attribute: string | null,
  type: string
) => {
  const { gamelines, matchup } = item;
  const statMap: { [key: string]: number | string } = {
    L5: 5,
    L10: 10,
    L25: 25,
    Seasson: 'Seasson',
    H2H: 'H2H'
  };

  let selectedStatData = statMap[selectedStat] || 10;
  const data = singleton.ms_calculate_hitrate_team(
    matchup.attributes[side]['='],
    matchup.attributes.hitrate['='],
    attribute
      ? attribute === 'total_under'
        ? gamelines[attribute].upoint
        : gamelines[attribute].opoint
      : null,
    type,
    selectedStatData
  );
  if (!data) return 'N/A';
  if (data === 'N/A') return data;

  const splitNumbers = data.split('/');
  return `${(((splitNumbers[0] * 1) / (splitNumbers[1] * 1)) * 100).toFixed(0)}%`;
};
