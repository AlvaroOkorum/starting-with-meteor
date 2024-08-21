
import { Meteor } from 'meteor/meteor';
import { WalletCollection } from '../collections/WalletsCollection';

if(Meteor.isServer){

    Meteor.publish('wallets', function publishWallets() {
        return WalletCollection.find();
    });

}

