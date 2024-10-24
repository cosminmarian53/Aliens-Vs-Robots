// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {AvRSNFTMinter} from "../src/AvRNFTMinter.sol";
import {console} from "forge-std/console.sol";

contract DeployAvRNFTMinter is Script {
    function run() external {
        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy the contract
        AvRSNFTMinter nftMinter = new AvRSNFTMinter();

        // Stop broadcasting transactions
        vm.stopBroadcast();

        // Log the contract address
        console.log("Contract deployed to address:", address(nftMinter));
    }
}
