---
title: Integrate Pac-Man Contribution Graph into Your GitHub Profile
date: 2025-02-08 23:23:23
categories: technical
---

Want to add a fun and interactive touch to your GitHub profile? You can integrate a **Pac-Man game** into your contribution graph using GitHub Actions! This method automatically updates your profile every 24 hours with a Pac-Man animation that plays across your contributions. Here's how to set it up:

<!--more-->

<img loading="lazy" src="https://raw.githubusercontent.com/abozanona/abozanona/output/pacman-contribution-graph-dark.svg"/>

## **Step 1: Create a New Repository**

Start by creating a new repository with the **exact same name** as your GitHub username. This special repository is what powers your GitHub profile page.

---

## **Step 2: Set Up GitHub Actions**

Inside your repository, create a **workflow file** to generate and update the Pac-Man game automatically.

- Navigate to your repository
- Create a new directory: `.github/workflows/`
- Inside that folder, create a file called `main.yml`
- Add the following content:

```yaml
name: generate pacman game

on:
  schedule: # Run automatically every 24 hours
    - cron: "0 */24 * * *"
  workflow_dispatch: # Allows manual triggering
  push: # Runs on every push to the main branch
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: generate pacman-contribution-graph.svg
        uses: abozanona/pacman-contribution-graph@main
        with:
          github_user_name: ${{ github.repository_owner }}

      # Push the generated SVG to the output branch
      - name: push pacman-contribution-graph.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This workflow will generate a **Pac-Man contribution graph** and update it automatically every day!

---

## **Step 3: Add the Pac-Man Graph to Your Profile README**

Now, let’s embed the generated graph into your profile.

- In your repository, create a `README.md` file (or edit an existing one).
- Add the following content:

```markdown
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/[USERNAME]/[USERNAME]/output/pacman-contribution-graph-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/[USERNAME]/[USERNAME]/output/pacman-contribution-graph.svg">
  <img alt="pacman contribution graph" src="https://raw.githubusercontent.com/[USERNAME]/[USERNAME]/output/pacman-contribution-graph.svg">
</picture>

_generated with [abozanona/pacman-contribution-graph](https://abozanona.github.io/pacman-contribution-graph/)_
```

📌 **Don't forget to replace `[USERNAME]` with your actual GitHub username!**

---

## **Step 4: Push Your Changes and Enjoy!**

Commit and push your changes to GitHub. Within a few minutes, your profile will display a **Pac-Man game playing across your contribution graph!** 🎮

---

For an example in action, check out [abozanona's GitHub repository](https://github.com/abozanona). Also have a look at the [project's home page](https://abozanona.github.io/pacman-contribution-graph/) to check other ways of integrating the game.

By following 👻these 👻steps,🟩you 👻 can make your 🟡GitHub 🟩profile more 👻fun and 🟩unique.
