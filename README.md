# NEAR Connector for ct.js game engine

Module allow ct.js connect NEAR Blockchain to sign transactions and interact with your smart-contract.

### Install & Configure

1. Import catmod into ct.js and enable it to start usage.
2. Open catmod settings and fill all you contract details: Network, Contract Address and method names.

## Variables

#### Check the user's metamask connection (boolean):

``` 
ct.near.isConnected
```

#### Get current user metamask address (string):

``` 
ct.near.userAddress
```

#### Get your contract Address (from catmod settings):

``` 
ct.near.contractAddress
```

#### Get access to all public contract methods (using Contract ABI from catmod settings):

``` 
ct.near.contract
```

------

## Methods

#### Connect NEAR Wallet:

Add connect action to your Connect button template (On Step):

``` 
ct.near.connect();
```

#### Disconnect NEAR Wallet:

Add disconnect action to your button template (On Step):

``` 
ct.near.disconnect();
```

#### Call your custom contract methods:

``` 
ct.near.contract.call_method_name(params);
```

------

## Usage Examples

### Show connect button and redirect to next room when wallet connected:

1. Create new room with connect button and set it as starting room.
2. Add next code to your connect button (On Step):

``` 
if (ct.pointer.collides(this, undefined, true)) {
    ct.near.connect();
}
```

*NOTE: In this example we use Pointer catmod, but you can replace to Touch or Mouse usage.*

3. Put next code into "On Step" room events to redirect user when account will be connected:

```
 if(ct.near.isConnected) {
   ct.rooms.switch('MainMenu');
 }
```

### Show user wallet address in UI:

You can render connected user wallet address and represent in short form (for long addresses):

```
this.userAccount = ct.near.userAddress;
if (ct.near.userAddress.length > 14) {
    this.userAccount = ct.near.userAddress.slice(0, 8) + '...' + ct.near.userAddress.slice(-4);
}

this.accountLabel = new PIXI.Text(this.userAccount);
this.addChild(this.accountLabel);
this.accountLabel.x = 30;
this.accountLabel.y = 30;
this.accountLabel.depth = 1000;
```
