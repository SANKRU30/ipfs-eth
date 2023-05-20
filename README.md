# ipfs-ethIPFS-Ethereum Integration
This project demonstrates the integration of IPFS (InterPlanetary File System) and Ethereum. It allows users to upload files to IPFS and store their corresponding hashes on the Ethereum blockchain.

Prerequisites
Before running this code, ensure that you have the following prerequisites installed:

Node.js (https://nodejs.org)
Ganache (https://www.trufflesuite.com/ganache)
Remix IDE (https://remix.ethereum.org)
MetaMask extension for your web browser (https://metamask.io)
Steps to Run the Code
Clone or download this repository to your local machine.

Open a terminal or command prompt and navigate to the project's root directory.

Install the project dependencies by running the following command:

Copy code
npm install
Start Ganache and configure it to use the local Ethereum development network.

Open Remix IDE in your web browser and compile and deploy the smart contract. Ensure that the deployed contract address is available.

Configure MetaMask with Ganache's development network and import a test account using the provided private key.

In the project's root directory, create a file named .env and add the following configuration:

makefile
Copy code
CONTRACT_ADDRESS=<contract_address>
Replace <contract_address> with the actual contract address obtained from Remix IDE.

Start the Node.js server by running the following command:

Copy code
node app.js
Access the web application by opening a web browser and navigating to http://localhost:3000.

Use the web application to upload files. After uploading a file, you will see the following details:

File name
IPFS link
Contract address
Transaction address
Working of the Code
The web application provides a user interface for file upload.

When a file is uploaded, the application saves it locally and uploads it to IPFS using the IPFS HTTP client. It obtains the IPFS hash (CID) for the file.

The application interacts with the Ethereum network using Web3.js. It connects to the local Ganache network and deploys or uses an existing smart contract instance.

The file's IPFS hash is sent to the smart contract's sendHash function, which stores the hash on the Ethereum blockchain.

The web application displays the uploaded file's details, including the IPFS link, contract address, and transaction address.

Please note that this is a simplified explanation, and the actual code may have additional features or variations. Refer to the code comments and documentation for more details.

If you have any questions or issues, please feel free to contact us.

Enjoy using the IPFS-Ethereum Integration!
