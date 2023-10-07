import { useState } from 'react';
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
// import { useAppDispatch as useDispatch } from '@/app/hooks';
// import { putDeploy } from '@/modules/CasperSigner/actions';
import useSigners from './useSigners';
import { DeployUtil } from 'casper-js-sdk';

//This hook is using for toasting message during deploy progress
const useConfirmDeploy = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isError, setDeployError] = useState(false);

  // const dispatch = useDispatch();
  const { signAsync } = useSigners();

  // const putSignedDeploy = async (signedDeploy) => {
  //   retrun signedDeploy;
  //   // const { deployHash } = await dispatch(putDeploy(signedDeploy)).unwrap();
  //   // return deployHash;
  // };

  const executeDeployWithoutPut = async (
    buildDeployFn: any,
    fromPublicKey: string,
    toPublicKey: string,
  ) => {
    setIsDeploying(true);
    const toastId = toast.loading('Preparing deploy');
    try {
      const deploy = await buildDeployFn();

      // Sign with signer
      toast.update(toastId, {
        render: 'Transaction submitted. Awaiting your approval',
      });

      const signedDeploy = await signAsync({
        deploy: DeployUtil.deployToJson(deploy),
        signingPublicKeyHex: fromPublicKey,
        targetPublicKeyHex: toPublicKey,
      });

      if (!signedDeploy) {
        throw new Error('User has cancelled');
      }

      toast.update(toastId, {
        render: `Deploy signed`,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
      setIsDeploying(false);
      return { deployHash: signedDeploy?.deploy?.hash, signedDeploy };
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
      setDeployError(true);
      setIsDeploying(false);
      return {};
    }
  };

  const executeDeploy = async () => {
    
  };

  return { executeDeployWithoutPut, executeDeploy, isDeploying, isError };
};

export default useConfirmDeploy;
