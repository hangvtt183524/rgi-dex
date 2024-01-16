import { useStakingManagerContract } from 'hooks/useContract';
import {useCallback, useMemo, useState} from 'react';
import { useFetchFarmWithUserData } from 'state/farms/hooks';
import { unstakeFarm } from 'state/farms/utils';
import { useCallbackTransactionHash, useTransactionAdder } from 'state/transactions/hooks';
import { TransactionType } from 'state/transactions/types';
import { useSelectedChainNetwork } from 'state/user/hooks';

const useUnstakeFarms = (managerAddress: string, pid: number) => {
  const stakingManagerContract = useStakingManagerContract(managerAddress, true);
  const addTransaction = useTransactionAdder();
  const refrech = useFetchFarmWithUserData();
  const chainId = useSelectedChainNetwork();

  const handleRefech = useCallback(() => {
    refrech();
  }, [refrech]);

  const { callbackHash, pendingTxn } = useCallbackTransactionHash(handleRefech);
  const [attemptingTxt, setAttemptingTxt] = useState(false);

  const handleUnstake = useCallback(
    async (amount: string) => {
      setAttemptingTxt(true);

      return unstakeFarm(stakingManagerContract, pid).then((response) => {
        if (response.hash) callbackHash(response.hash);

        addTransaction(response, {
          type: TransactionType.UNSTAKE_FARM,
          amount,
          pid,
          manager: managerAddress,
          chainId,
        });

        setAttemptingTxt(false);
        return response;
      }).catch(() => {
          setAttemptingTxt(false);
      });
    },
    [stakingManagerContract, pid, callbackHash, addTransaction, managerAddress, chainId],
  );

  return useMemo(() => ({ onUnstake: handleUnstake, pendingTxn, attemptingTxt }), [handleUnstake, pendingTxn, attemptingTxt]);
};

export default useUnstakeFarms;
