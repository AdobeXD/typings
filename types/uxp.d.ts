declare const shell: Shell;

declare module storage {
    /**
     * An Entry is the base class for `File` and `Folder`. You'll typically never instantiate an `Entry` directly, but it provides the common fields and methods that both `File` and `Folder` share.
     */
     interface Entry {
        /**
         * Indicates that this instance is an `Entry`. Useful for type-checking.
         */
        isEntry: true;

        /**
         * Indicates that this instance is not a `File`. Useful for type-checking.
         */
        readonly isFile: boolean;

        /**
         * Indicates that this instance is **not** a folder. Useful for type-checking.
         */
        readonly isFolder: boolean;

        /**
         * The name of this entry. Read-only.
         */
        readonly name: string;

        /**
         * The associated provider that services this entry. Read-only.
         */
        readonly provider: FileSystemProvider;

        /**
         * The url of this entry. You can use this url as input to other entities of the extension system like for eg: set as src attribute of a Image widget in UI. Read-only.
         */
        readonly url: string;

        /**
         * The platform native file-system path of this entry. Read-only
         */
        readonly nativePath: string;

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
        copyTo(folder: Folder, options?): Promise<void>;

        /**
         * Moves this entry to the target folder, optionally specifying a new name.
         * @param folder the folder to which to move this entry
         * @param {object} options
         * @param {boolean=false} options.overwrite If true allows the move to overwrite existing files
         * @param {string=} options.newName If specified, the entry is renamed to this name
         */
        moveTo(folder: Folder, options?): Promise<void>;

        /**
         * Removes this entry from the file system. If the entry is a folder, all the contents will also be removed.
         */
        delete(): Promise<void>;

        /**
         * @returns this entry's metadata.
         */
        getMetadata(): Promise<EntryMetadata>;

        /**
         * Returns the details of the given entry like name, type and native path in a readable string format.
         */
        toString(): string;
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
     interface EntryMetadata {
        /**
         * The name of the entry.
         */
        readonly name: string;
        /**
         * The size of the entry, if a file. Zero if a folder.
         */
        readonly size: number;
        /**
         * The date this entry was created.
         */
        readonly dateCreated: Date;
        /**
         * The date this entry was modified.
         */
        readonly dateModified: Date;
        /**
         * Indicates if the entry is a file
         */
        readonly isFile: boolean;
        /**
         * Indicates if the entry is a folder
         */
        readonly isFolder: boolean;
    }

    /**
     * Represents a file on a file system. Provides methods for reading from and writing to the file. You'll never instantiate a File directly; instead you'll get access via a FileSystemProvider.
     * @see {@link FileSystemProvider}
     */
     interface File extends Entry {
        /**
         * Indicates if the entry is a file
         */
        readonly isFile: true;
        /**
         * Indicates if the entry is a folder
         */
        readonly isFolder: false;

        /**
         * Indicates whether this file is read-only or read-write. See readOnly and readWrite.
         * @see {@link modes}
         */
        mode: typeof modes.readOnly | typeof modes.readWrite;

        /**
         * Reads data from the file and returns it. The file format can be specified with the `format` option. If a format is not supplied, the file is assumed to be a text file using UTF8 encoding.
         * @param {object=} options
         * @param {Symbol=} options.format The format of the file; see utf8 and blob.
         * @see {@link formats}
         */
        read(options?): Promise<string | ArrayBuffer>;

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
        write(data: string | ArrayBuffer, options?): Promise<void>;
    }

    /**
     * Provides access to files and folders on a file system. You'll typically not instantiate this directly; instead you'll use an instance of one that has already been created for you. This class is abstract, meaning that you'll need to provide your own implementation in order to use it effectively.
     */
     interface FileSystemProvider {
        /**
         * Gets a file (or files) from the file system provider for the purpose of opening them. Files are read-only.
         *
         * Multiple files can be returned if the `allowMultiple` option is `true`.
         * @param {object} options
         * @param {string[]} options.types the allowed file types
         * @param {boolean} [options.allowMultiple=false] if `true`, multiple files can be returned (as an array)
         *
         * @returns the selected files, or empty if no file were selected.
         */
        getFileForOpening(options?): Promise<File[] | File>;

        /**
         * Gets a file reference suitable for saving. The file is read-write. Any file picker displayed will be of the "save" variety.
         *
         * If the user attempts to save a file that doesn't exist, the file is created automatically.
         *
         * If the act of writing to the file would overwrite it, the file picker should prompt the user if they are OK with that action. If not, the file should not be returned.
         *
         * @param {object} options
         * @param {string[]} options.types Required. Allowed file extensions, with no "." prefix.
         * @returns the selected file, or `null` if no file were selected.
         */
        getFileForSaving(options?): Promise<File>;

        /**
         * Gets a folder from the file system via a folder picker dialog. The files and folders within can be accessed via {@link Folder.getEntries}. Any files within are read-write.
         *
         * If the user dismisses the picker, `null` is returned instead.
         *
         * @returns the selected folder, or `null` if no folder is selected.
         */
        getFolder(): Promise<Folder>;

        /**
         * Returns a temporary folder. The contents of the folder will be removed when the extension is disposed.
         */
        getTemporaryFolder(): Promise<Folder>;

