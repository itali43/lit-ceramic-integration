// Don't forget to rebuild
import { createIDX } from "./idx";
import {
  tothemachine,
  _encryptWithLit,
  _decryptWithLit,
  decodeb64,
  encodeb64
} from "./lit";
import { _startLitClient } from "./client";
import {
  _authenticateCeramic,
  _createCeramic,
  _writeCeramic,
  _readCeramic
} from "./ceramic";

declare global {
  interface Window {
    did?: DID;
  }
}
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
  ceramicPromise = _createCeramic();

  encryptAndWrite(thisSecret: String): String {
    _authenticateCeramic(this.ceramicPromise).then((authReturn: any) => {
      // get secret that is to be encrypted
      _encryptWithLit(authReturn, thisSecret).then((zipAndSymKeyN64: any) => {
        //   updateAlert("success", `Successfully Encrypted`);

        // write encoded data to ceramic
        _writeCeramic(authReturn, zipAndSymKeyN64).then((response: any) => {
          return response.toString();
        });
      });
    });
  }

  readAndDecrypt(streamID: String): String {
    _authenticateCeramic(this.ceramicPromise)
      .then(authReturn => {
        if (streamID === "") {
          console.log(streamID);
          return "error";
          // updateAlert('danger', `Error, please write to ceramic first so a stream can be read`)
        } else {
          return _readCeramic(authReturn, streamID);
        }
      })
      .then(function(response) {
        const jason = JSON.stringify(response);
        const enZip = response["encryptedZip"];
        const deZip = decodeb64(enZip);

        const enSym = response["symKey"];
        const deSym = decodeb64(enSym);

        const accessControlConditions = response["accessControlConditions"];
        const chain = response["chain"];

        return _decryptWithLit(deZip, deSym, accessControlConditions, chain);
      })
      .then(function(response) {
        return response.toString();
      })
      .then(itIsDecrypted => {
        console.log("itIsDecrypted", itIsDecrypted);
        return itIsDecrypted;
      });

    // return "hi";
  }
}
