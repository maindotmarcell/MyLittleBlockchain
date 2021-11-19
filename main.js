const Block = require('./block.js');    
const Blockchain = require('./blockchain.js');

let marciCoin = new Blockchain();
marciCoin.addBlock(
	new Block(1, Date.parse(), { amount: 4 }, marciCoin.getLatestBlock())
);
marciCoin.addBlock(
	new Block(2, Date.parse(), { amount: 12 }, marciCoin.getLatestBlock())
);

console.log(JSON.stringify(marciCoin, null, 4));
console.log(marciCoin.isChainValid());
marciCoin.chain[1].data = { amount: 100};
marciCoin.chain[1].hash = marciCoin.chain[1].calculateHash();
console.log(JSON.stringify(marciCoin, null, 4));
console.log(marciCoin.isChainValid());

