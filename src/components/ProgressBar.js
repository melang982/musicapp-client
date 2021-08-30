function ProgressBar(props) {

  return <div className="progressBar__wrapper">
    <div style={props.style} className="progressBar">
      <div className="progressBar__inner"></div>
    </div>
  </div>;
}
export default ProgressBar;
