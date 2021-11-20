import Block from './block';
import Transaction from './transaction';

export default class Blockchain {

    // properties
    private _chain: Block[];
    private difficulty: number;
    private pendingTransactions: Transaction[];
    private miningReward: number;

    constructor() {
        this._chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    // getter
    public get chain(): Block[] {
        return this._chain;
    }

    // methods
    createGenesisBlock() {
        return new Block('01/01/2017', []);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress: string) {
        let block = new Block(Date.now().toString(),this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(this.miningReward, miningRewardAddress)
        ]
    }

    createTransaction(transaction: Transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0 

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address)
                    balance -= transaction.amount;
                if (transaction.toAddress === address)
                    balance += transaction.amount;
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) 
                return false;
            
            if (currentBlock.previousHash !== previousBlock.hash) 
                return false;
        }
        return true;
    }
}