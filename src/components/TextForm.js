import React, {useState} from 'react'

export default function TextForm(props) {

  const [text, setText] = useState("");
  const handleUpClick = ()=>{
    // console.log("Uppercase was Clicked" + text);
    let newText = text.toUpperCase();
    // setText("You have clicked on Upper case");
    setText(newText);
    props.showAlert("Converted to UpperCase!!","success");
  }

  const handleLowClick = ()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase!!","success");
  }

  const handleClearClick = ()=>{
    let newText = '';
    setText(newText);
    props.showAlert("Text Cleared!!","success");
  }

  const handleInverseClick = ()=>{
    let newText = '';
    for(let i = text.length -1; i>= 0 ; i--)
      {
        newText = newText + text[i];
      }
    setText(newText);
    props.showAlert("Inversed the text!!","success");
  }

  const handleSpeakClick = ()=>{
    let newText =  new SpeechSynthesisUtterance();
    newText.text = text;
    window.speechSynthesis.speak(newText);
    props.showAlert("Listen!!","success");
  }

  const handleCopyClick = ()=>{
    let newText = document.getElementById("myBox");
    newText.select();
    navigator.clipboard.writeText(newText.value);
    props.showAlert("Copied to Clipboard!!","success");
  }

  const handleExtraSpaceClick = ()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces Removed!!","success");
  }

  const handleOnChange = (event)=>{
    // console.log("On Changed");
    setText(event.target.value);
  }

  const countWords = (text) =>{
    var count = 0;
    if(text === "" || text.length === 0)
      {
        count = 0;
      }
      else
      {
        count = text.trim().split(/\s+/).length;
      }
      return count;
  }

  // setText("Enter Text Bruh:");
  return (
    <>
    <div className="container" style = {{color: props.mode === 'dark'? 'white':'black'}}>
        <h1>{props.heading} </h1>
        <div className="mb-3">
        <textarea className="form-control" id="myBox" value={text} style = {{backgroundColor: props.mode === 'dark'?'grey':'white',color: props.mode === 'dark'?'white':'black'}} onChange = {handleOnChange} rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert To Upper Case</button>
        <button className="btn btn-primary mx-2" onClick={handleLowClick}>Convert To Lower Case</button>
        <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
        <button className="btn btn-primary mx-2" onClick={handleInverseClick}>Convert To Inverse</button>
        <button className="btn btn-primary mx-2" onClick={handleSpeakClick}>Speak</button>
        <button className="btn btn-primary mx-2" onClick={handleCopyClick}>Copy Text</button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpaceClick}>Remove Extra Spaces</button>
    </div>

    <div className="container my-2" style = {{color:props.mode === 'dark'? 'white':'black'}} >
      <h2>Your Text Summary:</h2>
        {/* <p>{text.split(" ").length} Words and {text.length} Characters</p> */}
        <p>{countWords(text)} Words and {text.length} Characters</p>
        <p>{0.008 * countWords(text)} minutes to read!</p>
        <h2>Your Text Preview</h2>
        <p>{text.length>0 ? text:"Enter something in the textbox aboce to preview here"}</p>
    </div>
    </>
      )
}
