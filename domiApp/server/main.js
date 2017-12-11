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
    appId: '1810269765940881',
    secret: '731c476ae4da21e0ce9a8922e25664b5'
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
