---
title: "Visualise embeddings in virtual reality"
date: "2020-02-16"
slug: "visualise-embeddings-in-virtual-reality"
excerpt: "When working with data and neural networks it’s good to know whether similar data is close together. This could be either in the original space of the data or in a deep layer of a neural network. In..."
original_url: "https://www.pinchofintelligence.com/visualise-embeddings-in-virtual-reality/"
---

When working with data and neural networks it’s good to know whether similar data is close together. This could be either in the original space of the data or in a deep layer of a neural network. In the last case, we call the data an “embedding” (most well-known for [word embeddings](https://en.wikipedia.org/wiki/Word_embedding)). As humans like to look at data in two or three dimensions people often project data down in this space. I wanted to show that it’s possible to walk through your data using virtual reality using the [Immersive Points app](https://rmeertens.github.io/ImmersivePoints/index.html) I programmed over the last month.

Embeddings are so important that the visualisation of them is by default included in Tensorboard, that you can view and upload them on [this site](http://projector.tensorflow.org/) as well, and that how to do this easily is [one of my most popular blog posts](https://www.pinchofintelligence.com/simple-introduction-to-tensorboard-embedding-visualisation/). As for how to visualise the data: you can either use PCA or T-SNE, where T-SNE often finds interesting clusters which give some insight into how separable your data is.

To see the results directly in 3D, you can go to [this page](https://rmeertens.github.io/ImmersivePoints/oculus.html?name=8a7eccb4-2914-4f8f-8b0a-b86645b821c6.xyzi). You can also look at the code used to produce this on [my GitHub page](https://github.com/rmeertens/ImmersivePoints/blob/master/examples/export_embeddings.ipynb).

[![](https://www.pinchofintelligence.com/wp-content/uploads/2020/02/embedding3d-300x202.png)](https://www.pinchofintelligence.com/wp-content/uploads/2020/02/embedding3d.png)

**Update:** In the MNIST example it’s actually a bit lame that you visualise the representation of the digits directly. This doesn’t seem to be possible with CIFAR10, which has a much more interesting range of representations of objects. In fact, Laurens van der Maaten challenges people to look at the neural network representation of CIFAR10 in his [tech talk at google 6 years ago](https://www.youtube.com/watch?v=RJVL80Gg3lA) (which is a great recommendation if you want to learn how t-SNE “learns” the visualisation). I made a simple neural network and visualised a 512 dimensional embedding space using t-SNE and uploaded it to my site. You can see the result here: <https://rmeertens.github.io/ImmersivePoints/oculus.html?name=0c8b60de-cb28-46cc-b580-f255ed72f3d6.xyzi> .

[![](https://www.pinchofintelligence.com/wp-content/uploads/2020/02/Screenshot-2020-02-16-at-13.07.27-300x238.png)](https://www.pinchofintelligence.com/wp-content/uploads/2020/02/Screenshot-2020-02-16-at-13.07.27.png)