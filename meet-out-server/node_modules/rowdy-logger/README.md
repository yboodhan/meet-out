# rowdy (╯°□°）╯︵ ┻━┻ &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hoten/rowdy/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/rowdy-logger.svg?style=flat)](https://www.npmjs.com/package/rowdy-logger) [![Coverage Status](https://coveralls.io/repos/github/Hoten/rowdy/badge.svg?branch=master)](https://coveralls.io/github/Hoten/rowdy?branch=master) [![Build Status](https://travis-ci.org/Hoten/rowdy.svg?branch=master)](https://travis-ci.org/Hoten/rowdy)

Render a nice table of your Express routes

Supports Express v. 3, 4, and 5

![](example.png)

## Installation

```sh
npm install --save rowdy-logger
```

## Usage

```javascript
var express = require('express')
var rowdy = require('rowdy-logger')

var app = express()
var rowdyResults = rowdy.begin(app)

// ... apply your routes ...

var server = app.listen(process.env.PORT || 3000, function() {
    rowdyResults.print()
})
```
