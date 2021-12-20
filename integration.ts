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

  // Makes Encryption and Writing Accessible to module user
  encryptAndWrite(thisSecret: String): String {
    // makes certain DID/wallet has been auth'ed
    _authenticateCeramic(this.ceramicPromise).then((authReturn: any) => {
      // encrypt secret using lit
      _encryptWithLit(authReturn, thisSecret).then((zipAndSymKeyN64: any) => {
        // write encoded + encrypted data to ceramic
        _writeCeramic(authReturn, zipAndSymKeyN64).then((response: any) => {
          return response.toString();
        });
      });
    });
  }

  // Retrieves a stream and decrypts message then returns to user
  readAndDecrypt(streamID: String): String {
    // makes certain DID/wallet has been auth'ed
    _authenticateCeramic(this.ceramicPromise)
      .then(authReturn => {
        // make sure streamID has been chosen
        if (streamID === "") {
          console.log(streamID);
          return "error";
        } else {
          // read data and retrieve encrypted data
          return _readCeramic(authReturn, streamID);
        }
      })
      .then(function(response) {
        // data is encoded in base64, decode
        const jason = JSON.stringify(response);
        // @ts-ignore
        const enZip = response["encryptedZip"];
        const deZip = decodeb64(enZip);

        // @ts-ignore
        const enSym = response["symKey"];
        const deSym = decodeb64(enSym);

        // @ts-ignore
        const accessControlConditions = response["accessControlConditions"];
        // @ts-ignore
        const chain = response["chain"];

        // decrypt decoded data
        return _decryptWithLit(deZip, deSym, accessControlConditions, chain);
      })
      .then(function(response) {
        // return a string of retrieved, decrypted data
        return response.toString();
      });

    // return "hi";
  }
}
