import "../Styles/InputText.css";

function InputText() {
  return (
    <>
      <div className="container-post">
        <h1>Post:</h1>
        <input
          className="Title-topic"
          type="text"
          placeholder="Topic Title..."
        />
        <textarea className="Content-topic" placeholder="Body..."></textarea>

        <button className="post-button">Publish</button>
      </div>
    </>
  );
}

export default InputText;
