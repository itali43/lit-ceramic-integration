// Don't forget to rebuild
import { createIDX } from "./idx";
import { tothemachine } from "./lit";
import { _startLitClient } from "./client";

export class Integration {
  constructor(private idx: Idx) {}

  welcome(named: string): string {
    return tothemachine(named);
  }

  startLitClient(window: Window) {
    _startLitClient(window);
  }

  //   encodeToB64(uintarray: any) {
  //     const b64 = Buffer.from(uintarray).toString("base64");
  //     return b64;
  //   }
}
