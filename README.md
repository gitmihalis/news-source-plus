# News Source Plus

NSP converts a `.docx` file, like the ones created by _Microsoft Word_ to HTML. It uses a library that relies on semantic information in the document, and ignores other details like tracked changes or comments.


The conversion escapes common *special characters* like *&trade;* and *&eacute;* which aren't supported in HTML 4.01 (iso-8858-1).

To convert documents, just open a .docx file from within the app and copy or save the converted HTML code to `.html`.

NSP also keeps recently copied items in a quick access menu accessable from the taskbar.





## Installation

First, clone the repo, then

`npm install`

`npm start`

## Distribution

Use *electron-packager* to build and distribute the native desktop client!


`electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]`

Allowed platform values: linux, win32, darwin, mas, all









