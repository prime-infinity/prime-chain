import hashlib

from datetime import date
today = date.today()
current_date = today.strftime("%d/%m/%Y")


class Block:
    def __init__(self, index, data, previous_hash):
        self.index = index
        self.timestamp = current_date
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        text = str(self.index)+self.timestamp + \
            str(self.data)+str(self.previous_hash)
        data = text.encode("utf8")
        return hashlib.sha256(data).digest()

    def show_block(self):
        return {"index": self.index, "timestamp": self.timestamp, "data": self.data, "previous_hash": self.previous_hash, "hash": self.hash}


class Chain:
    def __init__(self):
        self.chain = [self.create_genesis_chain()]

    def show_block(self):
        for block in self.chain:
            print({"index": block.index, "timestamp": block.timestamp, "data": block.data,
                  "previous hash": block.previous_hash, "hash": block.hash})

    def get_previous_block(self):
        return self.chain[-1]

    def add_block(self, data):
        new_block = Block(self.get_previous_block().index + 1,
                          data, self.get_previous_block().hash)
        self.chain.append(new_block)

    def create_genesis_chain(self):
        return Block(0, {"amount": 4}, 0)


chain = Chain()
chain.add_block({"amount": 3, "valid": True})
chain.add_block({"amount": 11, "valid": True, "water": "yes"})
chain.show_block()
