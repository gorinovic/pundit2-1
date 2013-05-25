# Pundit2 welcomes you!

* Start off installing nodejs dependancies, 
>     make hello
* or, if you prefer
>     npm install

* To install submodules (they will go in /lib):
>     git submodules init
>     git submodules update

* You need to download the dojo SDK
* Tested with http://download.dojotoolkit.org/release-1.9.0/dojo-release-1.9.0-src.tar.gz
* put it in /lib/dojo (yes, it is git-ignored):
>     tar xvfz path/to/dojo-release-1.9.0-src.tar.gz lib/dojo

* make everything with (docs, tests, coverage)
>     make

* Just do the tests with
>     make test

* other available targets: clean, test, test-cov, docs