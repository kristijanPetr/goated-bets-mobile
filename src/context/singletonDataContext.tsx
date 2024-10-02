import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useState } from 'react';

type SingletonDataType = {
  data: any;
  setData: (data: any) => void;
  removeData: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const SingletonDataContext = ({ children }: Props) => {
  const [data, setData] = useState({});

  const handleData = (data: any) => {
    setData(data);
  };
  const removeData = () => {
    setData({});
  };

  const initialData = {
    data,
    setData: handleData,
    removeData
  };
  return (
    <SingletonDataContextProvider.Provider value={initialData}>
      {children}
    </SingletonDataContextProvider.Provider>
  );
};

export const SingletonDataContextProvider = createContext<SingletonDataType>({
  data: {},
  setData: () => {},
  removeData: () => {}
});
const styles = StyleSheet.create({});
