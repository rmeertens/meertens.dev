---
title: "Immersive Points: a virtual reality point cloud visualisation tool"
date: "2020-01-11"
slug: "immersive-points-a-virtual-reality-point-cloud-visualisation-tool"
excerpt: "A couple of years ago I made a visualization tool for the Google Cardboard that could show you a brain by looking around(https://www.pinchofintelligence.com/brain-visualisation/). The two big..."
original_url: "https://www.pinchofintelligence.com/immersive-points-a-virtual-reality-point-cloud-visualisation-tool/"
---

A couple of years ago I made a visualization tool for the [Google Cardboard that could show you a brain by looking around](https://www.pinchofintelligence.com/brain-visualisation/). The two big downsides were that you could not walk around through the point cloud and that you could not point out to others what you are seeing. This weekend I fixed both points by creating a new app: [Immersive Points](https://rmeertens.github.io/ImmersivePoints/index.html). This web app still shows a point cloud, but also allows you to physically walk through it, and use your hands to point to things. Other people can look at the screencast to see what you want to point out. 

The app can be found at [https://rmeertens.github.io/ImmersivePoints/index.html](https://rmeertens.github.io/ImmersivePoints/index.html). I currently put a frame with points from a brain in (taken from the old brain visualization app), two frames from a self-driving car dataset, and a frame from a scan of the Notre-Dame. 

[![](https://www.pinchofintelligence.com/wp-content/uploads/2020/01/immersivepoints-1024x469.png)](https://www.pinchofintelligence.com/wp-content/uploads/2020/01/immersivepoints.png)

In terms of controls, you can currently walk around freely (if your headset supports this). You can use the select button on the left hand of your VR device to move forward, and the right hand of your VR device to move backwards. Movement is always in the direction in which you are looking, which means you can also get a birds-eye view of a scene if you want. 

In the process of adding a virtual reality option to the visualizer I also made the data loading more efficient (this used to take up to 10 seconds), and data is now hosted in an S3 bucket. If you have point cloud data you would like to walk around in, you can even upload it!

Currently, some nice examples are:

  * [The entire Notre dame](https://rmeertens.github.io/ImmersivePoints/oculus.html?name=d6263c4a-7121-432f-8712-b0de530a78ff.xyzrgb) in colour, [taken from here](https://sketchfab.com/3d-models/notre-dame-paris-facade-hi-res-point-cloud-50deeb164f324d1c8607bafa67f948b9)
  * [An aggregated scan](https://rmeertens.github.io/ImmersivePoints/oculus.html?name=e2652aab-4ace-4a09-86f4-374b23cb677b.xyzi) from the [AEV dataset](https://www.audi-electronics-venture.de/aev/web/de/driving-dataset/dataset.html).
  * [A semantic segmented scan](https://rmeertens.github.io/ImmersivePoints/oculus.html?name=816ca9a5-1eec-4e23-a34e-f409dbed1ff0.xyzi) from the [AEV dataset](https://www.audi-electronics-venture.de/aev/web/de/driving-dataset/dataset.html).
  * [A brain with some clustered information](https://rmeertens.github.io/ImmersivePoints/oculus.html?name=77b04781-5d7c-445f-9e6a-65956758d644.xyzi), with data from the Radboud University.
