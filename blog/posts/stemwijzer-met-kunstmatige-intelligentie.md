---
title: "Stemwijzer met kunstmatige intelligentie"
date: "2017-03-06"
slug: "stemwijzer-met-kunstmatige-intelligentie"
excerpt: "Volgende week zijn er verkiezingen in Nederland. Met 28 partijen is dit een lastige keuze. Vaak orienteren mensen zich door een stemwijzer in te vullen. Door de 30 belangrijkste vragen van het moment..."
original_url: "https://www.pinchofintelligence.com/stemwijzer-met-kunstmatige-intelligentie/"
---

Volgende week zijn er verkiezingen in Nederland. Met 28 partijen is dit een lastige keuze. Vaak orienteren mensen zich door een stemwijzer in te vullen. Door de 30 belangrijkste vragen van het moment in te vullen zoeken ze een partij die het beste bij ze past.

## Stemwijzer met kunstmatige intelligentie

Al jaren denk ik dat dit beter moet kunnen. In plaats van de 30 vragen in te vullen die iemand anders belangrijk vindt, waarom niet zelf invullen wat jij wilt met Nederland? Zo’n systeem heb ik gemaakt, waarbij kunstmatige intelligentie bepaald bij welke partij jouw ingevoerde zin het beste past: <https://rmeertens.github.io/NeuralVotingAdvice/> .

### Wat kan ik invoeren?

Schrijf in een normale zin op wat je graag wilt met Nederland. Het beste is een zin die langer is dan 10 woorden en korter dan 20 woorden. Het beste werkt een zin die lijkt alsof hij uit een partijprogramma komt. Probeer eens:

  * Door te werken aan een duurzame, reële economie creëren we groene en echte banen.
  * Nederland versterkt de internationale terrorismebestrijding, de inlichtingendiensten en de aanpak van jihadisten.
  * In Nederland gedraag je je. Als je dat doet, dan zijn de mogelijkheden eindeloos.



### Wat gebeurt hier?

Normaal stelt een stemwijzer je een hele hoop vragen, maar heb je niet de kans om zelf aan te geven wat je met Nederland wilt. Om dit te verhelpen wilde ik het volgende maken: je typt een zin in, en de computer bedenkt bij welke partij dit zou passen.  
Om dit te maken heb ik neurale netwerken gebruikt. Deze technieke uit de kunstmatige intelligentie “leest” de zin, en gaat dan gokken uit welk partijprogramma deze komt.

### [![](images/2017/03/stemwijzerbackground-300x200.jpg)](images/2017/03/stemwijzerbackground.jpg)

### Hoe heeft hij dat kunnen leren?

Van de meeste partijen staat het partijprogramma als PDF op hun site. Deze heb ik gedownload en opgeknipt in losse zinnen. Vervolgens “traint” de computer zichzelf door per zin zich af te vragen uit welk partijprogramma deze zin komt. Omdat de Partij voor de Vrijheid een klein partijprogramma heeft heb ik in plaats daarvan de tweets van Geert Wilders toegevoegd. Op een set van zinnen die hij nog nooit gezien heeft kande stemwijzer met kunstmatige intelligentie van 55% de juiste partij raden.

### Waarom leest de computer sommige woorden als _UNK?

Bij het lezen van de teksten worden alle woorden die minder dan 5 keer in alle partijprogrammas voorkomen weggelaten. Omdat je niet goed weet wat de woorden betekenen als je ze maar een paar keer ziet kan je hun context niet goed bepalen. Hierdoor dragen ze weinig bij aan bepalen wat elke partij er mee zou moeten.

### Waarom doet hij zin XXX verkeerd?

Wij mensen associeren bepaalde standpunten met bepaalde partijen. Soms komt dit idee niet overeen met wat dit programma als associatie heeft. Dit heeft twee belangrijke redenen. Ten eerste weten wij precies wat de betekenis van elk woord is. Als wij een partijprogramma voor de eerste keer lezen weten we dus ook meteen wat de partij precies bedoelt. Ten tweede hebben we meer informatie over de partijen dan alleen de partijprogramma’s. De meeste informatie over partijen halen we uit de krant, van het journaal, door het kijken van debatten, niet uit de partijprogramma’s dus. Als we meer informatie zouden toevoegen, zou de stemwijzer met kunstmatige intelligentie het natuurlijk ook beter doen.

### Ik heb een opmerking/klacht/idee

Neem contact met me op via e-mail.

### Zijn er vergelijkbare sites?

Nadat de stemwijzer met kunstmatige intelligentie geschreven had kwam ik deze site tegen: http://www.bigdatarepublic.nl/stemradar/ . Het verschil is dat ze hier puur kijken naar de woorden in de zin, en niet de context.
