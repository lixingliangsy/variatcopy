/**
 * lib/rules/__selftest.ts - deterministic self-test for VariatCopy copy-governance rules
 * and L2 pipeline. Run with tsx (not part of next build).
 */
import { auditCopy, RULES, RULESET_VERSION } from './copywriting'
import { persistRun, exportRunsCsv, recordFeedback, listRuns } from '../pipeline'
import fs from 'fs'

let pass = 0
let fail = 0
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { pass++; console.log('  PASS ' + name) }
  else { fail++; console.log('  FAIL ' + name + '  ' + detail) }
}

console.log('== VariatCopy copy-governance + pipeline self-test ==')

ok('RULESET_VERSION date-stamped', /^\d{4}-\d{2}$/.test(RULESET_VERSION), RULESET_VERSION)
ok('RULES non-empty with refs', RULES.length > 0 && RULES.every((r) => !!r.ref))

const bad = auditCopy('Our variant is PROVEN to GUARANTEE 100% conversion and never misses.')
ok('honesty flags guarantee/100%/proven', !bad.honestyPassed && bad.flaggedTerms.length >= 2, JSON.stringify(bad.flaggedTerms))

const good = auditCopy('Angle A leads with quality; Angle B leads with price. Test which lifts CTR.')
ok('honesty passes clean copy', good.honestyPassed === true)
ok('good copy has no flagged terms', good.flaggedTerms.length === 0)

ok('each rule has id+label+ref', RULES.every((r) => !!r.id && !!r.label && !!r.ref))
ok('honesty rule present (no guarantee)', RULES.some((r) => r.id === 'HONESTY_NO_GUARANTEE'))
ok('A/B honesty rule present', RULES.some((r) => r.id === 'AB_HONESTY_NO_PROVEN_CLAIM'))

const run = persistRun({
  angleA: 'Quality', angleB: 'Price', productInfo: '$89 ergonomic chair',
  result: 'Angle A: built to last. Angle B: fair price.', source: 'Model-assisted',
})
ok('persistRun returns runId', !!run.runId)
ok('run source exported', /Model-assisted/.test(JSON.stringify(listRuns(5))))

const csv = exportRunsCsv()
ok('exportRunsCsv has header + rows', csv.split('\n').length >= 2 && /runId/.test(csv))

const fb = recordFeedback({ runId: run.runId, rating: 5, comment: 'great' })
ok('recordFeedback keeps rating 5', fb.rating === 5)
const fbBad = recordFeedback({ runId: run.runId, rating: 42 })
ok('recordFeedback clamps >5 to 5', fbBad.rating === 5)
const fbNeg = recordFeedback({ runId: run.runId, rating: -1 })
ok('recordFeedback clamps <1 to 1', fbNeg.rating === 1)

const summary = pass + ' passed, ' + fail + ' failed\n'
console.log('\n== ' + summary)
try { fs.writeFileSync('C:/tmp/vc_rules_selftest.txt', summary) } catch {}
if (fail > 0) process.exit(1)
