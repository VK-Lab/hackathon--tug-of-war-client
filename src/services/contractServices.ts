import {
  CasperClient,
  Contracts,
} from 'casper-js-sdk';
import configs from './settings';

class ContractService {
  public client: CasperClient;
  private _contract: Contracts.Contract;

  constructor() {
    this.client = new CasperClient(configs.NODE_ADDRESS);
    this._contract = new Contracts.Contract(this.client);
  }

  get contract() {
    return this._contract;
  }
}

const contracService = new ContractService();

export default contracService;
