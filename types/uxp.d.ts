declare const shell: Shell;

interface CopyToOptions {
    /**
     * if `true`, allows overwriting existing entries
     */
    overwrite: boolean;
}

interface MoveToOptions {
    /**
     * if `true`, allows overwriting existing entries
     */
    overwrite: boolean;
    /**
     * If specified?, the entry is renamed to this name
     */
    newName: string;
}

interface FileReadOptions {
    format?: Symbol;
}

interface FileWriteOptions {
    format: Symbol;
    append: boolean;
}

type GetFileForOpeningOptions = {
    initialDomain: Symbol;
    types: string[];
    allowMultiple: boolean;
}

interface GetFileForSavingOptions {
    initialDomain: Symbol;
}

interface GetFolderOptions {
    initialDomain: Symbol;
}

interface CreateEntryOptions {
    type: Symbol;
    overwrite: boolean;
}

interface RenameEntryOptions {
    overwrite: boolean;
}

declare module storage {
    declare export class Entry {
        public constructor(name: any, provider: any, id: any);

        public isEntry: boolean;
        public readonly isFile: boolean;
        public readonly isFolder: boolean;
        public readonly name: string;
        public readonly provider: FileSystemProvider;
        public readonly url: string;
        public readonly nativePath: string;

        /**
         * Copies this entry to the specified `folder`.
         * @param folder the folder to which to copy this entry
         * @param options additional options
         *
         * @throws errors.EntryExistsError if the attempt would overwrite an entry and `overwrite` is `false`
         * @throws errors.PermissionDeniedError if the underlying file system rejects the attempt
         * @throws errors.OutOfSpaceError if the file system is out of storage space
         */
        public copyTo(folder: Folder, options: CopyToOptions = {overwrite: false}): Promise;

        public moveTo(folder: Folder, options: MoveToOptions = {overwrite: false}): Promise;

        public delete(): Promise;

        public getMetadata(): Promise<EntryMetadata>;

    }

    declare export class EntryMetadata {
        public readonly name: string;
        public readonly size: number;
        public readonly dateCreated: Date;
        public readonly dateModified: Date;
        public readonly isFile: boolean;
        public readonly isFolder: boolean;
    }

    declare export class File {
        // TODO: Is a `File` an entry (i.e. does `File` extend `Entry`?

        public readonly isFile: boolean;
        public mode: Symbol;

        public read(options: FileReadOptions): Promise<string | ArrayBuffer>;

        public write(data: string, options: FileWriteOptions): Promise;

        public static isFile(entry: any): boolean;
    }

    declare export class FileSystemProvider {
        public readonly isFileSystemProvider: boolean;
        public readonly supportedDomains: Symbol[];

        public getFileForOpening(options: GetFileForOpeningOptions = {
            allowMultiple: false,
            types: ['.*']
        }): Promise<File[]>;

        public getFileForSaving(options: GetFileForSavingOptions): Promise<File>;

        public getFolder(options: GetFolderOptions): Promise<Folder>;

        public getTemporaryFolder(): Promise<Folder>;

        public getDataFolder(): Promise<Folder>;

        public getPluginFolder(): Promise<Folder>;

        // TODO: getFsUrl() – waiting for better documentation
        // TODO: getNativePath() – waiting for better documentation

        public static isFileSystemProvider(fs: any): boolean;
    }

    declare export class LocalFileSystemProvider extends FileSystemProvider {
        // TODO: Waiting for documentation on `LocalFileSystemProvider`
    }

    declare export class Folder extends Entry {
        public isFolder(): boolean;

        public getEntries(): Promise<Entry[]>;

        public createEntry(name: string, options: CreateEntryOptions = {
            type: types.file,
            overwrite: false
        }): Promise<File | Folder>;

        public getEntry(filePath: string): Promise<File | Folder>;

        public renameEntry(entry: Entry, newName: string, options: RenameEntryOptions = {overwrite = false}): Promise;

        public static isFolder(entry: any): boolean;
    }

    declare export const localFileSystem: LocalFileSystemProvider;

    namespace errors {
        declare class AbstractMethodInvocationError extends Error {
        }

        declare class ProviderMismatchError extends Error {
        }

        declare class EntryIsNotAnEntryError extends Error {
        }

        declare class EntryIsNotAFolderError extends Error {
        }

        declare class EntryIsNotAFileError extends Error {
        }

        declare class NotAFileSystemError extends Error {
        }

        declare class OutOfSpaceError extends Error {
        }

        declare class PermissionDeniedError extends Error {
        }

        declare class EntryExistsError extends Error {
        }

        declare class FileIsReadOnlyError extends Error {
        }

        declare class DomainNotSupportedError extends Error {
        }

        declare class InvalidFileNameError extends Error {
        }
    }

    namespace domains {
        declare const userDesktop: Symbol;
        declare const userDocuments: Symbol;
        declare const userPictures: Symbol;
        declare const userVideos: Symbol;
        declare const userMusic: Symbol;
        declare const appLocalData: Symbol;
        declare const appLocalLibrary: Symbol;
        declare const appLocalCache: Symbol;
        declare const appLocalShared: Symbol;
        declare const appLocalTemporary: Symbol;
        declare const appRoamingData: Symbol;
        declare const appRoamingLibrary: Symbol;
    }

    namespace fileTypes {
        declare const text: Symbol;
        declare const images: Symbol;
        declare const all: Symbol;
    }

    namespace formats {
        declare const utf8: Symbol;
        declare const binary: Symbol;
    }

    namespace modes {
        declare const readOnly: Symbol;
        declare const readWrite: Symbol;
    }

    namespace types {
        declare const file: Symbol;
        declare const folder: Symbol;
    }
}

export = {shell, storage};
