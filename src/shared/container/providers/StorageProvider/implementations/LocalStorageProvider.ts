import { IStoregeProvider } from "../IStoregeProvider";

class LocalStorageProvider implements IStoregeProvider{
    save(file: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    delete(file: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { LocalStorageProvider }