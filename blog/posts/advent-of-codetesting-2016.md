---
title: "Advent of code/testing 2016"
date: "2016-12-25"
slug: "advent-of-codetesting-2016"
excerpt: "This year I participated in the “Advent of Code” challenge. Every day two small programming questions were posted on adventofcode.com(http://adventofcode.com) that (depending on your skill) could be..."
original_url: "https://www.pinchofintelligence.com/advent-of-codetesting-2016/"
---

This year I participated in the “Advent of Code” challenge. Every day two small programming questions were posted on [adventofcode.com](http://adventofcode.com) that (depending on your skill) could be solved within 30 minutes to 1-2 hours. During this challenge I tried something new: test-driven development. This post is a writedown of how this went and what I learned. 

During the first few challenges I noticed that each challenge included a wide range of examples on how to solve a single problem. This greatly helped in understanding the problem, and helped you debug your own code. Only after the samples worked for me I would input the posed problem to get the answer (and the shiny star).

At the start of the december I started with my normal debugging method: writing print statements at the places I wanted to see were correct (and places I suspected had a bug). However, if you are unsure where your bug is, this can lead to a long messy output. In this long list of output you have to find the ‘wrong’ output, and have to track down where this came from (usually with more print statements).

[![](https://www.pinchofintelligence.com/wp-content/uploads/2016/12/Screen-Shot-2016-12-25-at-09.29.56.png)](https://www.pinchofintelligence.com/wp-content/uploads/2016/12/Screen-Shot-2016-12-25-at-09.29.56.png)

To fix this problem I started writing down some of the examples using the [Unittest framework](https://docs.python.org/2/library/unittest.html). This had the advantage of verifying step by step that your example works (using AssertEquals). For each function I wrote I had at least one testcase to verify that the code I wrote was working for the example given in the question.

The first few days this slowed me down a little. Finding out what tools to use for Python (my go to language for quickly solving small problems) took some time. Although I used unittests in Java, testing Python code was something I never did before. After a few days I did notice that the amount of time spent to type in the test-cases started to outweigh the time necessary to gradually walk through the code to find that one bug in my code (or my thinking).

Later during the month I started using [Doctests](https://docs.python.org/2/library/doctest.html) instead of Unittests. With this I knew that each function I wrote worked in the cases specified in the problem statement. After I verified this it was easy to link them together to (finally) solve the question for that day.

An example of how my code looked at day 21: 
    
    
    def swap_letter(input_str,letterx,lettery):
        """
        >>> swap_letter('hallo','a','l')
        'hlaao'
        >>> swap_letter('ebcda','d','b')
        'edcba'
        """
        input_str = input_str.replace(letterx,"@")
        input_str = input_str.replace(lettery,letterx)
        input_str = input_str.replace("@",lettery)
        return input_str

Overall I really enjoyed Advent of code 2016! Some of my personal stats are: 

  * Solved 50 problems (2 per day, including the last “free” one)
  * Got 29 points on the public leaderboard (solved one problem as one of the first 100 people, had to wake up at 6 in the morning to do so)
  * Got 537 points on the private leaderboard and finished first of my friends!
  * Learned more about regular expressions (sometimes the text to parse required some extra power than I normally use)
  * Became a better test-driven developer, using both Unittests and Doctests in Python



Instant update: the solutions of Peter Norvig can be found here: <https://nbviewer.jupyter.org/url/norvig.com/ipython/Advent%20of%20Code.ipynb> . It is great to see that he too continuously tests his code using assert statements in a iPython notebook. Next up: comparing his solutions to mine to learn more about efficiently solving these kind of puzzles.

Do you have an opinion on test-driven development, or want to show how you solved the Advent of Code 2016? Please post them in the comments or send them to me!

Merry christmas everybody!
