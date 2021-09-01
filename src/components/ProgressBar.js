function ProgressBar(props) {

  return <div className="progressBar__wrapper">
    <div style={props.style} className="progressBar">
      <div className="progressBar__inner" style={{width: props.progress*100 + '%'}}></div>
    </div>
  </div>;
}
export default ProgressBar;
