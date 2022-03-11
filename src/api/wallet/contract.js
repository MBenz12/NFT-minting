import axios from "axios";
import Web3 from "web3";
import contract_data from '../../contracts/compiled/collection.json';
import { uploadAssetMetaData } from "../pinata/mint";
import web3Modal, { getCurrentWalletAddress } from "./wallet";

const contract_address = '0x261F55a540e2B31E83fCef00558DeBdb76fEE1b9';
let provider;
export const mintAsset = (
  metaData,
) => new Promise(
  async (resolve, reject) => {
    try {      
      // if (web3Modal.cachedProvider) {
      //   provider = web3Modal.cachedProvider;
      // } else {
      //   provider = await web3Modal.connect();
      // }
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const current_address = await getCurrentWalletAddress();
      const contract = new web3.eth.Contract(contract_data.abi, contract_address);
      const tx = {
        from: current_address,
        to: contract_address,
        value: 0,
      }
      
      const res = await uploadAssetMetaData(metaData);
      console.log(res);
      // const metaData_uri = "ddd";
      await contract.methods.mint(res.metaData_uri).send(tx);
      return resolve({
        success: true,
        picture: res.image_uri,
      });
    } catch (error) {
      return reject({
        success: false,
        error: error
      });
    }
  } 
)

export const getNFTItems = async () => {
  provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const current_address = await getCurrentWalletAddress();
  const contract = new web3.eth.Contract(contract_data.abi, contract_address);
  // const tx = {
  //   from: current_address,
  //   to: contract_address,
  //   value: 0,
  // }
  const count = await contract.methods.balanceOf(current_address).call();
  const items = [];
  for (let i = 0; i < count; i++) {
    const itemUrl = await contract.methods.tokenURI(i).call();
    try {
      const res = await axios.get(itemUrl);
      items.push(res.data);
    } catch (error) {
    }   
  }
  return items;
}