// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface icFont is IERC721Enumerable{
    
    

    struct cFont {
        string name;
        uint256 id;
        uint256 dna;
        uint8 rarity;
        uint256 Stat;
        uint16 Power;
        uint8 Size;
        uint256 mintDate;
        bool burn;
    }

    function createRandomcFont() external;
    function reverseSwap(uint256 id) external;
    function getcFonts() external view returns(cFont[] memory);
    function countAllRarity() external view returns(uint256);
    function countAllReward() external view returns(uint256);
    function countAllEthers() external view returns(uint256);
    function remainingEthers() external view returns(uint256);
    function remainingeBTC() external view returns(uint256);
    function DistributeReward() external;
    function showEthers(address account) external view returns(uint256);
    function getEthers(uint id) external;
    function getAllEthers() external;
    function showReward(address account) external view returns(uint256);
    function getReward(uint id) external;
    function getAllReward() external;
    function setName(string memory name, uint256 id) external;
    function getTimeRemain() external view returns(uint256);
    function AddeBTCFee(uint256 _amount) external;
    function getIdsOfOwner(address _owner) external view returns (uint[] memory);
}