import BigNumber from 'bignumber.js';
import { Token } from 'config/sdk-core';
import { FarmWithStakedValue } from 'packages/farms/types';

export type TableProps = {
  data?: TableDataTypes[];
  selectedFilters?: string;
  sortBy?: string;
  sortDir?: string;
  onSort?: (value: string) => void;
};

export type ColumnsDefTypes = {
  id: number;
  label: string;
  name: string;
  sortable: boolean;
};

export type ScrollBarProps = {
  ref: string;
  width: number;
};

export type TableDataTypes = {
  POOL: string;
  APR: string;
  EARNED: string;
  STAKED: string;
  DETAILS: string;
  LINKS: string;
};

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 4,
    name: 'totalStaked',
    sortable: true,
    label: 'Staked TVL',
  },
  {
    id: 5,
    name: 'endTime',
    sortable: true,
    label: 'Ends In',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: '',
  },
];

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    sortable: true,
    label: 'Pools',
  },
  {
    id: 2,
    name: 'apr',
    sortable: true,
    label: 'APR',
  },
  {
    id: 3,
    name: 'totalStaked',
    sortable: true,
    label: 'Staked TVL',
  },
  {
    id: 4,
    name: 'earned',
    sortable: true,
    label: 'Earned',
  },
  {
    id: 5,
    name: 'participant',
    sortable: true,
    label: 'Participant',
  },
  {
    id: 6,
    name: 'endTime',
    sortable: true,
    label: 'Ends In',
  },
  {
    id: 7,
    name: 'details',
    sortable: false,
    label: '',
  },
];

export interface AprProps {
  value: string;
  multiplier: string;
  pid: number;
  lpLabel: string;
  lpSymbol: string;
  lpRewardsApr: number;
  tokenAddress?: string;
  quoteTokenAddress?: string;
  roboPrice: BigNumber;
  hideButton?: boolean;
  strikethrough?: boolean;
  useTooltipText?: boolean;
  boosted?: boolean;
}

export interface FarmProps {
  label: string;
  poolId: number;
  token: Token;
  quoteToken: Token;
  isReady: boolean;
  manager: string;
}
export interface EarnedProps {
  earnings: number;
  pid: number;
  token: Token;
}
export interface MultiplierProps {
  multiplier: string;
}

export interface LiquidityProps {
  liquidity: BigNumber;
}

export interface DetailsProps {
  actionPanelToggled: boolean;
}
export interface LockTimeProps {
  lockTime: number;
}

export interface TotalStakedProps {
  farmData: any;
}

export interface TotalParticipantProps {
  total: number;
}

export interface RowProps {
  apr: AprProps;
  farm: FarmProps;
  earned: EarnedProps;
  multiplier: MultiplierProps;
  details: FarmWithStakedValue;
  endTime: LockTimeProps;
  totalStaked: TotalStakedProps;
  participant: TotalParticipantProps;
  manager: string;
}

export interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean;
}
export interface ITableProps {
  farms: FarmWithStakedValue[];
  userDataReady: boolean;
  sortColumn?: string;
  roboPrice?: BigNumber;
  isLoadingFarmData?: boolean;
}
