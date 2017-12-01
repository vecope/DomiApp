import { Meteor } from 'meteor/meteor';
import '../imports/api/restaurants.jsx';

Meteor.startup(() => {
  // code to run on server at startup
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '1560182480738505',
    secret: 'b49a44fd2b726f36c1d984e1d199546a'
});
Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];
    user.favs = [];

    return user;
});
