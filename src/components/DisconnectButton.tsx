import { useDisconnect } from '@casperdash/usewallet';

const DisconnectButton = ({ dispatch } : any) => {
  const { disconnectAsync } = useDisconnect({
    onSuccess: () => {
      dispatch({
        type: "SET_WALLET_KEY",
        payload: null
      });
    },
  });

  return (
    <button onClick={async () => await disconnectAsync()}>Disconnect</button>
  )
};

export default DisconnectButton;