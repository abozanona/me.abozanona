---
title: Executing JavaScript in Shared Hosting (cPanel) Using PHP
date: 2025-03-31 23:23:23
categories: technical
---

In some cPanel environments where your website is hosted on shared hosting, it can be **very difficult** to find a way to evaluate JavaScript. In this post, I’ll share a method I discovered that allows you to execute JS on a shared host directly from PHP code.

<!--more-->

The command you are looking for is `js`.

If you run `js -v` in the terminal from cpanel dashboard, you’ll see this output:

```bash
$ js -v
JavaScript-C 1.8.5 2011-03-31
usage: js [options] [scriptfile] [scriptarg...]
Options:
...
```

Even if the cPanel admin doesn’t allow you to install Node.js or another JS engine, the `js` command is usually available.

The command is **very limited**—it doesn’t support modern JavaScript syntax. It appears to be based on an older version of JavaScript (likely ES5 or earlier). For example:

- Missing `string.replaceAll()`
- No `console.log()`
- No support for `async` functions

To work around this, you’ll need to:
1. Manually implement missing features.
2. Rewrite parts of your code to be compatible.

The biggest challenge is retrieving the output of your JS code. Since `console.log()` doesn’t work, I found an unconventional solution: **throwing an error** with the result.

When you throw an error, it prints to the console, and you can capture it from PHP.

Here’s a working example:

```php
function executeJs($jsCode) {
    // Add missing functionality
    $replaceAllString = "
        String.prototype.replaceAll = function(match, replace) {
            return this.replace(new RegExp(match, 'g'), function() { return replace });
        }
    ";

    // Combine with user's JS code
    $jsCode = $replaceAllString . $jsCode;

    // Create a temporary file
    $tempFile = tmpfile();
    $metaData = stream_get_meta_data($tempFile);
    $tmpFilename = $metaData['uri'];
    fwrite($tempFile, $jsCode);

    // Execute JS and capture output
    $cmd = "/bin/js -f " . escapeshellarg($tmpFilename) . " 2>&1";
    $result = shell_exec($cmd);

    // Clean up the output
    $result = str_replace("uncaught exception: ", "", $result);
    return trim($result);
}
```

This method isn’t perfect, but it’s a useful workaround when you’re restricted to shared hosting.