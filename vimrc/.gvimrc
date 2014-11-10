"gui option, 
set go=e

"font use gui menu set ,then see the guifont value, and copy to here
set guifont=Consolas:h11:cANSI

"Full Screen on win, see http://www.vim.org/scripts/script.php?script_id=2596
map <F11> <Esc>:call libcallnr("gvimfullscreen.dll", "ToggleFullScreen", 0)<CR>

"auto maximize for gvim
autocmd GUIEnter * simalt ~x
