# NFT Marketplace

[Previous content remains the same until the code block]

### Frontend Architecture
```solidity
// Smart Contract Interface
interface IERC721 {
  function mint(address to, uint256 tokenId) external;
  function transferFrom(address from, address to, uint256 tokenId) external;
  function approve(address to, uint256 tokenId) external;
}

// Marketplace Contract
contract NFTMarketplace {
  struct Listing {
    address seller;
    uint256 price;
    bool isActive;
  }
  
  mapping(uint256 => Listing) public listings;
  
  function listNFT(uint256 tokenId, uint256 price) external {
    // Listing logic
  }
  
  function buyNFT(uint256 tokenId) external payable {
    // Purchase logic
  }
}
```

[Rest of the content remains the same]