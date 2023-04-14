import Phaser from 'phaser';
import BootScene from './game/scenes/BootScene';
import MainScene from './game/scenes/MainScene';
import logoSrc from '../assets/logo.png';
import detectEthereumProvider from '@metamask/detect-provider';

(async () => {
  const logo = document.getElementById('logo');
  logo.src = logoSrc;

  const provider = await detectEthereumProvider();

  if (provider) {
    startApp(provider);
  } else {
    console.log('Please install MetaMask!');
  }

  function startApp(provider) {
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
  }

  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  window.ethereum.on('chainChanged', handleChainChanged);

  function handleChainChanged(chainId) {
    window.location.reload();
  }

  let currentAccount = null;
  window.ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      console.error(err);
    });

  window.ethereum.on('accountsChanged', handleAccountsChanged);

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
    }
  }

  const ethereumButton = document.getElementById('my-connect-button');
  ethereumButton.addEventListener('click', () => {
    getAccount();
  });

  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
    const account = accounts ? accounts[0] : null;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      scene: [BootScene, MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);
    ethereumButton.style.display = 'none';
  }

})();
