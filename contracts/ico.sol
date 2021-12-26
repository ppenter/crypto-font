// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ERC20Interface {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function approve(address spender, uint tokens) external returns (bool success);
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function totalSupply() external view returns (uint);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

interface ICOInterface{

}

contract ICO {
    struct Sale {
        address investor;
        uint quantity;
    }
    mapping(address => bool) public investors;
    mapping(address => uint256) public sales;
    address public token;
    address public admin;
    uint public end;
    uint public price;
    uint public availableTokens;
    uint public minPurchase;
    uint public maxPurchase;
    bool public whitelistStatus = false;
    
    constructor() {
        admin = msg.sender;
    }
    
    function create(
        uint duration,
        address _token,
        uint _price,
        uint _availableTokens,
        uint _minPurchase,
        uint _maxPurchase,
        bool _whitelistStatus)
        external
        onlyAdmin() 
        icoNotActive() {
        require(duration > 0, 'duration should be > 0');
        uint totalSupply = ERC20Interface(_token).totalSupply();
        require(_availableTokens > 0 && _availableTokens <= totalSupply, 'totalSupply should be > 0 and <= totalSupply');
        require(_minPurchase > 0 && _minPurchase * _price <= _availableTokens, '_minPurchase should > 0');
        require(_maxPurchase > 0 && _maxPurchase >= _minPurchase, '_maxPurchase should be > 0 and <= _availableTokens');
        token = _token;
        ERC20Interface tokenInstance = ERC20Interface(token);
        tokenInstance.transferFrom(msg.sender,address(this), _availableTokens);
        end = duration + block.timestamp; 
        whitelistStatus = _whitelistStatus;
        price = _price;
        availableTokens = _availableTokens;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
    }
    
    function whitelist(address investor)
        external
        onlyAdmin() {
        investors[investor] = true;    
    }

    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    
    function buy()
        payable
        external
        onlyInvestors()
        icoActive() {
        require(msg.value >= minPurchase && msg.value <= maxPurchase, 'have to send between minPurchase and maxPurchase');
        uint quantity = price * msg.value;
        require(quantity <= availableTokens, 'Not enough tokens left for sale');
        sales[msg.sender] += quantity;
        availableTokens -= quantity;
    }
    
    function claim()
        external
        icoEnded()
        {
        ERC20Interface tokenInstance = ERC20Interface(token);
        tokenInstance.transfer(msg.sender, sales[msg.sender]);
    }

    function stop() public
        icoEnded()
        onlyAdmin()
        {
            end = 0;
        }
    
    function withdraw(
        address payable to,
        uint amount)
        external
        onlyAdmin()
        icoEnded()
        {
        to.transfer(amount);
        ERC20Interface tokenInstance = ERC20Interface(token);
        tokenInstance.transfer(to, tokenInstance.balanceOf(address(this)));
    }
    
    modifier icoActive() {
        require(end > 0 && block.timestamp < end && availableTokens > 0, "ICO must be active");
        _;
    }
    
    modifier icoNotActive() {
        require(end == 0, 'ICO should not be active');
        _;
    }
    
    modifier icoEnded() {
        require(end > 0 && (block.timestamp >= end || availableTokens <= minPurchase * price), 'ICO must have ended');
        _;
    }
    
    modifier onlyInvestors() {
        require(whitelistStatus == false || investors[msg.sender] == true, 'only investors');
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }
    
}