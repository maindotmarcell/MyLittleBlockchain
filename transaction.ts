import { ECDH, KeyFormat, KeyObject } from 'crypto';
import { SHA256 } from 'crypto-js';
import { ec } from 'elliptic';
import { Key } from 'readline';

const EC = new ec('secp256k1');

export default class Transaction {
	// properties
	private _fromAddress: string | undefined;
	private _toAddress: string;
	private _amount: number;
    private signature: string | undefined;

	constructor(amount: number, toAddress: string, fromAddress?: string) {
		if (fromAddress !== undefined) this._fromAddress = fromAddress;
		else this._fromAddress = undefined;
		this._toAddress = toAddress;
		this._amount = amount;
	}

	// getters
	public get fromAddress(): string | undefined {
		return this._fromAddress;
	}
	public get toAddress(): string {
		return this._toAddress;
	}
	public get amount(): number {
		return this._amount;
	}

	// method
	calculateHash(): string  {
		if (this.fromAddress !== null)
			return SHA256(
				this.fromAddress + '' + this.toAddress + this.amount
			).toString();
		else return SHA256(this.toAddress + '' + this.amount).toString();
	}
    
    signTransaction(signingKey: ec.KeyPair): void {
        if (signingKey.getPublic('hex') !== this.fromAddress) 
            throw new Error('You cannot sign transactions for other wallets.');

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(): boolean {
        if (this.fromAddress === undefined) return true;
        if (!this.signature || this.signature.length === 0) 
            throw new Error('No signature in this transaction.');
        
        const publicKey = EC.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}
