import React, { useReducer, useMemo, useContext, useCallback } from "react";
type TugOfWarGameContext = [
  {
    currentKey: string | null,
    isStarted: boolean,

    // selectedCellId: string | null,
    // dataDrawer: {
    //   schedules: Array<any>,
    //   checklists: Array<any>,
    //   date: string,
    //   equipmentName: string
    // },
    // onCellClick: (...args: any[]) => void,
    // onClearActiveCell: () => void
  },
  React.Dispatch<any>
];
const TugOfWarGameContext = React.createContext<TugOfWarGameContext>({});
const initialState = {
  currentKey: null,
  isStarted: false
};
export const reducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case "SET_WALLET_KEY": {
      return {
        ...state,
        currentKey: payload
      };
    }
    case "ENABLE_COUNTDOWN": {
      return {
        ...state,
        isStarted: true
      };
    }
    case "DISABLE_COUNTDOWN": {
      return {
        ...state,
        isStarted: false
      };
    }
    default:
      return state;
  }
};

const TugOfWarGameContainer = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const value = useMemo(() => ([
    {
      ...state,
    },
    dispatch
  ]), [state]) as TugOfWarGameContext;
  return (
    <TugOfWarGameContext.Provider value={value}>
      {children}
    </TugOfWarGameContext.Provider>
  );
};
export const { Consumer: AssetCalendarConsumer } = TugOfWarGameContext;
export const useStore = () => {
  const contextValue = useContext(TugOfWarGameContext);
  return contextValue;
};
export default TugOfWarGameContainer;
