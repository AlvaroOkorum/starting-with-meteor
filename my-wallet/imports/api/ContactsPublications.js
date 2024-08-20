import { ContactsCollection } from "./ContactsCollection";
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    Meteor.publish('contacts', function publishContacts() {
        return ContactsCollection.find();
    });
}

