# Project II | Hexlet "Difference calculator" | Frontend

[![Actions Status](https://github.com/Sinoptik93/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Sinoptik93/frontend-project-lvl2/actions)
[![Eslint](https://github.com/Sinoptik93/frontend-project-lvl2/workflows/eslint/badge.svg)](https://github.com/Sinoptik93/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/09c96cb1204218a32a53/maintainability)](https://codeclimate.com/github/Sinoptik93/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/09c96cb1204218a32a53/test_coverage)](https://codeclimate.com/github/Sinoptik93/frontend-project-lvl2/test_coverage)

## gendiff
Gendiff is CLI util for 

**Supported file extensions:**
- `.json`
- `.ini`
- `.yml` | `.yaml`

**Supported paths:**
- absolute
- relative

**Formats output:**
- `stylish`
- `plain`
- `json`

## Install
Node version: `16.^`

```
# how to check node version:
$ node -v
v16.13.2
```

1. Clone repository:
```
$ git clone git@github.com:Sinoptik93/frontend-project-lvl2.git ./gendiff
```

2. Change directory:
```
$ cd gendiff 
```

3. Install dependencies:
```
$ make install
```

4. Build package:
```
$ make publish
```

5. Install system link:
```
$ npm link
```

## 🥳Congrats!🥳

## Usage
1. Get help output:
```
$ gendiff -h
# or
$ gendiff --help
```
![gendiff-help](https://i.ibb.co/HrW0nKm/gendiff-help.gif)
[asciinema](https://asciinema.org/a/QE60TcjrebGvyPpIIausEw3Cx)

2. Get stylish output diff:
```
gendiff fileExample1.json fileExample2.json
# equal
gendiff --format stylish fileExample1.json fileExample2.json

# supported absolute paths
gendiff rootFolder/path/to/the/fileExample1.json rootFolder/path/to/the/fileExample2.json
```
![gendiff-json](https://i.ibb.co/zstjxcZ/gendiff-json.gif)
[asciinema](https://asciinema.org/a/3Rt2JpmpKFSuVxRR86jYEKJgr)


3. Supported `.ini`, `.yml`, `.yaml` files extension:
```
gendiff fileExample1.ini fileExample2.ini
```

![gendiff-ini](https://i.ibb.co/dkjnkGs/gendiff-ini.gif)

```
gendiff fileExample1.yml fileExample2.yml
```
![gendiff-yml](https://i.ibb.co/p2sWJ1T/gendiff-yml.gif)


4. Output formats options:
- `stylish` - by default
- `plain`
- `json`

```
gendiff --format plain fileExample1.json fileExample2.json
```
![gendiff-format-plain](https://i.ibb.co/MVcHRjW/gendiff-format-plain.gif)
[asciinema](https://asciinema.org/a/RctSCI6PRBJxxWOxAivR2rM62)

**json**
```
gendiff --format json fileExample1.json fileExample2.json
```
![gendiff-format-json](https://i.ibb.co/G0KjjS1/gendiff-format-json.gif)
[asciinema](https://asciinema.org/a/I1WfTGVpYdNx9aB7UvwhTmUKR)
