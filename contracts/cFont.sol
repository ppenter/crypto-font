// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract cryptoFont is ERC721Enumerable, Ownable  {
    uint256 COUNTER = 0;
    IERC20 public eBitcoin;
    uint256 public cost = 200 * 10**18;
    uint256 public fee = cost * 10 / 100;

    struct cFont {
        string name;
        uint256 id;
        uint256 dna;
        uint8 rarity;
        uint256 Stat;
        uint16 Power;
        uint8 Size;
        uint256 mintDate;
    }

    cFont[] public cFonts;

    event NewcFont(address indexed owner, uint256 id, uint dna);

    function _createRandomNum(uint256 _mod) internal view returns(uint256){
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }

    constructor(address eBitcoinAddress)
        ERC721("Crypto Font", "cFont")
    {
        eBitcoin = IERC20(eBitcoinAddress);
        // phudleFee = PhudleFeeCollector(phudFeeAddress);
        // phudleReward = PhudleRewardPool(phudRewardAddress);
    }

    function uint2str(uint256 _i) internal pure returns (string memory str){
        if (_i == 0){
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0)
        {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0)
        {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        str = string(bstr);
    }

    function concatenate(string memory s1, string memory s2) internal pure returns (string memory) {
        return string(abi.encodePacked(s1, s2));
    }

    function _createcFont(string memory _name) internal{
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 randDna = _createRandomNum(10**16);
        uint256 randStat = _createRandomNum(10**16);
        uint16 randPower = uint16(_createRandomNum(10000) + 1);
        uint8 randSize = uint8(_createRandomNum(140) + 10);
        uint256 mint_date = block.timestamp;
        
        cFont memory newcFont = cFont(_name, COUNTER, randDna, randRarity, randStat, randPower,randSize,mint_date);
        cFonts.push(newcFont);
        _safeMint(msg.sender, COUNTER);
        emit NewcFont(msg.sender,COUNTER, randDna);
        COUNTER++;
    }

    function createRandomcFont() public{
        require(eBitcoin.balanceOf(msg.sender) >= cost);
        eBitcoin.transferFrom(msg.sender,address(this), 200 * 10 ** 18);
        string memory name = concatenate("cFont #",uint2str(COUNTER));
        _createcFont(name);
    }

    function getcFont() public view returns(cFont[] memory) {
        return cFonts;
    }


    function getIdsOfOwner(address _owner) public view returns (uint[] memory) {
        uint[] memory _tokensOfOwner = new uint[](ERC721.balanceOf(_owner));
        uint i;

        for (i=0;i<ERC721.balanceOf(_owner);i++){
            _tokensOfOwner[i] = ERC721Enumerable.tokenOfOwnerByIndex(_owner, i);
        }
        return (_tokensOfOwner);
    }
}