# Date Folders

### installation

    npm i -g date-folders

Yeah ok... well, have you ever had a folder filled with images? Do you like the way many photo apps structure them like:

    .
    └── 2017
        └── 01
        |   └── 15
        |       └── IMG0001.DNG
        └── 05
            └── 07
                └── IMG0002.DNG

Well I do! But I hate being dependant on a friggin' app to do it when all I wanna do is to quickly structure my files before sending them to my backup location.

Just cd into the flat boring folder with shitloads of files and hit `dfold`. THE FILES WILL NOT BE MOVED! However the folders will be created and following will be printed in your console:

    "IMG0001.DNG" "2017/01/15/"
    "IMG0002.DNG" "2017/05/07/"

This gives you a nicely formatted output to pipe to xargs or whatever. You will also see what files you have. Maybe you didn't think it through at all. And most important of all: You can't blame me for fucking up you wonderful wedding pics.

If you want to actually move the files as well:

    dfold --execute
