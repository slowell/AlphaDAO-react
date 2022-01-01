import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as DaiImg } from "src/assets/tokens/DAI.svg";
import { ReactComponent as GuruDaiImg } from "src/assets/tokens/OX-DAI.svg";
import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as GuruFraxImg } from "src/assets/tokens/OX-FRAX.svg";
import { ReactComponent as GuruLusdImg } from "src/assets/tokens/OX-LUSD.svg";
import { ReactComponent as GuruEthImg } from "src/assets/tokens/OX-WETH.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { ReactComponent as LusdImg } from "src/assets/tokens/LUSD.svg";

import { abi as FraxOhmBondContract } from "src/abi/bonds/OhmFraxContract.json";
import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";
import { abi as BondOhmLusdContract } from "src/abi/bonds/OhmLusdContract.json";
import { abi as BondOhmEthContract } from "src/abi/bonds/OhmEthContract.json";

import { abi as DaiBondContract } from "src/abi/bonds/DaiContract.json";
import { abi as ReserveOhmLusdContract } from "src/abi/reserves/OhmLusd.json";
import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";
import { abi as ReserveOhmFraxContract } from "src/abi/reserves/OhmFrax.json";
import { abi as ReserveOhmEthContract } from "src/abi/reserves/OhmEth.json";

import { abi as FraxBondContract } from "src/abi/bonds/FraxContract.json";
import { abi as LusdBondContract } from "src/abi/bonds/LusdContract.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { getBondCalculator } from "src/helpers/BondCalculator";
import { BigNumberish } from "ethers";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond
export const dai = new StableBond({
  name: "dai",
  displayName: "BUSD",
  bondToken: "DAI",
  isAvailable: { [NetworkID.Mumbai]: true, [NetworkID.Polygon]: true },
  bondIconSvg: DaiImg,
  bondContractABI: DaiBondContract,
  networkAddrs: {
    [NetworkID.Mumbai]: {
      bondAddress: "0x3c2b484057e7ba8832c2abc7774b30fba691c789",
      reserveAddress: "0x52439209dc5f526375b8ab036ef9ea15bf0ce63b",
    },
    [NetworkID.Polygon]: {
      bondAddress: "0xFDAACD04f8ad605e928F4A44864FF825dCd4796d",
      reserveAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
  },
});

// export const frax = new StableBond({
//   name: "frax",
//   displayName: "FRAX",
//   bondToken: "FRAX",
//   isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
//   bondIconSvg: FraxImg,
//   bondContractABI: FraxBondContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x8510c8c2B6891E04864fa196693D44E6B6ec2514",
//       reserveAddress: "0x853d955acef822db058eb8505911ed77f175b99e",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xF651283543fB9D61A91f318b78385d187D300738",
//       reserveAddress: "0x2F7249cb599139e560f0c81c269Ab9b04799E453",
//     },
//   },
// });

// export const lusd = new StableBond({
//   name: "lusd",
//   displayName: "LUSD",
//   bondToken: "LUSD",
//   isAvailable: { [NetworkID.Mainnet]: false, [NetworkID.Testnet]: true },
//   bondIconSvg: LusdImg,
//   bondContractABI: LusdBondContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0x10C0f93f64e3C8D0a1b0f4B87d6155fd9e89D08D",
//       reserveAddress: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0x3aD02C4E4D1234590E87A1f9a73B8E0fd8CF8CCa",
//       reserveAddress: "0x45754dF05AA6305114004358eCf8D04FF3B84e26",
//     },
//   },
// });

// export const eth = new CustomBond({
//   name: "eth",
//   displayName: "wETH",
//   lpUrl: "",
//   bondType: BondType.StableAsset,
//   bondToken: "wETH",
//   isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
//   bondIconSvg: wETHImg,
//   bondContractABI: EthBondContract,
//   reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xE6295201CD1ff13CeD5f063a5421c39A1D236F1c",
//       reserveAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0xca7b90f8158A4FAA606952c023596EE6d322bcf0",
//       reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
//     },
//   },
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     const ethBondContract = this.getContractForBond(networkID, provider);
//     let ethPrice: BigNumberish = await ethBondContract.assetPrice();
//     ethPrice = Number(ethPrice.toString()) / Math.pow(10, 8);
//     const token = this.getContractForReserve(networkID, provider);
//     let ethAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//     ethAmount = Number(ethAmount.toString()) / Math.pow(10, 18);
//     return ethAmount * ethPrice;
//   },
// });

export const guru_dai = new LPBond({
  name: "guru_dai_lp",
  displayName: "OX-BUSD LP",
  bondToken: "DAI",
  isAvailable: { [NetworkID.Mumbai]: true, [NetworkID.Polygon]: true },
  bondIconSvg: GuruDaiImg,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.Mumbai]: {
      bondAddress: "0x695e445610c2dad7fb166acae7636a3b29936364",
      reserveAddress: "0xf86868748f973322e38152f75275777a34d8e3fd",
    },
    [NetworkID.Polygon]: {
      bondAddress: "0xbbA07bd5B20B63249398b831082ace6415afB7E0",
      reserveAddress: "0x7c9B16d845FE163F464d265193cC2B4eE3faC326",
    },
  },
  lpUrl:
    "https://pancakeswap.finance/swap",
});

