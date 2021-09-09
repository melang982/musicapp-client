import { useState, useEffect, useRef } from 'react';
import { clamp } from './../utils.js';

function ProgressBar({ progress, style, updateValue, shouldUpdateOnDrag }) {
  const [mouseDown, setMouseDown] = useState(false);
  const [addedEvents, setAddedEvents] = useState(false);
  const [tempProgress, setTempProgress] = useState(0);

  const divRef = useRef(null);

  function onMouseDown() {
    setMouseDown(true);
    setTempProgress(progress);
  }

  useEffect(() => {

    const calculateValue = (e) => {
      const x = e.pageX;

      const rect = divRef.current.getBoundingClientRect();

      return clamp((x - rect.left) / divRef.current.offsetWidth, 0, 1);
    }

    const onWindowMouseMove = (e) => {

      if (shouldUpdateOnDrag)
        updateValue(calculateValue(e));
      else
        setTempProgress(calculateValue(e));
    };

    const onMouseUp = (e) => {
      console.log('mouse up');
      updateValue(calculateValue(e));
      removeEvents();
    };

    const removeEvents = () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      console.log('removed events');
      setMouseDown(false);
      setAddedEvents(false);
    };

    if (mouseDown && !addedEvents) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      //console.log('added events');
      setAddedEvents(true);
    }

    return () => removeEvents, [mouseDown]
  });

  const width = ((mouseDown && !shouldUpdateOnDrag) ? tempProgress : progress) * 100 + '%';

  return <div ref={divRef} className="progressBar__wrapper" style={style} onMouseDown={onMouseDown}>
    <div className="progressBar">
      <div className="progressBar__inner" style={{ width: width }}></div>
    </div>
  </div>;
}

export default ProgressBar;