/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction, removeTxn } from './actions';
import { TransactionDetails } from './types';

const now = () => new Date().getTime();

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

export const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, info } }) => {
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = { hash, info, from, addedTime: now() };
      transactions[chainId] = txs;
    })
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
    })
    .addCase(removeTxn, (transactions, { payload: { chainId, hash } }) => {
      if (!transactions[chainId]?.[hash]) return;
      delete transactions[chainId][hash];
    })
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    })
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = now();
    }),
);
