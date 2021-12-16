// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract cryptoFont is ERC721Enumerable, Ownable  {
    uint256 COUNTER = 0;
    IERC20 public eBitcoin;
    uint256 public cost = 100 * 10**18;
    uint256 public fee = cost * 20 / 100;
    uint256 public feePool;
    uint256 public rewardPool;
    uint256 public miningPool;
    uint256 public pastDistributedReward;
    uint256 public distributedEthers;

    mapping(uint256 => uint256) public tokenToReward;
    mapping(uint256 => uint256) public tokenToEthers;

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
        pastDistributedReward = block.timestamp;
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
        uint8 randRarity = uint8(_createRandomNum(100)) + 1;
        uint256 randDna = _createRandomNum(10**16);
        uint256 randStat = _createRandomNum(10**16);
        uint16 randPower = uint16(_createRandomNum(10000) + 1);
        uint8 randSize = uint8(_createRandomNum(140) + 10);
        uint8 rarity = 1;
        uint256 mint_date = block.timestamp;

        if(randRarity < 41){
            rarity = 2;
            if(randRarity < 11){
                rarity = 3;
                if(rarity <2){
                    rarity = 4;
                }
            }
        }
        
        cFont memory newcFont = cFont(_name, COUNTER, randDna, rarity, randStat, randPower,randSize,mint_date,false);
        cFonts.push(newcFont);
        tokenToReward[COUNTER] = 0;
        _safeMint(msg.sender, COUNTER);
        emit NewcFont(msg.sender,COUNTER, randDna);
        COUNTER++;
    }

    function createRandomcFont() public{
        require(eBitcoin.balanceOf(msg.sender) >= cost);
        eBitcoin.transferFrom(msg.sender,address(this), cost);
        rewardPool+= (cost-fee);
        feePool+=fee;
        string memory name = concatenate("cFont #",uint2str(COUNTER));
        _createcFont(name);
    }

    function reverseSwap(uint256 id) public{
        require(ownerOf(id) == msg.sender);
        _burn(id);
        eBitcoin.transfer(msg.sender, (cost - fee));
        cFonts[id].burn = true;
    }

    function getcFonts() public view returns(cFont[] memory) {
        return cFonts;
    }

    function _getRarity(uint256 id) internal view returns(uint256){
        uint256 rarity = 0;
        if(!cFonts[id].burn){
                rarity=cFonts[id].rarity;
            }
            return rarity;
    }


    function countAllRarity() public view returns(uint256){
        uint256 rarity = 0;
        uint256 i;
        for (i=0;i<COUNTER;i++){
            rarity+=_getRarity(i);
        }
        
        return rarity;
    }

    function remainingEthers() public view returns(uint256){
        return address(this).balance - distributedEthers;
    }

    function DistributeReward() public{
        require(block.timestamp > pastDistributedReward);
        uint256 amount = feePool;

        if(miningPool > feePool){
            amount += feePool;
            miningPool -= feePool;
        }
        else{
            amount += miningPool;
            miningPool = 0;
        }

        uint256 reward = amount;
        uint256 allRare = countAllRarity();
        uint256 rewardPerRare =  reward / allRare;
        uint256 ethersPerRare = remainingEthers() / allRare;
        uint256 i;
        for(i=0; i<COUNTER;i++){
            tokenToReward[i] += rewardPerRare * _getRarity(i);
            tokenToEthers[i] += ethersPerRare * _getRarity(i);
        }

        distributedEthers += remainingEthers();
        feePool = 0;
        pastDistributedReward = block.timestamp;
    }

    function showEthers() public view returns(uint256){
        uint256 reward = 0;
        for(uint256 i =0; i< balanceOf(msg.sender); i++){
            reward += tokenToEthers[tokenOfOwnerByIndex(msg.sender, i)];
        }
        return reward;
    }

    function getEthers(uint id) public{
        require(msg.sender == ownerOf(id));
        payable(msg.sender).transfer(tokenToEthers[id]);
        tokenToEthers[id] = 0;
    }

    function getAllEthers() public{
        uint256 reward = 0;
        for(uint256 i = 0;i< balanceOf(msg.sender); i++){
            reward += tokenToEthers[tokenOfOwnerByIndex(msg.sender, i)];
            tokenToEthers[tokenOfOwnerByIndex(msg.sender, i)] = 0;
        }
        payable(msg.sender).transfer(reward);
    }

    receive() external payable {}

    function showReward() public view returns(uint256){
        uint256 reward = 0;
        for(uint256 i =0; i< balanceOf(msg.sender); i++){
            reward += tokenToReward[tokenOfOwnerByIndex(msg.sender, i)];
        }
        return reward;
    }

    function getReward(uint id) public{
        require(msg.sender == ownerOf(id));
        eBitcoin.transfer(msg.sender, tokenToReward[id]);
        tokenToReward[id] = 0;
    }

    function getAllReward() public{
        uint256 reward = 0;
        for(uint256 i = 0;i< balanceOf(msg.sender); i++){
            reward += tokenToReward[tokenOfOwnerByIndex(msg.sender, i)];
            tokenToReward[tokenOfOwnerByIndex(msg.sender, i)] = 0;
        }
        eBitcoin.transfer(msg.sender, reward);
    }

    function setName(string memory name, uint256 id) public {
        require(ownerOf(id) == msg.sender);
        require(bytes(name).length > 0);
        cFonts[id].name = name;
    }

    function getTimeRemain() public view returns(uint256){
        return (pastDistributedReward + 7 days) - block.timestamp;
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