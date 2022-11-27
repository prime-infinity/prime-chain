from Crypto.Hash import SHA256
from datetime import datetime
now = datetime.now()
current_time = now.strftime("%H:%M:%S")


class Block:
    def __init__(self, index, timestamp, data, previousHash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previousHash = previousHash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        return self.data
        return self.index + self.timestamp + self.data + self.previousHash


class Chain:
    def __init__(self):
        self.chain = [self.createFirstBlock()]

    def createFirstBlock(self):
        return Block(0, current_time, {"amount": 0}, 0)

    def inspect_chain(self):
        return self.chain


prime_chain = Chain()
