# Zapatos selectExactlyOne lateral unexpected behaviour

In this example, the lateral key `child` uses `db.selectExactlyOne` to retrieve a "child" row which references the parent table.

The inferred type of `child` is `schema.child.JSONSelectable`, not nullable, as is expected from `selectExactlyOne`.

However, at runtime, if there is no `child` matching the where clause provided in the lateral `selectExactlyOne`, then `child` will be `null`.

The workaround I've been using is `selectOne` in laterals where the joined row may or may not exist. However, this seems like an inconsistency to me, where `selectExactlyOne` throws an error if 0 rows are found when it's invoked normally, but does not throw that error if it's invoked as part of a lateral.

### Run the example:

1. Clone repo
2. `yarn install`
3. `yarn run-db`
  - inspect the state of the db as built from the tables.sql file
4. `yarn run`

Expected output:
```
parent row 0 has a child
```
then, a selectExactlyOne error because row 1 has no matching child.

Actual output:
```
parent row 0 has a child
parent row 1 has no child!
done main
```
