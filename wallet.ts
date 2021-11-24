import ec from 'elliptic';
import Transaction from './transaction';
import Blockchain from './blockchain';

export default class Wallet {
	// properties
	private _keyPair: ec.ec.KeyPair;
	private _publicKey: string;
	private _privateKey: string;

	constructor() {
		const EC = new ec.ec('secp256k1');
		this._keyPair = EC.genKeyPair();
		this._privateKey = this._keyPair.getPrivate('hex');
		this._publicKey = this._keyPair.getPublic('hex');
	}

	get keyPair() {
		return this._keyPair;
	}

	// get privateKey() {
	//     return this._privateKey;
	// }

	get publicKey() {
		return this._publicKey;
	}

	sendMoney(amount: number, payee: string) {
		if (!Blockchain.instance.pendingTransaction) {
			if (Blockchain.instance.getBalanceOfAddress(this._publicKey) >= amount) {
				const tx = new Transaction(amount, payee, this._publicKey);
				tx.signTransaction(this._keyPair);
				Blockchain.instance.addTransaction(tx);
			} else {
				throw new Error('Insufficient funds.');
			}
		} else {
			throw new Error(
				'Cannot finish transaction until previous has been mined, try again later.'
			);
		}
	}
}
