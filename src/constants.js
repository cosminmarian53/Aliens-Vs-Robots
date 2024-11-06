import Web3 from "web3";
import BitBlop from "./contracts/BitBlop.json";
import BloodforgeBot from "./contracts/BloodforgeBot.json";
import CyberAlien from "./contracts/CyberAlien.json";
import GeneralXeno from "./contracts/GeneralXeno.json";

const web3 = new Web3(window.ethereum);

export const bitBlopContract = new web3.eth.Contract(
  BitBlop.abi,
  "0x6751c0b42e3460CD1321e007B02043818B015b49"
);

export const bloodforgeBotContract = new web3.eth.Contract(
  BloodforgeBot.abi,
  "0xD2242Ab7af56e78caC5dA82Aa44b65cdae670767"
);

export const cyberAlienContract = new web3.eth.Contract(
  CyberAlien.abi,
  "0x3a4459A7e8040552D3E554399554C1c784Af97D4"
);

export const generalXenoContract = new web3.eth.Contract(
  GeneralXeno.abi,
  "0xB611c5704763212A10d2e00a2c6199de378f204e"
);
