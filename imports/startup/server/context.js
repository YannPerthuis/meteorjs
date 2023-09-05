// Collection imports
import { exportCollection } from "../../db/exportCollection";

// Method imports
import '../../api/adapters/primary/meteor/methods/export.method';

// Publications imports
import '../../api/adapters/primary/meteor/publications/export.publication';

// Repository imports
import MongoExportRepository from "../../api/adapters/secondary/repositories/mongo-export.repository";

// Use-cases imports
import CreateExport from "../../api/domain/use-cases/create-export";

export let repositories = {};
export let useCases     = {};

// Initialize all repositories, external services, and use-cases
export function initializeContext() {
	repositories = {
		exportRepository: new MongoExportRepository(exportCollection)
	}
	useCases     = {
		createExport: new CreateExport(repositories.exportRepository)
	}
}