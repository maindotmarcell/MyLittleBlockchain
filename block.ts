import { SHA256 } from 'crypto-js';
import Transaction from './transaction';

export default class Block {
	// properties
	private _timestamp: string;
	private _transactions: Transaction[];
	private _previousHash: string;
	private _hash: string;
	private _nonce: number;

	constructor(
		timestamp: string,
		transactions: Transaction[],
		previousHash: string = ''
	) {
		this._timestamp = timestamp;
		this._transactions = transactions;
		this._previousHash = previousHash;
		this._hash = this.calculateHash();
		this._nonce = 0;
	}

	// getters
	public get timestamp(): string {
		return this._timestamp;
	}
	public get transactions(): Transaction[] {
		return this._transactions;
	}
	public get previousHash(): string {
		return this._previousHash;
	}
	public get hash(): string {
		return this._hash;
	}

	// methods
	calculateHash() {
		return SHA256(
			this._previousHash + this._timestamp + this._transactions + this._nonce
		).toString();
	}

	mineBlock(difficulty: number) {
		while (
			this._hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
		) {
			this._nonce++;
			this._hash = this.calculateHash();
		}
		console.log('Block mined: ' + this._hash);
	}

	hasValidTransactions() {
		for (let tx of this.transactions) {
			if (!tx.isValid()) return false;
		}
		return true;
	}
}
