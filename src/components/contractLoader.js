import React from 'react';
import Web3 from 'web3';

class contractLoader extends React.Component {
  constructor() {
    super();

    this.state = {
      test : [],
      result : []
    };
  }

  //async reader()
  componentWillMount() {
    const ABI = [{ "constant": true, "inputs": [], "name": "GSCCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCHistory", "outputs": [{ "name": "history", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "GSCList", "outputs": [{ "name": "mainWallet", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "deposit", "type": "uint256" }, { "name": "Gchain_all", "type": "uint256" }, { "name": "status", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "verify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCRatio", "outputs": [{ "name": "ratio", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "pay", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCAddr", "outputs": [{ "name": "Gchain", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "Gchain", "type": "address[]" }, { "name": "value", "type": "uint256" }, { "name": "ratio", "type": "uint256[]" }], "name": "createGSC", "outputs": [{ "name": "GSCID", "type": "uint256" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "abort", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "GSCID", "type": "uint256" }], "name": "getGSCTimestamp", "outputs": [{ "name": "timestamp", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [], "name": "aborted", "type": "event" }, { "anonymous": false, "inputs": [], "name": "purchaseConfirmed", "type": "event" }, { "anonymous": false, "inputs": [], "name": "paymentDone", "type": "event" }];
    const Addr = "0xE8720CB8b80ffb4D93BeE736C624dc547603fc49";
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(ABI, Addr);
    const testList = [];

    for(let i = 0; i<20; i++) {
      testList.push({
        type : "CALLFUNC",
        func : "getGSCRatio",
        param : [i]
      });
      testList.push({
        type : "CALLFUNC",
        func : "getGSCHistory",
        param : [i]
      });
      testList.push({
        type : "CALLFUNC",
        func : "getGSCTimestamp",
        param : [i]
      });
      testList.push({
        type : "CALLFUNC",
        func : "getGSCAddr",
        param : [i]
      });
    }
    
    testList.push({
      //type : "SENDFUNC",
      func : "pay",
      param : [0]
    });

    let testResult = [];

    const resultUpdater = (result) => {
      testResult.push(result);
      console.log(result);
      this.setState({test : testList, result : testResult});
    }

    ABI.forEach((content) => {
      if(content.type !== "event") console.log(content.name);
    })

    testList.forEach((test) => {
      const sendParam = {
        from: '0x8CAd9B4941aAfb67b5A5e6DeA657Db2d4ea7b757',
        to: Addr,
        value: 0 //web3.utils.toWei('0.01', 'ether')
      }
      if(test.type === "CALLFUNC") eval("contract.methods." + test.func + "(test.param[0]).call().then((result) => {resultUpdater(result)})");
      if(test.type === "SENDFUNC") eval("contract.methods." + test.func + "(test.param[0]).send(sendParam).then((result) => {resultUpdater(result)})")
    });
  }

  render() {
    let page = "<table border='1'><tr><th>Function/Member</th><th>Param</th><th>Result</th></tr>";
    
    let i = 0;
    this.state.result.forEach((result) => {
      page += `<tr><td>${this.state.test[i].func}</td><td>${this.state.test[i].param}</td><td>${this.state.result[i]}</td></tr>`;
      i++;
    });

    return (
      <div dangerouslySetInnerHTML={{__html: page}}></div>
    );
  }
}

export default contractLoader;