---
title: How to search for patterns with new line in VSCode
date: 2024-07-5 23:23:23
categories: hack
---

As a developer, you often come across the need to search and remove specific patterns in your code. Recently, I faced a situation where I needed to find and remove a pattern that started with a specific word and ended with another.

<!--more-->

I had a codebase where I needed to remove all blocks of text that started with the word "BLOCK" and ended with the word "ENDBLOCK". These blocks could span multiple lines, which added to the complexity. Here's an example of what the pattern looked like:

```plaintext
Some code here
BLOCK
Some other code here
Some more code here
ENDBLOCK
Some other more code here
BLOCK
Another some other code here
Another some more code here
ENDBLOCK
```

I needed a way to remove everything between "BLOCK" and "ENDBLOCK", including "BLOCK" and "ENDBLOCK" themselves.

For this task, I tried using different regex patterns to do that in the begining, and only this one worked with me. I used the following regular expression:

```regex
BLOCK[\s\S\r]+?ENDBLOCK
```

Let's break down what this regex does:

- `BLOCK`: Matches the literal word "BLOCK".
- `[\s\S\r]+?`: This part is the key. Let's dissect it further:
  - `[\s\S\r]`: This character class matches any whitespace (`\s`), any non-whitespace (`\S`), and any carriage return (`\r`). Essentially, it matches any character including newlines.
  - `+?`: This is a lazy quantifier. It matches as few characters as possible until it finds the next part of the pattern, which is "ENDBLOCK". Without the `?`, it would be greedy and match as much as possible, which could result in unwanted matches.
- `ENDBLOCK`: Matches the literal word "ENDBLOCK".

After running the replace operation, all blocks of text between "BLOCK" and "ENDBLOCK", including the markers themselves, were removed from my code. This regex solution saved me a tremendous amount of time and manual effort.

## Example Before and After

**Before:**

```plaintext
Some code here
BLOCK
Some other code here
Some more code here
ENDBLOCK
Some other more code here
BLOCK
Another some other code here
Another some more code here
ENDBLOCK
```

**After:**

```plaintext
Some code here
Some other more code here
```
