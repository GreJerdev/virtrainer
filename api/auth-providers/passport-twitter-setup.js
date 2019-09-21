'use strict'

const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const config = require("../configuration/config");
const UserModel = require("../models/user");
const UserService = require('../services/user-service');


// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
    const user_service = new UserService();
    user_service.getByOAuth('twitter', id).then(user => {
        done(null, user);
    }).catch(e => {
        done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: config.passport.twitter.CONSUMER_KEY,
            consumerSecret: config.passport.twitter.CONSUMER_SECRET,
            callbackURL: "/api/v1/authentication/twitter/redirect"
        },
        async (token, tokenSecret, profile, done) => {
            // find current user in UserModel
            const user_service = new UserService();
            let current_user = await user_service.getByOAuth('twitter', profile._json.id_str);

            // create new user if the database doesn't have this user
            if (!current_user) {
                let newUser = new UserModel();

                newUser.name = profile._json.name;
                newUser.data = {
                    'profile_image_url': profile._json.profile_image_url,
                    'screen_name': profile._json.screen_name
                };
                newUser.trainings = [];
                newUser.traineres = [];
                newUser.trainees = [];
                newUser.oAuth.push({'oAuth_type': 'twitter', 'oAuth_id': profile._json.id_str});
                newUser = await user_service.create(newUser);

                if (newUser) {
                    done(null, newUser);
                }
                done(null, profile);//should not get here

            }else
            {
                done(null, current_user);
            }
        }
    )
);
