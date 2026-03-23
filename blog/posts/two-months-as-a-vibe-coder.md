---
title: "Two months as a vibe coder"
date: "2026-03-02"
slug: "two-months-as-a-vibe-coder"
excerpt: "The last two months my work completely changed. My job changed from thinking long and hard about problems and coming up with the best few code to solve this, to full-on talking in English to my..."
original_url: "https://www.pinchofintelligence.com/two-months-as-a-vibe-coder/"
---

The last two months my work completely changed. My job changed from thinking long and hard about problems and coming up with the best few code to solve this, to full-on talking in English to my computer begging it to produce better code. In this blog I am sharing my observations and feelings in this brave new world.

### Productivity

First of all, I’m definitely feeling way more productive with agentic programming. I see a lot of complaints on Reddit and HackerNews about how they don’t like agentic programming, how it slows you down in the end, but for me it simply works. It’s always hard to find a metric for productivity, but IMO “number of pull requests merged” is a pretty good one. The best engineers I know have frequent pull requests, making the code base a tiny bit better every single day. Having picked a metric, here are my last two years worth of pull requests, including how many got accepted per month. You can clearly see when agentic programming started to work…

[![](https://www.pinchofintelligence.com/wp-content/uploads/2026/03/pr_histogram-1024x399.png)](https://www.pinchofintelligence.com/wp-content/uploads/2026/03/pr_histogram.png)

### Programming is fun (again)

I learned to program over 16 years ago as a first year student at my university. Back then I felt full of energy harnessing this new power. I could program anything and everything, and solve problems in the real world with my software! Over time I slowly lost this excitement. It’s probably a combination of lingering RSI, simply having solved similar problems before and not wanting to revisit them, picking up new hobbies, and in the back of my mind thinking that a problem might be bigger than expected.

I still enjoy coding, especially if I can achieve something cool in a small amount of time. Advent of Code always re-ignites the fun of coding as that is the time you can think of smart ways to create cool algorithms in a minimum amount of time. Unfortunately, at work the problems I face are never so simple they can be solved within a day or two. They always require higher level architectures, alignment between stakeholders, considerations on how to maintain a tool, etc.

Agentic programming however makes programming fun again! Real world problems which would normally be “too big” to take on are now solvable within a day. I have used this a lot in the last two months for tools which should exist, but would previously be too large/complicated to even consider. Think about special dashboards to track metrics, tools to aggregate data, etc. My code solves actual problems and frustrations I had, and the ability to create them in a day makes the bar low enough to actually implement them.

### Don’t sync with stakeholders, sync with your agents

Just like there are some tools I always wanted to exist but couldn’t ‘afford’, there are a few features I always wanted in tools other people maintained. Some of these I would request multiple times, but always heard the team didn’t have time for it this quarter (spoiler: the next quarter my feature requests would also be P3 again…).

Instead of asking other teams for features I started prompting the agentic tools myself. Turns out that a lot of these small features are now easily solvable. I made a few pull requests this way and got them accepted by those teams.

I’m happy with this development. It turns programming into a wiki-like environment where anyone can propose changes all the time. I’m not sure how other teams feel about others coming in and making changes to “their part of the code”. Whenever I submit a PR to a part of the code which isn’t mine I make sure it’s in tip-top shape. I test the code, and make sure everything looks good. However, as more and more people get access to tools I can imagine that some teams can get overwhelmed with pull requests for features they deem useless. That turns the task of programmer from creator into that of gatekeeper…

### Side projects hit different now

I love side projects. Programming something to do something cool and showing it to others brings me great joy. The ideal side project is just on the edge of your technical capabilities – difficult enough that most people couldn’t achieve it, easy enough for yourself to achieve it in a reasonable time (e.g. between two days and two weeks for me). My brain is constantly searching for fun side projects, and coming up with ways to solve them.

Now that agentic programming can solve easy problems like this quite well the fun also disappeared. My brain comes up with a fun idea for an interesting problem, and immediately finds that the way to implement it is by asking Claude or Cursor to solve it. At work I’m happy that my problems get solved more efficiently, and I’m happy that I can raise my ambitions. However, my hobby also changed overnight, and I’m not yet sure how I feel about it…

On the one hand, if I genuinely want to have a tool for myself I can now create it quickly. On the other hand, the hard journey towards the final application was what actually mattered for me.

### Developing is both addictive and stressful

I am absolutely addicted to Factorio. Especially the end-stage is fun where you can copy-paste parts of your factory and see drones complete your vision for a massive factory. Programming suddenly feels exactly the same…

Because the agents can run slowly in the background but need feedback once in a while it’s tempting to have your laptop on day and night (kicking off a few big feature requests in the evening). However, you also end up checking every minute whether you need to give feedback, or need to nudge one of your agents in a different direction. Suddenly I’m not removing myself from work in the evening as there is always more I can do.

Agentic tools are also a great slot machine – you throw in a bit of your time and the outcome is either great or utter garbage. It’s easy to get addicted to throwing in prompts and hoping for the next killer app.

I have not really figured out how to deal with this. I have more passions which require frequent looking at a long-running project (refreshing TensorBoard when training a model, watching my 3D printer to make sure the print is going well), and there I manage to step away from the process once I know it’s going well. In this case that means that agentic coding either needs to become way faster or way better so I don’t have to be in the loop most of the time.

### Agentic working is the future

Every knowledge-working job is going to transform massively in the next 5 years. I’m actively making sure every piece of knowledge I have is accessible by my agents, such that they can have as much power as possible. Every line of work where LLMs can find knowledge/data and can write tools to analyse or transform this is going to be turned upside down. I see some companies where everyone gets access to Cursor, not just the engineers. Rather than a project manager asking their data scientists to run an analysis they can simply ask Cursor to build a dashboard.

I already predicted this a few years ago, and built some prototypes during hackathons at Bumble, but current tools like Cursor slowly start bringing this into the realm of the possible for anyone at work. Right now we are not yet at the point where every knowledge worker can harness agents, but there is going to be another “ChatGPT moment” where a new tool is launched which changes everyone’s job overnight. I’m not sure the world is ready for this, and I’m not sure how people can best prepare themselves…

### Money/compute power matters (again)

I asked my software engineering friends about their tool usage and what their company gives them, and the answers vary a lot. Some of my friends don’t have or use these tools yet, some get a small budget (e.g. 100 dollars per month), some have unlimited budgets and manage to spend >2000 dollars per month on generating code.

Money and the amount of machines you have actually matters a lot at this point in time. A couple of times I used a cheaper model to generate code, only to switch back to a more expensive model after it failed to create the expected results a few times in a row. It feels like the early days of computers where the amount of CPU power and RAM dictated what kind of programs you code. So far I have not found a limit to the amount of tokens I would want to consume.

Personally I think the correct budget is “As much as you want, with frequent reviews on how well you use these tools”. I feel like I became more than double as effective as before, without the costs for my work doubling. That’s a win! Any employee who can achieve that should achieve it. However, it’s also easy to spend hundreds of dollars on tokens which don’t achieve anything. Make sure you evaluate what your engineers are doing and steer them in the direction you want!

### Conclusions

Just to re-iterate the most important point: the job of developer has completely changed in the last two months! Currently I’m enjoying work more with agentic coding than I did before, and I hope it stays this way.

Although I was worried for a few weeks that this might be the end of the software engineering role, I now believe that there are enough problems in the world to solve. As long as my role is “solve problems, where software is a means to an end” I’ll probably keep having a job for a while. I would encourage everyone to try out a few tools and a few different models, and see where your role takes you!