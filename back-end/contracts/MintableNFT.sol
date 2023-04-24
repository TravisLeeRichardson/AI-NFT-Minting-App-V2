// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MintableNFT is ERC721URIStorage, ERC721Enumerable, Ownable {
    uint256 private constant MAX_SUPPLY = 10;
    uint256 private constant MINT_PRICE = 0.1 ether;

    uint256 private _tokenIdCounter = 0;

    constructor() ERC721("MintableNFT", "MNFT") {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal virtual override(ERC721, ERC721Enumerable)  {
        super._beforeTokenTransfer(from, to, tokenId, batchSize = 1);
   }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function mintNFT(string memory tokenURI) public payable {
        require(_tokenIdCounter < MAX_SUPPLY, "MintableNFT: Maximum supply reached");
        require (msg.value == MINT_PRICE, "MintableNFT: Incorrect payment amount");

        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
    }


    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view virtual override(ERC721Enumerable) returns (uint256) {
        return ERC721Enumerable.tokenOfOwnerByIndex(owner, index);
    }

    function totalSupply() public view virtual override(ERC721Enumerable) returns (uint256) {
        return ERC721Enumerable.totalSupply();
    }


}
