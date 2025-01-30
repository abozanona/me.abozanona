---
title: Pacman contribution graph
date: 2025-01-30 23:23:23
categories: project
---

Have you ever looked at your GitLab or GitHub contribution graph and thought, *“This could be... more exciting?”* I know I have. I wanted a fun and creative way to visualize my contributions, especially on GitLab, where I store all my private projects. Unfortunately, I couldn’t find anything online that did the trick.

<!--more-->

Then, I stumbled upon **snk** (check it out [here](https://github.com/Platane/snk/)). It's a super cool project that turns your GitHub contribution graph into a snake game. You simply provide your GitHub username, and it generates an image of a snake weaving its way through your contributions. Awesome, right? But there was one problem: **snk only supports GitHub.** Since I primarily use GitLab for private projects, I needed something similar, but there wasn’t a solution out there. So, I decided to create my own.

---

## Introducing the Pac-Man Contribution Game 🎮

Instead of a snake, I thought, *why not Pac-Man?* Pac-Man is iconic, dynamic, and just plain fun. I developed a game that overlays a Pac-Man grid on your GitLab or GitHub contribution history. Here’s how it works:

- The game generates your contribution grid and populates it with **Pac-Man and four ghosts**. 
- Pac-Man’s mission? **Clear all the cells** on the grid. 
- The ghosts? **Chasing Pac-Man** to stop him!
- If Pac-Man eats enough cells, he gets a power-up and can turn the tables on the ghosts, making them flee.
- The game ends when Pac-Man clears the entire grid.

It’s a fully automated experience — no user input required! Just sit back and watch as Pac-Man chomps his way through your contributions.  

---

## How It Works

The game pulls your commit history from **GitHub** or **GitLab** and translates it into a contribution grid. Then, it places Pac-Man and the ghosts on the grid. 

There are **two export options** for the game:  

1. **HTML Canvas**: Perfect for running the game in your browser.  
2. **Animated SVG**: Downloadable and sharable for use anywhere.  

You can try the game for yourself right now: [Pac-Man Contribution Game Demo](https://abozanona.github.io/pacman-contribution-graph/).  

This is how canvas export looks like:

<canvas id="pacmancanvas" style="max-width:100%"></canvas>
<script type="module">
import { renderContributions } from 'https://cdn.jsdelivr.net/gh/abozanona/pacman-contribution-graph@1.0.1/dist/pacman-contribution-graph.min.js';
const canvas = document.getElementById('pacmancanvas');
const initializeGameCanvas = () =>
    renderContributions({
        platform: "gitlab",
        username: "abozanona",
        canvas: canvas,
        output: 'canvas',
        gameOverCallback: () => {
            console.log('GAME OVER');
            setTimeout(() => {
                console.log('Restarting');
                initializeGameCanvas();
            }, 3000);
        }
    });
initializeGameCanvas();
</script>

And this is how SVG export looks like:

![](https://cdn.jsdelivr.net/gh/abozanona/abozanona.me/images/projects/pacman/pacman.svg)

---

## What’s Next?

Of course, the project isn’t perfect (yet). Here are a few things I’m working on improving:  

- **Smarter movement algorithms**: Currently, the sprites use basic algorithms. I want them to behave more like the real Pac-Man game.  
- **Better sprite design**: Pac-Man’s mouth animation, ghost shapes, and collision effects could all use some love.  
- **Fixing SVG issues**: The exported SVG occasionally has glitches with sprite movement and design that need smoothing out. And Pac-Man never goes out of power-up mode.

I’m also planning to add some exciting new features, like the ability to integrate the game directly into your GitHub profile — similar to how the snk game works.  

---

## Why I Built This

At its core, this project is about creativity and having fun with your developer tools. Contribution graphs are a snapshot of your coding journey, and turning them into a playable game adds a unique twist. Whether you’re showcasing your coding streak or just having a laugh, I hope this Pac-Man game brings some joy to your day.

Check out the [project repository](https://github.com/abozanona/pacman-contribution-graph/) for more details and to see how it works. Feedback, ideas, and contributions are always welcome!  
