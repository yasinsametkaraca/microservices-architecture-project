## Monolithic Project

### How to run the project in windows:

1. Install the dependencies:
```
npm install
```

2. Add the following line to the package.json file:
```
"dev": "set NODE_ENV=dev && nodemon src/index.js",
```

3. Then run the following command:
```
npm run dev
```

### How to run the project in linux:

1. Install the dependencies:
```
npm install
```

2. Then run the following command:
```
npm run dev
```

### Rule
See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

#### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```
More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)