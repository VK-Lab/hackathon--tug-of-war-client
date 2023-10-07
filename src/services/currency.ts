import Big from 'big.js';
import configs from "./settings"

/**
 * /**
 * Conver CSPR to Motes.
 *
 * Inpsired from toWie implementation (https://github.com/ethjs/ethjs-unit/blob/master/src/index.js#L119)
 * It will convert to String number | number to Big Number (We use big.js to cover the float numbers).
 * After that multiple with mote rate 10⁸
 *
 * @param {Number|String} amount
 * @returns {BigNumberis|String} Return "-" if it's the invalid big number input.
 */
export const toMotes = (amount) => {
  try {
    Big.RM = 0;
    return Big(amount).times(configs.MOTE_RATE).round(5);
  } catch (error) {
    return '-';
  }
};

/**
 * Convert motes to CSPR
 *
 * @param {Number|String} amount
 * @returns {BigNumberis|String} Return "-" if it's the invalid big number input.
 */
export const toCSPR = (amount) => {
  try {
    Big.RM = 0;
    return Big(amount).div(configs.MOTE_RATE).round(5);
  } catch (error) {
    return '-';
  }
};
