---
title: "Point and Snap for my smart home"
date: "2022-05-05"
slug: "point-and-snap-for-my-smart-home"
excerpt: "Having smart devices in your home is fun, but turning them off is still a hassle. Taking an app, talking to Alexa, or pressing a button all takes too much time. Why can’t we in 2022 just point at a..."
original_url: "https://www.pinchofintelligence.com/point-and-snap-for-my-smart-home/"
thumbnail: "https://www.pinchofintelligence.com/wp-content/uploads/2022/05/Screenshot-2022-05-05-at-21.03.47-1024x674.jpg"
---

Having smart devices in your home is fun, but turning them off is still a hassle. Taking an app, talking to Alexa, or pressing a button all takes too much time. Why can’t we in 2022 just point at a device and snap our fingers to turn things on and off? I decided to fix it in this weekend project!

Here is a video of the finished project:

### The setup

My goal was to be able to point at any of my ‘smart devices’ in my living room, and snap my fingers to turn them on or off. Eventually I managed to create a solution using the following architecture and tools:

  * A webcam to get a camera feed
  * An algorithm to get my body pose from a single image
  * An algorithm to, given a body pose, predict what I’m pointing at
  * A microphone to get audio input
  * An algorithm to determine whether I’m snapping or not
  * Node-RED to connect all smart devices in my home, and get the output from the other algorithms



This project heavily relies on Google’s TeachableMachine (https://teachablemachine.withgoogle.com/). They allow you to easily collect training data and train a simple algorithm on top of it. Although I like setting up large ML projects, I notice that using their no-code solution works really well to collect data and train simple classifiers whenever I have a hobby project. Even the difficult sounding “body pose classifier” and sound-classifier are easy to set up and train!

### Putting everything together

After training the classifiers I had to connect inputs (webcam and microphone) and outputs (my smart devices) together. To run the algorithms and get the data I built a very simple javascript frontend. That gave me all the tools to get the camera and microphone data, and the networks trained with TeachableMachine were easy to run in the browser (on CPU). 

To then control my lights I set up a node-RED project. With node-RED it is simple to write ‘if-this-then-that’ control structures and add simple functions in between. I could easily connect the Hue lights and Sonoff devices in my home to toggle them on and off. The bridge between node-RED and the webpage running the classifiers was modeled with a simple HTTP call. 

### The result

At the end of the day my setup “worked”. The basic functionality was in place, but as usual: the devil is in the details. As I only collected a small dataset with background noise and finger-clicks the classifier had a hard time distinguishing my snapping from other ‘clicks’ (e.g. putting a cup on the table, or a mouse clicking). I also noticed that the ‘point classifier’ was always working well for a short time, but slight deviations from my posture would upset the classifier quite quickly. 

Overall, when everything worked, it felt really easy and convenient to turn things on and off. However, without collecting more data, the system was not a good addition to my home. I thus already dismantled it. I also made a video of the performance, which I linked at the top of this post.
