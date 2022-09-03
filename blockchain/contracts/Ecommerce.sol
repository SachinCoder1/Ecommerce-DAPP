// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

error Ecommerce__YouAreNoteOwner();
error Ecommerce__PriceNotMet(uint256 _price);

contract Ecommerce {
    /* State Variables */
    uint256 productId;
    address private owner;

    constructor(){
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
        uint256 indexed _price,
        uint256 _productId,
        string _metadata
    );

    // After buying the product
    event productBought(
        address indexed buyer,
        uint256 indexed timestamp,
        uint256 price,
        uint256 _productId
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

    function updateQuantity(uint32 _quantity, uint256 _productId) external {
        s_AllProducts[_productId].quantity = _quantity;
    }

    function buyProduct(uint256 _productId) external payable {
        if (msg.value != s_AllProducts[_productId].price) {
            revert Ecommerce__PriceNotMet(msg.value);
        }

        emit productBought(msg.sender, block.timestamp, msg.value, _productId);
    }
}

// contract Product {
//     error Product__PriceNotMet(uint256 _price);
//     /* State Variables */
//     struct ProductStruct {
//         uint256 price;
//         uint32 quantity;
//         string metadata;
//     }

//     /* events */
//     event productBought(
//         address indexed buyer,
//         uint256 indexed timestamp,
//         uint256 price
//     );

//     ProductStruct newProduct;

//     constructor(
//         uint256 _price,
//         uint32 _quantity,
//         string memory _metadata
//     ) {
//         newProduct = ProductStruct(_price, _quantity, _metadata);
//     }

//     /* Getter Functions */
//     function getProduct() external view returns (ProductStruct memory) {
//         return newProduct;
//     }

//     function updateQuantity(uint32 _quantity) external {
//         newProduct.quantity = _quantity;
//     }

//     function buyProduct() external payable {
//         if (msg.value != newProduct.price) {
//             revert Product__PriceNotMet(msg.value);
//         }

//         emit productBought(msg.sender, block.timestamp, msg.value);
//     }
// }
