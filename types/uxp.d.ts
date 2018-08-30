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

    /**
     * Metadata for an entry. It includes useful information such as:
     *
     * * size of the file (if a file)
     * * date created
     * * date modified
     * * name
     *
     * You'll not instantiate this directly; use  Entry#getMetadata to do so.
     * @see {@link Entry.getMetadata}
     */
    declare export static class EntryMetadata {
        /**
         * The name of the entry.
         */
        public readonly name: string;
        /**
         * The size of the entry, if a file. Zero if a folder.
         */
        public readonly size: number;
        /**
         * The date this entry was created.
         */
        public readonly dateCreated: Date;
        /**
         * The date this entry was modified.
         */
        public readonly dateModified: Date;
        /**
         * Indicates if the entry is a file
         */
        public readonly isFile: boolean;
        /**
         * Indicates if the entry is a folder
         */
        public readonly isFolder: boolean;
    }

    /**
     * Represents a file on a file system. Provides methods for reading from and writing to the file. You'll never instantiate a File directly; instead you'll get access via a FileSystemProvider.
     * @see {@link FileSystemProvider}
     */
    declare export static class File extends Entry {
        /**
         * Indicates whether this file is read-only or read-write. See readOnly and readWrite.
         * @see {@link modes}
         */
        public mode: Symbol;

        /**
         * Reads data from the file and returns it. The file format can be specified with the `format` option. If a format is not supplied, the file is assumed to be a text file using UTF8 encoding.
         * @param {object=} options
         * @param {Symbol=} options.format The format of the file; see utf8 and blob.
         * @see {@link formats}
         */
        public read(options?): Promise<string | ArrayBuffer>;

        /**
         * Writes data to a file, appending if desired. The format of the file is controlled via the `format` option, and defaults to UTF8.
         *
         * @throws errors.FileIsReadOnlyError if writing to a read-only file
         * @throws errors.OutOfSpaceError If writing to the file causes the file system to exceed the available space (or quota)
         *
         * @param data the data to write to the file
         * @param {object=} options
         * @param {Symbol=} options.format The format of the file; see utf8 and blob.
         * @param {boolean=false} options.append if `true`, the data is written to the end of the file
         * @see {@link formats}
         */
        public write(data: string | ArrayBuffer, options?): Promise;

        /**
         * Determines if the entry is a file or not. This is safe to use even if the entry is `null` or `undefined`.
         * @param entry the entry to check
         */
        public static isFile(entry: any): boolean;
    }

    /**
     * Provides access to files and folders on a file system. You'll typically not instantiate this directly; instead you'll use an instance of one that has already been created for you. This class is abstract, meaning that you'll need to provide your own implementation in order to use it effectively.
     */
    declare export static class FileSystemProvider {
        /**
         * Indicates that this is a {@link FileSystemProvider}. Useful for type-checking.
         */
        public readonly isFileSystemProvider: boolean;
        /**
         * An array of the domains this file system supports. If the file system can open a file picker to the user's `documents` folder, for example, then `userDocuments` will be in this list.
         */
        public readonly supportedDomains: Symbol[];

        /**
         * Gets a file (or files) from the file system provider for the purpose of opening them. Files are read-only.
         *
         * Multiple files can be returned if the `allowMultiple` option is `true`.
         * @param {object} options
         * @param {Symbol} options.initialDomain the preferred initial location of the file picker. If not defined, the most recently used domain from a file picker is used instead.
         * @param {string[]=['.*']} options.types the allowed file types
         * @param {boolean=false} options.allowMultiple if `true`, multiple files can be returned (as an array)
         *
         * @returns the selected files, or empty if no file were selected.
         */
        public getFileForOpening(options?): Promise<File[]>;

        /**
         * Gets a file reference suitable for saving. The file is read-write. Any file picker displayed will be of the "save" variety.
         *
         * If the user attempts to save a file that doesn't exist, the file is created automatically.
         *
         * If the act of writing to the file would overwrite it, the file picker should prompt the user if they are OK with that action. If not, the file should not be returned.
         *
         * @param {object} options
         * @param {Symbol} options.initialDomain the preferred initial location of the file picker. If not defined, the most recently used domain from a file picker is used instead.
         *
         * @returns the selected file, or `null` if no file were selected.
         */
        public getFileForSaving(options?): Promise<File>;

        /**
         * Gets a folder from the file system via a folder picker dialog. The files and folders within can be accessed via {@link Folder.getEntries}. Any files within are read-write.
         *
         * If the user dismisses the picker, `null` is returned instead.
         *
         * @param {object} options
         * @param {Symbol} options.initialDomain the preferred initial location of the file picker. If not defined, the most recently used domain from a file picker is used instead.
         *
         * @returns the selected folder, or `null` if no folder is selected.
         */
        public getFolder(options: GetFolderOptions): Promise<Folder>;

        /**
         * Returns a temporary folder. The contents of the folder will be removed when the extension is disposed.
         */
        public getTemporaryFolder(): Promise<Folder>;

        /**
         * Returns a folder that can be used for extension's data storage without user interaction. It is persistent across host-app version upgrades.
         */
        public getDataFolder(): Promise<Folder>;

        /**
         * Returns an plugin's folder – this folder and everything within it are read only. This contains all the Plugin related packaged assets.
         */
        public getPluginFolder(): Promise<Folder>;

        /**
         * Returns the fs url of given entry.
         * @param entry the entry
         */
        public getFsUrl(entry: Entry): string;

        /**
         * Returns the platform native file system path of given entry.
         * @param entry the entry
         */
        public getNativePath(entry: Entry): string;

        /**
         * Checks if the supplied object is a {@link FileSystemProvider}. It's safe to use even if the object is `null` or `undefined`. Useful for type checking.
         * @param fs the object to check
         * @returns If `true`, the object is a file system provider
         */
        public static isFileSystemProvider(fs: any): boolean;
    }

    declare export class LocalFileSystemProvider extends FileSystemProvider {
        // TODO: Waiting for documentation on `LocalFileSystemProvider`
    }

    /**
     * Represents a folder on a file system. You'll never instantiate this directly, but will get it by calling {@link FileSystemProvider.getTemporaryFolder}, {@link FileSystemProvider.getFolder}, or via {@link Folder.getEntries}.
     */
    declare export static class Folder extends Entry {
        /**
         * Returns an array of entries contained within this folder.
         * @returns The entries within the folder.
         */
        public getEntries(): Promise<Entry[]>;

        /**
         * Creates an entry within this folder and returns the appropriate instance.
         * @param {string} name the name of the entry to create
         * @param {object} options
         * @param {Symbol=types.file} options.type Indicates which kind of entry to create. Pass {@link types.folder} to create a new folder.
         * @param {boolean=false} options.overwrite If `true`, the create attempt can overwrite an existing file
         *
         * @returns the created entry
         */
        public createEntry(name: string, options?): Promise<File | Folder>;

        /**
         * Gets an entry from within this folder and returns the appropriate instance.
         * @param {string} filePath the name/path of the entry to fetch
         *
         * @returns the fetched entry.
         */
        public getEntry(filePath: string): Promise<File | Folder>;

        /**
         * Renames an entry to a new name.
         * @param {Entry} entry the entry to rename
         * @param {string} newName the new name to assign
         * @param {object} options
         * @param {boolean=false} options.overwrite if `true`, renaming can overwrite an existing entry
         */
        public renameEntry(entry: Entry, newName: string, options?): Promise;

        /**
         * Checks if an entry is a folder. Safe to use if entry might be `null` or `undefined`. Useful for type checking.
         * @param entry the entry to check
         *
         * @returns if `true`, the entry is a folder
         */
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
