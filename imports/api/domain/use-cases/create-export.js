import Export from "../models/export";
import { v4 as uuid } from "uuid";

class CreateExport {

	constructor(exportRepository) {
		this._exportRepository = exportRepository;
	}

	/**
	 * Create an export and then export the data
	 *
	 * @returns {Promise<String>} the export id
	 */
	async handle() {
		// Create export
		const newExport = new Export(uuid());
		await this._exportRepository.save(newExport);

		// Export data asynchronously
		new Promise(async (res, rej) => {
			try {
				const exportComplete = await this.exportData(newExport.id);
				this.uploadExport(exportComplete)
				res()
			} catch (err) {
				console.log(`An error occurred while exporting data [exportId=${newExport.id}]`)
				rej(err)
			}
		});

		return newExport.id;
	}

	/**
	 * Export data
	 *
	 * @param exportId
	 *
	 * @returns {Promise<Export>} the complete export
	 */
	async exportData(exportId) {
		let anExport;

		do {
			anExport  = await this._exportRepository.find(exportId); // Retrieve each time the export.

			await new Promise(res => setTimeout(() => {res()}, 1000)); // Simulate export of a file by waiting 1 second

			anExport.forwardProgress(5); // Forward the progress state of the export

			await this._exportRepository.save(anExport);
		} while (anExport.progress < 100); // Continue to export the data until export reach the 100 progress state

		return anExport;
	}

	/**
	 * Upload export and assign it download url
	 *
	 * @param anExport the complete data export
	 */
	uploadExport(anExport) {
		// Fake upload of export

		const availableStorageUrls = [
			'https://www.lempire.com/', 'https://www.lemlist.com/',
			'https://www.lemverse.com/','https://www.lemstash.com/'
		];

		anExport.makeAvailableAt(
			availableStorageUrls[Math.floor(Math.random() * availableStorageUrls.length)]
		);

		this._exportRepository.save(anExport);
	}

}

export default CreateExport;