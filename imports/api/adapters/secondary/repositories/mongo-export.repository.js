import Export from "../../../domain/models/export"

class MongoExportRepository {

	constructor(collection) {
		this._collection = collection;
	}

	// Query
	async findAll() {
		return this._collection.find();
	}

	// Command
	async find(exportId) {
		return new Promise((res, rej) => {
			const document = this._collection.findOne({ _id: exportId });

			if (document) {
				res(document
					? Export.fromPersistence(document._id, document.progress, document.downloadUrl)
					: null
				);
			}

			rej(new Error(`The export has not been found [exportId=${exportId}]`))
		});
	}

	async save(anExport) {
		return new Promise((res) => {
			res(this._collection.upsert(
				anExport.id,
				{
					$set: {
						progress: anExport.progress,
						downloadUrl: anExport.downloadUrl
					}
				}
			));
		});
	}

}

export default MongoExportRepository;