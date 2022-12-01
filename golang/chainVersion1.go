package main

import (
	"crypto/sha256"
	"strconv"
	"time"
)

type Block struct {
	index              int
	timestamp          string
	data               map[string]int
	previousHash, hash string
}

//using a receiver function to mimik a method
func (b Block) returnHash() string {
	realHashed := sha256.Sum256([]byte(b.timestamp + strconv.Itoa(b.index)))
	//fmt.Printf("%x", realHashed)
	return string(realHashed)
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
	//fmt.Print(blockOne)

}