// export const ohm_frax = new LPBond({
//   name: "ohm_frax_lp",
//   displayName: "OX-FRAX LP",
//   bondToken: "FRAX",
//   isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
//   bondIconSvg: OhmFraxImg,
//   bondContractABI: FraxOhmBondContract,
//   reserveContract: ReserveOhmFraxContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xc20CffF07076858a7e642E396180EC390E5A02f7",
//       reserveAddress: "0x2dce0dda1c2f98e0f171de8333c3c6fe1bbf4877",
//     },
//     [NetworkID.Testnet]: {
//       bondAddress: "0x7BB53Ef5088AEF2Bb073D9C01DCa3a1D484FD1d2",
//       reserveAddress: "0x11BE404d7853BDE29A3e73237c952EcDCbBA031E",
//     },
//   },
//   lpUrl:
//     "https://pancakeswap.finance",
// });

// export const ohm_lusd = new LPBond({
//   name: "ohm_lusd_lp",
//   displayName: "OHM-LUSD LP",
//   bondToken: "LUSD",
//   isAvailable: { [NetworkID.Mainnet]: false, [NetworkID.Testnet]: true },
//   bondIconSvg: GuruLusdImg,
//   bondContractABI: BondOhmLusdContract,
//   reserveContract: ReserveOhmLusdContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xFB1776299E7804DD8016303Df9c07a65c80F67b6",
//       reserveAddress: "0xfDf12D1F85b5082877A6E070524f50F6c84FAa6b",
//     },
//     [NetworkID.Testnet]: {
//       // NOTE (appleseed-lusd): using ohm-dai rinkeby contracts
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   lpUrl:
//     "https://pancakeswap.finance",
// });

// export const ohm_weth = new CustomBond({
//   name: "ohm_weth_lp",
//   displayName: "Guru-WETH LP",
//   bondToken: "WETH",
//   isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
//   bondIconSvg: GuruEthImg,
//   bondContractABI: BondOhmEthContract,
//   reserveContract: ReserveOhmEthContract,
//   networkAddrs: {
//     [NetworkID.Mainnet]: {
//       bondAddress: "0xB6C9dc843dEc44Aa305217c2BbC58B44438B6E16",
//       reserveAddress: "0xfffae4a0f4ac251f4705717cd24cadccc9f33e06",
//     },
//     [NetworkID.Testnet]: {
//       // NOTE (unbanksy): using ohm-dai rinkeby contracts
//       bondAddress: "0xcF449dA417cC36009a1C6FbA78918c31594B9377",
//       reserveAddress: "0x8D5a22Fb6A1840da602E56D1a260E56770e0bCE2",
//     },
//   },
//   bondType: BondType.LP,
//   lpUrl:
//     "https://pancakeswap.finance",
//   customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
//     if (networkID === NetworkID.Mainnet) {
//       const ethBondContract = this.getContractForBond(networkID, provider);
//       let ethPrice: BigNumberish = await ethBondContract.assetPrice();
//       ethPrice = Number(ethPrice.toString()) / Math.pow(10, 8);
//       const token = this.getContractForReserve(networkID, provider);
//       const tokenAddress = this.getAddressForReserve(networkID);
//       const bondCalculator = getBondCalculator(networkID, provider);
//       const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//       const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
//       const markdown = await bondCalculator.markdown(tokenAddress);
//       let tokenUSD =
//         (Number(valuation.toString()) / Math.pow(10, 9)) * (Number(markdown.toString()) / Math.pow(10, 18));
//       return tokenUSD * Number(ethPrice.toString());
//     } else {
//       // NOTE (appleseed): using OHM-DAI on rinkeby
//       const token = this.getContractForReserve(networkID, provider);
//       const tokenAddress = this.getAddressForReserve(networkID);
//       const bondCalculator = getBondCalculator(networkID, provider);
//       const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
//       const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
//       const markdown = await bondCalculator.markdown(tokenAddress);
//       let tokenUSD =
//         (Number(valuation.toString()) / Math.pow(10, 9)) * (Number(markdown.toString()) / Math.pow(10, 18));
//       return tokenUSD;
//     }
//   },
// });

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [dai, guru_dai];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;