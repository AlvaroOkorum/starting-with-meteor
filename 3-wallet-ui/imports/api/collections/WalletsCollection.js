import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';
import 'meteor/aldeed:collection2/dynamic';

export const WalletCollection = new Mongo.Collection('wallets');

const WalletsSchema = new SimpleSchema({
    balance:{
        type: Number,
        min: 0,
        defaultValue: 0,
    },
    currency: {
        type: String,
        allowedValues: ['USD'],
        defaultValue: 'USD',
    },
    createdAt: {
        type: Date,
    },
});

WalletCollection.attachSchema(WalletsSchema);