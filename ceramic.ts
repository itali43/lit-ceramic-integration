import type { CeramicApi } from '@ceramicnetwork/common'
import Ceramic from '@ceramicnetwork/http-client'
import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from 'key-did-resolver'
import { createIDX } from './idx'
import { getProvider, getAddress } from './wallet'
import { ResolverRegistry } from 'did-resolver'

declare global {
  interface Window {
    ceramic?: CeramicApi
    [index: string]: any
  }
}

export async function _createCeramic(): Promise<CeramicApi> {
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
  console.log('creating... creating...')
  window.ceramic = ceramic
  console.log(window.ceramic)
  window.TileDocument = TileDocument
  window.Caip10Link = Caip10Link

  return Promise.resolve(ceramic as CeramicApi)
}

export async function _authenticateCeramic(
  ceramicPromise: Promise<CeramicApi>
): Promise<Array<any>> {
  console.log('authenticate Ceramic!@')

  const provider = await getProvider()
  const [ceramic, address] = await Promise.all([ceramicPromise, getAddress()])
  const keyDidResolver = KeyDidResolver.getResolver()
  const threeIdResolver = ThreeIdResolver.getResolver(ceramic)
  const resolverRegistry: ResolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  }
  const did = new DID({
    provider: provider,
    resolver: resolverRegistry,
  })

  await did.authenticate()
  await ceramic.setDID(did)
  const idx = createIDX(ceramic)
  window.did = ceramic.did
  return Promise.resolve([idx.id, ceramic, address])
}

/**
 * Write to Ceramic.  This function takes in an auth and what one would
 * like written and then sends it to a ceramic node in the proper format
 * @param {any[]} auth is the authentication passed via the persons wallet
 * @param {any[]} array of encrypted key, symkey, accessControlConditions, and chain
 * @returns {Promise<string>} promise with the ceramic streamID, can be used to look up data
 */
export async function _writeCeramic(auth: any[], toBeWritten: any[]): Promise<String> {
  if (auth) {
    const ceramic = auth[1]
    const toStore = {
      encryptedZip: toBeWritten[0],
      symKey: toBeWritten[1],
      accessControlConditions: toBeWritten[2],
      chain: toBeWritten[3],
    }
    const doc = await TileDocument.create(ceramic, toStore, {
      // controllers: [concatId],
      family: 'doc family',
    })
    return doc.id.toString()
  } else {
    console.error('Failed to authenticate in ceramic WRITE')
    return 'error'
  }
}
// for testing: kjzl6cwe1jw1479rnblkk5u43ivxkuo29i4efdx1e7hk94qrhjl0d4u0dyys1au
export async function _readCeramic(auth: any[], streamId: String): Promise<string> {
  if (auth) {
    const ceramic = auth[1]
    const stream = await ceramic.loadStream(streamId)
    return stream.content
  } else {
    console.error('Failed to authenticate in ceramic READ')
    return 'error'
  }
}
