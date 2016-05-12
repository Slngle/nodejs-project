#!/bin/sh
 
cd ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/
 
echo Install...
echo ==================================================
 
# Install Package Control
# import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print 'Please restart Sublime Text to finish installation'
 
echo === Theme - Soda ===
rm -rf "Theme - Soda"
git clone https://github.com/buymeasoda/soda-theme.git "Theme - Soda"
 
echo === RailsCasts Colour Scheme ===
rm -rf "RailsCasts Colour Scheme"
git clone https://github.com/talltroym/sublime-theme-railscasts.git "RailsCasts Colour Scheme"
 
echo === GBK Encoding Support ===
rm -rf "GBK Encoding Support"
git clone https://github.com/akira-cn/sublime-gbk.git "GBK Encoding Support"
 
echo === SideBarEnhancements ===
rm -rf "SideBarEnhancements"
git clone https://github.com/titoBouzout/SideBarEnhancements.git "SideBarEnhancements"
 
echo === Gist ===
rm -rf "Gist"
git clone https://github.com/condemil/Gist.git "Gist"
 
echo === SublimeAStyleFormatter ===
rm -rf "SublimeAStyleFormatter"
git clone https://github.com/timonwong/SublimeAStyleFormatter.git "SublimeAStyleFormatter"
 
echo === MarkdownBuild/SublimeBullet ===
rm -rf "MarkdownBuild"
git clone https://github.com/erinata/SublimeBullet.git "MarkdownBuild"
 
echo === Markdown Preview ===
rm -rf "Markdown Preview"
git clone https://github.com/revolunet/sublimetext-markdown-preview "Markdown Preview"
 
echo === Git ===
rm -rf "Git"
git clone https://github.com/kemayo/sublime-text-2-git.git "Git"
 
echo === SideBarGit ===
rm -rf "SideBarGit"
git clone https://github.com/SublimeText/SideBarGit.git "SideBarGit"
 
echo === Sublime-HTMLPrettify ===
rm -rf "Sublime-HTMLPrettify"
git clone https://github.com/victorporof/Sublime-HTMLPrettify.git "Sublime-HTMLPrettify"
 
echo === CSSTidy ===
rm -rf "CSSTidy"
git clone https://github.com/fitnr/SublimeCSSTidy.git "CSSTidy"
 
echo === Maven ===
rm -rf "Maven"
git clone https://github.com/nlloyd/SublimeMaven.git "Maven"
 
echo === Twitter Bootstrap Snippets ===
rm -rf "Twitter Bootstrap Snippets"
git clone https://github.com/devtellect/sublime-twitter-bootstrap-snippets.git "Twitter Bootstrap Snippets"
 
echo === JsFormat ===
rm -rf "JsFormat"
git clone https://github.com/jdc0589/JsFormat.git "JsFormat"
 
echo === Aweibo ===
rm -rf "Aweibo"
git clone https://github.com/zhanglubing/sublime-aweibo.git "Aweibo"
 
echo === SublimeWeibo ===
rm -rf "SublimeWeibo"
git clone https://github.com/zhanglubing/sublime-sublimeweibo.git "SublimeWeibo"
 
echo === Live Reload ===
rm -rf "Live Reload"
git clone https://github.com/dz0ny/LiveReload-sublimetext2.git "Live Reload"
 
echo === Licence Snippets ===
rm -rf "Licence Snippets"
git clone https://github.com/sijk/sublime-licence-snippets.git "Licence Snippets"
 
echo ==================================================
echo Done!