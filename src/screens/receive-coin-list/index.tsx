import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { ScreenLayout } from 'components/layout/screen-layout';
import { CoinListItem } from 'components/coin/list-item';
import { InnerPageTitle } from 'components/layout/inner-page-title';
import { Column } from 'components/layout/flex';
import { SearchBar } from 'components/search/search-bar';
import { BottomPan } from 'components/bottom-pan';
import { CoinProperties, ENABLED_EVM_ASSETS } from '../../constants/enabled-assets-temporary';

import { hashHistory } from '../../constants/hash-history';
import { Bold16x24, Medium14x21, Medium16x24 } from 'components/typography';
import { AddressQRCode } from 'components/address-qr-code';
import { getAssetLogoSrc } from '../../utils/get-asset-logo-src';

export const ReceiveCoinListScreen: React.FC = () => {
    const theme = useTheme();
    const [currentCoinOpened, setCurrentCoinOpened] = useState<CoinProperties | null>(null);

  // replace with business logic
  const userAddress = '0x5f55dc562546196014efae0d88bdc2adbffffbbd287';

  return (
    <CoinListScreenLayout>
      <Column gap={'12px'}>
        <InnerPageTitle onBackClick={hashHistory.back} title={'Receive coin'} />
        <SearchBar />
        {ENABLED_EVM_ASSETS.map(coin => (
          <CoinListItem
            coin={coin}
            coinBalance={0}
            coinBalanceUSD={0}
            coinPriceChangePercentage={0}
            onClick={() => setCurrentCoinOpened(coin)}
          />
        ))}
      </Column>

      {currentCoinOpened !== null ? (
        <BottomPan onClose={() => setCurrentCoinOpened(null)} isOpen>
          <Column gap={'16px'} justifyContent={'center'} alignItems={'center'}>
            <Bold16x24>Receive {currentCoinOpened.symbol}</Bold16x24>

            <AddressQRCode
              address={userAddress}
              iconSrc={getAssetLogoSrc(currentCoinOpened.imageSlug)}
            />

            <Column alignItems={'flex-start'} justifyContent={'flex-start'}>
              <Medium14x21 fontColor={theme.palette.gray}>Address</Medium14x21>
              <UserAddress>{userAddress}</UserAddress>
            </Column>
          </Column>
        </BottomPan>
      ) : null}
    </CoinListScreenLayout>
  );
};

const CoinListScreenLayout = styled(ScreenLayout)`
  background-color: ${({ theme }) => theme.palette.background};
  padding: 16px;
`;

const UserAddress = styled(Medium16x24)`
  word-break: break-all;
`;