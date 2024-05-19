---
title: Working on Petmety
date: 2024-04-01 23:23:23
categories: project
---

Petmety is a Chrome extension and mobile app where you can raise your virtual companion. Petmety is intended to be a virtual pet that users can nurture and care for. You can feed it, play with it, take care of it, teach it new tricks, and also arrange playdates with other users' virtual pets in a virtual sanctuary.

<!--more-->

I've started working on Petmety a month ago, and I've been progressing at a slow pace in my free time. There are many features I plan to develop in the app like:
- Interacting with your pet by clicking, dragging, and feeding it.
- Customizing your pet with different skins and motions.
- Future plans to support Android devices for on-the-go companionship.
- Adding support for more pets to choose from.
- Expanding the collection of skins and motions for existing pets.
- Implementing an edge detector so pets can walk on web pages.
- Incorporating AI to generate new skins and motions based on online videos.
- Introducing various activities for you and your pet to engage in.
- Adding sounds to enhance the immersive experience.
- Establishing a store for additional pet accessories and features.

To accomplish all of those features, I've worked with different technology stacks (TS for the Chrome extension, Flutter for Android & iOS apps, & machine learning for some of the important features in the project). I've built the base code for the Chrome extension and displayed the virtual pet on the screen. The virtual pet can perform some basic movements on the screen like walking on the screen and jumping from one place to another.

The most important thing in Petmety is the pet character and animation. That's why, after comparing different animation engines, I started working with Spine, an animation tool that focuses specifically on 2D animation for games. I contracted with a freelancer to build a sample cat animation that I can use in my project, then started learning how to use Spine and later added more animations to the cat character.

I've also contracted with a UI/UX freelancer to create the UI for Petmety on Figma so I can apply it later to the app. The designs are not finished yet, and I will share them later on the GitHub repo when they are finished. What I did so far is drawing the sketches for how I think the app will look like, and shared the sketches with the freelancer so he can build the UI based on those sketches.

Since I don't have any experience in machine learning, I'm also planning to contract with a machine learning developer for building the base code for features like cat body swap and cat poses tracking, which are two features I need to build two important features in Petmety: the ability for the pet to learn new tricks online, and the ability for the user to build his own virtual pet using a picture for a real one.

I've already posted a project on some freelancing websites for the cat body swap, and I've received some offers that I'm still studying with a friend of mine who has some experience with machine learning. There are three approaches I'm studying right now and discussing with my friend and the freelancers to accomplish that.
- [DeepFaceLive](https://github.com/iperov/DeepFaceLive): This seems like a complicated library to use, and it might not be flexible to apply later with pets other than cats. The idea will be to make the model swap the whole bodies instead of only swapping the face.
- [FUNIT](https://github.com/nvlabs/FUNIT): This seems to do what we exactly need, swapping the face of a pet. But I'm still not sure if it will work, we still need to test it.
- [Try On Diffusion](https://github.com/tryonlabs/tryondiffusion/): It is very similar to the problem we are trying to solve here; there we are generating images by parsing new clothes onto a model, for our project it is the same idea but for cats. The library is based on [this paper](https://openaccess.thecvf.com/content/CVPR2023/papers/Zhu_TryOnDiffusion_A_Tale_of_Two_UNets_CVPR_2023_paper.pdf).

Even though I started working on developing Petmety for Chrome extensions before working on developing it for Android & iOS. I believe that Petmety is meant to be a mobile app more than a Chrome extension since everyone uses their mobile more than any other device they have. I've already started working on Petmety for Android; what I'm doing is drawing a View that contains the virtual pet inside it on top of the screen. I've already done that in the GitHub repo in the `android_app` folder.

Building Petmety for iOS is more tricky. iOS doesn't allow applications to draw on top of other applications; that's why the plan is to use PiP for showing the pet on the screen. I realize that's not as reliable as drawing the pet on top of the screen, but this is the best that I can think of right now.

Petmety will be free, but there are some features in the game that you can buy with Petmety coins. All money earned from this game will go to help a cat in need in real life. One of the potential plans in the future I'm thinking of is to contract with a pet sanctuary and give all the earnings of Petmety to them. You can also contribute to the [Petmety app repo](https://github.com/abozanona/petmety); it's open source. You can also share your ideas with me if you have any idea you think I should add to the app. You can also support me by [buying me a cup of coffee ☕](https://www.buymeacoffee.com/abozanona).