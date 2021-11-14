// This is only used during the dev/qa phases

db = db.getSiblingDB('mataara');

// The mataara db wouldn't be created otherwise
db.createCollection('sample_collection');
db.sample_collection.insertMany([
    {
        user: '123AZERTY456',
        transaction: {
            note: "This is where the receipt will be"
        },
        status: 'ACTIVE'
    },
    {
        user: '789GHJKFD5',
        transaction: {
            note: "This is where the receipt will be"
        },
        status: 'REFUND'
    },
]);

db.createUser(
    {
        user: "MARB_root",
        pwd: "MARB_example",
        roles: [
            {
                role: "readWrite",
                db: "mataara"
            }
        ]
    }
);