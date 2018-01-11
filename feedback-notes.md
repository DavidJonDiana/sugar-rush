## Git-ish-y stuff

- To remove existing stuff you want gitignored (e.g. for .DS_Store):
  - add it to your `.gitignore` (e.g. `.DS_Store` would go at the end of your gitignore file)
  - `git rm -rf --cached .`
  - `git add -A`
  - `git commit -m "whatever"`
- Really descriptive and small commits! That's excellent
- Standardize your commit message format, e.g. like [this one](https://seesparkbox.com/foundry/semantic_commit_messages)
- Really descriptive issues, also a really healthy amount of them
- For issues, you could also use labels / milestones / assignees
- Well-names PRs!
- For PRs, you could also use "reviewing" features
- Could update your README to be relevant to your project

**getting master updates onto a working branch**

Assuming you are currently on `working-branch`...

```bash
git checkout master
git pull origin master
git checkout working-branch
git merge master
```

...or...

```bash
git pull origin master
```

After this you may want to `git push origin working-branch`

## Test

- Yay!

## Code style

- Consider add an .eslintrc.json to your project root

## React

- Nice small components!
