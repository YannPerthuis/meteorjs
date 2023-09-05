import { useCases } from "../../../../../startup/server/context"

Meteor.methods({
	async 'create.export'() {
		console.log("Calling of create export");
		const exportId = await useCases.createExport.handle();
		console.log(`Response of create export [exportId=${exportId}]`);
		return exportId;
	}
});