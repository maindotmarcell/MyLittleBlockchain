import Wallet from "./wallet";

export default class SatoshiNakamoto extends Wallet {
    public static instance = new Wallet();
}