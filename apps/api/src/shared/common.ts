
import type { R2Bucket } from "@cloudflare/workers-types";
import type { StorageService } from "./storage";
import { LocalStorageService, R2StorageService } from "./storage";

export type Env = {
	BUCKET?: R2Bucket;
};

export const getStorage = (env: Env | undefined): StorageService => {
	if (env?.BUCKET) {
		return new R2StorageService(env.BUCKET);
	}
	return new LocalStorageService(process.env.UPLOAD_DIR ?? ".uploads");
}
