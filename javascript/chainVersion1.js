/**
 * this version of blockchain utilses a "block" and "chain" classes
 * the chain just hold different instances of blocks.
 *
 * first we create a block class which can be initialise with diff
 * data,then we create the chain class that will hold blocks, we initialise
 * this chain class with an initial or genesis block, then we
 * create different methods in the chain class like add block and so on
 */

const SHA256 = require("crypto-js/sha256");
var moment = require("moment");
var date = moment();
var currentDate = date.format("D/MM/YYYY");

//console.log(SHA256("me"));

/* first, we define a block and its structure */
class Block {
  constructor(index, data, previousHash) {
    this.index = index;
    this.timestamp = currentDate;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  }
}

//next, we create the chain class
class Chain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, { amount: 4 }, 0);
  }

  getPreviousBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    /**
     * this could be done in another way,
     * where the block is instantiated outside
     * the chain and the instance of the block is
     * passed as an arguement, but i'd argue that
     * would offer less control
     */
    let newBlock = new Block(
      this.getPreviousBlock().index + 1,
      data,
      this.getPreviousBlock().hash
    );
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      return true;
    }
  }
}

let chain = new Chain();
chain.addBlock({ amount: 3, water: false });
chain.addBlock({ amount: 14, water: true, isValid: true });
console.log(chain.chain);
console.log(chain.isValid());
