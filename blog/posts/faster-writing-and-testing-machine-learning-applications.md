---
title: "Faster writing and testing machine learning applications."
date: "2016-12-17"
slug: "faster-writing-and-testing-machine-learning-applications"
excerpt: "Today I discovered a great thing for people with two computers (development and training). In my case, my normal work-pc is a mediocre Windows computer (company policy) that can’t handle deep..."
original_url: "https://www.pinchofintelligence.com/faster-writing-and-testing-machine-learning-applications/"
---

Today I discovered a great thing for people with two computers (development and training). In my case, my normal work-pc is a mediocre Windows computer (company policy) that can’t handle deep learning. My learning-pc with GPU does not have a screen, and is accessed remote through a tool like Putty. This leaves you as a python programmer with three choices: use a tool to sync your files, develop without an IDE, or… set up your server as a remote in the Pycharm IDE.

Setting up your server is easy, once you know how. It can be done when starting a new project. First of all: make you you have the “professional” edition of Pycharm. The community edition does NOT support this feature. 

[![](images/2016/12/image07.png)](images/2016/12/image00.png)

When you create a new project you can select your interpreter. On the right is a button which, when clicked, allows you to add a remote. Click this button. 

[  
![](images/2016/12/image00.png)](images/2016/12/image00.png)

Give the remote a name and select how you want to put your files on the remote. As my learning pc has SSH enabled I selected SFTP. 

[ ](images/2016/12/image01.png)

[![](images/2016/12/image02.png)](images/2016/12/image02.png)

Next up: adding the details of your server. You can either login with your username and password, or select that you want to log in with an SSH key.

![](images/2016/12/image05.png)

After you did this select your remote in the Deployment configuration, and select where your interpreter path is. In my case I installed Tensorflow for Python 3, and thus had to enter /usr/bin/python3.

![](images/2016/12/image06.png)

By default Pycharm creates a new folder for your project in the /tmp/ folder. This can be a bit of a pain if you are (often) restarting your remote computer, and/or have to download a lot of data each time you do so. If you want you can change it to your own workspace folder.

![](images/2016/12/image01.png)

For me, when I added a new file, it automatically uploaded it to my remote pc. If Pycharm does not do this, make sure to right click on your project and select “Upload to …”.

![](images/2016/12/image04-1024x819.png)

If you now create a simple program you should see that it runs remote! Good luck with setting up Pycharm, and let me know if this worked for you. 

[![](images/2016/12/image03.png)](images/2016/12/image03.png) [  
](images/2016/12/image04.png) [  
](images/2016/12/image05.png) [  
](images/2016/12/image06.png)
