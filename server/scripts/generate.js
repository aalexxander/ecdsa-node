const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
  const hash = keccak256(publicKey.slice(1));
  return hash.slice(-20);
}

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);
const address = getAddress(publicKey);

console.log(toHex(privateKey));
console.log(toHex(publicKey));
console.log(toHex(address));

// PK 7afd0047ddf02d88943d0ceeb515d8b864fdc552b75173b33a9b88fcc51b4f57
// PubK 028ed2c4410d1ca8364e8c3450f8b45e43531d45ab3f147417c3a4afd6fe6ddf80

// PK 286efe8306af2b27d4ce204b6286b60a103159d56192da33281b93a26bc42c91
// PubK 02239866bd68d38fed43c00669ee2d6d29064866bcceb4ec281fe7116882cc0e87

// PK 175437eba982e54c60244b9589c49a7b7ba4ec2c280f3bc57c8bd0ffe55cb09f
// PubK 039226d845702b3d16ca473b4c5e932dcfffae8f7e1aeae34fb8d44a1becb699e6
