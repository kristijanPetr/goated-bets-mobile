import { FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import GameData from './GameData';

const GameList = () => {
  const data = [
    {
      id: '1',
      game: 'Baltimore Ravens @ Kansas City Chiefs',
      time: '8:20pm EST',
      team1: {
        name: 'BAL',
        spread: { top: 3.0, bottom: -118, percentage: 40 },
        moneyline: { left: 124, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: -108 },
          middle: { name: 'BAL', percentage: 0 },
          right: { name: 'KC', percentage: 80 }
        }
      },
      team2: {
        name: 'KC',
        spread: { top: -3.0, bottom: -102, percentage: 20 },
        moneyline: { left: -148, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: 112 },
          middle: { name: 'KC', percentage: 0 },
          right: { name: 'BAL', percentage: 40 }
        }
      }
    },
    {
      id: '2',
      game: 'Baltimore Ravens @ Kansas City Chiefs',
      time: '8:20pm EST',
      team1: {
        name: 'BAL',
        spread: { top: 3.0, bottom: -118, percentage: 40 },
        moneyline: { left: 124, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: -108 },
          middle: { name: 'BAL', percentage: 0 },
          right: { name: 'KC', percentage: 80 }
        }
      },
      team2: {
        name: 'KC',
        spread: { top: -3.0, bottom: -102, percentage: 20 },
        moneyline: { left: -148, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: 112 },
          middle: { name: 'KC', percentage: 0 },
          right: { name: 'BAL', percentage: 40 }
        }
      }
    },
    {
      id: '3',
      game: 'Baltimore Ravens @ Kansas City Chiefs',
      time: '8:20pm EST',
      team1: {
        name: 'BAL',
        spread: { top: 3.0, bottom: -118, percentage: 40 },
        moneyline: { left: 124, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: -108 },
          middle: { name: 'BAL', percentage: 0 },
          right: { name: 'KC', percentage: 80 }
        }
      },
      team2: {
        name: 'KC',
        spread: { top: -3.0, bottom: -102, percentage: 20 },
        moneyline: { left: -148, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: 112 },
          middle: { name: 'KC', percentage: 0 },
          right: { name: 'BAL', percentage: 40 }
        }
      }
    },
    {
      id: '4',
      game: 'Baltimore Ravens @ Kansas City Chiefs',
      time: '8:20pm EST',
      team1: {
        name: 'BAL',
        spread: { top: 3.0, bottom: -118, percentage: 40 },
        moneyline: { left: 124, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: -108 },
          middle: { name: 'BAL', percentage: 0 },
          right: { name: 'KC', percentage: 80 }
        }
      },
      team2: {
        name: 'KC',
        spread: { top: -3.0, bottom: -102, percentage: 20 },
        moneyline: { left: -148, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: 112 },
          middle: { name: 'KC', percentage: 0 },
          right: { name: 'BAL', percentage: 40 }
        }
      }
    },
    {
      id: '5',
      game: 'Baltimore Ravens @ Kansas City Chiefs',
      time: '8:20pm EST',
      team1: {
        name: 'BAL',
        spread: { top: 3.0, bottom: -118, percentage: 40 },
        moneyline: { left: 124, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: -108 },
          middle: { name: 'BAL', percentage: 0 },
          right: { name: 'KC', percentage: 80 }
        }
      },
      team2: {
        name: 'KC',
        spread: { top: -3.0, bottom: -102, percentage: 20 },
        moneyline: { left: -148, percentage: 40 },
        total: {
          left: { top1: 0, top2: 46.5, bottom: 112 },
          middle: { name: 'KC', percentage: 0 },
          right: { name: 'BAL', percentage: 40 }
        }
      }
    }
  ];

  const [selectedGame, setSelectedGame] = useState('');

  const handleSelectedGame = (id: string) => {
    if (selectedGame === id) {
      return setSelectedGame('');
    }
    return setSelectedGame(id);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }: any) => (
        <GameData item={item} handleSelectedGame={handleSelectedGame} selectedGame={selectedGame} />
      )}
      keyExtractor={(item) => item.id}
      windowSize={6}
      style={styles.container}
      extraData={selectedGame}
    />
  );
};

export default GameList;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 6, marginTop: 16, marginBottom: 90 }
});
