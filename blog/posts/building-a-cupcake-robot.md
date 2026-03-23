---
title: "Building a Cupcake Robot"
date: "2020-05-17"
slug: "building-a-cupcake-robot"
excerpt: "Currently, as the corona crisis is causing heavy lockdowns, people have to keep a social distance. This made it difficult to celebrate special events, so as a challenge I decided to try to make a..."
original_url: "https://www.pinchofintelligence.com/building-a-cupcake-robot/"
---

Currently, as the corona crisis is causing heavy lockdowns, people have to keep a social distance. This made it difficult to celebrate special events, so as a challenge I decided to try to make a contactless delivery robot. The final design was used to deliver cupcakes to my friends!

[![](https://www.pinchofintelligence.com/wp-content/uploads/2020/05/cupcake1-300x225.jpg)](https://www.pinchofintelligence.com/wp-content/uploads/2020/05/cupcake1.jpg)

I made the robot itself from scratch with parts I had left over from when I participated in the [INDI Robot Games in 2019](https://indirobotgames.nl/). Back then I bought a lot of components to try how suitable they would be for a fighting robot. This helped me with both spare parts, as well as knowledge on how to put these components together. The parts I used are listed at the bottom of this article. 

What really helped me was the 3D printer I bought: this allowed me to quickly iterate designs and learn from mistakes. I designed the chassis myself in the design program Fusion 360. I started by creating a base with a place for two motors, electronic speed controls (ESCs) for these motors, a receiver, and a battery. After a few iterations I had something which could drive around, but could not carry a payload yet. I then designed a magnetic top that can be clicked on purpose made for four cupcakes. All design files can be [downloaded here from Thingiverse](https://www.thingiverse.com/thing:4370026). 

[![](https://www.pinchofintelligence.com/wp-content/uploads/2020/05/cupcake2-300x225.jpg)](https://www.pinchofintelligence.com/wp-content/uploads/2020/05/cupcake2.jpg)

The main challenge I had so far with robots is finding a good and reliable way to mount wheels to motors. This is really where the 3D printer helped a lot: it allowed me to test many hypotheses fast. In the end I designed a pretty good mount that fits the motor shaft perfectly, fits the wheel perfectly, and can be attached using a screw. There is an insert you have to get into a hole by heating it up with a soldering iron. This takes some practice, but leads to a great fit!

Here are some videos of the robot in action:

In case you are wondering about the cakes on the robot: those are cupcakes made according to a recipe from [cupcake Jemma](https://www.youtube.com/user/CupcakeJemma). She has a [great video about what can go wrong with your cupcakes and how to make them perfect](https://www.youtube.com/watch?v=oC6x6y_o80Y). We also used her [recipe for buttercream icing](https://www.youtube.com/watch?v=O4qazwRvO6E). 

### Parts you need to make it yourself

The main parts I used were as follows:  


  * 1x [orangeRX receiver](https://hobbyking.com/en_us/orangerx-r615x-dsm2-dsmx-compatible-6ch-2-4ghz-receiver-w-cppm.html?___store=en_us) to receive commands and give them to the ESCs. 
  * 2x Modelcraft [brushed motors](https://www.conrad.de/de/p/getriebemotor-12-v-modelcraft-rb350030-0a101r-1-227544.html). You can change the gear ratio if you want a faster or stronger robot.
  * 2x [ESCS which could power two motors](http://www.hobbywing.com/goods.php?id=357&filter_attr=5426.5599).
  * 2x [Banebots wheels](http://www.banebots.com/product/T40P-244BO-HS4.html).
  * You also need a transmitter to get your commands at the robot, I used a [Turnigy 9XR pro](https://hobbyking.com/en_us/turnigy-9xr-pro-radio-transmitter-mode-2-without-module.html).