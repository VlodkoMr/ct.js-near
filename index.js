// Init catmod
ct.near = {
  primaryAddress: "/*%primaryAddress%*/",
  secondaryAddress: "/*%secondaryAddress%*/",
  isConnected: false,
  userAddress: "",
  primaryContract: {},
  secondaryContract: {},
  connect: () => {
    window.walletConnection.requestSignIn("/*%primaryAddress%*/");
  },
  disconnect: () => {
    window.walletConnection.signOut();
    ct.near.userAddress = "";
    ct.near.isConnected = false;
  },
  convertToTera: (amount) => {
    return `${amount}000000000000`;
  },
  convertToYocto: (amount) => {
    return window.nearApi.utils.format.parseNearAmount(amount);
  },
};

function getConfig(env) {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: ct.near.primaryAddress,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
        deps: { keyStore: new window.nearApi.keyStores.BrowserLocalStorageKeyStore() }
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: ct.near.primaryAddress,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
        deps: { keyStore: new window.nearApi.keyStores.BrowserLocalStorageKeyStore() }
      }
    default:
      throw Error(`Unconfigured environment '${env}'.`)
  }
}

const nearConfig = getConfig("/*%network%*/");

const initModule = async () => {
  console.log('window.nearApi', window.nearApi);
  window.near = await window.nearApi.connect(nearConfig);

  // Initialize a Wallet Object
  window.walletConnection = new window.nearApi.WalletConnection(window.near);

  // Initialize a Contract Object (to interact with the contract)
  ct.near.primaryContract = await new window.nearApi.Contract(
    window.walletConnection.account(),
    ct.near.primaryAddress,
    {
      viewMethods: [/*%primaryView%*/][0],
      changeMethods: [/*%primaryChange%*/][0],
    }
  )

  if ([/*%secondaryAddress%*/][0]) {
    ct.near.secondaryContract = await new window.nearApi.Contract(
      window.walletConnection.account(),
      ct.near.secondaryAddress,
      {
        viewMethods: [/*%secondaryView%*/][0],
        changeMethods: [/*%secondaryChange%*/][0],
      }
    )
  }
}

window.addEventListener("load", function () {
  // Init module when all scripts loaded
  initModule().then(() => {
    if (window.walletConnection.isSignedIn()) {
      ct.near.userAddress = window.walletConnection.getAccountId();
      ct.near.isConnected = true;
    }
  }).catch(console.error);
});
