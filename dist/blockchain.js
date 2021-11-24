"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("./block"));
const satoshi_nakamoto_1 = __importDefault(require("./satoshi_nakamoto"));
const transaction_1 = __importDefault(require("./transaction"));
class Blockchain {
    constructor() {
        this._chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.miningReward = 100;
    }
    // getter
    get chain() {
        return this._chain;
    }
    get pendingTransaction() {
        return this._pendingTransaction;
    }
    // methods
    createGenesisBlock() {
        return new block_1.default('01/01/2017', new transaction_1.default(0, ''), new transaction_1.default(100, satoshi_nakamoto_1.default.instance.publicKey), '');
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // minePendingTransactions(miningRewardAddress: string) {
    // 	const rewardTx = new Transaction(this.miningReward, miningRewardAddress);
    // 	this.pendingTransactions.push(rewardTx);
    // 	let block = new Block(
    // 		Date.now().toString(),
    // 		this.pendingTransaction,
    // 		this.getLatestBlock().hash
    // 	);
    // 	block.mine(this.difficulty);
    // 	console.log('Block successfully mined!');
    // 	this.chain.push(block);
    // 	this.pendingTransactions = [];
    // }
    minePendingTransaction(miningRewardAddress) {
        if (this._pendingTransaction) {
            const block = new block_1.default(Date.now().toString(), this._pendingTransaction, new transaction_1.default(this.miningReward, miningRewardAddress), this.getLatestBlock().hash);
            block.mine(this.difficulty);
            console.log('Block successfully mined!');
            this.chain.push(block);
            this._pendingTransaction = undefined;
        }
        else {
            throw new Error('Cannot mine Block without a transaction.');
        }
    }
    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress)
            throw new Error('Transaction must include from and to address');
        if (!transaction.isValid())
            throw new Error('Cannor add invalid transaction to chain');
        this._pendingTransaction = transaction;
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            // for (const transaction of block.transactions) {
            if (block.transaction.fromAddress === address)
                balance -= block.transaction.amount;
            if (block.transaction.toAddress === address)
                balance += block.transaction.amount;
            if (block.miningRewardTransaction.toAddress === address)
                balance += block.miningRewardTransaction.amount;
            // }
        }
        return balance;
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // if (!currentBlock.hasValidTransactions()) return false;
            if (!currentBlock.transaction.isValid)
                return false;
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false;
            if (currentBlock.previousHash !== previousBlock.hash)
                return false;
        }
        return true;
    }
}
exports.default = Blockchain;
// properties
Blockchain.instance = new Blockchain();
