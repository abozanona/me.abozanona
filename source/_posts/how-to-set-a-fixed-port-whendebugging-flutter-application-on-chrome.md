---
title: How to Set a Fixed Port When Debugging Your Flutter Application
date: 2025-09-20 23:23:23
categories: technical
---

I’ve been working on a Flutter mobile application that connects to an API. At the beginning, I decided to run the app on Chrome instead of debugging directly on an Android or iOS device because it’s simply faster to do so.

But then I faced an annoying issue: whenever I launched the app by opening the `main.dart` file and clicking on the green debug button, the app would run on a **different port** each time. This caused **CORS issues** whenever my Dart app sent requests to the API, since the origin kept changing.

So I needed a way to always run the app on the same port.

<!--more-->

---

## First Attempt: Running With `flutter run`

The easiest way I found was to run this command from the terminal:

```bash
flutter run -d chrome --web-port=51996
```

This works, and the app does run on the fixed port `51996`.

But there’s a problem: if you run it this way, you **can’t attach the debugger directly**.

To fix that, I had to add a custom configuration to my `.vscode/launch.json` file:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Flutter Web Attach",
      "request": "attach",
      "type": "dart",
      "deviceId": "chrome",
      "webPort": 51996
    }
  ]
}
```

Then, the flow became:

1. Run the command from the terminal.
2. Open the Debug sidebar in VS Code.
3. Select the **“Flutter Web Attach”** configuration.
4. Start debugging to attach the debugger to the running app in Chrome on that fixed port.

This works fine, but it wasn’t very convenient for me. I wanted something simpler.

---

## Second Attempt: Using `dart.flutterAdditionalArgs`

Next, I found that you can add this setting in your `.vscode/settings.json`:

```json
"dart.flutterAdditionalArgs": ["--web-port=51996"]
```

This automatically adds the `--web-port` argument every time a Dart command is run.

At first, this looked perfect. But then I started getting an error each time I opened VS Code:

```
The Flutter Daemon failed to start.
```

The reason is that `dart.flutterAdditionalArgs` applies not only when you run your app, but also when **any Dart process** starts — including the **Flutter Daemon**. Since the daemon wasn’t expecting that argument, it failed to start.

---

## The Final (and Best) Solution: `dart.flutterRunAdditionalArgs`

After some searching, I found a better setting that only applies when you actually run your application:

```json
"dart.flutterRunAdditionalArgs": ["--web-port=51996"]
```

This was exactly what I needed. With this setting:

* I don’t need to add custom launch configurations.
* I can still use the green debug button in VS Code.
* My app always runs on the same port.
* No more CORS issues.
* And no more Flutter Daemon errors.

---

## Conclusion

If you’re running a Flutter web app in Chrome during development and want to avoid CORS issues by sticking to the same port, just add this to your `.vscode/settings.json`:

```json
"dart.flutterRunAdditionalArgs": ["--web-port=51996"]
```

That’s it. Clean, simple, and you still get the debugger attached automatically.
