// use admin
// db.createUser({
//     user: 'admin',
//     pwd: 'yourpassword',
//     roles: [
//         {
//             role: 'userAdminAnyDatabase',
//             db: 'admin'
//         },
//         'readWriteAnyDatabase'
//     ],
// })
//
// use mataara
// db.createUser({
//     user: 'root',
//     pwd: 'example',
//     roles: [
//         {
//             role: 'readWrite',
//             db: 'mataara',
//         },
//     ],
// });

db = db.getSiblingDB('mataara');

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
