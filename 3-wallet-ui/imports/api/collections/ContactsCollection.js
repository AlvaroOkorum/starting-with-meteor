import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';
import 'meteor/aldeed:collection2/dynamic';

export const ContactsCollection = new Mongo.Collection('walletContacs');

const ContactsSchema = new SimpleSchema({
    name:{
        type: String,
    },
    email:{
        type: String,
        regEx: SimpleSchema.RegEx.Email,
    },
    imageUrl:{
        type: String,
        optional: true,
    },
    walletId:{
        type: String,
    },
    createdAt: {
        type: Date,
    }
});

ContactsCollection.attachSchema(ContactsSchema);