import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

import { Template } from 'meteor/templating';

import './main.html';


Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});

Template.login.helpers({
    getEmail() {
        return Meteor.user().emails && Meteor.user().emails[0].address;
    }
});

Template.login.helpers({
    getIdent(){
        return Meteor.user().services.facebook.id;
    }
});

Template.login.events({
    'click button.log-in'(event) {
        event.preventDefault();
        Meteor.loginWithFacebook({requestPermissions: ['public_profile', 'email']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            }
        });
    },
    'click button.log-out'(event) {
        event.preventDefault();
        Meteor.logout();
    }
});