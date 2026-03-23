---
title: "What I learned developing the Neural Voting Advice Application"
date: "2017-03-21"
slug: "learned-developing-neural-voting-advice-application"
excerpt: "Two weeks ago I put the neural voting advice application online (http://www.pinchofintelligence.com/neural-voting-advice-application/). In this post, I look back at two aspects: the end-user aspect..."
original_url: "https://www.pinchofintelligence.com/learned-developing-neural-voting-advice-application/"
---

Two weeks ago I put the neural voting advice application online (http://www.pinchofintelligence.com/neural-voting-advice-application/). In this post, I look back at two aspects: the end-user aspect and the technical aspect. The first one will be interesting for people working with neural networks. The technical aspect might be useful for somebody else interested in deploying their Tensorflow or Keras application.

### Introduction

For years I enjoyed the multiple voting advice applications that all focus on different aspects. This year I wanted to make my own: an application in which you could enter your opinion in natural language! In only a few hours I was able to download the programs of most political parties and analyze them with a simple recurrent neural network. It worked well enough to share it with more people. I did this during a week of skiing in Austria.

The end result was accessible here: [rmeertens.github.io/NeuralVotingAdvice](http://rmeertens.github.io/NeuralVotingAdvice)/ . Since I started my service it has been used over 500 times. Most comments I received were from people who felt that a certain input should have recommended another party.

[![](https://www.pinchofintelligence.com/wp-content/uploads/2017/03/2017-03-22-15_32_25-Kunstmatige-Intelligentie-stemwijzer-755x1024.png)](https://www.pinchofintelligence.com/wp-content/uploads/2017/03/2017-03-22-15_32_25-Kunstmatige-Intelligentie-stemwijzer.png)

Another problem was that my backend did not have SSL encryption (an HTTP connection) while the Github page I used to host my site had HTTPS. Chrome and other browser don’t like HTTP posts on encrypted pages, and thus my app did not work for many users. This was something I was only able to fix after the elections already passed (see the technical writeup).

### End-user aspect

All queries put in the system are saved in a database. These were my favorite inputs people used to get advice on who to vote for:

  * “we moeten ons laten veroveren door de vs” -> 14 points – SP.  
Not the worst advice. The SP wants to go slow on many aspects of our national army.
  * “ik ben feyenoorder.” -> 85 points – Partij voor de vrijheid  
As the PVV is the second largest party in Rotterdam, and the largest party in municipalities around Rotterdam, this seems like an advice people followed!
  * “het getal dat met drie begint en wordt gebruikt bij het berekenen van de omtrek van een cirkel” -> 9 points – Partij voor de dieren  
I don’t even know how they thought the could a sensible advice based on this input
  * “alle turken terug naar marokko” -> 75 points – Partij voor de vrijheid  
Exactly what I would recommend this user to vote for!
  * “ik hou van een broodje met pindakaas en een frikandelspeciaal” ->98 points – Partij voor de vrijheid  
One of the only campaigns Geert Wilders held was eat bread with herring. The Partij voor de vrijheids seems like a good choice for someone with a love for bread with peanut butter and frikandel!
  * “Geen mens moet meer blijven leven” -> 11 points – 50 plus  
I don’t think there is any party that wants this…



Overall there were some trends I noticed:

  * People want more money! Free money for everyone, more for themselves, and less to the government and the elderly.
  * Foreign policy seems to be important.
  * Many people say things about privacy, while this was not something that came up a lot during the campaigns.



About 75 percent of the inputs people gave joke inputs to the algorithm. I was a little bit disappointed that only a small percentage of people looked at actual opinions they held. Next elections I will try to improve my system by asking people for their opinion on the five most important topics at that time. Hopefully, this will make them query my system with more serious opinions!

A last thing I noticed was that only 81 people navigated to my blog to see how the application worked. Most questions people had were actually answered on this page. Next time I create an application all answers should be on that page instead of asking users to click on a link.

### Technical aspect

There were many “first time” experiences for me in this project:

  * Use neural networks on the backend of a publicly visible website
  * Deploy a containerised Docker image on the Google Container Engine with Kubernetes
  * Set up an HTTPS backend.



### Long live docker!

This is one of my first projects that was put in a Docker image on the Dockerhub. A few weeks ago I discovered the advantages of Docker, and have been learning more and more ever since.

The Docker image approach proved to be the best approach multiple times this week! First of all, when I decided that I wanted to train my model on a machine with a GPU, I could simply change the first line in my Dockerfile:  
FROM tensorflow/tensorflow:1.0.0-py3  
to  
FROM tensorflow/tensorflow:1.0.0-gpu-py3  
Hurray! No more endless hassle installing new versions and creating the perfect environment on different computers.  
A second problem I suddenly had this week was that the newest Keras version changed some functions I used. By adding the Keras version in the requirements file this problem was solved within a minute. Working this way was extremely important for this project considering I wanted to have som fun working on my spare time projects. Changing the installation of requirements is not my idea of fun!

### Google container Engine

A personal goal of me was to make this project “scalable”. Other applications I put online (for example www.duomusico.com) could never handle large amounts of users. Normal voting advice applications receive many requests per second (especially when hackers target your application: http://nos.nl/artikel/2156849-stemwijzer-slechte-bereikbaarheid-privacyproblemen-en-hackzorgen.html). Keeping your voting advice applications online is very important in my eyes: many people rely on them as their main source when determining who to vote for. These requirements made using the Google container engine a logical choice in my eyes.

Learning the required Kubectl commands was a bit tough. Although I started with adding the deployments using the UI tool, in the end writing a configuration turned out to be the best way to deploy a project. Despite all problems I faced during development, the end result is something I’m very proud of.

### Solving the HTTPS problem

Adding HTTPS took way longer than I expected. In the end, I went with Certbot (https://certbot.eff.org/) from letsencrypt.org. To actually use it I needed to upgrade the operating system of my old Macbook I had on my holiday. I added all the generated files as secret using the command:  
kubectl create secret generic sslkeys –from-file=./generatedkeys.pem  
My containerised application can mount the secret files as a drive. This means that the Flask server I used to serve users can load them (as described here: http://flask.pocoo.org/snippets/111).  
Although the problem is solved (the connection works and is encrypted) I would love to learn more about how I should have approached this problem. If you read this and know how I can improve the SSL encryption of my backend, please let me know!

### Conclusion

Overall this project was a great learning experience. Although the actual program was fairly simple, using neural networks in a backend was a lot of fun! After this project, I’m sure next projects will take less time, and can be scaled quickly!

This project was a big “figure things out by yourself” experience. If you think I messed something up, or you have a helpful hint, please get in contact! I would love to learn more tips and tricks!