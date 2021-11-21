import Block from './block.js';
import Blockchain from './blockchain.js';
import Transaction from './transaction.js';
import ec from 'elliptic';

const EC = new ec.ec('secp256k1');

const myKey = EC.keyFromPrivate('583a4ab8d9c4632c9decd1ed6b8f7ad7242420032b4de3656da5ca3904bb38ea');
const myWalletAddress = myKey.getPublic('hex');
// console.log(`Public key is: ${myWalletAddress}`);

let marciCoin = new Blockchain();

// marciCoin.addTransaction(new Transaction(100, 'address2', 'address1'));
// marciCoin.addTransaction(new Transaction(50, 'address1', 'address2'));

const tx1 = new Transaction(10, 'public key goes here', myWalletAddress);
// console.log(`from address is: ${myWalletAddress} and public key is: ${myKey.getPublic('hex')}`)
tx1.signTransaction(myKey);
marciCoin.addTransaction(tx1);

console.log('Starting the miner...');
marciCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Marcell is: ' + marciCoin.getBalanceOfAddress(myWalletAddress));
console.log('Is chain valid? ' + marciCoin.isChainValid());





// console.log(`\nMarci's balance is ${marciCoin.getBalanceOfAddress('Marci-address')} \n
// address 1's balance is ${marciCoin.getBalanceOfAddress('address1')} \n
// address 2's balance is ${marciCoin.getBalanceOfAddress('address2')} \n`);


// console.log('Starting the miner again...');
// marciCoin.minePendingTransactions('Marci-address');

// console.log(`\nMarci's balance is ${marciCoin.getBalanceOfAddress('Marci-address')} \n
// address 1's balance is ${marciCoin.getBalanceOfAddress('address1')} \n
// address 2's balance is ${marciCoin.getBalanceOfAddress('address2')} \n`);

// console.log(marciCoin.chain);

// console.log('Mining block 1...')
// marciCoin.addBlock(
// 	new Block(1, Date.toString(), { amount: 4 }, marciCoin.getLatestBlock().hash)
// );
// console.log('Mining block 2...')
// marciCoin.addBlock(
// 	new Block(2, Date.toString(), { amount: 12 }, marciCoin.getLatestBlock().hash)
// );

// console.log(JSON.stringify(marciCoin, null, 4));
// console.log(marciCoin.isChainValid());
// marciCoin.chain[1].data = { amount: 100};
// marciCoin.chain[1].hash = marciCoin.chain[1].calculateHash();
// console.log(JSON.stringify(marciCoin, null, 4));
// console.log(marciCoin.isChainValid());
