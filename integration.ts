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
  constructor() {}

  startLitClient(window: Window) {
    _startLitClient(window);
  }

  ceramicPromise = _createCeramic();

  /**
   * This function encodes into base 64.
   * it's useful for storing symkeys and files in ceramic
   * @param {Uint8Array} input a file or any data
   * @returns {string} returns a string of b64
   */
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
