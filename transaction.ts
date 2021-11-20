export default class Transaction {

    // properties
	private _fromAddress: String | null;
	private _toAddress: String;
	private _amount: number;

    constructor( amount: number, toAddress: string, fromAddress?: string) {
        if (fromAddress !== null) 
            this._fromAddress = null;
        else
            this._fromAddress = fromAddress;
        this._toAddress = toAddress;
        this._amount = amount;
    }

    // getters
    public get fromAddress(): String | null {
        return this._fromAddress;
    }
    public get toAddress(): String {
        return this._toAddress;
    }
    public get amount(): number {
        return this._amount;
    }
}
