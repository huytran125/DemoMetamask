import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SessionType} from './Home';

interface AccountInforProps extends SessionType {}
const AccountInfor = (props: AccountInforProps) => {
  const {chainId, ENS, walletAddress, balance} = props;
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text>ChainID: </Text>
        <Text>{chainId}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>ENS: </Text>
        <Text>{ENS}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>Balance: </Text>
        <Text>{balance} ETH</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text>Address: </Text>
        <Text style={styles.walletAddress}>{walletAddress}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 20,
    marginHorizontal: 40,
    borderRadius: 5,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  walletAddress: {
    maxWidth: '80%',
    textAlign: 'right',
  },
});

export default AccountInfor;
