# Lit Ceramic Integration Module

### Installation

`yarn add @litelliott/lit-ceramic-integration`

### How to Implement

TODO :)

### How to develop in your local environment

this helped: https://flaviocopes.com/npm-local-package/

### Notes

- Important to restart parcel in the project you're using this module with when you are editing locally, otherwise it won't update.

### To Do / Desired Future Features

- Change infuraID in ./wallet's `web3Modal`.
- Allow for testnet for web3?
- Allow Swap to Ceramic's mainnet
- clean up/swap around deSym/deZip etc in logic
- eth chain is hard coded

### Test Data

#### Testing Ceramic Read Function

If you'd like ping the ceramic test net for a streamID that already works, use the following streamID: `kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au`

Manually, you can start the `ceramic daemon` and then in another terminal window enter `ceramic show kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au`
It should return the following:

{
"chain": "ethereum",
"symKey": "KKS1WYYvPwn7KnT/2ANE9ISptHB/l/YAojqfOwciNmSkLvAeug8rU1vYEYwscJ0JuyaKPYnQIKhWGXKgWMOCQfSd7wF5abDYIvPReFasOLpmeBW6Y7y35Qqm9wUCmcG0yvza4khakl3+Jfiy5RVBoNX2uBJQ4TTDyCKbjAjfq0gAAAAAAAAAIA61NVwyAWfXZ7wCwpl1aAOx1ruiaVej29rf+qd07vyJfk0zK6L97jvRCxH5m6tYiQ==",
"encryptedZip": "MWUCsoLQ4mYFcmY/8w/Xo3Ce63ZEDuK+R1P9187uZaFW6F8O/PuaY42CJSSeXCgMziyz/12KS+44tkrJ3l1p7nL+vFHzz6ZmcmT6ZIhoOhkTytOvtreeRcv6zHVo6fYxKj3FvyRELoA8n79GiOXi5uBUA/Oy61m4OgIR5GHxXyaj5m7mNScZTVJrH+aCRv5EXfpGDz1KC2obVF+Ou6ddAw==",
"accessControlConditions": [
{
"chain": "ethereum",
"method": "eth_getBalance",
"parameters": [
":userAddress",
"latest"
],
"contractAddress": "0x20598860da775f63ae75e1cd2ce0d462b8cee4c7",
"returnValueTest": {
"value": "10000000000000",
"comparator": ">="
},
"standardContractType": ""
}
]
}
