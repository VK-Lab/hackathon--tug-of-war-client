import { useConnect, CasperDashConnector } from '@casperdash/usewallet';

const ConnectButton = () => {
  const { connect: connectWithCasperDash } = useConnect({
    connector: new CasperDashConnector(),
  });

  return (
    <button onClick={() => connectWithCasperDash()}>Connect Wallet</button>
  )
};

export default ConnectButton;