import detectEthereumProvider from '@metamask/detect-provider';

export async function getWeb3() {
  const provider = await detectEthereumProvider();

  if (provider) {
  const web3 = new Web3(provider);

  try {
    // Request account access
    await provider.request({ method: 'eth_requestAccounts' });
    return web3;
  } catch (error) {
    console.error('User denied account access');
  }
  
} else {
    console.error('No Ethereum provider found');
    }
    
    return null;
    }