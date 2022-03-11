import Web3 from "web3";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider';

let web3Modal;
let provider;
let selectedAccount;
const providerOptions = {
  walletConnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    }
  }
}
web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
});

export const showWeb3WalletModal = async () => {
  try {
    provider = await web3Modal.connect();
  } catch (error) {
    console.log('Could not get a wallet connection', error);
    return;
  }
  return provider;
}

export const getCurrentWalletAddress = async () => {
  try {
    if (web3Modal.cacheProvider) {
      provider = web3Modal.cacheProvider;
    } else {
      provider = await web3Modal.connect();
    }
    
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts && accounts.length > 0) {
      selectedAccount = accounts[0];
      return selectedAccount;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Could not get current wallet address', error);
    return;
  }
}

export const getCurrentNetworkId = async() => {
  try {
    if (web3Modal.cacheProvider) {
      provider = web3Modal.cacheProvider;
    } else {
      provider = await web3Modal.connect();
    }
    
    const web3 = new Web3(provider);
    return await web3.eth.net.getId();
  } catch (error) {
    console.log('Could not get current NetworkID', error);
    return;
  }
}

export const disconnectWallet = async () => {
  try {
    return await web3Modal.clearCachedProvider();
  } catch (error) {
    console.log(error);
    return;
  }
}

export default web3Modal;