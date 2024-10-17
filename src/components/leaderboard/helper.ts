import { PlayerData } from './PlayersList';

export const generateL10 = (
  point: any,
  price: any,
  name: any,
  hitrate: any,
  id: any,
  key: any,
  singleton: any,
  cache: any,
  size = 10
) => {
  if (hitrate && id && hitrate !== '{}') {
    const data = singleton.ms_calc_hitrate(price, name, id, hitrate, key, size, cache);
    return data;
  }
  return 'N/A';
};

export const generateStreak = (
  price: any,
  name: any,
  hitrate: any,
  id: any,
  key: any,
  singleton: any,
  cache: any
) => {
  if (hitrate && id && hitrate !== '{}') {
    const streakData = JSON.parse(hitrate)[key];

    return singleton.ms_calc_streaks(streakData, name, price, -1);
  }
  return 'N/A';
};

export const generateSeason = (point: any, name: any, hitrate: any, id: any, key: any) => {
  if (hitrate && id && hitrate !== '{}') {
    const streakData = JSON.parse(hitrate)[key];
    const seasonData = JSON.parse(hitrate)['season'];
    const currentYear = new Date().getFullYear();

    if (!seasonData || !streakData) return 'N/A';
    const arr: any[] = [];
    seasonData.forEach((item: string, index: number) => {
      if (parseInt(item) === currentYear - 2024 + 1) {
        return arr.push(streakData[index]);
      }
    });

    let total = 0;
    const condition = name === 'Over' ? (n: number) => n >= point : (n: number) => n <= point;
    arr.forEach((item: number) => {
      if (condition(item)) {
        total++;
      }
    });
    return `${((total / arr.length) * 100).toFixed(0)}%`;
  }
  return 'N/A';
};

export const generateH2H = (point: any, name: any, hitrate: any, id: any, key: any) => {
  if (hitrate && id && hitrate !== '{}') {
    const streakData = JSON.parse(hitrate)[key];
    const seasonData = JSON.parse(hitrate)['season'];
    const h2hData = JSON.parse(hitrate)['h2h'];
    const currentYear = new Date().getFullYear();

    if (!seasonData || !streakData) return 'N/A';
    const arr: any[] = [];
    seasonData.forEach((item: string, index: number) => {
      if (parseInt(item) === currentYear - 2024 + 1 && h2hData[index] === item) {
        return arr.push(streakData[index]);
      }
    });

    let total = 0;
    const condition = name === 'Over' ? (n: number) => n >= point : (n: number) => n <= point;
    arr.forEach((item: number) => {
      if (condition(item)) {
        total++;
      }
    });
    return `${((total / arr.length) * 100).toFixed(0)}%`;
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
        let newKey = key;
        if (key === 'batter_runs_scored') {
          newKey = 'batter_runs';
        }
        if (key === 'batter_rbis') {
          newKey = 'batter_runs_batted_in';
        }
        playerData.push({
          playerInfo: {
            name: playerAttributes.name['='],
            avatar: playerAttributes.avatar['='],
            position: playerAttributes.position['=']
          },
          matchup,
          stats: { ...stat, key },
          performance: getPerformance(
            stat.price,
            stat.point,
            stat.name,
            performanceAttributes.hitrate['='],
            performanceAttributes.id['='],
            newKey,
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
    L5: generateL10(price, point, name, hitrate, id, key, singleton, cache, 5),
    L10: generateL10(price, point, name, hitrate, id, key, singleton, cache),
    streak: generateStreak(point, name, hitrate, id, key, singleton, cache),
    season: generateSeason(point, name, hitrate, id, key),
    h2h: generateH2H(point, name, hitrate, id, key)
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
        statsSelected.includes(data?.mapMarketsToAttributes?.[data.sport]?.[stats.key])
    )
    .sort((a, b) => {
      switch (filterSelected) {
        case 'playerProp':
          return a.playerInfo.name.localeCompare(b.playerInfo.name);
        case 'l5':
          let aPerformance5 = a.performance.L5.split('%')[0];
          let bPerformance5 = b.performance.L5.split('%')[0];

          return bPerformance5 - aPerformance5;
        case 'l10':
          let aPerformance10 = a.performance.L10.split('%')[0];
          let bPerformance10 = b.performance.L10.split('%')[0];

          return bPerformance10 - aPerformance10;
        case 'season':
          let aPerformanceS = a.performance.season.split('%')[0];
          let bPerformanceS = b.performance.season.split('%')[0];

          return bPerformanceS - aPerformanceS;
        case 'h2h':
          let aPerformanceh2h = a.performance.h2h.split('%')[0];
          let bPerformanceh2h = b.performance.h2h.split('%')[0];

          return bPerformanceh2h - aPerformanceh2h;
        case 'streak':
          return b.performance.streak - a.performance.streak;
        case 'odds':
          return b.stats.price - a.stats.price;
        default:
          return 0;
      }
    });
};
