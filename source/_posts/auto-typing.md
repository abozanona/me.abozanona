---
title: Automatic typing
date: 2020-12-1 23:23:23
categories: hack
---

I forget a lot of things, and I'm a lazy person to save everything.

In my job, I'm required to enter a serial code everything I need to access a specific feature in the system. So instead of memorizing the serial code and write it down everything I want to access that feature in the system, I have decided to write a small code that will do the job for me. <!--more-->

I wrote a `bat` script that will simulate keys pressing on the keyboard and enter the serial number. The serial number is splitter into two parts, and it should be entered in two textboxes, and that's what I told the script to do for me.

I created a new file `auto.bat`, and added the following script to it

```bat
@if (@CodeSection == @Batch) @then
@echo off
set SendKeys=CScript //nologo //E:JScript "%~F0"
rem start "" /B cmd
ping -n 1 -w 1 127.0.0.1 > NUL
%SendKeys% "%%{TAB}"
ping -n 1 -w 1 127.0.0.1 > NUL
%SendKeys% "SERIAL-CODE-PART-ONE{TAB}"
ping -n 1 -w 1 127.0.0.1 > NUL
%SendKeys% "SERIAL-CODE-PART-TWO{ENTER}"
goto :EOF
@end
// JScript section
var WshShell = WScript.CreateObject("WScript.Shell");
WshShell.SendKeys(WScript.Arguments(0));
```

After that, I create a new shortcut for that file, by going to desktop, clicking on the right mouse button, selecting Shortcut, and entering `auto.bat` full path.

Then I added a keyboard shortcut `Ctrl + Shift + Alt + P` to run the script by right-clicking on the shortcut file, going to Shortcut tap, and adding a shortcut key.

Now, whenever I want to access the system, I press the magical buttons `Ctrl + Shift + Alt + P` to ask my computer to enter the serial code for me.