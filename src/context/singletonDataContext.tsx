import toolkit from 'jsen-cls-sdk-prj-packagejs-mod-toolkit-pkg-interface-for-sdk-ecmascript';
import React, { createContext, useEffect, useState } from 'react';
import singleton from '../utils/singelton';

type SingletonDataType = {
  data: any;
  isFetching: boolean;
  addData: (data: any) => void;
  replaceTicker: (ticker: any) => void;
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
  const [isFetching, setIsFetching] = useState(false);
  const [navigator, setNavigator] = useState<any>();
  const [dom, setDom] = useState<any>();

  useEffect(() => {
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
    setNavigator(navigator);
    setDom(dom);
  }, []);

  const addData = (data: any) => {
    setData(data);
  };

  const refetchData = async (sport: string, bookmaker: string) => {
    setIsFetching((prevState) => !prevState);
    singleton.data.updateAllTickers = true;
    await singleton
      .ma_reboot(
        toolkit,
        null,
        navigator,
        null,
        {},
        sport,
        singleton.data.yyyymmdd,
        singleton.data.bookmaker,
        undefined,
        true,
        addData
      )
      .catch((error) => {
        console.log('error', error);
      });
    setData(singleton.data);
    setIsFetching((prevState) => !prevState);
  };

  const replaceTicker = (ticker: any) => {
    setData({ ...data, ticker });
  };

  const removeData = () => {
    setData({});
  };

  const initialData = {
    data,
    isFetching: isFetching,
    addData: addData,
    replaceTicker: replaceTicker,
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
  isFetching: false,
  addData: () => {},
  replaceTicker: () => {},
  refetchData: () => {},
  removeData: () => {},
  singleton,
  navigator,
  toolkit,
  dom: {}
});
