import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import {Button} from 'react-native';
import * as React from 'react';
import Home from './src/Home';
function App(): JSX.Element {
  return <Home />;
}

export default withWalletConnect(App, {
  redirectUrl: '',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
