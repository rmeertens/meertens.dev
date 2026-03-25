---
title: "World’s longest palindrome?"
date: "2018-08-02"
slug: "worlds-longest-palindrome"
excerpt: "In honor of the 20th of February, 2002, a palindromic date, Peter Norvig designed his worlds longest unique palindromic sentence of 21,012 words(http://norvig.com/palindrome.html). With a new..."
original_url: "https://www.pinchofintelligence.com/worlds-longest-palindrome/"
thumbnail: "https://www.pinchofintelligence.com/wp-content/uploads/2018/08/explanation.png"
---

In honor of the 20th of February, 2002, a palindromic date, Peter Norvig designed his [worlds longest unique palindromic sentence of 21,012 words](http://norvig.com/palindrome.html). With a new palindromic date approaching [on August 10, 2018 (8102018)](https://www.livescience.com/33583-palindrome-dates-21st-century-weird.html), I wanted to take some time to see if I could put my own spin on a palindrome world record. While Norvig focused on making his palindrome out of unique words, I just wanted to fit in as many words as possible.

The result is a palindrome which contains 64,810 unique phrases. I believe this palindrome contains every word from the noun-phrase dictionary that could possibly be included.  
This blogpost/notebook will explain what thought process I went through to create the most complete palindromic sentence. First I will briefly explain Norvig’s approach and my own idea. Then I will delve into the solution Norvig provides. Lastly, I will explain in detail how I adapted his code to come to my palindromic sentence. If you rather read this blogpost in a Jupyter notebook, or play around with the code: look at the [GitHub repository here](https://github.com/rmeertens/palindromes)!

## Palindrome statistics

Created for: 8-10-2018 (American notation)  
Words: 1,155,699  
Letters: 5,813,576  
Phrases: 954,401  
Unique noun phrases: 64,810  
Palindrome: A man, a plan, Imo, Naida, … ([more](https://github.com/rmeertens/palindromes/raw/master/longest_palindrome.txt)) …, Adi, a nominal, Panama  
Storyboard:  
![Storyboard](https://docs.google.com/drawings/d/e/2PACX-1vT5Rf2U62ZrlLT4XEh4-eG50HPNqPDfENJx_GpHpyIz9b6to2b7ljvHCKg9Osoc-4-QmxFrV2Y8CZIU/pub?w=1085&h=135)

Norvig set himself the task to find a palindrome that consisted of only unique words. By dropping this requirement, I was able to create much longer palindromic sentences. Having said that, finding the longest palindrome sentence is not the goal. Putting the word “radar” down a million times gives you a long palindrome, but it’s far from impressive. What I wanted to do, was create a palindromic sentence with as many words of the English language in it as possible. Let’s call this idea a “complete” palindromic sentence, and call Norvig’s idea a “unique” palindromic sentence.

To understand my approach, it’s best to first take a look at Peter Norvig’s solution. He created his palindrome by [depth first searching](https://en.wikipedia.org/wiki/Depth-first_search) for letters that, when added in the middle, would simultaneously complete both sentences on the left and right of the palindrome. When a word on either the left or right side is complete, that word can’t be used anymore. The image below is a shortened version of his approach in a simple graphic. I recommend [visiting his website](http://norvig.com/palindrome.html) for the best explanation.

![image](https://docs.google.com/drawings/d/e/2PACX-1vSY4uM0gjlnh9hu6emhz8UWVk2CZkinZw_Zd99-OQ0z96UXFvz9O1pRsb-v_VAklCWd0jOc1Ea1mNMR/pub?w=960&h=720)

When starting this project I hoped it would be possible to create a sentence with every word in the English language. Although it might not be obvious immediately, this is an impossible task. Take the word Afghanistan. If we would have this word on the left of our palindrome, we would need to have it on the right as well. This means that part of the right part would be the reverse of “AFGHa”. There is no word that starts with GFA, and no word that ends with HG, so there is no way to combine the part “HGFA” in either one or two words. We can thus never include the word Afghanistan in a palindrome.

The next best thing was to create a palindrome that includes as many different words as possible. But how?

The key to include as many words as possible, is to use a structure you can keep adding to. If the mirror of a palindrome is within a word, you can’t expand. By having the mirror in between two words, you can combine separate palindromic sentences into one large sentence. I’ll give a simple example.  
Let’s say I have the sentences: “radar, radar”, “a treble, Elberta”, and “an iron, Norina”. I can combine these to form the palindromic sentence “radar, a treble, an iron, Norina, Elberta, radar”. The only challenge left is finding a palindromic sentence like this for every possible word.

I find these by splitting words in two, and finding a way to complete them into a palindromic sentence on the left of the word and on the right of the word. Take for example: “a plan”. If we split “aplan” into “ap” and “lan”, we have to find a palindromic sentence which contains a word that starts with “pa” (like “panama”). We also need that palindromic sentence to contain a word that ends in “nal” (like nominal). And then, repeat.

![image](https://docs.google.com/drawings/d/e/2PACX-1vSwuQemcxCXHHb72OIs5V56-aFy3Gd14bYHNjX7wRWK1OQmX0Ola7p2Wkd8OtRERRwIXIKt3FY83kPY/pub?w=516&h=301)

Using this technique for the first time, I simply split an input word and tried to find a palindrome that started or ended with both parts of the words. However, I realised that this would not yield a solution for many long words. For example, the word “autocracies” can be split in “autoc” and “racies”. Reversing “racies” we now search for a word that ends with “seicar”, which does not exist. However, as “car” is a word, we can search for words that end with “sei”. This could be “issei” ([a japanese person who migrated to the US](http://www.dictionary.com/browse/issei)). Thus I expanded my palindrome with 25% by being more flexible.

The above is a brief overview of my idea and thinking process. Below we get into the nitty gritty of the coding.

## Starting with Norvig’s solution

Let’s first take a look at the solution Norvig provides. He starts searching simultaneously left and right to come to a sentence which is ok from both sides.

In [1]:
    
    
    from collections import Counter, deque
    import re
    import random
    from multiprocessing import Pool
    import numpy as np
    import matplotlib.pyplot as plt
    
    
    random.seed(0) # make sure the outcome is always the same
    alphabet    = 'abcdefghijklmnopqrstuvwxyz'
    cat         = ''.join
    UndoCommand = str
    DoCommand   = list
    def rev(word): return word[::-1]
    
    class PhraseDict(dict):
        """A dictionary of {letters: phrase}, such as {'donaldeknuth': 'Donald E. Knuth'}, with:
        .prefixes: Counter of {'pre': n} where n is the number of keys that start with 'pre'
        .suffixes: Counter of {'xes': n} where n is the number of keys that end with 'xes'"""
        def __init__(self, phrases):
            
            for phrase in phrases:
                phrase = phrase.strip()
                self[letters(phrase)] = phrase
            self.prefixes = Counter(x for p in self for x in prefixes(p))
            self.suffixes = Counter(x for p in self for x in suffixes(p))
            
    def prefixes(phrase): return [phrase[:i] for i in range(1, len(phrase) + 1)]
    
    def suffixes(phrase): return [phrase[-i:] for i in range(1, len(phrase) + 1)]
    
    def letters(phrase, sub=re.compile(r'[\W]+').sub):
        "Remove all the non-letters from phrase; return lowercase version."
        return sub('', phrase).lower()
    
    DICT = PhraseDict(open('npdict.txt'))
    
    # Converts a list with stripped words as used in the global DICT dictionary into a complete sentence
    # Note that this was already part of the Panama class
    def original_phrase(phrases): return ', '.join(DICT[phrase] for phrase in phrases)
    

In [2]:
    
    
    class Panama:
        """Panama represents a palindrome, or a state in searching for one.
        It has .left and .right to hold the phrases that are chosen,
        and .L and .R to hold the current partial phrases in the middle (still working on these).
        Also, a .set of all complete phrases, and the .dict of allowable phrases to choose from."""
        
        def __init__(self, left=['aman', 'aplan'], L='aca', R='', right=['acanal', 'panama'], dict=DICT):
            assert cat(left + [L]) == cat([R] + right)[::-1]
            self.left   = list(left)        # list of complete phrases on left
            self.L      = L                 # an incomplete phrase on left
            self.R      = R                 # an incomplete phrase on right
            self.right  = deque(right)      # deque of complete phrases on right
            self.dict   = dict              # a {letters: actual_phrase} mapping
            self.set    = set(left + right) # a set of all complete phrases in palindrome
            self.best   = []                # list of phrases in longest palindrome found
            self.Nshown = 0                 # the number of phrases shown in the previous printout
            self.i      = 0                 # the number of steps taken in the search
            self.check()
    
        def __str__(self): return self.original_phrases(self.best)
        
        def original_phrases(self, phrases): return ', '.join(self.dict[phrase] for phrase in phrases)
    
        def search(self, steps=10**6):
            """Depth-first search for palindromes. From the current state, find all applicable actions.
            Do the first one, and put on the stack reminders to undo it and try the others,
            but first search deeper from the result of the first action."""
            stack = [self.applicable_actions()]
            for self.i in range(steps):
                if not stack: 
                    return
                command = stack.pop()
                if isinstance(command, UndoCommand):
                    self.undo(command)
                elif command:
                    act = command.pop()
                    self.do(act)
                    self.check()
                    stack.extend([command, UndoCommand(act), self.applicable_actions()])
                    
        def do(self, act):
            "Modify the current state by adding a letter, or finishing a phrase."
            if act == ',': # finish phrase on left
                self.set.add(self.L)
                self.left.append(self.L)
                self.L = ''
            elif act == ';': # finish phrase on right
                self.set.add(self.R)
                self.right.appendleft(self.R)
                self.R = ''
            else: # add a letter
                self.L = self.L + act 
                self.R = act + self.R
        
        def undo(self, act):
            "Modify the current state by undoing an action that was previously done."
            if act == ',': # unfinish phrase on left
                assert self.L == ''
                self.L = self.left.pop()
                self.set.remove(self.L)
            elif act == ';': # unfinish phrase on right
                assert self.R == ''
                self.R = self.right.popleft()
                self.set.remove(self.R)
            else: # remove a letter
                self.L = self.L[:-1]
                self.R = self.R[1:]
                
        def check(self):
            "Check to see if current state is a palindrome, and if so, record it and maybe print."
            if not self.is_palindrome(): return
            N = len(self.left) + len(self.right) 
            if N > len(self.best):
                self.best = self.left + list(self.right)
                if N - self.Nshown > 1000 or (N > 14000 and N - self.Nshown > 100) or N > 14500:
                    self.Nshown = N
                    print(self.report())
                
        def report(self):
            N = len(self.best)
            nwords = N + sum(self.dict[p].count(' ') for p in self.best)
            nletters = sum(len(p) for p in self.best)
            return ('Pal: {:6,d} phrases, {:6,d} words, {:6,d} letters (at step {:,d})'
                    .format(N, nwords, nletters, self.i+1))
            
        def applicable_actions(self):
            L, R, D = self.L, self.R, self.dict
            actions = []
    
            # Check if L or R are words that are not used yet
            if self.is_allowed(L):
                actions.append(',')
            if self.is_allowed(R):
                actions.append(';')
                
            def score(A): return D.prefixes[L+A] * D.suffixes[A+R]
            for A in sorted(alphabet, key=score):
                if score(A) > 0:
                    actions.append(A)    
                    
            return actions
     
        def is_allowed(self, phrase): return phrase in self.dict and phrase not in self.set
            
        def is_palindrome(self): 
            "Is this a palindrome? (Does any extra .L or .R match the other side?)"
            return ((self.L == '' and self.left[-1].endswith(self.R)) or 
                    (self.R == '' and self.right[0].startswith(self.L)))
    

In [3]:
    
    
    p = Panama();
    p.search(steps=10**4)
    print(p.report())
    print("Start and end of the palindrome of Norvig:")
    print(str(p)[:30] + " ... " + str(p)[-30:])
    
    
    
    Pal:    492 phrases,    693 words,  3,106 letters (at step 10,000)
    Start and end of the palindrome of Norvig:
    a man, a plan, a caretaker, a  ... omarek, a ter, a canal, Panama
    

The best palindrome Norvig found uses 16.111 phrases. This is only a small part of our total dictionary:

In [4]:
    
    
    unused_phrases = len(DICT.keys()) - 16111
    print("%d phrases are not used, this is %d percent" % (unused_phrases, (unused_phrases/len(DICT.keys()))*100))
    
    
    
    109401 phrases are not used, this is 87 percent
    

For my approach to palindromic sentences I wanted to do something different. To prove that a word can actually be used in a sentence we can create a sentence with that word in it. If we create such a sentence for every word, we can concatenate them later into one sentence which contains as much words as possible.

I discovered that Norvig’s Panama class can be extended to do exactly what I wanted to do!

In [5]:
    
    
    class RolandsPalindromeSentence(Panama):
        def __init__(self,left=None, right=None, L='', R='', dict=DICT):
            self.left = left if left is not None else list()
            self.right = deque(right) if right is not None else deque(list())    
            self.L      = L 
            self.R      = R 
            self.dict   = dict    
            self.set    = set() 
            self.best   = []                # list of phrases in longest palindrome found
            self.Nshown = 0                 # the number of phrases shown in the previous printout
            self.i      = 0                 # the number of steps taken in the search
    
        def search(self, steps):
            """Returns if the search found a complete palindromic sentence"""
            stack = [self.applicable_actions()]
            for self.i in range(steps):
                if not stack: 
                    return False
                command = stack.pop()
                if isinstance(command, UndoCommand):
                    self.undo(command)
                elif command:
                    act = command.pop()
                    self.do(act)
                    if self.check():
                        return True
                    stack.extend([command, UndoCommand(act), self.applicable_actions()])
            return False    
        
        def check(self):
            """Only have to check for empty right and left, as this means that we are done... """
            return self.R == '' and self.L == '' 
        
        
        def applicable_actions(self):
            L, R, D = self.L, self.R, self.dict
            actions = []
    
            # Check if L or R are words that are not used yet
            if self.is_allowed(L):
                actions.append(',')
            if self.is_allowed(R):
                actions.append(';')
            nextones = list()
            
            def score(A): return D.prefixes[L+A] * D.suffixes[A+R]
            
            for A in alphabet:
                if score(A) > 0:
                    nextones.append(A)    
            random.shuffle(nextones)        
            return actions + nextones
    

As I wrote down above, sometimes part of the start of the palindrome you are searching already consists of known words. This means that we can split them. Here I give a function that does this from the left, and a function that does this from the right.

In [6]:
    
    
    def generate_subsets_and_leftover(letters):
        """Generate subsets of words from given letters. It starts searching for words
        from the left of the supplied letters. 
        
        yields a tuple ([words], remaining letters at the end of the word)"""
        yield ([], letters)
        for leftover_count in range(1,len(letters)+1):
            start_of_word = letters[:leftover_count]
            if start_of_word in DICT:
                w = start_of_word
                leftover = letters[leftover_count:]
                
                for words, leftover_letters in generate_subsets_and_leftover(leftover):                
                    yield ([w] + words, leftover_letters)
                    
    print([a for a in generate_subsets_and_leftover("amanaplan") ])
    
    def generate_subsets_and_leftover_right(letters):
        """Generate subsets of words from given letters. It starts searching for words
        from the right of the supplied letters
        
        yields a tuple ([words], remaining letters at the start of the word)"""
        yield ([], letters)
        for leftover_count in range(1,len(letters)+1):
            possible_word = letters[-leftover_count:]
            if possible_word in DICT:
                w = possible_word
                leftover = letters[:-leftover_count]
                
                for words, leftover_letters in generate_subsets_and_leftover_right(leftover):                
                    yield (words + [w], leftover_letters)
            
    print([a for a in generate_subsets_and_leftover_right("amanaplan") ])
    
    
    
    [([], 'amanaplan'), (['ama'], 'naplan'), (['ama', 'nap'], 'lan'), (['ama', 'nap', 'lan'], ''), (['aman'], 'aplan'), (['aman', 'apl'], 'an'), (['aman', 'aplan'], ''), (['amana'], 'plan')]
    [([], 'amanaplan'), (['lan'], 'amanap'), (['nap', 'lan'], 'ama'), (['ama', 'nap', 'lan'], ''), (['anap', 'lan'], 'am'), (['aplan'], 'aman'), (['man', 'aplan'], 'a'), (['aman', 'aplan'], '')]
    

Eventually this leads to the following function which splits a word and either returns two searchers (for left and right searching), or returns None when no palindrome could be found.

In [7]:
    
    
    def get_palindrome_for_word(word, num_steps):
        for i in range(1,len(word)):
            must_start_with = rev(word[:i])
            must_end_with = rev(word[i:])
    
            # Search a palindrome which completes the right part of the word
            found_result = False
            for left, leftover in generate_subsets_and_leftover(must_start_with):
                searcher_right = RolandsPalindromeSentence(left=left, L=leftover, R='')
                if searcher_right.search(steps=num_steps): 
                    found_result = True
                    break
            
            if not found_result: 
                continue
                
            # Search a palindrome which completes the left part of the word
            found_result = False
            for right, leftover in generate_subsets_and_leftover_right(must_end_with):
                searcher_left = RolandsPalindromeSentence(L='', R=leftover, right=right)
                
                if searcher_left.search(steps=num_steps):
                    found_result = True
                    break
            if not found_result:
                continue
            
            return searcher_right, searcher_left, word
        return None
    

Finally we defined all helper functions. Time to start searching a palindrome for each word in the dictionary. As we now do this for each phrase in our dictionary this takes quite a long time.

In [8]:
    
    
    words_already_used = set()
    num_steps=10**5 # note that this seems to be enough to traverse the whole tree
    subsolutions = list()
    
    all_words = list(DICT.keys())
    for num, word in enumerate(all_words):
        if word in words_already_used:
            continue
        result = get_palindrome_for_word(word, num_steps)
        if result:
            searcher_right, searcher_left, word = result
            
            left_part_palindrome = list(searcher_right.right) + [word] + searcher_left.left
            right_part_palindrome = list(searcher_left.right) + searcher_right.left
    
            assert cat(left_part_palindrome) == rev(cat(right_part_palindrome))
    
            subsolutions.append((left_part_palindrome, right_part_palindrome))
            
            words_already_used.update(left_part_palindrome)
            words_already_used.update(right_part_palindrome)
    

Now that we have a big collection of subsolutions we can start to create a big sentence out of this. We also add the characteristic “a man, a plan … panama” to it.

In [9]:
    
    
    concat_words = deque()
    subsolutions = subsolutions
    
    for left, right in subsolutions:
        concat_words.extendleft(rev(left)) # note that a deque reverses the order of our words... 
        concat_words.extend(right)
    
    # Add the traditional "a man a plan" as start of the palindrome
    concat_words.extendleft(rev(["aman", "aplan", "imo", "naida"]))
    concat_words.extend(["adi", "anominal", "panama"])
    
    
    assert cat(concat_words) == rev(cat(concat_words))
    total_sentence = original_phrase(concat_words)
    

In [10]:
    
    
    print("The start and end of our palindrome: ")
    print(total_sentence[:100])
    print(total_sentence[-100:])
    
    
    
    The start and end of our palindrome: 
    a man, a plan, Imo, Naida, a fun, a zakat, Calabresi, a gleet, Sheff, Arg, an acyl, a shiai, Liv, a 
    gue, Mavilia, IHS, a lyc, an agraffe, H-steel, Gaiser, Bala, CTA, Kazan, Ufa, Adi, a nominal, Panama
    

Let’s report the statistics of our generated palindrome! Also: let’s write our palindrome to a file so others can read it later.

In [11]:
    
    
    num_words = len(total_sentence.split())
    num_letters = len(total_sentence) - total_sentence.count(' ')
    num_phrases = len(concat_words)
    num_unique_phrases = len(set(concat_words))
    num_unused_phrases = len(DICT.keys()) - num_unique_phrases
    print("Words: %d" % num_words)
    print("Letters: %d" % num_letters)
    print("Phrases: %d" % num_phrases)
    print("Unique noun phrases: %d" % num_unique_phrases)
    print("%d phrases are not used, this is %d percent" % (unused_phrases, (num_unused_phrases/len(DICT.keys()))*100))
    
    with open('longest_palindrome.txt','w') as f:
        f.write(total_sentence)
    
    
    
    Words: 1155699
    Letters: 5813576
    Phrases: 954401
    Unique noun phrases: 64810
    109401 phrases are not used, this is 48 percent
    

### Palyndrome analysis

Now that we have the most complete palyndrome, I thought it would be nice to get some statistics about it. As you can see after running the code below, the most frequent word is “Sal”. I was quite amazed about the longest word. It’s very fitting that the longest word happens to be the voice actor of the [Star Trek computer](https://en.wikipedia.org/wiki/Majel_Barrett).

Also interesting is that when looking at the frequency of occurance we see that the distribution follows [Zipf’s law](https://en.wikipedia.org/wiki/Zipf%27s_law).

In [12]:
    
    
    from collections import Counter
    count_words = Counter(concat_words)
    print("The most common words are:")
    for word, count in count_words.most_common(10):
        print("%s occurs %d times" % (DICT[word], count))
    
    print("\nThe least common words are:")
    for word, count in count_words.most_common()[-10:]:
        print("%s occurs %d times" % (DICT[word], count))
        
    print("\nThe longest words are:")
    sorted_on_length = sorted(list(set(concat_words)), key=len, reverse=True)
    for word in sorted_on_length[:10]:
        print(DICT[word])
    
    labels, values = zip(*count_words.most_common(10000))
    plt.plot(values)
    plt.title("The distribution of the frequency of words")
    plt.show()
    
    
    
    The most common words are:
    Sal occurs 2160 times
    IHS occurs 1909 times
    Nah occurs 1896 times
    Rev occurs 1632 times
    Nam occurs 1590 times
    Rep occurs 1544 times
    Reb occurs 1485 times
    Hsu occurs 1310 times
    TQ occurs 1260 times
    Red occurs 1230 times
    
    The least common words are:
    summae occurs 1 times
    an uraemia occurs 1 times
    daimyos occurs 1 times
    cooeying occurs 1 times
    veterinaries occurs 1 times
    turbos occurs 1 times
    muftis occurs 1 times
    oxymomora occurs 1 times
    private parts occurs 1 times
    uvulatomies occurs 1 times
    
    The longest words are:
    Majel Barrett Roddenberry
    an overapprehensiveness
    a nonrepresentativeness
    an oversystematicalness
    an unrepresentativeness
    a nondeterminativeness
    an unreprehensibleness
    an overaffirmativeness
    a nonreprehensibleness
    an overdecorativeness
    

![](data:image/png;base64,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)

## Conclusion

Hurray! We created the most complete palindromic sentence in the English language! Depending on the search depth for the depth-first search it is possible to not find a palindromic sentence for some words. However, I set the depth so deep this never happens. It’s safe to assume that I included every word out of our dictionary in my palindromic sentence you can possible include.

## Next steps

There are some next challenges I either want work on at another palindromic day, or that someone else can tackle.

### The shortest complete palindromic sentence

While working on this I started wondering what the shortest complete palindromic sentence we can create is. Of course we can create palindromic sentences for every word, and then combine them in a way that covers the most unique words with the shortest sentence. This new problem is a disguised version of the [set cover problem](https://en.wikipedia.org/wiki/Set_cover_problem). The bad news is that this problem is NP-hard, which means that someone probably has to come up with a good heuristic to the problem.

### Multi-threaded attempts

Although Norvig’s solution finds a palindrome in 30 minutes, my solution only takes 10 minutes. However, I think we can parallelize it even more. I made an attempt to introduce multi-threading in my program. Unfortunately, Pythons Global Interpreter Lock hinders any speedup if we want to use only one instance of the dictionary… If you have any ideas on how to improve the speed of my program, please let me know or send in a pull request!

### Find a better dictionary

Let’s be honest, the dictionary we use is terrible. I kept it as Norvig used it for his palindrome, so it offers a nice comparison to his work. However, it would be more impressive if the palindrome made a bit more sense.

Share List