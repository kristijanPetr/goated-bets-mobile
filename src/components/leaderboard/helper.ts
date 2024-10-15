import { PlayerData } from './PlayersList';

export const generateL10 = (
  point: any,
  price: any,
  name: any,
  hitrate: any,
  id: any,
  key: any,
  singleton: any,
  cache: any
) => {
  if (hitrate && id && hitrate !== '{}') {
    const data = singleton.ms_calc_ev_hr(point, price, name, id, hitrate, key, 10, cache);

    return data;
  }
  return 'N/A';
};

export const generateStreak = (
  point: any,
  name: any,
  hitrate: any,
  id: any,
  key: any,
  singleton: any,
  cache: any
) => {
  if (hitrate && id && hitrate !== '{}') {
    const data = singleton.ms_calc_hitrate_raw(point, name, id, hitrate, key, 10, cache);

    return data;
  }
  return 'N/A';
};

export const getPlayerData = (ticker: any, data: any, singleton: any) => {
  const playerData: PlayerData[] = [];
  ticker.lineups.forEach((lineup: any) => {
    const playerAttributes = lineup.player.attributes;
    const performanceAttributes = lineup.performance.attributes;
    const matchup = `${ticker.awayName} @ ${ticker.homeName}`;
    Object.entries(lineup.propositions).forEach(([key, proposition]: [string, any]) => {
      const statsArray = Object.values(proposition.raw);
      statsArray.forEach((stat: any, index: number) => {
        playerData.push({
          playerInfo: {
            name: playerAttributes.name['='],
            avatar: playerAttributes.avatar['='],
            position: playerAttributes.position['=']
          },
          matchup,
          stats: { ...stat, key: key },
          performance: getPerformance(
            stat.price,
            stat.point,
            stat.name,
            performanceAttributes.hitrate['='],
            performanceAttributes.id['='],
            data.mapMarketsToAttributes[data.sport][key],
            singleton,
            {}
          ),
          id: `${playerAttributes.name['=']}${key}${index}`
        });
      });
    });
  });
  return playerData;
};

export const getPerformance = (
  price: any,
  point: any,
  name: string,
  hitrate: any,
  id: string,
  key: string,
  singleton: any,
  cache: any
) => {
  return {
    L10: generateL10(price, point, name, hitrate, id, key, singleton, cache),
    streak: generateStreak(point, name, hitrate, id, key, singleton, cache)
  };
};

export const filterPlayerData = (
  playerData: PlayerData[],
  searchFilter: string,
  statsSelected: string[],
  filterSelected: string,
  data: any
) => {
  return playerData
    .filter(
      ({ playerInfo }) =>
        searchFilter === '' || playerInfo.name.toLowerCase().includes(searchFilter.toLowerCase())
    )
    .filter(
      ({ stats }) =>
        statsSelected.length === 0 ||
        statsSelected.includes(data?.mapMarketsToTitles?.[data.sport]?.[stats.key])
    )
    .sort((a, b) => {
      switch (filterSelected) {
        case 'playerProp':
          return a.playerInfo.name.localeCompare(b.playerInfo.name);
        case 'L10':
          return b.performance.L10 - a.performance.L10;
        case 'streak':
          return b.performance.streak - a.performance.streak;
        case 'odds':
          return b.stats.price - a.stats.price;
        default:
          return 0;
      }
    });
};
