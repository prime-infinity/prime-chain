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


block_one = Block(1, {"amount": 4}, 0)
print(block_one.show_block())
