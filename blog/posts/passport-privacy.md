---
title: "Passport Privacy: a watermark tool that respects your data"
date: "2026-04-30"
slug: "passport-privacy"
excerpt: "Why I built passport-privacy.meertens.dev — a no-tracking, no-cookies, fully client-side, open-source watermarking tool for photos of your passport and ID documents."
---

Whenever you want to rent a hotel room, open a bank account, or rent a car, you nowadays have to upload a photo of your passport. That's bad, because if that data gets leaked criminals can use these copies to rent a hotel room, open a bank account, or rent a car (probably without returning it). Personally I always add a watermark to the photos I upload, but I noticed it's actually quite hard to do this in a good way.

The Dutch government has their KopieID app, which isn't open source and only works for Dutch documents (so not my German driving license). The French government recommends a website which promises to only keep your data for one hour, has trackers and cookies, and isn't open source. There are a bunch of other tools out there which provide watermarks to (passport) photos, but I simply wanted a single website, no data stored, no tracking or analytics, no cookies, and an open source page.

This is why I launched [passport-privacy.meertens.dev](https://passport-privacy.meertens.dev). The source is on GitHub, it only has a single page, everything happens in your browser, and it's as basic as can be. I hope it becomes the top ranking website for privacy aware people.

I also hope countries start being more strict on who can ask for your passport details. It's a big risk that citizens frequently share their passport details with third party providers so recklessly. It should be noted that even government instances are reckless with this data already (see [hackers steal personal data of nearly all Epe residents](https://www.dutchnews.nl/2026/04/hackers-steal-personal-data-of-nearly-all-epe-residents/)).

The last problem which I don't know how to tackle is identification at hotels. Seemingly every hotel makes a copy or scan of my passport, probably because the government demands that they know who stays at their place. I would love there to be an app which confirms that someone is who they say they are, without the hotel taking my passport to their back office. Surely there can be an application which uses the NFC chip in my passport, scans a QR code on my phone to get an auto-watermarked copy, or another tech solution which keeps my details more private than the status quo.

If you have any ideas or suggestions, please reach out to [passport-privacy@meertens.dev](mailto:passport-privacy@meertens.dev) and let's collaborate!
