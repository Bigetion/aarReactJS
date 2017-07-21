import Confirmation from 'components/Confirmation';
import { createConfirmation } from 'react-confirm';

const defaultConfirmation = createConfirmation(Confirmation);

export function confirmDialog(confirmation, options = {}) {
  return defaultConfirmation({ confirmation, ...options });
}