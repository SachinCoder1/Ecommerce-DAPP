// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Product {

    error Product__PriceNotMet(uint256 _price);
    /* State Variables */
    struct ProductStruct {
        uint256 _productId;
        uint256 price;
        uint32 quantity;
        string metadata;
    }

    /* events */
    event productBought(address indexed buyer, uint256 indexed timestamp, uint256 price);

    ProductStruct newProduct;

    constructor(
        uint256 _productId,
        uint256 _price,
        uint32 _quantity,
        string memory _metadata
    ) {
        newProduct = ProductStruct(
            _productId,
            _price,
            _quantity,
            _metadata
        );
    }

    /* Getter Functions */
    function getProduct() external view returns (ProductStruct memory) {
        return newProduct;
    }

    function updateQuantity(uint32 _quantity) external {
        newProduct.quantity = _quantity;
    }

    
}