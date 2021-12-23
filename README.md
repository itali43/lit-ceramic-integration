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

If you'd like ping the ceramic test net for a streamID that already works, use the following streamID: `kjzl6cwe1jw14afliaj4m2vku3uy67ulyxj0erv5jgqz6k6cw0vtz27mf76m4ww`

Manually, you can start the `ceramic daemon` and then in another terminal window enter `ceramic show kjzl6cwe1jw14afliaj4m2vku3uy67ulyxj0erv5jgqz6k6cw0vtz27mf76m4ww`
It should return the following:

{
"chain": "ethereum",
"symKey": "gvKsVkBRS7d+baui7nJgf3b/G+8df1KNEYhVZ6kF97H8I0NROsKPd7BXds4jWbMK+rqlDa3Y2st4XQIHLqXLZVWJn5EZLNsYgEuZZPFaNbw7CGswjdSeMUK6WF8vAXS1+LbYrbal3GbTA+1JZ7Rc/xCKmpqM2Dvz2Btj8dhY3AUAAAAAAAAAIKnDOtW9nceKILkczbD1YjUyC3on3kTXKSJNyq2y4dmxy42BUuU6z+iI4WWZ2wmUhg==",
"encryptedZip": "rAf1RDm7nf4STWdhPS4gYWrlNHS9HcAUO/w0E86xcEC5zdLIF0TlGKVqeCowGNKtB8ecz/zxFp/8Ra+js4WOwK/yATFi5AxoCu2s5653rDZr9AjIQ8ii4pKeeRm+qEnL3bzXtmJT+5XiixTz5zgxhGgOccYMdDeOjJUKf6okOFBwVLCrUHyPd4MdbE+SLA8/hnUh7EnTLykF+3GJnD0cyQ==",
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
