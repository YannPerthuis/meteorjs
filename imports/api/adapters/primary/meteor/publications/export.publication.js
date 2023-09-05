import { repositories } from "../../../../../startup/server/context";

Meteor.publish('exports', async function publishTasks() {
	console.log('Calling get exports');
	return repositories.exportRepository.findAll();
});