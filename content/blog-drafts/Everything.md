# Text for the bradford.digital Blog

## Maybe this should be broken down into smaller docs?



# AvyMap: Avalanche Safety Mobile App
Excerpt:Avalanches are a huge risk in the backcountry. I wanted to make it easier for backcountry recreators to choose a safe slope, so I designed and prototyped an avalanche safety mobile app that uses terrain data to visually depict slope danger on a map. Whether you’re skiing, snowmobiling, or mountaineering, this app is designed to be your backcountry companion.


# The Problem

Avalanches are a huge risk in the backcountry. There have already been  [4 deaths](https://utahavalanchecenter.org/avalanches/fatalities)  this winter season in Utah alone. I love ski touring, but the danger of an avalanche is always at the back of my mind. Traveling in the backcountry requires training, caution, and patience.
A key to making good decisions is knowing the current conditions and which slopes are prone to slide. State funded avalanche reports, like those distributed by the  [Utah Avalanche Center](https://utahavalanchecenter.org/) , do a great job of distributing free info on the current snow conditions, but evaluating slope angles in the backcountry is haphazard at best. I wanted to make it easier for backcountry recreators to choose a safe slope, so I designed and prototyped an avalanche safety mobile app that uses terrain data to visually depict slope danger on a map.


# Mobile App Design

Whether you’re skiing, snowmobiling, or mountaineering, this app is designed to be your backcountry companion. It uses elevation data from  [Mapbox Terrain-RGB](https://docs.mapbox.com/help/troubleshooting/access-elevation-data/#mapbox-terrain-rgb)  to calculate the slope, aspect, and avalanche danger of any region of the world. 
**{video}**
This demo video shows how a user would open the app, check the local avalanche report, input the current avalanche danger ratings, and scan an area for avalanche danger.
**{image of mobile and desktop app}**


# Representation of Slope Danger

The danger is represented by colored dots and lines. The color and line length represent the degree of danger in accordance with the legend below. The colors follow the standard set in the  [North American Public Avalanche Danger Scale](https://avalanche.org/avalanche-encyclopedia/danger-scale/) . Put simply: green is ok, red is bad, longer lines are more dangerous. The direction of the lines also indicate the slope aspect and “fall line”, or the direction in which an avalanche will slide.
**{map legend & danger graph}**
**{ screenshot of a map with danger lines showing }**
This graph depicts the percentage of human triggered avalanches by slope angle. 76% of human triggered avalanches occur on slopes that are 34°–45°, and 96% occur on slopes that are between 30° and 50°. Peak activity (8%) occurs at slopes of 39°.
This graph is based on:
Tremper, Bruce.  [“Avalanche Charts for the Season.”](https://utahavalanchecenter.org/blog/15617)  _Utah Avalanche Center_, 2013.
Supporting data can be found in:
Fredston, Jill. Fesler, Doug.  [Snow Sense.](https://smile.amazon.com/Snow-Sense-Evaluating-Avalanche-Hazard/dp/061549935X/)  Anchorage, AK: Alaska Mountain Safety Center, 1984.


# The Working Prototype

I built a working prototype in React. I’ve saved it to my android phone homepage as a progressive web app and personally use it on a regular basis. I’m currently developing a user test for this working html prototype and an Adobe Xd prototype. 
**{prototype screenshot}**
You can test drive the prototype here:  
AvyMap Prototype


# Future Development

The prototype currently only works online, but service is spotty in the mountains. For this app to truly useful, it must have the ability to save maps for offline use. It is built in React with the intention of migrating over to a React Native app using Mapbox GL for React Native, which has offline maps functionality.
A full list of features might include:
* **Avalanche Danger Map** - Evaluate and display potential avalanche danger on an interactive map.

* **Link to Official Report**- Geo-mapped avalanche advisory zones with links to the official government reports worldwide.

* **Offline Maps & Reports** - save maps and official reports for use when cell service in the backcountry is spotty.

* **Inclinometer** - Using the phone’s accelerometer to more accurately measure slope angle. 

* **Notifications** - Push a warning notification when a user enters dangerous terrain. 

* **Trip Planning** - Draw a route on the map to follow.

* **Trip Recording** - Display a line of depicting where the user has been. 

* **Trip Report** - Analyze a post-trip report displaying travel distance, duration, elevation change, etc.

* **Snow Conditions Wizard** - A how-to guide for digging a snow pit, evaluating snow conditions, and creating a geo-temporal record of the results in the app.

* **Past Avalanche Data** - Show where avalanches have occurred in the past, and view individual avalanche observation reports.

* **Training** - Avalanche safety information and where to take classes and learn more.



# The Logo

Every good project needs a killer logo. This one is based on the  [North American Public Avalanche Danger Scale](https://avalanche.org/avalanche-encyclopedia/danger-scale/)  Icons. 
**{logo}**
**{danger icons}**
It's pixel aligned down to a 32px width, so it’s always super crisp at any multiple of 32px.
**{different sizes with labels}**
**{detail shots}**
Thanks for reading!


# WordPress Syntax Highlighter Plugin

A code syntax highlighter for wordpress 
 [https://bradford.digital/?p=633&preview=true](https://bradford.digital/?p=633&preview=true) 
**“A plug-in has never made me cry but this one has. It is the most amazing, lightweight, and functional plugin I have ever had the honor of using. It is a must use plugin for anyone serious about WordPress and frankly should be built in to WordPress.”**
  [– A very satisfied user](https://wordpress.org/support/topic/a-plug-in-has-never-made-me-cry/) 


# The Problem

I’ve been working with WordPress for years. The Visual Editor is nice, but I always reach the point where I need to edit code directly.  Unfortunately, **the WordPress Code Editor is… not good.** It’s just a monospace textarea that could contain hundreds of lines of code. It’s impossible to read that much code in just black and white. I need my code syntax highlighted, so I would paste my post content into my own code editor, edit it, and then paste it back into WordPress. I kept thinking how nice it would be if I could just edit code directly in the WordPress Post Editor section. I tried several plugins, but none of them did quite what I needed.
Then I found the  [HTML Editor Syntax Highlighter](https://wordpress.org/plugins/html-editor-syntax-highlighter/)  by  [Petr Mukhortov](https://www.mukhortov.com/) . It worked pretty much exactly how I wanted, with the exception of one glaring hole: WordPress shortcodes were not highlighted. 
## WordPress Shortcodes
WordPress has a component feature called shortcodes. A developer can write a reusable component in php/html and call it from  a “shortcode” in the post. They have a syntax almost exactly like xml or html, but with square brackets instead of angle brackets. They can also be mixed in with html markup. Some example code might look like this:
**{image of same code highlighted in v1.6}**
I, like most WordPress devs, heavily relied on shortcodes for a more DRY document. In fact, most of the code in my posts were shortcodes, not html. I needed the syntax highlighting to work on the shortcodes, too.


# The Solution

I decided to fix it myself. How hard could it be, right? Well, it was very hard. I forked the plugin’s  [Github repo](https://github.com/mukhortov/HESH-WordPress-Plugin) , and started programming a shortcode parser for  [CodeMirror.js](https://codemirror.net/doc/manual.html#modeapi) . For just the shortcode parsing, I copied the existing xml parser and replaced the _<angle-brackets_>/ with _[square-brackets_]/, but getting the parser to switch between html parsing and shortcode parsing proved to be quite difficult. I had to make another “wordpress post” parser that could switch between html, shortcodes, css style blocks, and script blocks. I did eventually make it work, and Petr merged my branch in and released version 1.7. Now my code looked much better: 
**{image same as above but with code highlighted, maybe try to copy css and paste in monospace spans with css?}**
But having worked with CodeMirror, I realized how much better my code editing experience could be if only I were to implement more of CodeMirror’s features. So I ran with it.


# Version 2.0

For version 2, I added a bunch of new features (listed below) and totally refactored the codebase. Big thanks to Petr for letting me hijack his plugin.
### Options Panel
I added an options panel. I liked how I didn’t have to go to a different page to change the settings. Everything is done right in the editor and I can see the changes immediately. The options panel itself has some snazzy transitions, and even tracks the page in certain scrolling contexts.
**{+ GIF: options panel opening and scrolling-- loop back to beginning}**
### Themes
The CodeMirror repo has several  themes, and I added all of them as options. Maybe too many, to be honest (Some of them are garbage.). I also wrote one that matches WordPress branding.
**{+ GIF: changing themes - WordPress, material, monokai, MDN, look back to WordPress}**
### Text Display
I added quick options to change the Indentation, Line Wrapping, Line Numbering, Line Height, and Font Size. 
**{+ GIF: change each option: Indentation, Line Wrapping, Line Numbering, Line Height, Font Size, looping back to start}**
### Search and Replace
Search and replace is an extremely helpful for larger files. If a user changes a css class name, they don’t have to go manually find and fix each instance. It even works with RegEx.  
**{+ GIF of search and replace}**
### // Ctrl+S Save Shortcut
 Save the file with Ctrl+S. This works in every IDE, why not in WordPress? It will select the draft or publish button depending on the state of the post. It even returns the carat to the same place so you can continue editing right where you left off.
** {+ GIF of editing and saving}**
### The Theme and Plugin Editor
The same code editor also runs in the theme and plugin editor, but with highlighting for the file type being edited. 
**{+ GIF: theme Plugin editor : load php, hello dolly, css  }**
When I first download v1.6 The Plugin had less than 10,000 active installs. Now, v2.3 has more than 40,000 active installs,  270,000 all-time downloads, and a 4.4 star rating. I still make regular updates and bug fixes and handle support requests. I love knowing that something I built helps so many people. 


# Gutenberg

And then the new WordPress 5.0 post editor,  [Gutenberg](https://wordpress.org/gutenberg/) , came along, and my users were requesting that the new editor be supported. After quite a bit of effort, I got syntax highlighting running in the code editor side of Gutenberg, but the implementation was not pretty. Gutenberg is written in React and the API allows for component extension. I know it could be done a better way.
**{+ gutenberg image: Works in gutenberg}**
It still doesn’t work in Classic Editor Block, the HTML Block, The Shortcode Block, or the “Edit as HTML” feature of every block or the and users  [complain about this](https://wordpress.org/support/topic/not-working-with-gutenberg-5/) , but I’m not sure I can fix it in any reasonable amount of time. I am working for free, after all.
**{+ places it doesn’t work}**
Gutenberg uses a new _html-comment-with-json_ syntax for its block editor. WordPress Core has depreciated shortcodes in favor of Gutenberg bocks. For a code editor plugin to be truly useful in Gutenberg, it would have to syntax highlight this new Gutenberg syntax.


# Moving Forward: Version 3.0

Like all living things, the plugin’s codebase evolved from something that was once very simple. But now It's basically just one giant javascript file. It needs to be rearchitected if it's going to move forward. And if I were to redo it, I would much prefer using more modern tools, like Webpack, Typescript, and Microsoft's Monaco Code Editor.
The  [Monaco Code Editor](https://microsoft.github.io/monaco-editor/)  is the power behind  [Visual Studio Code](https://code.visualstudio.com/) . It’s an open source, HTML based code-editor that has the full support of a Microsoft dev team behind it. It is significantly better than CodeMirror. It also has a declarative, json-based method of writing syntax highlighting parsers known as  [Monarch](https://microsoft.github.io/monaco-editor/monarch.html) . I used it to write a new parser for Gutenberg syntaxes.
**{+ new parser screenshot, or css?}**
Version 3 of the plugin will be a total rewrite using the Monaco code editor in place of CodeMirror. This time, I can architect the codebase more efficiently by utilizing Webpack and Typescript.
**The goal is to have syntax highlighting everywhere you edit code in WP admin.**
It’s going to be called WP Code: like VS Code, but WordPress. I produced a logo that fits into the Microsoft Visual Studio suite of logos:
**{+ wp code logo}**
**{+ other visual studio logos}**


# Transitions: WordPress Portfolio Theme

I built a wordpress theme to showcase my portfolio. It features a simple, content-first design with smooth page load and unload animations. Everything ‘transitions’ from one state/page to another. You can view the theme’s repo on  [github](https://github.com/arniebradfo/Transitions) . I plan to get the theme running well enough to be hosted on the WordPress.com theme repo.


# The Goal: A Single Page Web App Theme.

The original goal was to build the frontend in Angular and pull from the Wordpress REST API. This way I could the  [FLIP animation technique](https://aerotwist.com/blog/flip-your-animations/)  to smoothly **‘transition’** between any two pages like in this animation:
**{Transition Animations}**
I even built a functioning  [WordPress-Angular boilerplate theme](https://github.com/arniebradfo/ng-wp-theme) , but now I think it might be wiser to use React. WordPress’s Gutenberg Editor is written in React, and I don’t think it will be long before WordPress officially supports React-based themes as well.


# Travel Photography

Photographs from my 6-month travel sabbatical from July 2018 - January 2019.


# What better time than now?

My wife, Maddy, and I had always talked about traveling around the world. I think everybody does at some point. But we didn’t just want to talk about traveling our entire lives and wait until we were old and retired to actually do it. So, when Maddy finished her PhD, I quit my job, we put all our belongings in storage, and we took off for Japan.


# Japan

We spent two weeks in efficient, clean, well-designed Japan. We utilized the impressive train system to travel around Tokyo, Hiroshima, Miyazaki, Takachiho, Hemiji, Osaka, and Kyoto. We loved Japan and the food. I could eat raw tuna everyday for the rest of my life!


# Thailand

Bangkok was a harsh awakening after the clean efficiency of Japan. We traveled by train and bus to the rainforests of Khao Sok National Park and the beaches at Ao Nang. Our favorite was Khao Sok, where we spent a night in a floating pontoon cabin and saw monkeys and toucans. 


# Singapore

Singapore is some kind of futuristic utopian mega-city. The entire city is a perfectly manicured garden. The zoo was particularly impressive--you can just walk into some of the enclosures with the animals! 


# Malaysia

We spent a couple days in Kuala Lumpur as a stopover between Singapore and India. We really enjoyed it! 


# Ladakh

We flew into Delhi, met up with our college friend, and a few hours laters were on our way to the Himalayas. Ladakh is a region of Kashmir in northern India, and the capital city of Leh is at 11,000 feet! The mountain landscape was vast and profoundly beautiful. We hiked to mountaintop buddhist monasteries and listened to monks chant prayers. This was our favorite week of the entire trip. 


# India

After our time in Ladakh, we began a month-long trek across central and western India. India felt lawless and wild, with its confronting poverty, dirt-cheap prices, and colorful people. We saw the Ajanta and Ellora caves of college art history class lore. We also visited  Mumbai and the Rajasthani cities of Udaipur, Jodhpur, and Jaisalmer. 


# The United Arab Emirates

We were lucky to have two weeks of rest and relaxation in Abu Dhabi, where my wife’s parents currently live. We visited the beautiful grand mosque, lavish hotels, and the expansive, empty desert. 


# Greece

We spent three weeks island-hopping by ferry in Greece, starting, actually, in Bodrum, Turkey.  The Greek islands are some of the most beautiful places I’ve ever seen. We visited Kos, Santorini, Naxos, Paros, and Tinos. We ended in Athens for a week.


# Italy

The food in Italy is amazing. We ate pizza nearly every day of the two weeks we spent in Naples. From Naples, we took day trips to Pompeii, the Amalfi Coast, and Caserta before making our way to Rome. We had the good fortune to stay with a family friend in Rome and later traveled with them to Tuscany to help pick olives for the yearly harvest. We took the train to spend one night in Florence before making our way to Turin, where we took a day trip to go hiking in the Alps.


# Oman

Maddy’s family gathered in Abu Dhabi for an early Christmas, and we took a family trip to Oman. It was interesting to learn the history of a culture that developed in such a hot, harsh environment. This was our last stop before returning to the U.S. and real life.


# It’s Good to be Back

Taking sixth months off from life to travel the world was a transformative experience. However, I found myself craving the sense of purpose of having a job to do. I find my work as a UX designer fulfilling, and I’m glad to be back in a work-day routine. 


# Mobius UX Audit

 [https://bradford.digital/?p=637&preview=true](https://bradford.digital/?p=637&preview=true) 
As a UX Designer at Autonomous Solutions Inc, I collaborated with the UX Lead to design a feature set for Mobius Command and Control Software, Version 7. Mobius is a Windows application used to remotely control a fleet of autonomous vehicles. It features an RTS-like function for tasking vehicles on a map and Adobe Illustrator-like functions for editing maps and predefined vehicle paths. Mobius utilizes the same core functionality to operate in multiple industry applications including: Mining, Agriculture, Automotive, Security, Cleaning, and Materials Handling.
After two years, I was promoted to UX Lead and was put in charge of developing new ideas for Mobius. Mobius started out as a very simple piece of software, but as the AGILE process added more features one by one, the app became more cluttered and less coherent. When I was handed the reigns, some aspects the app were in disarray.


# Problems

I decided to perform a UX audit to take stock of the current state of the system and identify areas we could improve upon. I took feedback from 4 main groups: active daily users, new users, QA engineers, and our software developers. Some common problems emerged:
**1.** **Performance:** The #1 complaint was performance. The app could be quite slow at times, especially the map.

**2.** **Organization:** Toolbars and other features seemed out of place to frequent users. 

**3.** **Consistency:** UI that performed similar classes of functions could look completely different from feature to feature.

**4.** **Affordances and Feedback:** Many buttons were only icons without explanatory text. Buttons also had problems with their interaction states, where normal, hover, and pressed states looked too similar.

**5.** **Development Time:** A lack of reusable, out-of the box UI meant a lot of custom UI would have to be developed for each new feature. In addition to being time consuming, this is also very error prone.

**6.** **High UI Bug Rate:** A large amount of custom UI meant that there was a larger amount of code to test, and fixing a bug in one place wouldn’t fix similar bugs elsewhere.

**7.** **One-size Fits All Solution:** A core set of features can be shared between industry applications, which saves a tremendous amount of development time. This, however, means those core features have to adhere to a least-common denominator strategy, leading to a jack of all trades, master of none, application. Users in one industry, who didn’t know or care about other industries, were confused as to why the app wasn’t tailored to their specific use case. It’s a trade-off.



# Solutions

I proposed a two-part solution in the form of a Design System, the first part being to re-architect the app’s Information Architecture and consolidate the existing UI into a small library of UI components. The second part would be to re-architect the code that drives the UI to be more modular, reuseable, and performant.
## Part 1: Information Architecture
### Affordances & Feedback
In version 7, interaction would only change the foreground color of a button. This subtle change was often missed by users, leading them to believe that the button hadn’t been pressed when it had or vice versa. Users also couldn’t identify the boundary or size of most buttons, because they didn’t have an outline or background, leading to missed presses and interaction failures. 
**{img}**
To improve affirmative UI feedback, interaction now includes a change in background color. The boundary of the button is clearly visible, and the visual change is much more noticeable. This reduces interaction mistakes and gives users more confidence in their control.
### Organization: Toolbar & Button Placement.
The version 7 solution toolbar placed all feature buttons in a vertical bar on the left. This bar was often confused with the navigation menu and became overly crowded as more features were added. The function of each of the buttons was not obvious and often lead to the a duplicate button being placed somewhere else on the screen.
**{img}**
The fix was to remove the toolbar and reorganize the buttons it contained into smaller toolbars that were placed adjacent to the content they operate on. 
### High UI Bug Rate: Simple UI
The map contained a lot of floating UI. This began as simple, one-action buttons and ballooned into full panels of controls. These panels had to track the object they were linked to without obstructing it, and could not fall outside the bounds of the window where they become unusable. They frequently failed to follow these rules, and users hated them. They also slowed down the map performance due to the computational overhead of free-roaming boxes of UI all over the map. 
**{img}**
Docking this UI to the side of the map helps the UI to behave in a more predictable way. This simple solution improves performance, reduces development time, and produces a better UX. Some smaller commands can still be placed on the map, just not entire panels of UI.
### Consistency: A Standard Hierarchy
Almost all languages read from left-to-right and top-to-bottom. This means that most users will start at the top left of an interface and scan to the right and down as they would read text. The hierarchy of information in any interface layout should follow suit with more general information located in the top left and more specific information moving to the right and down. Most UIs follow this principle, and Mobius should, too.
**{img}**
### Development Time: Modular Feature Placement
One of the most frustrating aspects of UX design for Mobius was that there was no obvious place to put new features. All of the existing features had filled their own niche, and finding room for something new could be a challenge. New features would also include new, custom UI that led to a huge degree of inconsistency in the UI. This confuses users, who have to learn to navigate a new layout on every screen. 
**{img}**
My solution was to create uniform, repeatable, title-content layout panels that can be added or removed in a modular way. The eliminates the need for custom UI and improves the UX by forcing the app to follow a consistent, predictable layout. 
**{img}**
When all was said and done, I proposed a major reorganization of the UI. Preliminary prototype testing gave me confidence that this was the right direction.
### V 7.0 Current     V 8.0 Next
**{before and after images with header aligned}**
## Part 2: Structural Changes
### One-size Fits All
The goal of making structural changes to the design system was to streamline the process of making industry-specific versions of Mobius by modularizing aspects of the Client-Server architecture in a new way. These structural changes would pave the way for creating new custom Mobius Client applications that could speak to a single Mobius Server.   
A new code architecture could include a modular UI on a feature-by-feature basis. The UI could be totally different industry to industry or even task to task, if it needed to be, but could still share certain features that are common to all industries, like map creation.
### Performance
Performance was the biggest UX issue and also the one I had the least control over. The performance problems were not caused by the server-side business logic but were mostly due to poorly written or overly complex UI code. It is the engineer’s responsibility to write code that runs smoothly. However, the best way I could envision to make the app more performant was to rewrite the client in HTML, utilizing out-of-the-box tools like mapbox.js for the maps, and D3.js for graphing and gauges. I built a demo of an HTML client using mapbox.js to demonstrate the performance benefits.
There’s a lot more about the Architectural Changes and the rest of the design system solutions in the next post:


# Mobius Design System

 [https://bradford.digital/?p=639&preview=true](https://bradford.digital/?p=639&preview=true) 
This Mobius Design System was created to standardize the UI and general interaction principles for Mobius Software. This document acts as a guidebook for design decisions going forward, so these decisions need not be made over and over again. The document was made in Adobe Xd, so it can also serve as a copy-paste UI design library for UI components. It deals with everything from simple button styles to more complex mapping and vehicle tasking principles. 


# Mobius Icon System

 [https://bradford.digital/?p=660&preview=true](https://bradford.digital/?p=660&preview=true) 
The Mobius Icon System is a set of guidelines that ensures iconography in the Mobius App will remain consistent in style, format, and usage. Main characteristics include a clean, geometric form, pixel alignment, and a 20x20px size with a 2px stroke weight. The icon library contains more than 400 icons. This content is also featured in the Components section of the Mobius Design System.


# Icon Guidelines

**{images...}**


# Autonomous Cleaning App

 [https://bradford.digital/?p=656&preview=true](https://bradford.digital/?p=656&preview=true) 


# Use Case

This app was designed to enable one user to monitor and manage several autonomous cleaning vehicles simultaneously. The app displays the status and progress of any vehicle and notifies the user in case intervention is necessary. A reporting feature displays data on vehicle utilization and runtime so users can fine tune their operations to be as efficient as possible.


# Responsive Design

The app was designed to alternate between a mobile single-column width as well as a tablet(or larger) two-column width.


# Mobile Width: Single-Column



# Tablet Width: Two-Column



# Mockups



# Mobius Mapbuilder Software

 [https://bradford.digital/?p=](https://bradford.digital/?p=)   &preview=true
Mobius Mapbuilder software is used to create and edit maps containing geo-referenced boundary shapes. Properties of these shapes dictate where and how autonomous vehicles may operate in a given map.


# Mobius Pathbuilder Software

 [https://bradford.digital/?p=643&preview=true](https://bradford.digital/?p=643&preview=true) 
Excerpt:Draw a path to create a drivable route that can be customized to match testing needs and course routes. Scriptable actions to execute at a specific point in a path. Vehicles can be tasked to run routes as many times as needed. No need to switch drivers out due to hazardous road conditions, fatigue, and driver breaks.


# 01: Draw a Path

Create a drivable path that can be customized to match testing needs and course routes.


# 02: Scriptable Action Planning

Execute actions at a specific point in a path. Functions include: acceleration, deceleration, stop, wait, lane change, variable force braking, roll over, and more.


# 03: Vehicle Testing

Vehicles can be tasked to run routes as many times as needed. No need to switch drivers out due to hazardous road conditions, fatigue, and driver breaks.


# Vehicle Kit

Each unmanned test vehicle is equipped with a series of hardware and software components that permit a user to toggle between manual and robotic control. Once installed, a remote operator has control over the critical vehicle functions of ignition, transmission, steering, braking, and acceleration. The kit consists of a set sensors (GPS, radar, lidar, cameras, radio) and actuators (throttle, brake, steering, transmission) that are all controlled by an onboard computer called the Vehicle Control Unit (VCU).


# Mobius Command Software

Mobius command and control software allows users to task and supervise a fleet of autonomous vehicles in several industries including: Automotive Durability Testing, Agriculture, Mining, Security, Materials Handling, and more. A user selects a vehicle, selects a task, and then monitors progress. This software can replace a crew of workers with a single operator working remotely.


# Command for Orchard / Vineyard

The following video features a set of two sprayer tractors operating on a vineyard in tandem.


# Command For Agriculture

The following video features an autonomous farm concept utilizing the Mobius Command software and an cabless, driverless tractor.


# Command for Mining

The following video features Mobius features in use at an autonomous mining facility.


# // Robotic Teleoperation

 [https://bradford.digital/?p=645&preview=true](https://bradford.digital/?p=645&preview=true) 
for Mining NO XBOX CONTROLLER


# // Diagnostics?

No… 


# // Gauges

 [https://bradford.digital/?p=647&preview=true](https://bradford.digital/?p=647&preview=true) 
No good screenshots


# Reporting Software

 [https://bradford.digital/?p=649&preview=true](https://bradford.digital/?p=649&preview=true) 


# Haulage Reports

This reporting software displays data regarding past performance of autonomous haulage trucks. The Haulage Progress report displays how much total material was moved from the load zone to any dump zone based on a previously set goal. The Cycle Time report shows the duration of trip times to and from load and dump zones.


# Geo Data Heatmap Visualization

The heatmap report shows any autonomous vehicle data charted onto a map. It is used to identify issues with vehicle path driving and communication failures.


# // Robotic Actuator Calibration Wizard

 [https://bradford.digital/?p=651&preview=true](https://bradford.digital/?p=651&preview=true) 
Can’t take a good screencast


# // Materials Handling App

 [https://bradford.digital/?p=658&preview=true](https://bradford.digital/?p=658&preview=true) 


# ASI Branding & Marketing

 [https://bradford.digital/?p=662&preview=true](https://bradford.digital/?p=662&preview=true) 
Excerpt:Various promotional marketing materials including: brochures, business cards, a custom folder, trade show booth design, document template design, and infographics.


# Print media



# Trade Shows



# ASI Website Navigation

 [https://bradford.digital/?p=1072&preview=true](https://bradford.digital/?p=1072&preview=true) 
I designed and developed a more interactive and engaging navigation menu and site header system for the Autonomous Solutions corporate website. It featured a contact form built into the menu of every page instead of routing to a dedicated page. 


# Contact Form

I also wrote a highly interactive contact form with validation.


# Logos

 [https://bradford.digital/?p=666&preview=true](https://bradford.digital/?p=666&preview=true)  hail satan
The Process
Lots of example logos in SVG form
Animated logos


# Badger Bags Logo

 [https://bradford.digital/?p=668&preview=true](https://bradford.digital/?p=668&preview=true) 
Logo design for a disc golf backpack company. 


# Routes of Pesticide Exposure in Solitary, Cavity-Nesting Bees

Freelance scientific diagrams for a publication by USDA scientists.  The diagrams depict the four main routes of pesticide exposure in solitary, cavity nesting bees. The paper is free to read at the link below.


# Willoughby & Crane

 [https://bradford.digital/?p=478&preview=true](https://bradford.digital/?p=478&preview=true) 


# Sketches

The client requested a logo of an origami crane for a consulting firm. I folded a paper model and did some sketches paired with type.


# Digital Roughs

The client liked the direction so I made some digital roughs of all 3 compositions.


# Final Logo

We decided on a simple, elegant design paired with Caslon text. The old-style, small caps typeface communicates authority and trustworthiness. 


# Fox Outfitters

 [https://bradford.digital/?p=315&preview=true](https://bradford.digital/?p=315&preview=true) 
Excerpt:I created initial branding for a new line of camping products, FOX Outfitters. The project included creating a new logo, several package designs, and an ecommerce website mockup.


# Logo Design

I created initial branding for a new line of camping products to be known as FOX Outfitters. I started with three different logo concepts, and moved forward with what we thought was the best.


# Package Design Concept 1

I presented 3 packaging and branding concepts for a line of air mattresses and a set of steel camping cups.


# Package Design Concept 2



# Package Design Concept 3

The client decided to move forward with concept 3.


# Hammock Tags

We applied the same branding to FOX's next product: nylon hammocks.


# Website Mockups



# Pavillo

 [https://bradford.digital/?p=370&preview=true](https://bradford.digital/?p=370&preview=true) 
Excerpt:Print and promotional material for Pavillo, Bestway’s line of camping gear. The brand took thematic inspiration from single-color, army surplus style labeling. The project included making packaging tag designs, product prints, iconography, and a B2B brochure. 


# Nancy's Bistro & Bakery

 [https://bradford.digital/?p=355&preview=true](https://bradford.digital/?p=355&preview=true) 
Excerpt:Branding and dual-language menu design for a bistro and bakery in Shanghai, China, catering to expats.


# Solo Stove

 [https://bradford.digital/?p=472&preview=true](https://bradford.digital/?p=472&preview=true) 
Excerpt:Graphic design for a popular wood-burning camping stove. Designs include: product diagrams, infographics, packaging designs, ecommerce media, icons, and sub-brand logo design.


# Airflow Diagram

An interactive version is now featured on the solo stove website:  [HOW SOLO STOVE WORKS](https://www.solostove.com/#home-how-it-works) 


# Icons



# Product logotypes



# Product Diagrams



# Web Banners



# Lumitronics

 [https://bradford.digital/?p=344&preview=true](https://bradford.digital/?p=344&preview=true) 
Excerpt:Logo and package design for ecommerce-based vehicle and trailer light company.


# Perfect Cloud

 [https://bradford.digital/?p=460&preview=true](https://bradford.digital/?p=460&preview=true) 
Excerpt:Infographics, packaging materials, and ecommerce media for a memory foam mattress company.


# e-Flame

 [https://bradford.digital/?p=313&preview=true](https://bradford.digital/?p=313&preview=true) 
Excerpt:Ecommerce media for an electric heater product line including: icons, size diagrams, and web ads.


# Bestway Packaging Rebrand

 [https://bradford.digital/?p=187&preview=true](https://bradford.digital/?p=187&preview=true) 
DON’T EDIT


# Summer Branding Proposal

A comprehensive rebranding of Bestway’s summer collection package design.
Specially adapted to current retail market competition.


# Logo Development

## Summer Branding
For a positive first impression with the a potential customer, Bestway needs a logo that screams summer fun.
Strong complementary colors call attention to the logo. Individually, the orange and blue represent sunshine and water respectively.
The sun imagery also utilizes radial symmetry to draw the viewer’s attention to the brand name in the center.
A thick, friendly typeface and white outline allow the logo to be readable on any background and at any size.


# Color Treatment

## A Full Spectrum of Eye Catching Gradient Color Schemes
Each individual package will be styled in one of 5 colorways, allowing for versatility and variety in packaging options. Each color was chosen to match the logo, every other color, and the grass or water that will appear in the product photo. In this way, each package will look great when viewed on its own or as a set. Diagonal lines add an interesting texture to the scheme. 


# Design Spec

## Easy Photo Placement
Framed image design make photo placement easy on a large scale. This saves time and reduces the chance of mistakes.
## Content Area
Both the color gradient and white wave leads the views attention toward our logo. The colorful content area gives enough space for any additional product information.
## Avenir NEXT - Heavy
A thick typeface contrasts very clearly from its background. It’s readable from a distance, friendly, and matches our logo.


# Application

## Size Variation
Versatile layout scales to any size or dimension to perfectly fit every box and package type.
## Color Variation
Package colors can be used to match product color variations.


# Market Competition

## SwimWays
Bright red box is eye catching, but color does not relate to water or summer. Layout is quite disorganized, and the title text is difficult to read.
## Intex
White box accented with stripes of pastel colors do an excellent job of conveying a summer feeling. Both layout and typography are very clean and organized. The logo feels very serious and corporate.
## Banzai
Strong complementary color scheme is eye catching but too boy oriented. Shapes of color are random, amorphous blobs. Text crossing between the frame and the photo are hard to read.


# Retail Display

## Beating the Competition
The first time most customers will ever see a Bestway product will be on the shelves of a retailer. In this environment, design is key to drawing a customer to one brand instead of another. 
Besway packages appear to have a rainbow of different options. Our competitor’s packaging is all the same.
Different colors on each package work together to draw attention to the display as a whole. 
Colors have a brighter, happier, more summery feeling to them than our competition.


# Box Layouts



# Insert Layouts



# Stand Up Paddleboards

 [https://bradford.digital/?p=217&preview=true](https://bradford.digital/?p=217&preview=true) 
Excerpt:Product development for Bestway’s new line of inflatable standup paddleboards. Designs include: board graphics and colorways, iconography, package design, and a photoshoot.


# Bestway Promotional Materials

 [https://bradford.digital/?p=211&preview=true](https://bradford.digital/?p=211&preview=true) 
Excerpt:Some trade show freebie materials for bestway’s corporate booth.


# SlumberMaax

 [https://bradford.digital/?p=470&preview=true](https://bradford.digital/?p=470&preview=true) 
Excerpt:Ecommerce web-banners and some web design work for Shanghai based mattress retailer.


# Illustration

 [https://bradford.digital/?p=502&preview=true](https://bradford.digital/?p=502&preview=true) 
Advanced Illustration at University of Georgia, January-May 2013. In this course, I developed a style using only pencil and eraser. I scanned my images and layered colors behind them using Photoshop. I focused mostly on portraits, but my favorite illustration is of a rooster.


# Caffeine Machine

 [https://bradford.digital/?p=250&preview=true](https://bradford.digital/?p=250&preview=true) 


# UGA Senior Thesis Branding Project

This was the final project in my Graphic Design program at the University of Georgia. The Caffeine Machine is a hypothetical food truck that serves coffee and bagels in the greater Atlanta area. The Caffeine Machine process book shows project development from start to finish, and you can view the pdf at the link below. 


# Collectible Insulating Sleeves & Cup Design

Other than coffee and bagels, these cups would be the main product of the Caffeine Machine truck. There is a 12oz cup and a 16oz cup. The insulating sleeve around each cup contains half an image that complements a matching sleeve to make a graphic. A sub-theme of my branding project was “reusing is recycling,” and the matching sleeves are a way to give value to something that would otherwise be trash. Each cup would be sold with one random sleeve encouraging customers to come back to buy more coffee and find the matching sleeve. There are 16 matching sleeves that combine for a total of 8 images. The images all interpret the Caffeine Machine “what fuels you” tag line in a visual way, depicting various machines fueled by coffee cups.


# Concept Graphics for the Caffeine Machine



# What Fuels You?

The name “Caffeine Machine” has a double meaning: first, the truck as caffeine serving machine, and second, the customer as a machine that requires caffeine as fuel. Following this concept, the phrase “what fuels you?” became the tagline to my Caffeine Machine brand. This ad is a visual reflection of the meaning represented within the name. The O is an anatomical heart made of the gears and pipes and being powered by a cup of coffee in the center. 


# A Poster That Folds Into Its Own Mailing Envelope

This set of posters was designed to be mailed to locations where the Caffeine Machine is catering events. The posters promote the brand with an eye-catching graphic and a QR code that links to the website with more information. The posters have spaces to write in the event information such as date and time as well as the mailing address. They can then be folded into a mailing package and sent to the event promoters to hang at their venue. 


# Coffee Bean Packaging

These packages were designed to sell whole bean or ground coffee for home brewing. I liked the visual aesthetic of a curved score fold and designed the structure of this package myself. The package has flat front, so it will appear uniform when multiple are aligned on a shelf, but a rounded back, so it will have an interesting shape when standing alone. The box has a clear, sealed cellophane bag on the inside to keep the coffee fresh and allow a view the coffee through a window in the front left corner of the box. The conical design allows the boxes to be nested within one another for shipping from the box manufacturer to the roaster. The package includes brewing instructions, information about the blend of coffee, and a QR code link to the caffeine machine website.


# Packaging a Half Dozen Bagels with Cream Cheese

This package was designed to hold and transport six bagels and an 8oz package of cream cheese. The bagels fit into slots on the inside, and the cream cheese tub fits in its own slot at the end, held down by a flap. The box is made of two separate pieces: the outside structure of the box with the graphics and a divider insert  that splits up the individual bagels. Both pieces fold flat for shipping and can be assembled in the food truck just before being sold to the consumer. The package has nutrition facts and on the back and QR code links to the Caffeine Machine website. The logo on the front has the coffee bean die cut out for a more dimensional aesthetic appeal. Please Recycle.


# A Mobile Optimized Website for a Mobile Vendor

The Caffeine Machine food truck needed a website that can be easily accessed on a mobile device so the customer can find the vendor. **This was the very first website I ever made, so it’s not quite up to modern standards**, but I’ll let you take a look at it anyway. The background features a tiled pattern of the machine aesthetic that became a motif in my branding theme. The pattern is a png 24 of outlines filled with transparency to allow a browser calculated gradient to show through them. The sides of the steam are also png 24s that tile vertically to allow the page to be as tall as it needs to. Since I only used two colors for these, the color indexing of the pngs allowed the file to be very small and load quickly through a slower mobile connection. The mobile site contains a full menu, a link to find the Caffeine Machine, and polling page where users can vote for the next month’s specialty coffee.


# Earth Week

 [https://bradford.digital/?p=297&preview=true](https://bradford.digital/?p=297&preview=true) 
Excerpt:Promotional materials for University of Georgia’s Earth Week events including: a logo, posters, flyers, and social media materials.


# UGA Cycling Team Uniforms

 [https://bradford.digital/?p=475&preview=true](https://bradford.digital/?p=475&preview=true) 
Uniform design for the University of Georgia cycling team featuring the University colors and a hexagonal theme inspired by the molecular structure of adrenaline, representing not only the thrill of the race, but also the team’s academic background. 
So my roommate is on the University of Georgia club cycling team and he asked me to design graphics for their 2013 cycling uniform. He showed me examples of suits the team liked and we talked it over to come up with a concept that represents the team’s personality. We started with the molecular model of adrenaline as the central image and its structured shape inspired me to give the jerseys a hexagon theme. The adrenaline is, of course, for the thrill and rush of racing, but also has a second meaning. As molecular model, the image is meant to represent the team’s academic background and achievement as students. The members are not only athletes, but chemists, geologists, businessmen, and writers as well. To begin, we decided to stick to the traditional UGA color scheme of red, black and white, but to use the red sparingly as an accent color. Since the official UGA logo is copyrighted (also overused and a little plain), I designed my own hexagonal georgia G to fit within the carbon-hydrogen ring in the center of the molecule. Coloring the G red makes it stand out against the mostly black and white composition, emphasizing the identity of the university the riders represent. I added a subtle pattern of light gray hexagons in the white areas’ background as a texture that compliments the visual rhythm in our molecule’s geometric structure. One of the example jerseys the team wanted me to follow had an asymmetrical color split down the center. I used the edge of the molecule as a line of division splitting the black side from the white side on the back and reversed the split on the front panels for a checker-like effect. The jersey manufacturer, Champion-Systems, mandated that their logo appear very large on every panel, or they wouldn’t print. This kinda sucked, but their logo actually looks pretty cool and I tied it into the design nicely. Lastly, I added the logos of the team’s local sponsors to all the panels and we sent them off to be printed. I had also designed a cycling hat and a set of socks, but they never got printed because the team didn’t have enough orders to fit the bulk minimum. I like the way the jerseys turned out, and it is very satisfying to see cyclists riding around town in something I made.


# Spirit Animal Vector Art

 [https://bradford.digital/?p=290&preview=true](https://bradford.digital/?p=290&preview=true) 
Excerpt:A 2013 calendar featuring an eagle and a bison, symbolizing summer and winter, respectively, in northwest Native American culture. The graphic style was inspired by Native American art.
The original concept for this poster was to take the four animals native north-western Americans interpreted as the personification of each season and use them as imagery in a 2013 calendar. I was going to try to mix the line heavy designs in the art of Native American totem poles (specifically the Haida, Tlingit, or Kwakiutl) and mix it with my own style to make a more realistic depiction of each animal. Totem pole animals were traditionally associated with the lunar cycles instead of the solar cycle but I didn’t have time to make 12 animals. The four animals were the golden eagle for summer, the coyote for autumn, the white bison for winter, and the grizzly bear for spring. After making sketches of the four animals, I began to vectorize the drawings in Illustrator. After realizing how much time it took me to make one animal, I decided to only make two that correspond to summer and winter.


# Poster Composition

I made several compositions that were designed to be rotated 180° based on the time of year. Winter was one half with a white buffalo and Summer with a golden eagle was the other. Each half also represented day or night to have a nice compositional contrast of value. Winter and summer were night and day respectively. The golden eagle ended up losing its gold for dark feathers blending the night sky into the eagle’s shape, and the white bison blended into the daytime side for a yin-yang type effect. After deliberating concepts with my professor, she pretty much mandated that I don’t have a rotating calendar and that I lay the Animals on top of each other in the same orientation. They were designed to stand alone so their forms gestalt together to form some kind of two-headed bird bison when placed on top of each other. I discussed this issue with my professor but she was pretty set on it and she’s the one who decides my grades so I went with her idea for the final product.


# The Bright Side and The Dark Side

This project started out with too broad a scope. It shrunk from 12 animal totem pole to 4 animal seasons to 2 animal day and night all while progressively losing the original seasonal personification concept. I was somewhat disappointed in the final product but on the bright side, it was a good learning experience. I have heard the same saying from several more experienced designers not to get too attached to any specific part of a design. It might turn out that a better, more concise composition doesn’t use something you may have spent a lot of time on. Your goal is to make the best work and your judgement might be skewed if you want to include something just because you worked hard on it. I personally liked a composition that included only the heads of the animals, but after Roberts saw the bodies I had made for the animals, she wouldn’t let me not show them. I thought the details in the face looked a looked significantly better when the were big than they did small with a body. So I don’t know if Roberts was too attached to the form of the animal bodies or if I was too attached to the faces that I spent more time on. In hindsight, I realize I could have avoided the whole problem by designing the face and the bodies to work cohesively from the beginning instead of making a face design and tacking on a body later. I liked the other compositions more and ended up giving the test prints to my family for Christmas presents. It still always feels good to get the patronizing parental “I love it so much I’ll put it up on the fridge where everyone can see it” response of unconditional love.


# Blue Heron Brewery

 [https://bradford.digital/?p=248&preview=true](https://bradford.digital/?p=248&preview=true) 
### Excerpt:
A branding study that focusing on logo development and application.


# Drawing Studies and Logo Development

This project turned out to be the best example of my design process. The assignment was to create a logo and branding scheme for a fictional company and apply it to products and annual report cover. The schedule of this project required photo realistic graphite renderings of objects or animals to be made and then steadily abstracted into a graphic logo. I started with drawings of exotic birds like the Emperor Penguin, Mandarin Duck, Great Blue Heron, and Cattle Egret. Then I took the Egret and Herons and simplified them from grey scale graphite to black & white ink drawings. After doing several drawing studies of tall birds I felt I had good enough sense of the shape and rendering of these animals to create an abstracted version as the logo. I drew the heron logo large scale in thick, clean black lines optimized to be scanned and live traced into vectors using Adobe Illustrator. I then added some reeds and ripples for a wetlands feel. With the form of the logo finished, I created both a color and black & white version for versatility in print application.


# Branding and Application

With the logo done, I had to decide on a name. In a real job this would be backwards. The logo is usually designed around the brand name, but this was a learning experience. Leaving the logo open to being anything means I can produce the best logo for my student portfolio without being constrained to a specific subject. I designed the logo to look more representational and realistic when viewed as a whole but also to be more abstracted and graphic if cropped around the head. I made two compositions exhibiting both uses for the annual report cover design and decided on a brand name. “Blue Heron Brewery” had a nice ring to it and I made a logotype using Rockwell to put on the annual report. Designating that my brewery’s location is Savannah, GA, adds to the wetlands theme and association with the habitat of the Great Blue Heron. The color palate consists of dark indigo blues, representing water and our heron, complemented by brighter yellowish-greens, representing wetland foliage and hops. A dark brown was also used as a background to work with the color of the beer bottle and to represent the color of beer. I designed several versions of the logo for use with packaging, coasters,a bottle cap,a bottle, and a glass. I did a photo shoot of a Samuel Smith stout bottle, which has a very interesting shape, and Photoshopped on my Art Nouveau style label to look like it had been screen printed.


# Craft Brewing Labels

My roommate’s older brother introduced me to craft beer and half the reason I continue to subscribe to that scene is the amazing graphics on the bottles. Some of the larger bottles from companies like Rogue, Stone, and Southern Tier have really well made screen print labels. They utilize the bottle color as part of the design and aren’t constrained to the outline of a die cut sticker. I usually decide on what beer to buy solely based on the label and I keep my favorites on top of my kitchen cabinets to show them off as art. They’re great.


# Athens Skateboards

 [https://bradford.digital/?p=462&preview=true](https://bradford.digital/?p=462&preview=true) 
### Excerpt:
Deck designs for the Skate Shop of Athens (Georgia). Designing skateboard graphics was my childhood dream come true.
The Skate Shop of Athens asked me to make the skateboard graphics for their shop decks. I didn’t know how to use Illustrator too well at the time but this project helped me learn a lot. The owner wanted an Athens road sign with rusty bullet holes through it and a camo background. I gave him by best interpretation of that wish. The reason I used Impact as the font was for brand recognition. The previous shop board graphics had ATHENS written in big, Impact lettering. I wanted the new boards to resemble the old so I kept the typeface. I made some color options with orange at the owner’s request but we both agree that the green and yellow looked better. The idea of having camouflage on a skateboard is a comical idea. You can only go skateboarding on the smoothly paved surfaces that exist in developed areas. A skateboard would be useless anywhere camo would help you blend into and camo would be useless anywhere you could ride a skateboard. I like this contradiction though. It’s like a metaphor for Athens: a crazy little town surrounded by the woods of rural Georgia.


# Faces Within Faces

This is a concept illustration for a Skate Shop of Athens shop deck skateboard graphics. It was never actually printed onto a skateboard. I just made it for fun. If it was to be put into print, I would have to cut the design down to only using two colors for spot color printing. My roommate studied Mezo-American history and thought that the faces resembled mayan or olmec art.


# UNUSED!

## DO NOT EDIT PAST THIS POINT



# My Portfolio Booklet

This is a book I made for a sample of my design portfolio to give to prospective employers. It contains my best work from January 2011 through May 2012. I made the book before I finished school and my portfolio has better things in it now so this book is kinda incomplete. I guess it can stand on its own as a layout design but I need to make a longer updated version. The front of the book has patterns that create a vibrating optical illusion to draw in a reader.


# Join The Students For Environmental Action

I am designing and producing the flyers and print media for SEA now as a way to do my part in the club. These mini posters were optimized to look good on a on a 8.5 x 11 paper run through a Xerox copier to keep printing costs cheap. “ACTION” is the most eye catching part of the flyer to pull people in from far away to at least read the meeting dates. There is also tear off slips at the bottom with all the club information and the email address to make it easier interested persons to keep the dates straight. I also made another handout version designed to be cut into four pieces and given out at UGA’s club fair. My girlfriend came up with the tagline “Improving campus and the world through pragmatic environmental initiatives.” I came up with a placeholder line as a joke that said “Have the recent extremes in weather got you worried that something might be terribly wrong? Join the Club!” I think my girlfriend’s copy was much better. Although riding the climate change fears recently intensified by Superstorm Sandy may have gotten a lot more people to come, they might have been the wrong kind of people. The pragmatic line is much more friendly and inviting. I’m much better at constructing visual meaning than verbal.
I assume a lot of people think that the Students For Environmental Action would just be a whole bunch of environmentalist hippies, but we actually do make a difference here on campus. In some of the older classrooms on campus, lights are just left on all night wasting energy. Recently the club got several thousand dollars to organize the installation of motion sensor lights in some of these areas. Maybe the University finally realized they are just giving a considerable money to the power company for no reason, but we’d like to think that they are upgrading the light fixtures to decrease their carbon footprint. At least we got them to do something.


# The Graphic Design Club T-shirt Contest

Every semester, the UGA Graphic Design Club has a contest between its members to design the club’s shirts. When I was working on my portfolio book the president of the GD club told me I should slap the same graphic on a shirt for the contest. So I did. The semester my design got the honor of being voted first place, the club president never got around to sending the file off to the printer even though she asked me to make it in the first place. Oh well. I can still make a Photoshop rendering to put it on my website.


# Nintendo History Layout Design

I love Nintendo! I used to play video games almost constantly as kid and I loved every minute of it. This design is a layout for a magazine article detailing the evolution of a company I grew up with. The cover has a NES (Nintendo Entertainment System) controller with rising sun style red rays each containing an incarnation of Nintendo’s flagship character, Mario. The wire from the controller on the cover spread flows around the edge and on to the next page and each page after that where it is used as a timeline to order and date the progression & lineage of Nintendo products. On the last page, the wire ends as a plug and connection port, with the words “go forth and play” (you really should). The folios in the page corners are contained in button graphics styled after the NES controller so the reader feels like they are holding a video game controller as they read. The bottom right of every page also has three of Nintendo’s most popular characters: Mario, Link, and Donkey Kong. Each page has an different incarnation of all three so the corner of the magazine becomes a mini flip book tracing character evolution.


# My Personal Identity Logotype

We spent about 4 months in our advanced type class turning our names into well designed logotypes. The unbelievably subtle details of creating type isn’t exactly my strong suit, but I feel like I did pretty well for myself thanks to the help of our Professor, Ron Arnholm. He broke down the process for us and gave us honest (very honest) critiques every step of the way. I must have made 200 rough sketches of different ways to write “James Bradford.” Arnholm looked at our sketches every day and pushed us to develop the better ones until we finally got to one that worked. My final logotype design used slightly modified glyphs from the Univers Ultra Condensed Light font. The letter forms are reversed out of the shadow so the viewer actually reads implied shape that the shadow surrounds as type. After finishing the logotype, we made books of minimalist spreads that illustrate the versatility of our new creation. I cropped my name on the cover to say “rad.” That blue line is the spine. My book includes experiments in development, color, pattern, scale, and application, as well as my 2012 resume, and a mock cover letter to a potential employer. For some arbitrary reason, I decided the page dimensions should be based on extrapolations from the golden ratio as is illustrated on the scale page.


# It’s All In The Details

I decided to make may last name into a logotype because it has a nice visual symmetry. The two syllables, “brad” & “ford”, each follow the same pattern of two short, x-height letters sandwiched between two tall, ascender letters. In addition, the first letter and last letter, “b” & “d,” are mirror images. The form of each shadow defines the right edge of the letter that casts it as well as the left edge of the following letter. Each letter relies on the preceding letter’s shadow for half its shape. My favorite part about this is how the ear of the “r”s define the curves of the “a” & “d” they precede to fit together like puzzle pieces. Since I had to raise the “r”s to make them fit, I decided to stagger the baseline letter to letter so the “r”s wouldn’t stand out. This also creates a nice rhythm keeping the individual letters from blending together into a static block gestalt. Since the width of the shadow’s verticals define the type’s letter spacing, the weight of the letter forms compared to the weight of their shadows posed a challenging, yet very subtle, problem. I wanted to create a unity through proportionality of weight between the letterforms and their shadow counterparts. Making the shadow’s vertical weight the same as the fonts vertical weight may seem like an obvious solution, but the equality of width confuses distinction between what is a letter and what is a shadow. This problem makes the logotype very hard to read, but choosing a random width also looks sloppy. I ended up making the vertical stroke weight of the shadow equal to the horizontal stroke weight of the Univers font. This solution avoids the confusion of equal spacing while still preserving unity by being proportional to a different aspect of the font. These minute little details are so important when it comes to designing type, but they drive me crazy.


# Exhibit Stand for a Bill Barrett Gallery Show

This assignment was to design a 3 dimensional stand for a mock gallery featuring the sculptor of our choice. The stand’s function was to give gallery visitors information about the artist and their work display flat images of their sculptures cut and bent to giving an illusion of depth. We made mockups out of cut paper at 1/12th scale where one inch would be equal to one foot. I made several models of various different artists work, and, of course, my professor ends up loving the one I like the least. So that’s the one I had to make. My exhibit stand featured Bill Barrett’s “Tooth Fairy,” large metal tower inspired by New York Skyscrapers. I added some Helvetica, made photoshop rendering, and stuck the model in an architectural setting that complemented its form.


# Following Noodle Production From Grain To The Table

This 30 second video follows the production of Noodles through growing, harvesting, processing, and cooking; from field to table. I made all the graphics in Illustrator first and imported them into Flash. Making this video was the first time I had ever used Flash. I didn’t really know how the program worked and making the video started to feel like making a stop motion. After I worked for several hours, I would stop to look back at how much video I had made and was always amazed by the ratio of work to product. 6 hours effort equals 4 seconds of video? WHAT!? I got faster the more I used the program, but I still spent an extremely long time making this video. I’d say I’m more proud of myself for the amount of work I put into this assignment that the final product. I got it done and set it to reggae dub music, mon.


# The Tree That Owns Itself

There is a tree in Athens, GA, that apparently legally owns itself. In the 1820s there was a wealthy guy who liked an oak tree so much that he left a condition in his will granting the tree ownership of itself and all land within 8 feet of itself on all sides. The original tree died but a child tree grown from an acorn of the original now occupies the same space. If you really want to know more about the tree you should go to its webpage and read about it. My webpage about the Tree That Owns Itself features my own illustration of the tree with the inscription granting its tree-rights, an animated link menu, all the history of the tree, a slide show of old photos of the tree, and a map with directions. I thought the vertical format and indefinite height that is characteristic of a standard web page fits a tall tree pretty well. In the street next to the tree, there really isn’t a spot to stand far away enough to see the whole thing at once. Being forced to stand close and look up to see the tree towering overhead makes the size of the oak seem more grand and majestic. I designed the top half of the webpage to give the visitor the feeling of standing next to the tree as if they were there. The visitor reads the inscription written in the sky and scrolls over the tree downwards to the base to see the title and links menu. This project was the first time I have ever used HTML or CSS to hand code web content. My webpage was part of a web design class project where each student made their own webpage about some special little slice of Athens, GA. At the end, we combined all the pages into a website called Classic City Classics (.com) named after Athens’ title as the “Classic City.” It is a pretty nice town.


# But not really…

The Tree That Owns Itself doesn’t actually own itself. Trees can’t legally own things. The city officials just ignore the situation’s illegality because the town likes it and there’s no real cause for change. Still, it's a nice testament to the individualism of American culture that a tree can own the property it grows from; a model of the natural right for life to exist simply for the sake of itself. It also sits right in the middle of a street. It turns a two way road into a one lane bottleneck no one can see around due to the huge tree obscuring the view. There are no traffic or caution signs for warning and the whole setup seems kinda dangerous. The Tree That Owns Itself is kinda cool, but is a head on auto collision waiting to happen.


# A Hanging 3-Dimensional Fractal Design

The project was to create a geometric mobil design to be hung as a chandelier in a department store or some other fancy commercial setting. I made a series of mini mobiles made from cut paper and eventually decided on a crystalline shaped triangular fractal. I made the large scale versions of the design and photographed them. I photoshopped the mobiles into a tall space with architecture that complements their shape. I also pen tool traced the photos in Illustrator to make a more precisely geometric version. The Design wasn’t really supposed to have a conceptual purpose from the start, so I guess it achieved its purpose of not having a purpose. It think it looks cool at least.
The construction starts with an equilateral triangle as the center with three isosceles triangles extending out from its edges. The isosceles triangles each share their short side with the center triangle. Each isosceles triangle is then cut down the middle and half of each side then is folded up over the center to become the top or folded down to comprise the bottom. Each of the six legs are then folded in a way so that each crease creates a new section that is a smaller copy of the section that was folded to create it. These folds can be continued to create smaller and smaller iterations of the same shape until the sections are so tiny that the thickness of the paper prevents the pattern from continuing. If we were doing Euclidean geometry, where the paper represents a plane with no thickness, this fractal folding pattern could continue forever. I decided to let the design stop after folding each leg 5 times and joining the tips of each set of legs at a point that it can hang from. Continuing the pattern past 5 folds becomes unmanageable. Explaining this design verbally is most likely too confusing to be understood, but I tried anyways. It needs visuals to do it justice but its not worth making a diagram.


# The Speaker Flower

A speaker as the center of a blooming flower is an image I drew a lot as a child, so when a photoshop assignment came around I decided to try to make it look real. I took photos of a lily flower and a speaker cone and photoshopped them together into a pretty solid image. The assignment was to make an ad, so I slapped on some stupid typography and emailed a jpg to my professor so he could take a look. Then I got all the files pertaining to this project deleted accidentally and all I had to show was the low resolution jpg with bad typography that I sent in the email. It was a sad day. I didn’t put any effort into the typography because I was planning on making it better when I had more time. Now, I always invest enough time to at least make a decent composition. The bad type here ruins what might have been a pretty nice image. I won’t make that mistake twice. Failure is a learning experience.


# After Image Optical Illusions Voodoo

I made this animated gif to play off the after image that stays in your vision after staring at something for a long time. The after image adds the color to a grayscale image if the viewer follows the directions not to take their eyes off a black dot. The assignment was to make a design that contained very clear concise directions that a passerby would want to follow. Yup.


# Describing Someone In A Single Tweet

This project was to create a typography that described a fellow graphic design classmate in the length of a tweet (140 characters). Got the amazingly wonderful Amelia Wilson so her tweet read, “She may be small but those little arms can make a beating from a purse full of cheerios hurt worse than getting run over by her Prius.” I went out with her on her birthday one year. She got belligerent and kept hitting me with her purse while laughing hysterically. I guess she had a good time. She also eats a ziplock bag of Cheerios every day and drives a Prius. I liked the simplicity of the first couple of posters that had an A & W abstracted out of geometric shapes, but my classmates rightly pointed out that these had a corporate feel that didn’t capture Amelia’s personality. I switched gears, went with a slab serif, and made the colors more bright and pastel.


# An Exploration Into The Social And Cultural Contexts Of The Word “BACK”

To start this assignment, everyone in the class drew a single word out of a hat. I pulled the word “BACK.” The goal was to create a 14 page book and its cover where each spread was about a different use of the word we drew at random. This was a word exploration project designed to broaden the contexts in which we think about communication. The book had several limitations that were made in consideration of a hypothetical large scale print production of this book. We could only use two pantone colors and black to set a limit on spot color ink costs. We were also limited to only using only two font families to keep typeface license fees to a minimum. These restrictions taught me how to work within limitations to design in a way that is conscious of the production of the final product.
I used the Rockwell font family, and a decorative font called Amor Piercing 2.0 BB to create block quotes of stacking typography. For my color choice, I used the brown Pantone 477 as my main color accented by the lime green Pantone 390. I made spreads about Humpback Whales, Backgammon, Backpacking, Back to the Future, the human back, and the top 10 songs from iTunes with the word “back” in the title. The Cover contains every word I could find in the English language that contains the word back. You can download a pdf version of the book here.


# Judging a Book By Its Cover

Redesigning the cover of a book I’ve never read would have been a shot in the dark if it weren’t for the internet. I was assigned a novel described as a “Chinese Gone With the Wind.” Spring Moon by Bette Bao Lord is a book about a young girl growing up in China during the transition between the traditional feudal system to communist control. The book jacket was limited to only two pantone colors and their mixes in consideration of a hypothetical mass production through spot color printing. My final design used a jade green to represent the old china and a crimson red that represents the new wave of communism. The two colors are on separate sides of the cover divided by a penzai tree representing China caught in the middle of a split between conflicting ideals about government and power. The mood of the Cover is dark and ominous to capture the serious nature of story’s subject. I made hand drawn type for the title as well.


# Dorrence

I made six redesigns of a yellow pages ad using the Rockwell typeface and vector graphics. The ad was for Dorrence Publishing Company Inc. They want to publish your book! I tried to help them communicate that idea better. Featuring a left handed Ernest Hemingway.


# Album Cover Design - A Better Thing Than To Arrive

This was the first exercise for my Beginning Layout class. The assignment was to have the Internet generate a random Wikipedia article, a random quote, and a random flickr photo and use those to make a fictional album cover design. The Wikipedia article “the 30th infantry division” was the band name, The quote “a better thing than to arrive” was the Album name and the low angle photo of an lady in a colorful dress was the only image I could use. The assignment was to make 10 designs in one night. It was an exercise in producing variety of digital sketches a quickly as possible.


# Baskerville Typographic Business Cards

25 business cards designed using typography and with limited color options in consideration of printing. 8 black and white, 8 grayscale, 4 one color, 2 two color, and 3 non digital(not included). I used the Baskerville font family.


# Robert Slimbach’s Macintosh Font

This is a 12 page type specimen book showing all the various features, weights, styles, and uses of the Adobe Myriad font family. It has a Macintosh theme because it happens to be the typeface Apple uses in their branding. All the graphics were restricted to be only typography and just one pantone, black, and their mixes could be used for color.


# Design Labels

Designing labels to put on the back of our projects was a project in itself. Only grayscale typography was allowed.


# Jan Tischold

This assignment was to lay out multiple compositions of a famous quote by typographer Jan Tschichold. Using only one weight, size, letter spacing, and line spacing, in Garamond.
From the Form of the Book: Essays on the Morality of Good Design
“Immaculate typography is certainly the most brittle of all the arts. To create a whole from many petrified, disconnected and given parts, to make this whole appear alive and of a piece – only sculpture in stone approaches the unyielding stiffness of perfect typography. For most people, even impeccable typography does not hold the any particular aesthetic appeal. In its inaccessibility, it resembles great music. Under the best of circumstances, it is gratefully accepted. To remain nameless and without specific appreciation – yet to have been of service to a valuable work and to the small number of visually sensitive readers – this, as a rule, is the compensation for the long, and indeed never ending, indenture of the typographer.” -Jan Tschichold




# Robert Bringhurst Quotes about Typography

Typography layouts of a famous quote about typography by Robert Bringhurst. Uses the Univers font family.
“Typography exists to honor content. Like oratory, music, dance, calligraphy – like anything that lends its grace to language – typography is and art that can be deliberately misused. It is a craft by which the meanings of a text ( or its absence of meaning ) can be clarified, honored and shared, or knowingly disguised.” -Robert Bringhurst


# A Gouache Painting Gauntlet

To get into the graphic design program, students at UGA had to make it through a rigorous gouache painting gauntlet that really had no relation to modern graphic design at all. We made small, detailed gouache paintings in the style of De Stijl, Art Nouveau, Plakatstil, New Typography, and Art Deco.
The Graphics Survey Class
Taking the initial graphic design survey class at UGA is like making an application to get into the Graphic Design program. It used to be very competitive with only half the class being accepted, but I’m not sure if its like that anymore. We made several extremely precise gouache paintings in the style of popular graphic design movements. I don’t think the class was a very good test of whether or not you would make a good graphic designer. Modern design is done on computers so you don’t have to be that good at traditional art to be a great designer. I was very practiced at painting, so I did very well in this class. However, learning design required a completely different skill set than what I had acquired in all my other art classes. I was used to being one of the best students in all my previous art classes, but when I started the graphic design program I was upset to find that I was one of the worst students. I expected the program to be like the intro class where I was better than everyone else just because I had a steady hand. It took me while to catch on, but I’m glad It humbled me so much. I never realized how much of a brat I used to be.


# Yarn around every corner!

It’s a 45 second short film about a kid being followed by a mysterious ball of yarn. It has no meaning. Just watch it.
Filmed edited and directed by: James Bradford Starring: William Willoughby IV Featuring: “The Funk” (Mysterious Ball of Yarn”) Stunts by: Zach Parker Music: “Clock Jitters” by: Nate Denver’s Neck
Filmed on the University of Georgia campus around Creswell Hall and the Hull St. parking deck.


# Design Proposal

For the caffeine machine senior exit show.
My UGA senior exit project is a branding design concept for a coffee and bagel street vendor or vendor team. Appealing to the morning workday rush hours, vendors would be on the streets of Atlanta, GA, for breakfast up until lunch every day. These vendors would also cater to gatherings like concerts, art exhibitions, sporting events, and parties. Vendors will have a smart-phone accessible web site that enables an instant customer connection so the customer always knows a vendor’s location. Through website feedback, the vendors can also learn what will best appeal to their customers.
My idea originated when I was buying a hotdog from my favorite street vendor, LaFonda Dogs, in Athens, GA, where I go to college. I thought to myself, “These hot dogs are really good, but he’s always in a different location. If people always knew where he was, he would get a lot more business”. A mobile vendor has the advantage of moving to a more popular spot for better business. However, not having a permanent location can be a disadvantage in customer loyalty if the customer doesn’t know where the vendor is. Coffee is my drink of choice, so when it came to deciding on a product for my mobile vendor concept to promote, a coffee and bagels food truck came to mind. The customer base would be anyone on the streets of Atlanta from breakfast to lunch: students, workers, tourists, and people I would stereotype as liking good coffee: indie kids, hipsters, hippies, and artsy folk.
Keeping regular & potential customers connected & informed of the vendor’s location, as well as having frequent customer feedback is a high priority. The solution to a street vendor’s customer loyalty problem is to have the medium of the internet bridge the gap between customer and vendor. A simple web site that can be accessed via smartphone will allow instant, mobile connection between the vendor and the customer. Not only would this site be used to give the location of the vendor at any point, but also to notify the customer of a daily deal or special offer that might attract more business. The possibility for customer feedback that the internet enables can also solve the universal problem of determining what the customer wants. An online vote on what specialty menu items they prefer will provide customer choice, and the act of voting may invest the customer in going to purchase the item they voted for. My hypothetical coffee brand will have a smartphone optimized website that will contain a Google maps widget to publicize current & future locations, a twitter feed to notify customers of daily deals or special events, a full menu with prices, and a simple voting procedure for designating a specialty coffee or menu item to be offered during the next month. My brand will also include a concept design for the food truck graphics, advertisements, posters, merchandise, and packaging. All of these design concepts will emphasize the use of high quality and environmentally sustainable products.

