// The export aggregate root
class Export {

	static httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

	constructor(id, progress, downloadUrl) {
		this._id          = id;
		this._progress    = progress ? progress : 0 ;
		this._downloadUrl = downloadUrl;
	}

	static fromPersistence(id, progress) {
		return new Export(id, progress);
	}

	forwardProgress(newProgress) {
		if (newProgress < 1) {
			throw new Error("Impossible to forward progress with an non-positive value")
		}
		if (this._progress === 100) {
			throw new Error("Export is already complete")
		}
		if ((this._progress + newProgress) > 100) {
			throw new Error("Impossible to forward progress beyond 100% of progress")
		}

		this._progress += newProgress;
	}

	makeAvailableAt(url) {
		if (!Export.httpRegex.test(url)) {
			throw new Error("Cannot be available here because it is nor a valid url")
		}

		this._downloadUrl = url;
	}

	get id() {
		return this._id;
	}

	get progress() {
		return this._progress;
	}

	get downloadUrl() {
		return this._downloadUrl;
	}

}

export default Export;