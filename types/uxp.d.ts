declare const shell: Shell;

interface CopyToOptions {
    /**
     * if `true`, allows overwriting existing entries
     */
    overwrite?: boolean;
}

interface MoveToOptions {
    /**
     * if `true`, allows overwriting existing entries
     */
    overwrite: boolean;
    /**
     * If specified?, the entry is renamed to this name
     */
    newName?: string;
}

interface FileReadOptions {
    format?: Symbol;
}

interface FileWriteOptions {
    format?: Symbol;
    append?: boolean;
}

type GetFileForOpeningOptions = {
    initialDomain?: Symbol;
    types?: string[];
    allowMultiple?: boolean;
}

interface GetFileForSavingOptions {
    initialDomain?: Symbol;
}

interface GetFolderOptions {
    initialDomain?: Symbol;
}

interface CreateEntryOptions {
    type?: Symbol;
    overwrite?: boolean;
}

interface RenameEntryOptions {
    overwrite?: boolean;
}

declare module storage {
    /**
     * An Entry is the base class for `File` and `Folder`. You'll typically never instantiate an `Entry` directly, but it provides the common fields and methods that both `File` and `Folder` share.
     */
    declare export static class Entry {
        /**
         * Creates an instance of Entry.
         * @param name
         * @param provider
         * @param id
         */
        public constructor(name: any, provider: any, id: any);

        /**
         * Indicates that this instance is an `Entry`. Useful for type-checking.
         */
        public isEntry: boolean;

        /**
         * Indicates that this instance is not a `File`. Useful for type-checking.
         */
        public readonly isFile: boolean;

        /**
         * Indicates that this instance is **not** a folder. Useful for type-checking.
         */
        public readonly isFolder: boolean;

        /**
         * The name of this entry. Read-only.
         */
        public readonly name: string;

        /**
         * The associated provider that services this entry. Read-only.
         */
        public readonly provider: FileSystemProvider;

        /**
         * The url of this entry. You can use this url as input to other entities of the extension system like for eg: set as src attribute of a Image widget in UI. Read-only.
         */
        public readonly url: string;

        /**
         * The platform native file-system path of this entry. Read-only
         */
        public readonly nativePath: string;

        /**
         * Copies this entry to the specified `folder`.
         * @param folder the folder to which to copy this entry
         * @param {object} options additional options
         * @param {boolean=false} options.overwrite if `true`, allows overwriting existing entries
         *
         * @throws errors.EntryExistsError if the attempt would overwrite an entry and `overwrite` is `false`
         * @throws errors.PermissionDeniedError if the underlying file system rejects the attempt
         * @throws errors.OutOfSpaceError if the file system is out of storage space
         */
        public copyTo(folder: Folder, options?): Promise;

        /**
         * Moves this entry to the target folder, optionally specifying a new name.
         * @param folder the folder to which to move this entry
         * @param {object} options
         * @param {boolean=false} options.overwrite If true allows the move to overwrite existing files
         * @param {string=} options.newName If specified, the entry is renamed to this name
         */
        public moveTo(folder: Folder, options?): Promise;

        /**
         * Removes this entry from the file system. If the entry is a folder, all the contents will also be removed.
         */
        public delete(): Promise;

        /**
         * @returns this entry's metadata.
         */
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

    declare export class File extends Entry {
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

        public getFsUrl(entry: Entry): string;

        public getNativePath(entry: Entry): string;

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
