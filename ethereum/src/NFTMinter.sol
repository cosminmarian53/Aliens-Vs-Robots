// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721, Ownable {
    uint256 public tokenCounter;
    mapping(address => uint256) public playerFinishCount;

    constructor() ERC721("NFTMinter", "NFTM") {
        tokenCounter = 0;
    }

    function finishGame(address player) public onlyOwner {
        playerFinishCount[player] += 1;
    }

    function mintNFT(address recipient) public returns (uint256) {
        require(playerFinishCount[recipient] > 0, "Player has not finished the game");

        uint256 newItemId = tokenCounter;
        string memory tokenURI = getTokenURI(playerFinishCount[recipient]);
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter += 1;
        return newItemId;
    }

    function getTokenURI(uint256 finishCount) internal pure returns (string memory) {
        if (finishCount == 1) {
            return "ipfs://Qm.../1"; // URI for the first NFT
        } else if (finishCount == 2) {
            return "ipfs://Qm.../2"; // URI for the second NFT
        } else if (finishCount == 3) {
            return "ipfs://Qm.../3"; // URI for the third NFT
        } else if (finishCount >= 4) {
            return "ipfs://Qm.../4"; // URI for the fourth NFT
        } else {
            return "";
        }
    }
}