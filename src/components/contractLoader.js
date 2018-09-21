import React from 'react';
import Web3 from 'web3';

class contractLoader extends React.Component {
  constructor() {
    super();

    this.state = {
      result : []
    };
  }

  //async reader()
  componentWillMount() {
    const ABI = [{ "constant": true, "inputs": [], "name": "GSCCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCHistory", "outputs": [{ "name": "history", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "GSCList", "outputs": [{ "name": "mainWallet", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "deposit", "type": "uint256" }, { "name": "Gchain_all", "type": "uint256" }, { "name": "status", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "verify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCRatio", "outputs": [{ "name": "ratio", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "pay", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCAddr", "outputs": [{ "name": "Gchain", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "Gchain", "type": "address[]" }, { "name": "value", "type": "uint256" }, { "name": "ratio", "type": "uint256[]" }], "name": "createGSC", "outputs": [{ "name": "GSCID", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "abort", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCTimestamp", "outputs": [{ "name": "timestamp", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [], "name": "aborted", "type": "event" }, { "anonymous": false, "inputs": [], "name": "purchaseConfirmed", "type": "event" }, { "anonymous": false, "inputs": [], "name": "paymentDone", "type": "event" }];
    const Addr = "0xE8720CB8b80ffb4D93BeE736C624dc547603fc49";
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(ABI, Addr);
    const testList = [
      {
        func : "getGSCRatio",
        param : [1]
      },
      {
        func : "getGSCTimestamp",
        param : [1]
      },
      {
        func : "getGSCAddr",
        param : [1]
      },
      {
        func : "getGSCRatio",
        param : [8]
      },
    ];
    let testResult = [];

    const resultUpdater = (result) => {
      testResult.push(result);
      this.setState({result : testResult});
    }

    testList.forEach(async (test) => {
      eval("contract.methods." + test.func + "(test.param[0]).call().then((result) => {resultUpdater(result)})");
    });
  }

  render() {
    return (
      <div>
        <h2>Func1 Result : {this.state.result[0]}</h2>
        <h2>Func2 Result : {this.state.result[1]}</h2>
        <h2>Func3 Result : {this.state.result[2]}</h2>
        <h2>Func4 Result : {this.state.result[3]}</h2>
      </div>
    );
  }

}

export default contractLoader;