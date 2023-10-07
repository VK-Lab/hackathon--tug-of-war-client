import { useCallback } from "react";
import API from '../services/api';
import axios from '../services/axios';
import { useStore } from "../components/TugOfWar/TugOfWarGameContainer";
import { SideOption } from "../services/types";

const useTugOfWar = () => {
  const [{ currentKey }, dispatch] = useStore();
  console.log(`🚀 ~ useTugOfWar ~ currentKey:`, currentKey)
  
  const onStart = async (side: SideOption) => {
    if (!currentKey) {
      console.log(">>> Missing public key");
      return;
    }
    dispatch({ type: "ENABLE_COUNTDOWN"});
    const { data } = await axios.post(API.startGame(currentKey, side));
    console.log(`🚀 ~ const{data}=awaitaxios.post ~ data:`, data)
  };

  return {
    onStart,
  }
}

export default useTugOfWar;