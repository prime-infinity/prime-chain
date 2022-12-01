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

let blockOne = new Block(0, { amount: 4 }, 0);

console.log(blockOne);