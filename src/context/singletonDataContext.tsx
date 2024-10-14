import { format } from 'date-fns';
import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';
import React, { createContext, useState } from 'react';
import singleton from '../utils/singelton';

type SingletonDataType = {
  data: any;
  selectedGames: Record<string, any>;
  setSelectedGame: (game: string) => void;
  isFetching: boolean;
  initiateData: (data: any) => void;
  refetchData: (team: string, bookameker: string) => void;
  removeData: () => void;
  singleton: any;
  navigator: any;
  toolkit: any;
  dom: any;
};

type Props = {
  children: React.ReactNode;
};

export const SingletonDataContext = ({ children }: Props) => {
  const [data, setData] = useState({});
  const [selectedGames, setSelectedGames] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);

  let dom = new toolkit.sdk.dom(
    'widget_worker', // dom name
    'http://137.184.135.111:49992/openapi.json'
  );

  let navigator = new toolkit.sdk.navigator(dom);
  navigator.state = {
    doms: {
      widget_worker: dom
    },
    navigators: {
      widget_worker: navigator
    }
  };

  const loadInitialSingletonData = (data: any) => {
    setData(data);
  };

  const refetchData = async (sport: string, bookmaker: string) => {
    setIsFetching((prevState) => !prevState);
    // navigator.dom.ms_set_authorization('');
    const date = new Date();
    await singleton
      .ma_reboot(toolkit, null, navigator, null, {}, sport, format(date, 'yyyyMMdd'), bookmaker)
      .catch((error) => {
        console.log('error', error);
      });
    setData(singleton.data);
    setIsFetching((prevState) => !prevState);
  };

  const removeData = () => {
    setData({});
  };

  const handleSelectGame = (game: string) => {
    setSelectedGames(game);
  };

  const initialData = {
    data,
    selectedGames: selectedGames,
    setSelectedGame: handleSelectGame,
    isFetching: isFetching,
    initiateData: loadInitialSingletonData,
    refetchData: refetchData,
    removeData,
    singleton,
    navigator,
    toolkit,
    dom
  };
  return (
    <SingletonDataContextProvider.Provider value={initialData}>
      {children}
    </SingletonDataContextProvider.Provider>
  );
};

export const SingletonDataContextProvider = createContext<SingletonDataType>({
  data: {},
  selectedGames: '',
  setSelectedGame: () => {},
  isFetching: false,
  initiateData: () => {},
  refetchData: () => {},
  removeData: () => {},
  singleton,
  navigator,
  toolkit,
  dom: {}
});
