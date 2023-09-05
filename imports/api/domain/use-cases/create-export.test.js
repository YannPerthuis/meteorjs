import { Meteor } from 'meteor/meteor';
import CreateExport from "./create-export"
import expect from "expect";
import InMemoryExportRepository from "../../adapters/secondary/repositories/in-memory-export.repository"

if (Meteor.isServer) {
	describe('Create export', () => {

		let useCase;
		let repository;

		before(() => {
			repository = new InMemoryExportRepository()
			useCase    = new CreateExport(repository);
		})

		beforeEach(() => {
			repository.clean();
		})

		it('should create an export', async () => {
			const exportId = await useCase.handle();

			expect(exportId).toBeDefined();
			const newExport = await repository.find(exportId);
			expect(newExport).toBeDefined();
			expect(newExport.progress).toEqual(0);
		});

		it('should export`s progress forward of 5% each second while exporting data', async () => {
			const exportId = await useCase.handle();

			await new Promise(res => setTimeout(() => {res()}, 1010)); // Wait until exporting goes to the first step

			const newExport = await repository.find(exportId);
			expect(newExport.progress).toEqual(5)
		});

		it('should continue exporting data from progress of 90% until it reaches of 100%', async () => {
			const exportId = await useCase.handle();

			let anExport = await repository.find(exportId);
			anExport.forwardProgress(90);

			await new Promise(res => setTimeout(() => {res()}, 2010));
			anExport = await repository.find(exportId);
			expect(anExport.progress).toEqual(100);
			expect(anExport.downloadUrl).toBeDefined();
		}).timeout(3000);

	});
}