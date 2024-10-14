////////////////////////////////////////////////////////////////////////////////

// @define
const data = {
  // @readme: Settings.
  view: 'matchups', // matchups, players, leaderboard
  sport: 'mlb', // nba, mlb, nfl // @todo: Set based on date, save preference to localStorage.
  bookmaker: 'fanduel', // fanduel, draftkings
  yyyymmdd: (() => {
    let now = new Date()
      .toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
      .split(',')
      .shift()
      .split('/');

    console.log('now', now);
    return now[2] + '' + now[0].padStart(2, '0') + '' + now[1].padStart(2, '0');
  })(),
  today: (() => {
    let now = new Date()
      .toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
      .split(',')
      .shift()
      .split('/');
    return now[2] + '' + now[0].padStart(2, '0') + '' + now[1].padStart(2, '0');
  })(),
  slipIndex: '0',
  setIntervalAll: null,
  setIntervalAllDataUpdated: null,
  betPlaceMutex: false,
  updateAllTickers: false,

  // @readme: Site sidebar navigation.
  carouselSport: {
    nba: 'mlb',
    mlb: 'nfl',
    nfl: 'nba'
  },
  carouselBookmaker: {
    fanduel: 'draftkings',
    draftkings: 'fanduel'
  },

  // @readme: Cached internal objects.
  teamsX: {}, // navigator.dom.root.lists['membersdb.teams'].xitems
  tickers: [], // navigator.dom.root.lists['membersdb.matchups'].items
  tickersX: {}, // ticker['matchup'].attributes['id']['='] as keys
  ticker: null,

  // @readme: Cached internal objects (mutexes).
  initTeamsX: {}, // requests only once, one at a time (keys: nba, nfl, mlb)
  initTickers: null, // sport_yyyymmdd_bookmaker or refreshes tickers, tickersX

  // @readme: Values for sport-specific markets and labels.
  mapGamelinesToTitles: {
    // Odds API
    nba: {
      total_over: 'Points',
      away_spread: 'Spread',
      home_spread: 'Spread',
      away_h2h: 'Win',
      home_h2h: 'Win'
    },
    nfl: {
      total_over: 'Points',
      away_spread: 'Spread',
      home_spread: 'Spread',
      away_h2h: 'Win',
      home_h2h: 'Win'
    }, // @check: nfl
    mlb: {
      total_over: 'Runs',
      away_spread: 'Spread',
      home_spread: 'Spread',
      away_h2h: 'Win',
      home_h2h: 'Win'
    }
  },
  mapMarketsToTitles: {
    // Odds API
    nba: {
      player_points: 'Points',
      player_rebounds: 'Rebounds',
      player_assists: 'Assists',
      player_threes: '3PM',
      player_blocks: 'Blocks',
      player_steals: 'Steals'
    },
    nfl: {
      player_pass_yds: 'Pass yards',
      player_rush_yds: 'Rush yards',
      player_reception_yds: 'Receiving yards',
      player_field_goals: 'Field goals'
    }, // @check: nfl
    mlb: {
      batter_home_runs: 'Home Runs',
      batter_hits: 'Hits',
      batter_total_bases: 'Total Bases',
      batter_rbis: 'RBIs',
      batter_runs_scored: 'Runs Scored',
      batter_singles: 'Singles',
      batter_doubles: 'Doubles',
      batter_triples: 'Triples',
      batter_stolen_bases: 'Stolen Bases',
      pitcher_strikeouts: 'Strikeouts'
    }
  },
  mapMarketsToTitlesShort: {
    // Odds API
    nba: {
      player_points: 'PTS',
      player_rebounds: 'REB',
      player_assists: 'AST',
      player_threes: '3PM',
      player_blocks: 'BLK',
      player_steals: 'STL'
    },
    nfl: {
      player_pass_yds: 'YPAS',
      player_rush_yds: 'YRSH',
      player_reception_yds: 'YREC',
      player_field_goals: 'FG'
    }, // @check: nfl
    mlb: {
      batter_home_runs: 'HR',
      batter_hits: 'H',
      batter_total_bases: 'TB',
      batter_rbis: 'RBI',
      batter_runs_scored: 'R',
      batter_singles: '1B',
      batter_doubles: '2B',
      batter_triples: '3B',
      batter_stolen_bases: 'SB',
      pitcher_strikeouts: 'K'
    }
  },
  mapMarketsToAttributes: {
    // Odds API -> GoalServe
    nba: {
      player_points: 'points',
      player_rebounds: 'total_rebounds',
      player_assists: 'assists',
      player_threes: 'threepoint_goals_made',
      player_blocks: 'blocks',
      player_steals: 'steals'
    },
    nfl: {
      player_pass_yds: 'passing_yards',
      player_rush_yds: 'rushing_yards',
      player_reception_yds: 'receiving_yards',
      player_field_goals: 'kicking_field_goals'
    }, // @check: nfl
    mlb: {
      batter_home_runs: 'batter_home_runs',
      batter_hits: 'batter_hits',
      batter_total_bases: 'batter_total_bases',
      batter_rbis: 'batter_runs_batted_in',
      batter_runs_scored: 'batter_runs',
      batter_singles: 'batter_singles',
      batter_doubles: 'batter_doubles',
      batter_triples: 'batter_triples',
      batter_stolen_bases: 'batter_stolen_bases',
      pitcher_strikeouts: 'pitcher_strikeouts'
    }
  },
  mapAttributesToMarkets: {
    // GoalServe -> Odds API
    nba: {
      points: 'player_points',
      total_rebounds: 'player_rebounds',
      assists: 'player_assists',
      threepoint_goals_made: 'player_threes',
      blocks: 'player_blocks',
      steals: 'player_steals'
    },
    nfl: {
      passing_yards: 'player_pass_yds',
      rushing_yards: 'player_rush_yds',
      receiving_yards: 'player_reception_yds',
      kicking_field_goals: 'player_field_goals'
    }, // @check: nfl
    mlb: {
      batter_home_runs: 'batter_home_runs',
      batter_hits: 'batter_hits',
      batter_total_bases: 'batter_total_bases',
      batter_runs_batted_in: 'batter_rbis',
      batter_runs: 'batter_runs_scored',
      batter_singles: 'batter_singles',
      batter_doubles: 'batter_doubles',
      batter_triples: 'batter_triples',
      batter_stolen_bases: 'batter_stolen_bases',
      pitcher_strikeouts: 'pitcher_strikeouts'
    }
  },
  mapAttributesToStatsShort: {
    // GoalServe
    nba: {
      points: 'PTS',
      total_rebounds: 'REB',
      assists: 'AST',
      threepoint_goals_made: '3PM',
      blocks: 'BLK',
      steals: 'STL'
    },
    nfl: {
      passing_yards: 'YPAS',
      rushing_yards: 'YRSH',
      receiving_yards: 'YREC',
      kicking_field_goals: 'FG'
    }, // @check: nfl
    mlb: {
      batter_home_runs: 'HR',
      batter_hits: 'H',
      batter_total_bases: 'TB',
      batter_runs_batted_in: 'RBI',
      batter_runs: 'R',
      batter_singles: '1B',
      batter_doubles: '2B',
      batter_triples: '3B',
      batter_stolen_bases: 'SB',
      pitcher_strikeouts: 'K'
    }
  },
  // @modify 20240903
  //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
  // mapMarketsToMetrics: { // Odds API -> BAKER simulations
  //   nba: {}, // @todo: nba
  //   nfl: {}, // @todo: nfl
  //   mlb: {
  //     batter_home_runs: 'home_runs',
  //     batter_hits: 'hits',
  //     batter_total_bases: 'total_bases',
  //     batter_rbis: 'runs_batted_in',
  //     batter_runs_scored: 'runs',
  //     batter_singles: 'singles',
  //     batter_doubles: 'doubles',
  //     batter_triples: 'triples',
  //     batter_stolen_bases: 'stolen_bases',
  //     pitcher_strikeouts: 'pitching_strikeouts'
  //   }
  // },
  mapSportToChartDefaultGameline: {
    nba: 'total_over',
    nfl: 'total_over', // @check: nfl
    mlb: 'total_over'
  },
  mapSportToChartDefaultMarket: {
    nba: 'player_points',
    nfl: 'player_pass_yds',
    // {
    //   quarterback: 'player_pass_yds',
    //   kicker: 'player_field_goals',
    //   offense: 'player_reception_yds',
    //   defense: 'player_reception_yds'
    // }, // @check: nfl
    mlb: {
      batter: 'batter_hits',
      pitcher: 'pitcher_strikeouts'
    }
  },
  mapSportToRankTeams: {
    nba: 30,
    nfl: 32,
    mlb: 30
  },

  // @todo: Refactor / create a class for this "chart" object.
  chartDefaults: JSON.stringify({
    loaded: null,
    market: null, // current betting market
    min: 0, // minimum bar height
    max: 0, // maximum bar height
    mid: null, // the betting market value to compare all bars to
    midStyle: {}, // mid line custom style cache (height)
    bars: [], // the bars to display on the chart (10, 25)
    filterLabels: {
      side: {
        '': 'Home & Away',
        home: 'Home',
        away: 'Away'
      },
      500: {
        '': 'All teams',
        above: '> 500 teams',
        below: '< 500 teams'
      },
      '10def': {
        '': 'All def',
        t10def: 'Top 10 Def',
        b10def: 'Bot 10 Def'
      },
      recent: {
        '': '10 games',
        25: '25 games'
      }
    },
    filterValues: {
      // the current value set for each filter (multiple filters can be enabled at once)
      side: '',
      500: '',
      '10def': '',
      recent: ''
    },
    statsHHR: '?', // the "successes" divided by the total bars (10, 25)
    statsSR: '?',
    statsImplied: '?',
    statsPrice: '?',
    statsPoint: '?'
  })
};

// @todo: Refactor / create a class for this "ticker" object.
// @define
// const tickerDefault = {
//   'sport': '',
//   'yyyymmdd': '',
//   'bookmaker': '',
//   'matchup': {},
//   'startTime': '',
//   'homeName': '',
//   'homeLogoStyle': {},
//   'homeLogoImage': '',
//   'homeRecord': '',
//   'awayName': '',
//   'awayLogoStyle': {},
//   'awayLogoImage': '',
//   'awayRecord': '',
//   'gamelinesUpdated': null,
//   'propositionsUpdated': null,
//   'gamelines': {},
//   'lineups': [],
//   'lineupsX': {},
//   'awayInjuries': [],
//   'homeInjuries': [],
//   'hidden': false,
//   'bakerUpdated': null,
//   'baker': {
//     home_team: '',
//     home_insights: [],
//     home_insights_mutex: null,
//     away_team: '',
//     away_insights: [],
//     away_insights_mutex: null,
//     over_under: '?',
//     point_spread: '?',
//     win_side: '?',
//     win_odds: '?',
//     simulationsMutex: null,
//     simulationsUpdated: null,
//     simulations: {},
//     gameProjections: {}
//   }
// };

// @todo: Refactor / create a class for this "tickerPlayer" object.
// @define
// const tickerPlayerDefault = {
//   'player': {},
//   'playerAvatarStyle': {},
//   'playerAvatarImage': '',
//   'playerTeamId': '',
//   'playerPosition': '',
//   'propositionsUpdated': null,
//   'propositions': {
//     nba: {},
//     nfl: {},
//     mlb: {}
//   },
//   'performance': {},
//   'performances': [],
//   'matchupsX': {},
//   'baker': {
//     insights: []
//     insights_mutex: null
//   }
// };

////////////////////////////////////////////////////////////////////////////////

// @signature
//  This function is just used to convert the matchup id (which starts with YYYYMMDDHHII) to the local game start time (8:30 PM EST).
const fs_get_time_local = function (time) {
  try {
    // @assign
    let date = new Date(
      time.substr(0, 4) +
        '-' +
        time.substr(4, 2) +
        '-' +
        time.substr(6, 2) +
        'T' +
        time.substr(8, 2) +
        ':' +
        time.substr(10, 2) +
        ':00.000Z'
    );

    // @return
    return date
      .toLocaleTimeString('en-US', {
        timeZoneName: 'short'
      })
      .split(':00 ')
      .join(' ');
  } catch (e) {
    throw e;
  }
};

// @signature
//  Initializes actions with more concise code wherever this is called.
const fs_init_action = function (action, fields, reloadParentResources = false, initSearch = null) {
  try {
    // @switch
    if (reloadParentResources === true) {
      // @action
      action.parent.ms_reload('resources');
    }

    // @action
    action.ms_reset();

    // @switch
    if (typeof initSearch === 'function') {
      // @action
      initSearch(action);
    }

    // @repeat
    for (let i1k in fields) {
      // @switch
      if (fields.hasOwnProperty(i1k) === true) {
        // @assign
        action.fields[i1k].value = fields[i1k];
      }
    }

    // @return
    return action;
  } catch (e) {
    throw e;
  }
};

// @signature
const fa_cachefile = function (toolkit, action, url, key) {
  return new Promise(async (resolve, reject) => {
    try {
      // @action
      action = fs_init_action(
        action,
        {
          url: url,
          key: key
        },
        true
      );

      // @action
      try {
        await action.ma_submit();
      } catch (e) {
        // 490 is returned by the api if the request to goalserve failed, or, more specifically, failed because there is no data for the supplied date.
        if (action.status['kNError'] === 490) {
          resolve('');
          return;
        } else {
          throw e;
        }
      }

      // @action
      let response = await toolkit.utl.httpRequest(action.parent.items[0].attributes['file']['=']);

      // @return
      resolve(response['body']);
      return;
    } catch (e) {
      reject(e);
      return;
    }
  });
};

// @signature
//  Post-processes the chart data. Does not return an object / operates directly on the chart's attributes.
const fs_chart_postprocess = function (chart, bars, oprice, opoint) {
  try {
    // @assign
    chart['bars'].length = 0;

    // @action
    //  Truncate the result set (to 10 or 25, based on the filter setting).
    chart['bars'].push(
      ...bars
        .slice(
          0,
          {
            '': 10,
            25: 25
          }[chart['filterValues']['recent']]
        )
        .reverse()
    );

    // @assign
    let chartStatsHHRHits = 0;

    // @repeat
    chart['bars'].forEach((i1v) => {
      // @assign
      //  The lowest bar value.
      chart['min'] = i1v['value'] < chart['min'] ? i1v['value'] : chart['min'];

      // @assign
      //  The highest bar value.
      chart['max'] = i1v['value'] > chart['max'] ? i1v['value'] : chart['max'];

      // @assign
      //  Total successes (better or worse than proposition bet "opoint" value).
      chartStatsHHRHits += i1v['success'] === 1 ? 1 : 0;
    });

    // @assign
    //  The "opoint" line value. Usually >= 0, but for spreads, can be -INF -> INF.
    chart['mid'] = oprice !== '?' ? opoint : 0;

    // @switch
    if (chart['mid'] < chart['min']) {
      // @assign
      chart['min'] = chart['mid'];
    }

    // @switch
    if (chart['mid'] > chart['max']) {
      // @assign
      chart['max'] = chart['mid'];
    }

    // @assign
    chart['statsHHR'] =
      oprice !== '?' &&
      typeof oprice === 'number' &&
      Number.isFinite(oprice) &&
      chart['bars'].length > 0
        ? Math.floor((chartStatsHHRHits / chart['bars'].length) * 100) + '%'
        : 'N/A';

    // @assign
    chart['statsImplied'] =
      oprice !== '?' && typeof oprice === 'number' && Number.isFinite(oprice)
        ? ((oprice < 0 ? oprice / (oprice - 100) : 100 / (oprice + 100)) * 100).toFixed(0) + '%'
        : 'N/A';

    // @assign
    chart['statsPrice'] =
      oprice !== '?' && typeof oprice === 'number' && Number.isFinite(oprice)
        ? oprice < 0
          ? oprice
          : '+' + oprice
        : 'N/A';

    // @assign
    chart['statsPoint'] = opoint !== '?' ? opoint : 'N/A';

    // @repeat
    chart['bars'].forEach((i1v) => {
      // @switch
      if (chart['market'].split('_').pop() === 'h2h') {
        // @readme
        //  This is for matchup gamelines.

        // @assign
        //  1 for win or 0 for loss.
        i1v['style'] = {
          'border-top-left-radius': '0.382rem',
          'border-top-right-radius': '0.382rem',
          height: '100%',
          'background-color': i1v['color']
        };
      } else if (chart['market'].split('_').pop() === 'spread') {
        // @readme
        //  This is for matchup gamelines.

        // @assign
        //  Bars ascend above 0 or below 0.
        i1v['style'] = {
          height:
            (i1v['value'] >= 0
              ? ((i1v['value'] + Math.abs(chart['min'])) /
                  (Math.abs(chart['min']) + Math.abs(chart['max']))) *
                100
              : (Math.abs(chart['min']) / (Math.abs(chart['min']) + Math.abs(chart['max']))) *
                100) + '%',
          ...(i1v['value'] >= 0
            ? {
                'border-top-left-radius': '0.382rem',
                'border-top-right-radius': '0.382rem',
                'background-image':
                  'linear-gradient(' +
                  [
                    'to top',
                    'black 0%',
                    'black ' +
                      (Math.abs(chart['min']) / (Math.abs(chart['min']) + i1v['value'])) * 100 +
                      '%',
                    i1v['color'] +
                      ' ' +
                      (Math.abs(chart['min']) / (Math.abs(chart['min']) + i1v['value'])) * 100 +
                      '%'
                  ].join(', ') +
                  ')'
              }
            : {
                'border-bottom-left-radius': '0.382rem',
                'border-bottom-right-radius': '0.382rem',
                'background-image':
                  'linear-gradient(' +
                  [
                    'to bottom',
                    i1v['color'] + ' 0%',
                    i1v['color'] +
                      ' ' +
                      (Math.abs(i1v['value']) / Math.abs(chart['min'])) * 100 +
                      '%',
                    'black ' + (Math.abs(i1v['value']) / Math.abs(chart['min'])) * 100 + '%'
                  ].join(', ') +
                  ')'
              })
        };
      } else if (chart['market'] === 'total_over') {
        // @readme
        //  This is for matchup gamelines.

        // @assign
        //  Bars ascend above 0.
        i1v['style'] = {
          'border-top-left-radius': '0.382rem',
          'border-top-right-radius': '0.382rem',
          height: (i1v['value'] / (chart['min'] + chart['max'])) * 100 + '%',
          'background-color': i1v['color']
        };
      } else {
        // @readme
        //  This is for player proposition bets.

        // @assign
        //  Bars ascend above 0.
        i1v['style'] = {
          'border-top-left-radius': '0.382rem',
          'border-top-right-radius': '0.382rem',
          height: (i1v['value'] / (chart['min'] + chart['max'])) * 100 + '%',
          'background-color': i1v['color']
        };
      }
    });

    // @switch
    if (oprice !== '?') {
      // @switch
      if (chart['market'].split('_').pop() === 'h2h') {
        // @readme
        //  This is for matchup gamelines.

        // @assign
        //  Either a win or loss, so no "opoint" line.
        chart['midStyle'] = {
          display: 'none'
        };
      } else if (chart['market'].split('_').pop() === 'spread') {
        // @readme
        //  This is for matchup gamelines.

        // @assign
        //  Usually a graph with values -INF -> INF.
        chart['midStyle'] = {
          height:
            ((Math.abs(chart['mid']) + Math.abs(chart['min'])) /
              (Math.abs(chart['min']) + Math.abs(chart['max']))) *
              100 +
            '%'
        };
      } else if (chart['market'] === 'total_over') {
        // @readme
        //  This is for matchup gamelines.

        // @assign
        //  A graph with values >= 0.
        chart['midStyle'] = {
          height: (chart['mid'] / (Math.abs(chart['min']) + Math.abs(chart['max']))) * 100 + '%'
        };
      } else {
        // @readme
        //  This is for player proposition bets.

        // @assign
        //  Usually a graph with values >= 0.
        chart['midStyle'] = {
          height: (chart['mid'] / (Math.abs(chart['min']) + Math.abs(chart['max']))) * 100 + '%'
        };
      }
    } else {
      // @assign
      //  The odds API did not return a result for this market, so there isn't a "opoint" line.
      chart['midStyle'] = {
        display: 'none'
      };
    }

    // @return
    return;
  } catch (e) {
    throw e;
  }
};

