import type {
  BaseRpcRequests,
  Transport,
  TransportConfig,
} from './createTransport'
import { createTransport } from './createTransport'

type EthereumProvider = { request: BaseRpcRequests['request'] }

export type CustomTransportConfig = {
  /** The key of the transport. */
  key?: TransportConfig['key']
  /** The name of the transport. */
  name?: TransportConfig['name']
}

export type CustomTransport = Transport<'custom', EthereumProvider['request']>

/**
 * @description Creates a custom transport given an EIP-1193 compliant `request` attribute.
 */
export function custom<TProvider extends EthereumProvider>(
  /** An Ethereum provider with an EIP-1193 "request" attribute. */
  provider: TProvider,
  { key = 'custom', name = 'Custom Provider' }: CustomTransportConfig = {},
): CustomTransport {
  return () =>
    createTransport({
      key,
      name,
      request: provider.request.bind(provider),
      type: 'custom',
    })
}
