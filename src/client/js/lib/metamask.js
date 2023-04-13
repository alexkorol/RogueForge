import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

export async function getWeb3() {
  const provider = await detectEthereumProvider();
  if (!provider) {
    alert('Please install Metamask to continue.');
    return null;
  }

  if (provider !== window.ethereum) {
    alert('Please use the Metamask extension.');
    return null;
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    console.error('User denied account access');
    return null;
  }

  return new Web3(window.ethereum);
}