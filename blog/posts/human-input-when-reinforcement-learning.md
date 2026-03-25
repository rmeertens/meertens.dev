---
title: "BNAIC 2014: using human input to improve reinforcement learning"
date: "2014-11-25"
slug: "human-input-when-reinforcement-learning"
excerpt: "Using human input can be valuable for reinforcement learning. Imagine the difference between having to learn something yourself, and having a mentor hold your hand while showing you how a task is..."
original_url: "https://www.pinchofintelligence.com/human-input-when-reinforcement-learning/"
---

Using human input can be valuable for reinforcement learning. Imagine the difference between having to learn something yourself, and having a mentor hold your hand while showing you how a task is performed.

In the real world humans are able to generalize their knowledge: if I die by walking into an enemy from the left, I probably also die if I walk into him from the right. Even better: if hitting an enemy is bad if I’m a big Mario, it’s probably also bad if I hit him as a small or Fire Mario.Unfortunately, this is not something reinforcement learning is good at.

Normally, when encountering a new situation, reinforcement learning takes a random action. In the case of Mario, where there are many states, it is easy to get into a “new” situation. It can take a long time to AND encounter all situations, AND take the “correct” action in this situation.

This is where human knowledge can come in. Human players are able to learn fast, and thus “guide” Mario through a series of correct actions. Mario still teaches himself, calculating if an action was really good. But: by visiting the correct states and performing the correct actions he learns faster.

![mariogame](http://pinchofintelligence.com/wp-content/uploads/2014/11/mariogame1-300x235.png).

At the BNAIC 2014 I set up a demonstration to demonstrate this principle. The Mario AI benchmark is a clone of the classic game Super Mario Bros. The gameplay consists of moving Mario through the level while jumping (and possibly throwing fireballs). The main goal of the game is to reach the end of the level while gathering as much points as possible. The game asks the player to give instructions to Mario (walk left, walk right, jump, fire) in each frame, and displays the result of the action to the user each resulting frame.

The demonstration uses the Mario AI framework and a phone application that all interested visitors could download. This allowed a great amount of people to give instructions to Mario at the moment they believe it is necessary to give instructions. On a screen the game was visible to all by-standing participants.

[![best-resolution-app](http://pinchofintelligence.com/wp-content/uploads/2014/11/best-resolution-app-300x153.png)](http://pinchofintelligence.com/wp-content/uploads/2014/11/best-resolution-app.png)

Share List

#