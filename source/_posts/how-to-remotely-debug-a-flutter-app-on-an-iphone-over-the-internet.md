---
title: How to Remotely Debug a Flutter App on an iPhone Over the Internet
date: 2026-02-13 23:23:23
categories: technical
---

I was working on a Flutter project for a friend in Jordan when we hit an issue that I could not reproduce on my side. Logs were not enough, and I needed to debug the app directly on his iPhone.

<!--more-->

The main problem was that iPhone debugging is normally straightforward only when the phone is physically connected to your Mac, and in practice the setup is built around devices being on the same local environment. Since my friend was in another country, I had to recreate that setup over the internet.

## The Goal

I needed three things:

1. A way to put my Mac and my friend's laptop on the same private network.
2. A way to make his physically connected iPhone appear as a USB device on my Mac.
3. A way to make Xcode and Flutter recognize that remote iPhone so I could run and debug the app.

The tools I used were:

- [Tailscale](https://tailscale.com/) for the network layer.
- [VirtualHere USB Server](https://www.virtualhere.com/usb_server_software) on my friend's side.
- [VirtualHere USB Client](https://www.virtualhere.com/usb_client_software) on my side.
- Xcode on both Macs.

## Step 1: Put Both Machines on the Same Network With Tailscale

The first challenge was networking. I needed my Mac and my friend's laptop to reach each other privately over the internet as if they were on the same trusted network.

That is where [Tailscale](https://tailscale.com/) helped. It creates a private mesh VPN between devices and is very easy to set up. For this use case, that was exactly what I needed.

Another nice detail is that Tailscale has a free personal plan, which is enough for connecting your own devices or a small number of machines for this kind of debugging session.

Once Tailscale was installed and both Macs were connected to the same tailnet, the network problem was basically solved.

## Step 2: Share the iPhone USB Connection Over the Internet

Being on the same network was not enough on its own. The iPhone was still physically connected to my friend's laptop, not mine.

To solve that, I used [VirtualHere](https://www.virtualhere.com/).

The setup is simple:

- Install the **server** on the machine that has the iPhone physically connected to it. In my case, that was my friend's laptop.
- Install the **client** on your own machine. In my case, that was my Mac.

After that, the iPhone can be exposed from the remote laptop to your local Mac as if it were plugged in locally.

This was the missing piece. Tailscale handled the secure network path, and VirtualHere handled the USB forwarding.

## Step 3: Enable Developer Mode on the iPhone

Before trying to run anything from Xcode or Flutter, make sure the target iPhone has **Developer Mode** enabled.

Without that, the device may appear but you still will not be able to properly deploy and debug a development build.

Also make sure the usual trust prompts are accepted:

- Trust the computer on the iPhone.
- Trust the iPhone from the Mac that is physically connected to it.

## Step 4: Install Xcode on Both Macs

This part is important.

I needed Xcode on:

- my Mac, where I wanted to run Flutter and attach the debugger
- my friend's laptop, because that is the machine physically connected to the iPhone for the first-time setup and pairing steps

When an iPhone is connected to Xcode for the first time, Xcode may spend a long time preparing the device and downloading or generating the required support files. Doing that remotely over the internet can be painfully slow.

What worked better for me was this:

1. Open Xcode on my friend's laptop while the iPhone is connected there.
2. Let Xcode finish the initial device preparation on his side.
3. Copy the generated device support files from his machine.
4. Send them to me.
5. Extract them into the same location on my Mac.

The directory I needed was:

```bash
~/Library/Developer/Xcode/iOS DeviceSupport/
```

Compressing the relevant folder inside that directory and sending it over was much faster than waiting for my Mac to regenerate everything remotely.

It is also a good idea to keep the Xcode version aligned on both Macs to reduce compatibility issues.

## Step 5: Connect to the Device From Your Mac

At this point, the flow looked like this:

1. The iPhone was connected by cable to my friend's laptop.
2. My friend's laptop was running the VirtualHere USB server.
3. My Mac was running the VirtualHere USB client.
4. Both Macs were connected through Tailscale.

Once the VirtualHere client attached the remote iPhone on my Mac, Xcode and Flutter could see it.

## Step 6: Monitor Installation Progress in Xcode

If app installation feels slow or stuck, you can trace progress directly from Xcode logs.

In recent Xcode versions, open:

`Window > Devices and Simulators`

Then:

1. Select the physical iPhone from the left panel.
2. Open the device console/log view.
3. Watch installation-related logs in real time while deploying.

You can see detailed progress messages like this:

```text
-[IXAppInstallCoordinator _clientDelegate_didUpdateProgress:forPhase:overallProgress:]: <IXInitiatingAppInstallCoordinator<0x827014e00> identity:[com.example.app/XXXXXXXX-516C-4EB6-A17F-XXXXXXXXXXXX/[system-defined]] uuid:XXXXXXXX-3A3D-44F7-9DB5-XXXXXXXXXXXX creator:InstallCoordination Proxy>: Got did update progress delegate with percentComplete 51.000000 phase IXCoordinatorProgressPhaseLoading overallProgress 30.600000
```

These logs are useful to confirm that installation is still moving forward (for example, loading, staging, or validating) instead of actually hanging.

To confirm that Flutter detected the device, I used:

```bash
flutter devices
```

Then I ran the app on that specific device using its identifier:

```bash
flutter run -d <device-id>
```

If you want the exact identifier first, `flutter devices` will print it for you.

## What This Setup Actually Solved

This setup gave me something much better than logs: a real debugging environment on the exact phone that had the issue.

That mattered because the bug was not reproducible anywhere else. Once I could run the app directly on my friend's iPhone, I could inspect the behavior properly instead of guessing from screenshots and log messages.

## Final Notes

If you need to debug a Flutter app on a remote iPhone over the internet, the stack that worked for me was:

- Tailscale to connect both Macs privately.
- VirtualHere to forward the iPhone's USB connection.
- Xcode on both sides for the initial device preparation.
- Flutter commands on my Mac to run the app on the remote iPhone.

It is not the simplest setup, but when the affected user is far away and the bug only happens on their real device, it can save a lot of time.