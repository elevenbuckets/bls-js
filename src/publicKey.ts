import {G1point} from "./helpers/g1point";
import {PrivateKey} from "./privateKey";
import {BLSPubkey} from "./types";

export class PublicKey {

  private point: G1point;

  public constructor(point: G1point) {
    this.point = point;
  }

  public toBytesCompressed(): BLSPubkey {
    const publicKey = this.point.toBytes();
    const flags = ((1 << 5) | 0 | (1 << 7));
    const mask = 31;
    publicKey[0] &= mask;
    publicKey[0] |= flags;
    return publicKey;
  }

  public toHexString(): string {
    return `0x${this.toBytesCompressed().toString('hex')}`;
  }

  public static fromPrivateKey(privateKey: PrivateKey): PublicKey {
    return new PublicKey(
      G1point.generator().mul(privateKey.getValue())
    );
  }

}