# Adobe XD Plugin API typings
Typings for Adobe XD API Surfaces
![typings-supported autocompletion features in JetBrains WebStorm](image.png)

Detailed instructions for using these type definitions to get autocompletion features in editors and IDEs can be found in the [repository's wiki](https://github.com/AdobeXD/typings/wiki/Autocompletion-in-editors-and-IDEs).

## Download
The best option to download the typings is to download the latest release from <https://github.com/AdobeXD/typings/releases>.

## Getting started
These Type Declaration files provide your IDE (e.g. Visual Studio Code or WebStorm) with information about the XD API surface, enabling type checking, autocomplete suggestions, and more. To get started, simply copy the following resources from this repo into your project's main directory:

- The jsconfig.json file.
- The types directory.

Your IDE may require further setup to take full advantage of the types. Please see this [wiki page](https://github.com/AdobeXD/typings/wiki/Autocompletion-in-editors-and-IDEs) for more.

You can also use the typings to use TypeScript for your plugin development. For that, you'll have to copy the `types` folder to your project and include it in `the `paths` of your `tsconfig.json`:
```json
{
  "paths": {
    "*": [
      "types/*"
    ]
  }
}
```

You may also take a look at the `tsconfig.json` file contained in this repository for reference.

## One last thing
This, while being a part of the Adobe XD CC GitHub organization, is a community-driven project. This means that all changes get implemented manually and may therefore take some time. It should also be noted that the attempt (to keep the project maintainable in the contributors' free time) is to keep this in sync with the official [plugin API documentation](https://adobexdplatform.com/plugin-docs/). 

Should the docs be slightly mistaken in some place, this is an issue with the docs and we'll not fix it independently in the typings, moving it out-of-sync with the docs, as this would make maintainability unfeasible.
