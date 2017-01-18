You-Riff

# LINKS #

Link to deployed front end: https://github.com/ioncrash/you-riff
Link to back end repo: https://github.com/ioncrash/you-riff-back-end

# DESCRIPTION #

You-Riff is a place where YouTube becomes more social and more informative. One of our favorite experiences is watching a film with a group of friends, sharing thoughts or cracking jokes at what's going on on the screen. You-Riff lets you do that virtually, without having to say "go to 4:31!" Just sign-up, add a video to our system, and get riffing!

# TECH #

* Youtube API
* ember-youtube npm package
* Ember framework
* Twitter Bootstrap
* Javascript
* Grunt
* Sass

# APPROACH #

I wanted to make an app that did one thing well: let users make comments which are attached to a specific moment on a video, to simplify the process of discussing video content. I started by figuring out how to get youtube working on my site, and spent some time just playing with options (what looked best, what gave me the best access to internal attributes, what was easiest to work with).

After settling on a player and a direction for the project, I started to work on how to structure my backend data, so that I would have to do the least amount of processing in order to make it render correctly on the frontend. I settled on a riffs table, connecting users to videos in our system.

I think the biggest conceptual challenge was figuring out how to hold videos in the system. I certainly didn't want to host the videos themselves (as that is both data-heavy and probably a copyright violation), so I settled on just hanging onto the youtube ids. This has the advantage of letting me hold on to a large number of videos, and makes it fairly easy for the system to avoid duplicating content. However, it makes it difficult to identify youtube urls that are broken. This is a challenge for the future.

After this, I worked on building the chat-box and holding onto the riffs themselves. Most of this was familiar as it's just text, but moving the data through Ember was occasionally a challenge.

In the end, I think the site is pretty slick, and I'm proud of what I've done!

# CHALLENGES #

* Working with Ember -- getting access to data, making sure that everything is named and called correctly. Ember is VERY opinionated, and we had some communication issues at first.
* Figuing out how to model video information on the backend -- how to avoid duplicate videos, how to make sure users and videos could see each other

# UNSOLVED PROBLEMS #

Would like to give users the option of muting one another -- this would require a new table, 'muteds', which would have a user reference (who is the person doing the muting) and a mutee reference ( who is being muted ).

I'd also like to give users a way to see who is riffing on what video from the /videos route, and what videos users have riffed on from a /users/:id route

# INSTALLATION #

``npm install``

# USER STORIES #

I am a film buff, and I want to point out interesting frames as a video is playing so that people can understand what I'm talking about without having to FF and RW through a video.

I am a heavy social media user, and I want to share videos I've commented on with my friends by copy-pasting a url into a text.

I am a parent, and I want to flag offensive riffs so that a moderator can review and possibly remove them

# WIREFRAMES #

http://imgur.com/a/vXlZp

# ERD #

http://imgur.com/a/3NjHm
