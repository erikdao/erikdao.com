---
title: 'How to setup iTerm2 for development in 2024'
date: '2024-06-05'
tags: ['dev', 'iterm']
featured: true
summary: "If you're visiting this page, chances are that you're looking to make your iTerm2 even better, more beautiful and fun to work with. Let's dive in!"
socialImage: '/images/dev/20240605_iterm2_fb_img.png'
---

[iTerm2](https://iterm2.com/) is the best terminal app for MacOS (You can't argue with me on this topic). If you're visiting this page, chances are that you're looking to make your iTerm2 even better, more beautiful and fun to work with. In this post, I'll walk you through how I supercharge my iTerm2. Let's dive in!

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/dev/20240605_iterm2_complete.png">
</figure>

## `oh-my-zsh`

[Oh My Zsh](https://ohmyz.sh/#install) is a delightful, open source, community-driven framework for managing your Zsh configuration. To install Oh My Zsh, run this command in your iTerm2
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```


And you can already see, it instantly looks much better

## `powerlevel10k`

[powerlevel10k](https://github.com/romkatv/powerlevel10k) is an Oh My Zsh theme that is fast, flexible and brings great out-of-the-box experience.

To install this theme for oh-my-zsh, you first need to clone the repository

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Then set `ZSH_THEME="powerlevel10k/powerlevel10k"` in `~/.zshrc`.

And run `source ~/.zshrc` to activate new configurations. This will start the Powerlevel10k configuration wizard. It will walk you through different settings for the theme, including installing the recommended file, setting up prompt format, etc. Feel free to choose what you like at this step.

After the setup is completed, your terminal probably would look like this.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/dev/20240605_powerlevel10k_setup.png">
</figure>

Neat, right!!! However, the text colors are still a bit pale (to my taste), and the command (e.g., `brew`) is not highlighted. Let's improve it.

## `zsh-syntax-highlighting`

[`zsh-syntax-highlighting`](https://github.com/zsh-users/zsh-syntax-highlighting) is a plugin that provides syntax highlighting for zsh. It highlights the commands as you type them into the terminal.

Install the package via Homebrew with
```bash
$ brew install zsh-syntax-highlighting
```

Then enable the plugin by sourcing the script
```bash
echo "source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

## `zsh-autosuggestions`

[`zsh-autosuggestions`](https://github.com/zsh-users/zsh-autosuggestions) suggests commands as you type based on history and completions.

To install this plugin for your oh-my-zsh, first clone its repository to zsh plugins directory

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):
```bash
plugins=(
    # other plugins...
    zsh-autosuggestions
)
```

Run `source ~/.zshrc` to activate the new configurations.

The try to type something and see how it boostraps your productivity 😄.

## Material Design Scheme

As I said above, the text colors of our iTerm2 still look a bit pale to my taste. To fix this, I'm going to use the [Material Design](https://github.com/MartinSeeler/iterm2-material-design) color scheme for my iTerm. I think it's a pretty beautiful scheme.

You can follow the instructions [here](https://github.com/MartinSeeler/iterm2-material-design?tab=readme-ov-file#how-to-use-it) to use this scheme for your iTerm2.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/dev/20240605_iterm2_md_colors.png">
  <figcaption class="text-sm font-sans text-gray-600 mt-4">The text colors look much more exciting!</figcaption>
</figure>

## One more thing!

The last thing I want to include in this guide is [`fzf`](https://github.com/junegunn/fzf) -- a fuzzy-search plugin that brings much better experience when you search for files, command history in your terminal.

First, install fzf using Homebrew
```bash
$ brew install fzf
```

Then set it up for zsh using
```bash
source <(fzf --zsh)
```

Then you can try to search for command history and see how it gets much better with `fzf`. Type `Control + R`, then try some command.

<figure class="figure mx-auto w-full p-2 flex flex-col items-center">
  <img src="/images/dev/20240605_iterm2_fzf.png">
</figure>


That's it! We have gone from a default iTerm2 to a more beautiful, joyful and convenient iTerm2.
