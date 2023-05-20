/*import { create } from 'ipfs-http-client';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import events from 'events';
import Web3 from 'web3';

// Connect to the local Ganache network
const web3 = new Web3('http://127.0.0.1:7545');

const ipfs = create({ host: 'localhost', port: '5002', protocol: 'http' });

// Create an instance of EventEmitter
const eventEmitter = new events.EventEmitter();

// Increase the maximum number of listeners
eventEmitter.setMaxListeners(1000);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/upload', async (req, res) => {
  const file = req.files.file;
  const fileName = req.body.fileName;
  const filePath = 'files/' + fileName;

  file.mv(filePath, async (err) => {
    if (err) {
      console.log("Error... Failed to download the file");
      return res.status(500).send(err);
    }

    try {
      const fileHash = await addFile(fileName, filePath);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      res.render('upload', { fileName, fileHash });
    } catch (error) {
      console.log("Error... Failed to upload the file to IPFS");
      console.error(error);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      return res.status(500).send("Failed to upload the file to IPFS");
    }
  });
});

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  const fileAdded = await ipfs.add({ path: fileName, content: file });
  const fileHash = fileAdded.cid.toString();

  // Obtain the user's MetaMask account
  const accounts = await web3.eth.getAccounts();
  const fromAccount = accounts[0];

  // Deploy or use your existing contract instance
  const contractAddress = '0xCCaeB186a4561dFCcceD39Df687727ee69A40BaF';
  const contractAbi = [
    {
      "inputs": [],
      "name": "getHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "sendHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // Call the contract method to store the hash
  await contract.methods.sendHash(fileHash).send({ from: fromAccount });

  return fileHash;
};

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});*/


import { create } from 'ipfs-http-client';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import events from 'events';
import Web3 from 'web3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url);
// Get the current module's directory path
const __dirname = dirname(__filename);

// Connect to the local Ganache network
const web3 = new Web3('http://127.0.0.1:7545');

const ipfs = create({ host: 'localhost', port: '5002', protocol: 'http' });

// Create an instance of EventEmitter
const eventEmitter = new events.EventEmitter();

// Increase the maximum number of listeners
eventEmitter.setMaxListeners(1000);

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/upload', async (req, res) => {
  const file = req.files.file;
  const fileName = req.body.fileName;
  const filePath = __dirname + '/files/' + fileName;

  file.mv(filePath, async (err) => {
    if (err) {
      console.log("Error... Failed to download the file");
      return res.status(500).send(err);
    }

    try {
      const { fileHash, contractAddress, transactionReceipt, fromAccount } = await addFile(fileName, filePath);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      res.render('upload', { fileName, fileHash, ownerAddress: fromAccount, contractAddress, transactionAddress: transactionReceipt.transactionHash });
    } catch (error) {
      console.log("Error... Failed to upload the file to IPFS");
      console.error(error);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      return res.status(500).send("Failed to upload the file to IPFS");
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const addFile = async (fileName, filePath) => {
  const file = fs.readFileSync(filePath);
  const fileAdded = await ipfs.add({ path: fileName, content: file });
  const fileHash = fileAdded.cid.toString();

  // Obtain the user's MetaMask account
  const accounts = await web3.eth.getAccounts();
  const fromAccount = accounts[0];

  // Deploy or use your existing contract instance
  const contractAddress = '0x99A80A6DEC7646b1777EBDB87a9742Cc74cEC799';
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "sendHash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getHash",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // Call the contract method to store the hash
  const transaction = await contract.methods.sendHash(fileHash).send({ from: fromAccount });

  // Verify if the hash has been stored on the blockchain
  const storedHash = await contract.methods.getHash().call();
  if (storedHash === fileHash) {
    console.log('Hash stored on the blockchain successfully!');
  } else {
    console.log('Failed to store hash on the blockchain.');
  }

  return { fileHash, contractAddress, transactionReceipt: transaction, fromAccount };
};

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});


