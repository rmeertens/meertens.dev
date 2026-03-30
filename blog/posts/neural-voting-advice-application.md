---
title: "Neural voting advice application"
date: "2017-03-03"
slug: "neural-voting-advice-application"
excerpt: "Next week the Netherlands will hold elections to choose who is going to represent the people in the house of representatives. There are 28 political parties participating, although there are 10 ‘big’..."
original_url: "https://www.pinchofintelligence.com/neural-voting-advice-application/"
---

Next week the Netherlands will hold elections to choose who is going to represent the people in the house of representatives. [There are 28 political parties participating, although there are 10 ‘big’ political parties most people choose from.](https://en.wikipedia.org/wiki/Dutch_general_election,_2017) As there are so many political parties people orient themselves on who to vote for using voting advice applications. Most of the time people tell these applications what their opinion is on 30 important questions, and the application tells them what party would represent their opinions the best.

## Neural voting advice application

For long I though that this system could be improved. Instead of filling in the 30 questions somebody else thinks are important, why not tell a voting advice application what you really want? Using neural networks I made such a system: the [neural voting advice application](https://rmeertens.github.io/NeuralVotingAdvice).

### What can I enter?

Enter a normal Dutch sentence that describes what you want to do with the Netherlands. The best input is a sentence that is longer than 10 words, and shorter than 20 words. The best input would be a sentence you would find in a party program… You can try:

  * Door te werken aan een duurzame, reële economie creëren we groene en echte banen.
  * Nederland versterkt de internationale terrorismebestrijding, de inlichtingendiensten en de aanpak van jihadisten.
  * In Nederland gedraag je je. Als je dat doet, dan zijn de mogelijkheden eindeloos.



[![](images/2017/03/stemwijzerbackground-300x200.jpg)](images/2017/03/stemwijzerbackground.jpg)

### How did your program learn this?

Most parties have their program as PDF on their website. I downloaded these and cut them to single sentences. After , his I “trained” the neural voting advice application sentence by sentence by asking it “what party had this sentence in their program?”. Because the “Party for freedom” (right-wing populist party) has a one-page program I downloaded all tweets of their leader Geert Wilders instead. On a set of sentences it never saw before my program guesses the origin correctly in 55% of the cases.

### Why are some of the words replaced by _UNK?

During the reading of the texts, all words that occur less than five times are removed. If you only see these words a few times you are not able to know what they mean in a context. They thus don’t contribute to determining to what party they belong. This neural voting advice application replaces these words by _UNK.

### Why did your program get sentence XXX wrong?

We humans have certain associations with political parties. Sometimes this is another association my program got after reading the party program. There are two reasons for this: first of all, we know exactly what each word means, and what it means in a context. If we read a program for the first time we know exactly what the party means, where our computer has to learn everything about the dutch language from scratch. Second of all, we have more information about the political partys than just their program. Most of us read the newspapers, listen to the news, watching debates, etc instead of reading the program. If we would add more information, this program would be better.

### I have a remark/complaint/idea

Send me an e-mail!

### Are there any similar sites?

After I wrote my program I found this website: <http://www.bigdatarepublic.nl/stemradar/> . The difference is that that program only looks at words in each sentence, not at the context of the words.
