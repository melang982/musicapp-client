import {useState} from 'react';
import Icon from './Icon';

function SaveButton({onClicked}) {
  const [saved, setSaved] = useState(false);

  let className = 'save';
  if (saved) {
    className += ' save_saved';
  }

  const label = (
    saved
    ? 'Saved'
    : 'Save') + ' to My stars';

  function onClicked() {
    setSaved(!saved);
  }

  return <div className={className} onClick={onClicked}>
    <Icon icon='star'/> {label}
  </div>
}
export default SaveButton;
