// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

error Ecommerce__YouAreNoteOwner();
error Ecommerce__PriceNotMet(uint256 _price);

contract Ecommerce {
    /* State Variables */
    uint256 private productId;
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    /* structs */
    struct ProductStruct {
        uint256 price;
        uint32 quantity;
        string metadata;
    }
    /* Events */

    // After Adding the product
    event productAdded(
        string indexed _category,
        uint256 indexed _timestamp,
        uint256 indexed _productId,
        uint256 _price,
        string _metadata
    );

    // After buying the product
    event productBought(
        address indexed buyer,
        uint256 indexed timestamp,
        uint256 _productId,
        uint256 price,
        string metadata
    );

    /* Modifiers */
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert Ecommerce__YouAreNoteOwner();
        }
        _;
    }

    /* Mappings */
    mapping(uint256 => ProductStruct) s_AllProducts;

    /* Logics */

    function addProduct(
        uint256 _price,
        uint32 _quantity,
        string memory _metadata,
        string memory _category
    ) external onlyOwner {
        productId++;
        s_AllProducts[productId] = ProductStruct(_price, _quantity, _metadata);
        emit productAdded(
            _category,
            block.timestamp,
            productId,
            _price,
            _metadata
        );
    }

    function getProduct(uint256 _productId)
        external
        view
        returns (ProductStruct memory)
    {
        return s_AllProducts[_productId];
    }

    // Get the total contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function updateQuantity(uint32 _quantity, uint256 _productId) external {
        s_AllProducts[_productId].quantity = _quantity;
    }

    function buyProduct(uint256 _productId) external payable {
        if (msg.value != s_AllProducts[_productId].price) {
            revert Ecommerce__PriceNotMet(msg.value);
        }
        string memory metadata = s_AllProducts[_productId].metadata;

        emit productBought(
            msg.sender,
            block.timestamp,
            _productId,
            msg.value,
            metadata
        );
    }

    // Withdraw the contract balance.
    function withdraw(address _to) external payable onlyOwner {
        payable(_to).transfer(address(this).balance);
    }
}
