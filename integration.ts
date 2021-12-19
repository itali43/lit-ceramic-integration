// export default class LitCeramicIntegration {

//     function encodeForMe(uintarray: any) {
//      console.log("NODE: to b64");
//      const b64 = Buffer.from(uintarray).toString("base64");
//      return b64;
//    }
//    }
// export default const teeny = "I am a teeny tiny win";

export class Integration {
  value: number;

  constructor(n: number) {
    this.value = n;
  }

  encodeToB64(uintarray: any) {
    const b64 = Buffer.from(uintarray).toString("base64");
    return b64;
  }

  hi(): String {
    const b64 = "buff buff buff buff buff buff buff";
    return b64;
  }
}
