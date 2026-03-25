---
title: "Lessons Learned During a Year at a Self-Driving Car Company"
date: "2019-03-08"
slug: "working-self-driving-car-company"
excerpt: "In January I have been a machine learning engineer at Autonomous Intelligent Driving (AID)(http://aid-driving.eu/) for exactly a year To summarize for myself what I learned, and to inspire others, I..."
original_url: "https://www.pinchofintelligence.com/working-self-driving-car-company/"
---

In January I have been a machine learning engineer at [Autonomous Intelligent Driving (AID)](http://aid-driving.eu/) for exactly a year! To summarize for myself what I learned, and to inspire others, I decided to write a short blog post about it. Are you interested in joining us? [Click here to apply!](https://jobs.lever.co/aid-driving?lever-via=ahRIYgDiOu)

First of all, it might make sense to describe what I do at this job. My task is to both explore the feasibility of algorithms (mostly in Python) before we put them on the car, as well as rewrite algorithms in C++ to put them on the car. Projects I worked on in the past year are dynamic object detection (cars, pedestrians, etc.), semantic segmentation, and landmark recognition for localization. These algorithms ended up on the car, and the output of the algorithms is used by other teams to drive autonomously. 

[![](https://www.pinchofintelligence.com/wp-content/uploads/2019/02/profile1jpg-1024x683.jpg)](https://www.pinchofintelligence.com/wp-content/uploads/2019/02/profile1jpg.jpg)

**Working with LIDAR data**

LIDAR data is really amazing to work with! Before I worked with stereo cameras, ultrasonic sensors and single small time of flight sensors. Now that I work with a car with multiple LiDAR sensors I have thousands of precise and accurate measurements all around the car!

I wrote multiple applications which use this type of data, and I learned you can use the data in multiple ways. For some applications I treated it as a random collection of points, for some I used the intrinsics of the LiDAR sensor to get specific information, and for others, I used the multiple scan lines of the LiDAR to extract the information I needed. 

**The joy and frustration of C++**

Before I joined AID I worked with C on low-level microcontrollers for both drones and cameras at the MAVLab. When a drone crashed in our cyber zoo the maximum damage was the price of the drone, and/or a lot of resoldering and gluing effort. With self-driving cars, you have to be extra cautious that you implement your algorithm efficiently. This required me to learn more about (modern) C++. I also tried to apply this during last years advent of code, as there is still much to learn for me there. 

**The benefit of working test-driven**

Before joining AID I always thought test-driven development was boring, and a waste of time. Luckily people quickly taught me the opposite: it makes programming a less frustrating more stable experience and debugging a less frequent activity. It also allows you to make larger code changes without wondering why your car suddenly doesn’t see anything anymore. 

**The importance of continuous evaluation**

In addition to making sure your code doesn’t become worse over time, it’s also important to make sure your algorithms/machine learning models keep performing. I spend a lot of time working with our machine learning people setting up an evaluation environment and making sure that every day we evaluate our algorithms on the same data to make sure they are improving. Personally, I worked a lot on building a dashboard for this, to make sure all developers can keep an eye on our KPI’s. 

**It takes a village, not a Batman**

One of AID’s values is to succeed as a team. It takes a diverse team with people with different backgrounds to think about every possible scenario, both in the world as on the hardware. As almost every company we work in an agile way where we as a team decide how to approach our challenges. I worked as a scrum master for the machine learning team, which I greatly enjoyed. If you are interested in joining us, take a look at [AID’s career page](https://jobs.lever.co/aid-driving?lever-via=ahRIYgDiOu), or reach out to me if you want to know if building self-driving cars would be something for you! Make sure to [follow this link](https://jobs.lever.co/aid-driving?lever-via=ahRIYgDiOu) when applying. 

[![](https://www.pinchofintelligence.com/wp-content/uploads/2019/03/grouppicture-1024x768.jpeg)](https://www.pinchofintelligence.com/wp-content/uploads/2019/03/grouppicture.jpeg)

Share List