```markdown
<!-- meta: Gitfather: the story behind it -->
```

# What if I could make my GitHub graph green without trying?

One day I wondered: could I keep my GitHub contribution graph green automatically? At first I treated it like a neat trick — “cool, I can make this” — but I soon realized there’s more to it. The graph is ideally a reflection of productivity, not just a vanity metric. Still, my journey started with the question: how would I actually build something to do this?

## How should I do it?

I decided to use Python — it’s perfect for automation tasks. The basic idea was simple: pick a timeline, choose random moments within that timeline, and push commits at those times. Randomized timings make the activity look natural. I wrote a script that checks the clock, picks random minutes in the allowed range, and creates commits when the time arrives. It actually worked.

## How the system really works

At a high level: a script uses the time and random libraries to schedule small commits throughout the day. Initially it was a single script that handled scheduling and committing. Later I added a CLI so I could tweak variables locally, and a Telegram bot so I could trigger commits.

## What was the problem?

The code was a mess. Everything was scattered — files everywhere, no clear structure. It became risky to change anything because one wrong edit could break the whole thing.

### I tricked myself

If you can’t reliably make meaningful progress every day, you can keep this script running — but be honest with yourself about why you’re doing it. Is it to maintain a streak for motivation, or just to keep the chart green for appearances? The graph is most useful when it represents real work; otherwise it’s just noise.

## Things I learned

Despite its flaws, this project taught me a lot:

* Organize files and separate concerns — keep code modular.
* Build reusable components: a scheduler, a committer, a config layer.
* How to integrate with Telegram bots for remote control.
* How to design a simple CLI for configuration and manual triggers.

### Mistakes (first time lessons)

I made rookie mistakes — for example, I hard-coded Telegram credentials into the code. That was dumb (and you should never do that). Forgive the amateur hour; it was my first time doing this.

A few days later I tested the bot and got an unexpected message from a stranger who had triggered the bot. It was both cool and a bit creepy — someone had found my project and used it. My theory is they searched for keywords like “telegram” or “bot” in public repos and discovered my instance. Smart move on their part, and a humbling reminder to secure credentials and limit exposure.

### How i fix the problem?
the key for using variables is basicly creat somthing that you would not send to github repo as .env or yaml file or just python file that you most be carefull to do not send it to the github repo.


# System Architecture
GitFather is organized around three core components: a Quote Repository that stores inspirational quotes, the GitFather System that handles Git operations, and a Telegram Bot that provides a remote interface for interaction.

## High-Level System Components
![core components](/content/projects/gitfather/pictures/1.png)
### Quote Repository
The Quote Repository is the central data store for the GitFather system. It uses a simple Markdown file (quotes.md) to maintain a collection of inspirational quotes, each with an author attribution and timestamp.
### GitFather System
The GitFather System is the core automation component that handles Git operations. It provides mechanisms for:

* Adding new quotes to the repository
* Retrieving quotes from the repository
* Committing changes to Git
* Pushing changes to remote repositories
The system is configurable through a YAML configuration file.

### Telegram Bot Interface
The Telegram Bot provides a remote interface for interacting with the GitFather system. It allows authorized users to:

* Retrieve quotes using the /quote command
* Commit quotes to the repository using the /commitq command

The bot includes authentication to ensure only authorized users can interact with it.

## Data and Control Flow
![Data Flow](/content/projects/gitfather/pictures/2.png)

### Operational Workflows
#### Quote Retrieval Flow
When a user requests a quote through the Telegram bot:

* The user sends the /quote command to the bot
* The bot authenticates the user using the restricted decorator
* If authorized, the bot calls get_zen_quotes() to retrieve a random quote
* The quote is formatted and sent back to the user

#### Quote Commit Flow
When a user wants to commit a quote through the Telegram bot:

1. The user sends the /commitq command to the bot
2. The bot authenticates the user using the restricted decorator
3. If authorized, the bot displays a series of progress messages
4. The bot calls commit_quote(get_repo()) to:
    *  Get a random quote
    * Format the quote
    * Add it to the quotes.md file
    * Commit the changes to Git
5. The committed quote and timestamp are sent back to the user

# System Integration
The GitFather system integrates several technologies and components:

1. Python for core functionality
2. Git for version control and commit automation
3. Telegram API for bot interface
4. Markdown for quote storage
5. YAML for configuration

This modular design allows for flexibility and customization based on user needs.

## Conclusion

This was my first real project and it taught me far more than any small tutorial exercise. The world of building a real automation tool — even a small one — is quite different from the toy projects you follow in tutorials. I learned about modular design, security, UX for a CLI and bot, and the trade-offs between convenience and honesty when it comes to contribution graphs.


---

