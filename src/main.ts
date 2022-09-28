import * as db from 'zapatos/db'
import { Pool } from 'pg'

const main = async () => {

  const pool = new Pool({
    user: 'zap',
    password: 'atos',
  })

  const selection = await db.select('parent_table', db.all, {
    lateral: {
      child: db.selectExactlyOne('child_table', { parent_id: db.parent('id')})
    }
  }).run(pool)

  selection.forEach((row, i) => {
    if (row.child) {
      console.log(`row ${i} has a child`)
    }
    else if (row.child == null) {   // row.child is 'never'
      console.error(`row ${i} has no child`)
    }
  })
}

main().then(() => console.log('done main')).catch((err) => {
  console.error('main failed', err)
  process.exit(1)
})
