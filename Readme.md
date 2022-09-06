# FullStack Ecommerce DApp (Decentralized Application)
Complete Full Stack Decentralization Ecommerce Website using **Solidity** language for Smart Contract, **hardhat** for Dev Enviroment, and Next.js framework For Frontend.


### See Deployed Version -> https://ecommerce-dapp-ten.vercel.app/

&nbsp;
&nbsp;
&nbsp;
&nbsp;


<!-- <a href="https://ibb.co/xmYfJgp"><img src="https://i.ibb.co/5YknBjN/Screenshot-357.png" alt="Screenshot-357" border="0"></a> -->


## Functionalities :-
 - **For Users** 
  - **See All Products**
  - **Filter Products**
  - **See perticular productn**
  - **Buy The Product**
  - **See the past history of products**
  &nbsp;
  &nbsp;
 - **For Admin** 
  - **Add the Product**
  - **Upload image, Metadata to IPFS**
  - **See the Contract balance.**
  - **Withdraw Balance of contract.**


## How to Setup in your local enviroment :-

### Frontend 
    1. cd frontend
    2. yarn
    3. Setup Env
    3. yarn run dev


### Blockchain
    1. cd blockchain
    2. yarn install
    3. setup env for polygon test network or you can use localhost.
    4. yarn hardhat run scripts/deploy.js --network polygon
    
    
    
## Technologies/Frameworks Used :-

### Frontend
1. Next.js (Using Vite).
2. Tailwind CSS and Material-Tailwind (For styling).
3. **ethers.js** for Web3 integration.
4. IPFS for storing images.
5. Alchemy mumbai Testnet (Polygon)

## Blockchain
1. **Solidity** (To develop Smart Contract)
2. Javascript (For deploying scripts)
3. **Chai** (For testing Smart Contract)
4. Polygon (Test network)
5. Hardhat
