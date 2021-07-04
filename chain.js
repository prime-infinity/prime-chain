const SHA256 =  require('crypto-js/sha256');


/* first, we define a block and its structure */
class Block{
    constructor(index, timestamp, data, previousHash){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class BlockChain{
    constructor(){
        this.chain = [this.createGenisisBlock()]
    }

    createGenisisBlock(){
        return new Block(0, "04/07/2021", "genisis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid(){
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            
        }
        return true;
    }
}

let primeCoin = new BlockChain;
primeCoin.addBlock(new Block(1, "05/07/2021", { amount:4 }))
primeCoin.addBlock(new Block(2, "06/07/2021", { amount:5 }))

console.log(primeCoin.isValid());
console.log(JSON.stringify(primeCoin,null,4))
