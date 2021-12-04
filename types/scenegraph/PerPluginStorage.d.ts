declare module 'scenegraph' {
    /**
     * [PerPluginStorage on Adobe.io](https://www.adobe.io/xd/uxp/develop/reference/PerPluginStorage/)
     * 
     * @since XD 29
     */
    export interface PerPluginStorage {

        /**
         * 
         */
        getAll(): Record<string, Record<string, string>>

        /**
         *
         */
        getForPluginId(pluginId: string): Record<string, string>

        /**
         *
         */
        keys(pluginId: string): string[]

        /**
         *
         */
        getItem(pluginId: string, key: string): string | undefined

        /**
         *
         */
        setItem(pluginId: string, key: string, value?: string): void

        /**
         *
         */
        removeItem(pluginId: string, key: string): void

        /**
         *
         */
        toString(): string

        /**
         *
         */
        toJSON(): Object

    }
}