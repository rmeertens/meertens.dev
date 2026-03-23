---
title: "I created the InfoQ Alexa skill"
date: "2019-01-12"
slug: "infoq-alexa-skill"
excerpt: "A while ago I started exploring the current state of voice interfaces and smart home technology. One particular interesting smart home application is Amazon’s Alexa. It’s a device with a speaker..."
original_url: "https://www.pinchofintelligence.com/infoq-alexa-skill/"
---

A while ago I started exploring the current state of voice interfaces and smart home technology. One particular interesting smart home application is Amazon’s Alexa. It’s a device with a speaker which can answer questions, turn lights on/off, and can give you a so-called flash briefing. 

You can develop Alexa skills yourself, and publish them in Amazon’s store. Skills are not stored on the device, but instead are API’s that handle all communication. A particularly interesting approach that is recommended by Amazon is to use so-called Amazon Lambda functions. Lambda is a service of Amazon which allows you to have a “function as a service”. You specify the python code you want to run, and the function lives on Amazon’s infrastructure. No setting up a server, no maintenance and keeping it up, your function goes online whenever someone calls it and Amazon handles everything. 

I decided to make a flash briefing for InfoQ.com. The flash briefing is like a quick overview of your news items and can be either audio or text (which Alexa pronounces for you). As InfoQ already has a great RSS feed with summaries for technical articles I figured that it would be interesting to be kept up to date with that.

At the moment the application works, and is published in the Amazon store!

US: [https://www.amazon.com/dp/B07KMWGNNL  
](https://www.amazon.com/dp/B07KMWGNNL)UK: <https://www.amazon.co.uk/Pinch-of-intelligence-InfoQ-Headlines/dp/B07KMWL7QH>  
Canada: [https://www.amazon.ca/Pinch-of-intelligence-InfoQ-Headlines/dp/B07KMZ22ZH/](https://www.amazon.ca/Pinch-of-intelligence-InfoQ-Headlines/dp/B07KMZ22ZH/)  
Australia: <https://www.amazon.com.au/Pinch-of-intelligence-InfoQ-Headlines/dp/B07KMWKFQ9/>  
India: [https://www.amazon.in/Pinch-of-intelligence-InfoQ-Headlines/dp/B07KMXK1NC](https://www.amazon.in/Pinch-of-intelligence-InfoQ-Headlines/dp/B07KMXK1NC)

The skill will also soon be available in Japanese and French-speaking countries. 

[![](https://www.pinchofintelligence.com/wp-content/uploads/2019/01/1Screenshot-2018-12-28-at-17.29.59-1546015284807-1024x381.png)](https://www.pinchofintelligence.com/wp-content/uploads/2019/01/1Screenshot-2018-12-28-at-17.29.59-1546015284807.png)