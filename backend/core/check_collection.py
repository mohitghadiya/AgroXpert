from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['AgroXpert']

for doc in db['core_user'].find():
    print(doc)
    print("sfddsfsf")
print("done")