////////////////////////////////////////////////////////////////////////////////

// @signature
const ms_calc_hitrate = function (
  propPoint,
  propArrow,
  performanceId,
  performanceHHR,
  attribute,
  hitratesSize = 10,
  cacheHitrate = {}
) {
  try {
    // @switch
    if (!cacheHitrate[performanceId]) {
      // @assign
      cacheHitrate[performanceId] = JSON.parse(performanceHHR);
    }

    // @assign
    let past = cacheHitrate?.[performanceId]?.[attribute]?.slice(0, hitratesSize);

    // @return
    return Array.isArray(past)
      ? (
          (past.reduce((i1o, i1v) => {
            if (propArrow === 'Over' && i1v >= propPoint) {
              i1o += 1;
            } else if (propArrow === 'Under' && i1v <= propPoint) {
              i1o += 1;
            }
            return i1o;
          }, 0) /
            past.length) *
          100
        ).toFixed(0) + '%'
      : 'N/A';
  } catch (e) {
    throw e;
  }
};

// @signature
const ms_calc_hitrate_raw = function (
  propPoint,
  propArrow,
  performanceId,
  performanceHHR,
  attribute,
  hitratesSize = 10,
  cacheHitrate = {}
) {
  try {
    // @switch
    if (!cacheHitrate[performanceId]) {
      // @assign
      cacheHitrate[performanceId] = JSON.parse(performanceHHR);
    }

    // @assign
    let past = cacheHitrate?.[performanceId]?.[attribute]?.slice(0, hitratesSize);

    // @return
    return Array.isArray(past)
      ? past.reduce((i1o, i1v) => {
          if (propArrow === 'Over' && i1v >= propPoint) {
            i1o += 1;
          } else if (propArrow === 'Under' && i1v <= propPoint) {
            i1o += 1;
          }
          return i1o;
        }, 0) +
          '/' +
          past.length
      : 'N/A';
  } catch (e) {
    throw e;
  }
};

// @signature
const ms_calc_simrate = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  simulations,
  playerName,
  market,
  propPoint,
  propArrow,
  performanceId,
  attribute,
  type = 'percentage',
  cacheSimrate = {}
) {
  try {
    // @todo: Improve matching, since sometimes we don't get a match (and what if 2 players in this game have the same name???).
    // @assign
    //  Simple trim, lowercase, replace non-alpha/spaces to compare.
    (playerName = playerName
      .trim()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z]/g, '')),
      (propPoint = String(propPoint)),
      (propArrow = propArrow.substr(0, 1).toLowerCase() === 'o' ? 'O' : 'U');

    // @assign
    let output = 'N/A';

    // @switch
    if (
      typeof simulations === 'object' &&
      simulations !== null &&
      Array.isArray(simulations) !== true &&
      simulations.hasOwnProperty('results') &&
      typeof simulations['results'] === 'object' &&
      simulations['results'] !== null &&
      Array.isArray(simulations['results']) !== true &&
      simulations['results'].hasOwnProperty(playerName) &&
      typeof simulations['results'][playerName] === 'object' &&
      simulations['results'][playerName] !== null &&
      Array.isArray(simulations['results'][playerName]) !== true &&
      simulations['results'][playerName].hasOwnProperty(market) &&
      typeof simulations['results'][playerName][market] === 'object' &&
      simulations['results'][playerName][market] !== null &&
      Array.isArray(simulations['results'][playerName][market]) !== true &&
      simulations['results'][playerName][market].hasOwnProperty(propArrow + ' ' + propPoint) &&
      typeof simulations['results'][playerName][market][propArrow + ' ' + propPoint] === 'string'
    ) {
      // @switch
      if (
        !cacheSimrate.hasOwnProperty(performanceId) ||
        !cacheSimrate[performanceId].hasOwnProperty(attribute) ||
        !cacheSimrate[performanceId][attribute].hasOwnProperty(propArrow + ' ' + propPoint) ||
        !cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint].hasOwnProperty('prob')
      ) {
        // @assign
        let simArray;

        // @modify 20240724 opoint/upoint
        // @action
        try {
          simArray = JSON.parse(
            simulations['results'][playerName][market][propArrow + ' ' + propPoint]
          );
        } catch (e) {
          // @ignore
        }

        // @modify 20240724 opoint/upoint
        // @switch
        if (Array.isArray(simArray) && simArray.length === 2) {
          // @switch
          if (cacheSimrate.hasOwnProperty(performanceId) !== true) {
            // @assign
            cacheSimrate[performanceId] = {};
          }

          // @switch
          if (cacheSimrate[performanceId].hasOwnProperty(attribute) !== true) {
            // @assign
            cacheSimrate[performanceId][attribute] = {};
          }

          // @switch
          if (
            cacheSimrate[performanceId][attribute].hasOwnProperty(propArrow + ' ' + propPoint) !==
            true
          ) {
            // @assign
            cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint] = {};
          }

          // @modify 20240724 opoint/upoint
          // @assign
          simArray[0] = (simArray[0] * 100).toFixed(1) + '%';

          // @modify 20240724 opoint/upoint
          // @assign
          simArray[1] = (simArray[1] * 1).toFixed(2).replace(/0+$/g, '').replace(/\.$/g, '');

          // @modify 20240724 opoint/upoint
          // @assign
          simArray[1] = simArray[1].length < 1 ? '0' : simArray[1];

          // @assign
          cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint]['prob'] = simArray[0];

          // @assign
          cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint]['proj'] = simArray[1];
        }
      }

      // @switch
      if (
        cacheSimrate.hasOwnProperty(performanceId) &&
        cacheSimrate[performanceId].hasOwnProperty(attribute) &&
        cacheSimrate[performanceId][attribute].hasOwnProperty(propArrow + ' ' + propPoint) &&
        cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint].hasOwnProperty('prob')
      ) {
        // @switch
        if (type === 'percentage') {
          // @modify 20240724 opoint/upoint
          // @assign
          output = cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint]['prob'];
        } else if (type === 'projection') {
          // @modify 20240724 opoint/upoint
          // @assign
          output = cacheSimrate[performanceId][attribute][propArrow + ' ' + propPoint]['proj'];
        }
      }
    }

    // @return
    return output;
  } catch (e) {
    throw e;
  }
};

// @signature
const ms_calc_ev_hr = function (
  odds,
  propPoint,
  propArrow,
  performanceId,
  performanceHHR,
  attribute,
  hitratesSize = 10,
  cacheHitrate = {}
) {
  try {
    // @assign
    let output = 'N/A';

    // @assign
    let hitrate = ms_calc_hitrate(
      propPoint,
      propArrow,
      performanceId,
      performanceHHR,
      attribute,
      hitratesSize,
      cacheHitrate
    );

    // @switch
    if (hitrate.substr(-1) === '%') {
      // @assign
      //  ex. hitrate = 23%
      hitrate = parseFloat(hitrate.slice(0, -1)) / 100;

      // @switch
      if (odds < 0) {
        // @modify 20240712
        //  [Email from Arpan]: I think your formulas in the if/else is right, it just needs to be multiplied by 100 before concatenating the "%".
        // @assign
        // ex. 0.23 x 100 / 400 (if -400 then x -1)
        // HITRATE% x 100 / -ODDS
        // + HITRATE%
        // - 1
        // * 100
        output = (((hitrate * 100) / (-1 * odds) + hitrate - 1) * 100).toFixed(0) + '%';
      } else {
        // @modify 20240712
        //  [Email from Arpan]: I think your formulas in the if/else is right, it just needs to be multiplied by 100 before concatenating the "%".
        // @assign
        // HITRATE% x ODDS / 100
        // + HITRATE%
        // - 1
        // * 100
        output = (((hitrate * odds) / 100 + hitrate - 1) * 100).toFixed(0) + '%';
      }
    }

    // @return
    return output;
  } catch (e) {
    throw e;
  }
};

// @signature
const ms_calc_ev_sr = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  simulations,
  playerName,
  market,
  odds,
  propPoint,
  propArrow,
  performanceId,
  attribute,
  cacheSimrate = {}
) {
  try {
    // @assign
    let output = 'N/A';

    // @modify 20240724 opoint/upoint
    // @assign
    let simrate = ms_calc_simrate(
      toolkit,
      component,
      navigator,
      context,
      componentData,
      simulations,
      playerName,
      market,
      propPoint,
      propArrow,
      performanceId,
      attribute,
      'percentage',
      cacheSimrate
    );

    // @switch
    if (simrate.substr(-1) === '%') {
      // @assign
      //  ex. simrate = 23%
      simrate = parseFloat(simrate.slice(0, -1)) / 100;

      // @switch
      if (odds < 0) {
        // @modify 20240712
        //  [Email from Arpan]: I think your formulas in the if/else is right, it just needs to be multiplied by 100 before concatenating the "%".
        // @assign
        // ex. 0.23 x 100 / 400 (if -400 then x -1)
        // SIMRATE% x 100 / -ODDS
        // + SIMRATE%
        // - 1
        // * 100
        output = (((simrate * 100) / (-1 * odds) + simrate - 1) * 100).toFixed(0) + '%';
      } else {
        // @modify 20240712
        //  [Email from Arpan]: I think your formulas in the if/else is right, it just needs to be multiplied by 100 before concatenating the "%".
        // @assign
        // SIMRATE% x ODDS / 100
        // + SIMRATE%
        // - 1
        // * 100
        output = (((simrate * odds) / 100 + simrate - 1) * 100).toFixed(0) + '%';
      }
    }

    // @return
    return output;
  } catch (e) {
    throw e;
  }
};

////////////////////////////////////////////////////////////////////////////////

