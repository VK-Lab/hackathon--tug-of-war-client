import { useSign, useSignMessage } from '@casperdash/usewallet';

const useSigners = () => {
  const { signMessage, signMessageAsync } = useSignMessage();
  const { sign, signAsync } = useSign();

  return {
    signMessage,
    signMessageAsync,
    sign,
    signAsync,
  };
};

export default useSigners;
