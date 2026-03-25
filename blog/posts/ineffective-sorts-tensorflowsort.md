---
title: "Ineffective sorts: tensorflowsort"
date: "2016-11-01"
slug: "ineffective-sorts-tensorflowsort"
excerpt: "Recently sequential neural networks have been gaining popularity. To explore what they were capable of I decided to create the ineffective sorting algorithm (<https://xkcd.com/1185/)..."
original_url: "https://www.pinchofintelligence.com/ineffective-sorts-tensorflowsort/"
thumbnail: "https://www.pinchofintelligence.com/wp-content/uploads/2016/11/Shell_sorting_algorithm_color_bars.svg_.png"
---

Recently sequential neural networks have been gaining popularity. To explore what they were capable of I decided to create the ineffective sorting algorithm (<https://xkcd.com/1185/>) “Tensorflowsort”. In this post I will explain what we can do with sequential neural networks, and how we can use them to sort an array.

The basis of my sorting algorithm is the Recurrent Neural Network. The best article to learn about how they work can be found in this post: <http://colah.github.io/posts/2015-08-Understanding-LSTMs/> . The basic idea is that there is an encoder, through which you pass your input sequentially. For comprehending text this means reading word for word, or letter for letter. Every time the encoder reads a letter it updates its own global state. After reading everything the cell state is passed to the decoder, that generates output. The encoder thus has to create a representation of the input at all time steps for the decoder to be able to generate suitable output.

The output of the encoder is used as input for the decorder. However, you can have multiple decoders working with the same output. One practical example of this is a network that can:

  * Return its input
  * Predict the future of that input



This makes sure that the network knows what happened (because it can reproduce its input) and knows what will happen (it can predict the future). The same idea can be used in the sorting algorithm: if the output of the encoder can be used to sort numbers, it can also output them in a reversed order.

The code I used is:  


The output of the algorithm at several steps is really interesting. After only 100 cases it learns that is has to output something “sorted”. That is: the outputs are sorted, but they are not the numbers we gave as input. This is probably due to the embeddings we use: each number is associated with a 50 dimensional vector. What should be in this vector is also determined by our network, but starts completely random. After seeing 100 examples of ordered numbers the network knows that numbers have a certain order.

Please let me know what you think about this sorting algorithm, and let me know what YOU made with recurrent neural networks.

#### Update: found another sorting algorithm

Apparently Ilya Kostrikov also wanted to have a neural sorting algorithm. His algorithm is even cooler, using attention for a pointer network! His code can be found here: <https://github.com/ikostrikov/TensorFlow-Pointer-Networks> . If you want to learn more about attention and pointer networks these slides are easy to follow: <http://www.slideshare.net/KeonKim/attention-mechanisms-with-tensorflow> .

Share List

### Facebook Comments ()

### G+ Comments ()