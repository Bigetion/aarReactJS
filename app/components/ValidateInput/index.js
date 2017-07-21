import update from 'immutability-helper';
import { run, ruleRunner } from 'validations/ruleRunner.js'
import { required, mustMatch, minLength } from 'validations/rules.js';

import VText from './VText';
import VTextArea from './VTextArea';

module.exports = {
  update,
  run,
  ruleRunner,
  required,
  mustMatch,
  minLength,
  VText,
  VTextArea
}