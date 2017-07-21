import update from 'immutability-helper';
import { run, runAll, ruleRunner } from './ruleRunner.js'
import { required, mustMatch, minLength } from './rules.js';

export const Validations = {
  UpdateState: update,
  RunValidate: run,
  RunValidateAll: runAll,
  Rules: ruleRunner,
  Type: {
    required,
    mustMatch,
    minLength
  }
}