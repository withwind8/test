"""""""""""""""""""""""""""""""""""""""Vundle Config"""""""""""""""""""""""""""
"""See Quick Start in https://github.com/gmarik/Vundle.vim
"""There are difference between win and linux
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/vimfiles/bundle/Vundle.vim
let path='~/vimfiles/bundle'
call vundle#begin(path)
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
"Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
"Plugin 'L9'
" Git plugin not hosted on GitHub
"Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
"Plugin 'file:///home/gmarik/path/to/plugin'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
"Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Avoid a name conflict with L9
"Plugin 'user/L9', {'name': 'newL9'}

"Plugin 'taglist.vim'
Plugin 'majutsushi/tagbar'

Plugin 'scrooloose/nerdtree'
Plugin 'scrooloose/nerdcommenter'
Plugin 'Lokaltog/vim-powerline'

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line


""""""""""""""""""""""""""""""""""""Li Qing Vim Config"""""""""""""""""""""""""""""""""


"Set mapleader
let mapleader = ";"

"Fast reloading of the .vimrc
"map <silent> <leader>ss :source ~/.vimrc<cr>
"Fast editing of .vimrc
map <silent> <leader>rc :e ~/.vimrc<cr>
"When .vimrc is edited, reload it
autocmd! bufwritepost .vimrc source ~/.vimrc

"common operations
map  <leader>w :w<cr>
map  <leader>q :q<cr>
map  <leader>n :set nu!<cr>
"map  <leader>t :tabnew<cr>

set backspace=indent,eol,start

set nobackup

set hlsearch
set incsearch
set ignorecase smartcase



set number
set ruler

set cursorline

color darkburn
syntax on

set tabstop=4
set softtabstop=4
set expandtab
set shiftwidth=4

"encoding config
set encoding=utf-8
set langmenu=zh_CN.UTF-8
language message zh_CN.UTF-8

"reload menu with UTF-8 encoding
source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim


"set fileencodings=utf8,gbk,gb2312,gb18030
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1

""""""""""""""""""""""""Plugin Config"""""""""""
"nerdtree
nmap <silent> <leader>f :NERDTreeToggle<cr> 

"taglist
"map <silent> <leader>tl :Tlist<cr>
"let Tlist_Show_One_File = 1
"let Tlist_Exit_OnlyWindow = 1
"let Tlist_Use_Right_Window = 1

"tagbar
nmap <silent> <leader>t :TagbarToggle<CR>

"powerline
set laststatus=2

