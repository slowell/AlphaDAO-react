import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Social from './Social';
import externalUrls from './externalUrls';
import { ReactComponent as BondIcon } from '../../assets/icons/bond.svg';
import { ReactComponent as ActiveBondIcon } from '../../assets/icons/active-bond.svg';
import { ReactComponent as StakeIcon } from '../../assets/icons/stake.svg';
import { ReactComponent as ActiveStakeIcon } from '../../assets/icons/active-stake.svg';
import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard.svg';
import { ReactComponent as AlphaIcon } from '../../assets/icons/alphaHeader.svg';
import { ReactComponent as WalletIcon } from '../../assets/icons/wallet.svg';
import { trim, shorten } from '../../helpers';
import { useAddress, useWeb3Context } from 'src/hooks/web3Context';
import useBonds from '../../hooks/Bonds';
import { Paper, Link, Box, Typography, SvgIcon } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import './sidebar.scss';

function NavContent() {
  const [ isActive ] = useState();
  const [ activeIcon, setActiveIcon ] = useState();
  const address = useAddress();
  const { bonds, realBonds } = useBonds();
  const { chainID } = useWeb3Context();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace('/', '');
    if (currentPath.indexOf('dashboard') >= 0 && page === 'dashboard') {
      setActiveIcon('dashboard');
      return true;
    }
    if (currentPath.indexOf('stake') >= 0 && page === 'stake') {
      setActiveIcon('stake');
      return true;
    }
    if (currentPath.indexOf('claim') >= 0 && page === 'claim') {
      setActiveIcon('claim');
      return true;
    }
    if ((currentPath.indexOf('bonds') >= 0 || currentPath.indexOf('choose_bond') >= 0) && page === 'bonds') {
      setActiveIcon('bonds');
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://alphadao.financial" target="_blank">
              <SvgIcon
                component={AlphaIcon}
                viewBox="0 0 80 118"
                style={{ minWdth: '129px', minHeight: '129px', width: '163px' }}
              />
            </Link>

            {address && (
              <div className="wallet-link">
                <Link href={`https://bscscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/presale"
                isActive={(match, location) => {
                  return checkPage(match, location, 'presale');
                }}
                className={`button-dapp-menu ${isActive ? 'active' : ''}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={WalletIcon} />
                  Whitelist
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, 'dashboard');
                }}
                className={`button-dapp-menu ${isActive ? 'active' : ''}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  Dashboard
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, 'stake');
                }}
                className={`button-dapp-menu ${isActive ? 'active' : ''}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={activeIcon === 'stake' ? ActiveStakeIcon : StakeIcon} />
                  Stake
                </Typography>
              </Link>
              <Link
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, 'bonds');
                }}
                className={`button-dapp-menu ${isActive ? 'active' : ''}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={activeIcon === 'bonds' ? ActiveBondIcon : BondIcon} />
                  Bond
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="flex-end" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography variant="h6">{externalUrls[link].icon}</Typography>
                  <Typography variant="h6">{externalUrls[link].title}</Typography>
                </Link>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

{
  /* <div className="dapp-menu-data discounts">
<div className="bond-discounts">
	<Typography variant="body2">Bond with educational assets</Typography>
	{realBonds &&
		realBonds.map((realBond, i) => (
			<Link disabled component={NavLink} to={`/bonds/${realBond.name}`} key={i} className={'bond'}>
				{/*<Link className={"bond"}>*/
}
// {!realBond.bondDiscount ? (
// <Skeleton variant="text" width={'150px'} />
// ) : (
// <Typography variant="body2">
// {realBond.displayName}
// <span className="bond-pair-roi">
// {realBond.bondDiscount}
// </span>
// </Typography>
// )}
// </Link>
// ))}
// </div>
// </div> */}

export default NavContent;