import { Box } from 'components/Box';
import Table from 'components/Table';
import { TableBody, Td, Th, Thead, Tr } from 'components/Table/Cell';
import { RowType } from 'components/Table/types';
import Text from 'components/Text';
import useMatchBreakpoints from 'hooks/useMatchBreakPoints';
import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import { deserializeToken } from 'utils/tokens';
import Image from 'components/Image/Image';
import { ColumnCenter } from 'components/Layout/Column';
import useActiveWeb3React from 'hooks/web3React/useActiveWeb3React';
import { getTokenByAddressInChain } from 'utils/tokenHelpers';
import CircleLoader from 'components/Loader/CircleLoader';
import { DesktopColumnSchema, ITableProps, RowProps } from '../types';
import FarmRowMobile from './FarmRowMobile';
import Row from './Row';

const EmptyFarm = () => (
  <StyledEmptyFarmColumnCenter>
    <Image src="/assets/images/empty-token.png" width={240} height={182} alt="empty-token" />
    <EmptyFarmText>
      No farms found.
    </EmptyFarmText>
  </StyledEmptyFarmColumnCenter>
);

const StyledEmptyFarmColumnCenter = styled(ColumnCenter)`
  padding: 20px;
  margin: 40px 0;
  height: 100%;
`

const EmptyFarmText = styled(Text)`
  margin-top: 16px;
  color: ${({theme}) => theme.colors.textSubtle};
  text-align: center;
  margin-bottom: 20px;;
`

const FarmTable: React.FC<React.PropsWithChildren<ITableProps>> = ({farms, roboPrice, userDataReady, isLoadingFarmData}) => {
    const {isTabletPro, isDesktop} = useMatchBreakpoints();
    const {chainId} = useActiveWeb3React();

    const columns = useMemo(
        () =>
            DesktopColumnSchema.map((column) => {
                return {
                    id: column.id,
                    name: column.name,
                    label: column.label,
                    sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
                        switch (column.name) {
                            case 'farm':
                                return b.id - a.id;
                            case 'apr':
                                if (a.original.apr.value && b.original.apr.value) {
                                    return Number(a.original.apr.value) - Number(b.original.apr.value);
                                }

                                return 0;
                            case 'earned':
                                return (
                                    parseInt(a.original.earned.earnings.toString(), 10) -
                                    parseInt(b.original.earned.earnings.toString(), 10)
                                );
                            default:
                                return 1;
                        }
                    },
                    sortable: column.sortable,
                };
            }),
        [],
    );

    const generateRow = useCallback(
        (farm) => {
            const {token0, token1, manager, rewards, endTime, apr} = farm;
            const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '');

            const row: RowProps = {
                apr: {
                    value: apr,
                    pid: farm.poolId,
                    multiplier: farm.multiplier,
                    lpLabel,
                    lpSymbol: farm.lpSymbol,
                    tokenAddress: token0,
                    quoteTokenAddress: token1,
                    lpRewardsApr: farm.lpRewardsApr,
                    roboPrice,
                },
                farm: {
                    label: lpLabel,
                    poolId: farm.poolId,
                    token: farm.token,
                    quoteToken: farm.quoteToken,
                    isReady: farm.multiplier !== undefined,
                    manager,
                },
                earned: {
                    earnings: farm.userData.earnings,
                    pid: farm.poolId,
                    token: deserializeToken(getTokenByAddressInChain(chainId, rewards)),
                },
                endTime: {
                    lockTime: endTime || undefined,
                },
                participant: {
                    total: undefined,
                },
                multiplier: {
                    multiplier: farm.multiplier,
                },
                totalStaked: {
                    farmData: farm,
                },
                details: farm,
                manager: farm.manager,
            };
            return row;
        },
        [chainId, roboPrice],
    );

    const generateSortedRow = useCallback(
        (row) => {
            // @ts-ignore
            const newRow: RowProps = {};
            columns.forEach((column) => {
                if (!(column.name in row)) {
                    throw new Error(`Invalid row data, ${column.name} not found`);
                }
                newRow[column.name] = row[column.name];
            });
            return newRow;
        },
        [columns],
    );

    const sortedRows = useMemo(
        () =>
            farms
                .map((farm) => generateRow(farm))
                .map(generateSortedRow)
                .filter((farm) => farm.farm.isReady),
        [farms, generateRow, generateSortedRow],
    );

    const renderRowDesktop = useMemo(() => {
        return sortedRows.map((row) => {
            return (
                <Row {...row} userDataReady={userDataReady}
                     key={`table-farm-row-${row.details.manager}-${row.farm.poolId}`}/>
            );
        });
    }, [sortedRows, userDataReady]);

    const renderRowMobile = useMemo(
        () =>
            sortedRows.map((row) => {
                return (
                    <Box mb="16px" key={`table-farm-mobile-${row.details.manager}-${row.farm.poolId}`}>
                        <FarmRowMobile {...row} userDataReady={userDataReady} />
                    </Box>
                );
            }),
        [sortedRows, userDataReady],
    );
    return (
        <TableContainer id="table-container">
            <TableWrapper>
                {isLoadingFarmData ? (
                    <StyledCircleColumnCenter>
                        <CircleLoader />
                    </StyledCircleColumnCenter>
                ) : sortedRows.length === 0 ? (
                    <EmptyFarm/>
                ) : isTabletPro || isDesktop ? (
                    <Table>
                        <Thead>
                            <Tr>
                                {columns.map((column) => {
                                    if (!isDesktop && (column.id === 3 || column.id === 5)) return;
                                    return (
                                        <Th key={`th-header-row-${column.name}`} color="textAlt4">
                                            {column.label}
                                        </Th>
                                    );
                                })}
                            </Tr>
                        </Thead>
                        <StyledTableBody>{renderRowDesktop}</StyledTableBody>
                    </Table>
                ) : (
                    renderRowMobile
                )
                }
            </TableWrapper>
        </TableContainer>
    );
};

const StyledCircleColumnCenter = styled(ColumnCenter)`
  padding: 20px;
  margin: 40px 0;
  height: 100%;
`

const TableWrapper = styled.div`
  overflow: visible;
  scroll-margin-top: 64px;
  min-height: 400px;

  ${Th}:first-child {
    text-align: left;
    padding-left: 0;
  }

  ${Th}:last-child {
    text-align: left;
    padding-right: 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTableBody = styled(TableBody)`
  ${Tr} > ${Td}:first-child, ${Tr} > ${Td}:last-child {
    padding-right: 0;
    padding-left: 0;
  }
`;

const TableContainer = styled.div`
  position: relative;
`;

export default FarmTable;
