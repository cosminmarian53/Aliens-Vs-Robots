// Layout of the contract file:
// version
// imports
// errors
// interfaces, libraries, contract
// Inside Contract:
// Type declarations
// State variables
// Events
// Modifiers
// Functions
// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions

// external & public view & pure functions
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title AvRSNFTMinter
 * @author cosminmarian53
 * @dev AvRSNFTMinter contract is used to mint NFTs for AvR(Aliens vs Robots)
 * @notice This contract is used to mint NFTs for AvR(Aliens vs Robots)
 */

// Contract implementation
contract AvRSNFTMinter is ERC721URIStorage {
    // Type declarations
    // State variables
    uint256 public s_timesGamesFinished = 0;
    uint256 private s_tokenIds;

    // Events
    // Modifiers
    // <-------Functions layout------->
    // constructor
    constructor() ERC721("MyNFT", "NFT") {}

    // receive function (if exists)
    // fallback function (if exists)
    // external
    // public
    // internal
    // private
    // internal & private view & pure functions

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public returns (uint256) {
        s_tokenIds++;
        s_timesGamesFinished++;

        uint256 newItemId = s_tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
