import { Meteor } from 'meteor/meteor';
import "../imports/api/collections/ContactsCollection";
import "../imports/api/collections/TransactionsCollection";
import "../imports/api/collections/WalletsCollection";
import "../imports/api/methods/ContactsMethods";
import "../imports/api/methods/TransactionsMethods"
import "../imports/api/publications/ContactsPublications";
import "../imports/api/publications/WalletsPublications";
import { WalletCollection } from '../imports/api/collections/WalletsCollection';
import "../infra/CustomError";

Meteor.startup(() => {
    if(!WalletCollection.find().count()){
        WalletCollection.insert({
            createdAt: new Date(),
            currency: 'USD',
        });
    }
});