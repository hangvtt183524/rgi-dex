/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from './common';

export interface ENSPublicResolverInterface extends utils.Interface {
  functions: {
    'ABI(bytes32,uint256)': FunctionFragment;
    'addr(bytes32)': FunctionFragment;
    'authorisations(bytes32,address,address)': FunctionFragment;
    'clearDNSZone(bytes32)': FunctionFragment;
    'contenthash(bytes32)': FunctionFragment;
    'dnsRecord(bytes32,bytes32,uint16)': FunctionFragment;
    'hasDNSRecords(bytes32,bytes32)': FunctionFragment;
    'interfaceImplementer(bytes32,bytes4)': FunctionFragment;
    'name(bytes32)': FunctionFragment;
    'pubkey(bytes32)': FunctionFragment;
    'setABI(bytes32,uint256,bytes)': FunctionFragment;
    'setAddr(bytes32,uint256,bytes)': FunctionFragment;
    'setAddr(bytes32,address)': FunctionFragment;
    'setAuthorisation(bytes32,address,bool)': FunctionFragment;
    'setContenthash(bytes32,bytes)': FunctionFragment;
    'setDNSRecords(bytes32,bytes)': FunctionFragment;
    'setInterface(bytes32,bytes4,address)': FunctionFragment;
    'setName(bytes32,string)': FunctionFragment;
    'setPubkey(bytes32,bytes32,bytes32)': FunctionFragment;
    'setText(bytes32,string,string)': FunctionFragment;
    'supportsInterface(bytes4)': FunctionFragment;
    'text(bytes32,string)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'ABI'
      | 'addr'
      | 'authorisations'
      | 'clearDNSZone'
      | 'contenthash'
      | 'dnsRecord'
      | 'hasDNSRecords'
      | 'interfaceImplementer'
      | 'name'
      | 'pubkey'
      | 'setABI'
      | 'setAddr(bytes32,uint256,bytes)'
      | 'setAddr(bytes32,address)'
      | 'setAuthorisation'
      | 'setContenthash'
      | 'setDNSRecords'
      | 'setInterface'
      | 'setName'
      | 'setPubkey'
      | 'setText'
      | 'supportsInterface'
      | 'text',
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'ABI',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(functionFragment: 'addr', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: 'authorisations',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: 'clearDNSZone', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: 'contenthash', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: 'dnsRecord',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: 'hasDNSRecords',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: 'interfaceImplementer',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(functionFragment: 'name', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: 'pubkey', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(
    functionFragment: 'setABI',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAddr(bytes32,uint256,bytes)',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAddr(bytes32,address)',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAuthorisation',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<boolean>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setContenthash',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setDNSRecords',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setInterface',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: 'setName', values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'setPubkey',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>],
  ): string;
  encodeFunctionData(
    functionFragment: 'setText',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: 'supportsInterface', values: [PromiseOrValue<BytesLike>]): string;
  encodeFunctionData(functionFragment: 'text', values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;

  decodeFunctionResult(functionFragment: 'ABI', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addr', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'authorisations', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'clearDNSZone', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'contenthash', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'dnsRecord', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'hasDNSRecords', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'interfaceImplementer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'pubkey', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setABI', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAddr(bytes32,uint256,bytes)', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAddr(bytes32,address)', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAuthorisation', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setContenthash', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setDNSRecords', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setName', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setPubkey', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setText', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'text', data: BytesLike): Result;

  events: {
    'ABIChanged(bytes32,uint256)': EventFragment;
    'AddrChanged(bytes32,address)': EventFragment;
    'AddressChanged(bytes32,uint256,bytes)': EventFragment;
    'AuthorisationChanged(bytes32,address,address,bool)': EventFragment;
    'ContenthashChanged(bytes32,bytes)': EventFragment;
    'DNSRecordChanged(bytes32,bytes,uint16,bytes)': EventFragment;
    'DNSRecordDeleted(bytes32,bytes,uint16)': EventFragment;
    'DNSZoneCleared(bytes32)': EventFragment;
    'InterfaceChanged(bytes32,bytes4,address)': EventFragment;
    'NameChanged(bytes32,string)': EventFragment;
    'PubkeyChanged(bytes32,bytes32,bytes32)': EventFragment;
    'TextChanged(bytes32,string,string)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'ABIChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AddrChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AddressChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'AuthorisationChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'ContenthashChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DNSRecordChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DNSRecordDeleted'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DNSZoneCleared'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'InterfaceChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'NameChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'PubkeyChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'TextChanged'): EventFragment;
}

export interface ABIChangedEventObject {
  node: string;
  contentType: BigNumber;
}
export type ABIChangedEvent = TypedEvent<[string, BigNumber], ABIChangedEventObject>;

export type ABIChangedEventFilter = TypedEventFilter<ABIChangedEvent>;

export interface AddrChangedEventObject {
  node: string;
  a: string;
}
export type AddrChangedEvent = TypedEvent<[string, string], AddrChangedEventObject>;

export type AddrChangedEventFilter = TypedEventFilter<AddrChangedEvent>;

export interface AddressChangedEventObject {
  node: string;
  coinType: BigNumber;
  newAddress: string;
}
export type AddressChangedEvent = TypedEvent<[string, BigNumber, string], AddressChangedEventObject>;

export type AddressChangedEventFilter = TypedEventFilter<AddressChangedEvent>;

export interface AuthorisationChangedEventObject {
  node: string;
  owner: string;
  target: string;
  isAuthorised: boolean;
}
export type AuthorisationChangedEvent = TypedEvent<[string, string, string, boolean], AuthorisationChangedEventObject>;

export type AuthorisationChangedEventFilter = TypedEventFilter<AuthorisationChangedEvent>;

export interface ContenthashChangedEventObject {
  node: string;
  hash: string;
}
export type ContenthashChangedEvent = TypedEvent<[string, string], ContenthashChangedEventObject>;

export type ContenthashChangedEventFilter = TypedEventFilter<ContenthashChangedEvent>;

export interface DNSRecordChangedEventObject {
  node: string;
  name: string;
  resource: number;
  record: string;
}
export type DNSRecordChangedEvent = TypedEvent<[string, string, number, string], DNSRecordChangedEventObject>;

export type DNSRecordChangedEventFilter = TypedEventFilter<DNSRecordChangedEvent>;

export interface DNSRecordDeletedEventObject {
  node: string;
  name: string;
  resource: number;
}
export type DNSRecordDeletedEvent = TypedEvent<[string, string, number], DNSRecordDeletedEventObject>;

export type DNSRecordDeletedEventFilter = TypedEventFilter<DNSRecordDeletedEvent>;

export interface DNSZoneClearedEventObject {
  node: string;
}
export type DNSZoneClearedEvent = TypedEvent<[string], DNSZoneClearedEventObject>;

export type DNSZoneClearedEventFilter = TypedEventFilter<DNSZoneClearedEvent>;

export interface InterfaceChangedEventObject {
  node: string;
  interfaceID: string;
  implementer: string;
}
export type InterfaceChangedEvent = TypedEvent<[string, string, string], InterfaceChangedEventObject>;

export type InterfaceChangedEventFilter = TypedEventFilter<InterfaceChangedEvent>;

export interface NameChangedEventObject {
  node: string;
  name: string;
}
export type NameChangedEvent = TypedEvent<[string, string], NameChangedEventObject>;

export type NameChangedEventFilter = TypedEventFilter<NameChangedEvent>;

export interface PubkeyChangedEventObject {
  node: string;
  x: string;
  y: string;
}
export type PubkeyChangedEvent = TypedEvent<[string, string, string], PubkeyChangedEventObject>;

export type PubkeyChangedEventFilter = TypedEventFilter<PubkeyChangedEvent>;

export interface TextChangedEventObject {
  node: string;
  indexedKey: string;
  key: string;
}
export type TextChangedEvent = TypedEvent<[string, string, string], TextChangedEventObject>;

export type TextChangedEventFilter = TypedEventFilter<TextChangedEvent>;

export interface ENSPublicResolver extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ENSPublicResolverInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ABI(
      node: PromiseOrValue<BytesLike>,
      contentTypes: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, string]>;

    addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;

    authorisations(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    clearDNSZone(
      node: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;

    dnsRecord(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      resource: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    hasDNSRecords(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    interfaceImplementer(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;

    pubkey(
      node: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[string, string] & { x: string; y: string }>;

    setABI(
      node: PromiseOrValue<BytesLike>,
      contentType: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    'setAddr(bytes32,uint256,bytes)'(
      node: PromiseOrValue<BytesLike>,
      coinType: PromiseOrValue<BigNumberish>,
      a: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    'setAddr(bytes32,address)'(
      node: PromiseOrValue<BytesLike>,
      a: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setAuthorisation(
      node: PromiseOrValue<BytesLike>,
      target: PromiseOrValue<string>,
      isAuthorised: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setContenthash(
      node: PromiseOrValue<BytesLike>,
      hash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setDNSRecords(
      node: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setInterface(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setName(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setPubkey(
      node: PromiseOrValue<BytesLike>,
      x: PromiseOrValue<BytesLike>,
      y: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setText(
      node: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<string>,
      value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;

    text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[string]>;
  };

  ABI(
    node: PromiseOrValue<BytesLike>,
    contentTypes: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<[BigNumber, string]>;

  addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  authorisations(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  clearDNSZone(
    node: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  dnsRecord(
    node: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<BytesLike>,
    resource: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<string>;

  hasDNSRecords(
    node: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  interfaceImplementer(
    node: PromiseOrValue<BytesLike>,
    interfaceID: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides,
  ): Promise<string>;

  name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

  pubkey(
    node: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides,
  ): Promise<[string, string] & { x: string; y: string }>;

  setABI(
    node: PromiseOrValue<BytesLike>,
    contentType: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  'setAddr(bytes32,uint256,bytes)'(
    node: PromiseOrValue<BytesLike>,
    coinType: PromiseOrValue<BigNumberish>,
    a: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  'setAddr(bytes32,address)'(
    node: PromiseOrValue<BytesLike>,
    a: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setAuthorisation(
    node: PromiseOrValue<BytesLike>,
    target: PromiseOrValue<string>,
    isAuthorised: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setContenthash(
    node: PromiseOrValue<BytesLike>,
    hash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setDNSRecords(
    node: PromiseOrValue<BytesLike>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setInterface(
    node: PromiseOrValue<BytesLike>,
    interfaceID: PromiseOrValue<BytesLike>,
    implementer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setName(
    node: PromiseOrValue<BytesLike>,
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setPubkey(
    node: PromiseOrValue<BytesLike>,
    x: PromiseOrValue<BytesLike>,
    y: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setText(
    node: PromiseOrValue<BytesLike>,
    key: PromiseOrValue<string>,
    value: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;

  text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ABI(
      node: PromiseOrValue<BytesLike>,
      contentTypes: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[BigNumber, string]>;

    addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    authorisations(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    clearDNSZone(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;

    contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    dnsRecord(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      resource: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<string>;

    hasDNSRecords(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    interfaceImplementer(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<string>;

    name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;

    pubkey(
      node: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<[string, string] & { x: string; y: string }>;

    setABI(
      node: PromiseOrValue<BytesLike>,
      contentType: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    'setAddr(bytes32,uint256,bytes)'(
      node: PromiseOrValue<BytesLike>,
      coinType: PromiseOrValue<BigNumberish>,
      a: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    'setAddr(bytes32,address)'(
      node: PromiseOrValue<BytesLike>,
      a: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setAuthorisation(
      node: PromiseOrValue<BytesLike>,
      target: PromiseOrValue<string>,
      isAuthorised: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setContenthash(
      node: PromiseOrValue<BytesLike>,
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setDNSRecords(
      node: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setInterface(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setName(node: PromiseOrValue<BytesLike>, name: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    setPubkey(
      node: PromiseOrValue<BytesLike>,
      x: PromiseOrValue<BytesLike>,
      y: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<void>;

    setText(
      node: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<string>,
      value: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;

    text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    'ABIChanged(bytes32,uint256)'(
      node?: PromiseOrValue<BytesLike> | null,
      contentType?: PromiseOrValue<BigNumberish> | null,
    ): ABIChangedEventFilter;
    ABIChanged(
      node?: PromiseOrValue<BytesLike> | null,
      contentType?: PromiseOrValue<BigNumberish> | null,
    ): ABIChangedEventFilter;

    'AddrChanged(bytes32,address)'(node?: PromiseOrValue<BytesLike> | null, a?: null): AddrChangedEventFilter;
    AddrChanged(node?: PromiseOrValue<BytesLike> | null, a?: null): AddrChangedEventFilter;

    'AddressChanged(bytes32,uint256,bytes)'(
      node?: PromiseOrValue<BytesLike> | null,
      coinType?: null,
      newAddress?: null,
    ): AddressChangedEventFilter;
    AddressChanged(
      node?: PromiseOrValue<BytesLike> | null,
      coinType?: null,
      newAddress?: null,
    ): AddressChangedEventFilter;

    'AuthorisationChanged(bytes32,address,address,bool)'(
      node?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      target?: PromiseOrValue<string> | null,
      isAuthorised?: null,
    ): AuthorisationChangedEventFilter;
    AuthorisationChanged(
      node?: PromiseOrValue<BytesLike> | null,
      owner?: PromiseOrValue<string> | null,
      target?: PromiseOrValue<string> | null,
      isAuthorised?: null,
    ): AuthorisationChangedEventFilter;

    'ContenthashChanged(bytes32,bytes)'(
      node?: PromiseOrValue<BytesLike> | null,
      hash?: null,
    ): ContenthashChangedEventFilter;
    ContenthashChanged(node?: PromiseOrValue<BytesLike> | null, hash?: null): ContenthashChangedEventFilter;

    'DNSRecordChanged(bytes32,bytes,uint16,bytes)'(
      node?: PromiseOrValue<BytesLike> | null,
      name?: null,
      resource?: null,
      record?: null,
    ): DNSRecordChangedEventFilter;
    DNSRecordChanged(
      node?: PromiseOrValue<BytesLike> | null,
      name?: null,
      resource?: null,
      record?: null,
    ): DNSRecordChangedEventFilter;

    'DNSRecordDeleted(bytes32,bytes,uint16)'(
      node?: PromiseOrValue<BytesLike> | null,
      name?: null,
      resource?: null,
    ): DNSRecordDeletedEventFilter;
    DNSRecordDeleted(
      node?: PromiseOrValue<BytesLike> | null,
      name?: null,
      resource?: null,
    ): DNSRecordDeletedEventFilter;

    'DNSZoneCleared(bytes32)'(node?: PromiseOrValue<BytesLike> | null): DNSZoneClearedEventFilter;
    DNSZoneCleared(node?: PromiseOrValue<BytesLike> | null): DNSZoneClearedEventFilter;

    'InterfaceChanged(bytes32,bytes4,address)'(
      node?: PromiseOrValue<BytesLike> | null,
      interfaceID?: PromiseOrValue<BytesLike> | null,
      implementer?: null,
    ): InterfaceChangedEventFilter;
    InterfaceChanged(
      node?: PromiseOrValue<BytesLike> | null,
      interfaceID?: PromiseOrValue<BytesLike> | null,
      implementer?: null,
    ): InterfaceChangedEventFilter;

    'NameChanged(bytes32,string)'(node?: PromiseOrValue<BytesLike> | null, name?: null): NameChangedEventFilter;
    NameChanged(node?: PromiseOrValue<BytesLike> | null, name?: null): NameChangedEventFilter;

    'PubkeyChanged(bytes32,bytes32,bytes32)'(
      node?: PromiseOrValue<BytesLike> | null,
      x?: null,
      y?: null,
    ): PubkeyChangedEventFilter;
    PubkeyChanged(node?: PromiseOrValue<BytesLike> | null, x?: null, y?: null): PubkeyChangedEventFilter;

    'TextChanged(bytes32,string,string)'(
      node?: PromiseOrValue<BytesLike> | null,
      indexedKey?: PromiseOrValue<string> | null,
      key?: null,
    ): TextChangedEventFilter;
    TextChanged(
      node?: PromiseOrValue<BytesLike> | null,
      indexedKey?: PromiseOrValue<string> | null,
      key?: null,
    ): TextChangedEventFilter;
  };

  estimateGas: {
    ABI(
      node: PromiseOrValue<BytesLike>,
      contentTypes: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    authorisations(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    clearDNSZone(
      node: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    dnsRecord(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      resource: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    hasDNSRecords(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    interfaceImplementer(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    setABI(
      node: PromiseOrValue<BytesLike>,
      contentType: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    'setAddr(bytes32,uint256,bytes)'(
      node: PromiseOrValue<BytesLike>,
      coinType: PromiseOrValue<BigNumberish>,
      a: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    'setAddr(bytes32,address)'(
      node: PromiseOrValue<BytesLike>,
      a: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setAuthorisation(
      node: PromiseOrValue<BytesLike>,
      target: PromiseOrValue<string>,
      isAuthorised: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setContenthash(
      node: PromiseOrValue<BytesLike>,
      hash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setDNSRecords(
      node: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setInterface(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setName(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setPubkey(
      node: PromiseOrValue<BytesLike>,
      x: PromiseOrValue<BytesLike>,
      y: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setText(
      node: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<string>,
      value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;

    text(node: PromiseOrValue<BytesLike>, key: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    ABI(
      node: PromiseOrValue<BytesLike>,
      contentTypes: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    addr(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    authorisations(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    clearDNSZone(
      node: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    contenthash(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    dnsRecord(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      resource: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    hasDNSRecords(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    interfaceImplementer(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    name(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pubkey(node: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setABI(
      node: PromiseOrValue<BytesLike>,
      contentType: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    'setAddr(bytes32,uint256,bytes)'(
      node: PromiseOrValue<BytesLike>,
      coinType: PromiseOrValue<BigNumberish>,
      a: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    'setAddr(bytes32,address)'(
      node: PromiseOrValue<BytesLike>,
      a: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setAuthorisation(
      node: PromiseOrValue<BytesLike>,
      target: PromiseOrValue<string>,
      isAuthorised: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setContenthash(
      node: PromiseOrValue<BytesLike>,
      hash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setDNSRecords(
      node: PromiseOrValue<BytesLike>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setInterface(
      node: PromiseOrValue<BytesLike>,
      interfaceID: PromiseOrValue<BytesLike>,
      implementer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setName(
      node: PromiseOrValue<BytesLike>,
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setPubkey(
      node: PromiseOrValue<BytesLike>,
      x: PromiseOrValue<BytesLike>,
      y: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setText(
      node: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<string>,
      value: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    supportsInterface(interfaceID: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    text(
      node: PromiseOrValue<BytesLike>,
      key: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}