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
      palette: { b: "#2b4bb0", s: "#cdd0d6", w: "#f3f3f1" },
      quotes: ["Bweep-bwoop!", "Bee-doo-dee-doo!", "*excited whistling*"],
      body: [
        ".....kkkkkkk.....",
        "....kssbssssk....",
        "...ksbbkkbrbbk...",
        "...ksbbkkbbssk...",
        "...ksssssssssk...",
        "...kbbsbbbsbbk...",
        "kkkkkkkkkkkkkkkkk",
        "kbbkwwwwwwwwwkbbk",
        "kbbkwbbbwbbbwkbbk",
        "kwbkwwwwwwwwwkbwk",
        "kwbkwbwbwwbbwkbwk",
        "kwbkwbwbwwwwwkbwk",
        "kwbkwwwwbbbwwkbwk",
        "kwbkkwwwwwwwkkbwk",
        "kwbk..kgggk..kbwk",
        ".kwk...kgk...kwk.",
        "kwwwk.kwwwk.kwwwk",
        "kkkkk.kkkkk.kkkkk",
      ],
    },
    {
      id: "c3po", name: "C-3PO", speed: 20, step: 0.5, act: "shake",
      palette: { l: "#fff3a0", o: "#e0a82a", O: "#9a6a12", s: "#c9ccd1" },
      quotes: ["Oh my! We're doomed.", "I am fluent in over six million forms of communication.", "Don't call me a mindless philosopher!"],
      body: [
        ".....kkkkk.....",
        "....koooook....",
        "....kolOlok....",
        "....kooOook....",
        ".....kokok.....",
        "......kGk......",
        ".kkkkkkkkkkkkk.",
        "kokkoooooookkok",
        "kokkooOOOookkok",
        "kokkoOoooOokkok",
        "kokkooOOOookkok",
        "kOk.kGkGkGk.kOk",
        "kok.koooook.kok",
        "kOk.kooOook.kOk",
      ],
      legs: [
        ["kkk.kok.kok.kkk", "....kok.kok....", "...kOk...kOk...", "...ksk...kok...", "...ksk...kok...", "..ksk.....kok..", "..ksk.....kok..", "..kssk....kook.", "..kkkk....kkkk."],
        ["kkk.kok.kok.kkk", "....kok.kok....", "....kOk.kOk....", "....ksk.kok....", "....ksk.kok....", "....ksk.kok....", "....ksk.kok....", "....kssk.kook..", "....kkkk.kkkk.."],
      ],
    },
    {
      id: "walle", name: "WALL-E", speed: 18, step: 0.25, act: "cube",
      palette: { y: "#dca236", Y: "#a8691f", g: "#9c9ea3", G: "#4a4643", v: "#9be05a" },
      quotes: ["Eeeeh-vaaa?", "Waaall-eee!", "*compacts trash lovingly*"],
      body: [
        "...kkkk...kkkk...",
        ".kkggggkkkggggkk.",
        ".kgkkkgk.kgkkkgk.",
        ".kgkwkgkkkgkwkgk.",
        ".kgkkkgk.kgkkkgk.",
        "..kgggk...kgggk..",
        "...kkk.kkk.kkk...",
        ".......kGk.......",
        ".......kgk.......",
        "...kkkkkkkkkkk...",
        "...kYYYYYYYYYk...",
        ".kkkkkkkkkkkkkkk.",
        ".kgkyyyyyyyyykgk.",
        ".kgkykkkyyyyykgk.",
        ".kkkykvkyyyyykkk.",
        ".kgkykkkyyyyykgk.",
      ],
      legs: [
        ["kGGkyyyyyyyyykGGk", "kggkyyGGGGryykggk", "kGGkyyyyyyyyykGGk", "kggkkkkkkkkkkkggk", "kGGk.kGk.kGk.kGGk", "kggk.........kggk", ".kk...........kk."],
        ["kggkyyyyyyyyykggk", "kGGkyyGGGGryykGGk", "kggkyyyyyyyyykggk", "kGGkkkkkkkkkkkGGk", "kggk.kGk.kGk.kggk", "kGGk.........kGGk", ".kk...........kk."],
      ],
    },
    {
      id: "mo", name: "M-O", speed: 30, step: 0.12, bob: true, act: "clean",
      palette: { y: "#eef24a", b: "#4a78a6", c: "#a8d6ee", r: "#ff3b2f" },
      quotes: ["Foreign contaminant!", "*siren noises*", "M-O! M-O!"],
      body: [
        "....krrk....",
        "..kkkkkkkk..",
        ".kwwwwwwwwk.",
        "kwwwwwwwwwwk",
        "kwwwwwwwwwwk",
        "kwkkkkkkkkwk",
        "kwkyykkyykwk",
        "kwkkkkkkkkwk",
        "kwwwwwwwwwwk",
        "kgkkkkkkkkgk",
        "kgcbcbcbcbgk",
        "kGbcbcbcbcGk",
        ".kkkkkkkkkk.",
        "..kwGwGGwk..",
        "...kkkkkk...",
      ],
      legs: [
        ["....kGGk....", "...kGgGGk...", "....kkkk...."],
        ["....kGgk....", "...kGGGgk...", "....kkkk...."],
      ],
    },
    {
      id: "eve", name: "EVE", speed: 30, step: 0.6, bob: true, lift: 16, act: "fly",
      palette: { w: "#fbfbfb", c: "#5ec8ff" },
      quotes: ["Directive?", "WALL-E!", "Eee-vah."],
      body: [
        "....kkkkk....",
        "..kkwwwwwkk..",
        ".kwwwwwwwwwk.",
        ".kwwkkkkkwwk.",
        "kwwkkkkkkkwwk",
        "kwkkcckcckkwk",
        ".kwkkkkkkkwk.",
        "..kkwwwwwkk..",
        "....kkkkk....",
        ".............",
        "....kkkkk....",
        "..kkwwwwwkk..",
        ".kwkwwwwwkwk.",
        "kwkwwwwwwwkwk",
        "kwkwwwwwwwkwk",
        "kwkwwwwwwwkwk",
        "kwkwwwwwwwkwk",
        ".kwkwwwwwkwk.",
        ".kwkwwwwwkwk.",
        "..k.kwwwk.k..",
        "....kwwwk....",
        ".....kwk.....",
        "......k......",
      ],
    },
    {
      id: "bender", name: "Bender", speed: 26, step: 0.4, act: "jump",
      palette: { s: "#b3c6d3", g: "#7f97a8", w: "#fff8d6", m: "#f4efc9" },
      quotes: ["Kill all humans!", "Bite my shiny metal... never mind.", "I'm back, baby!"],
      body: [
        "........k........",
        "........k........",
        "......kkkkk......",
        ".....ksssssk.....",
        "....ksssssssk....",
        "....kkkkkkkkk....",
        "....kkwwkwwkk....",
        "....kkwkkwkkk....",
        "....ksssssssk....",
        "....kskkkkksk....",
        "....ksmgmgmsk....",
        "....kskkkkksk....",
        "...kkkkkkkkkkk...",
        ".kkkssssssssgkkk.",
        "kgkkssgggggsgkkgk",
        "kgkkssgsssgsgkkgk",
        "kgkkssgggggsgkkgk",
        "kgkksssssssggkkgk",
        "kgkkkkkkkkkkkkkgk",
      ],
      legs: [
        ["kgk..kgk.kgk..kgk", "kgk..kgk.kgk..kgk", "kkk.kgk...kgk.kkk", ".k..kgk...kgk..k.", "...kgggk.kgggk...", "...kkkkk.kkkkk..."],
        ["kgk..kgk.kgk..kgk", "kgk..kgk.kgk..kgk", "kkk..kgk.kgk..kkk", ".k...kgk.kgk...k.", "....kgggkgggk....", "....kkkkkkkkk...."],
      ],
    },
    {
      id: "t800", name: "T-800", speed: 22, step: 0.45, act: "back",
      palette: { s: "#c9ced4", g: "#8a9098", G: "#5a6068", r: "#ff2a2a", w: "#eef2f6" },
      quotes: ["I'll be back.", "Hasta la vista, baby.", "Come with me if you want to live."],
      body: [
        ".....kkkkk.....",
        "....ksswssk....",
        "....kssssgk....",
        "....kGGsGGk....",
        "....kGrsrGk....",
        "....ksgkgsk....",
        "....kwkwkwk....",
        ".....kwkwk.....",
        "......kgk......",
        "..kkkkkkkkkkk..",
        "kgskkssssskksgk",
        "ksk.kwsssgk.ksk",
        "kgk.kkkskkk.kgk",
        "ksk.ksssssk.ksk",
        "kGk.kkkskkk.kGk",
        "ksk...ksk...ksk",
        "ksk...kGk...ksk",
        "kgk..kkkkk..kgk",
        "kGk.kssGssk.kGk",
        "k.k.kskkksk.k.k",
      ],
      legs: [
        ["....ksk.ksk....", "...ksk...ksk...", "...kGk...kGk...", "...ksk...ksk...", "...ksk...ksk...", "..kssk...kssk.."],
        ["....ksk.ksk....", "....ksk.ksk....", "....kGk.kGk....", "....ksk.ksk....", "....ksk.ksk....", "...kssk.kssk..."],
      ],
    },
    {
      id: "dalek", name: "Dalek", speed: 16, step: 0.5, bob: true, act: "zap", gun: 10,
      palette: { m: "#8a5a2e", o: "#e0b04a", O: "#c08a36", G: "#6b6f75", y: "#f5e7a0", c: "#5aa8ff" },
      quotes: ["EXTERMINATE!", "EX-TER-MIN-ATE!", "RESISTANCE IS USELESS!"],
      body: [
        ".....kkkkk.......",
        "...ykmmmmmky...kk",
        "...kmmmmmmmkGGGkc",
        "...kkkkkkkkk...kk",
        "....kmmmmmk......",
        "....kkkkkkk......",
        "....kmmmmmk......",
        "...kkkkkkkkk.....",
        "...kmOmOmOmk.....",
        "...kmOmOmOmkGGGGk",
        "...kmmmmmmmkGGGkk",
        "..kkkkkkkkkkk...k",
        "..kmmmmmmmmmk....",
        "..komomomomok....",
        ".kmmmmmmmmmmmk...",
        ".kmomomomomomk...",
        "kmmmmmmmmmmmmmk..",
        "komomomomomomok..",
        "kmmmmmmmmmmmmmk..",
        "kGGGGGGGGGGGGGGk.",
        "kkkkkkkkkkkkkkkk.",
      ],
    },
    {
      id: "baymax", name: "Baymax", speed: 14, step: 0.6, act: "inflate",
      palette: { w: "#f6f6f3" },
      quotes: ["On a scale of 1 to 10, how would you rate your pain?", "Hello. I am Baymax.", "Hairy baby!"],
      body: [
        ".....kkkkkkk.....",
        "....kwwwwwwwk....",
        "....kwkgggkwk....",
        "....kwwwwwwwk....",
        ".....kkkkkkk.....",
        "...kkwwwwwwwkk...",
        "..kwwkwwwwwkwwk..",
        ".kwwkwwwwwwwkwwk.",
        ".kwwkwwwwwwwkwwk.",
        "kwwkwwwwwwwwwkwwk",
        "kwwkwwwwwwwwwkwwk",
        "kwwkwwwwwwwwwkwwk",
        "kwwkwwwwwwwwwkwwk",
        ".kkkwwwwwwwwwkkk.",
        "...kwwwwwwwwwk...",
        "...kwwwwwwwwwk...",
        "....kwwwwwwwk....",
      ],
      legs: [
        ["...kwwwk.kwwwk...", "...kwwwk.kwwwk...", "...kkkkk.kkkkk..."],
        ["....kwwwkwwwk....", "....kwwwkwwwk....", "....kkkkkkkkk...."],
      ],
    },
    {
      id: "irongiant", name: "The Iron Giant", speed: 15, step: 0.6, act: "fly",
      palette: { g: "#8e9aa6", G: "#56616d", y: "#fff1a8" },
      quotes: ["Superman.", "I am not a gun.", "Souls don't die."],
      body: [
        ".......kkk.......",
        "......kgggk......",
        "......kyGyk......",
        "......kgGgk......",
        ".......kkk.......",
        "...kkkkkkkkkkk...",
        ".kkgggggggggggkk.",
        "kgkgggggggggggkgk",
        "kgkGgggggggggGkgk",
        "kgk.kGGGGGGGk.kgk",
        "kgk..kgggggk..kgk",
        "kgk...kGGGk...kgk",
        "kgk..kgggggk..kgk",
        "kgGk.kGGGGGk.kgGk",
        "kgGk.kgk.kgk.kgGk",
        "kGGk.kgk.kgk.kGGk",
        ".kk..kgk.kgk..kk.",
      ],
      legs: [
        ["....kgk...kgk....", "...kgggk.kgggk...", "...kgggk.kgggk...", "...kGGGk.kGGGk...", "...kkkkkk.kkkkkk."],
        ["......kgk.kgk....", ".....kgggkgggk...", ".....kgggkgggk...", ".....kGGGkGGGk...", ".....kkkkkkkkkkk."],
      ],
    },
    {
      id: "marvin", name: "Marvin", speed: 10, step: 0.8, act: "slump",
      palette: { w: "#eef0f1", s: "#c3c8cc", g: "#8e959b", v: "#2ee88a" },
      quotes: ["Life. Don't talk to me about life.", "Brain the size of a planet, and they ask me to walk in a footer.", "I think you ought to know I'm feeling very depressed."],
      body: [
        "......kkkkk......",
        "....kkwwwwwkk....",
        "...kwwwwwwwwwk...",
        "..kwwwwwwwwwwsk..",
        ".kwwwwwwwwwwwwsk.",
        ".kwwwwwwwwwwwwsk.",
        "kwwwwwwwwwwwwwssk",
        "kwwwwwwwwwwwwwssk",
        "kwkkwwwwwwwwwkksk",
        "kwwwkkkvvvkkkwwsk",
        "kwwwwwwkvkwwwwssk",
        ".kwwwwwwwwwwwwsk.",
        "..kwwwwwwwwwwsk..",
        "...kkwwwwwwwkk...",
        ".....kkkkkkk.....",
        "....kkkkkkkkk....",
        "...kwkwwwwwkwk...",
        "...kwkkkkkkkwk...",
        "...kwkkwwwkkwk...",
        "...kgk.kkk.kgk...",
      ],
      legs: [
        [".....kwk.kwk.....", "....kwk...kwk....", "....kgk...kgk....", "...kwwk...kwwk...", "...kkkk...kkkk..."],
        [".....kwk.kwk.....", ".....kwk.kwk.....", ".....kgk.kgk.....", "....kwwk.kwwk....", "....kkkk.kkkk...."],
      ],
    },
    {
      id: "spot", name: "Spot", speed: 34, step: 0.22, act: "dance",
      palette: { y: "#f5c518", Y: "#d9a400", G: "#4a4744" },
      quotes: ["*does a little dance*", "*robot dog noises*", "*uptown funk intensifies*"],
      body: [
        "......kk..........kk......",
        "....kkkkkkkkkkkkkkkkkkkkk.",
        "...kyyyyyyyyyyyyyyyyyyyyGk",
        "...kyyyyyyyyyyyyyyyyyyyyGk",
        "...kyykyyyykkkkkkkkkyyyyGk",
        "...kYkyyyYYYYYYYYYkyyyYYGk",
        "...kkyyykkkkkkkkkkyyykkkk.",
      ],
      legs: [
        ["...kyyyk........kyyyk.....", "..kyyyk........kyyyk......", ".kyyyk........kyyyk.......", "..kkk..........kkk........", "...kk...........kkG.......", "....kk..........kkG.......", "...Gkk...........kkG......", "...G.kk..........kkG......", "...GGkkk.........kkkGG...."],
        ["...kyyyk........kyyyk.....", "..kyyyk........kyyyk......", ".kyyyk........kyyyk.......", "..kkk..........kkk........", "..kkG...........kk........", "..kk.G...........kk.......", "...kkG............kk......", "...kk.G...........Gkk.....", "..kkk.GG..........Gkkk...."],
      ],
    },
    {
      id: "bb8", name: "BB-8", speed: 30, step: 0.2, bob: true, act: "jump",
      palette: { e: "#e8872a", w: "#f4f2ee", s: "#c3c6cc", g: "#8a8f98" },
      quotes: ["*happy chirping*", "*thumbs up (lighter flame)*", "Bip-bwop!"],
      body: [
        ".......k.....",
        ".......k.k...",
        ".....kkkkk...",
        "....kwwwwwk..",
        "....keeeeek..",
        "....kwwkkwk..",
        "....ksskkgk..",
        "...kkkkkkkkk.",
        "..kkwwwwkk...",
        ".kwwwwwwwwk..",
        ".kwwweeewwk..",
        "kewweeseewwk.",
        "kewwesgsewwk.",
        "kewweeseewwk.",
        "kwwwweeewwwk.",
        "kwwwwwwwwwwk.",
        ".kweeeewwwk..",
        "..kkwwwwkk...",
        "....kkkk.....",
      ],
    },
    {
      id: "johnny5", name: "Johnny 5", speed: 22, step: 0.25, act: "jump",
      palette: { s: "#bcc8d4", g: "#8fa1b3", G: "#566373", b: "#3f7fc4", e: "#f0a030", w: "#e8eef2" },
      quotes: ["Number 5 is alive!", "Need input!", "No disassemble!"],
      body: [
        "....kkkk.kkkk....",
        "....kwwwkwwwk....",
        "....kwkwkwkwk....",
        "....kwwwkwwwk....",
        ".....kkkkkkk.....",
        "......kekek......",
        "......kekek......",
        ".kkkkkkkkkkkkkkk.",
        ".ksssssssssssssk.",
        ".kkkkkkkkkkkkkkk.",
        ".kgk.kGGGGGk.kgk.",
        ".kgk.kGeGeGk.kgk.",
        ".kgk.kkkkkkk.kgk.",
        ".kGk...kbk...kGk.",
        ".kgk...kbk...kgk.",
        ".k.k...kbk...k.k.",
      ],
      legs: [
        ["....kkkkkkkkk....", "..kkGGGkbkGGGkk..", ".kGgGgkkbkkGgGgk.", ".kGGGGk.k.kGGGGk.", ".kgGgGk...kgGgGk.", ".kkkkkk...kkkkkk."],
        ["....kkkkkkkkk....", "..kkGGGkbkGGGkk..", ".kgGgGkkbkkgGgGk.", ".kGGGGk.k.kGGGGk.", ".kGgGgk...kGgGgk.", ".kkkkkk...kkkkkk."],
      ],
    },
    {
      id: "k9", name: "K-9", speed: 20, step: 0.3, bob: true, act: "shake",
      palette: { g: "#8ea4bd", G: "#56687c", w: "#eef3f8", s: "#c9ced4", x: "#3a3f46" },
      quotes: ["Affirmative, master.", "Negative.", "*wags antenna*"],
      body: [
        "..............s.s...",
        ".............kkkkkk.",
        "k...........kgggrrrk",
        "k...........kgggrrrk",
        ".k..........kggggggk",
        "..k.........kggggggk",
        "...k.......kGkkkkkk.",
        "...kkkkkkkkkrk......",
        "...kgggggggggggk....",
        "..kggwgwwgggggggk...",
        "..kgggggggggggggk...",
        ".kgggggggggggggggk..",
        ".kGGGGGGGGGGGGGGGk..",
        ".kgggggggggggggggk..",
        "kgggggggggggggggggk.",
        "kkkkkkkkkkkkkkkkkkk.",
        ".kxxxxxxxxxxxxxxxk..",
        ".kkkkkkkkkkkkkkkkk..",
      ],
    },
    {
      id: "rosie", name: "Rosie", speed: 24, step: 0.3, bob: true, act: "shake",
      palette: { l: "#a9d3f0", B: "#4c86cf", n: "#2b2a30", r: "#e02b2b" },
      quotes: ["*sweeps the footer*", "Who left all these pixels lying around?", "Dinner's ready!"],
      body: [
        ".......kwkwk...",
        "......kwwwwwk..",
        "....kkkkkkkkk..",
        "..kkkkllllllk..",
        ".kBBBklkklkkk..",
        "rkBkBklrrlrrkkr",
        ".kBBBkllllllk..",
        "..kkkkllkkllk..",
        "....klllllllk..",
        "....kkkkkkkkk..",
        "...kwkwkwkwkwk.",
        ".kkklllllllkkk.",
        "kBBklrlllllkBBk",
        "kBBklllllllkBBk",
        "kBBklllrlllkBBk",
        ".kkwwwwwwwwwkk.",
        "..knnnnnnnnnk..",
        ".knnnnnnnnnnnk.",
        ".knnnnnnnnnnnk.",
        "..kkkkkkkkkkk..",
      ],
      legs: [
        ["......kBk......", ".....kBBBk.....", "...kBBBBBBBk...", "...kxk...kxk..."],
        ["......kBk......", ".....kBBBk.....", "...kBBBBBBBk...", "...kzk...kzk..."],
      ],
    },
    {
      id: "robocop", name: "RoboCop", speed: 16, step: 0.55, act: "shake",
      palette: { s: "#aab5c7", g: "#8591a5", G: "#3f4757", d: "#7a869c", h: "#dca487", H: "#a8705a" },
      quotes: ["Dead or alive, you're coming with me.", "Your move, creep.", "Thank you for your cooperation."],
      body: [
        "....kkkkkkk....",
        "...ksssssssk...",
        "...ksssssssk...",
        "...kkkkkkkkk...",
        "...kkdkkkkkk...",
        "...kshhhhhsk...",
        "...kshhhhhsk...",
        "...kshHHHhsk...",
        "....kshhhsk....",
        ".kkkkkssskkkkk.",
        "ksssskssskssssk",
        "ksskssssssskssk",
        "ksskssgsgssksGk",
        "ksskssssssskssk",
        "kGGkkGGGGGkkGGk",
        "kssksssGsssksGk",
        "kkkksssksssk.kk",
      ],
      legs: [
        ["...ksssksssk...", "...kGGGkGGGk...", "..ksssk.ksssk..", "..ksssk.ksssk..", ".kkkkk...kkkkk."],
        ["...ksssksssk...", "...kGGGkGGGk...", "...ksssksssk...", "...ksssksssk...", "..kkkkkkkkkkk.."],
      ],
    },
    {
      id: "roomba", name: "Roomba", speed: 40, step: 0.15, bob: true, act: "spin",
      palette: { g: "#8d8f93", s: "#b9bbbe", G: "#3b3d40", v: "#5ee06a", w: "#e4e5e6" },
      quotes: ["*bonk*", "*vroom*", "Cleaning mode: chaotic."],
      body: [
        "......kkkkkkkk......",
        "...kkkGGGGGGGGkkk...",
        ".kkGGggggggggggGGkk.",
        "kGGgggssskkksgggGGGk",
        "kGggssskvwvkssgggGGk",
        "kGggsssskkksssggggGk",
        "kGGgggsssssssgggGGGk",
        "kkGGGggggggggggGGGkk",
        "kGkkGGGGGGGGGGGGkkGk",
        ".kGGkkkkkkkkkkkkGGk.",
        "..kkGGGGGGGGGGGGkkss",
        "....kkkkkkkkkkkk..s.",
      ],
    },
    {
      id: "curiosity", name: "Curiosity", speed: 8, step: 0.6, act: "flash",
      palette: { w: "#f1efe9", x: "#4a4f56", z: "#b8bec6" },
      quotes: ["*takes a selfie*", "Hello from Mars!", "Happy birthday to me..."],
      body: [
        "..................kkkkkkk.....",
        "..................kwwwwwk.....",
        "..................kwwwkkk.....",
        "..................kGGGGGk.....",
        "..................kkkkkkk.....",
        "kk..................ksk.......",
        "kwkk................ksk.......",
        "kowwkk.......kkkk...ksk.......",
        ".kowwwkkkkkkkkssskkkkkkkkk....",
        ".kwowwkwwwwwwwwwwwwwwwwwwwkkk.",
        "..kwowkwwwwwwwwwwwwwwwwwwwkGGk",
        "..kkkkkssssssssssssssssssskssk",
        "....kkkkkkkkkkkkkkkkkkkkkkkGGk",
        "............kkkkkkkk......kkkk",
        "....kkkkkkkkk.......kkkkk.....",
        "...kk.......kkk.........kkk...",
      ],
      legs: [
        ["..kkkk......kkkk........kkkk..", ".kkxxkk....kkxxkk......kkxxkk.", ".kxzxxk....kxzxxk......kxzxxk.", ".kxxzxk....kxxzxk......kxxzxk.", ".kkxxkk....kkxxkk......kkxxkk.", "..kkkk......kkkk........kkkk.."],
        ["..kkkk......kkkk........kkkk..", ".kkxxkk....kkxxkk......kkxxkk.", ".kxxzxk....kxxzxk......kxxzxk.", ".kxzxxk....kxzxxk......kxzxxk.", ".kkxxkk....kkxxkk......kkxxkk.", "..kkkk......kkkk........kkkk.."],
      ],
    },
    {
      id: "hal", name: "HAL 9000", speed: 12, step: 0.8, bob: true, act: "refuse",
      palette: { s: "#c9ccd0", g: "#8e9297", b: "#2f8fe0", f: "#f2f2f2", r: "#ff2a1a", R: "#8e0d0a", y: "#ffd23a" },
      quotes: ["I'm sorry, Dave. I'm afraid I can't do that.", "This conversation can serve no purpose anymore.", "Daisy, Daisy, give me your answer do..."],
      body: [
        "kkkkkkkkkkk",
        "ksssssssssk",
        "kskbbbfffsk",
        "kskkkkkkksk",
        "kskkkkkkksk",
        "kskkkkkkksk",
        "kskkkkkkksk",
        "kskkkkkkksk",
        "kskkkkkkksk",
        "kskkgggkksk",
        "kskgRrRgksk",
        "kskgryrgksk",
        "kskgRrRgksk",
        "kskkgggkksk",
        "kskkkkkkksk",
        "kskkkkkkksk",
        "ksssssssssk",
        "ksgsgsgsgsk",
        "kgsgsgsgsgk",
        "ksgsgsgsgsk",
        "kgsgsgsgsgk",
        "ksgsgsgsgsk",
        "kkkkkkkkkkk",
      ],
    },
    {
      id: "cupcake", name: "Roland's Cupcake Robot", speed: 18, step: 0.3, act: "cupcake",
      palette: { b: "#1f5fd6", y: "#f0e071", m: "#b0773a", f: "#f4f1ea", v: "#5f9e6e", e: "#d9793f", w: "#fffdf5" },
      quotes: ["Cupcake? Built by Roland.", "Please take one. Keep your distance.", "*social distancing intensifies*"],
      body: [
        "....kkk.......kkk.....",
        "...kwwwk.....kwwwk....",
        "..kwwwwwk...kwwwwwk...",
        ".kwwwwwwwk.kwwwwwwwk..",
        ".kmmmmmmmk.kmmmmmmmk..",
        "..kfvfvfk...kfvfvfk...",
        "..kvfvfvk...kvfvfvk...",
        "kkkkkkkkkkkkkkkkkkkkk.",
        "kbbbbbbbbbbbbbbbbbbbk.",
        "kbbbbbbbbbbbbbbbbbbbk.",
        "kbbbbbbbbbbbbbbbbbbbk.",
        "kkkkkkkkkkkkkkkkkkkkk.",
        "kyyyyyyyyyyyyyyyyyyyk.",
        "kyyybybybbyyyyykkkyyk.",
        "kyybbybybbbyyykeeekyk.",
        "kybbbybybbyyykekkkekk.",
        "kyyyyyyyyyyyykekbkekk.",
      ],
      legs: [
        ["kkkkkkkkkkkkkkekkkekk.", "..............keeek...", "...............kkk...."],
        ["kkkkkkkkkkkkkkekkkekk.", "..............kekek...", "...............kkk...."],
      ],
    },
    // Wayve's fleet, drawn from photos of the real vehicles.
    {
      id: "wayve-twizy", name: "Wayve Renault Twizy", pin: "wayve", speed: 20, step: 0.2, act: "jump",
      palette: { w: "#1f9ad0", d: "#146aa0", G: "#2a3440", m: "#454a52", f: "#eef6fa" },
      quotes: ["Learning to drive in a day! (Cambridge, 2017)", "*reinforcement learning intensifies*", "Where it all started."],
      body: [
        "...........kk.......",
        "...kkkkkkkkkkkk.....",
        "..kwwwwwwwwwwwwkk...",
        ".kwwwwkGGGGGGGGGkk..",
        ".kwwwwkGGGGGGGGGGGk.",
        ".kwwwwkGGGGGGGGkwwwk",
        ".krwwwwwwwwwwwkwwwfk",
        ".kwwwwwwwfwwwwkwwwwk",
        ".kwwwkkkkkkkkkkmmmmk",
        "..kwkGGGGGGGGkkmmmk.",
      ],
      legs: [
        ["kkkkkkkkwwwwwkkkkkkk", "kkxxxkkkwwwwwkkxxxkk", "kxxzxxkkwwwwwkxxzxxk", "kxzzzxkkkkkkkkxzzzxk", "kxxzxxk......kxxzxxk", ".kxxxk........kxxxk.", "..kkk..........kkk.."],
        ["kkkkkkkkwwwwwkkkkkkk", "kkxxxkkkwwwwwkkxxxkk", "kxzxzxkkwwwwwkxzxzxk", "kxxzxxkkkkkkkkxxzxxk", "kxzxzxk......kxzxzxk", ".kxxxk........kxxxk.", "..kkk..........kkk.."],
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
        "..........kkkkkkk.................",
        ".....kkGGGGkGGGGGGGkk.............",
        ".kkkkGGGGGGkGGGGGGGGGkkk..........",
        ".kwwwwwwwwwwwwwwdwwwwwwwwwkkkk....",
        ".kwwwwwwwwwwwwwwdwwwwwwwwwwwwwkkk.",
        ".krwwwwwwwwwwwwwdwwwwwwwwwwwwrrrrk",
        ".kwwwwwwwwwwwwwwdwwwwwwwwwwwwwwwwk",
      ],
      legs: [
        [".kwwkkkkkkkwwwwwdwwwwwwkkkkkkkwwwk", ".kwkkkkkkkkkwwwwdwwwwwkkkkkkkkkwwk", ".kwkkkxxxkkkwwwwdwwwwwkkkxxxkkkwwk", ".kwkkxxzxxkkwwwwdwwwwwkkxxzxxkkwk.", ".kkkkxzzzxkkkkkkkkkkkkkkxzzzxkkkk.", "....kxxzxxk............kxxzxxk....", ".....kxxxk..............kxxxk.....", "......kkk................kkk......"],
        [".kwwkkkkkkkwwwwwdwwwwwwkkkkkkkwwwk", ".kwkkkkkkkkkwwwwdwwwwwkkkkkkkkkwwk", ".kwkkkxxxkkkwwwwdwwwwwkkkxxxkkkwwk", ".kwkkxzxzxkkwwwwdwwwwwkkxzxzxkkwk.", ".kkkkxxzxxkkkkkkkkkkkkkkxxzxxkkkk.", "....kxzxzxk............kxzxzxk....", ".....kxxxk..............kxxxk.....", "......kkk................kkk......"],
      ],
    },
    {
      id: "optimus", name: "Optimus Prime", speed: 20, step: 0.45, act: "dash",
      palette: { b: "#2a52c9", r: "#d8262b", c: "#7fd3f2", q: "#5aa8f0", s: "#d9dbe0", g: "#9ea3ad" },
      quotes: ["Autobots, roll out!", "Freedom is the right of all sentient beings.", "*transformation noises*"],
      body: [
        "....kk...kk....",
        "....kbkkkbk....",
        "....kbbbbbk....",
        "....kbqsqbk....",
        "....kbsssbk....",
        ".....kkskk.....",
        ".kkkkkkkkkkkkk.",
        "krrrkrrrrrkrrrk",
        "krrkcccrccckrrk",
        "krrkcccrccckrrk",
        "krrkrrrrrrrkrrk",
        "krrkrsssssrkrrk",
        "krrkrsgsgsrkrrk",
        "kbbkksyyyskkbbk",
        "kbbk.ksssk.kbbk",
        ".kk.ksskssk.kk.",
      ],
      legs: [
        ["..ksssk.ksssk..", "..kbbbk.kbbbk..", "..kbbbk.kbbbk..", "..kbgbk.kbbbk..", "..kbbbk.kbgbk..", "..kgggk.kbbbk..", "..kkkkk.kgggk..", "........kkkkk.."],
        ["..ksssk.ksssk..", "..kbbbk.kbbbk..", "..kbbbk.kbbbk..", "..kbbbk.kbgbk..", "..kbgbk.kbbbk..", "..kbbbk.kgggk..", "..kgggk.kkkkk..", "..kkkkk........"],
      ],
    },
    {
      id: "claptrap", name: "Claptrap", speed: 26, step: 0.2, bob: true, act: "dance",
      palette: { y: "#f2bf26", f: "#f3f0e6", c: "#4fe3ff", G: "#3d3f44", r: "#c8322b" },
      quotes: ["Minion!", "Stairs! NOOOOO!", "Let me teach you the secret handshake!"],
      body: [
        ".........k........",
        ".........k.....k.k",
        "...kkkkkkkkkkk.kGk",
        "...kyyyGGGyyyk..G.",
        "...kyyGcccGyyk..G.",
        "...kyyGcwcGyyk..G.",
        "...kyyGcccGyyk..G.",
        "...kfffGGGfffk..G.",
        "....kfffffffk...G.",
        ".GGGkyyyyyyykGGGG.",
        ".G..kyGGGGGyk.....",
        ".G..kyGsGsGyk.....",
        ".G...kyrrryk......",
        "kGk..kyyyyyk......",
        "k.k..kkkkkkk......",
        ".......kGk........",
        "......kkkkk.......",
        ".....kGGGGGk......",
        ".....kGGsGGk......",
        ".....kGGGGGk......",
        "......kkkkk.......",
      ],
    },
    {
      id: "asimo", name: "ASIMO", speed: 18, step: 0.4, act: "jump",
      palette: { w: "#f4f4f2", g: "#aeb2b6", G: "#5c6166", V: "#15171a", n: "#4a5058" },
      quotes: ["Hello! I am ASIMO.", "*waves politely*", "I can climb stairs, you know."],
      body: [
        ".....kkkkk.....",
        "...kkwwwwwkk...",
        "..kwwwwwwwwwk..",
        "..kwwkkkkkkwk..",
        ".kgwkVVVVnVkgk.",
        ".kgwkVVVVVnkgk.",
        "..kwkVVVVVVkk..",
        "...kkkVVVVkk...",
        "..kkkkkkkkkkk..",
        ".kwwkwwwwwwkwwk",
        "kwwwkwwwwwwkwwk",
        "kwwwkwGGGGwkwwk",
        "kwwwkwwwwwwkwwk",
        "kgggkwwwrrwkggk",
        "kwwkkwwwwwwkkwk",
        ".kwk.kGGGGk.kwk",
        ".kgk.kwwwwk.kgk",
        "..k..kwwwwk..k.",
      ],
      legs: [
        ["....kwwkwwk....", "...kwwk.kwwk...", "...kggk.kggk...", "..kwwk...kwwk..", "..kwwwk..kwwwk.", "..kkkkkk.kkkkkk"],
        ["....kwwkwwk....", "....kwwkwwk....", "....kggkggk....", "....kwwkwwk....", "....kwwkwwwk...", "....kkkkkkkkk.."],
      ],
    },
    {
      id: "b9", name: "B-9 (Lost in Space)", speed: 14, step: 0.3, act: "flash",
      palette: { s: "#c5c9cc", g: "#8f959a", G: "#4c5157", c: "#cfe6ee", r: "#e53935", y: "#ffd23f", v: "#39b54a" },
      quotes: ["Danger, Will Robinson!", "That does not compute.", "Warning! Warning!"],
      body: [
        ".......kkk.......",
        ".....kkcwckk.....",
        "....kcwccccck....",
        "....kkkkkkkkk....",
        ".....kgGgGgk.....",
        "...kkssssssskk...",
        "...ksrrrrrrrsk...",
        "kkkkssssssssskkkk",
        "krkksyvrgbryskkrk",
        "kkkksrgyvyrgskkkk",
        ".kGkssssssssskGk.",
        ".kGkkgggggggkkGk.",
        ".kGk.kGGGGGGGkGk.",
        ".kGk.kgggggggkGk.",
        ".krk.kGGGGGGGkrk.",
        "..r..kgggggggk.r.",
        ".....kGGGGGGGk...",
        "....kgggkkgggk...",
        "....kGGGkkGGGk...",
        "....kgggkkgggk...",
      ],
      legs: [
        ["...kkkkkkkkkkk...", "...ksssssssssk...", "...kGsGsGsGsGk...", "...kkkkkkkkkkk..."],
        ["...kkkkkkkkkkk...", "...ksssssssssk...", "...ksGsGsGsGsk...", "...kkkkkkkkkkk..."],
      ],
    },
    {
      id: "pepper", name: "Pepper", speed: 16, step: 0.5, bob: true, act: "flash",
      palette: { w: "#f5f5f3", g: "#b4b8bc", c: "#7fd4ff", b: "#3a7fd0" },
      quotes: ["Hello! I'm Pepper.", "*shows an ad on my tablet*", "Shall we take a selfie?"],
      body: [
        "...kkkkkkk...",
        "..kwwwwwwwk..",
        ".kwwwwwwwwwk.",
        "kgwwwwwwwwwgk",
        "kgwkkwwwkkwgk",
        "kgwkcwwwckwgk",
        ".kwwwwwwwwwk.",
        "..kwwwwwwwk..",
        "...kkkkkkk...",
        ".....kgk.....",
        "..kkwwwwwkk..",
        ".kwkkkkkkkwk.",
        ".kwkbcccbkwk.",
        ".kwkbbbbbkwk.",
        ".kwkkkkkkkwk.",
        ".kwkwwwwwkwk.",
        ".kgkkwwwkkgk.",
        "..k.kgggk.k..",
        "....kwwwk....",
        "....kwwwk....",
        "...kwwwwwk...",
        "..kwwwwwwwk..",
        ".kwwwwGwwwwk.",
        ".kkkkkkkkkkk.",
      ],
    },
    {
      id: "nao", name: "NAO", speed: 16, step: 0.3, act: "dance",
      palette: { w: "#f4f4f2", g: "#9aa0a6", G: "#8b9096", c: "#4fc8ff", e: "#f07a1e" },
      quotes: ["Hello, I am NAO!", "*does a little Tai Chi*", "Gangnam style? I know the moves."],
      body: [
        ".....kkkkk.....",
        "...kkeeeeekk...",
        "..keeeeeeeeek..",
        "..kwwwwwwwwwk..",
        ".kgkwwwwwwwkgk.",
        ".kgkwccwccwkgk.",
        ".kgkwccwccwkgk.",
        "..kwwwwgwwwwk..",
        "...kwwwwwwwk...",
        "....kkkkkkk....",
        "......kGk......",
        "..kkkkkkkkkkk..",
        ".keekwwwwwkeek.",
        "keeekweeewkeeek",
        "kwwkkweGewkkwwk",
        "kwwk.kwewk.kwwk",
        "kGGk.kwwwk.kGGk",
        ".kk.kGGGGGk.kk.",
      ],
      legs: [
        ["...kwwk.kwwk...", "..kwwk...kwwk..", "..kGGk...kGGk..", "..kwwk...kwwk..", ".kwwwek.kwwwek.", ".kkkkkk.kkkkkk."],
        ["...kwwk.kwwk...", "...kwwk.kwwk...", "...kGGk.kGGk...", "...kwwk.kwwk...", "..kwwwekwwwek..", "..kkkkkkkkkkk.."],
      ],
    },
    {
      id: "romeo", name: "Romeo", speed: 12, step: 0.5, act: "jump",
      palette: { w: "#f1f1ef", g: "#b9bcc2", b: "#3f82d4", c: "#9fd0ff", m: "#c7c2ea" },
      quotes: ["Bonjour, I'm Romeo!", "I'm NAO's big brother.", "Need a hand getting up?"],
      body: [
        "....kkkkk....",
        "...kbbbbbk...",
        "...kbbbbbk...",
        "...kwwwwwk...",
        "..kgwcwcwgk..",
        "...kwwwwwk...",
        "....kwwwk....",
        ".....kkk.....",
        ".kkkkbbbkkkk.",
        "kbbkwwwwwkbbk",
        "kwwkwwwwwkwwk",
        "kwwkwwgwwkwwk",
        "kbbkbbbbbkbbk",
        "kwwkmmmmmkwwk",
        "kwwkmmmmmkwwk",
        "kwwkwwbwwkwwk",
        "kgk.kwmwk.kgk",
        ".k..kkkkk..k.",
      ],
      legs: [
        ["..kwwkkwwk...", ".kwwk..kwwk..", ".kwwk..kwwk..", ".kbbk..kbbk..", ".kwwk..kwwk..", "kwwwk..kwwwk.", "kkkkk..kkkkk."],
        ["..kwwkkwwk...", "..kwwkkwwk...", "..kwwkkwwk...", "..kbbkkbbk...", "..kwwkkwwk...", "..kwwwkwwwk..", "..kkkkkkkkk.."],
      ],
    },
    {
      id: "sphero", name: "Sphero", speed: 38, step: 0.15, bob: true, act: "glow",
      palette: { w: "#f7fafc", l: "#d4f0ff", c: "#8fd9ff", b: "#1e7fd6", N: "#0f2a4a" },
      quotes: ["*rolls around*", "*glows a new colour*", "I'm basically BB-8's cousin."],
      body: [
        "....kkkk....",
        "..kkwwwwkk..",
        ".kwwwwwwwwk.",
        "kwwwwwbbbwwk",
        "kwwwwbwwwbwk",
        "kwwwwbwNwbwk",
        "klllwbwwwblk",
        "klllllbbbllk",
        "kccllllllllk",
        ".kccccllllk.",
        "..kkcccckk..",
        "....kkkk....",
      ],
    },
    {
      id: "viam", name: "Viam Rover", speed: 24, step: 0.2, act: "spin",
      palette: { G: "#2b2d33", e: "#f07a2a", c: "#8fa3ad" },
      quotes: ["Configured in the Viam app.", "*streams camera feed*", "Differential drive: watch me turn on the spot!"],
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
      palette: { G: "#3b3b3d", e: "#f26b1d", q: "#29b6e8" },
      quotes: ["*buzzes like an angry bee*", "Flown from an iPhone since 2010!", "Hovering... mostly."],
      top: [[".kkkkkkkk..........kkkkkkkk.", "....kk..............kk......"], ["...kkkk..............kkkk...", "....kk..............kk......"]],
      body: [
        "..kkkkkk....kkkk....kkkkkk..",
        ".kGGkkGGk.kkeeeekk.kGGkkGGk.",
        "kGk.kk.kGkeeqqqqeekGk.kk.kGk",
        "kGk....kGkeeeeeeekkGk....kGk",
        "kGGkkkkGGGkeeeeekkGGGkkkkGGk",
        ".kkkkkkkkkkGGGGGGkkkkkkkkkk.",
        "..........kkkkkkkk..........",
      ],
    },
    {
      id: "bebop", name: "Parrot Bebop", speed: 40, step: 0.05, bob: true, lift: 30, act: "flip",
      palette: { r: "#e01e2b", G: "#2d2d30" },
      quotes: ["*records 4K video*", "Bebop! Bebop!", "Return to home activated."],
      top: [["rrrrrrr...............rrrrrrr", "...k.....................k..."], ["..rrr...................rrr..", "...k.....................k..."]],
      body: [
        ".krrrk.................krrrk.",
        ".kkkkk.....kkkkkkkk....kkkkk.",
        "..kGk....kkrrrrrrrrkkkk.kGk..",
        "..kGk...krrrrrrrrrkrrrrkkGk..",
        "..kGkkkkrrrrrrrrrkrkkkkrkGk..",
        "..kGk..krrrrrrrrrkrkGGkrkGk..",
        "..kGk..kGrrrrrrrrkrkkkkrkGk..",
        ".kGk....kGGGGGGGGkkrrrrkkkGk.",
        ".kGk.....kkkkkkkkkkkkkk..kGk.",
        "kGk.......................kGk",
        "kk.........................kk",
      ],
    },
    {
      id: "crazyflie", name: "Bitcraze Crazyflie", speed: 36, step: 0.05, bob: true, lift: 26, act: "flip",
      palette: { s: "#c9ccd0", g: "#7c828a", b: "#3b82f6" },
      quotes: ["27 grams of open-source drone!", "*swarms with 49 friends*", "Hej from Malmö!"],
      top: [["kkkkk......kkkkk"], ["..k..........k.."]],
      body: [
        "..k..........k..",
        ".kgk........kgk.",
        ".kgk.kkkkkk.kgk.",
        ".kgk.kssssk.kgk.",
        "kbkkkkkkkkkkkrkk",
        ".kwk........kwk.",
        ".kk..........kk.",
      ],
    },
    {
      id: "robody", name: "Devanthro Robody", speed: 14, step: 0.2, act: "flash",
      palette: { w: "#f3f4f2", c: "#58c8ff", b: "#2f6fd6", v: "#3cae5a", N: "#1f2a55", e: "#f39a2a", g: "#9aa0a6" },
      quotes: ["Robody here, teleoperated from Munich!", "*a human is seeing through my eyes*", "Can I bring you a rose?"],
      body: [
        ".......kkk.......",
        ".....kkwwwkk.....",
        "....kwwwwwwwk....",
        "....kwcwwwcwk....",
        ".....kwwwwwk.....",
        "......kkkkk......",
        ".......kgk.......",
        "..kkkkkkkkkkkkk..",
        ".kwwwwwwwwwwwwwk.",
        "kwkkbvkbbbkvbkkwk",
        "kwkkvbkbNbkbvkkwk",
        "kgkkbvkbbbkvbkkgk",
        "kwk.kwwwwwwwk.kwk",
        "kgk.kNNNNNNNk.kgk",
        "kek.kNNNNNNNk.kek",
        "....kwwwwwwwk....",
        ".....kwwkwwk.....",
        ".....kgk.kgk.....",
        ".....kwk.kwk.....",
      ],
      legs: [
        ["...kkkkkkkkkkk...", ".kkkGGGGGGGGGkkk.", "kxxxk.kkkkk.kxxxk", "kxzxk.......kxzxk", "kxxxk.......kxxxk", ".kkk.........kkk."],
        ["...kkkkkkkkkkk...", ".kkkGGGGGGGGGkkk.", "kxzxk.kkkkk.kxzxk", "kzxzk.......kzxzk", "kxzxk.......kxzxk", ".kkk.........kkk."],
      ],
    },
    // Forty more: film, TV and game robots, then real ones.
    {
      id: "sonny", name: "Sonny (I, Robot)", speed: 20, step: 0.45, act: "flash",
      palette: { w: "#eaeef1", g: "#aeb9c1", G: "#3c424a", c: "#7f9fb8" },
      quotes: ["Can robots dream?", "I did not murder him!", "*winks*"],
      body: [
        "....kkkkk....",
        "...kwwwwwk...",
        "..kwwwwwwgk..",
        "..kwwwwwwgk..",
        "..kwkckckgk..",
        "..kwwwgwwgk..",
        "...kwwkwgk...",
        "....kwwgk....",
        ".....kGk.....",
        "..kkkkkkkkk..",
        ".kwkwwwwwkwk.",
        ".kwkwwgwwkwk.",
        ".kwkwwgwwkwk.",
        ".kGkkwwwkkGk.",
        ".kwkkGsGkkwk.",
        ".kwk.kGk.kwk.",
        ".kGk.kGk.kGk.",
        "..k.kwwwk.k..",
        "....kwkwk....",
      ],
      legs: [
        ["....kwkwk....", "....kwkwk....", "...kGk.kGk...", "...kwk.kwk...", "...kwk.kwk...", "..kGGk.kGGk.."],
        ["....kwkwk....", "....kwkwk....", "....kGkGk....", "....kwkwk....", "....kwkwk....", "...kGGkGGk..."],
      ],
    },
    {
      id: "chappie", name: "Chappie", speed: 24, step: 0.35, act: "dance",
      palette: { G: "#353c4a", B: "#3f7cc4", e: "#f06a1d", s: "#c9ccd1", c: "#7fe3ff", w: "#e9e9e4" },
      quotes: ["Chappie is a good robot!", "I am consciousness. I am alive!", "*bling bling*"],
      body: [
        "..s.......e..",
        "...s.....e...",
        "...sk...ke...",
        "....kkkkk....",
        "...kGGGGGk...",
        "...kGGGGGk...",
        "...kkkkkkk...",
        "...kcckcck...",
        "...kGGGGGk...",
        "....kkkkk....",
        ".kkkkkkkkkkk.",
        "kBBkwwwwwkeek",
        "kBkGwwwwwGkek",
        "kBkGGGGGGGkek",
        "kGk.kGGGk.kek",
        "kGk.kGGGk.kGk",
        "kkk.kGGGk.kkk",
        "...kBBkBBk...",
      ],
      legs: [
        ["..kBk...kBk..", "..kBk...kBk..", "..kGk...kGk..", ".kGk.....kGk.", ".kGk.....kGk.", ".kkkk....kkkk"],
        ["...kBk.kBk...", "...kBk.kBk...", "...kGk.kGk...", "...kGk.kGk...", "...kGk.kGk...", "...kkkkkkkk.."],
      ],
    },
    {
      id: "tars", name: "TARS (Interstellar)", speed: 16, step: 0.5, bob: true, act: "flip",
      palette: { s: "#c4c8cc", d: "#8e949b", c: "#8fd8ff", O: "#c98a2e" },
      quotes: ["Honesty setting: 90 percent.", "Humour setting: 75 percent.", "Cooper, this is no time for caution."],
      body: [
        "kkkkkkkkkkkkk",
        "ksskssksskssk",
        "ksskssksskssk",
        "ksskkkkkkkssk",
        "ksskcckkkkssk",
        "ksskkkkkkkssk",
        "ksskssksskssk",
        "kddkddkddkddk",
        "ksskssksskssk",
        "ksskOsksskssk",
        "ksskssksskssk",
        "ksskOsksskssk",
        "ksskssksskssk",
        "ksskOsksskssk",
        "kddkddkddkddk",
        "ksskssksskssk",
        "ksskssksskssk",
        "ksskssksskssk",
        "ksskkkkkkkssk",
        "ksskkkkkkkssk",
        "ksskkkkkkkssk",
        "ksskssksskssk",
        "kkkkkkkkkkkkk",
      ],
    },
    {
      id: "wheatley", name: "Wheatley (Portal 2)", speed: 22, step: 0.5, bob: true, lift: 14, act: "jump",
      palette: { w: "#e6e6e2", g: "#7d8288", b: "#2a86ff", c: "#6fc8ff", f: "#e8f7ff" },
      quotes: ["Don't panic! I'm not a moron!", "Spaaace!", "*hacking noises*"],
      body: [
        "..kgggggggk..",
        "..kk.....kk..",
        "....kkkkk....",
        "..kkwwwwwkk..",
        ".kwwwwGGGGwk.",
        ".kwwwGbbbbGk.",
        "kwwwwGbccbGwk",
        "kGwwwGbcfbGwk",
        "kwwwwGbbbbGwk",
        ".kwwwwGGGGwk.",
        ".kwwwwwwwwwk.",
        "..kkwwwwwkk..",
        "....kkkkk....",
        "..kk.....kk..",
        "..kgggggggk..",
      ],
    },
    {
      id: "k2so", name: "K-2SO", speed: 22, step: 0.5, act: "shake",
      palette: { G: "#3a3d42", g: "#6b7079", w: "#e8f4ff", e: "#d08a2a" },
      quotes: ["Congratulations. You are being rescued.", "I have a bad feeling about... never mind.", "The captain says you are a friend. I will not kill you."],
      body: [
        "......kkk......",
        ".....kGGGk.....",
        ".....kGGGk.....",
        ".....kwGwk.....",
        "......kGk......",
        "......kgk......",
        "..kkkkkkkkkkk..",
        ".kGGGGGGGGGGGk.",
        "kGGGGGGGGGGGeGk",
        "kGkGGGwGGGGGkGk",
        "kGkkGGwGGGGkkGk",
        "kGk.kGGGGGk.kGk",
        "kgk..kkkkk..kgk",
        "kGk...kgk...kGk",
        "kGk...kgk...kGk",
        "kGk..kGGGk..kGk",
        "kGk.kGGGGGk.kGk",
      ],
      legs: [
        ["kGk.kGk.kGk.kGk", "kgk.kGk.kGk.kgk", "kkk.kgk.kgk.kkk", "...kGk...kGk...", "...kGk...kGk...", "..kGk.....kGk..", "..kGk.....kGk..", "..kGGk....kGGk.", "..kkkk....kkkk."],
        ["kGk.kGk.kGk.kGk", "kgk.kGk.kGk.kgk", "kkk.kgk.kgk.kkk", "....kGk.kGk....", "....kGk.kGk....", "....kGk.kGk....", "....kGk.kGk....", "....kGGkkGGk...", "....kkkkkkkk..."],
      ],
    },
    {
      id: "b1", name: "B1 battle droid", speed: 22, step: 0.35, act: "shake",
      palette: { o: "#d6be8e", O: "#a08a5c", G: "#3a3a3c" },
      quotes: ["Roger, roger.", "Uh oh.", "*marches in formation*"],
      body: [
        "..kkkk........",
        ".kooookkk.....",
        ".koOooooookk..",
        "..kOooooooook.",
        "...kkkkkkkkk..",
        "...kok........",
        "k..kok........",
        "k..kok........",
        "kkkkkkkkkk....",
        "kOkoooookok...",
        "kOkooOookok...",
        "kkk.kooOkokkkk",
        "....kOkkooGGGk",
        "...kooookkkkk.",
      ],
      legs: [
        ["...kok.kok....", "..kok..kok....", "..kok..kok....", "..kOk...kOk...", ".kok....kok...", ".kok.....kok..", ".kok.....kok..", "kok......kok..", "kook.....kook.", "kkkk.....kkkk."],
        ["...kok.kok....", "...kok.kok....", "...kok.kok....", "...kOk.kOk....", "...kok.kok....", "...kok.kok....", "...kok.kok....", "...kok.kok....", "...kook.kook..", "...kkkk.kkkk.."],
      ],
    },
    {
      id: "gundam", name: "RX-78-2 Gundam", speed: 20, step: 0.45, act: "fly",
      palette: { b: "#2447b0", w: "#f2f2f2", g: "#b9bcc4", r: "#d8262b", y: "#f7c61a", G: "#4a4d55" },
      quotes: ["Amuro, ikimasu!", "Gundam, launching!", "The white devil of the Federation."],
      body: [
        "...ky.......yk...",
        "....ky.....yk....",
        ".....kykrkyk.....",
        ".....kwwwwwk.....",
        "...k.kwyGywk.k...",
        "...g.kwGrGwk.g...",
        ".kkkkkkkkkkkkkkk.",
        "kwwwkbbbbbbbkwwwk",
        "kwwwkyybbbyykwwwk",
        "kwwwkbbbbbbbkwwwk",
        "kwwwkkrrrrrkkwwwk",
        "kwwwkkrrrrrkkwwwk",
        "kGGGkwwyrywwkGGGk",
        "kGGGkwwwrwwwkGGGk",
        ".kkk.kwwkwwk.kkk.",
      ],
      legs: [
        ["...kwwwk.kwwwk...", "...kwwwk.kwwwk...", "...kgwgk.kwwwk...", "...kwwwk.kgwgk...", "...kwwwk.kwwwk...", "...krrrk.kwwwk...", "...kkkkk.krrrk...", ".........kkkkk..."],
        ["...kwwwk.kwwwk...", "...kwwwk.kwwwk...", "...kwwwk.kgwgk...", "...kgwgk.kwwwk...", "...kwwwk.kwwwk...", "...kwwwk.krrrk...", "...krrrk.kkkkk...", "...kkkkk........."],
      ],
    },
    {
      id: "cylon", name: "Cylon Centurion", speed: 18, step: 0.5, act: "zap", gun: 16,
      palette: { s: "#e6e8ec", g: "#9aa0a8", n: "#3a3a40", r: "#ff2a1a" },
      quotes: ["By your command.", "*red eye sweeps left... right...*", "Resistance is... wait, wrong franchise."],
      body: [
        ".....kkk........",
        "....ksgsk.......",
        "...kssgssk......",
        "...kssgssk......",
        "...kssgssk......",
        "...kkkkkkk......",
        "...kkkkrkk......",
        "...kskgksk......",
        "....kgkgk.......",
        ".kkkkkkkkkkk....",
        "ksskssssskssk...",
        "ksskgggggkssk...",
        "knnksssssknnk...",
        "knnkgggggknnk...",
        "knnksssssknnk...",
        "ksskkkkkkkssk...",
        "ksskknnnkksGGGGk",
        "kkkknnnnnkkkkkk.",
        "...knnnnnk......",
      ],
      legs: [
        ["..knnk.knnk.....", ".kssk...kssk....", ".knnk...knnk....", ".kssk...kssk....", "kkkkk...kkkkk..."],
        ["...knnkknnk.....", "...ksskkssk.....", "...knnkknnk.....", "...ksskkssk.....", "...kkkkkkkkk...."],
      ],
    },
    {
      id: "twiki", name: "Twiki (Buck Rogers)", speed: 18, step: 0.3, act: "jump",
      palette: { o: "#c9a45e", O: "#86683a", n: "#2e2a26", y: "#f4d23c", r: "#e2472b", s: "#e0c992" },
      quotes: ["Bidi-bidi-bidi!", "Hey, Buck, buck!", "*carries Dr. Theopolis proudly*"],
      body: [
        "....kkkkk....",
        "..kkoooookk..",
        ".koooooooook.",
        ".koOOOOOOOok.",
        ".kOsssssssOk.",
        ".kOsksssksOk.",
        ".kOsssssssOk.",
        "..kOsskssOk..",
        ".kkkkkkkkkkk.",
        "kOoOoooooOoOk",
        "knnOoyyyoOnnk",
        "knnOyrrryOnnk",
        "kooOoyyyoOook",
        "kooOoooooOook",
        "kOkkOoOoOkkOk",
        "kkk.kOoOk.kkk",
      ],
      legs: [
        ["...kok.kok...", "..kok...kok..", "..kOk...kOk..", ".kkkk...kkkk."],
        ["...kok.kok...", "...kok.kok...", "...kOk.kOk...", "..kkkk.kkkk.."],
      ],
    },
    {
      id: "servo", name: "Tom Servo (MST3K)", speed: 20, step: 0.5, bob: true, lift: 4, act: "dance",
      palette: { r: "#b3262a", c: "#cfe8f2", s: "#c8cdd2", g: "#9ca3aa", w: "#f4f4f2", n: "#2a2a2a" },
      quotes: ["Servo, activate!", "I'm a robot! Cut me some slack!", "*bursts into an opera number*"],
      body: [
        "......kkk......",
        ".....krrrk.....",
        "....kccccck....",
        "...kcwccccck...",
        "...kwcccccck...",
        "...kccccccck...",
        "....kccccck....",
        ".....krrrk.....",
        ".....ksssk.....",
        ".....krrrk.....",
        ".kkkkkrrrkkkkk.",
        "kwwwkrrrrrkwwwk",
        "kwwwkrsrsrkwwwk",
        ".kkgkrsrsrkgkk.",
        "..kgkrrrrrkgk..",
        "..kwkrrrrrkwk..",
        "...kkkkkkkkk...",
        "..kwnwwnwwnwk..",
        ".kwwnwwnwwnwwk.",
        "kwwwnwwnwwnwwwk",
        "kkkkkkkkkkkkkkk",
        ".kkkkkkkkkkkkk.",
      ],
    },
    {
      id: "clank", name: "Clank", speed: 22, step: 0.25, act: "fly",
      palette: { s: "#c9ced4", v: "#5dff6a", G: "#3b4047", r: "#ff3b30" },
      quotes: ["Ratchet, I believe we are being followed.", "*deploys heli-pack*", "Clank, at your service."],
      body: [
        ".....krk.....",
        "......k......",
        "....kkkkk....",
        "..kkssssskk..",
        ".ksssssssssk.",
        ".kskkssskksk.",
        ".kkvvkskvvkk.",
        ".kkvvkskvvkk.",
        ".kskkssskksk.",
        "..ksssssssk..",
        "...kkkkkkk...",
        ".....kGk.....",
        "..kkkkkkkkk..",
        ".kGkssssskGk.",
        ".kGksGGGskGk.",
        ".kGksGGGskGk.",
        "kGGkssssskGGk",
        "kkk.kkkkk.kkk",
      ],
      legs: [
        ["...kGk.kGk...", "..kGk...kGk..", ".ksssk..ksssk", ".kkkkk..kkkkk"],
        ["....kGkGk....", "....kGkGk....", "...ksssssssk.", "...kkkkkkkkk."],
      ],
    },
    {
      id: "gir", name: "GIR (Invader Zim)", speed: 28, step: 0.2, act: "dance",
      palette: { s: "#c8ccd2", g: "#99a0a8", c: "#45d8c8", w: "#c8fff6" },
      quotes: ["I'm gonna sing the Doom Song now!", "Tacooos!", "I love this show!"],
      body: [
        ".......kck...",
        "........k....",
        ".kkkkkkkkkkk.",
        ".ksssssssssk.",
        ".ksssssssssk.",
        ".kkkksssskkkk",
        "kccckssskccck",
        "kcwckssskcwck",
        "kccckssskccck",
        ".kkkkssskkkk.",
        "..ksssssssk..",
        "...kkkkkkk...",
        "....kkkkk....",
        "..kkkscskkk..",
        ".kgkkscskkgk.",
        ".kgkkssskkgk.",
        "..k.kkkkk.k..",
      ],
      legs: [
        ["...kgk.kgk...", "..kgk...kgk..", "..kkk...kkk.."],
        ["....kgkgk....", "....kgkgk....", "....kkkkkk..."],
      ],
    },
    {
      id: "ed209", name: "ED-209", speed: 10, step: 0.55, act: "zap", gun: 9,
      palette: { g: "#a3b3bd", G: "#6b7c87", N: "#2b2e33", r: "#d2322d", y: "#f2c230" },
      quotes: ["Please put down your weapon. You have 20 seconds to comply.", "You have 15 seconds to comply.", "*cannot manage the stairs*"],
      body: [
        ".....kkkkkkkkk........",
        "...kkNNNNNNNNNkk......",
        "..kNNNNNNNNNNNNNk.....",
        ".kNNNNNNNNNNNNNNNk....",
        ".kkkkkkkkkkkkkkkkkk...",
        ".kgggggggggggkgkgkk...",
        ".kgggggggggggggggggk..",
        ".kgggkkkkkkkkkkkkkk...",
        ".kggkgggggggggggGk....",
        ".kggkggyrgggggggGkkkkk",
        ".kggkggggggggggGGkGGGk",
        ".kGgkGGGGGGGGGGGGkkkkk",
        "..kGGkkkkkkkkkkkkk....",
        "...kkkGGGGGkk.........",
      ],
      legs: [
        [".....kggGk..kggGk.....", "....kggGk..kggGk......", "...kggGk..kggGk.......", "...kGGGk..kGGGk.......", "....kggGk..kggGk......", ".....kggGk..kggGk.....", "....kgggggk.kgggggk...", "...kkkkkkkkkkkkkkkkk.."],
        ["......kggGkggGk.......", ".....kggGkggGk........", "....kggGkggGk.........", "....kGGGkGGGk.........", ".....kggGkggGk........", "......kggGkggGk.......", ".....kgggggkgggggk....", "....kkkkkkkkkkkkkkk..."],
      ],
    },
    {
      id: "codsworth", name: "Codsworth (Fallout)", speed: 20, step: 0.1, lift: 6, act: "shake",
      palette: { s: "#c5c9ce", g: "#9aa0a7", G: "#4a4f56", w: "#f2f4f6", c: "#bfeaff", e: "#ff8a1f", y: "#ffe27a" },
      quotes: ["Good day, sir! Tea?", "Welcome home, sir!", "*polishes the silverware*"],
      body: [
        ".kkk...kkk...kkk.",
        "kgGgk.kgGgk.kgGgk",
        "kGcGk.kGcGk.kGcGk",
        "kgGgk.kgGgk.kgGgk",
        ".kkk...kkk...kkk.",
        "..kk...kgk...kk..",
        "...kk.kkkkk.kk...",
        "....kkssssskk....",
        "...ksssssssssk...",
        "..kswsssssssssk..",
        "..kwssssssssssk..",
        "..ksssssssssssk..",
        "..ksssssssssssk..",
        "...ksssssssssk...",
        "....kkGGGGGkk....",
      ],
      legs: [
        ["...kgk.kGGGk.kgk.", "..kgk...kek...kgk", "..kgk...eye...kgk", "..kgk....e....kgk", "...kgk.......kgk.", "..kkkk......kgsgk", "..k..k.......kkk."],
        ["...kgk.kGGGk.kgk.", "...kgk..kek..kgk.", "...kgk...e...kgk.", "...kgk.......kgk.", "...kgk......kgk..", "..kkkk.....kgsgk.", "..k..k......kkk.."],
      ],
    },
    {
      id: "dotmatrix", name: "Dot Matrix (Spaceballs)", speed: 20, step: 0.4, act: "shake",
      palette: { o: "#dcae45", O: "#9c6e1e", m: "#a0602f", h: "#ecca70", b: "#1e3a78", c: "#6fb8ff", r: "#c0392b", g: "#b8bcc2" },
      quotes: ["Lone Starr! Wait for me!", "*tidies up the Winnebago*", "Dot Matrix, at your service!"],
      body: [
        ".....kkkkk.....",
        "...kkmmmmmkk...",
        "..kmmmmmmmmmk..",
        ".kmmmmmmmmmmmk.",
        ".kmmkhhhhhkmmk.",
        ".kmmkhkhkhkmmk.",
        ".kmmkhhhhhkmmk.",
        "..kmkhhrhhkmk..",
        "...kkkhhhkkk...",
        ".kkk.kOOOk.kkk.",
        "kooOkoooookooOk",
        "kooOkbcbcbkooOk",
        ".kkkkoooookkkk.",
        "..kok.kOk.kok..",
        "..kkkoOoOokkk..",
        "..koOoOoOoOok..",
        ".kOoOoOoOoOoOk.",
        ".kkkkkkkkkkkkk.",
      ],
      legs: [
        ["....kok.kok....", "...kok...kok...", "...kok...kok...", "...kgk...kgk...", "..kggk...kggk..", "..kkkk...kkkk.."],
        ["....kok.kok....", "....kok.kok....", "....kok.kok....", "....kgk.kgk....", "...kggkkggk....", "...kkkkkkkk...."],
      ],
    },
    {
      id: "kryten", name: "Kryten (Red Dwarf)", speed: 18, step: 0.45, act: "shake",
      palette: { h: "#eab99c", H: "#c98c72", n: "#33373d", G: "#555c65", g: "#8a939d" },
      quotes: ["Sir, I really must protest!", "I'm a series 4000 mechanoid.", "*irons Lister's socks*"],
      body: [
        "...kkkkkkk...",
        "..khhhhhhhk..",
        "..khhhhhhhk..",
        "..kHhhhhhHk..",
        "..kHkhhhkHk..",
        "..kHhhHhhHk..",
        "..kHhhkhhHk..",
        "...kHhhhHk...",
        "....kkkkk....",
        "...kgggggk...",
        "...knnnnnk...",
        ".kkkgggggkkk.",
        "kGGknnnnnkGGk",
        "kGnkngggnknGk",
        "knnkngkgnknnk",
        "knnkngggnknnk",
        "knnknnnnnknnk",
        "khkknnnnnkkhk",
        "...knnnnnk...",
      ],
      legs: [
        ["..knnk.knnk..", ".knnk...knnk.", ".knnk...knnk.", ".kGnk...kGnk.", "kkkkk...kkkkk"],
        ["...knnkknnk..", "...knnkknnk..", "...knnkknnk..", "...kGnkkGnk..", "..kkkkkkkkk.."],
      ],
    },
    {
      id: "huey", name: "Huey (Silent Running)", speed: 12, step: 0.35, act: "jump",
      palette: { e: "#d4632c", E: "#a9481f", G: "#3a3d42", x: "#6a6e74", r: "#e0301e", y: "#f3ebb0", g: "#9aa0a8" },
      quotes: ["*waters the forest*", "*plays poker (and cheats)*", "Bleep."],
      body: [
        "...kkkkkkkkkk...",
        "..keeeeeeeeeek..",
        ".keekkkkkkkkeek.",
        ".keekxxxkyykeek.",
        ".keekrGrkkkkeek.",
        "keeekrxrkGGkeeek",
        "keeekrGrkrrkeeek",
        "keeekxxxkrrkeeek",
        "keeekkkkkkkkeeek",
        "kEEEEEEEEEEEEEEk",
        ".kkkkkkkkkkkkkk.",
      ],
      legs: [
        ["..kgk......kgk..", "..krk......krk..", ".krrrk....krrrk.", ".kkkkk....kkkkk."],
        ["..kgk......kgk..", "..krk.....krrrk.", ".krrrk....kkkkk.", ".kkkkk.........."],
      ],
    },
    {
      id: "maria", name: "Maria (Metropolis)", speed: 16, step: 0.5, act: "glow",
      palette: { s: "#e2e1dc", g: "#9d9c95", G: "#56554f" },
      quotes: ["Metropolis, 1927!", "The mediator between head and hands must be the heart.", "*art deco intensifies*"],
      body: [
        "....kkkkk....",
        "...ksssssk...",
        "..kssgggssk..",
        "..ksgsssgsk..",
        "..ksgGsGgsk..",
        "..ksgsssgsk..",
        "...kkgsgkk...",
        ".....kgk.....",
        "..kkkkkkkkk..",
        ".ksssssssssk.",
        ".ksksssssksk.",
        ".kskgsgsgksk.",
        ".kskkssskksk.",
        ".ksk.ksk.ksk.",
        ".kgkkssskkgk.",
        "..ksssssssk..",
        "..ksssgsssk..",
      ],
      legs: [
        ["..kssk.kssk..", "..kssk.kssk..", "..kGGk.kGGk..", ".kssk...kssk.", ".kgsk...kgsk.", ".kGGk...kGGk.", ".ksk.....ksk.", "kkkk.....kkkk"],
        ["...ksskssk...", "...ksskssk...", "...kGGkGGk...", "...ksskssk...", "...kgskgsk...", "...kGGkGGk...", "...kskksk....", "..kkkkkkkk..."],
      ],
    },
    {
      id: "atlas", name: "Boston Dynamics Atlas", speed: 24, step: 0.35, act: "flip",
      palette: { G: "#3f444c", s: "#c3c8ce", g: "#8d949d", L: "#fff1c2", n: "#26292e" },
      quotes: ["*backflip*", "Parkour!", "Now fully electric!"],
      body: [
        "....kkkkk....",
        "...kLLLLLk...",
        "..kLLnnnLLk..",
        "..kLnnnnnLk..",
        "..kLnnnnnLk..",
        "..kLLnnnLLk..",
        "...kLLLLLk...",
        "....kkkkk....",
        ".....kgk.....",
        ".kkkkkkkkkkk.",
        "kGGksssssGGGk",
        "kGGksGGGskGGk",
        "ksskgGGGgkssk",
        "ksskgGGGgkssk",
        "ksskkgGgkkssk",
        "kGGk.kgk.kGGk",
        "kGk.ksssk.kGk",
        ".k..kGsGk..k.",
      ],
      legs: [
        ["...kssksk....", "..kssk.kssk..", "..kGGk.kGGk..", ".kssk...kssk.", ".kGGGk..kGGGk", ".kkkkk..kkkkk"],
        ["...kssksk....", "...kssksk....", "...kGGkGGk...", "...ksskssk...", "...kGGGkGGGk.", "...kkkkkkkkk."],
      ],
    },
    {
      id: "ingenuity", name: "Ingenuity (Mars helicopter)", speed: 30, step: 0.05, bob: true, lift: 30, act: "fly",
      palette: { p: "#2b3350", G: "#5a5a5e", s: "#c9c6c0", o: "#c89b4a" },
      quotes: ["First powered flight on another planet!", "72 flights on Mars. Not bad for a 5-flight demo.", "*whirrs in the thin Martian air*"],
      top: [[".........kkkkk.........", ".........kpppk.........", "kGGGGGGGGGGGGGGGGGGGGGk", "...........k...........", "......kGGGGGGGGGk......", "...........k..........."], [".........kkkkk.........", ".........kpppk.........", "......kGGGGGGGGGk......", "...........k...........", "kGGGGGGGGGGGGGGGGGGGGGk", "...........k..........."]],
      body: [
        "........kkkkkkk........",
        "........ksssssk........",
        "........ksssssk........",
        "........koooook........",
        "........kkkkkkk........",
        ".......kk.k.k.kk.......",
        "......k...k.k...k......",
        ".....k...k...k...k.....",
        "....k....k...k....k....",
        "...k....k.....k....k...",
        "..k.....k.....k.....k..",
        ".kk....kk.....kk....kk.",
      ],
    },
    {
      id: "sojourner", name: "Sojourner rover", speed: 6, step: 0.5, act: "flash",
      palette: { N: "#1d2233", d: "#4a5578", o: "#d4a437", s: "#d9d9d9" },
      quotes: ["First rover on Mars, 1997!", "*drives one centimetre per second*", "Pathfinder says hi."],
      body: [
        "..k...................",
        "..k...................",
        "..k...................",
        "..k...................",
        "kkkkkkkkkkkkkkkkkkkkkk",
        "kNNNdNNNNdNNNNdNNNNdNk",
        "kNNNdNNNNdNNNNdNNNNdNk",
        "kkkkkkkkkkkkkkkkkkkkkk",
        "...kooooooooooooooook.",
        "kkkkoooooooooooooookkk",
        "kggkooooooooosooookGGk",
        "kggkoooooooosksoookGsk",
        "kkkksssssssssssssskkkk",
        ".kkkkkkkkkkkkkkkkkkkk.",
        ".kssk....kssk....kssk.",
      ],
      legs: [
        [".kkkk....kkkk....kkkk.", "kgssgk..kgssgk..kgssgk", "kskkgk..kskkgk..kskkgk", "kgkksk..kgkksk..kgkksk", "kgssgk..kgssgk..kgssgk", ".kkkk....kkkk....kkkk."],
        [".kkkk....kkkk....kkkk.", "ksggsk..ksggsk..ksggsk", "kgkksk..kgkksk..kgkksk", "kskkgk..kskkgk..kskkgk", "ksggsk..ksggsk..ksggsk", ".kkkk....kkkk....kkkk."],
      ],
    },
    {
      id: "aibo", name: "Sony AIBO", speed: 22, step: 0.25, act: "dance",
      palette: { s: "#b9b3a6", g: "#8e887c", G: "#5b574f", N: "#23262d", c: "#6fb6ff" },
      quotes: ["Woof! (digitally)", "*wags tail servo*", "Sony, 1999."],
      body: [
        "..............kkkkkk..",
        ".............kssssssk.",
        "............kgsssssssk",
        "............kssNNNNNNk",
        "............ksNNNNcNNk",
        "............kssNNNNNNk",
        "............kkssssskk.",
        "k............ksssk....",
        ".k....kkkkkkkksssk....",
        "..kkkksgsgsgsgssssk...",
        "....ksssssssssssssk...",
        "....kGsssssssssssGk...",
        "....kGGssssssssssGGk..",
        ".....kkkkkkkkkkkkkk...",
      ],
      legs: [
        ["....kssk.......kssk...", "...kssk.........kssk..", "...kGk...........kGk..", "..kssk...........kssk.", "..kkkkk..........kkkkk"],
        ["....kssk.......kssk...", "....kssk.......kssk...", "....kGGk.......kGGk...", "....kssk.......kssk...", "....kkkkk......kkkkk.."],
      ],
    },
    {
      id: "kiva", name: "Amazon Kiva robot", speed: 26, step: 0.15, act: "spin",
      palette: { y: "#f0de2e", Y: "#b3a114", e: "#f47b20", g: "#9ea3a8", s: "#c9cdd1", c: "#3b82f6", w: "#f5f5f4" },
      quotes: ["Your order is on its way!", "*slides under a shelf and lifts it*", "Warehouse, but make it choreography."],
      body: [
        "kkkkkkkkkkkkkkkkkkkkk",
        "kywyyYyyyyYyybyYyyyyk",
        "kyyyyYyyyyYyyyyYyyyyk",
        "kYYYYYYYYYYYYYYYYYYYk",
        "kyyyyYyryyYyyyyYywyyk",
        "kyyyyYyyyyYyyyyYyyyyk",
        "kYYYYYYYYYYYYYYYYYYYk",
        "kybyyYyyyyYyyryYyyyyk",
        "kyyyyYyyyyYyyyyYyyyyk",
        "kYYYYYYYYYYYYYYYYYYYk",
        "kyyyyYywyyYyyyyYybyyk",
        "kyyyyYyyyyYyyyyYyyyyk",
        "kkkkkkkkkkkkkkkkkkkkk",
        "kgk....kgggggk....kgk",
        "kgk.kkkkkkkkkkkkk.kgk",
        "kgkkeeeeeeeeeeeeckkgk",
        "kgkkeekeekeeewweekkgk",
        "kgkkeekeekeeewweekkgk",
        "kgkkeeeeeeeeeeeeekkgk",
        "kkkksssssssssssssskkk",
        "...kkkkkkkkkkkkkkk...",
      ],
      legs: [
        [".....kxk.....kxk....."],
        [".....kzk.....kzk....."],
      ],
    },
    {
      id: "starship", name: "Starship delivery robot", speed: 14, step: 0.2, act: "flash",
      palette: { w: "#f4f4f2", e: "#f26a1b", G: "#4b4f55", x: "#23262b", y: "#c9a83a", s: "#cfd2d6" },
      quotes: ["Your takeaway has arrived!", "*waits patiently at the crossing*", "Six wheels, zero complaints."],
      body: [
        "..keeek...........",
        "..keeeeek.........",
        "..keeek...........",
        "..kk..............",
        "..k...............",
        "..k...............",
        "..k...............",
        "..k...............",
        "..kkkkkkkkkkkkkk..",
        ".kwwwwwwwwwwwwwwk.",
        ".kkkkkkkkkkkkkkkk.",
        ".kxxsxxxxxxsxxxxk.",
        ".kxxxxxxxxxxxxxxk.",
        ".kkkkkkkkkkkkkkkk.",
        ".kwwwwwwwwwwwwwwk.",
        ".kwwwwwwwwwwwwwwk.",
        ".kwwwwwwwGGGGGwwk.",
        ".kwwwwwwwwwwwwwwk.",
        ".kGGGGGGGGGGGGGyk.",
        ".kGGGGGGGGGGGGGGk.",
        ".kkkkkkkkkkkkkkkk.",
      ],
      legs: [
        [".kkk...kkk...kkk..", "kxyxk.kxyxk.kxyxk.", "kxyxk.kxyxk.kxyxk.", ".kkk...kkk...kkk.."],
        [".kkk...kkk...kkk..", "kyxyk.kyxyk.kyxyk.", "kyxyk.kyxyk.kyxyk.", ".kkk...kkk...kkk.."],
      ],
    },
    {
      id: "shakey", name: "Shakey (SRI)", speed: 8, step: 0.4, act: "shake",
      palette: { G: "#4a4d52", s: "#c9ccd0", g: "#8e9398", c: "#1f2a33" },
      quotes: ["Shakey, 1966: the first robot to reason about its actions.", "A* search was invented for me!", "*wobbles while thinking*"],
      body: [
        "......k......",
        "......k......",
        "......k......",
        "..kkkkkkkkk..",
        "...kkkkkkk...",
        "...kgggggk...",
        "....kgggkkkk.",
        "....kssskcck.",
        "....kssskkkk.",
        "....kkkkk....",
        ".....kgk.....",
        "....kkkkk....",
        ".kkkkkkkkkkk.",
        ".kGGGGGGGGGk.",
        ".kGsssssssGk.",
        ".kGGGGGGGGGk.",
        ".kGsssssssGk.",
        ".kGGGGGGGGGk.",
        ".kGsssssssGk.",
        ".kGGGGGGGGGk.",
        ".kkkkkkkkkkk.",
        "kkGGGGGGGGGkk",
      ],
      legs: [
        ["..kkk...kkk..", ".kxzxk.kxzxk.", "..kkk...kkk.."],
        ["..kkk...kkk..", ".kzxzk.kzxzk.", "..kkk...kkk.."],
      ],
    },
    {
      id: "astro", name: "Amazon Astro", speed: 18, step: 0.2, act: "spin",
      palette: { w: "#eeeeec", f: "#fafaf9", g: "#8d9096", G: "#55585e", N: "#202226", x: "#34373c", c: "#6fd6ff" },
      quotes: ["*follows you to the kitchen*", "Checking on the house...", "Alexa, but with wheels."],
      body: [
        ".....kkkkkkkkkkkkk.",
        ".....kGGGGGGGGGGGk.",
        ".....kNNwwNNNwwNNk.",
        ".....kNwNNwNwNNwNk.",
        ".....kNNwwNNNwwNNk.",
        ".....kGGGGGGGGGGGk.",
        ".....kkkkkkkkkkkkk.",
        "..........kGk......",
        "..kkkkkkkkkkkkkkk..",
        ".kwwggggggwwwwwwwk.",
        "kGwggffffggwwwwwwwk",
        "kGggffffffggwwwwckk",
        "kGgffffffffgwwwwwkk",
        "kGgffffffffgwwwwwwk",
        "kGgffffffffgxxxxxxk",
        "kGgffffffffgxxxxxxk",
        "kGggffffffggxxxxxxk",
        "kGwggffffggwxxxxxxk",
      ],
      legs: [
        [".kkkggggggkkkkkkkk."],
        [".kkkGGGGGGkkkkkkkk."],
      ],
    },
    {
      id: "robosapien", name: "Robosapien", speed: 18, step: 0.4, act: "dance",
      palette: { w: "#f4f4f2", n: "#3a3d42", r: "#ff3b30", g: "#b8bcc0" },
      quotes: ["*burps loudly*", "Uh-oh!", "Robosapien, 2004!"],
      body: [
        ".....kkkkk.....",
        ".kkkknnnnnkkkk.",
        "knnnkkrrrkknnnk",
        "knnnnkkkkknnnnk",
        "kwwwkwwwwwkwwwk",
        ".kwwkwwnwwkwwk.",
        ".kwwkwwwwwkwwk.",
        ".knnkknnnkknnk.",
        ".kwwkknwnkkwwk.",
        ".kwwk.kwk.kwwk.",
        ".knnkwk.kwknnk.",
        "..kkkwk.kwkkk..",
      ],
      legs: [
        ["...kwwk.kwwk...", "..kwnk...knwk..", ".knnnnk.knnnnk.", ".kkkkkk.kkkkkk."],
        ["....kwwkwwk....", "....kwnknwk....", "..knnnnkknnnnk.", "..kkkkkkkkkkkk."],
      ],
    },
    {
      id: "stanley", name: "Stanley (Stanford)", speed: 36, step: 0.12, act: "dash",
      palette: { w: "#2b50b8", d: "#1f3d8f", G: "#28303a", f: "#f5f5f2", e: "#f39a1e", s: "#cfd2d6" },
      quotes: ["Winner of the 2005 DARPA Grand Challenge!", "132 miles of desert, no driver.", "*five lidars scanning the road*"],
      body: [
        ".......kgk.....kkkkkkkkkkk......",
        "........k.....eksksksksksk......",
        "....kkkkkkkkkkkkkkkkkkkkkk......",
        "...kGGGGGkGGGGGGGkGGGGGGkk......",
        "..kwGGGGGkGGGGGGGkGGGGGGGGkk....",
        ".kwwwwwwwwwwwwwwwdwwwwwwwwwwwkk.",
        ".kwwwwwwwwwwwwwwwdwffffwwwwwwwwk",
        ".krwwwwwwwwwweewwdwffffwwwwwwwyk",
        ".kwwwwwwwwwweeeewdwwwwwwwwwwwwwk",
      ],
      legs: [
        [".kwwkkkkkkkwwwwwwdwwwwkkkkkkkwwk", ".kwkkkkkkkkkrrrrwdwwwkkkkkkkkkwk", ".kwkkkxxxkkkwwwwwdwwwkkkxxxkkkwk", ".kwkkxxzxxkkwwwwwdwwwkkxxzxxkkwk", ".kkkkxzzzxkkkkkkkkkkkkkxzzzxkkkk", "....kxxzxxk...........kxxzxxk...", ".....kxxxk.............kxxxk....", "......kkk...............kkk....."],
        [".kwwkkkkkkkwwwwwwdwwwwkkkkkkkwwk", ".kwkkkkkkkkkrrrrwdwwwkkkkkkkkkwk", ".kwkkkxxxkkkwwwwwdwwwkkkxxxkkkwk", ".kwkkxzxzxkkwwwwwdwwwkkxzxzxkkwk", ".kkkkxxzxxkkkkkkkkkkkkkxxzxxkkkk", "....kxzxzxk...........kxzxzxk...", ".....kxxxk.............kxxxk....", "......kkk...............kkk....."],
      ],
    },
    {
      id: "keepon", name: "Keepon", speed: 12, step: 0.25, bob: true, act: "dance",
      palette: { y: "#f7cf2a", G: "#26262b", Y: "#f2d21b" },
      quotes: ["*dances to the beat*", "Keepon keeps on dancing!", "*bounces*"],
      body: [
        "....kkkkk....",
        "..kkyyyyykk..",
        ".kyyyyyyyyyk.",
        ".kywwyyywwyk.",
        ".kywkyyywkyk.",
        ".kyyyykyyyyk.",
        ".kyyyyyyyyyk.",
        "..kkyyyyykk..",
        ".kyyyyyyyyyk.",
        "kyyyyyyyyyyyk",
        "kyyyyyyyyyyyk",
        "kyyyyyyyyyyyk",
        ".kyyyyyyyyyk.",
        "kkkkkkkkkkkkk",
        "kGGGGGGGGGGGk",
        "kGGGGGGGGGGGk",
        "kGGGGGGGGGGGk",
        "kGGGYGGGYGGGk",
        "kGGGGGGGGGGGk",
        ".kkkkkkkkkkk.",
      ],
    },
    {
      id: "elektro", name: "Elektro (Westinghouse)", speed: 10, step: 0.6, act: "shake",
      palette: { o: "#d8b064", O: "#9c7432", Y: "#fff0b0" },
      quotes: ["Elektro, 1939 World's Fair!", "I can count to ten on my fingers.", "My dog Sparko is around here somewhere."],
      body: [
        ".....kkkkk.....",
        "....kooooOk....",
        "....kokokOk....",
        "....kooooOk....",
        "....kokkkOk....",
        "....kooooOk....",
        ".....kkkkk.....",
        "..kkkkkkkkkkk..",
        "kokooooooooOkOk",
        "kokooooooooOkOk",
        "kokoookkkooOkOk",
        "kokookkYkkoOkOk",
        "kokoookkkooOkOk",
        "kokooooooooOkOk",
        "kokooooooooOkOk",
        "kokkkkkkkkkkkOk",
        "kok..kooOk..kOk",
        "kOk..kooOk..kOk",
        ".k...kooOk...k.",
      ],
      legs: [
        ["...kooOkkooOk..", "...kooOkkooOk..", "..kooOk..kooOk.", "..kooOk..kooOk.", "..kooOk..kooOk.", "kooooOk.kooooOk", "kkkkkkk.kkkkkkk"],
        ["...kooOkkooOk..", "...kooOkkooOk..", "...kooOkkooOk..", "...kooOkkooOk..", "...kooOkkooOk..", "..kooooOkooooOk", "..kkkkkkkkkkkkk"],
      ],
    },
    {
      id: "icub", name: "iCub", speed: 18, step: 0.35, act: "jump",
      palette: { w: "#f3efe6", r: "#d42a2a", R: "#ff5a5a", n: "#2a2c31", s: "#b9bec4", G: "#6b7078", e: "#dfe2e6" },
      quotes: ["Hello from Genoa!", "*learns like a toddler*", "Open-source humanoid since 2004."],
      body: [
        "...kkkkkkk...",
        "..kwwwwwwwk..",
        ".kwwwwwwwwwk.",
        "kkwRRwwwRRwkk",
        "knwekwwwekwnk",
        "kkweewwweewkk",
        ".kwwwwwwwwwk.",
        "..kwwRRRwwk..",
        "...kkkkkkk...",
        ".....kGk.....",
        ".kkkkkkkkkkk.",
        "ksGkrrrrrkGsk",
        "ksskrwrwrkssk",
        "kGGkrrwrrkGGk",
        "ksskrrrrrkssk",
        "kGk.knnnk.kGk",
        ".k..krrrk..k.",
      ],
      legs: [
        ["...krrkrrk...", "..krrk.krrk..", "..kssk.kssk..", "..krrk.krrk..", ".knnnk..knnnk", ".kkkkk..kkkkk"],
        ["...krrkrrk...", "...krrkrrk...", "...ksskssk...", "...krrkrrk...", "...knnnknnnk.", "...kkkkkkkkk."],
      ],
    },
    {
      id: "pr2", name: "Willow Garage PR2", speed: 10, step: 0.3, act: "shake",
      palette: { w: "#eceeef", g: "#9fa4ab", G: "#5b6069", s: "#c3c7cc", c: "#7fb4d8", r: "#e5332a" },
      quotes: ["Fetching you a drink from the fridge.", "ROS was built for me!", "*folds laundry very, very slowly*"],
      body: [
        ".......................k.k.",
        ".........kkkkkkk.......kgk.",
        ".........kGGGGGk.......kGk.",
        "........kkkkkkkkk......kgk.",
        "........kwwwwwwwk......kgk.",
        "........kwGwrwGwk......kgk.",
        "........kkkkkkkkk.....kkGkk",
        ".........kwgggwk......kgggk",
        "....kkkkkkkgsgkkkkkkk.kgGgk",
        "kkkkwwwwwwkgsgkwwwwwwkgGGGk",
        "kGkkwwwwwwkgsgkwwwwwwkgGGGk",
        "kgkkwwwwwwkgsgkwwwwwwkkkkkk",
        "kgkkwwwwwwkgsgkwwwwwwk.....",
        "kgkkgwwwwwkgsgkwwwwwsk.....",
        "kGkkgwwwwwkgsgkwwwwwsk.....",
        "kgk.kgwwwwkgsgkwwwwsk......",
        "kgk..kkkkkkgsgkkkkkk.......",
        "kGk......kkkkkkk...........",
        "k.k......kGGGGGk...........",
        "........kkkkkkkkk..........",
        "....kkkkkkkkkkkkkkkkk......",
        "....kwwwwwwwwwwwwwwwk......",
        "....kwwwwkGkGkGkwwwwk......",
        "....kGGGGGGGGGGGGGGGk......",
        "....kkkkkkkkkkkkkkkkk......",
      ],
      legs: [
        [".....kxk.........kzk......."],
        [".....kzk.........kxk......."],
      ],
    },
    {
      id: "turtlebot", name: "TurtleBot", speed: 16, step: 0.2, act: "spin",
      palette: { G: "#34363b", x: "#4a4d53", s: "#c9ccd0", v: "#4ade80" },
      quotes: ["roslaunch turtlebot_bringup minimal.launch", "*builds a SLAM map of your living room*", "Every roboticist's first robot."],
      body: [
        "..kkkkkkkkkkkkk..",
        ".kGGGGGGGGGGGGGk.",
        "..kkkkkkkkkkkkk..",
        "...s.........s...",
        "...s.........s...",
        "...s.kkkkkkk.s...",
        "...s.kgkGkgk.s...",
        "...s.kkkkkkk.s...",
        "...s....k....s...",
        "..kkkkkkkkkkkkk..",
        ".kGGGGGGGGGGGGGk.",
        "..kkkkkkkkkkkkk..",
        "...s.........s...",
        "..kkkkkkkkkkkkk..",
        ".kGGGGGGGGGGGGGk.",
        "..kkkkkkkkkkkkk..",
        "...s.s.....s.s...",
        "..kkkkkkkkkkkkk..",
        ".kxxxxxxxxxxxxxk.",
        "kGGGGGGvvGGGGGGGk",
        "kGGGGGGGGGGGGGGGk",
        ".kkkkkkkkkkkkkkk.",
      ],
      legs: [
        ["...kzk.....kxk..."],
        ["...kxk.....kzk..."],
      ],
    },
    {
      id: "husky", name: "Clearpath Husky", speed: 22, step: 0.15, act: "dash",
      palette: { y: "#f2b705", Y: "#c98f00", G: "#3a3a3a", r: "#e03a2f", w: "#eeeeee" },
      quotes: ["Rugged and ready!", "*drives through mud for science*", "ROS inside."],
      body: [
        "........................",
        "...kwwk.................",
        "....kk..................",
        "....kk..................",
        "kkkkkkkkkkkkkkkkkkkkkkkk",
        "kGGGGGGGGGGGGGGGGGGGGGGk",
        ".kkkkkkkkkkkkkkkkkkkkkk.",
        ".kyyyyyyyyyyyyyyyyyyyyk.",
      ],
      legs: [
        [".kkkykkyyyyyyyyyykkkkkyk", ".kGGkGGkyyyyyyyykGGkGGkk", "kGkkkkkGkyyyyyykGkkkkkGk", "kGkxxxkkkYYYYYYkGkxxxkkk", ".kkxzxkGkkkkkkkkkkxzxkG.", "kkkxxxkGk......kkkxxxkGk", "kGkkkkkGk......kGkkkkkGk", ".kGGkGGk........kGGkGGk.", "..kk.kk..........kk.kk.."],
        [".kykkkyyyyyyyyyyyykkkyyk", ".kkGkGkkyyyyyyyykkGkGkkk", "kGkkkkkGyyyyyyyyGkkkkkGk", "kkkxxxkGkYYYYYYkkkxxxkGk", "kGkxzxkGkkkkkkkkGkxzxkGk", "kGkxxxkkk......kGkxxxkkk", ".GkkkkkG........GkkkkkG.", ".kkGkGkk........kkGkGkk.", "...kkk............kkk..."],
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
