# Tagger

## Introduction

Tagger is a way to organize your music library that gives you the freedom to modify the filesystem hierarchy without breaking applications that require you to keep file and folder names static over time.

It creates a flat folder with GUID-named hardlinks to your original files. You can then import the files into whichever music library software you like.

Before creating a hardlink, it checks if one already exists with the same inode. If it does, then a new hardlink is not created.