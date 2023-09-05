import { Template } from 'meteor/templating';
import { exportCollection } from "../../../db/exportCollection";

// Component imports
import "../../components/export-item"

// Template imports
import "./ExportList.html";

Template.exportList.onCreated(function exportListOnCreated() {
	Meteor.subscribe('exports');
});

Template.exportList.events({
	"click #trigger-new-export"() {
		Meteor.call('create.export');
	}
});

Template.exportList.helpers({
	exports() {
		return exportCollection.find().fetch();
	},
});