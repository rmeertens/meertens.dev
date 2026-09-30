/* Robot parade: famous pixel-art robots walking along the site footer. */
(function () {
  "use strict";

  var PALETTE = {
    k: "#1c1917", // outline
    w: "#fafaf9", // white
    s: "#d6d3d1", // silver
    g: "#a8a29e", // grey
    G: "#57534e", // dark grey
    b: "#2563eb", // blue
    r: "#dc2626", // red
    y: "#facc15", // yellow
    Y: "#ca8a04", // dark yellow
    o: "#e0a526", // gold
    O: "#9a6a12", // dark gold
    c: "#38bdf8", // cyan
    e: "#f97316", // orange
    h: "#f2c29b", // skin
    v: "#16a34a", // circuit-board green
    N: "#1a1730", // Wayve deep navy
    q: "#03b5d1", // Wayve light blue
    p: "#4a338a", // Wayve purple
    E: "#eb5c24", // Wayve orange
    f: "#fff5f0", // Wayve off-white
    d: "#9aa0a8", // body seams
    x: "#3f444b", // alloy wheel
    z: "#9aa1a9", // wheel spokes
  };

  // Sprites face right. `legs` holds the two walk frames appended under `body`
  // and `top` two frames prepended above it (drone rotors); `bob: true`
  // animates by bobbing the whole sprite instead.
  var ROBOTS = [
    {
      id: "r2d2", name: "R2-D2", speed: 24, step: 0.28, bob: true, act: "beep",
      quotes: ["Bweep-bwoop!", "Bee-doo-dee-doo!", "*excited whistling*"],
      body: [
        "....kkkkk....",
        "..kkssssskk..",
        ".ksbbsksbbsk.",
        "kssssssrssssk",
        "kkkkkkkkkkkkk",
        "kwkwbbbbbwkwk",
        "kwkwwwwwwwkwk",
        "kwkwbwbwbwkwk",
        "kwkwwwwwwwkwk",
        "kwkwbbwbbwkwk",
        "kwkwwwwwwwkwk",
        "kwkwwbbbwwkwk",
        "kgkkwwwwwkkgk",
        "kgk.kgggk.kgk",
        "kgk..kgk..kgk",
        "kkkk.kkk.kkkk",
      ],
    },
    {
      id: "c3po", name: "C-3PO", speed: 20, step: 0.5, act: "shake",
      quotes: ["Oh my! We're doomed.", "I am fluent in over six million forms of communication.", "Don't call me a mindless philosopher!"],
      body: [
        "...kkkkk...",
        "..kooooOk..",
        "..koyoyOk..",
        "..koooOOk..",
        "...kOOOk...",
        "....kOk....",
        ".kkkkkkkkk.",
        "kokoooookok",
        "kokOoOoOkok",
        "kokoooookok",
        "kokoooookok",
        "kOkkOOOkkOk",
        "...kOoOk...",
      ],
      legs: [
        ["..kok.kok..", ".kok...kok.", ".kOk...kOk."],
        ["..kok.kok..", "..kok.kok..", "..kOk.kOk.."],
      ],
    },
    {
      id: "walle", name: "WALL-E", speed: 18, step: 0.25, act: "cube",
      quotes: ["Eeeeh-vaaa?", "Waaall-eee!", "*compacts trash lovingly*"],
      body: [
        "....kkkk.kkkk...",
        "....kGwk.kGwk...",
        "....kGGk.kGGk...",
        ".....kk...kk....",
        "........k.......",
        "........k.......",
        ".kkkkkkkkkkkk...",
        ".kyyyyyyyyyyk...",
        ".kyYYYYYYYYyk...",
        ".kyYrrYYyyYykGGk",
        ".kyYYYYYYYYyk...",
        ".kyyyyyyyyyyk...",
        ".kkkkkkkkkkkk...",
      ],
      legs: [
        ["kGGGGGGGGGGGGk..", "kGgGGgGGgGGgGk..", ".kkkkkkkkkkkk..."],
        ["kGGGGGGGGGGGGk..", "kGGgGGgGGgGGGk..", ".kkkkkkkkkkkk..."],
      ],
    },
    {
      id: "mo", name: "M-O", speed: 30, step: 0.12, bob: true, act: "clean",
      quotes: ["Foreign contaminant!", "*siren noises*", "M-O! M-O!"],
      body: [
        "..kkkkkkk...",
        ".kwwwwwwwk..",
        ".kkkkkkkkk..",
        ".kkckkkckk..",
        ".kwwwwwwwk..",
        "..kwwwwwkkek",
        "..kwwwwwkeee",
        "..kkkkkkk.e.",
        "....kGk.....",
        "...kGgGk....",
        "....kkk.....",
      ],
    },
    {
      id: "eve", name: "EVE", speed: 30, step: 0.6, bob: true, lift: 16, act: "fly",
      quotes: ["Directive?", "WALL-E!", "Eee-vah."],
      body: [
        "...kkkkk...",
        "..kwwwwwk..",
        ".kwwwwwwwk.",
        ".kkkkkkkkk.",
        ".kkcckcckk.",
        ".kkkkkkkkk.",
        "..kwwwwwk..",
        ".kwwwwwwwk.",
        "kwkwwwwwkwk",
        "kwkwwwwwkwk",
        "kwkwwwwwkwk",
        ".k.kwwwk.k.",
        "...kwwwk...",
        "....kwk....",
        ".....k.....",
      ],
    },
    {
      id: "bender", name: "Bender", speed: 26, step: 0.4, act: "jump",
      quotes: ["Kill all humans!", "Bite my shiny metal... never mind.", "I'm back, baby!"],
      body: [
        "......k......",
        "......k......",
        ".....kgk.....",
        "....kkkkk....",
        "...ksssggk...",
        "..ksssggggk..",
        "..ksssggggk..",
        "..kkkkkkkkk..",
        "..kkwwkwwkk..",
        "..kkwkkwkkk..",
        "..kkkkkkkkk..",
        "..ksssggggk..",
        "..kwkwkwkwk..",
        "..ksssggggk..",
        "...kkkkkkk...",
        ".kkkkkkkkkkk.",
        "kgksssgggkgk.",
        "kgksssgggkgk.",
        "kgkssskkgkgk.",
        "kgkssskgkkgk.",
        "kkkssskkkkkk.",
        "...kkkkkkk...",
      ],
      legs: [
        ["...kgk.kgk...", "..kgk...kgk..", ".kkkk...kkkk."],
        ["...kgk.kgk...", "...kgk.kgk...", "..kkkk.kkkk.."],
      ],
    },
    {
      id: "t800", name: "T-800", speed: 22, step: 0.45, act: "back",
      quotes: ["I'll be back.", "Hasta la vista, baby.", "Come with me if you want to live."],
      body: [
        "...kkkkk...",
        "..ksssssk..",
        ".ksssssssk.",
        ".ksssssssk.",
        ".kkrkskrkk.",
        ".ksskkkssk.",
        "..kwkwkwk..",
        "...kkkkk...",
        "....ksk....",
        ".kkkkkkkkk.",
        "kskGsGsGksk",
        "kskGsGsGksk",
        "kskkGsGkksk",
        "kGk.kGk.kGk",
        "...kkskk...",
      ],
      legs: [
        ["..ksk.ksk..", ".ksk...ksk.", ".kkk...kkk."],
        ["..ksk.ksk..", "..ksk.ksk..", "..kkk.kkk.."],
      ],
    },
    {
      id: "dalek", name: "Dalek", speed: 16, step: 0.5, bob: true, act: "zap",
      quotes: ["EXTERMINATE!", "EX-TER-MIN-ATE!", "RESISTANCE IS USELESS!"],
      body: [
        ".....kkk.....",
        "....kgggk....",
        "...kgggggkGGc",
        "...kkkkkkk...",
        "...kGkGkGk...",
        "...kkkkkkk...",
        "..koooooook..",
        "..koooooookGG",
        "..koooooook..",
        "..kOoOoOoOk..",
        ".kooOooOooOk.",
        ".kOoooOoooOk.",
        "kooOoooOoooOk",
        "koooooooooook",
        "kOooOooOooOok",
        "kkkkkkkkkkkkk",
      ],
    },
    {
      id: "baymax", name: "Baymax", speed: 14, step: 0.6, act: "inflate",
      quotes: ["On a scale of 1 to 10, how would you rate your pain?", "Hello. I am Baymax.", "Hairy baby!"],
      body: [
        "...kkkkkkk...",
        "..kwwwwwwwk..",
        "..kwkgggkwk..",
        "..kwwwwwwsk..",
        "...kkkkkkk...",
        "..kkwwwwwkk..",
        ".kwwwwwwwwsk.",
        "kwwwwwwwwwwsk",
        "kwwwwwwwwwwsk",
        "kwwwwwwwwwwsk",
        "kwwwwwwwwwwsk",
        "kwwwwwwwwwwsk",
        ".kwwwwwwwwsk.",
        "..kwwwwwwsk..",
      ],
      legs: [
        ["..kwwk.kwsk..", "..kkkk.kkkk.."],
        ["...kwwkwsk...", "...kkkkkkk..."],
      ],
    },
    {
      id: "irongiant", name: "The Iron Giant", speed: 15, step: 0.6, act: "fly",
      palette: { G: "#475569", g: "#64748b" },
      quotes: ["Superman.", "I am not a gun.", "Souls don't die."],
      body: [
        "....kkkkk....",
        "...kgGGGGk...",
        "..kgGGGGGGk..",
        "..kgyyGyyGk..",
        "..kgGGGGGGk..",
        "..kGkkkkkGk..",
        "...kGGGGGk...",
        "....kkkkk....",
        ".kkkkkkkkkkk.",
        "kgGgGGGGGGGGk",
        "kgkgGGGGGGkGk",
        "kgkgGGGGGGkGk",
        "kgkgGGGGGGkGk",
        "kgk.kgGGk.kGk",
        "kgk.kgGGk.kGk",
        "kkk.kGGGk.kkk",
      ],
      legs: [
        ["...kGk.kGk...", "..kGk...kGk..", "..kGk...kGk..", ".kkkk...kkkk."],
        ["...kGk.kGk...", "...kGk.kGk...", "...kGk.kGk...", "..kkkk.kkkk.."],
      ],
    },
    {
      id: "marvin", name: "Marvin", speed: 10, step: 0.8, act: "slump",
      quotes: ["Life. Don't talk to me about life.", "Brain the size of a planet, and they ask me to walk in a footer.", "I think you ought to know I'm feeling very depressed."],
      body: [
        "..kkkkkkk..",
        ".kwwwwwwsk.",
        "kwwwwwwwwsk",
        "kwkkwwwkksk",
        "kwkkwwwkksk",
        "kwwwwwwwwsk",
        "kwwwkkkwwsk",
        ".kwwwwwwsk.",
        "..kkkkkkk..",
        "....kgk....",
        "...kgggk...",
        "..kgkgkgk..",
        "..kgkgkgk..",
        "..k.kgk.k..",
      ],
      legs: [
        ["...kgkgk...", "...kg.gk...", "...kk.kk..."],
        ["...kgkgk...", "....kgk....", "....kkk...."],
      ],
    },
    {
      id: "spot", name: "Spot", speed: 34, step: 0.22, act: "dance",
      quotes: ["*does a little dance*", "*robot dog noises*", "*uptown funk intensifies*"],
      body: [
        "............kkk.",
        "..kkkkkkkkkkkGGk",
        ".kyyyyyyyyyykGGk",
        ".kyYYYYYYYYykkkk",
        "..kkkkkkkkkk....",
      ],
      legs: [
        ["..kGk....kGk....", ".kGk......kGk...", ".kk.......kk...."],
        ["..kGk....kGk....", "...kGk..kGk.....", "...kk....kk....."],
      ],
    },
    {
      id: "bb8", name: "BB-8", speed: 30, step: 0.2, bob: true, act: "jump",
      quotes: ["*happy chirping*", "*thumbs up (lighter flame)*", "Bip-bwop!"],
      body: [
        "....kkk....",
        "...kwwwk...",
        "..kwkkwwk..",
        "..kkkkkkk..",
        ".kkwwwwwkk.",
        "kwweeeeewwk",
        "kwewwwwwewk",
        "kewwgggwwek",
        "kewwgwgwwek",
        "kewwgggwwek",
        "kwewwwwwewk",
        "kwweeeeewwk",
        ".kkwwwwwkk.",
        "...kkkkk...",
      ],
    },
    {
      id: "johnny5", name: "Johnny 5", speed: 22, step: 0.25, act: "jump",
      quotes: ["Number 5 is alive!", "Need input!", "No disassemble!"],
      body: [
        "...kk...kk...",
        "..kkkkkkkkk..",
        ".kgGcgkgGcgk.",
        "..kkkkkkkkk..",
        "......k......",
        "......k......",
        "....kkkkk....",
        "..kkkgggkkk..",
        ".kgkgGGGgkgk.",
        ".kgkgggggkgk.",
        ".kk.kgggk.kk.",
        "....kgggk....",
        "...kkkkkkk...",
      ],
      legs: [
        [".kGGGGGGGGGk.", ".kGgGGgGGgGk.", "..kkkkkkkkk.."],
        [".kGGGGGGGGGk.", ".kGGgGGgGGgk.", "..kkkkkkkkk.."],
      ],
    },
    {
      id: "robby", name: "Robby the Robot", speed: 14, step: 0.55, act: "shake",
      palette: { G: "#334155", s: "#94a3b8" },
      quotes: ["Welcome to Altair IV.", "Sorry miss, I was giving myself an oil job.", "*antennae whirring*"],
      body: [
        "..k.......k..",
        "...k.kkk.k...",
        "....kccck....",
        "...kcwccck...",
        "...kccccck...",
        "..kkkkkkkkk..",
        "..kGsGsGsGk..",
        "..kkkkkkkkk..",
        ".kkGGGGGGGkk.",
        "kGkGGsGsGGkGk",
        "kGkGGGGGGGkGk",
        "kGkkGGGGGkkGk",
        "kk.kGGGGGk.kk",
        "...kkkkkkk...",
      ],
      legs: [
        ["...kGk.kGk...", "..kGGk.kGGk..", "..kkkk.kkkk.."],
        ["...kGk.kGk...", "...kGGkGGk...", "...kkkkkkk..."],
      ],
    },
    {
      id: "k9", name: "K-9", speed: 20, step: 0.3, bob: true, act: "shake",
      quotes: ["Affirmative, master.", "Negative.", "*wags antenna*"],
      body: [
        "k...........k...",
        ".k.........kgk..",
        "..kkkkkkkkkggggk",
        "..kgggggggkgkgck",
        "..kgGGGGGgkggggk",
        "..kgggggggkkkkk.",
        "..kGgGgGgGk.....",
        "..kkkkkkkkk.....",
        "...kGk..kGk.....",
        "...kkk..kkk.....",
      ],
    },
    {
      id: "rosie", name: "Rosie", speed: 24, step: 0.3, bob: true, act: "shake",
      palette: { g: "#93b4c8" },
      quotes: ["*sweeps the footer*", "Who left all these pixels lying around?", "Dinner's ready!"],
      body: [
        ".....k.....",
        "....kbk....",
        "..kkkkkkk..",
        ".kgggggggk.",
        ".kgcgggcgk.",
        ".kgggggggk.",
        ".kgkkkkkgk.",
        "..kkkkkkk..",
        "...kgggk...",
        "..kwwwwwk..",
        "kgkwwwwwkgk",
        "kgkwwrwwkgk",
        "kk.kwwwk.kk",
        "...kgggk...",
        "..kgggggk..",
        ".kgggggggk.",
        ".kkkkkkkkk.",
        "....kGk....",
        "....kkk....",
      ],
    },
    {
      id: "astroboy", name: "Astro Boy", speed: 28, step: 0.3, act: "fly",
      quotes: ["Up, up and away!", "*rocket boots engaged*", "100,000 horsepower!"],
      body: [
        "..k...k....",
        "..kk.kk....",
        "..kkkkkkk..",
        ".kkkkkkkkk.",
        ".kkhhhhhkk.",
        ".khkhhhkhk.",
        ".khhhhhhhk.",
        "..khhhhhk..",
        "...kkkkk...",
        ".khkhhhkhk.",
        "khkhhhhhkhk",
        "khkhhhhhkhk",
        "kk.kkkkk.kk",
        "...kkkkk...",
      ],
      legs: [
        ["..khk.khk..", ".khk...khk.", ".krrk..krrk", ".kkkk..kkkk"],
        ["..khk.khk..", "..khk.khk..", "..krrkkrrk.", "..kkkkkkkk."],
      ],
    },
    {
      id: "robocop", name: "RoboCop", speed: 16, step: 0.55, act: "shake",
      palette: { s: "#b8c4d4" },
      quotes: ["Dead or alive, you're coming with me.", "Your move, creep.", "Thank you for your cooperation."],
      body: [
        "...kkkkk...",
        "..ksssssk..",
        ".ksssssssk.",
        ".kkkkkkkkk.",
        ".ksssssssk.",
        ".kshhhhhsk.",
        "..khhkhhk..",
        "...khhhk...",
        ".kkkkkkkkk.",
        "ksksssssksk",
        "ksksGsGsksk",
        "ksksssssksk",
        "kGkkGGGkkGk",
        "...ksssk...",
      ],
      legs: [
        ["..ksk.ksk..", ".ksk...ksk.", ".kkk...kkk."],
        ["..ksk.ksk..", "..ksk.ksk..", "..kkk.kkk.."],
      ],
    },
    {
      id: "roomba", name: "Roomba", speed: 40, step: 0.15, bob: true, act: "spin",
      quotes: ["*bonk*", "*vroom*", "Cleaning mode: chaotic."],
      body: [
        "...kkkkkk...",
        ".kkGGGGGGkk.",
        "kGGGGcGGGGGk",
        "kggggggggggk",
        ".kkkkkkkkkk.",
      ],
    },
    {
      id: "curiosity", name: "Curiosity", speed: 8, step: 0.6, act: "flash",
      quotes: ["*takes a selfie*", "Hello from Mars!", "Happy birthday to me..."],
      body: [
        "..........kkk...",
        "..........kGk...",
        "...........k....",
        "...........k....",
        ".kkkkkkkkkkkkk..",
        ".kwwwwwwwwwwwk..",
        ".kgggggggggggk..",
        ".kkkkkkkkkkkkk..",
        "..k....k....k...",
      ],
      legs: [
        [".kGk..kGk..kGk..", ".kkk..kkk..kkk.."],
        [".kgk..kgk..kgk..", ".kkk..kkk..kkk.."],
      ],
    },
    {
      id: "hal", name: "HAL 9000", speed: 12, step: 0.8, bob: true, act: "refuse",
      quotes: ["I'm sorry, Dave. I'm afraid I can't do that.", "This conversation can serve no purpose anymore.", "Daisy, Daisy, give me your answer do..."],
      body: [
        "kkkkkkkkk",
        "kgsssssgk",
        "kGGGGGGGk",
        "kGkkkkkGk",
        "kGkrrrkGk",
        "kGrryrrGk",
        "kGkrrrkGk",
        "kGkkkkkGk",
        "kGGGGGGGk",
        "kGkGkGkGk",
        "kGGGGGGGk",
        "kkkkkkkkk",
      ],
    },
    {
      id: "cupcake", name: "Roland's Cupcake Robot", speed: 18, step: 0.3, bob: true, act: "cupcake",
      quotes: ["Cupcake? Built by Roland.", "Please take one. Keep your distance.", "*social distancing intensifies*"],
      body: [
        "..kkk...kkk..",
        ".kwwwk.kwwwk.",
        ".kOOOk.kOOOk.",
        "kkkkkkkkkkkkk",
        "kbbbbbbbbbbbk",
        "kbsssssssssbk",
        "kbbbbbbbbbbbk",
        "kbbbbbbbbbbbk",
        "kkkkkkkkkkkkk",
        ".kGk.....kGk.",
        ".kkk.....kkk.",
      ],
    },
    // Wayve's fleet, drawn from photos of the real vehicles.
    {
      id: "wayve-twizy", name: "Wayve Renault Twizy", pin: "wayve", speed: 20, step: 0.2, act: "jump",
      palette: { w: "#1b8fd6", d: "#146aa0", G: "#2a3440" },
      quotes: ["Learning to drive in a day! (Cambridge, 2017)", "*reinforcement learning intensifies*", "Where it all started."],
      body: [
        "....kkkkkkkkk.....",
        "...kwwwwwwwwwk....",
        "..kwwwwwwwwwwwk...",
        "..kwk.....kkGGk...",
        "..kwk..kk..kGGGk..",
        "..kwk..kGk..kGGk..",
        "..kwwk.kGkkkwwwwk.",
        ".kwwwwkkkkkkwwwwyk",
        ".krwwwwwwwwwwwwwwk",
      ],
      legs: [
        [".kkkkkkwwwwkkkkkwk", ".kkkkkkkwwkkkkkkkk", ".kksgskkkkkksgskkk", "..kgggk....kgggk..", "..ksgsk....ksgsk..", "...kkk......kkk..."],
        [".kkkkkkwwwwkkkkkwk", ".kkkkkkkwwkkkkkkkk", ".kkgsgkkkkkkgsgkkk", "..ksgsk....ksgsk..", "..kgsgk....kgsgk..", "...kkk......kkk..."],
      ],
    },
    {
      id: "wayve-mache", name: "Wayve Mach-E robotaxi", pin: "wayve", speed: 44, step: 0.12, act: "dash",
      palette: { w: "#c7cbd1", d: "#9aa0a8", G: "#27303b" },
      quotes: ["Now picking up Uber riders in London!", "Small sensor box, big brain.", "No HD map needed. I learned London."],
      body: [
        "................kk....kk........",
        "................kkkkkkkk........",
        ".........kkkkkkkkkkkkkk.........",
        "......kkkGGGGGGGkGGGGGGkk.......",
        "...kkkwwkGGGGGGGkGGGGGGGGkk.....",
        ".kkwwwwwwwwwwwwwwdwwwwwwwwwwkk..",
        ".kwwwwwwwwwsswwwwdwwsswwwwwwwwkk",
        ".krwwwwwwwwwwwwwwdwwwwwwwwwwwwyk",
        ".kwwwwwwwwwwwwwwwdwwwwwwwwwwwwwk",
      ],
      legs: [
        [".kwwkkkkkkkwwwwwwdwwwwkkkkkkkwwk", ".kwkkkkkkkkkwwwwwdwwwkkkkkkkkkwk", ".kwkkkxxxkkkwwwwwdwwwkkkxxxkkkwk", ".kwkkxxzxxkkwwwwwdwwwkkxxzxxkkwk", ".kkkkxzzzxkkkkkkkkkkkkkxzzzxkkkk", "....kxxzxxk...........kxxzxxk...", ".....kxxxk.............kxxxk....", "......kkk...............kkk....."],
        [".kwwkkkkkkkwwwwwwdwwwwkkkkkkkwwk", ".kwkkkkkkkkkwwwwwdwwwkkkkkkkkkwk", ".kwkkkxxxkkkwwwwwdwwwkkkxxxkkkwk", ".kwkkxzxzxkkwwwwwdwwwkkxzxzxkkwk", ".kkkkxxzxxkkkkkkkkkkkkkxxzxxkkkk", "....kxzxzxk...........kxzxzxk...", ".....kxxxk.............kxxxk....", "......kkk...............kkk....."],
      ],
    },
    {
      id: "wayve-leaf", name: "Wayve Nissan LEAF robotaxi", pin: "wayve", speed: 36, step: 0.12, act: "flash",
      palette: { w: "#f3f3f1", d: "#c9ccd0", G: "#262d36" },
      quotes: ["Konnichiwa, Tokyo!", "Robotaxi prototype, reporting for duty.", "360° cameras, radar and lidar on board."],
      body: [
        "................................",
        ".................kkkk...........",
        ".........kkkkkkkkkkkkkk.........",
        "......kkkGGGGGGGkGGGGGGkk.......",
        "...kkkkkkGGGGGGGkGGGGGGGGkk.....",
        ".kkwwwwwwwwwwwwwwdwwwwwwwwwwkk..",
        ".kwwwwwwwwwsswwwwdwwsswwwwwwwwkk",
        ".krwwwwwwwwwwwwwwdwwwwwwwwwwwwyk",
        ".kwwwwwwwwwwwwwwwdwwwwwwwwwwwwwk",
      ],
      legs: [
        [".kwwkkkkkkkwwwwwwdwwwwkkkkkkkwwk", ".kwkkkkkkkkkwwwwwdwwwkkkkkkkkkwk", ".kwkkkxxxkkkGkGwGwkGkkkkxxxkkkwk", ".kkkkxxzxxkkkkkkkkkkkkkxxzxxkkkk", ".kkkkxzzzxkkkkkkkkkkkkkxzzzxkkkk", "....kxxzxxk...........kxxzxxk...", ".....kxxxk.............kxxxk....", "......kkk...............kkk....."],
        [".kwwkkkkkkkwwwwwwdwwwwkkkkkkkwwk", ".kwkkkkkkkkkwwwwwdwwwkkkkkkkkkwk", ".kwkkkxxxkkkGkGwGwkGkkkkxxxkkkwk", ".kkkkxzxzxkkkkkkkkkkkkkxzxzxkkkk", ".kkkkxxzxxkkkkkkkkkkkkkxxzxxkkkk", "....kxzxzxk...........kxzxzxk...", ".....kxxxk.............kxxxk....", "......kkk...............kkk....."],
      ],
    },
    {
      id: "kitt", name: "KITT", speed: 40, step: 0.12, act: "dash",
      palette: { w: "#232428", d: "#3a3c42", G: "#5a6b78" },
      quotes: ["Turbo boost!", "Michael, we have a problem.", "I am the voice of the Knight Industries Two Thousand."],
      body: [
        "...........kkkkkkkk...............",
        "........kkkGGGGkGGGGkk............",
        ".....kkkGGGGGGGkGGGGGGkkk.........",
        "..kkkwwwwwwwwwwwdwwwwwwwwwkkkkk...",
        ".kwwwwwwwwwwwwwwdwwwwwwwwwwwwwwkk.",
        ".krwwwwwwwwwwwwwdwwwwwwwwwwwrrrrrk",
        ".kwwwwwwwwwwwwwwdwwwwwwwwwwwwwwwwk",
      ],
      legs: [
        [".kwwkkkkkkkwwwwwdwwwwwwkkkkkkkwwwk", ".kwkkkkkkkkkwwwwdwwwwwkkkkkkkkkwwk", ".kwkkkxxxkkkwwwwdwwwwwkkkxxxkkkwwk", ".kwkkxxzxxkkwwwwdwwwwwkkxxzxxkkwwk", ".kkkkxzzzxkkkkkkkkkkkkkkxzzzxkkkkk", "....kxxzxxk............kxxzxxk....", ".....kxxxk..............kxxxk.....", "......kkk................kkk......"],
        [".kwwkkkkkkkwwwwwdwwwwwwkkkkkkkwwwk", ".kwkkkkkkkkkwwwwdwwwwwkkkkkkkkkwwk", ".kwkkkxxxkkkwwwwdwwwwwkkkxxxkkkwwk", ".kwkkxzxzxkkwwwwdwwwwwkkxzxzxkkwwk", ".kkkkxxzxxkkkkkkkkkkkkkkxxzxxkkkkk", "....kxzxzxk............kxzxzxk....", ".....kxxxk..............kxxxk.....", "......kkk................kkk......"],
      ],
    },
    {
      id: "optimus", name: "Optimus Prime", speed: 20, step: 0.45, act: "dash",
      quotes: ["Autobots, roll out!", "Freedom is the right of all sentient beings.", "*transformation noises*"],
      body: [
        "...k.....k...",
        "...kbkkkbk...",
        "...kbbbbbk...",
        "...kbcbcbk...",
        "...kbsssbk...",
        "....kkkkk....",
        ".kkkkkkkkkkk.",
        "krkcccrccckrk",
        "krkcccrccckrk",
        "krkrrrrrrrkrk",
        "kGkkksssskkGk",
        "...kbbbbbk...",
      ],
      legs: [
        ["...kbk.kbk...", "..kbk...kbk..", "..kbk...kbk..", ".kkkk...kkkk."],
        ["...kbk.kbk...", "...kbk.kbk...", "...kbk.kbk...", "..kkkk.kkkk.."],
      ],
    },
    {
      id: "claptrap", name: "Claptrap", speed: 26, step: 0.2, bob: true, act: "dance",
      quotes: ["Minion!", "Stairs! NOOOOO!", "Let me teach you the secret handshake!"],
      body: [
        ".kkkkkkkk..",
        ".kyyyyyyk..",
        ".kykkkkyk..",
        ".kykcckyk..",
        ".kykcckyk..",
        ".kykkkkyk..",
        "kykyyyyykyk",
        "kykyYYYykyk",
        "kk.kyyyk.kk",
        "...kkkkk...",
        "....kGk....",
        "...kGsGk...",
        "...kGGGk...",
        "....kkk....",
      ],
    },
    {
      id: "asimo", name: "ASIMO", speed: 18, step: 0.4, act: "jump",
      quotes: ["Hello! I am ASIMO.", "*waves politely*", "I can climb stairs, you know."],
      body: [
        "...kkkkk...",
        "..kwwwwwk..",
        ".kwkkkkkwk.",
        ".kwkkkkkwk.",
        ".kwwwwwwwk.",
        "..kkkkkkk..",
        ".kkwwwwwkk.",
        "kwkwwgwwkwk",
        "kwkwwwwwkwk",
        "kwkwwwwwkwk",
        "kgkkwwwkkgk",
        "...kwwwk...",
      ],
      legs: [
        ["..kwk.kwk..", ".kwk...kwk.", ".kgk...kgk.", ".kkk...kkk."],
        ["..kwk.kwk..", "..kwk.kwk..", "..kgk.kgk..", "..kkk.kkk.."],
      ],
    },
    {
      id: "b9", name: "B-9 (Lost in Space)", speed: 14, step: 0.3, act: "flash",
      quotes: ["Danger, Will Robinson!", "That does not compute.", "Warning! Warning!"],
      body: [
        "....kkkkk....",
        "...kcycyck...",
        "...kccccck...",
        "..kkkkkkkkk..",
        "..kgGgGgGgk..",
        "...kgggggk...",
        ".kkkgrgrgkkk.",
        "kgkkgggggkkgk",
        "kgk.kgggk.kgk",
        "kkk.kgggk.kkk",
        "...kgggggk...",
        "..kgggggggk..",
      ],
      legs: [
        ["..kGGGGGGGk..", "..kGgGgGgGk..", "...kkkkkkk..."],
        ["..kGGGGGGGk..", "..kgGgGgGgk..", "...kkkkkkk..."],
      ],
    },
    {
      id: "cozmo", name: "Cozmo", speed: 22, step: 0.18, act: "jump",
      quotes: ["*happy beeps*", "Cozmo!", "*stacks a cube*"],
      body: [
        "..kkkkkkk..",
        "..kkkkkkk..",
        "..kcckcck..",
        "..kcckcck..",
        "..kkkkkkk..",
        ".kwwwwwwwk.",
        ".kwwwwwwwkk",
        ".kwwwwwwwkr",
        ".kkkkkkkkkr",
      ],
      legs: [
        ["kGGGGGGGGk.", "kGgGGgGGgk.", ".kkkkkkkk.."],
        ["kGGGGGGGGk.", "kGGgGGgGGk.", ".kkkkkkkk.."],
      ],
    },
    {
      id: "pepper", name: "Pepper", speed: 16, step: 0.5, bob: true, act: "flash",
      quotes: ["Hello! I'm Pepper.", "*shows an ad on my tablet*", "Shall we take a selfie?"],
      body: [
        "..kkkkkkk..",
        ".kwwwwwwwk.",
        ".kwcwwwcwk.",
        ".kwwwwwwwk.",
        "..kwwwwwk..",
        "...kkkkk...",
        ".kkwwwwwkk.",
        "kwkkkkkkkwk",
        "kwkkccckkwk",
        "kwkkkkkkkwk",
        "kk.kwwwk.kk",
        "...kwwwk...",
        "..kwwwwwk..",
        ".kwwwwwwwk.",
        ".kkkkkkkkk.",
      ],
    },
    {
      id: "nao", name: "NAO", speed: 16, step: 0.3, act: "dance",
      quotes: ["Hello, I am NAO!", "*does a little Tai Chi*", "Gangnam style? I know the moves."],
      body: [
        "...kkkkk...",
        "..kwwwwwk..",
        ".kkwwwwwkk.",
        "kgkcwwwckgk",
        "kgkwwwwwkgk",
        ".kkwwwwwkk.",
        "...kkkkk...",
        "..kkwwwkk..",
        ".kbkwbwkbk.",
        "kwkwwwwwkwk",
        "kwkkwwwkkwk",
        "kk.kgggk.kk",
      ],
      legs: [
        ["..kwk.kwk..", ".kbk...kbk.", ".kwk...kwk.", "kkkk...kkkk"],
        ["..kwk.kwk..", "..kbk.kbk..", "..kwk.kwk..", ".kkkk.kkkk."],
      ],
    },
    {
      id: "romeo", name: "Romeo", speed: 12, step: 0.5, act: "jump",
      quotes: ["Bonjour, I'm Romeo!", "I'm NAO's big brother.", "Need a hand getting up?"],
      body: [
        "....kkkkk....",
        "...kwwwwwk...",
        "..kwwwwwwwk..",
        "..kwcwwwcwk..",
        "..kwwwwwwwk..",
        "...kwgggwk...",
        "....kkkkk....",
        ".kkkkwwwkkkk.",
        "kwkgwwwwwgkwk",
        "kwkgwwbwwgkwk",
        "kwkgwwwwwgkwk",
        "kwkkgggggkkwk",
        "kgk.kgggk.kgk",
        "kkk.kwwwk.kkk",
      ],
      legs: [
        ["...kwk.kwk...", "..kwk...kwk..", "..kgk...kgk..", "..kwk...kwk..", ".kkkk...kkkk."],
        ["...kwk.kwk...", "...kwk.kwk...", "...kgk.kgk...", "...kwk.kwk...", "..kkkk.kkkk.."],
      ],
    },
    {
      id: "sphero", name: "Sphero", speed: 38, step: 0.15, bob: true, act: "glow",
      quotes: ["*rolls around*", "*glows a new colour*", "I'm basically BB-8's cousin."],
      body: [
        "..kkkkk..",
        ".kwcccck.",
        "kwcccccck",
        "kccccccck",
        "kccccccck",
        "kccccccbk",
        ".kccccbk.",
        "..kkkkk..",
      ],
    },
    {
      id: "viam", name: "Viam Rover", speed: 24, step: 0.2, act: "spin",
      quotes: ["Configured in the Viam app.", "*streams camera feed*", "Differential drive: watch me turn on the spot!"],
      palette: { G: "#2b2d33", e: "#f07a2a", c: "#8fa3ad" },
      body: [
        "...........kwk..........",
        "kkkkkkkkkkkkkkkkkkkkkkkk",
        "ksGGGGGGGGGGGGGGGGGGGGsk",
        "kkkkkkkkkkkkkkkkkkkkkkkk",
        ".kskvsssgkkrbkkkkkkkksk.",
        ".kskvsssgbyrkkeeeeeeksk.",
        ".kskvsssgkvvvkkGwcGkksk.",
        ".kskkkkkkkkkkkkkkkkkksk.",
        "kkkkkkkkkkkkkkkkkkkkkkkk",
        "kGGGGGGGGGGGGGGGGGGGGGGk",
        "kkkkkkkkkkkkkkkkkkkkkkkk",
      ],
      legs: [
        ["..kgk...kxxzzxxk........", "...k.....kxzzxk.........", "..........kkkk.........."],
        ["..kgk...kxzxxzxk........", "...k.....kzxxzk.........", "..........kkkk.........."],
      ],
    },
    {
      id: "ardrone", name: "Parrot AR.Drone", speed: 34, step: 0.06, bob: true, lift: 38, act: "flip",
      quotes: ["*buzzes like an angry bee*", "Flown from an iPhone since 2010!", "Hovering... mostly."],
      top: [["kkkkkk......kkkkkk"], ["..kk..........kk.."]],
      body: [
        "...k..........k...",
        ".kwwwk......kwwwk.",
        "kwwwwwkkkkkkwwwwwk",
        "kwwwwkeeeeeekwwwwk",
        ".kkkkkeGGGGekkkkk.",
        "......kkckkk......",
      ],
    },
    {
      id: "bebop", name: "Parrot Bebop", speed: 40, step: 0.05, bob: true, lift: 30, act: "flip",
      quotes: ["*records 4K video*", "Bebop! Bebop!", "Return to home activated."],
      top: [["kkkkk....kkkkk"], [".kk........kk."]],
      body: [
        "..k........k..",
        ".kkk......kkk.",
        "..kkkkkkkkkk..",
        "...kwwwwwwkk..",
        "...kwrrrrwkck.",
        "....kkkkkkkk..",
        "....k......k..",
      ],
    },
  ];

  var ZAPPED = ["Hey!", "Ouch!", "Rude.", "Not again..."];

  function frames(robot) {
    var legs = robot.legs || [[], []];
    var top = robot.top || [[], []];
    var a = top[0].concat(robot.body, legs[0]);
    var b = (top[1] || top[0]).concat(robot.body, legs[1] || legs[0]);
    if (robot.bob) {
      a = [""].concat(a);
      b = b.concat([""]);
    }
    var w = 0;
    a.concat(b).forEach(function (row) { w = Math.max(w, row.length); });
    return { a: a, b: b, w: w, h: a.length };
  }

  function mix(hex, target, amount) {
    var n = parseInt(hex.slice(1), 16);
    var rgb = [n >> 16, (n >> 8) & 255, n & 255].map(function (v) {
      return Math.round(v + (target - v) * amount);
    });
    return "rgb(" + rgb.join(",") + ")";
  }

  // Light comes from above: fill pixels under an outline get a highlight and
  // those against an outline below or to the right get a shadow. Only areas
  // at least two pixels deep are shaded, so eyes and thin limbs stay crisp.
  function drawFrame(ctx, rows, ox, scale, pal) {
    function at(x, y) { return (rows[y] || "")[x]; }
    function edge(x, y) {
      var ch = at(x, y);
      return !ch || ch === "." || ch === "k";
    }
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        var ch = row[x];
        var c = pal[ch];
        if (!c) continue;
        if (ch !== "k") {
          if (edge(x, y - 1) && at(x, y + 1) === ch) c = mix(c, 255, 0.3);
          else if ((edge(x, y + 1) && at(x, y - 1) === ch) || (edge(x + 1, y) && at(x - 1, y) === ch)) c = mix(c, 0, 0.2);
        }
        ctx.fillStyle = c;
        ctx.fillRect(ox + x * scale, y * scale, scale, scale);
      }
    });
  }

  // Both walk frames side by side, so CSS can step between them.
  function renderSheet(robot, scale) {
    var f = frames(robot);
    var pal = Object.assign({}, PALETTE, robot.palette || {});
    var canvas = document.createElement("canvas");
    canvas.width = f.w * scale * 2;
    canvas.height = f.h * scale;
    var ctx = canvas.getContext("2d");
    drawFrame(ctx, f.a, 0, scale, pal);
    drawFrame(ctx, f.b, f.w * scale, scale, pal);
    return { canvas: canvas, w: f.w * scale, h: f.h * scale, rows: f.h };
  }

  var audio = null;
  function beep() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audio = audio || new AC();
    var t = audio.currentTime + 0.02;
    for (var i = 0; i < 6; i++) {
      var osc = audio.createOscillator();
      var gain = audio.createGain();
      var len = 0.06 + Math.random() * 0.08;
      osc.type = "sine";
      osc.frequency.setValueAtTime(700 + Math.random() * 1800, t);
      osc.frequency.exponentialRampToValueAtTime(700 + Math.random() * 1800, t + len);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + len + 0.02);
      t += len + 0.03;
    }
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function mount(el, opts) {
    opts = Object.assign({ scale: 3, speed: 1, count: 0, sink: 5 }, opts || {});
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timers = [];
    var bots = [];
    var W = el.clientWidth;
    var raf = 0;
    var last = 0;
    var visible = true;
    var observer = null;

    el.innerHTML = "";
    el.classList.add("rp-ready");

    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

    var count = opts.count || Math.max(4, Math.min(ROBOTS.length, Math.floor(W / 95)));
    // Every lineup includes one random member of each `pin` group.
    var groups = {};
    ROBOTS.forEach(function (r) { if (r.pin) (groups[r.pin] = groups[r.pin] || []).push(r); });
    var pinned = Object.keys(groups).map(function (g) { return shuffle(groups[g])[0]; });
    var rest = shuffle(ROBOTS.filter(function (r) { return pinned.indexOf(r) < 0; }));
    var lineup = shuffle(pinned.concat(rest.slice(0, count - pinned.length)));
    var tallest = 0;

    lineup.forEach(function (robot, i) {
      var sheet = renderSheet(robot, opts.scale);
      tallest = Math.max(tallest, sheet.h + (robot.lift || 0));

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rp-robot";
      btn.setAttribute("aria-label", robot.name + " (click me)");
      btn.title = robot.name;

      var body = document.createElement("span");
      body.className = "rp-body";
      var sprite = document.createElement("span");
      sprite.className = "rp-sprite";
      sprite.style.width = sheet.w + "px";
      sprite.style.height = sheet.h + "px";
      sprite.style.backgroundImage = "url(" + sheet.canvas.toDataURL() + ")";
      sprite.style.animationDuration = robot.step * 2 + "s";
      body.appendChild(sprite);
      btn.appendChild(body);
      el.appendChild(btn);

      var lane = Math.round(Math.random() * 6);
      var bot = {
        robot: robot, el: btn, body: body, w: sheet.w, rows: sheet.rows,
        x: 0, dir: 1, lane: lane, lift: robot.lift || 0,
        speed: robot.speed * (0.85 + Math.random() * 0.3),
        boost: 1, busy: false, hold: false, quote: 0, bubble: null,
      };
      btn.style.bottom = (bot.lift - opts.sink + lane) + "px";
      bot.shadow = document.createElement("span");
      bot.shadow.className = "rp-shadow" + (bot.lift ? " is-hovering" : "");
      bot.shadow.style.width = Math.round(sheet.w * 0.8) + "px";
      bot.shadow.style.bottom = (lane - opts.sink - 3) + "px";
      el.appendChild(bot.shadow);
      bots.push(bot);

      btn.addEventListener("click", function () { act(bot); });
      btn.addEventListener("mouseenter", function () { bot.hold = true; sync(bot); });
      btn.addEventListener("mouseleave", function () { bot.hold = false; sync(bot); });
      btn.addEventListener("focus", function () { bot.hold = true; sync(bot); });
      btn.addEventListener("blur", function () { bot.hold = false; sync(bot); });
    });

    el.style.height = Math.max(tallest + 24, 72) + "px";

    function spread() {
      var gap = (W + 60) / bots.length;
      bots.forEach(function (b, i) {
        b.x = reduced ? (i + 0.5) * (W / bots.length) - b.w / 2 : i * gap + Math.random() * gap * 0.4 - 30;
        place(b);
      });
    }

    function place(b) {
      b.el.style.transform = "translate3d(" + b.x.toFixed(1) + "px,0,0)";
      b.shadow.style.transform = "translate3d(" + (b.x + b.w * 0.1).toFixed(1) + "px,0,0)";
    }

    // Busy robots rise above their neighbours so speech bubbles aren't covered.
    function sync(b) {
      b.el.style.zIndex = b.busy ? "10" : String(8 - b.lane);
      b.el.classList.toggle("is-still", reduced || b.busy || (b.hold && !b.target));
      b.el.classList.toggle("is-left", b.dir < 0);
    }

    function say(b, text, ms) {
      if (b.bubble) b.bubble.remove();
      var bubble = document.createElement("span");
      bubble.className = "rp-bubble";
      bubble.textContent = text;
      b.el.appendChild(bubble);
      b.bubble = bubble;
      var r = bubble.getBoundingClientRect();
      var p = el.getBoundingClientRect();
      var shift = 0;
      if (r.left < p.left + 6) shift = p.left + 6 - r.left;
      if (r.right > p.right - 6) shift = p.right - 6 - r.right;
      bubble.style.setProperty("--shift", shift + "px");
      later(function () {
        if (b.bubble === bubble) { bubble.remove(); b.bubble = null; }
      }, ms);
    }

    function animate(b, cls) {
      if (reduced) return;
      b.body.classList.remove(cls);
      void b.body.offsetWidth;
      b.body.classList.add(cls);
      later(function () { b.body.classList.remove(cls); }, 1800);
    }

    function drop(b, cls) {
      var cube = document.createElement("span");
      cube.className = "rp-drop " + cls;
      cube.style.left = (b.dir > 0 ? b.x - 14 : b.x + b.w + 2) + "px";
      el.appendChild(cube);
      var cubes = el.querySelectorAll(".rp-drop");
      if (cubes.length > 8) cubes[0].remove();
      later(function () { cube.classList.add("is-gone"); }, 12000);
      later(function () { cube.remove(); }, 13000);
    }

    function dropX(d) { return parseFloat(d.style.left) + 7; }

    // A cleaning robot heads for its target mess and scrubs it away on arrival.
    function chase(b) {
      if (!b.target.isConnected) { b.target = null; b.boost = 1; return; }
      if ((dropX(b.target) - (b.x + b.w / 2)) * b.dir > 0) return;
      b.target.remove();
      b.target = null;
      b.boost = 1;
      say(b, "*scrub scrub* Clean!", 1400);
      animate(b, "rp-shake");
    }

    function zap(b) {
      var gunX = b.dir > 0 ? b.x + b.w : b.x;
      var target = null;
      bots.forEach(function (o) {
        if (o === b) return;
        var cx = o.x + o.w / 2;
        var ahead = b.dir > 0 ? cx > gunX : cx < gunX;
        if (ahead && cx > 0 && cx < W && (!target || Math.abs(cx - gunX) < Math.abs(target.x + target.w / 2 - gunX))) target = o;
      });
      var endX = target ? target.x + target.w / 2 : (b.dir > 0 ? W : 0);
      var beam = document.createElement("span");
      beam.className = "rp-laser";
      beam.style.left = Math.min(gunX, endX) + "px";
      beam.style.width = Math.abs(endX - gunX) + "px";
      beam.style.bottom = (b.lift - opts.sink + b.lane + (b.rows - (b.robot.gun || 8) - 0.5) * opts.scale) + "px";
      el.appendChild(beam);
      later(function () { beam.remove(); }, 600);
      if (target) {
        later(function () {
          animate(target, "rp-zapped");
          if (!target.busy) say(target, ZAPPED[Math.floor(Math.random() * ZAPPED.length)], 1400);
        }, 150);
      }
    }

    var special = {
      beep: function (b) { beep(); animate(b, "rp-wobble"); },
      shake: function (b) { animate(b, "rp-shake"); },
      jump: function (b) { animate(b, "rp-jump"); },
      fly: function (b) { animate(b, "rp-fly"); },
      inflate: function (b) { animate(b, "rp-inflate"); },
      dance: function (b) { animate(b, "rp-dance"); },
      cube: function (b) { drop(b, "rp-cube"); },
      cupcake: function (b) { drop(b, "rp-cupcake"); animate(b, "rp-wobble"); },
      zap: function (b) { zap(b); },
      flash: function (b) { animate(b, "rp-flash"); },
      glow: function (b) { animate(b, "rp-glow"); },
      flip: function (b) { animate(b, "rp-flip"); },
      dash: function (b) {
        later(function () { b.boost = 5; }, 1200);
        later(function () { b.boost = 1; }, 3700);
      },
      spin: function (b) {
        b.dir = -b.dir;
        b.boost = 3;
        sync(b);
        later(function () { b.boost = 1; }, 2500);
      },
      refuse: function (b) { later(function () { b.busy = false; sync(b); }, 0); },
      clean: function (b) {
        var cx = b.x + b.w / 2;
        var mess = null;
        el.querySelectorAll(".rp-drop:not(.is-gone)").forEach(function (d) {
          if (!mess || Math.abs(dropX(d) - cx) < Math.abs(dropX(mess) - cx)) mess = d;
        });
        if (!mess) { animate(b, "rp-shake"); return; }
        b.target = mess;
        b.dir = dropX(mess) > cx ? 1 : -1;
        b.boost = 4;
        later(function () { b.busy = false; sync(b); }, 0);
      },
      slump: function (b) {
        animate(b, "rp-slump");
        b.boost = 0.3;
        later(function () { b.boost = 1; }, 9000);
      },
      back: function (b) {
        later(function () { if (!reduced) { b.boost = 7; b.returning = true; } }, 1600);
      },
    };

    function act(b) {
      var robot = b.robot;
      var text = robot.quotes[b.quote % robot.quotes.length];
      b.quote++;
      var ms = Math.min(4500, 1200 + text.length * 45);
      b.busy = true;
      sync(b);
      say(b, text, ms);
      special[robot.act](b);
      later(function () { b.busy = false; sync(b); }, robot.act === "back" ? 1600 : Math.min(ms, 2200));
    }

    function tick(t) {
      var dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      bots.forEach(function (b) {
        if (b.busy || (b.hold && !b.target)) return;
        b.x += b.dir * b.speed * b.boost * opts.speed * dt;
        if (b.target) chase(b);
        if (b.dir > 0 && b.x > W + 30) {
          b.x = -b.w - 30;
          if (b.returning) { b.returning = false; b.boost = 1; }
        } else if (b.dir < 0 && b.x < -b.w - 30) {
          b.x = W + 30;
        }
        place(b);
      });
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (reduced || raf || !visible) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function onResize() {
      W = el.clientWidth;
      if (reduced) spread();
    }

    spread();
    bots.forEach(sync);
    window.addEventListener("resize", onResize);

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      });
      observer.observe(el);
    }
    start();

    return {
      options: opts,
      destroy: function () {
        stop();
        timers.forEach(clearTimeout);
        window.removeEventListener("resize", onResize);
        if (observer) observer.disconnect();
        el.innerHTML = "";
      },
    };
  }

  window.RobotParade = { mount: mount, renderSheet: renderSheet, robots: ROBOTS };

  document.querySelectorAll("[data-robot-parade]").forEach(function (el) {
    if (el.hasAttribute("data-manual")) return;
    mount(el);
  });
})();
