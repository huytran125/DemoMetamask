import '@ethersproject/shims';
import React, {useEffect, useState} from 'react';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {ethers} from 'ethers';
import EncryptedStorage from 'react-native-encrypted-storage';
import AccountInfor from './AccountInfor';

export interface SessionType {
  chainId: number;
  ENS: string;
  walletAddress: string;
  balance: number | string;
}
const ENS_NAME_SERVICE = 'ENS';
const ETH_MAIN_NET = 'https://eth-mainnet.public.blastapi.io';
const Home = () => {
  const connector = useWalletConnect();
  const [balance, setBalance] = useState<string | number>('');
  const [session, setSession] = useState<SessionType | null>(null);
  const retrieveStorage = async () => {
    try {
      const sessionAccountJson = await EncryptedStorage.getItem(
        'account_session',
      );
      if (sessionAccountJson) {
        const sessionAccount: SessionType = JSON.parse(sessionAccountJson);
        setSession(sessionAccount);
        setBalance(sessionAccount.balance);
      }
    } catch (error) {}
  };
  const saveToStorage = async () => {
    try {
      await EncryptedStorage.setItem(
        'account_session',
        JSON.stringify({
          chaindId: connector.chainId,
          ENS: ENS_NAME_SERVICE,
          balance: balance,
          walletAddress: connector.accounts[0],
        }),
      );
      Alert.alert('Save to storage successfully', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } catch (error) {}
  };
  const removeFromStorage = async () => {
    await EncryptedStorage.removeItem('account_session');
  };
  useEffect(() => {
    retrieveStorage();
  }, []);
  useEffect(() => {
    (async () => {
      if (connector?.connected && !session) {
        try {
          const provider = new ethers.providers.JsonRpcProvider(ETH_MAIN_NET, {
            name: ENS_NAME_SERVICE,
            chainId: 1,
          });

          const balanceAccount = await provider.getBalance(
            connector.accounts[0],
          );
          console.log('ban', balanceAccount);
          setBalance(parseInt(balanceAccount._hex, 16));
        } catch (e) {
          console.log('err', e);
        }
      }
    })();
  }, [connector.connected, connector.accounts, session]);
  const disconnect = () => {
    connector.killSession();
    removeFromStorage();
  };
  const connectButton = () => {
    return <Button title="Connect" onPress={() => connector.connect()} />;
  };
  const disconnectButton = () => {
    return <Button title="Kill Session" onPress={disconnect} />;
  };

  const saveToStorageButton = () => {
    return <Button title="Save To Storage" onPress={saveToStorage} />;
  };

  const connectedView = () => {
    return (
      <>
        <AccountInfor
          chainId={connector.chainId}
          ENS={ENS_NAME_SERVICE}
          balance={balance}
          walletAddress={connector.accounts[0]}
        />
        <View style={styles.buttonContainer}>
          {disconnectButton()}
          {saveToStorageButton()}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {!connector.connected ? connectButton() : connectedView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '70%',
  },
});

export default Home;
