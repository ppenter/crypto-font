// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./ebitcoin.sol";

contract Market {
	enum ListingStatus {
		Active,
		Sold,
		Cancelled
	}

	struct Listing {
		uint256 listingId;
		ListingStatus status;
		address seller;
		address token;
		uint256 tokenId;
		uint256 price;
		uint256 timestamp;
	}

	event Listed(
		uint256 listingId,
		address seller,
		address token,
		uint256 tokenId,
		uint256 price,
		uint256 timestamp
	);

	event Sale(
		uint256 listingId,
		address buyer,
		address token,
		uint256 tokenId,
		uint256 price,
		uint256 timestamp
	);

	event Cancel(
		uint256 listingId,
		address seller,
		uint256 timestamp
	);

	

	uint256 private _listingId = 0;
	mapping(uint256 => Listing) private _listings;
	IERC20 eBTC;

	constructor(address eBTCAddress){
		eBTC = IERC20(eBTCAddress);
	}

	function listToken(address token, uint256 tokenId, uint256 price) external {
		require(price > 0);
		IERC721(token).transferFrom(msg.sender, address(this), tokenId);

		_listingId++;

		Listing memory listing = Listing(
			_listingId,
			ListingStatus.Active,
			msg.sender,
			token,
			tokenId,
			price,
			block.timestamp
		);

		

		_listings[_listingId] = listing;

		emit Listed(
			_listingId,
			msg.sender,
			token,
			tokenId,
			price,
			block.timestamp
		);

		
	}

	function getListing(uint256 listingId) public view returns (Listing memory) {
		return _listings[listingId];
	}

	function buyToken(uint256 listingId) external{
		Listing storage listing = _listings[listingId];

		require(msg.sender != listing.seller, "Seller cannot be buyer");
		require(listing.status == ListingStatus.Active, "Listing is not active");

		require(eBTC.balanceOf(msg.sender) >= listing.price, "Insufficient payment");

		listing.status = ListingStatus.Sold;

		IERC721(listing.token).transferFrom(address(this), msg.sender, listing.tokenId);
		eBTC.transferFrom(msg.sender, address(this), listing.price);
		eBTC.transfer(listing.seller, listing.price);
		// payable(listing.seller).transfer(listing.price);

		emit Sale(
			listingId,
			msg.sender,
			listing.token,
			listing.tokenId,
			listing.price,
			block.timestamp
		);
	}

	function cancel(uint256 listingId) public {
		Listing storage listing = _listings[listingId];

		require(msg.sender == listing.seller, "Only seller can cancel listing");
		require(listing.status == ListingStatus.Active, "Listing is not active");

		listing.status = ListingStatus.Cancelled;
	
		IERC721(listing.token).transferFrom(address(this), msg.sender, listing.tokenId);

		emit Cancel(listingId, listing.seller, block.timestamp);
	}

	struct TokenActive{
		address token;
		uint256 tokenId;
		uint256 price;
	}

	function countActiveListing() public view returns (uint256){
		uint256 counter = 0;
		for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.status == ListingStatus.Active){
				counter++;
			}
        }
		return counter;
	}

	function countActiveListingOfContract(address token) public view returns (uint256){
		uint256 counter = 0;
		for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.token == token){
				if(listing.status == ListingStatus.Active){
				counter++;
				}
			}
        }
		return counter;
	}

	function getActiveListing() public view returns(uint256[] memory){
		uint256 number = countActiveListing();
		uint  counter2 = 0;
		uint256[] memory memoryArray = new uint256[](number);
		for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.status == ListingStatus.Active){
				memoryArray[counter2] = _listings[i+1].listingId;
				counter2++;
			}
        }
		return memoryArray;
	}

	function getActiveListingOfContract(address token) public view returns (uint256[] memory) {
		uint256 number = countActiveListingOfContract(token);
		uint256 counter2 = 0;
        uint256[] memory memoryArray = new uint256[](number);
        for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.status == ListingStatus.Active){
				if(listing.token == token){
					memoryArray[counter2] = _listings[i+1].listingId;
					counter2++;
				}
			}
        }
        return memoryArray;
    }

	function getActiveArrayOfContract(address token) public view returns (Listing[] memory) {
		uint256 number = countActiveListingOfContract(token);
		uint256 counter2 = 0;
        Listing[] memory memoryArray = new Listing[](number);
        for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.status == ListingStatus.Active){
				if(listing.token == token){
					memoryArray[counter2] = _listings[i+1];
					counter2++;
				}
			}
        }
        return memoryArray;
    }

	function getOnsaleOfToken(address token) public view returns (uint256[] memory){
		uint256 counter = countActiveListingOfContract(token);
		
		uint256[] memory memoryArray = new uint256[](counter);
		if(counter>0){
			uint256 counter2 = 0;
			for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.status == ListingStatus.Active){
				if(listing.token == token){
					memoryArray[counter2] = listing.tokenId;
					counter2++;
				}
			}
        	}
		}
		return memoryArray;
	}

	function getPriceOfId(address token, uint256 tokenId) public view returns(uint256){
		uint price = 0;
		uint256[] memory activeListingId = getActiveListingOfContract(token);
		for(uint256 i = 0; i < activeListingId.length; i++) {
			Listing storage listing = _listings[activeListingId[i]];
			if(listing.tokenId == tokenId){
				price = listing.price;
			}
        }
		return price;
	}

	function getAllListing() public view returns (Listing[] memory) {
        Listing[] memory memoryArray = new Listing[](_listingId);
        for(uint256 i = 0; i < _listingId; i++) {
            memoryArray[i] = _listings[i+1];
        }
        return memoryArray;
    }

	function isTokenIdOnSale(address token, uint256 tokenId)public view returns (bool) {
		for(uint256 i = 0; i < _listingId; i++) {
			Listing storage listing = _listings[i+1];
			if(listing.status == ListingStatus.Active){
				if(listing.token == token){
					if(listing.tokenId == tokenId){
						return true;
					}
				}
			}
        }
		return false;
	}

}