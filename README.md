# Adobe XD Plugin API typings
Typings for Adobe XD API Surfaces
![typings-supported autocompletion features in JetBrains WebStorm](image.png)

Detailed instructions for using these type declarations to get autocompletion features in editors and IDEs can be found in the [repository's wiki](https://github.com/AdobeXD/typings/wiki/Autocompletion-in-editors-and-IDEs).

## Download
The best option to download the typings is to download the latest release from <https://github.com/AdobeXD/typings/releases>.

## Getting started
These Type Declaration files provide your IDE (e.g. Visual Studio Code or WebStorm) with information about the XD API surface, enabling type checking, autocomplete suggestions, and more. To get started, simply copy the following resources from this repo into your project's main directory:

- The `jsconfig.json` file.
- The `types` directory.

Your IDE may require further setup to take full advantage of the types. Please see this [wiki page](https://github.com/AdobeXD/typings/wiki/Autocompletion-in-editors-and-IDEs#editor--ide-specific-instructions) for more.

The Type Declaration files also allow you to use TypeScript instead of JavaScript for your plugin development. For that, you'll have to copy the `types` folder to your project and include it in the `paths` of your `tsconfig.json`:
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
These type declarations track the contents of the official documentation. If an issue with the type declarations stems from an issue with the official documentation, then the type declaration files will be fixed once the issue is addressed in the documentation. This is intentional so as to keep the type declarations both maintainable and in sync with the documentation.

A few notable exceptions include:
- The [`application.import()`](https://www.adobe.io/xd/uxp/develop/reference/application/#import) function cannot be declared because `import` is a reserved TypeScript keyword (not sure if this can be fixed). It is declared as `application.importWrong()` instead.
- To avoid ambiguity with the *DOM* `Selection` type, the interface [`Selection`](https://www.adobe.io/xd/uxp/develop/reference/selection/) is also provided as an alias `XDSelection` and exported from the 'scenegraph' module

## Original Documentation Links
- [New Adobe.io XD Docs](https://www.adobe.io/xd/uxp/develop/reference/xd-index/)
- [New Adobe.io XD Docs GitHub Repo](https://github.com/AdobeDocs/uxp-xd/tree/main/src/pages/develop/reference)
- [Adobe XD API Updates and Changelog](https://www.adobe.io/xd/uxp/develop/changelog/)
- [Original Adobe XD Platform Docs](https://adobexdplatform.com/plugin-docs/reference/xd-index.html)
