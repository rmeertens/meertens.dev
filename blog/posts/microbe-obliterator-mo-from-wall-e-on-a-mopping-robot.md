---
title: "Microbe Obliterator (MO) from Wall-e on a mopping robot"
date: "2020-08-31"
slug: "microbe-obliterator-mo-from-wall-e-on-a-mopping-robot"
excerpt: "My favourite character in the Disney Pixar movie WALL-E is M-O. A while ago I bought a iRobot mopping robot, which always reminded me of Mo. This week I decided to try to pimp up my robot by actually..."
original_url: "https://www.pinchofintelligence.com/microbe-obliterator-mo-from-wall-e-on-a-mopping-robot/"
---

My favourite character in the Disney Pixar movie WALL-E is M-O. A while ago I bought a iRobot mopping robot, which always reminded me of Mo. This week I decided to try to pimp up my robot by actually making him look like Mo. I decided to make a short video to present my design. 

For this project I managed to get a head start by using a design by [Josh Swafford on Thingiverse](https://www.thingiverse.com/thing:3319967). He designed Mo himself as a standalone robot. His design was already amazing, using his components gave me an amazing head start in this project. In this blogpost I will thus refer to both his design, and the design modifications I made. 

If you want to build your own design you should start by buying an [iRobot Braava Jet robot](https://store.irobot.com/default/floor-mopping-braava-robot-mop-irobot-braava-jet/B240020.html). As a side-note: I really like this robot. He clears all foreign contaminants in the bathroom really well. 

If you want to replicate the design for your own robot you can already start with the following components: 

– The head of Mo. The design of Josh is already great.  
– The arm of Mo. Take the Arm_driven print, but print it out at 140 percent (rescaled in Cura). You need the extra size as the iRobot is a bit bigger than the base Josh made  
– The hand insert of the arm (arm-cover), printed out at 125 percent of the size (rescaled in Cura).

And print the following of my designs:  
– The shoulder of Mo  
– The eye of Mo  
– The brush of mo  
– The two bodies of mo.  
You can find all of them here: https://www.thingiverse.com/thing:4584695. 

To let Mo make any noise you should buy a raspberry pi and a pi-sense hat. You only need the sense hat to get the accelerations, so if you already have an IMU somewhere that would work as well. For the noise I used an external speaker I had laying around. The sound-effects I recorded myself to prevent any copyright infringement. You might select them from this video if you are feeling creative: [https://www.youtube.com/watch?v=iiMFRMoxxEI](https://www.youtube.com/watch?v=iiMFRMoxxEI). Make sure that in /boot/config.txt you uncomment hdmi_force_hotplug=1, as without this the raspberry pi won’t boot in headless mode for me. Make sure to start the script as normal user, the sudo user seems to not have access to the speaker. To power the raspberry pi I used a small powerbank. 

You can find the script I used to run Mo here: https://github.com/rmeertens/microbe_obliterator.
