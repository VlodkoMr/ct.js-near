# NEAR Connector for ct.js game engine

Module allow ct.js connect NEAR Blockchain to sign transactions and interact with your smart-contract.

### Install & Configure

1. Import catmod into ct.js and enable it to start usage.
2. Open catmod settings and fill all you contract details: Network, Contract Address and method names.

We support 2 smart-contracts: primary (required) and secondary (optional).
To start using each smart-contract - provide contract address, view and call method manes as js array of strings).

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

Primary contract address:

``` 
ct.near.primaryAddress
```

Secondary contract address:

``` 
ct.near.secondaryAddress
``` 

#### Get access to all contract methods (using method list from catmod settings):

Primary contract:

``` 
ct.near.primaryContract
```

Secondary contract:

```
ct.near.secondaryContract
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

#### Call your custom contract method (example with primary contract):

``` 
ct.near.primaryContract.call_method_name(params);
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

### Read data from NEAR Blockchain (view from primary contract):

```
const data = await ct.near.primaryContract.read_data_method();
```

NOTE: _read_data_method_ should exist in your smart-contract and listed in catmod settings.

### Write data to smart-contract (call primary contract):

```
await ct.near.primaryContract.add_user_scores({
    param_id: "test data" 
});
```

NOTE: _call_data_method_ should exist in your smart-contract and listed in catmod settings.