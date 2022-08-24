import React, { useState, useEffect } from 'react'
import { styled } from 'components/theme'
import { Wallet } from '../icons/Wallet'
import { Text } from './Text'
import { IconWrapper } from './IconWrapper'
import { Button } from './Button'
import { useBaseTokenInfo } from '../hooks/useTokenInfo'
import { getTokenBalance } from '../hooks/useTokenBalance'
import { formatTokenBalance } from '../util/conversion'
import { Logout } from '../icons/Logout'
import { CSS } from '@stitches/react'

type ConnectedWalletButtonProps = { css?: CSS } & {
  walletName?: string
  onConnect: () => void
  onDisconnect: () => void
  connected: boolean
}

export const ConnectedWalletButton = ({
  onConnect,
  connected,
  onDisconnect,
  walletName,
  ...props
}: ConnectedWalletButtonProps) => {
  const baseToken = useBaseTokenInfo()
  const [openWallet, setOpenWallet] = useState(false)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    // setBalance(0)
    getTokenBalance(baseToken).then((balance) => {
      setBalance(balance)
    })
  }, [baseToken])

  if (!connected) {
    return (
      <ConnectWalletContainer className="connect-wallet">
        <Button
          className="btn-buy btn-default"
          css={{
            background: '$white',
            color: '$black',
            stroke: '$black',
            width: '100%',
          }}
          variant="primary"
          size="large"
          onClick={onConnect}
        >
          Connect Wallet
        </Button>
      </ConnectWalletContainer>
    )
  }

  return (
    <StyledWalletContainer className="connect-wallet">
      <StyledWalletButton {...props} role="button">
        <IconWrapper
          className="mobile-icon"
          size="38px"
          icon={<Wallet />}
          onClick={() => {
            setOpenWallet(!openWallet)
          }}
        />
        <IconWrapper className="desktop-icon" size="16px" icon={<Wallet />} />
        <div data-content="" className="wallet-status">
          <Text variant="link" color="white">
            {walletName}
          </Text>
          <Text
            variant="legend"
            css={{
              '-webkit-background-clip': 'text',
              color: '$white',
            }}
          >
            {formatTokenBalance(balance, { includeCommaSeparation: true })}{' '}
            {baseToken?.symbol}
          </Text>
        </div>

        <StyledDivForActions
          className={`wallet-action ${openWallet ? 'open' : 'close'}`}
        >
          <StyledDivForInlineActions>
            {/*
            <Button
              variant="ghost"
              size="small"
              onClick={() => {
                navigator.clipboard.writeText(address)
              }}
              icon={<IconWrapper icon={<Copy />} />}
              
            />
            */}
            <Button
              variant="ghost"
              size="small"
              onClick={onDisconnect}
              icon={<IconWrapper icon={<Logout />} />}
            />
          </StyledDivForInlineActions>
        </StyledDivForActions>
      </StyledWalletButton>
    </StyledWalletContainer>
  )
}

const ConnectWalletContainer = styled('div', {
  position: 'relative',
  transition: 'background-color .1s ease-out, border .1s ease-out',
  display: 'flex',
  alignItems: 'center',
  columnGap: '$space$6',
  borderRadius: '$3',
  textAlign: 'center',
  button: {
    border: '1px solid $colors$white',
    padding: '$6 $12 $6',
  },
})

const StyledDivForActions = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  background:
    'linear-gradient(to right, $colors$white0 0%, $colors$white95 5%, $colors$white)',
  borderRadius: '$2',
  opacity: 1,
  transition: 'opacity .1s ease-out',
})

const StyledDivForInlineActions = styled('div', {
  display: 'flex',
  columnGap: '$space$2',
})

const StyledWalletContainer = styled('div', {
  alignItems: 'center',
  justifyContent: 'flex-end',
  display: 'flex',
})

const StyledWalletButton = styled('div', {
  position: 'relative',
  transition: 'background-color .1s ease-out, border .1s ease-out',
  display: 'flex',
  alignItems: 'center',
  columnGap: '$space$6',
  padding: '$4 $12 $4',
  borderRadius: '$3',
  textAlign: 'center',
  border: '1px solid $colors$white',
  '&:hover': {
    [`${StyledDivForActions}`]: {
      opacity: 1,
    },
  },
})
