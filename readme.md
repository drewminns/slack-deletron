# Slack Deletron

[![Heroku](https://heroku-badge.herokuapp.com/?app=slackdeletron)]()
[![CircleCI](https://circleci.com/gh/drewminns/slack-deletron.svg?style=shield&circle-token=4240e49ac690ba0d539e4b78dc8476ddda8e157c)](https://circleci.com/gh/drewminns/slack-deletron)

This is V4 of the [Slack Deletron](https://www.slackdeletron.com/) app. This is a passion project that I've maintained over the last few years in different iterations to serve two purposes:

1. Teach myself new tools, languages, skills and apply them.
2. Help the community.

This project is in no way affiliated with [Slack](https://slack.com), but I have seen them directing people to the app in the past.

## Getting Started

To get going, you're going to need a few things:

- [Node >=8.14](https://nodejs.org/en/download/)
- An [ngrok](https://ngrok.com/) account
- A [Slack API App](https://api.slack.com/apps) for testing


## Running the app locally

Start NGROK locally with `./ngrok start slackdeletron`. This requires a configuration file that has a domain set to the NGROK private domain.

Now run `npm run dev` and you're ready to roll.

### Setting up NGROK

In `~/.ngrok2`, make a file called `ngrok.yml` and put the following.

```yml
authtoken: #### NGROK AUTH TOKEN ####
remote_management: null
tunnels:
  slackdeletron:
    proto: http
    addr: 8080
    subdomain: slackdeletron
```

Loads more to come...
