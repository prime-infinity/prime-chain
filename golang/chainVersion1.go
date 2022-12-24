package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
	"time"
)

//model the block and the chain data structures
//and add reveiver functions to them to mimick
//class methods
type Block struct {
	index              int
	timestamp          string
	data               map[string]int
	previousHash, hash string
}

//using a receiver function to mimik a method
func (b Block) returnHash() string {
	realHashed := sha256.Sum256([]byte(b.timestamp + strconv.Itoa(b.index)))
	return hex.EncodeToString(realHashed[:])

}

type Chain struct {
	chain []Block
}

func (c *Chain) addBlock(b Block) {
	b.index = c.chain[len(c.chain)-1].index + 1
	b.hash = b.returnHash()
	b.previousHash = c.chain[len(c.chain)-1].hash
	c.chain = append(c.chain, b)
}

func main() {
	currentTime := time.Now()
	today := currentTime.Format("02/01/2006")

	blockOne := Block{
		index:     0,
		timestamp: today,
		data: map[string]int{
			"amount": 4,
		},
		previousHash: "0",
	}
	blockOne.hash = blockOne.returnHash()

	//initalise the chain with our firstblock,
	chain := Chain{chain: []Block{blockOne}}
	blockTwo := Block{0, today, map[string]int{"amount": 5}, "2", ""}

	blockThree := Block{0, today, map[string]int{"amount": 10}, "2", ""}
	chain.addBlock(blockTwo)
	chain.addBlock(blockThree)

	for _, block := range chain.chain {
		fmt.Printf("Index: %d\n", block.index)
		fmt.Printf("Timestamp: %s\n", block.timestamp)
		fmt.Printf("Hash: %s\n", block.hash)
		fmt.Printf("PrevHash: %s\n", block.previousHash)
		fmt.Println()
	}

}
