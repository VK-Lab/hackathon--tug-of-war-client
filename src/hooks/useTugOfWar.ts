import { useCallback } from "react";
import { CLPublicKey, CasperClient, RuntimeArgs, Contracts, CLValueBuilder } from "casper-js-sdk";
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
        console.log(`🚀 ~ args:`, args)
        const runtimeArgs = RuntimeArgs.fromMap({
          option: CLValueBuilder.u8(args.option)
        });

        // Set contract before calling callEntryPoint
        console.log(`🚀 ~ contracService:`, contracService)
        contracService.contract.setContractHash(args.contract);

        // Build Merge deploy
        // const deploy = contracService.contract.callEntrypoint(
        //   'bet',
        //   runtimeArgs,
        //   CLPublicKey.fromHex(args.key),
        //   configs.CHAIN_NAME,
        //   String(args.paymentAmount),
        // );
        const casperClient = new CasperClient(configs.NODE_ADDRESS);
        const contractClient = new Contracts.Contract(casperClient);
        contractClient.setContractHash(configs.TOKEN_CONTRACT_HASH);
        const deploy = await contractClient.callEntrypoint(
          "bet",
          runtimeArgs,
          CLPublicKey.fromHex(args.key),
            configs.CHAIN_NAME,
            String(args.paymentAmount),
        )
        console.log(`🚀 ~ deploy:`, deploy)

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
      paymentAmount: String(csprToMote(13)),
      key: currentKey,
      option: side === SideOption.BULL ? 1 : 2
    };
    const deployResult = (await executeDeployWithoutPut(
      buildBettingSideDeploy(dataBet),
      currentKey,
      currentKey,
    )) as SignedDeployResult;

    if (!deployResult.signedDeploy) {
      console.log(`🚀 ~ onStart ~ deployResult:`, deployResult)
      return;
    }

    const { data } = await axios.post(API.startGame(currentKey, side), deployResult.signedDeploy);
    console.log(`🚀 ~ const{data}=awaitaxios.post ~ data:`, data)
  }, [buildBettingSideDeploy, currentKey, dispatch, executeDeployWithoutPut]);

  return {
    onStart,
    isDeploying, isError
  }
}

export default useTugOfWar;