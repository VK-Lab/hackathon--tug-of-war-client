import { useAccount } from '@casperdash/usewallet';
import type { Account } from '@casperdash/usewallet';
import { useStore } from '../components/TugOfWar/TugOfWarGameContainer';

const useAccountWallet = () => {
  const [_, dispatch] = useStore();
  const { publicKey } = useAccount({
    onConnect: (account: Account) => {
      if (account.connector?.id) {
        dispatch({
          type: "SET_WALLET_KEY",
          payload: account.publicKey
        })
      }
    },
    onChange: (account: Account) => {

    },
  });

  return {
    publicKey,
  };
};

export default useAccountWallet;
