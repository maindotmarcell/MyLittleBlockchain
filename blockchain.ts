import Block from './block';
import SatoshiNakamoto from './satoshi_nakamoto';
import Transaction from './transaction';

export default class Blockchain {
	// properties
	public static instance = new Blockchain();
	private _chain: Block[];
	private difficulty: number;
	private _pendingTransaction: Transaction | undefined;
	private miningReward: number;

	constructor() {
		this._chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.miningReward = 100;
	}

	// getter
	public get chain(): Block[] {
		return this._chain;
	}
	public get pendingTransaction(): Transaction | undefined {
		return this._pendingTransaction;
	}

	// methods
	createGenesisBlock() {
		return new Block(
			'01/01/2017',
			new Transaction(0, ''),
			new Transaction(100, SatoshiNakamoto.instance.publicKey),
			''
		);
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
	minePendingTransaction(miningRewardAddress: string) {
		if (this._pendingTransaction) {
			const block = new Block(
				Date.now().toString(),
				this._pendingTransaction,
				new Transaction(this.miningReward, miningRewardAddress),
				this.getLatestBlock().hash
			);
			block.mine(this.difficulty);
			console.log('Block successfully mined!');
			this.chain.push(block);
			this._pendingTransaction = undefined;
		} else {
			throw new Error('Cannot mine Block without a transaction.');
		}
	}

	addTransaction(transaction: Transaction) {
		if (!transaction.fromAddress || !transaction.toAddress)
			throw new Error('Transaction must include from and to address');

		if (!transaction.isValid())
			throw new Error('Cannor add invalid transaction to chain');

		this._pendingTransaction = transaction;
	}

	getBalanceOfAddress(address: string): number {
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
			if (!currentBlock.transaction.isValid) return false;

			if (currentBlock.hash !== currentBlock.calculateHash()) return false;

			if (currentBlock.previousHash !== previousBlock.hash) return false;
		}
		return true;
	}
}
