import * as db from 'zapatos/db'
import { Pool } from 'pg'

const main = async () => {

  const pool = new Pool({
    user: 'zap',
    password: 'atos',
  })

  const parents = await db.select('parent_table', db.all).run(pool)
  const children = await db.select('child_table', db.all).run(pool)
  console.log('parent_table', parents)
  console.log('child_table', children)


  const selection = await db.select('parent_table', db.all, {
    lateral: {
      child: db.selectExactlyOne('child_table', { parent_id: db.parent('id')})
    }
  }).run(pool)

  selection.forEach((row, i) => {
    if (row.child) {
      console.log(`parent row ${i} has a child`)
    }
    else if (row.child == null) {   // row.child is 'never'
      console.log(`parent row ${i} has no child!`)
    }
  })
}

main().then(() => console.log('done main')).catch((err) => {
  console.error('main failed', err)
  process.exit(1)
})
