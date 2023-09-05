import { Meteor } from 'meteor/meteor';
import { initializeContext } from "../imports/startup/server/context"

Meteor.startup(() => {
	initializeContext();
});
