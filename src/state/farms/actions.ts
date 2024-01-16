import { stringify } from 'querystring';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { chainIdSupportedFarms } from 'config/constants/chains';
import {SupportedChainId, SupportedNetwork} from 'config/sdk-core';
import { fetchFarms } from 'packages/farms/fetchFarms';
import {
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmsUserInfos,
} from 'packages/farms/fetchFarmsUser';
import {
  FarmSortOptionEnum,
  SerializedFarm,
  FarmUserDataResponse,
  SerializedFarmPoolConfig,
  SerializedFarmBase,
} from 'packages/farms/types';
import { generateFarmPoolConfig } from 'packages/farms/utils';
import getFarmsPrices from 'packages/farms/utils/getFarmsPrices';

import { RootState } from 'state/store';
import { fetchFarmBaseData } from 'packages/farms/fetchFarms/fetchFarmBase';
import { getFarmPoolsInfo } from 'utils/tokens';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'config/constants/number';

export const updateFarmQuery = createAction<string>('user/updateFarmQuery');
export const updateFarmSort = createAction<FarmSortOptionEnum>('user/updateFarmSort');

export const updateLoadingFarmData = createAction<boolean>('user/updateLoadingFarmData');

export const fetchFarmsPublicDataAsync = createAsyncThunk<
  { farms: any[]; chainId: SupportedChainId },
  { account: string; chainId: SupportedChainId },
  {
    state: RootState;
  }
>(
  'farms/fetchFarmsPublicDataAsync',
  async ({ account, chainId }) => {
    try {
      if (!chainIdSupportedFarms(chainId))
        return {
          farms: [],
          chainId: null,
        };

      const farmPoolsInfo = await getFarmPoolsInfo(SupportedNetwork[chainId]);
      const parseFarmPool = generateFarmPoolConfig(farmPoolsInfo);

      const [farmsDataSettled, userFarmAllowancesSettled, userFarmTokenBalancesSettled, userInfosSettled] = await Promise.allSettled([
          fetchFarms({ farms: parseFarmPool, chainId }),
          fetchFarmUserAllowances(account, parseFarmPool, chainId),
          fetchFarmUserTokenBalances(account, parseFarmPool, chainId),
          fetchFarmsUserInfos(account, parseFarmPool, chainId)
      ]);

      // @ts-ignore
      const farmsData = farmsDataSettled?.value;
      // @ts-ignore
      const userFarmAllowances = userFarmAllowancesSettled?.value;
      // @ts-ignore
      const userFarmTokenBalances = userFarmTokenBalancesSettled?.value;
      // @ts-ignore
      const userInfos = userInfosSettled?.value;

      const poolsWithUserData = farmsData.map((pool, index) => {
         const [userStakedBalance, userFarmEarning] = userInfos[index];
         return {
             ...pool,
             endTime: pool?.endTime || undefined,
             userData: {
                 allowance: userFarmAllowances[index],
                 tokenBalance: userFarmTokenBalances[index],
                 stakedBalance: userStakedBalance,
                 earnings: userFarmEarning,
             }
         }
      });
        
      return {
        farms: poolsWithUserData,
        chainId,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  {
    condition: () => {
      return true;
    },
  },
);

export const clearFarmUserDataAsync = createAction('farms/clearFarmUserDataAsync');