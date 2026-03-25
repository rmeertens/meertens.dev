---
title: "My top 3 of machine learning advancements in 2016"
date: "2016-12-31"
slug: "my-top-3-machine-learning-in-2016"
excerpt: "The year 2017 is starting tomorrow, let’s look back at what happened in machine learning last year. In this blogpost I will post my personal top 3 of developments in Artificial Intelligence this year."
original_url: "https://www.pinchofintelligence.com/my-top-3-machine-learning-in-2016/"
---

The year 2017 is starting tomorrow, let’s look back at what happened in machine learning last year. In this blogpost I will post my personal top 3 of developments in Artificial Intelligence this year. 

#### On place 3: beating the world champion of the game Go

Last year Alpha Go beat the human champion in the game of Go. If you would have asked me early 2015 how long it would take to achieve this, I would have guessed at least 5 to 10 more years. That said, the whole world was stunned when the computer won 4-1 against Lee Sedol.

The big problem for computers playing Go was the amount of possible moves. To reduce the search space Alpha Go only expands “promising” moves. Determining how promising a move is a difficult problem, as sometimes a single move can have an effect many turns into the game. Alpha Go uses neural networks to determine whether a board setup is good or bad. By training on a large database of games the network learned what boards would lead to a win, and thus which move would be good to play.

More information about AlphaGo can be found in the paper “[Better Computer Go Player with Neural Network and Long-term Prediction](https://arxiv.org/abs/1511.06410)“.

#### On place 2: navigating forest trails with a drone

Following a path with a drone is a difficult problem. Drones only have a low amount of on-board processing power, and a low amount of time to compute what action to perform. While trying to follow a forest trail you will encounter a lot of situations which you as a programmer did not foresee. 

A research group in Zurich decided to approach this problem by simply letting the drone ask itself: “should I go left, right, or straight ahead based on my front camera image”? They needed two things to solve this problem: 

  * A function that, based on an image, decides what direction to go in.
  * A set of labeled images, telling you what direction to take.



They wanted to train the function using convolutional neural networks. Unfortunately, training a neural network requires a lot of data. To generate this data they walked over a forest trail with 3 camera’s strapped on their head: one pointing left, one right, and one in the center of their head. Images taken from the left and right cameras meant that the drone had to turn. Images from the center camera mean that the drone can fly straight ahead. With this smart data-gathering technique they were able to gather enough images that the determine-direction function could be trained well enough to work on a drone. 

[A video of their research can be found on Youtube](https://www.youtube.com/watch?v=umRdt3zGgpU), and more can be read in the paper “[Quadcopter Navigation in the Forest using Deep Neural Networks](http://rpg.ifi.uzh.ch/docs/RAL16_Giusti.pdf)“.

#### On place 1: zero shot translation 

My personal favourite paper at this moment is Google’s Zero shot translation paper. For years statistical machine translation has been the best way of translating test. Unfortunately, the translation quality was nowhere near that of human translators. This year many researchers were able to improve computer translations using neural networks. 

With this translation method you have multiple neural networks. One network, the “encoder” reads a sentence word by word to produce a “context vector”. Another network, the “decoder” uses this context vector to produce a sentence in another language. People already discovered that using multiple encoders and multiple encoders helped with the translation quality. This forces the encoders and decoders to be as generic as possible, thus representing information in the best way. 

With Zero shot translation three encoders are used and three decoders are used: English, Japanese and Korean. During training Japanese to Korean is never tested, or Korean to Japanese is never tested. The networks DO have to learn the languages to represent (for example) Korean to English and English to Japanese. It turns out that they now also are able to translate from Korean to Japanese, although they never saw this language pair before. 

I explained this [in more detail on my blog a month ago](https://www.pinchofintelligence.com/explaining-googles-zero-shot-translation/). More information [can be found on Google’s research blog](https://research.googleblog.com/2016/11/zero-shot-translation-with-googles.html).

Share List

### Facebook Comments ()

### G+ Comments ()