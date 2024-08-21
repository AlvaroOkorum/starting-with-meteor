import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';
import 'meteor/aldeed:collection2/dynamic';
import { WalletCollection } from './WalletsCollection';

export const TRANSFER_TYPE = 'TRANSFER';
export const ADD_TYPE = 'ADD';

export const TransactionsCollection = new Mongo.Collection('transactions');

//using hooks
TransactionsCollection.before.insert(function (userId, transactionDocument) {
    if(transactionDocument.type === TRANSFER_TYPE){
        const sourceWallet = WalletCollection.findOne(transactionDocument.sourceWalletId)
        if(!sourceWallet){
            throw new Meteor.Error('Source wallet not found.');
        }
        if(sourceWallet.balance < transactionDocument.amount){
            throw new Meteor.Error('Insufficient founds.')
        }
        WalletCollection.update(transactionDocument.sourceWalletId, {
            $inc:{ balance: -transactionDocument.amount }
        });
        WalletCollection.update(transactionDocument.destinationWalletId, {
            $inc:{ balance: transactionDocument.amount }
        });
    }
    if(transactionDocument.type === ADD_TYPE){
        const sourceWallet = WalletCollection.findOne(transactionDocument.sourceWalletId)
        if(!sourceWallet){
            throw new Meteor.Error('Source wallet not found.');
        }
        WalletCollection.update(transactionDocument.sourceWalletId, {
            $inc:{ balance: transactionDocument.amount }
        });
    }
});

//using classes
// class TransactionsMongoCollection extends Mongo.Collection{
//     insert(transactionDocument, callback){
//         if(transactionDocument.type === TRANSFER_TYPE){
//             const sourceWallet = WalletCollection.findOne(transactionDocument.sourceWalletId)
//             if(!sourceWallet){
//                 throw new Meteor.Error('Source wallet not found.');
//             }
//             if(sourceWallet.balance < transactionDocument.amount){
//                 throw new Meteor.Error('Insufficient founds.')
//             }
//             WalletCollection.update(transactionDocument.sourceWalletId, {
//                 $inc:{ balance: -transactionDocument.amount }
//             });
//             WalletCollection.update(transactionDocument.destinationWalletId, {
//                 $inc:{ balance: transactionDocument.amount }
//             });
//         }
//         if(transactionDocument.type === ADD_TYPE){
//             const sourceWallet = WalletCollection.findOne(transactionDocument.sourceWalletId)
//             if(!sourceWallet){
//                 throw new Meteor.Error('Source wallet not found.');
//             }
//             WalletCollection.update(transactionDocument.sourceWalletId, {
//                 $inc:{ balance: transactionDocument.amount }
//             });
//         }
//         return super.insert(transactionDocument, callback);
//     }
// };
//export const TransactionsCollection = new TransactionsMongoCollection('transactions');

const TransactionsSchema = new SimpleSchema({
    type:{
        type: String,
        allowedValues: [ TRANSFER_TYPE, ADD_TYPE ]
    },
    sourceWalletId:{
        type: String,
    },
    destinationWalletId:{
        type: String,
        optional: true,
    },
    amount:{
        type: Number,
        min: 1,
    },
    createdAt: {
        type: Date,
    }
});

TransactionsCollection.attachSchema(TransactionsSchema);