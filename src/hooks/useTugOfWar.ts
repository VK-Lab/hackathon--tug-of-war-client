import { useCallback } from "react";
import { CLPublicKey, RuntimeArgs } from "casper-js-sdk";
import API from '../services/api';
import axios from '../services/axios';
import { useStore } from "../components/TugOfWar/TugOfWarGameContainer";
import { SideOption } from "../services/types";
import useConfirmDeploy from "../hooks/useConfirmDeploy";
import { SignedDeployResult } from "../services/types";
import configs from "../services/settings";
import { csprToMote } from "../services/balance";
import contracService from "../services/contractServices";

const useTugOfWar = () => {
  const [{ currentKey }, dispatch] = useStore();
  const { executeDeployWithoutPut, isDeploying, isError } = useConfirmDeploy();
  const buildBettingSideDeploy = useCallback(
    (args: any) => async () => {
      try {
        // TODO: build deploy
        const runtimeArgs = RuntimeArgs.fromMap({
          option: args.option
        });

        // Set contract before calling callEntryPoint
        contracService.contract.setContractHash(`hash-${args.contract}`);

        // Build Merge deploy
        const deploy = contracService.contract.callEntrypoint(
          'bet',
          runtimeArgs,
          CLPublicKey.fromHex(args.key),
          configs.CHAIN_NAME,
          String(args.paymentAmount),
        );

        return deploy;
      } catch (error: any) {
        console.log(`🚀 ~ onBuildDragonDropDeploy ~ error`, error);
        throw new Error(`Failed to create Dragon drop deploy.`);
      }
    },
    [],
  );

  const onStart = useCallback(async (side: SideOption) => {
    if (!currentKey) {
      console.log(">>> Missing public key");
      return;
    }

    dispatch({ type: "ENABLE_COUNTDOWN"});
    const dataBet = {
      contract: configs.TOKEN_CONTRACT_HASH,
      paymentAmount: String(csprToMote(30)),
      key: currentKey,
      option: side === SideOption.BULL ? "1" : "2"
    };
    const deployResult = (await executeDeployWithoutPut(
      buildBettingSideDeploy(dataBet),
      currentKey,
      currentKey,
    )) as SignedDeployResult;
    console.log(`🚀 ~ onStart ~ deployResult:`, deployResult)

    const { data } = await axios.post(API.startGame(currentKey, side));
    console.log(`🚀 ~ const{data}=awaitaxios.post ~ data:`, data)
  }, [buildBettingSideDeploy, currentKey, dispatch, executeDeployWithoutPut]);

  return {
    onStart,
    isDeploying, isError
  }
}

export default useTugOfWar;