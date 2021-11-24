import { SHA256 } from 'crypto-js';
import Transaction from './transaction';

export default class Block {
	// properties
	private _timestamp: string;
	private _transaction: Transaction;
	private _miningRewardTransaction: Transaction;
	private _previousHash: string;
	private _hash: string;
	private _nonce: number;

	constructor(
		timestamp: string,
		transaction: Transaction,
		minerReward: Transaction,
		previousHash: string = ''
	) {
		this._timestamp = timestamp;
		this._transaction = transaction;
		this._miningRewardTransaction = minerReward;
		this._previousHash = previousHash;
		this._hash = this.calculateHash();
		this._nonce = 0;
	}

	// getters
	public get timestamp(): string {
		return this._timestamp;
	}
	public get transaction(): Transaction {
		return this._transaction;
	}
	public get previousHash(): string {
		return this._previousHash;
	}
	public get hash(): string {
		return this._hash;
	}
	public get miningRewardTransaction(): Transaction {
		return this._miningRewardTransaction;
	}

	// methods
	calculateHash() {
		return SHA256(
			this._previousHash + this._timestamp + this._transaction + this._miningRewardTransaction + this._nonce
		).toString();
	}

	mine(difficulty: number) {
		while (
			this._hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
		) {
			this._nonce++;
			this._hash = this.calculateHash();
		}
		console.log('Block mined: ' + this._hash);
	}

	// hasValidTransactions() {
	// 	for (let tx of this.transactions) {
	// 		if (!tx.isValid()) return false;
	// 	}
	// 	return true;
	// }
}