// @signature
const ma_init_teamsX = function (toolkit, component, navigator, context, componentData, sport) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (data['initTeamsX'][sport] !== true) {
        // @switch
        if (data['initTeamsX'][sport] !== false) {
          // @assign
          data['initTeamsX'][sport] = false;

          // @narrow
          try {
            // @assign
            let action;

            // @action
            action = fs_init_action(
              navigator.dom.root.lists['membersdb.teams'].actions['GET'],

              {
                'kJQuery.kJFilters[sport]': '["' + sport + '"]'
              },
              true,
              navigator.dom.constructor.fs_action_default_search_init
            );

            // @action
            try {
              await action.ma_resubmit();
            } catch (e) {
              console.log('Before ma_resubmit');
              Object.keys(action.fields).map((key) => {
                console.log('action.fields key', key, action.fields[key].value);
                return key;
              });
              // console.log('actiton status', action.status);
              // debugger;
            }
            console.log('After ma_resubmit');
            // @repeat
            for (let i1k in navigator.dom.root.lists['membersdb.teams'].xitems) {
              // @switch
              if (
                navigator.dom.root.lists['membersdb.teams'].xitems.hasOwnProperty(i1k) === true &&
                data['teamsX'].hasOwnProperty(i1k) !== true
              ) {
                // @assign
                data['teamsX'][i1k] = navigator.dom.root.lists['membersdb.teams'].xitems[i1k]['&'];
              }
            }

            // @assign
            data['initTeamsX'][sport] = true;
          } catch (e) {
            // @assign
            delete data['initTeamsX'][sport];

            // @throws
            throw new toolkit.utl.error(e.message);
          }
        }
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_init_tickers = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  sport,
  yyyymmdd,
  bookmaker
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @assign
      data['sport'] = sport;

      // @assign
      data['bookmaker'] = bookmaker;

      // @assign
      data['yyyymmdd'] = yyyymmdd;
      console.log('ma_init_tickers', data);
      // @switch
      if (data['initTickers'] !== [sport, yyyymmdd, bookmaker].join('_')) {
        // @switch
        if (data['initTickers'] !== false) {
          // @assign
          data['initTickers'] = false;

          // @narrow
          try {
            console.log('init teamsX invoke');
            // @action
            await ma_init_teamsX(toolkit, component, navigator, context, componentData, sport);

            // @assign
            let action;

            // @action
            action = fs_init_action(
              navigator.dom.root.lists['membersdb.matchups'].actions['GET'],
              {
                'kJQuery.kJFilters[yyyymmdd]': '["' + yyyymmdd + '"]',
                'kJQuery.kJFilters[sport]': '["' + sport + '"]',
                kSMarker: null
              },
              true,
              navigator.dom.constructor.fs_action_default_search_init
            );
            console.log('before ma_resubmit 1226');
            // @action
            try {
              await action.ma_resubmit();
            } catch (e) {
              console.log('ma_resubmit err;', e, action.status);
            }
            console.log('After ma_resubmit 1226');
            // @assign
            let tickers = [],
              tickersX = {},
              matchups = action.parent.items.slice().reverse();

            // @repeat
            for (let i1i = 0, i1n = matchups.length; i1i < i1n; i1i += 1) {
              // @assign
              let meta = {};

              // @action
              try {
                meta = JSON.parse(matchups[i1i].attributes['meta']['=']);
              } catch (e) {
                // @ignore
              }

              // @assign
              //  See const tickerDefault = {...};
              let ticker = {
                sport: sport,
                yyyymmdd: yyyymmdd,
                bookmaker: bookmaker,
                matchup: matchups[i1i],
                startTime: fs_get_time_local(matchups[i1i].attributes['id']['='].substr(0, 17)),
                homeName:
                  data['teamsX'][matchups[i1i].attributes['home']['=']].attributes['name']['='],
                homeLogoStyle: {
                  'background-image':
                    'url(' +
                    data['teamsX'][matchups[i1i].attributes['home']['=']].attributes['logo']['='] +
                    ')'
                },
                homeLogoImage:
                  data['teamsX'][matchups[i1i].attributes['home']['=']].attributes['logo']['='],
                homeRecord:
                  '(' +
                  meta['home_season_wins_total'] +
                  '-' +
                  meta['home_season_losses_total'] +
                  ' | ' +
                  meta['home_season_wins_home'] +
                  '-' +
                  meta['home_season_losses_home'] +
                  ' home)',
                awayName:
                  data['teamsX'][matchups[i1i].attributes['away']['=']].attributes['name']['='],
                awayLogoStyle: {
                  'background-image':
                    'url(' +
                    data['teamsX'][matchups[i1i].attributes['away']['=']].attributes['logo']['='] +
                    ')'
                },
                awayLogoImage:
                  data['teamsX'][matchups[i1i].attributes['away']['=']].attributes['logo']['='],
                awayRecord:
                  '(' +
                  meta['away_season_wins_total'] +
                  '-' +
                  meta['away_season_losses_total'] +
                  ' | ' +
                  meta['away_season_wins_away'] +
                  '-' +
                  meta['away_season_losses_away'] +
                  ' away)',
                gamelinesUpdated: null,
                propositionsUpdated: null,
                gamelines: {
                  away_spread: {
                    opoint: '?',
                    oprice: '?'
                  },
                  home_spread: {
                    opoint: '?',
                    oprice: '?'
                  },
                  total_over: {
                    opoint: '?',
                    oprice: '?'
                  },
                  total_under: {
                    upoint: '?',
                    uprice: '?'
                  },
                  away_h2h: {
                    oprice: '?'
                  },
                  home_h2h: {
                    oprice: '?'
                  }
                },
                lineups: [],
                lineupsX: {},
                awayInjuries: [],
                homeInjuries: [],
                hidden: false, // @readme: If Baker does not return an entry in the schedule for this matchup for today, then that means that the game has already started or will not be played (scheduled postseason games that will never happen / series ended).
                bakerUpdated: null,
                baker: {
                  home_team: '',
                  home_insights: [],
                  home_insights_mutex: null,
                  away_team: '',
                  away_insights: [],
                  away_insights_mutex: null,
                  over_under: '?',
                  point_spread: '?',
                  win_side: '?',
                  win_odds: '?',
                  simulationsMutex: null,
                  simulationsUpdated: null,
                  simulations: {},
                  gameProjections: {}
                }
              };

              // @assign
              tickers.push(ticker);

              // @assign
              tickersX[matchups[i1i].attributes['id']['=']] = ticker;
            }

            // @assign
            data['tickers'].length = 0;

            // @assign
            data['tickers'].push(...tickers);

            // @assign
            data['tickersX'] = tickersX;

            // @assign
            data['initTickers'] = [sport, yyyymmdd, bookmaker].join('_');
          } catch (e) {
            // @assign
            data['initTickers'] = null;

            // @throws
            throw new toolkit.utl.error(e.message);
          }
        }
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_update_ticker_lineups = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (!ticker) {
        // @prints
        console.log(['ma_update_ticker_lineups requires ticker (must await ma_init_tickers).']);
      } else {
        // @assign
        let action;

        // @switch
        if (ticker['matchup'].lists['membersdb.performances'].items.length < 1) {
          // @action
          action = fs_init_action(
            ticker['matchup'].lists['membersdb.performances'].actions['GET'],
            {},
            true,
            navigator.dom.constructor.fs_action_default_search_init
          );

          // @action
          await action.ma_resubmit();
        }

        // @switch
        if (ticker['matchup'].lists['membersdb.players'].items.length < 1) {
          // @action
          action = fs_init_action(
            ticker['matchup'].lists['membersdb.players'].actions['GET'],
            {},
            true,
            navigator.dom.constructor.fs_action_default_search_init
          );

          // @action
          await action.ma_resubmit();
        }

        // @assign
        let performancesX = ticker['matchup'].lists['membersdb.performances'].xitems,
          playersX = ticker['matchup'].lists['membersdb.players'].xitems;

        // @repeat
        for (let i1k in performancesX) {
          // @switch
          if (
            performancesX.hasOwnProperty(i1k) === true &&
            playersX.hasOwnProperty(i1k.split('_').pop()) === true &&
            ticker['lineupsX'].hasOwnProperty(i1k.split('_').pop()) !== true
          ) {
            // @assign
            let playerId = i1k.split('_').pop();

            // @assign
            let player = playersX[playerId]['&'];

            // @assign
            let playerTeamId = performancesX[i1k]['&'].attributes['team']['='],
              playerPosition = performancesX[i1k]['&'].attributes['position']['=']
                ? performancesX[i1k]['&'].attributes['position']['=']
                : player.attributes['position']['='];

            // @switch
            if (ticker['lineupsX'].hasOwnProperty(playerId) !== true) {
              // @assign
              //  See const tickerPlayerDefault = {...};
              ticker['lineupsX'][playerId] = {
                player: player,
                playerAvatarStyle: {
                  'background-image':
                    'url(' +
                    (player.attributes['avatar']['=']
                      ? player.attributes['avatar']['=']
                      : '/static/images/avatar-inverted.png') +
                    ')'
                },
                playerAvatarImage: player.attributes['avatar']['=']
                  ? player.attributes['avatar']['=']
                  : '/static/images/avatar-inverted.png',
                playerTeamId: playerTeamId,
                playerPosition: playerPosition,
                propositionsUpdated: null,
                propositions: {
                  ...{
                    nba: {
                      player_points: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_rebounds: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_assists: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_threes: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_blocks: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_steals: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      }
                    },
                    nfl: {
                      player_pass_yds: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_rush_yds: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_reception_yds: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      },
                      player_field_goals: {
                        opoint: '?',
                        oprice: '?',
                        upoint: '?',
                        uprice: '?',
                        raw: {}
                      }
                    }, // @check: nfl
                    mlb: {
                      ...(playerPosition.toUpperCase().indexOf('P') > -1
                        ? {
                            pitcher_strikeouts: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            }
                          }
                        : {
                            batter_home_runs: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_hits: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_total_bases: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_rbis: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_runs_scored: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_singles: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_doubles: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_triples: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            },
                            batter_stolen_bases: {
                              opoint: '?',
                              oprice: '?',
                              upoint: '?',
                              uprice: '?',
                              raw: {}
                            }
                          })
                    }
                  }[ticker['sport']]
                },
                performance: performancesX[i1k]['&'],
                performances: player.lists['membersdb.performances'].items,
                matchupsX: player.lists['membersdb.matchups'].xitems,
                baker: {
                  insights: [],
                  insights_mutex: null
                }
              };

              // @assign
              ticker['lineups'].push(ticker['lineupsX'][playerId]);
            }
          }
        }
      }

      // @return
      resolve(ticker);
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_update_ticker_boxscores = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (!ticker) {
        // @prints
        console.log(['ma_update_ticker_lineups requires ticker (must await ma_init_tickers).']);
      } else {
        // @assign
        let teamIds = [
          ticker['matchup'].attributes['away']['='],
          ticker['matchup'].attributes['home']['=']
        ];

        // @repeat
        teamIds.forEach((i1v) => {
          // @narrow
          try {
            // @modify 20240807: just reset search, don't overwrite items
            // @assign
            let team = data['teamsX'][i1v];

            // @action
            team.lists['membersdb.matchups'].actions['GET'].ms_reset();

            // @action
            team.lists['membersdb.matchups'].actions['GET'].fields['kSLimit'].value = '5';

            // @action
            team.lists['membersdb.matchups'].actions['GET'].fields[
              'kJQuery.kJFilters[status]'
            ].value = '["final"]';

            // @action
            team.lists['membersdb.matchups'].actions['GET'].fields['kJQuery.kSTerm'].value = '';

            // @action
            team.lists['membersdb.matchups'].actions['GET'].fields['kSMarker'].value =
              ticker['matchup'].attributes['id']['='];

            // @action
            team.lists['membersdb.matchups'].actions['GET'].ma_submit();
          } catch (e) {
            // @ignore
          }
        });
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_update_ticker_injuries = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (!ticker) {
        // @prints
        console.log(['ma_update_ticker_lineups requires ticker (must await ma_init_tickers).']);
      } else {
        // @switch
        //  Injuries from GoalServe are ephemeral / not historic or by date. Because we can't build a history from this request, only make this request for today's / upcoming games.
        if (ticker['matchup'].attributes['yyyymmdd']['='] >= data['today']) {
          // @assign
          // let htmlEntityDecode = document && document.createElement('textarea');

          // @assign
          let sides = ['away', 'home'];

          // @repeat
          for (let i1i = 0, i1n = sides.length; i1i < i1n; i1i += 1) {
            // @assign
            let responseBody;

            // @action
            try {
              responseBody = await fa_cachefile(
                toolkit,
                navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
                {
                  nba:
                    'http://www.goalserve.com/getfeed/{{ API_KEY_GOALSERVE }}/bsktbl/' +
                    ticker['matchup'].attributes[sides[i1i]]['='].split('-').pop() +
                    '_injuries',
                  nfl:
                    'http://www.goalserve.com/getfeed/{{ API_KEY_GOALSERVE }}/football/' +
                    ticker['matchup'].attributes[sides[i1i]]['='].split('-').pop() +
                    '_injuries', // @check: nfl
                  mlb:
                    'http://www.goalserve.com/getfeed/{{ API_KEY_GOALSERVE }}/baseball/' +
                    ticker['matchup'].attributes[sides[i1i]]['='].split('-').pop() +
                    '_injuries'
                }[ticker['sport']],
                'API_KEY_GOALSERVE'
              );
            } catch (e) {
              // @ignore
            }
            // @action
            try {
              ticker[sides[i1i] + 'Injuries'] = responseBody
                .match(/<report [^\/]*?\/>/gi)
                .reduce((i2o, i2v) => {
                  // @assign
                  let injury = { id: '', name: '' };

                  // @action
                  try {
                    injury = {
                      id: i2v.split('player_id="').pop().split('"').shift().trim(),
                      name: i2v.split('player_name="').pop().split('"').shift().trim()
                    };
                  } catch (e) {
                    // @ignore
                  }

                  // @switch
                  //  In a surprising number of injury report entries from GoalServe, the player_id is left blank. Without an id, we can't make a link to the player's profile page.
                  // if (injury['id'].length
                  // && injury['name'].length) {
                  if (injury['name'].length) {
                    // @assign
                    //  Needs to be done twice on purpose.
                    // htmlEntityDecode.innerHTML = injury['name'];
                    // injury['name'] = htmlEntityDecode.value;
                    // htmlEntityDecode.innerHTML = injury['name'];
                    // injury['name'] = htmlEntityDecode.value;

                    // @action
                    i2o.push(injury);
                  }

                  // @return
                  return i2o;
                }, []);
            } catch (e) {
              // @ignore
            }
          }

          // @action
          // htmlEntityDecode.remove();
        }
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

////////////////////////////////////////////////////////////////////////////////

// @signature
//  Odds API.
const ma_update_tickers_gamelines = function (
  toolkit,
  component,
  navigator,
  context,
  componentData
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (typeof data['initTickers'] !== 'string') {
        // @prints
        console.log(['ma_update_tickers_gamelines must await ma_init_tickers.']);
      } else {
        // @assign
        let responseBody;

        // @action
        try {
          responseBody = JSON.parse(
            await fa_cachefile(
              toolkit,
              navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
              {
                nba: 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey={{ API_KEY_ODDS }}&regions=usa&markets=h2h,spreads,totals&dateFormat=iso&oddsFormat=american&bookmakers=fanduel,draftkings',
                nfl: 'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey={{ API_KEY_ODDS }}&regions=usa&markets=h2h,spreads,totals&dateFormat=iso&oddsFormat=american&bookmakers=fanduel,draftkings', // @check: nfl
                mlb: 'https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey={{ API_KEY_ODDS }}&regions=usa&markets=h2h,spreads,totals&dateFormat=iso&oddsFormat=american&bookmakers=fanduel,draftkings'
              }[data['sport']],
              'API_KEY_ODDS'
            )
          );
        } catch (e) {
          // @ignore
        }

        // @switch
        if (responseBody) {
          // @repeat
          for (let i1i = 0, i1n = data['tickers'].length; i1i < i1n; i1i += 1) {
            // @readme
            //  responseBody[i2i] = {
            //    "id": "eb90f40ab42acfdd17d5f44d692daf73",
            //    "sport_key": "basketball_nba",
            //    "sport_title": "NBA",
            //    "commence_time": "2024-06-15T00:40:00Z",
            //    "home_team": "Dallas Mavericks",
            //    "away_team": "Boston Celtics",

            // @readme
            //  Finding which gameline (Odds API) corresponds to which matchup (GoalServe) is not super easy. The start times are not the same, and you have to use team names to guess if it's the same matchup. Start time is important in case there's a double header.
            //  matchup.id = 202406150030_nba-1189_nba-1067
            //  goalserve.datetime_utc = 15.06.2024 00:30
            //  odds.commence = 2024-06-15T00:40:00Z

            // @assign
            let ticker = data['tickers'][i1i],
              matchup = data['tickers'][i1i]['matchup'],
              matchupMatched;

            // @assign
            let matchupEventIds = JSON.parse(matchup.attributes['event_ids']['=']);

            // @repeat
            for (let i2i = 0, i2n = responseBody.length; i2i < i2n; i2i += 1) {
              // @switch
              if (matchupEventIds['odds_api_event_id'] === responseBody[i2i]['id']) {
                // @assign
                matchupMatched = responseBody[i2i];

                // @action
                //  Optimization.
                responseBody.splice(i2i, 1);

                // @breaks
                break;
              }
            }

            // @switch
            //  Team names and game start time (from GoalServe) is similar enough to the result returned by the odds API.
            if (matchupMatched) {
              // @repeat
              for (let i2i = 0, i2n = matchupMatched['bookmakers'].length; i2i < i2n; i2i += 1) {
                // @assign
                let bookmaker = matchupMatched['bookmakers'][i2i];

                // @switch
                if (bookmaker['key'] === ticker['bookmaker']) {
                  // @repeat
                  for (let i3i = 0, i3n = bookmaker['markets'].length; i3i < i3n; i3i += 1) {
                    // @readme
                    //  Each property is updated directly (instead of spreading / overwriting) so that reactivity in the UI can be preserved (as gamelines are updated every 30 seconds, we don't have to resort to any weird trickery to repaint the UI).

                    // @assign
                    let market = bookmaker['markets'][i3i];

                    // @switch
                    //  away_spread, home_spread, total_over, total_under, away_h2h, home_h2h
                    if (market['key'] === 'h2h' && market['outcomes'].length === 2) {
                      // @assign
                      ticker['gamelines'][
                        (matchupMatched['home_team'] === market['outcomes'][0]['name']
                          ? 'home'
                          : 'away') + '_h2h'
                      ]['oprice'] = market['outcomes'][0]['price'];

                      // @assign
                      ticker['gamelines'][
                        (matchupMatched['away_team'] === market['outcomes'][1]['name']
                          ? 'away'
                          : 'home') + '_h2h'
                      ]['oprice'] = market['outcomes'][1]['price'];
                    } else if (market['key'] === 'spreads' && market['outcomes'].length === 2) {
                      // @assign
                      ticker['gamelines'][
                        (matchupMatched['home_team'] === market['outcomes'][0]['name']
                          ? 'home'
                          : 'away') + '_spread'
                      ]['oprice'] = market['outcomes'][0]['price'];

                      // @assign
                      ticker['gamelines'][
                        (matchupMatched['home_team'] === market['outcomes'][0]['name']
                          ? 'home'
                          : 'away') + '_spread'
                      ]['opoint'] = market['outcomes'][0]['point'];

                      // @assign
                      ticker['gamelines'][
                        (matchupMatched['away_team'] === market['outcomes'][1]['name']
                          ? 'away'
                          : 'home') + '_spread'
                      ]['oprice'] = market['outcomes'][1]['price'];

                      // @assign
                      ticker['gamelines'][
                        (matchupMatched['away_team'] === market['outcomes'][1]['name']
                          ? 'away'
                          : 'home') + '_spread'
                      ]['opoint'] = market['outcomes'][1]['point'];
                    } else if (market['key'] === 'totals' && market['outcomes'].length === 2) {
                      // @switch
                      if (market['outcomes'][0]['name'] === 'Over') {
                        // @assign
                        ticker['gamelines']['total_over']['opoint'] =
                          market['outcomes'][0]['point'];

                        // @assign
                        ticker['gamelines']['total_over']['oprice'] =
                          market['outcomes'][0]['price'];
                      } else if (market['outcomes'][1]['name'] === 'Over') {
                        // @assign
                        ticker['gamelines']['total_over']['opoint'] =
                          market['outcomes'][1]['point'];

                        // @assign
                        ticker['gamelines']['total_over']['oprice'] =
                          market['outcomes'][1]['price'];
                      }

                      // @switch
                      if (market['outcomes'][0]['name'] === 'Under') {
                        // @assign
                        ticker['gamelines']['total_under']['upoint'] =
                          market['outcomes'][0]['point'];

                        // @assign
                        ticker['gamelines']['total_under']['uprice'] =
                          market['outcomes'][0]['price'];
                      } else if (market['outcomes'][1]['name'] === 'Under') {
                        // @assign
                        ticker['gamelines']['total_under']['upoint'] =
                          market['outcomes'][1]['point'];

                        // @assign
                        ticker['gamelines']['total_under']['uprice'] =
                          market['outcomes'][1]['price'];
                      }
                    }
                  }
                }
              }

              // @assign
              ticker['gamelinesUpdated'] = Date.now();
              data['setIntervalAllDataUpdated'] = Date.now();
            }
          }
        }
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
//  Odds API.
const ma_update_ticker_propositions = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (ticker === null || ticker['gamelinesUpdated'] === null) {
        // @switch
        if (ticker === null) {
          // @prints
          console.log([
            'ma_update_ticker_propositions requires ticker (must await ma_init_tickers).'
          ]);
        } else if (ticker['gamelinesUpdated'] === null) {
          // @prints
          //  If ma_update_tickers_gamelines hasn't been called yet.
          console.log(['ma_update_ticker_propositions must await ma_update_tickers_gamelines.']);
        }
      } else {
        // @switch
        if (!ticker['lineups'].length) {
          // @prints
          console.log([
            "ma_update_ticker_propositions must await ma_update_ticker_lineups (or lineups is empty... did you load today's games?)."
          ]);
        } else {
          // @assign
          let matchupEventIds = JSON.parse(ticker['matchup'].attributes['event_ids']['=']);

          // @assign
          let responseBody;

          // @switch
          if (matchupEventIds['odds_api_event_id'].length) {
            // @action
            try {
              responseBody = JSON.parse(
                await fa_cachefile(
                  toolkit,
                  navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
                  {
                    nba:
                      'https://api.the-odds-api.com/v4/sports/basketball_nba/events/' +
                      matchupEventIds['odds_api_event_id'] +
                      '/odds?apiKey={{ API_KEY_ODDS }}&regions=usa&markets=player_points,player_rebounds,player_assists,player_threes,player_blocks,player_steals&dateFormat=iso&oddsFormat=american&bookmakers=fanduel,draftkings',
                    nfl:
                      'https://api.the-odds-api.com/v4/sports/americanfootball_nfl/events/' +
                      matchupEventIds['odds_api_event_id'] +
                      '/odds?apiKey={{ API_KEY_ODDS }}&regions=usa&markets=player_pass_yds,player_rush_yds,player_reception_yds,player_field_goals&dateFormat=iso&oddsFormat=american&bookmakers=fanduel,draftkings', // @check: nfl
                    mlb:
                      'https://api.the-odds-api.com/v4/sports/baseball_mlb/events/' +
                      matchupEventIds['odds_api_event_id'] +
                      '/odds?apiKey={{ API_KEY_ODDS }}&regions=usa&markets=batter_home_runs,batter_hits,batter_total_bases,batter_rbis,batter_runs_scored,batter_singles,batter_doubles,batter_triples,batter_stolen_bases,pitcher_strikeouts&dateFormat=iso&oddsFormat=american&bookmakers=fanduel,draftkings'
                  }[ticker['sport']],
                  'API_KEY_ODDS'
                )
              );
            } catch (e) {
              // @ignore
            }
          }

          // @switch
          if (responseBody) {
            // @assign
            //  We use this directory to compare the names of players we have from GoalServe to the names of players returned by the odds API to make a best guess at matching the same player on both services.
            let lineupDirectory = {};

            // @repeat
            for (let i1i = 0, i1n = ticker['lineups'].length; i1i < i1n; i1i += 1) {
              // @todo: Improve matching, since sometimes we don't get a match (and what if 2 players in this game have the same name???).
              // @assign
              //  Simple trim, lowercase, replace non-alpha/spaces to compare.
              lineupDirectory[
                ticker['lineups'][i1i]['player'].attributes['name']['=']
                  .trim()
                  .normalize('NFKD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLowerCase()
                  .replace(/[^a-z]/g, '')
              ] = ticker['lineups'][i1i];
            }

            // @switch
            if (responseBody['bookmakers']) {
              // @repeat
              for (let i1i = 0, i1n = responseBody['bookmakers'].length; i1i < i1n; i1i += 1) {
                // @assign
                let bookmaker = responseBody['bookmakers'][i1i];

                // @switch
                if (bookmaker['key'] === ticker['bookmaker']) {
                  // @repeat
                  for (let i2i = 0, i2n = bookmaker['markets'].length; i2i < i2n; i2i += 1) {
                    // @assign
                    let market = bookmaker['markets'][i2i];

                    // @repeat
                    for (let i3i = 0, i3n = market['outcomes'].length; i3i < i3n; i3i += 1) {
                      // @todo: Improve matching, since sometimes we don't get a match (and what if 2 players in this game have the same name???).
                      // @switch
                      //  Simple trim, lowercase, replace non-alpha/spaces to compare.
                      if (
                        ['over', 'under'].includes(
                          market['outcomes'][i3i]['name'].trim().toLowerCase()
                        ) &&
                        lineupDirectory.hasOwnProperty(
                          market['outcomes'][i3i]['description']
                            .trim()
                            .normalize('NFKD')
                            .replace(/[\u0300-\u036f]/g, '')
                            .toLowerCase()
                            .replace(/[^a-z]/g, '')
                        )
                      ) {
                        // @assign
                        let lineupPlayer =
                          lineupDirectory[
                            market['outcomes'][i3i]['description']
                              .trim()
                              .normalize('NFKD')
                              .replace(/[\u0300-\u036f]/g, '')
                              .toLowerCase()
                              .replace(/[^a-z]/g, '')
                          ];

                        // @readme
                        //  Each property is updated directly (instead of spreading / overwriting) so that reactivity in the UI can be preserved (as proposition bets are updated every 30 seconds, we don't have to resort to any weird trickery to repaint the UI).

                        // @switch
                        if (market['outcomes'][i3i]['name'].trim().toLowerCase() === 'over') {
                          // @modify 20240730
                          //  Only keep the smallest prop / store alternates in raw.
                          // @switch
                          if (
                            lineupPlayer['propositions'][market['key']]['opoint'] === '?' ||
                            market['outcomes'][i3i]['point'] <
                              lineupPlayer['propositions'][market['key']]['opoint']
                          ) {
                            // @assign
                            lineupPlayer['propositions'][market['key']]['opoint'] =
                              market['outcomes'][i3i]['point'];

                            // @assign
                            lineupPlayer['propositions'][market['key']]['oprice'] =
                              market['outcomes'][i3i]['price'];
                          }

                          // @modify 20240730
                          //  Only keep the smallest prop / store alternates in raw.
                          // @assign
                          let rawId =
                            market['outcomes'][i3i]['name'].substr(0, 1) +
                            ' ' +
                            market['outcomes'][i3i]['point'];
                          // @switch
                          if (lineupPlayer['propositions'][market['key']]['raw'][rawId]) {
                            // @assign
                            lineupPlayer['propositions'][market['key']]['raw'][rawId]['price'] =
                              market['outcomes'][i3i]['price'];
                          } else {
                            // @assign
                            lineupPlayer['propositions'][market['key']]['raw'][rawId] =
                              market['outcomes'][i3i];
                          }
                        } else {
                          // @modify 20240730
                          //  Only keep the smallest prop / store alternates in raw.
                          // @switch
                          if (
                            lineupPlayer['propositions'][market['key']]['upoint'] === '?' ||
                            market['outcomes'][i3i]['point'] <
                              lineupPlayer['propositions'][market['key']]['upoint']
                          ) {
                            // @assign
                            lineupPlayer['propositions'][market['key']]['upoint'] =
                              market['outcomes'][i3i]['point'];

                            // @assign
                            lineupPlayer['propositions'][market['key']]['uprice'] =
                              market['outcomes'][i3i]['price'];
                          }

                          // @modify 20240730
                          //  Only keep the smallest prop / store alternates in raw.
                          // @assign
                          let rawId =
                            market['outcomes'][i3i]['name'].substr(0, 1) +
                            ' ' +
                            market['outcomes'][i3i]['point'];
                          // @switch
                          if (lineupPlayer['propositions'][market['key']]['raw'][rawId]) {
                            // @assign
                            lineupPlayer['propositions'][market['key']]['raw'][rawId]['price'] =
                              market['outcomes'][i3i]['price'];
                          } else {
                            // @assign
                            lineupPlayer['propositions'][market['key']]['raw'][rawId] =
                              market['outcomes'][i3i];
                          }
                        }

                        // @assign
                        ticker['propositionsUpdated'] = Date.now();
                        lineupPlayer['propositionsUpdated'] = Date.now();
                        data['setIntervalAllDataUpdated'] = Date.now();
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

////////////////////////////////////////////////////////////////////////////////

// @signature
//  Baker API (simulated rates).
const ma_update_tickers_simulations = function (
  toolkit,
  component,
  navigator,
  context,
  componentData
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @modify 20240903
      //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
      // // @switch
      // if (typeof data['initTickers'] !== 'string') {
      //
      //   // @prints
      //   console.log([
      //     'ma_update_tickers_simulations must await ma_init_tickers.'
      //   ]);
      //
      // } else {
      //
      //   // @assign
      //   let responseBody;
      //
      //   // @action
      //   try {
      //     responseBody = JSON.parse(await fa_cachefile(
      //       toolkit,
      //       navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
      //       ({
      //         'nba': '', // @todo: nba
      //         'nfl': '', // @todo: nfl
      //         'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/schedule/' + data['yyyymmdd'].substr(0, 4) + 'REG/' + data['yyyymmdd'].substr(0, 4) + '-' + data['yyyymmdd'].substr(4, 2) + '-' + data['yyyymmdd'].substr(6, 2) + '?key={{ API_KEY_BAKER }}'
      //       })[data['sport']],
      //       'API_KEY_BAKER'
      //     ));
      //   } catch (e) {
      //     // @ignore
      //   }
      //
      //   // @assign
      //   let schedule = [];
      //
      //   // @switch
      //   if (responseBody
      //   && Array.isArray(responseBody)
      //   && responseBody.length) {
      //
      //     // @action
      //     schedule.push(...(responseBody.reverse()));
      //
      //   }
      //
      //   // @readme
      //   //  Might be necessary during the postseason, but 2024POST yields the exact same results as 2024REG for mlb for 2024-06-27. Not sure why they do this anyway instead of just using YYYY-MM-DD which is already provided.
      //   // // @action
      //   // try {
      //   //   responseBody = JSON.parse(await fa_cachefile(
      //   //     toolkit,
      //   //     navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
      //   //     ({
      //   //       'nba': '', // @todo: nba
      //   //       'nfl': '', // @todo: nfl
      //   //       'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/schedule/' + data['yyyymmdd'].substr(0, 4) + 'POST/' + data['yyyymmdd'].substr(0, 4) + '-' + data['yyyymmdd'].substr(4, 2) + '-' + data['yyyymmdd'].substr(6, 2) + '?key={{ API_KEY_BAKER }}'
      //   //     })[data['sport']],
      //   //     'API_KEY_BAKER'
      //   //   ));
      //   // } catch (e) {
      //   //   // @ignore
      //   // }
      //   //
      //   // // @switch
      //   // if (responseBody
      //   // && Array.isArray(responseBody)
      //   // && responseBody.length) {
      //   //
      //   //   // @action
      //   //   schedule.push(...responseBody);
      //   //
      //   // }
      //
      //   // @repeat
      //   for (
      //     let i1i = 0,
      //     i1n = data['tickers'].length;
      //     i1i < i1n;
      //     i1i += 1
      //   ) {
      //
      //     // @readme
      //     //  schedule[i2i] = {
      //     //    "away_team": "CIN"
      //     //    "away_team_money_line": 122
      //     //    "away_team_name": "Cincinnati Reds"
      //     //    "date": "2024-06-27T19:45:00"
      //     //    "day": "2024-06-27"
      //     //    "game_projections_url": "https://api.bakerengine.com/v2/mlb/projections/games/71934"
      //     //    "home_team": "STL"
      //     //    "home_team_money_line": -142
      //     //    "home_team_name": "St. Louis Cardinals"
      //     //    "over_under": 7.5
      //     //    "player_projections_url: "https://api.bakerengine.com/v2/mlb/projections/players/2024-06-27/avg?game_id=71934"
      //     //    "point_spread": -1.5
      //     //    "season": 2024
      //     //    "season_name": 2024
      //     //    "sportsdata_id": 71934
      //
      //     // @readme
      //     //  Finding which gameline (Baker API) corresponds to which matchup (GoalServe) is not super easy. The start times are not the same, and you have to use team names to guess if it's the same matchup. Start time is important in case there's a double header.
      //     //  matchup.id = 202406270030_mlb-1189_mlb-1067
      //     //  goalserve.datetime_utc = 27.06.2024 00:30
      //     //  baker.date = 2024-06-27T19:45:00 (missing Z at the end)
      //
      //     // @todo: Baker API schedule "date" field does not contain end in a "Z"
      //     //  Is it showing me the time for the timezone from which the request is being made... or local to the event?
      //     //  If local, I could use the home team name to map to timezone... however, that only works if the team is playing in their home stadium (sometimes the home team plays at a different venue, like Japan, so matching the times would not be as straightforward).
      //     //  Is the "requester's" local timezone, as a Cubs/Giants game in SF had date = "2024-06-27T15:45:00" (3:45PM EST) while the local start time in San Francisco was 12:46PM PST. THE REQUESTER IS AWS LAMBDA... which might not be the same timezone as the client.
      //     //  ... OR IS THE TIME ALWAYS EST???
      //
      //     // @assign
      //     let ticker = data['tickers'][i1i],
      //     matchup = data['tickers'][i1i]['matchup'],
      //     matchupMatched;
      //
      //     // @assign
      //     let matchupEventIds = JSON.parse(
      //       matchup.attributes['event_ids']['=']
      //     );
      //
      //     // @repeat
      //     for (
      //       let i2i = 0,
      //       i2n = schedule.length;
      //       i2i < i2n;
      //       i2i += 1
      //     ) {
      //
      //       // @switch
      //       if (matchupEventIds['baker_api_event_id'] === String(schedule[i2i]['sportsdata_id'])) {
      //
      //         // @assign
      //         matchupMatched = schedule[i2i];
      //
      //         // @action
      //         //  Optimization.
      //         schedule.splice(i2i, 1);
      //
      //         // @assign
      //         ticker['baker']['home_team'] = matchupMatched['home_team'],
      //         ticker['baker']['away_team'] = matchupMatched['away_team'];
      //
      //         // @assign
      //         ticker['baker']['over_under'] = ((ticker['baker']['over_under'] === '?') ? matchupMatched['over_under'] : ticker['baker']['over_under']),
      //         ticker['baker']['point_spread'] = ((ticker['baker']['point_spread'] === '?') ? matchupMatched['point_spread'] : ticker['baker']['point_spread']);
      //
      //         // @readme
      //         //  Initialize the game projected winner and odds using implied odds... but then request and update using the Baker API game projection "win" attribute.
      //
      //         // @assign
      //         let bakerHomeLine = matchupMatched['home_team_money_line'],
      //         bakerAwayLine = matchupMatched['away_team_money_line'];
      //
      //         // @assign
      //         let bakerHomeOdds = ((bakerHomeLine < 0) ? (bakerHomeLine / (bakerHomeLine - 100)) : (100 / (bakerHomeLine + 100))),
      //         bakerAwayOdds = ((bakerAwayLine < 0) ? (bakerAwayLine / (bakerAwayLine - 100)) : (100 / (bakerAwayLine + 100)));
      //
      //         // @assign
      //         ticker['baker']['win_side'] = ((ticker['baker']['win_side'] === '?') ? (bakerHomeOdds > bakerAwayOdds ? 'home' : 'away') : ticker['baker']['win_side']),
      //         ticker['baker']['win_odds'] = ((ticker['baker']['win_odds'] === '?') ? ((bakerHomeOdds > bakerAwayOdds ? bakerHomeOdds : bakerAwayOdds) * 100).toFixed(0) + '%' : ticker['baker']['win_odds']);
      //
      //         // @assign
      //         ticker['bakerUpdated'] = Date.now();
      //         data['setIntervalAllDataUpdated'] = Date.now();
      //
      //         // @action
      //         //  Do not await.
      //         //  Comment this "fa_cachefile" block out if you do not want to make ~16 extra requests per client site load, and are ok with just leaving the win_odds as the implied odds for the matchup.
      //         try {
      //           fa_cachefile(
      //             toolkit,
      //             navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
      //             ({
      //               'nba': '', // @todo: nba
      //               'nfl': '', // @todo: nfl
      //               'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/projections/games/' + matchupMatched['sportsdata_id'] + '?key={{ API_KEY_BAKER }}'
      //             })[ticker['sport']],
      //             'API_KEY_BAKER'
      //           ).then((responseBody) => {
      //
      //             // @action
      //             try {
      //               ticker['baker']['gameProjections'] = JSON.parse(responseBody);
      //             } catch (e) {
      //               // @ignore
      //             }
      //
      //             // @switch
      //             if (ticker['baker']['gameProjections']
      //             && ticker['baker']['gameProjections']['game_projections']
      //             && ticker['baker']['gameProjections']['home_team_projections']
      //             && ticker['baker']['gameProjections']['away_team_projections']) {
      //
      //               // @assign
      //               ticker['baker']['over_under'] = (ticker['baker']['gameProjections']['game_projections']['over_under'] > ticker['baker']['gameProjections']['game_projections']['runs'] ? 'U' : 'O') + ' ' + ticker['baker']['gameProjections']['game_projections']['runs'],
      //               ticker['baker']['point_spread'] = ticker['baker']['gameProjections']['game_projections']['spread'];
      //
      //               // @switch
      //               if (ticker['baker']['gameProjections']['home_team_projections']['win'] > ticker['baker']['gameProjections']['away_team_projections']['win']) {
      //
      //                 // @assign
      //                 ticker['baker']['win_side'] = 'home';
      //
      //                 // @assign
      //                 ticker['baker']['win_odds'] = (ticker['baker']['gameProjections']['home_team_projections']['win'] * 100).toFixed(0) + '%';
      //
      //               } else {
      //
      //                 // @assign
      //                 ticker['baker']['win_side'] = 'away';
      //
      //                 // @assign
      //                 ticker['baker']['win_odds'] = (ticker['baker']['gameProjections']['away_team_projections']['win'] * 100).toFixed(0) + '%';
      //
      //               }
      //
      //             }
      //
      //           });
      //         } catch (e) {
      //           // @ignore
      //         }
      //
      //         // @breaks
      //         break;
      //
      //       }
      //
      //     }
      //
      //     // @switch
      //     if (matchupMatched) {
      //
      //       // @assign
      //       //  If the request for BAKER failed for any reason, and this ticker was set to hidden, but then the next request was successful... unhide. This is only important if you leave the dashboard open all day. One bad request would have otherwise hidden everything for the rest of the day (unless you did a page reload) without this line.
      //       ticker['hidden'] = false;
      //
      //     } else {
      //
      //       // @assign
      //       //  Team names and game start time (from GoalServe) is similar enough to the result returned by the Baker API.
      //       //  If Baker does not return an entry in the schedule for this matchup for today, then that means that the game has already started or will not be played (scheduled postseason games that will never happen / series ended).
      //       ticker['hidden'] = true;
      //
      //     }
      //
      //   }
      //
      // }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
//  Baker API (matchup simulations).
const ma_update_ticker_simrates = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @modify 20240903
      //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
      // // @switch
      // if (ticker === null) {
      //
      //   // @prints
      //   console.log([
      //     'ma_update_ticker_simrates requires ticker (must await ma_init_tickers).'
      //   ]);
      //
      // } else {
      //
      //   // @switch
      //   if (ticker['matchup'].attributes['simulations']['='].length) {
      //
      //     // @switch
      //     if (ticker['baker']['simulationsMutex'] !== true) {
      //
      //       // @switch
      //       if (ticker['baker']['simulationsMutex'] !== false) {
      //
      //         // @assign
      //         ticker['baker']['simulationsMutex'] = false;
      //
      //         // @narrow
      //         try {
      //
      //           // @assign
      //           ticker['baker']['simulations'] = JSON.parse((await toolkit.utl.httpRequest(
      //             ticker['matchup'].attributes['simulations']['=']
      //           ))['body']);
      //
      //           // @assign
      //           ticker['baker']['simulationsMutex'] = true;
      //
      //           // @assign
      //           ticker['bakerUpdated'] = Date.now();
      //           ticker['baker']['simulationsUpdated'] = Date.now();
      //           data['setIntervalAllDataUpdated'] = Date.now();
      //
      //         } catch (e) {
      //
      //           // @assign
      //           ticker['baker']['simulationsMutex'] = null;
      //
      //           // @ignore
      //
      //         }
      //
      //       }
      //
      //     }
      //
      //   }
      //
      // }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_init_insights_for_team = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker,
  side
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @modify 20240903
      //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
      // // @switch
      // if (ticker === null
      // || ticker['bakerUpdated'] === null) {
      //
      //   // @switch
      //   if (ticker === null) {
      //
      //     // @prints
      //     console.log([
      //       'ma_init_insights_for_team requires ticker (must await ma_init_tickers).'
      //     ]);
      //
      //   } else if (ticker['bakerUpdated'] === null) {
      //
      //     // @prints
      //     //  Requires the baker home/away_team abbreviations.
      //     console.log([
      //       'ma_init_insights_for_team must await ma_update_tickers_simulations.'
      //     ]);
      //
      //   }
      //
      // } else {
      //
      //   // @switch
      //   if (ticker['baker'][side + '_insights_mutex'] === null
      //   || ticker['baker'][side + '_insights_mutex'] === true) {
      //
      //     // @assign
      //     ticker['baker'][side + '_insights_mutex'] = false;
      //
      //     // @narrow
      //     try {
      //
      //       // @assign
      //       let responseBody;
      //
      //       // @action
      //       try {
      //         responseBody = JSON.parse(await fa_cachefile(
      //           toolkit,
      //           navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
      //           ({
      //             'nba': '', // @todo: nba
      //             'nfl': '', // @todo: nfl
      //             'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/trends/' + ticker['yyyymmdd'].substr(0, 4) + '-' + ticker['yyyymmdd'].substr(4, 2) + '-' + ticker['yyyymmdd'].substr(6, 2) + '/' + ticker['baker'][side + '_team'] + '?key={{ API_KEY_BAKER }}'
      //           })[ticker['sport']],
      //           'API_KEY_BAKER'
      //         ));
      //       } catch (e) {
      //         // @ignore
      //       }
      //
      //       // @switch
      //       if (Array.isArray(responseBody)
      //       && responseBody.length) {
      //
      //         // @assign
      //         ticker['baker'][side + '_insights'].length = 0;
      //
      //         // @assign
      //         ticker['baker'][side + '_insights'].push(...responseBody);
      //
      //       }
      //
      //       // @assign
      //       ticker['baker'][side + '_insights_mutex'] = true;
      //
      //     } catch (e) {
      //
      //       // @assign
      //       ticker['baker'][side + '_insights_mutex'] = null;
      //
      //       // @throws
      //       throw new toolkit.utl.error(e.message);
      //
      //     }
      //
      //   }
      //
      // }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_init_insights_for_player = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker,
  tickerPlayer
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @modify 20240903
      //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
      // // @switch
      // if (ticker === null
      // || ticker['bakerUpdated'] === null
      // || tickerPlayer === null) {
      //
      //   // @switch
      //   if (ticker === null) {
      //
      //     // @prints
      //     console.log([
      //       'ma_init_insights_for_player requires ticker (must await ma_init_tickers).'
      //     ]);
      //
      //   } else if (ticker['bakerUpdated'] === null) {
      //
      //     // @prints
      //     //  If ma_update_tickers_simulations hasn't been called yet.
      //     console.log([
      //       'ma_init_insights_for_player must await ma_update_tickers_simulations.'
      //     ]);
      //
      //   } else if (tickerPlayer === null) {
      //
      //     // @prints
      //     console.log([
      //       'ma_init_insights_for_player requires tickerPlayer (must await ma_update_ticker_lineups).'
      //     ]);
      //
      //   }
      //
      // } else {
      //
      //   // @switch
      //   if (tickerPlayer['baker']['insights_mutex'] === null
      //   || tickerPlayer['baker']['insights_mutex'] === true) {
      //
      //     // @assign
      //     tickerPlayer['baker']['insights_mutex'] = false;
      //
      //     // @narrow
      //     try {
      //
      //       // @assign
      //       let matchupEventIds = JSON.parse(
      //         ticker['matchup'].attributes['event_ids']['=']
      //       );
      //
      //       // @assign
      //       let responseBody;
      //
      //       // @switch
      //       if (matchupEventIds['baker_api_event_id'].length) {
      //
      //         // @action
      //         try {
      //           responseBody = JSON.parse(await fa_cachefile(
      //             toolkit,
      //             navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
      //             ({
      //               'nba': '', // @todo: nba
      //               'nfl': '', // @todo: nfl
      //               'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/projections/players/' + ticker['yyyymmdd'].substr(0, 4) + '-' + ticker['yyyymmdd'].substr(4, 2) + '-' + ticker['yyyymmdd'].substr(6, 2) + '/avg?game_id=' + matchupEventIds['baker_api_event_id'] + '&key={{ API_KEY_BAKER }}'
      //             })[ticker['sport']],
      //             'API_KEY_BAKER'
      //           ));
      //         } catch (e) {
      //           throw new toolkit.utl.error(e.message);
      //         }
      //
      //       }
      //
      //       // @switch
      //       if (responseBody) {
      //
      //         // @assign
      //         let bakerTeamAbbreviation = ((tickerPlayer['playerTeamId'] === ticker['matchup'].attributes['home']['=']) ? ticker['baker']['home_team'] : ticker['baker']['away_team']);
      //
      //         // @assign
      //         let bakerPlayer;
      //
      //         // @repeat
      //         for (
      //           let i1i = 0,
      //           i1n = responseBody.length;
      //           i1i < i1n;
      //           i1i += 1
      //         ) {
      //
      //           // @todo: Improve matching, since sometimes we don't get a match (and what if 2 players in on this team have the same name???).
      //           // @switch
      //           //  Simple trim, lowercase, replace non-alpha/spaces to compare.
      //           if (bakerTeamAbbreviation === responseBody[i1i]['team']
      //           && tickerPlayer['player'].attributes['name']['='].trim().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '') === responseBody[i1i]['name'].trim().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '')) {
      //
      //             // @assign
      //             //  name: "Luis Rengifo"
      //             //  player_id: 10007973
      //             //  position: "3B"
      //             //  team: "LAA"
      //             bakerPlayer = responseBody[i1i];
      //
      //             // @breaks
      //             break;
      //
      //           }
      //
      //         }
      //
      //         // @switch
      //         if (bakerPlayer) {
      //
      //           // @action
      //           try {
      //             responseBody = JSON.parse(await fa_cachefile(
      //               toolkit,
      //               navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
      //               ({
      //                 'nba': '', // @todo: nba
      //                 'nfl': '', // @todo: nfl
      //                 'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/trends/' + ticker['yyyymmdd'].substr(0, 4) + '-' + ticker['yyyymmdd'].substr(4, 2) + '-' + ticker['yyyymmdd'].substr(6, 2) + '/players\/' + bakerPlayer['player_id'] + '?key={{ API_KEY_BAKER }}'
      //               })[ticker['sport']],
      //               'API_KEY_BAKER'
      //             ));
      //           } catch (e) {
      //             throw new toolkit.utl.error(e.message);
      //           }
      //
      //           // @switch
      //           if (Array.isArray(responseBody)
      //           && responseBody.length) {
      //
      //             // @assign
      //             tickerPlayer['baker']['insights'].length = 0;
      //
      //             // @assign
      //             tickerPlayer['baker']['insights'].push(...responseBody);
      //
      //           }
      //
      //         }
      //
      //       }
      //
      //       // @assign
      //       tickerPlayer['baker']['insights_mutex'] = true;
      //
      //     } catch (e) {
      //
      //       // @assign
      //       tickerPlayer['baker']['insights_mutex'] = null;
      //
      //       // @throws
      //       throw new toolkit.utl.error(e.message);
      //
      //     }
      //
      //   }
      //
      // }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

////////////////////////////////////////////////////////////////////////////////

// @signature
const ma_init_ticker_chart_data_for_team = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker,
  side
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @assign
      let action;

      // @switch
      if (ticker['matchup'].lists['membersdb.teams'].items.length < 1) {
        // @action
        action = fs_init_action(
          ticker['matchup'].lists['membersdb.teams'].actions['GET'],
          {},
          true,
          navigator.dom.constructor.fs_action_default_search_init
        );

        // @action
        await action.ma_resubmit();
      }

      // @assign
      let team =
        ticker['matchup'].lists['membersdb.teams'].xitems[ticker['matchup'].attributes[side]['=']][
          '&'
        ];

      // @switch
      if (
        team.lists['membersdb.matchups'].items.length < 1 ||
        team.lists['membersdb.matchups'].actions['GET'].fields['kSMarker'].value !==
          ticker['matchup'].attributes['id']['=']
      ) {
        // @action
        action = fs_init_action(
          team.lists['membersdb.matchups'].actions['GET'],
          {
            kSMarker: ticker['matchup'].attributes['id']['=']
          },
          true,
          navigator.dom.constructor.fs_action_default_search_init
        );

        // @action
        await action.ma_resubmit();
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_init_ticker_chart_data_for_player = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker,
  tickerPlayer
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @assign
      let action;

      // @switch
      if (
        tickerPlayer['player'].lists['membersdb.performances'].items.length < 1 ||
        tickerPlayer['player'].lists['membersdb.performances'].actions['GET'].fields['kSMarker']
          .value !==
          ticker['matchup'].attributes['id']['='] +
            '_' +
            tickerPlayer['player'].attributes['goalserve_id']['=']
      ) {
        // @action
        action = fs_init_action(
          tickerPlayer['player'].lists['membersdb.performances'].actions['GET'],
          {
            kSMarker:
              ticker['matchup'].attributes['id']['='] +
              '_' +
              tickerPlayer['player'].attributes['goalserve_id']['=']
          },
          true,
          navigator.dom.constructor.fs_action_default_search_init
        );
        // @action
        await action.ma_resubmit();
      }

      // @switch
      if (
        tickerPlayer['player'].lists['membersdb.matchups'].items.length < 1 ||
        tickerPlayer['player'].lists['membersdb.matchups'].actions['GET'].fields['kSMarker']
          .value !== ticker['matchup'].attributes['id']['=']
      ) {
        // @action
        action = fs_init_action(
          tickerPlayer['player'].lists['membersdb.matchups'].actions['GET'],
          {
            kSMarker: ticker['matchup'].attributes['id']['=']
          },
          true,
          navigator.dom.constructor.fs_action_default_search_init
        );

        // @action
        await action.ma_resubmit();
      }

      // @return
      resolve(tickerPlayer);
      return;
    } catch (e) {
      console.log('ma_init_ticker_chart_data_for_player', e);
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_generate_chart_for_team = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker,
  side,
  chart,
  chartMarket = '',
  filterName = ''
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (ticker === null) {
        // @prints
        console.log(['ma_generate_chart_for_team requires ticker (must await ma_init_tickers).']);
      } else {
        // @switch
        if (ticker['gamelinesUpdated'] === null) {
          // @prints
          console.log(['ma_generate_chart_for_team should await ma_update_tickers_gamelines.']);
        }

        // @switch
        if (chart['loaded'] === null || chart['loaded'] === true) {
          // @narrow
          try {
            // @assign
            chart['loaded'] = false;

            // @action
            await ma_init_ticker_chart_data_for_team(
              toolkit,
              component,
              navigator,
              context,
              componentData,
              ticker,
              side
            );

            // @switch
            if (!chartMarket) {
              // @switch
              if (chart['market']) {
                // @assign
                chartMarket = chart['market'];
              } else {
                // @assign
                chartMarket = data['mapSportToChartDefaultGameline'][ticker['sport']];
              }
            }

            // @switch
            if (filterName.length) {
              // @assign
              //  Filter values are changed in a carousel type fashion. By clicking a filter button, the next value for the filter (defined below) is set.
              chart['filterValues'][filterName] = {
                side: {
                  '': 'home',
                  home: 'away',
                  away: ''
                },
                500: {
                  '': 'above',
                  above: 'below',
                  below: ''
                },
                '10def': {
                  '': 't10def',
                  t10def: 'b10def',
                  b10def: ''
                },
                recent: {
                  '': '25',
                  25: ''
                }
              }[filterName][chart['filterValues'][filterName]];
            }

            // @assign
            chart['market'] = chartMarket;

            // @assign
            let opoint = ticker['gamelines'][chart['market']]['opoint'],
              oprice = ticker['gamelines'][chart['market']]['oprice'];

            // @assign
            let matchups =
              ticker['matchup'].lists['membersdb.teams'].xitems[
                ticker['matchup'].attributes[side]['=']
              ]['&'].lists['membersdb.matchups'].items;

            // @assign
            let bars = [];

            // @repeat
            for (let i1i = 0, i1n = matchups.length; i1i < i1n; i1i += 1) {
              // @switch
              //  Only process this matchup if it's final and if it occurred prior to the supplied start date.
              if (
                matchups[i1i].attributes['status']['='] === 'final' &&
                matchups[i1i].attributes['id']['='] < ticker['matchup'].attributes['id']['=']
              ) {
                // @readme
                //  id "=": "202311110030_nba-1067_nba-8055
                //  home "=": "nba-1067"
                //  away "=": "nba-8055"
                let againstId, // the Id of the team this matchup is against
                  performanceSide; // the side our team is on for this matchup

                // @switch
                if (
                  matchups[i1i].attributes['away']['='] === ticker['matchup'].attributes[side]['=']
                ) {
                  // @assign
                  (againstId = matchups[i1i].attributes['home']['=']), (performanceSide = 'away');
                } else {
                  // @assign
                  (againstId = matchups[i1i].attributes['away']['=']), (performanceSide = 'home');
                }

                // @assign
                let passesFilters = true;

                // @assign
                let meta;

                // @action
                try {
                  meta = JSON.parse(matchups[i1i].attributes['meta']['=']);
                } catch (e) {
                  passesFilters = false;
                }

                // @assign
                //  The rank of the opponent during this prior matchup.
                let againstRank =
                  meta[(performanceSide === 'home' ? 'away' : 'home') + '_season_record_rank'];

                // @switch
                if (data['teamsX'][againstId] && meta) {
                  // @switch
                  if (chart['filterValues']['side'] !== '') {
                    if (chart['filterValues']['side'] !== performanceSide) {
                      passesFilters = false;
                    }
                  }

                  // @switch
                  if (chart['filterValues']['500'] !== '') {
                    if (chart['filterValues']['500'] === 'above') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                          ] /
                            (meta[
                              (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                            ] +
                              meta[
                                (performanceSide === 'home' ? 'away' : 'home') +
                                  '_season_losses_total'
                              ]) >=
                          0.5
                        )
                      ) {
                        passesFilters = false;
                      }
                    } else if (chart['filterValues']['500'] === 'below') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                          ] /
                            (meta[
                              (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                            ] +
                              meta[
                                (performanceSide === 'home' ? 'away' : 'home') +
                                  '_season_losses_total'
                              ]) <=
                          0.5
                        )
                      ) {
                        passesFilters = false;
                      }
                    }
                  }

                  // @switch
                  if (chart['filterValues']['10def'] !== '') {
                    if (chart['filterValues']['10def'] === 't10def') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') +
                              '_season_points_against_rank'
                          ] < 11
                        )
                      ) {
                        passesFilters = false;
                      }
                    } else if (chart['filterValues']['10def'] === 'b10def') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') +
                              '_season_points_against_rank'
                          ] >
                          data['mapSportToRankTeams'][ticker['sport']] - 10
                        )
                      ) {
                        passesFilters = false;
                      }
                    }
                  }

                  // @switch
                  if (passesFilters) {
                    // @assign
                    //  The name of the team our team played against during this prior matchup.
                    let againstName = data['teamsX'][againstId].attributes['name']['='];

                    // @assign
                    let value = 0,
                      color = 'transparent',
                      success = 0;

                    // @switch
                    // total_over, total_under, home_spread, away_spread, home_h2h, away_h2h
                    if (ticker['sport'] === 'nba') {
                      // @switch
                      if (chart['market'].split('_').pop() === 'h2h') {
                        // @assign
                        value =
                          matchups[i1i].attributes['away']['='] ===
                          ticker['matchup'].attributes[side]['=']
                            ? parseInt(matchups[i1i].attributes['away_score']['=']) >=
                              parseInt(matchups[i1i].attributes['home_score']['='])
                            : parseInt(matchups[i1i].attributes['home_score']['=']) >=
                              parseInt(matchups[i1i].attributes['away_score']['=']);

                        // @assign
                        value = value ? 'W' : 'L';

                        // @assign
                        color =
                          oprice !== '?'
                            ? value === 'W'
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value === 'W' ? 1 : -1) : 0;
                      } else if (chart['market'].split('_').pop() === 'spread') {
                        // @assign
                        value =
                          matchups[i1i].attributes['away']['='] ===
                          ticker['matchup'].attributes[side]['=']
                            ? parseInt(matchups[i1i].attributes['away_score']['=']) -
                              parseInt(matchups[i1i].attributes['home_score']['='])
                            : parseInt(matchups[i1i].attributes['home_score']['=']) -
                              parseInt(matchups[i1i].attributes['away_score']['=']);

                        // @assign
                        color =
                          oprice !== '?'
                            ? value >= opoint * -1
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value >= opoint * -1 ? 1 : -1) : 0;
                      } else if (chart['market'] === 'total_over') {
                        // @assign
                        value =
                          parseInt(matchups[i1i].attributes['away_score']['=']) +
                          parseInt(matchups[i1i].attributes['home_score']['=']);

                        // @assign
                        color =
                          oprice !== '?'
                            ? value >= opoint
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value >= opoint ? 1 : -1) : 0;
                      }
                    } else if (ticker['sport'] === 'nfl') {
                      // @switch
                      if (chart['market'].split('_').pop() === 'h2h') {
                        // @assign
                        value =
                          matchups[i1i].attributes['away']['='] ===
                          ticker['matchup'].attributes[side]['=']
                            ? parseInt(matchups[i1i].attributes['away_score']['=']) >=
                              parseInt(matchups[i1i].attributes['home_score']['='])
                            : parseInt(matchups[i1i].attributes['home_score']['=']) >=
                              parseInt(matchups[i1i].attributes['away_score']['=']);

                        // @assign
                        value = value ? 'W' : 'L';

                        // @assign
                        color =
                          oprice !== '?'
                            ? value === 'W'
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value === 'W' ? 1 : -1) : 0;
                      } else if (chart['market'].split('_').pop() === 'spread') {
                        // @assign
                        value =
                          matchups[i1i].attributes['away']['='] ===
                          ticker['matchup'].attributes[side]['=']
                            ? parseInt(matchups[i1i].attributes['away_score']['=']) -
                              parseInt(matchups[i1i].attributes['home_score']['='])
                            : parseInt(matchups[i1i].attributes['home_score']['=']) -
                              parseInt(matchups[i1i].attributes['away_score']['=']);

                        // @assign
                        color =
                          oprice !== '?'
                            ? value >= opoint * -1
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value >= opoint * -1 ? 1 : -1) : 0;
                      } else if (chart['market'] === 'total_over') {
                        // @assign
                        value =
                          parseInt(matchups[i1i].attributes['away_score']['=']) +
                          parseInt(matchups[i1i].attributes['home_score']['=']);

                        // @assign
                        color =
                          oprice !== '?'
                            ? value >= opoint
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value >= opoint ? 1 : -1) : 0;
                      }
                    } else if (ticker['sport'] === 'mlb') {
                      // @switch
                      if (chart['market'].split('_').pop() === 'h2h') {
                        // @assign
                        value =
                          matchups[i1i].attributes['away']['='] ===
                          ticker['matchup'].attributes[side]['=']
                            ? parseInt(matchups[i1i].attributes['away_score']['=']) >=
                              parseInt(matchups[i1i].attributes['home_score']['='])
                            : parseInt(matchups[i1i].attributes['home_score']['=']) >=
                              parseInt(matchups[i1i].attributes['away_score']['=']);

                        // @assign
                        value = value ? 'W' : 'L';

                        // @assign
                        color =
                          oprice !== '?'
                            ? value === 'W'
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value === 'W' ? 1 : -1) : 0;
                      } else if (chart['market'].split('_').pop() === 'spread') {
                        // @assign
                        value =
                          matchups[i1i].attributes['away']['='] ===
                          ticker['matchup'].attributes[side]['=']
                            ? parseInt(matchups[i1i].attributes['away_score']['=']) -
                              parseInt(matchups[i1i].attributes['home_score']['='])
                            : parseInt(matchups[i1i].attributes['home_score']['=']) -
                              parseInt(matchups[i1i].attributes['away_score']['=']);

                        // @assign
                        color =
                          oprice !== '?'
                            ? value >= opoint * -1
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value >= opoint * -1 ? 1 : -1) : 0;
                      } else if (chart['market'] === 'total_over') {
                        // @assign
                        value =
                          parseInt(matchups[i1i].attributes['away_score']['=']) +
                          parseInt(matchups[i1i].attributes['home_score']['=']);

                        // @assign
                        color =
                          oprice !== '?'
                            ? value >= opoint
                              ? 'rgba(42,253,64,1)'
                              : 'rgba(252,27,36,1)'
                            : 'rgba(0,0,255,1)';

                        // @assign
                        success = oprice !== '?' ? (value >= opoint ? 1 : -1) : 0;
                      }
                    }

                    // @action
                    bars.push({
                      success: success,
                      color: color,
                      value: value,
                      opoint: opoint,
                      againstName:
                        (performanceSide === 'home' ? 'v' : '@') +
                        againstName.substr(0, 3).toUpperCase(),
                      againstRank: againstRank
                    });
                  }
                }
              }
            }

            // @action
            fs_chart_postprocess(chart, bars, oprice, opoint);

            // @assign
            let matchupEventIds = JSON.parse(ticker['matchup'].attributes['event_ids']['=']);

            // @switch
            if (opoint === '?') {
              // @assign
              chart['loaded'] = true;
            } else {
              // @switch
              if (chart['market'].split('_').pop() === 'h2h') {
                // @modify 20240903
                //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
                // // @assign
                // chart['statsSR'] = ((ticker['baker']['gameProjections'][side + '_team_projections']) ? (ticker['baker']['gameProjections'][side + '_team_projections']['win'] * 100).toFixed(0) + '%' : 'N/A');

                // @assign
                chart['loaded'] = true;
              } else if (chart['market'].split('_').pop() === 'spread') {
                // @modify 20240903
                //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
                // // @action
                // fa_cachefile(
                //   toolkit,
                //   navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
                //   ({
                //     'nba': '', // @todo: nba
                //     'nfl': '', // @todo: nfl
                //     'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/query/games/' + matchupEventIds['baker_api_event_id'] + '?key={{ API_KEY_BAKER }}&metric=spread&value=' + opoint + '&operator=gte'
                //   })[ticker['sport']],
                //   'API_KEY_BAKER'
                // ).then((cachefileResponse) => {
                //
                //   chart['statsSR'] = ((JSON.parse(
                //     cachefileResponse
                //   ))['probability'] * 100).toFixed(0) + '%';
                //
                // }).catch((e) => {
                //
                //   // @assign
                //   chart['statsSR'] = 'N/A';
                //
                // }).finally(() => {
                //
                //   // @assign
                //   chart['loaded'] = true;
                //
                // });
                chart['loaded'] = true;
              } else if (chart['market'] === 'total_over') {
                // @modify 20240903
                //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
                // // @assign
                // let metric = ({
                //   'nba': 'points',
                //   'nfl': '', // @todo: nfl
                //   'mlb': 'runs'
                // })[ticker['sport']];
                //
                // // @action
                // fa_cachefile(
                //   toolkit,
                //   navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
                //   ({
                //     'nba': '', // @todo: nba
                //     'nfl': '', // @todo: nfl
                //     'mlb': 'https://baker-api.sportsdata.io/baker/v2/mlb/query/games/' + matchupEventIds['baker_api_event_id'] + '?key={{ API_KEY_BAKER }}&metric=' + metric + '&value=' + opoint + '&operator=gte'
                //   })[ticker['sport']],
                //   'API_KEY_BAKER'
                // ).then((cachefileResponse) => {
                //
                //   chart['statsSR'] = ((JSON.parse(
                //     cachefileResponse
                //   ))['probability'] * 100).toFixed(0) + '%';
                //
                // }).catch((e) => {
                //
                //   // @assign
                //   chart['statsSR'] = 'N/A';
                //
                // }).finally(() => {
                //
                //   // @assign
                //   chart['loaded'] = true;
                //
                // });
                chart['loaded'] = true;
              }
            }
          } catch (e) {
            // @assign
            chart['loaded'] = null;

            // @throws
            throw new toolkit.utl.error(e.message);
          }
        }
      }

      // @return
      resolve(chart);
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_generate_chart_for_player = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  ticker,
  tickerPlayer,
  chart,
  chartMarket = '',
  filterName = ''
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (ticker === null || tickerPlayer === null) {
        // @switch
        if (ticker === null) {
          // @prints
          console.log([
            'ma_generate_chart_for_player requires ticker (must await ma_init_tickers).'
          ]);
        } else if (tickerPlayer === null) {
          // @prints
          console.log([
            'ma_generate_chart_for_player requires tickerPlayer (must await ma_update_ticker_lineups).'
          ]);
        }
      } else {
        // @switch
        if (tickerPlayer['propositionsUpdated'] === null) {
          // @prints
          console.log(['ma_generate_chart_for_player should await ma_update_ticker_propositions.']);
        }

        // @switch
        if (chart['loaded'] === null || chart['loaded'] === true) {
          // @narrow
          try {
            // @assign
            chart['loaded'] = false;

            // @action
            await ma_init_ticker_chart_data_for_player(
              toolkit,
              component,
              navigator,
              context,
              componentData,
              ticker,
              tickerPlayer
            );

            // @switch
            if (!chartMarket) {
              // @switch
              if (chart['market']) {
                // @assign
                chartMarket = chart['market'];
              } else {
                // @switch
                if (ticker['sport'] === 'mlb') {
                  // @assign
                  chartMarket =
                    data['mapSportToChartDefaultMarket'][ticker['sport']][
                      tickerPlayer['playerPosition'].toUpperCase().indexOf('P') > -1
                        ? 'pitcher'
                        : 'batter'
                    ];
                } else {
                  // @assign
                  chartMarket = data['mapSportToChartDefaultMarket'][ticker['sport']];
                }
              }
            }

            // @switch
            if (tickerPlayer['propositions'].hasOwnProperty(chartMarket) !== true) {
              // @switch
              if (ticker['sport'] === 'mlb') {
                // @assign
                chartMarket =
                  data['mapSportToChartDefaultMarket'][ticker['sport']][
                    tickerPlayer['playerPosition'].toUpperCase().indexOf('P') > -1
                      ? 'pitcher'
                      : 'batter'
                  ];
              } else {
                // @assign
                chartMarket = data['mapSportToChartDefaultMarket'][ticker['sport']];
              }
            }

            // @switch
            if (filterName.length) {
              // @assign
              //  Filter values are changed in a carousel type fashion. By clicking a filter button, the next value for the filter (defined below) is set.
              chart['filterValues'][filterName] = {
                side: {
                  '': 'home',
                  home: 'away',
                  away: ''
                },
                500: {
                  '': 'above',
                  above: 'below',
                  below: ''
                },
                '10def': {
                  '': 't10def',
                  t10def: 'b10def',
                  b10def: ''
                },
                recent: {
                  '': '25',
                  25: ''
                }
              }[filterName][chart['filterValues'][filterName]];
            }

            // @assign
            chart['market'] = chartMarket;

            // @assign
            let opoint = tickerPlayer['propositions'][chart['market']]['opoint'],
              oprice = tickerPlayer['propositions'][chart['market']]['oprice'];

            // @assign
            let matchupsX = tickerPlayer['matchupsX'];

            // @assign
            let performances = tickerPlayer['performances'];

            // @assign
            let performanceId = [
              ticker['matchup'].attributes['id']['='],
              tickerPlayer['player'].attributes['goalserve_id']['=']
            ].join('_');

            // @assign
            let mapMarketsToAttributes = data['mapMarketsToAttributes'][ticker['sport']];

            // @assign
            let bars = [];

            // @repeat
            for (let i1i = 0, i1n = performances.length; i1i < i1n; i1i += 1) {
              // @switch
              //  Only process this performance if it's final and if it occurred prior to the supplied start date.
              if (
                performances[i1i].attributes['status']['='] === 'final' &&
                performances[i1i].attributes['id']['='] < performanceId
              ) {
                // @readme
                //  id "=": "202311110030_nba-1067_nba-8055_nba-3917376"
                //  team "=": "nba-1067"
                let againstId, // the Id of the team this performance is against
                  performanceSide; // the side our player is on for this performance

                // @switch
                if (
                  performances[i1i].attributes['id']['='].split('_')[2] ===
                  performances[i1i].attributes['team']['=']
                ) {
                  // @assign
                  (againstId = performances[i1i].attributes['id']['='].split('_')[1]),
                    (performanceSide = 'away');
                } else {
                  // @assign
                  (againstId = performances[i1i].attributes['id']['='].split('_')[2]),
                    (performanceSide = 'home');
                }

                // @assign
                let passesFilters = true;

                // @assign
                let meta;

                // @action
                try {
                  meta = JSON.parse(
                    matchupsX[
                      performances[i1i].attributes['id']['='].split('_').slice(0, 3).join('_')
                    ]['&'].attributes['meta']['=']
                  );
                } catch (e) {
                  passesFilters = false;
                }

                // @assign
                //  The rank of the opponent during this prior performance.
                let againstRank =
                  meta[(performanceSide === 'home' ? 'away' : 'home') + '_season_record_rank'];

                // @switch
                if (data['teamsX'][againstId] && meta) {
                  // @switch
                  if (chart['filterValues']['side'] !== '') {
                    if (chart['filterValues']['side'] !== performanceSide) {
                      passesFilters = false;
                    }
                  }

                  // @switch
                  if (chart['filterValues']['500'] !== '') {
                    if (chart['filterValues']['500'] === 'above') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                          ] /
                            (meta[
                              (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                            ] +
                              meta[
                                (performanceSide === 'home' ? 'away' : 'home') +
                                  '_season_losses_total'
                              ]) >=
                          0.5
                        )
                      ) {
                        passesFilters = false;
                      }
                    } else if (chart['filterValues']['500'] === 'below') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                          ] /
                            (meta[
                              (performanceSide === 'home' ? 'away' : 'home') + '_season_wins_total'
                            ] +
                              meta[
                                (performanceSide === 'home' ? 'away' : 'home') +
                                  '_season_losses_total'
                              ]) <=
                          0.5
                        )
                      ) {
                        passesFilters = false;
                      }
                    }
                  }

                  // @switch
                  if (chart['filterValues']['10def'] !== '') {
                    if (chart['filterValues']['10def'] === 't10def') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') +
                              '_season_points_against_rank'
                          ] < 11
                        )
                      ) {
                        passesFilters = false;
                      }
                    } else if (chart['filterValues']['10def'] === 'b10def') {
                      if (
                        !(
                          meta[
                            (performanceSide === 'home' ? 'away' : 'home') +
                              '_season_points_against_rank'
                          ] >
                          data['mapSportToRankTeams'][ticker['sport']] - 10
                        )
                      ) {
                        passesFilters = false;
                      }
                    }
                  }

                  // @switch
                  if (passesFilters) {
                    // @assign
                    //  The name of the team our player played against during this prior performance.
                    let againstName = data['teamsX'][againstId].attributes['name']['='];

                    // @assign
                    let metaPerformance = JSON.parse(performances[i1i].attributes['meta']['=']);

                    // @switch
                    if (
                      typeof metaPerformance === 'object' &&
                      metaPerformance !== null &&
                      Array.isArray(metaPerformance) !== true &&
                      metaPerformance.hasOwnProperty(mapMarketsToAttributes[chart['market']])
                    ) {
                      // @assign
                      let metaValue = parseFloat(
                        metaPerformance[mapMarketsToAttributes[chart['market']]]
                      );

                      // @switch
                      //  Custom calculations for certain markets.
                      if (ticker['sport'] === 'nba') {
                        // @readme
                        //  All of these performance fields are pre-calculated.
                      } else if (ticker['sport'] === 'nfl') {
                        // @check: nfl
                        // @readme
                        //  All of these performance fields are pre-calculated.
                      } else if (ticker['sport'] === 'mlb') {
                        // @readme
                        //  All of these performance fields are pre-calculated.
                      }

                      // @action
                      bars.push(
                        oprice !== '?'
                          ? metaValue >= opoint
                            ? {
                                success: 1,
                                color: 'rgba(42,253,64,1)',
                                value: metaValue,
                                opoint: opoint,
                                againstName:
                                  (performanceSide === 'home' ? 'v' : '@') +
                                  againstName.substr(0, 3).toUpperCase(),
                                againstRank: againstRank
                              }
                            : {
                                success: -1,
                                color: 'rgba(252,27,36,1)',
                                value: metaValue,
                                opoint: opoint,
                                againstName:
                                  (performanceSide === 'home' ? 'v' : '@') +
                                  againstName.substr(0, 3).toUpperCase(),
                                againstRank: againstRank
                              }
                          : {
                              success: 0,
                              color: 'rgba(0,0,255,1)',
                              value: metaValue,
                              opoint: 0,
                              againstName:
                                (performanceSide === 'home' ? 'v' : '@') +
                                againstName.substr(0, 3).toUpperCase(),
                              againstRank: againstRank
                            }
                      );
                    }
                  }
                }
              }
            }

            // @action
            fs_chart_postprocess(chart, bars, oprice, opoint);

            // @modify 20240903
            //  Comment out BAKER / temporary contract dispute between GoatedBets and SportsData (do NOT remove code)
            // // @narrow
            // try {
            //
            //   // @action
            //   chart['statsSR'] = ms_calc_simrate(
            //     toolkit,
            //     component,
            //     navigator,
            //     context,
            //     componentData,
            //     ticker['baker']['simulations'],
            //     tickerPlayer['player'].attributes['name']['='],
            //     chart['market'],
            //     opoint,
            //     'Over',
            //     tickerPlayer['performance'].attributes['id']['='],
            //     mapMarketsToAttributes[chart['market']],
            //     'percentage'
            //   );
            //
            //   // @switch
            //   if (chart['statsSR'].substr(-1) === '%') {
            //
            //     // @assign
            //     chart['statsSR'] = parseFloat(chart['statsSR'].slice(0, -1)).toFixed(0) + '%';
            //
            //   }
            //
            // } catch (e) {
            //
            //   // @assign
            //   chart['statsSR'] = 'N/A';
            //
            //   // @ignore
            //
            // }

            // @assign
            chart['loaded'] = true;
          } catch (e) {
            // @assign
            chart['loaded'] = null;

            // @throws
            throw new toolkit.utl.error(e.message);
          }
        }
      }

      // @return
      resolve(chart);
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ms_generate_stats_for_player = function (toolkit, ticker, tickerPlayer, toggleStats = false) {
  try {
    // @assign
    let seasonStats = [],
      seasonStatsRaw = {},
      matchupSeason = ticker['matchup'].attributes['season']['='],
      performances = tickerPlayer['player'].lists['membersdb.performances'].items;

    // @repeat
    for (let i1i = 0, i1n = performances.length; i1i < i1n; i1i += 1) {
      // @switch
      //  The kSLimit for performances is enough to cover the past full season for any sport + playoffs (184 games). So we might get games from a previous season, which we don't want to include while calculating this season's stats for this player.
      if (
        performances[i1i].attributes['season']['='] === matchupSeason &&
        performances[i1i].attributes['status']['='] === 'final'
      ) {
        // @assign
        let performanceMeta = {};

        // @action
        try {
          performanceMeta = JSON.parse(performances[i1i].attributes['meta']['=']);
        } catch (e) {
          // @ignore
        }

        // @repeat
        for (let i2k in performanceMeta) {
          // @switch
          if (performanceMeta.hasOwnProperty(i2k)) {
            // @switch
            if (
              typeof performanceMeta[i2k] === 'string' &&
              performanceMeta[i2k].match(/^[0-9]+$/g)
            ) {
              // @switch
              if (seasonStatsRaw.hasOwnProperty(i2k)) {
                // @assign
                seasonStatsRaw[i2k] += parseInt(performanceMeta[i2k]);
              } else {
                // @assign
                seasonStatsRaw[i2k] = parseInt(performanceMeta[i2k]);
              }
            } else if (i2k === 'pitcher_innings_pitched') {
              // @switch
              if (seasonStatsRaw.hasOwnProperty(i2k)) {
                // @assign
                let innA = seasonStatsRaw[i2k].split('.').concat(Array(2).fill('0')).slice(0, 2),
                  innB = performanceMeta[i2k].split('.').concat(Array(2).fill('0')).slice(0, 2);

                // @assign
                let innC1 = parseInt(innA[0]) + parseInt(innB[0]),
                  innC2 = parseInt(innA[1]) + parseInt(innB[1]);

                // @switch
                if (innC2 >= 3) {
                  // @assign
                  (innC1 += 1), (innC2 -= 3);
                }

                // @assign
                seasonStatsRaw[i2k] = String(innC1) + '.' + String(innC2);
              } else {
                // @assign
                seasonStatsRaw[i2k] = performanceMeta[i2k];
              }
            }
          }
        }
      }
    }

    // @switch
    if (tickerPlayer['player'].attributes['sport']['='] === 'nba') {
      // @readme
      //  points, total_rebounds, assists, threepoint_goals_made, blocks, steals
      // @todo: nba
    } else if (tickerPlayer['player'].attributes['sport']['='] === 'nfl') {
      // @readme
      //  passing_yards, rushing_yards, receiving_yards, kicking_field_goals

      // @check: nfl

      // @action
      seasonStats.push({
        atr: data['mapAttributesToStatsShort'][tickerPlayer['player'].attributes['sport']['=']][
          'passing_yards'
        ],
        val: seasonStatsRaw['passing_yards'] ? seasonStatsRaw['passing_yards'] : 0
      });

      // @action
      seasonStats.push({
        atr: data['mapAttributesToStatsShort'][tickerPlayer['player'].attributes['sport']['=']][
          'rushing_yards'
        ],
        val: seasonStatsRaw['rushing_yards'] ? seasonStatsRaw['rushing_yards'] : 0
      });

      // @action
      seasonStats.push({
        atr: data['mapAttributesToStatsShort'][tickerPlayer['player'].attributes['sport']['=']][
          'receiving_yards'
        ],
        val: seasonStatsRaw['receiving_yards'] ? seasonStatsRaw['receiving_yards'] : 0
      });

      // @action
      seasonStats.push({
        atr: data['mapAttributesToStatsShort'][tickerPlayer['player'].attributes['sport']['=']][
          'kicking_field_goals'
        ],
        val: seasonStatsRaw['kicking_field_goals'] ? seasonStatsRaw['kicking_field_goals'] : 0
      });
    } else if (tickerPlayer['player'].attributes['sport']['='] === 'mlb') {
      // @readme
      //  batter_at_bats, batter_cs, batter_doubles, batter_hit_by_pitch, batter_hits, batter_home_runs, batter_runs, batter_runs_batted_in, batter_sac_fly, batter_singles, batter_stolen_bases, batter_strikeouts, batter_total_bases, batter_triples, batter_walks
      //  pitcher_earned_runs, pitcher_hbp, pitcher_hits, pitcher_home_runs, pitcher_runs, pitcher_strikeouts, pitcher_walks

      // @switch
      if (
        (tickerPlayer['playerPosition'].toUpperCase().indexOf('P') > -1 && toggleStats !== true) ||
        (tickerPlayer['playerPosition'].toUpperCase().indexOf('P') === -1 && toggleStats === true)
      ) {
        // @action
        seasonStats.push({
          atr: data['mapAttributesToStatsShort'][tickerPlayer['player'].attributes['sport']['=']][
            'pitcher_strikeouts'
          ],
          val: seasonStatsRaw['pitcher_strikeouts']
        });
      } else if (
        (tickerPlayer['playerPosition'].toUpperCase().indexOf('P') === -1 &&
          toggleStats !== true) ||
        (tickerPlayer['playerPosition'].toUpperCase().indexOf('P') < -1 && toggleStats === true)
      ) {
        // @action
        seasonStats.push(
          ...[
            {
              atr: data['mapAttributesToStatsShort'][
                tickerPlayer['player'].attributes['sport']['=']
              ]['batter_home_runs'],
              val: seasonStatsRaw['batter_home_runs']
            },
            {
              atr: data['mapAttributesToStatsShort'][
                tickerPlayer['player'].attributes['sport']['=']
              ]['batter_stolen_bases'],
              val: seasonStatsRaw['batter_stolen_bases']
            },
            {
              atr: data['mapAttributesToStatsShort'][
                tickerPlayer['player'].attributes['sport']['=']
              ]['batter_runs_batted_in'],
              val: seasonStatsRaw['batter_runs_batted_in']
            },
            {
              atr: data['mapAttributesToStatsShort'][
                tickerPlayer['player'].attributes['sport']['=']
              ]['batter_hits'],
              val: seasonStatsRaw['batter_hits']
            }
          ]
        );
      }
    }

    // @return
    return {
      seasonStats: seasonStats,
      seasonStatsRaw: seasonStatsRaw
    };
  } catch (e) {
    throw new toolkit.utl.error(e.message);
  }
};

