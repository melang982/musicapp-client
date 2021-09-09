import { useState } from 'react';
import Icon from './Icon';

function SaveButton() {
  const [saved, setSaved] = useState(false);

  const className = 'save' + (saved ? ' save_saved' : '');

  const label = (saved ? 'Saved' : 'Save') + ' to My stars';

  function onClick() {
    setSaved(!saved);
  }

  return <div className={className} onClick={onClick}>
    <Icon icon='star'/> {label}
  </div>
}
export default SaveButton;