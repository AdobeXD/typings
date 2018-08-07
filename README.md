# typings
Typings for Adobe XD API Surfaces

## Usage

Basically, you can use the typings by simply copying all the files (primarily the ```jsconfig.json``` file and the ```types``` folder) into your plugin's folder.

The usage may differ depending on the editor you use, so here is a small guide on how to use them in the editors / IDEs I tested with:
#### The initial situation:

To make it easier to describe how to use the plugins, here is a sample folder structure we'll use in the following examples:

- Adobe XD Plugins folder (```plugins```)
  - com.me.sampleplugin
    - main.js
    - manifest.json
  - \[…]

#### Common (all editors and IDEs)

First of all, you need to copy the ```types```-folder and the ```jsconfig.json```-file into your plugin's root folder (in our case, ```com.me.sampleplugin```).

**After that, your file structure should look something like this:**

 - Adobe XD Plugins folder (```plugins```)
   - ```com.me.sampleplugin```
     - ```types```
       - ```clipboard.d.ts```
       - ```commands.d.ts```
       - \[…]
     - ```jsconfig.json```
     - ```main.js```
     - ```manifest.json```
   - \[…]

Now, the main part is done. Depending on the IDE or editor you use, there may be a few more steps required:

#### Visual Studio Code

*(tested in version 1.25.1)*

In VSCode, you're already done and ready to get some auto-completion-goodness :wink:

#### Jetbrains WebStorm

*(tested in version 2018.2)*

To get autocompletion to work in WebStorm, you need to complete the following steps:

1. Mark ```types```-folder as *Resource Root* (right-click ```types``` => ```Mark Directory as``` => ```Resource Root```)
2. To disable all the HTML-DOM completion stuff (basically all the things you don't need for XD plugins), open the ```Preferences```, go to ```Languages and Frameworks``` => ```JavaScript``` => ```Libraries``` and uncheck all checkboxes (i.e. in most cases ```HTML```) and click ```Apply```
3. All ready now! Enjoy all the autocompletion-goodness WebStorm can provide :tada:.

#### Other editors and/or IDEs

If you find a way to get autocompletion working in other editors (or can confirm that it works without any further work for an editor), please feel free to share it so that I can incorporate more guides in this ```README.md```.
