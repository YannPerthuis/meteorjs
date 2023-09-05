// The in memory repository for unit test
class InMemoryExportRepository {

	constructor() {
		this.export = new Map();
	}

	async find(exportId) {
		return new Promise((res) => {
			res(this.export.get(exportId))
		});
	}

	async save(anExport) {
		this.export.set(anExport.id, anExport);
	}


	clean() {
		this.export.clear();
	}

}

export default InMemoryExportRepository;