// @signature
const ma_betslip_submit = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  betslip
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (data['betPlaceMutex'] === false) {
        // @assign
        data['betPlaceMutex'] = true;

        // @narrow
        try {
          // @assign
          let sharpSportsEvents = {};

          // @repeat
          for (let i1k in betslip) {
            // @switch
            if (betslip.hasOwnProperty(i1k)) {
              // @assign
              let i1v = betslip[i1k];

              // @repeat
              for (let i2i = 0, i2n = i1v['bets'].length; i2i < i2n; i2i += 1) {
                // @assign
                let matchupEventIds = JSON.parse(
                  i1v['tickers'][i2i]['matchup'].attributes['event_ids']['=']
                );

                // @switch
                if (matchupEventIds['sharpsports_api_event_id'].length) {
                  // @assign
                  sharpSportsEvents[matchupEventIds['sharpsports_api_event_id']] = null;
                }
              }
            }
          }

          // @assign
          let sharpSportsEventsLines = {};

          // @repeat
          for (let i1k in sharpSportsEvents) {
            // @switch
            if (sharpSportsEvents.hasOwnProperty(i1k)) {
              // @action
              //  Although the limit is set to MAX, the real number of results returned are 571, 631, 668 etc. so probably less than 1,000.
              //  Either we get all of the MarketSelections with this request, or we build a complicated mechanism for getting just the individual players on this betslips etc. and make a bunch of separate requests. Don't do that. It just complicates the logic, takes wayyy more time, and doesn't effectively utilize the cache as well as the single request for an Event's MarketSelections.
              //  And once one user has made the request for a an Event's MarketSelections, all other users benefit from the SAME request from the cache for the next hour, so only one slow request for one user once per hour vs. MANY slow requests for all users, some requests possibly only used ONCE if they're the only user to bet on a specific player.
              try {
                sharpSportsEvents[i1k] = JSON.parse(
                  await fa_cachefile(
                    toolkit,
                    navigator.dom.root.lists['membersdb.cachefiles'].actions['POST'],
                    {
                      nba:
                        'https://api.sharpsports.io/v1/marketSelections?sport=SPRT_basketball&league=LGUE_nba&eventId=' +
                        i1k +
                        '&prices=false&segment=SEGM_M&limit=2147483647',
                      nfl:
                        'https://api.sharpsports.io/v1/marketSelections?sport=SPRT_americanfootball&league=LGUE_nfl&eventId=' +
                        i1k +
                        '&prices=false&segment=SEGM_M&limit=2147483647', // @check: nfl
                      mlb:
                        'https://api.sharpsports.io/v1/marketSelections?sport=SPRT_baseball&league=LGUE_mlb&eventId=' +
                        i1k +
                        '&prices=false&segment=SEGM_M&limit=2147483647'
                    }[data['sport']],
                    'API_KEY_SHARPSPORTS'
                  )
                );
              } catch (e) {
                // @prints
                alert(
                  'Some data from this bet slip is not available from betPlace, so the request has failed. Please empty the bet slip and start again.'
                );

                // @throws
                throw new toolkit.utl.error(e.message);
              }

              // @assign
              sharpSportsEventsLines[i1k] = {
                gamelines: {
                  total_over: null, // MarketSelections object
                  total_under: null, // MarketSelections object
                  away_spread: null, // MarketSelections object
                  home_spread: null, // MarketSelections object
                  away_h2h: null, // MarketSelections object
                  home_h2h: null // MarketSelections object
                },
                propositions: {
                  // adleyrutschman: {
                  //   batter_doubles: {
                  //     o: null, // MarketSelections object
                  //     u: null // MarketSelections object
                }
              };
            }
          }

          // @assign
          let sport = Object.values(betslip).shift()['tickers'][0]['sport'],
            bookmaker = Object.values(betslip).shift()['tickers'][0]['bookmaker'];

          // @repeat
          for (let i1k in sharpSportsEvents) {
            // @switch
            if (sharpSportsEvents.hasOwnProperty(i1k)) {
              // @repeat
              for (let i2i = 0, i2n = sharpSportsEvents[i1k].length; i2i < i2n; i2i += 1) {
                // @switch
                if (sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId'] === 'totals') {
                  // @switch
                  if (sharpSportsEvents[i1k][i2i]['position'] === 'Over') {
                    // @assign
                    sharpSportsEventsLines[i1k]['gamelines']['total_over'] =
                      sharpSportsEvents[i1k][i2i];
                  } else if (sharpSportsEvents[i1k][i2i]['position'] === 'Under') {
                    // @assign
                    sharpSportsEventsLines[i1k]['gamelines']['total_under'] =
                      sharpSportsEvents[i1k][i2i];
                  }
                } else if (sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId'] === 'spreads') {
                  // @switch
                  if (
                    sharpSportsEvents[i1k][i2i]['position'] ===
                    sharpSportsEvents[i1k][i2i]['event']['contestantAway']['fullName']
                  ) {
                    // @assign
                    sharpSportsEventsLines[i1k]['gamelines']['away_spread'] =
                      sharpSportsEvents[i1k][i2i];
                  } else if (
                    sharpSportsEvents[i1k][i2i]['position'] ===
                    sharpSportsEvents[i1k][i2i]['event']['contestantHome']['fullName']
                  ) {
                    // @assign
                    sharpSportsEventsLines[i1k]['gamelines']['home_spread'] =
                      sharpSportsEvents[i1k][i2i];
                  }
                } else if (sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId'] === 'h2h') {
                  // @switch
                  if (
                    sharpSportsEvents[i1k][i2i]['position'] ===
                    sharpSportsEvents[i1k][i2i]['event']['contestantAway']['fullName']
                  ) {
                    // @assign
                    sharpSportsEventsLines[i1k]['gamelines']['away_h2h'] =
                      sharpSportsEvents[i1k][i2i];
                  } else if (
                    sharpSportsEvents[i1k][i2i]['position'] ===
                    sharpSportsEvents[i1k][i2i]['event']['contestantHome']['fullName']
                  ) {
                    // @assign
                    sharpSportsEventsLines[i1k]['gamelines']['home_h2h'] =
                      sharpSportsEvents[i1k][i2i];
                  }
                } else if (
                  typeof sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId'] === 'string' &&
                  data['mapMarketsToAttributes'][sport].hasOwnProperty(
                    sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId']
                  )
                ) {
                  // @todo: Improve matching, since sometimes we don't get a match (and what if 2 players in on this team have the same name???).// @assign
                  let playerName = sharpSportsEvents[i1k][i2i]['propDetails']['player']
                    .trim()
                    .normalize('NFKD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[^a-z]/g, '');

                  // @switch
                  if (
                    sharpSportsEventsLines[i1k]['propositions'].hasOwnProperty(playerName) !== true
                  ) {
                    // @assign
                    sharpSportsEventsLines[i1k]['propositions'][playerName] = {};
                  }

                  // @switch
                  if (
                    sharpSportsEventsLines[i1k]['propositions'][playerName].hasOwnProperty(
                      sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId']
                    ) !== true
                  ) {
                    // @assign
                    sharpSportsEventsLines[i1k]['propositions'][playerName][
                      sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId']
                    ] = {};
                  }

                  // @switch
                  if (sharpSportsEvents[i1k][i2i]['position'] === 'Over') {
                    // @assign
                    sharpSportsEventsLines[i1k]['propositions'][playerName][
                      sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId']
                    ][sharpSportsEvents[i1k][i2i]['position'].substr(0, 1).toLowerCase()] =
                      sharpSportsEvents[i1k][i2i];
                  } else if (sharpSportsEvents[i1k][i2i]['position'] === 'Under') {
                    // @assign
                    sharpSportsEventsLines[i1k]['propositions'][playerName][
                      sharpSportsEvents[i1k][i2i]['theOddsApi']['marketId']
                    ][sharpSportsEvents[i1k][i2i]['position'].substr(0, 1).toLowerCase()] =
                      sharpSportsEvents[i1k][i2i];
                  }
                }
              }
            }
          }

          // @assign
          let marketSelections = [],
            marketSelectionsLines = [];

          // @repeat
          for (let i1k in betslip) {
            // @switch
            if (betslip.hasOwnProperty(i1k)) {
              // @assign
              let i1v = betslip[i1k],
                marketSelectionsGrouping = [],
                marketSelectionsLinesGrouping = [];

              // @switch
              //  parlay
              // if (i1v['bets'].length > 1) {}

              // @repeat
              //  i1v['bets'][0]: hash, parlay_root_hash, yyyymmdd, slip, sport, bookmaker, market, point, matchup, team, performance, player, price, ignore
              for (let i2i = 0, i2n = i1v['bets'].length; i2i < i2n; i2i += 1) {
                // @assign
                let i2v = i1v['bets'][i2i];

                // @assign
                let matchupEventIds = JSON.parse(
                  i1v['tickers'][i2i]['matchup'].attributes['event_ids']['=']
                );

                // @assign
                let sharpSportsEventLines =
                  sharpSportsEventsLines[matchupEventIds['sharpsports_api_event_id']];

                // @switch
                //  Should match the logic in /Users/packagejs/Downloads/app_development/functions/main-catchall/index.vue
                if (i2v.attributes['player']['='].length) {
                  // @todo: Improve matching, since sometimes we don't get a match (and what if 2 players in on this team have the same name???).
                  // @assign
                  let playerName = i1v['tickers'][i2i]['lineupsX'][i2v.attributes['player']['=']][
                    'player'
                  ].attributes['name']['=']
                    .trim()
                    .normalize('NFKD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .replace(/[^a-z]/g, '');

                  // @switch
                  if (
                    sharpSportsEventLines['propositions'][playerName][
                      i2v.attributes['market']['=']
                    ][i2v.attributes['point']['='].substr(0, 1).toLowerCase()][
                      'betPlaceAvailability'
                    ][
                      {
                        fanduel: 'fd',
                        draftkings: 'dk'
                      }[bookmaker]
                    ] === true
                  ) {
                    // @action
                    try {
                      marketSelectionsGrouping.push({
                        bet: i2v,
                        marketSelection:
                          sharpSportsEventLines['propositions'][playerName][
                            i2v.attributes['market']['=']
                          ][i2v.attributes['point']['='].substr(0, 1).toLowerCase()]
                      });
                      marketSelectionsLinesGrouping.push({
                        bet: i2v,
                        marketSelectionLine: i2v.attributes['point']['='].substr(2)
                      });
                    } catch (e) {
                      // @prints
                      console.log('@todo: Bet missing.');
                    }
                  } else {
                    // @prints
                    console.log('@todo: Bet not available for bookmaker.');
                  }
                } else {
                  // @switch
                  if (
                    sharpSportsEventLines['gamelines'][i2v.attributes['market']['=']][
                      'betPlaceAvailability'
                    ][
                      {
                        fanduel: 'fd',
                        draftkings: 'dk'
                      }[bookmaker]
                    ] === true
                  ) {
                    // @action
                    try {
                      marketSelectionsGrouping.push({
                        bet: i2v,
                        marketSelection:
                          sharpSportsEventLines['gamelines'][i2v.attributes['market']['=']]
                      });
                      marketSelectionsLinesGrouping.push({
                        bet: i2v,
                        marketSelectionLine: i2v.attributes['point']['='].substr(2)
                      });
                    } catch (e) {
                      // @prints
                      console.log('@todo: Bet missing.');
                    }
                  } else {
                    // @prints
                    console.log('@todo: Bet not available for bookmaker.');
                  }
                }
              }

              // @switch
              if (marketSelectionsGrouping.length) {
                // @action
                marketSelections.push(marketSelectionsGrouping),
                  marketSelectionsLines.push(marketSelectionsLinesGrouping);
              }
            }
          }

          // @assign
          let marketSelectionsFlat = [],
            marketSelectionsLinesFlat = [];

          // @repeat
          marketSelections.forEach((i1v) => {
            i1v.forEach((i2v) => {
              marketSelectionsFlat.push(i2v['marketSelection']['id']);
            });
          });

          // @repeat
          marketSelectionsLines.forEach((i1v) => {
            i1v.forEach((i2v) => {
              marketSelectionsLinesFlat.push(i2v['marketSelectionLine']);
            });
          });

          // @readme
          //  https://docs.sharpsports.io/docs/straight-to-sportsbook
          //  "Parlay Links: ui.sharpsports.io/place/parlay/<bookId>?marketSelection=<comma separated list>"
          //  "For alternate lines on parlays, add &line=<comma separated list> to the end of the url, ensuring the number of lines you pass is the same as the number of marketSelections. If you want the default main line for a marketSelection, you can pass in a blank or null."

          // @assign
          //  https://docs.sharpsports.io/reference/book-list
          let betPlaceLink =
            'ui.sharpsports.io/place/parlay/' +
            {
              fanduel: 'BOOK_Rf7xRhS7TKQUl94Xkt5w',
              draftkings: 'BOOK_nhLZ9l5DRs6w6KcE2n7vnw'
            }[bookmaker] +
            '?marketSelection=' +
            marketSelectionsFlat.join(',') +
            '&line=' +
            marketSelectionsLinesFlat.join(',');

          // @action
          window.location.href = 'https://' + betPlaceLink;
        } catch (e) {
          // @assign
          data['betPlaceMutex'] = false;

          // @throws
          throw new toolkit.utl.error(e.message);
        }

        // @assign
        data['betPlaceMutex'] = false;
      }

      // @return
      resolve();
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

////////////////////////////////////////////////////////////////////////////////

// @signature
const fa_reboot_interval = async function (toolkit, component, navigator, context, componentData) {
  try {
    // @assign
    let updateTickersForMatchupIds = {};

    // @switch
    if (data['ticker']) {
      // @assign
      updateTickersForMatchupIds[data['ticker']['matchup'].attributes['id']['=']] = true;
    }

    // @assign
    let authuser;
    try {
      authuser = navigator.state.doms['widget_members'].root.lists['membersdb.members'].items[0];
    } catch (e) {
      // @ignore
    }

    // @switch
    if (authuser) {
      // @repeat
      authuser.lists['membersdb.bets'].items.forEach((i1v) => {
        // @assign
        updateTickersForMatchupIds[i1v.attributes['matchup']['=']] = true;
      });
    }

    // @switch
    if (data['updateAllTickers'] === true) {
      // @repeat
      data['tickers'].forEach((i1v) => {
        // @assign
        updateTickersForMatchupIds[i1v['matchup'].attributes['id']['=']] = true;
      });
    }

    // @action
    // console.log('setIntervalAll: ma_update_tickers_gamelines');
    ma_update_tickers_gamelines(toolkit, component, navigator, context, componentData)
      .then(() => {
        // @action
        // console.log('setIntervalAll: ma_update_tickers_simulations');
        ma_update_tickers_simulations(toolkit, component, navigator, context, componentData).catch(
          (e) => {
            // @ignore
          }
        );

        // @repeat
        for (let i1k in updateTickersForMatchupIds) {
          // @switch
          if (
            updateTickersForMatchupIds.hasOwnProperty(i1k) &&
            data['tickersX'].hasOwnProperty(i1k) &&
            data['tickersX'][i1k]['gamelinesUpdated']
          ) {
            // @assign
            let i1kR = i1k;

            // @assign
            let tickerReference = data['tickersX'][i1kR];

            // @action
            // console.log('setIntervalAll: ma_update_ticker_lineups(' + i1kR + ')');
            ma_update_ticker_lineups(
              toolkit,
              component,
              navigator,
              context,
              componentData,
              tickerReference
            )
              .then(() => {
                // @action
                // console.log('setIntervalAll: ma_update_ticker_propositions(' + i1kR + ')');
                ma_update_ticker_propositions(
                  toolkit,
                  component,
                  navigator,
                  context,
                  componentData,
                  tickerReference
                ).catch((e) => {
                  // @ignore
                });

                // @action
                // console.log('setIntervalAll: ma_update_ticker_simrates(' + i1kR + ')');
                ma_update_ticker_simrates(
                  toolkit,
                  component,
                  navigator,
                  context,
                  componentData,
                  tickerReference
                ).catch((e) => {
                  // @ignore
                });
              })
              .catch((e) => {
                // @ignore
              });
          }
        }
      })
      .catch((e) => {
        // @ignore
      });
  } catch (e) {
    // @ignore
  }
};

// @signature
const ma_reboot = function (
  toolkit,
  component,
  navigator,
  context,
  componentData,
  sport = '',
  yyyymmdd = '',
  bookmaker = '',
  matchupId = '',
  setTicker = false
) {
  return new Promise(async (resolve, reject) => {
    try {
      // @readme
      //  The setup order of these functions matter, as some depend on the results of the later. The results of most of them are cached, so they are not requested again upon page navigation.

      // @action
      //  Load all of today's (or yyyymmdd if different) matchups for this sport. If we've already loaded them, then this function will not fire twice (this result is cached). Page naviagation will not result in unnecessary API calls.

      await ma_init_tickers(
        toolkit,
        component,
        navigator,
        context,
        componentData,
        sport ? sport : data['sport'],
        yyyymmdd ? yyyymmdd : data['yyyymmdd'],
        bookmaker ? bookmaker : data['bookmaker']
      );
      console.log('Init tickers after');
      // @assign
      let ticker;

      // @switch
      if (data['tickers'].length) {
        // @switch
        if (matchupId && data['tickersX'][matchupId]) {
          // @assign
          ticker = data['tickersX'][matchupId];
        } else {
          // @assign
          let time = toolkit.gen.time().substr(0, 12);

          // @repeat
          for (let i1i = 0, i1n = data['tickers'].length; i1i < i1n; i1i += 1) {
            // @switch
            if (data['tickers'][i1i]['matchup'].attributes['id']['='].substr(0, 12) > time) {
              // @assign
              ticker = data['tickers'][i1i];

              // @breaks
              break;
            }
          }
        }
      }

      // @switch
      //  If we're navigating back from a matchup / player page, then we do NOT want to reset the view / matchup that we've already selected now that we're back on the home page (preserve the current state).
      if (ticker && (setTicker === true || !data['ticker'])) {
        // @assign
        data['ticker'] = ticker;
      }

      // @switch
      if (ticker) {
        // @action
        //  Get the lineup (for both teams) for this matchup.
        await ma_update_ticker_lineups(
          toolkit,
          component,
          navigator,
          context,
          componentData,
          ticker
        );

        // @action
        ma_update_ticker_boxscores(toolkit, component, navigator, context, componentData, ticker);

        // @action
        ma_update_ticker_injuries(toolkit, component, navigator, context, componentData, ticker);
      }

      // @action
      ma_update_tickers_gamelines(toolkit, component, navigator, context, componentData).then(
        () => {
          // @switch
          if (ticker && ticker['gamelinesUpdated']) {
            // @action
            ma_update_ticker_propositions(
              toolkit,
              component,
              navigator,
              context,
              componentData,
              ticker
            );
          }
        }
      );

      // @action
      ma_update_tickers_simulations(toolkit, component, navigator, context, componentData);

      // @switch
      if (ticker) {
        // @action
        ma_update_ticker_simrates(toolkit, component, navigator, context, componentData, ticker);
      }

      // @switch
      if (!data['setIntervalAll']) {
        // @assign
        let setIntervalAllIncrement = 0,
          setIntervalAllLastUpdateAllTickersValue = data['updateAllTickers'];

        // @assign
        data['setIntervalAll'] = setInterval(() => {
          // @switch

          if (
            setIntervalAllIncrement % 300 === 0 ||
            setIntervalAllLastUpdateAllTickersValue !== data['updateAllTickers']
          ) {
            // @switch
            if (setIntervalAllLastUpdateAllTickersValue !== data['updateAllTickers']) {
              // @assign

              (setIntervalAllLastUpdateAllTickersValue = data['updateAllTickers']),
                (setIntervalAllIncrement = 1);
            }
            console.log('Interval Singleton data', data);
            // @action
            fa_reboot_interval(toolkit, component, navigator, context, componentData).catch((e) => {
              // @ignore
            });
          }

          // @assign
          setIntervalAllIncrement += 1;
        }, 100);
      }

      // @return
      resolve(ticker);
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

// @signature
const ma_reboot_ticker = function (toolkit, component, navigator, context, componentData, ticker) {
  return new Promise(async (resolve, reject) => {
    try {
      // @switch
      if (ticker) {
        // @assign
        data['ticker'] = ticker;

        // @action
        await ma_update_ticker_lineups(
          toolkit,
          component,
          navigator,
          context,
          componentData,
          ticker
        );

        // @action
        ma_update_ticker_boxscores(toolkit, component, navigator, context, componentData, ticker);

        // @action
        ma_update_ticker_injuries(toolkit, component, navigator, context, componentData, ticker);

        // @switch
        if (ticker['gamelinesUpdated']) {
          // @action
          ma_update_ticker_propositions(
            toolkit,
            component,
            navigator,
            context,
            componentData,
            ticker
          );
        }

        // @action
        ma_update_ticker_simrates(toolkit, component, navigator, context, componentData, ticker);
      }

      // @return
      resolve(ticker);
      return;
    } catch (e) {
      reject(new toolkit.utl.error(e.message));
      return;
    }
  });
};

////////////////////////////////////////////////////////////////////////////////

// @define
let $xM = {};

// @readme
//  Singleton properties.

// @assign
$xM['data'] = data;

// @readme
//  Private functions.

// // @assign
// $xM['fs_get_time_local'] = fs_get_time_local;

// // @assign
$xM['fs_init_action'] = fs_init_action;

// // @assign
// $xM['fa_cachefile'] = fa_cachefile;

// // @assign
// $xM['fs_chart_init'] = fs_chart_init;

// // @assign
// $xM['fs_chart_postprocess'] = fs_chart_postprocess;

// @readme
//  Public generic methods.

// @assign
$xM['ms_calc_hitrate'] = ms_calc_hitrate;

// @assign
$xM['ms_calc_hitrate_raw'] = ms_calc_hitrate_raw;

// @assign
$xM['ms_calc_simrate'] = ms_calc_simrate;

// @assign
$xM['ms_calc_ev_hr'] = ms_calc_ev_hr;

// @assign
$xM['ms_calc_ev_sr'] = ms_calc_ev_sr;

// @readme
//  Public methods.

// @assign
$xM['ma_init_teamsX'] = ma_init_teamsX;

// @assign
$xM['ma_init_tickers'] = ma_init_tickers;

// @assign
$xM['ma_update_ticker_lineups'] = ma_update_ticker_lineups;

// @assign
$xM['ma_update_ticker_boxscores'] = ma_update_ticker_boxscores;

// @assign
$xM['ma_update_ticker_injuries'] = ma_update_ticker_injuries;

// @readme
//  Odds API specific methods.

// @assign
$xM['ma_update_tickers_gamelines'] = ma_update_tickers_gamelines;

// @assign
$xM['ma_update_ticker_propositions'] = ma_update_ticker_propositions;

// @readme
//  Baker API specific methods.

// @assign
$xM['ma_update_tickers_simulations'] = ma_update_tickers_simulations;

// @assign
$xM['ma_update_ticker_simrates'] = ma_update_ticker_simrates;

// @assign
$xM['ma_init_insights_for_team'] = ma_init_insights_for_team;

// @assign
$xM['ma_init_insights_for_player'] = ma_init_insights_for_player;

// @readme
//  Chart related methods.

// @assign
$xM['ma_init_ticker_chart_data_for_team'] = ma_init_ticker_chart_data_for_team;

// @assign
$xM['ma_init_ticker_chart_data_for_player'] = ma_init_ticker_chart_data_for_player;

// @assign
$xM['ma_generate_chart_for_team'] = ma_generate_chart_for_team;

// @assign
$xM['ma_generate_chart_for_player'] = ma_generate_chart_for_player;

// @assign
$xM['ms_generate_stats_for_player'] = ms_generate_stats_for_player;

// @readme
//  Betslip related methods.

// @assign
$xM['ma_betslip_submit'] = ma_betslip_submit;

// @readme
//  Calls all functions to get the tickers working for the site (boot), or when switching between sports, dates, or bookmakers (reboot), or when changing / focusing on a different ticker (reboot ticker).

// // @assign
// $xM['fa_reboot_interval'] = fa_reboot_interval;

// @assign
$xM['ma_reboot'] = ma_reboot;

// @assign
$xM['ma_reboot_ticker'] = ma_reboot_ticker;

////////////////////////////////////////////////////////////////////////////////

// @export
// export default $xM;
module.exports = $xM;

////////////////////////////////////////////////////////////////////////////////
