// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


error Ecommerce__YouAreNoteOwner();
contract Ecommerce {
    /* Events */
    event productAdded (
        string indexed _category,
        address indexed productAddress,
        uint256 indexed _timestamp,
        uint256 price,
        string metadataUrl
    );

    /* Modifiers */
    modifier onlyOwner () {
        if(msg.sender != address(this)){
            revert Ecommerce__YouAreNoteOwner();
        }
        _;
    }

    /* Logics */

    function addProduct (uint256 _price, uint32 _quantity, string memory _metadata, string memory _category) external onlyOwner {
         Product newProduct = new Product(
            _price,
            _quantity,
            _metadata
        );
        emit productAdded(_category, address(newProduct), block.timestamp, _price, _metadata);

    }        
}


contract Product {

    error Product__PriceNotMet(uint256 _price);
    /* State Variables */
    struct ProductStruct {
        uint256 price;
        uint32 quantity;
        string metadata;
    }

    /* events */
    event productBought(address indexed buyer, uint256 indexed timestamp, uint256 price);

    ProductStruct newProduct;

    constructor(
        uint256 _price,
        uint32 _quantity,
        string memory _metadata
    ) {
        newProduct = ProductStruct(
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

    function buyProduct() external payable {
        if(msg.value != newProduct.price){
            revert Product__PriceNotMet(msg.value);
        }

        emit productBought(msg.sender, block.timestamp, msg.value);
    }
}