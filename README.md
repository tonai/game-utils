# Game utils

## Contributing

Changeset is used to manage versioning.

When submitting a PR, add a changeset on the packages that should be bumped with a description about what this PR provides that will be inserted into the changelogs (markdown allowed).

To create a changeset run:

```sh
npm run changeset
```

This will create a changeset file in the `.changeset` folder that you can review and update if you want.

Then commit the changeset file with the PR.

## Publishing

Publishing is automatically handled by github actions when merging the `version` PR created by changeset.
