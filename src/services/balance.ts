import numeral from 'numeral';
import Big from 'big.js';
import { BigNumber } from '@ethersproject/bignumber';
import { toCSPR, toMotes } from './currency';
import type { TypeMote } from './types';
/**
 * Convert mote balance from hex to display balance.
 * @param {String} balanceHex - Balance hex.
 * @return {Float} Balance in float.
 */

export const getNumberValueFromHex = (balanceHex: string): TypeMote => {
  try {
    return BigNumber.from(balanceHex).toNumber();
  } catch (err: any) {
    return 0;
  }
};

export const convertBalanceFromHex = (balanceHex: string): TypeMote => {
  return getNumberValueFromHex(balanceHex);
};

/**
 * Given a balance in Mote, return the balance in CSPR
 * @param balance - The balance of the account in Mote.
 * @returns The balance in CSPR.
 */
export const moteToCspr = (balance: number): number => {
  if (balance === undefined || balance === null) {
    return 0;
  }

  const value = toCSPR(balance);
  return value.toNumber();
};

/**
 * Given a balance in CSPR, return the balance in MOTE
 * @param balance - The balance of the account in CSPR.
 * @returns The balance in Mote.
 */
export const csprToMote = (balance: number): TypeMote => {
  if (balance === undefined || balance === null) {
    return 0;
  }

  const value = toMotes(balance);
  return value.toNumber();
};

export const formatCSPR = (balance: any, formatter = '0,0[.]00[a]') =>
  numeral(balance).format(formatter);

export const formatCSPRFull = (balance: any, formatter = '0,0[.]00[000]') =>
  formatCSPR(moteToCspr(balance), formatter);

export const calculateMaximumStakingValue = (
  balance: number,
  delegateFee: number,
) => {
  try {
    const balanceValue = Big(balance);
    const networkFee = Big(delegateFee);
    if (balanceValue.lt(networkFee)) {
      throw new Error('Invalid param');
    }

    return balanceValue.minus(networkFee).toNumber();
  } catch (err: any) {
    return 0;
  }
};
