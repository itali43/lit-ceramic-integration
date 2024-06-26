<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [encodeb64][1]
    *   [Parameters][2]
*   [blobToBase64][3]
    *   [Parameters][4]
*   [decodeb64][5]
    *   [Parameters][6]
*   [\_encryptWithLit][7]
    *   [Parameters][8]
*   [\_decryptWithLit][9]
    *   [Parameters][10]

## encodeb64

This function encodes into base 64.
it's useful for storing symkeys and files in ceramic

### Parameters

*   `uintarray` **any** 
*   `input` **[Uint8Array][11]** a file or any data

Returns **[string][12]** returns a string of b64

## blobToBase64

This function converts blobs to base 64.
for easier storage in ceramic

### Parameters

*   `blob` **[Blob][13]** what you'd like to encode

Returns **[Promise][14]<[String][12]>** returns a string of b64

## decodeb64

This function decodes from base 64.
it's useful for decrypting symkeys and files in ceramic

### Parameters

*   `b64String` **any** 
*   `input` **[blob][13]** a b64 string

Returns **[string][12]** returns the data as a string

## \_encryptWithLit

encrypts a message with Lit returns required details
this obfuscates data such that it can be stored on ceramic without
non-permissioned eyes seeing what the data is

### Parameters

*   `auth` **[blob][13]** authentication from wallet
*   `aStringThatYouWishToEncrypt` **[String][12]** the clear text you'd like encrypted
*   `accessControlConditions` **[Array][15]<[Object][16]>** 

Returns **[Promise][14]<[Array][15]\<any>>** returns, in this order: encryptedZipBase64, encryptedSymmetricKeyBase64, accessControlConditions, chain

## \_decryptWithLit

decrypt encrypted zip and symmetric key using the lit protocol

### Parameters

*   `encryptedZip` **[Uint8Array][11]** encrypted data that will be converted into a string
*   `encryptedSymmKey` **[Uint8Array][11]** symmetric key
*   `accessControlConditions` **[Uint8Array][11]** conditions that determine access
*   `chain` **[string][12]** 

Returns **[Promise][14]<[string][12]>** promise with the decrypted string

[1]: #encodeb64

[2]: #parameters

[3]: #blobtobase64

[4]: #parameters-1

[5]: #decodeb64

[6]: #parameters-2

[7]: #_encryptwithlit

[8]: #parameters-3

[9]: #_decryptwithlit

[10]: #parameters-4

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[13]: https://developer.mozilla.org/docs/Web/API/Blob

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