        /**
         * Returns a folder that can be used for extension's data storage without user interaction. It is persistent across host-app version upgrades.
         */
        getDataFolder(): Promise<Folder>;

        /**
         * Returns an plugin's folder – this folder and everything within it are read only. This contains all the Plugin related packaged assets.
         */
        getPluginFolder(): Promise<Folder>;

        /**
         * Returns the fs url of given entry.
         * @param entry the entry
         */
        getFsUrl(entry: Entry): string;

        /**
         * Returns the platform native file system path of given entry.
         * @param entry the entry
         */
        getNativePath(entry: Entry): string;
    }

     static class LocalFileSystemProvider extends FileSystemProvider {
        // TODO: Waiting for documentation on `LocalFileSystemProvider`
    }

    /**
     * Represents a folder on a file system. You'll never instantiate this directly, but will get it by calling {@link FileSystemProvider.getTemporaryFolder}, {@link FileSystemProvider.getFolder}, or via {@link Folder.getEntries}.
     */
     static class Folder extends Entry {
        /**
         * Indicates if the entry is a file
         */
        readonly isFile: false;
        /**
         * Indicates if the entry is a folder
         */
        readonly isFolder: true;

        /**
         * Returns an array of entries contained within this folder.
         * @returns The entries within the folder.
         */
        getEntries(): Promise<Entry[]>;

        /**
         * Creates a File Entry object within this folder and returns the appropriate instance. Note that this method just create a file entry object and not the actual file on the disk. The file actually gets created when you call for eg: write method on the file entry object.
         * @param {string} name the name of the file to create
         * @param {object} options
         * @param {boolean=false} options.overwrite If `true`, the create attempt can overwrite an existing file
         *
         * @returns the created entry
         */
        createFile(name: string, options?): Promise<File>;

        /**
         * Creates a Folder within this folder and returns the appropriate instance.
         * @param {string} name the name of the folder to create
         * @returns the created entry
         */
        createFolder(name: string): Promise<Folder>;

        /**
         * Gets an entry from within this folder and returns the appropriate instance.
         * @param {string} filePath the name/path of the entry to fetch
         *
         * @returns the fetched entry.
         */
        getEntry(filePath: string): Promise<File | Folder>;

        /**
         * Renames an entry to a new name.
         * @param {Entry} entry the entry to rename
         * @param {string} newName the new name to assign
         * @param {object} options
         * @param {boolean=false} options.overwrite if `true`, renaming can overwrite an existing entry
         */
        renameEntry(entry: Entry, newName: string, options?): Promise<void>;
    }

     export const localFileSystem: LocalFileSystemProvider;

    namespace errors {
        /**
         * Attempted to invoke an abstract method.
         */
         class AbstractMethodInvocationError extends Error {
        }

        /**
         * Attempted to execute a command that required the providers of all entries to match.
         */
         class ProviderMismatchError extends Error {
        }

        /**
         * The object passed as an entry is not actually an {@link Entry}.
         */
         class EntryIsNotAnEntryError extends Error {
        }

        /**
         * The entry is not a folder, but was expected to be a folder.
         */
         class EntryIsNotAFolderError extends Error {
        }

        /**
         * The entry is not a file, but was expected to be.
         */
         class EntryIsNotAFileError extends Error {
        }

        /**
         * The instance was expected to be a file system, but wasn't.
         */
         class NotAFileSystemError extends Error {
        }

        /**
         * The file system is out of space (or quota has been exceeded)
         */
         class OutOfSpaceError extends Error {
        }

        /**
         * The file system revoked permission to complete the requested action.
         */
         class PermissionDeniedError extends Error {
        }

        /**
         * An attempt was made to overwrite an entry without indicating that it was safe to do so via `overwrite: true`.
         */
         class EntryExistsError extends Error {
        }

        /**
         * An attempt was made to write to a file that was opened as read-only.
         */
         class FileIsReadOnlyError extends Error {
        }

        /**
         * Domain is not supported by the current {@link FileSystemProvider} instance.
         */
        class DomainNotSupportedError extends Error {
        }

        /**
         * The file name contains invalid characters
         */
        class InvalidFileNameError extends Error {
        }
    }

    /**
     * This namespace describes the various file type extensions that can used be used in some FS file open methods.
     */
    namespace fileTypes {
        /**
         * Text file extensions
         */
         const text: string[];
        /**
         * Image file extensions
         */
         const images: string[];
        /**
         *
         All file types
         */
         const all: string[];
    }

    /**
     * This namespace describes the file content formats supported in FS methods like read and write.
     */
    namespace formats {
        /**
         * UTF8 File encoding
         */
         const utf8: unique symbol;
        /**
         * Binary file encoding
         */
         const binary: unique symbol;
    }

    /**
     * This namespace describes the file open modes. for eg: open file in read-only or both read-write
     */
    namespace modes {
        /**
         * The file is read-only; attempts to write will fail.
         */
         const readOnly: unique symbol;
        /**
         * The file is read-write.
         */
         const readWrite: unique symbol;
    }

    /**
     * This namespace describes the type of the entry. Whether file or folder etc.
     */
    namespace types {
        /**
         * A file; used when creating an entity
         */
         const file: unique symbol;
        /**
         * A folder; used when creating an entity
         */
         const folder: unique symbol;
    }
}

export = {shell, storage};
