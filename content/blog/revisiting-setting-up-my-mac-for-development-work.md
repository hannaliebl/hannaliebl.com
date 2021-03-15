+++
date = 2021-03-07T06:20:56-05:00
draft = false
title = "Revisiting Setting Up My Mac for Development Work"
blogcategories = ["Guide"]
blogtags = ["My Setup", "Dev Tools", "Resources"]
featured = ["true"]
featured_img="/img/macbook-dev-revisited.jpg"
summary = "Revisiting how I set up a new Mac for development work."
+++

I started a new job recently, and thought it was worth revisiting [my older post](/blog/setting-up-my-mac-for-development-work) on how I set up my Mac for development work. I wrote that post back in 2015, but I do some things differently now.

The TLDR of this, if you prefer, are my [dotfiles](https://github.com/hannaliebl/dotfiles).

## Mac Settings

First, I tweak some Mac-specific settings to suit my preferences.

I show and hide the dock automatically (System Preferences - Dock - Check "Automatically hide and show the Dock"). I also remove cruft from the dock at this time.

I set up tap to click on the trackpad as well (System Preferences - Trackpad - Check "Tap to click").

I also like to show file extensions on Finder (Finder - Preferences - Advanced - Check "Show all filename extensions") and show hidden files in Finder. To do that, open Terminal, and type `defaults write com.apple.finder AppleShowAllFiles YES`.

I make a `code/` folder at my user root. I am still experimenting with the best way to store/organize notes, but for now I make a `notes/` directory in my code folder that I use to store notes on courses I take or things I learn that are related to development. In general, I've been trying to get better about writing notes down as I learn things to help me remember them better.

## Install Software

I go ahead and install some software at this point. I download Chrome and Firefox as additional web browsers, VS Code as my code editor of choice, [Typora](https://typora.io/) as my preferred markdown editor (I try to keep and save notes in markdown), and Zoom, Slack, and Discord for general communication/being a part of various communities.

I'll have more VS Code-specific settings later, but at this point I like to install the command line tool for VS Code, so that I can open a given file with it from the command line (Open VS Code - shift-command-p to open Command Palette - type 'shell command' - select "Shell Command: Install 'code' command in PATH"). This now allows me, after relaunching or reloading my terminal, to open a file directly in VS Code by typing `code filename`.

I used [Spectacle](https://github.com/eczarny/spectacle) for years to easily resize/move windows around, but since it stopped being actively developed, I've been trying out [Rectangle](https://github.com/rxhanson/Rectangle) to do the same job, so I also install Rectangle and set it up with the default settings.

Now I turn my focus more specifically to my dev environment. I install the Xcode command line tools by typing `xcode-select --install` in my terminal. Then I download [iTerm2](https://iterm2.com/), which is my preferred terminal program. I download [Homebrew](https://brew.sh/) as my package manager (a lot of the steps above could be done via Homebrew, actually, but maybe that's an optimization for another day!).

## Terminal and Shell Configuration

I don't do a ton of configuration to iTerm2 itself other than setting the working directory to be my `code/` folder (Preferences - Profile - General - Working Directory), and then choosing some pretty colors! To find color themes, I clone this [Github repo](https://github.com/mbadolato/iTerm2-Color-Schemes) and then follow the installation instructions to load themes. Then I can select them from Preferences - Profile - Color tab - Color presents menu. Currently I'm a fan of the Andromeda color scheme, but you can check them all out [here](https://iterm2colorschemes.com/).

### Shell Customization

I also install [Oh My Zsh](https://ohmyz.sh/) to manage my Zsh configuration. I start with the [Powerlevel10k
](https://github.com/romkatv/powerlevel10k) theme and run through the installation steps to customize everything (including the transient prompt, which I love.) Be sure to run `source ~/.zshrc` after to load it into the current shell.

The best thing about Oh My Zsh are the plugins. There are so many to choose from, and they make life so much easier and the command line so much more pleasant and powerful to use.

Oh My Zsh comes with some plugins automatically, they just have to be added to the `plugins` array in your `.zshrc` file. I use the Git plugin, which aliases a bunch of Git commands to [shortcuts](<(https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)>). I also enable the [copyfile plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/copyfile), which adds a shortcut to copy the contents of a file to your clipboard, and the [jsontools plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/jsontools), which allows you to format and verify json from the command line.

I also install two other plugins. An [autosuggestion plugin](https://github.com/zsh-users/zsh-autosuggestions) and the [history substring search plugin](https://github.com/zsh-users/zsh-history-substring-search). Both of these are extremely useful and make life a lot better, in my opinion. The history search in particular is very useful for remembering specific, long commands that you maybe typed a while back, and because it searches for substrings, all you need to remember is part of what you typed in order to find it.

Both of the above plugins are installed via brew: `brew install zsh-autosuggestions` and `brew install zsh-history-substring-search` and then you need to add `source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh` and `source /usr/local/share/zsh-history-substring-search/zsh-history-substring-search.zsh` to the `.zshrc` file.

In order to bind the search to my up and down arrow keys, I also add this to my `.zshrc`:

```bash
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
```

### Other Aliases

I don't have a ton of other aliases or shortcuts, but I do set the ability to open my `.zshrc` config in VS Code with a simple command: `alias zshconfig="code ~/.zshrc"` and I alias Mac OS's built-in Python web server: `alias simpleserve="python -m SimpleHTTPServer"` because it's my go-to for quickly serving a static file on localhost.

### tldr

Finally, one of my favorite tools recently is [tldr](https://tldr.sh/), basically, simplified, community-driven man pages - get it via `brew install tldr`. I use this constantly to look up commands I don't know. I like that it gives clear, concise descriptions and example commands. For an example of the output it gives:

```termcap
$ tldr cat

cat

Print and concatenate files.

- Print the contents of a file to the standard output:
    cat file

- Concatenate several files into the target file:
    cat file1 file2 > target_file

- Append several files into the target file:
    cat file1 file2 >> target_file

- Number all output lines:
    cat -n file

- Display non-printable and whitespace characters (with `M-` prefix if non-ASCII):
    cat -v -t -e file
```

## Install More Languages and Developer Tools

Once my terminal and shell are customized, I go ahead and install a bunch of other developer-specific tools and languages that I will need. I do primarily JavaScript development and am trying to do more Go development, so what I install here reflects those interests.

### Git

First, I install Git: `brew install git` and configure my global Git email, username, and editor (VS Code): `git config --global user.email "email@mail.com"`, `git config --global user.name "hannaliebl"`, and `it config --global core.editor code`. I also go ahead and [set up an SSH key to use with Github](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) at this point.

### JavaScript

I set up my JavaScript environment next. `brew install node` and `brew install nodenv` (to manage node versions.) Then add `eval "$(nodenv init -)"` to `.zshrc`. I also install yarn globally now, too, with `npm i --g yarn`.

### Go

Then I set up my Go environment. I install Go via `brew install go`, and set my `GOPATH` in `.zshrc`: `export GOPATH=$HOME/code/go` and then add `GOPATH` to my path: `export PATH=$(go env GOPATH)/bin:$PATH`.

## Customize VS Code

I'm getting close, but my last step is customizing my editor of choice, VS Code.

### Theme/Icons/Font

I switch between [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) and [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) themes. I use the [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons) set.

I use the [Fira Code](https://github.com/tonsky/FiraCode) font because I like its ligature support - instructions are [here](https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions) for adding it to VS Code.

### Packages

I have some language-specific packages: [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), and [Go](https://code.visualstudio.com/docs/languages/go).

I also install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and a [Formatting Toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle) extension to toggle whether or not Prettier should be used or not on a per-file basis (sometimes I do work on projects that don't use Prettier.)

I also use [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode) for code-completion and [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) to see Git commits/history inline.

Another neat package I really enjoy is [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets) which is super helpful for nested code in brackets and parentheses.

### Settings

It's probably best just to [link to them](https://github.com/hannaliebl/dotfiles/blob/master/vscode/settings.json)!
