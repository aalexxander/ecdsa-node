const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { utf8ToBytes, bytesToHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "028ed2c4410d1ca8364e8c3450f8b45e43531d45ab3f147417c3a4afd6fe6ddf80": 100,
  "02239866bd68d38fed43c00669ee2d6d29064866bcceb4ec281fe7116882cc0e87": 50,
  "039226d845702b3d16ca473b4c5e932dcfffae8f7e1aeae34fb8d44a1becb699e6": 75,
};

function hashJSON(data) {
  return bytesToHex(keccak256(utf8ToBytes(JSON.stringify(data))));
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, sign, hash } = req.body;
  const { sender, recipient, amount } = message;

  if (hashJSON(message) !== hash || !secp256k1.verify(sign, hash, sender)) {
    res.status(400).send({ message: "Signature is invalid!" });
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
