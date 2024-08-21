import { ContactsCollection } from "../collections/ContactsCollection";
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
    Meteor.publish('allContacts', function publishContacts() {
        return ContactsCollection.find();
    });

    Meteor.publish('contacts', function publishContacts() {
        return ContactsCollection.find({ archived: { $ne: true }});
    });
}

