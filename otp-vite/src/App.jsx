import { useState,useRef,useEffect } from 'react'
import './App.css'
import { Formik,useFormik } from 'formik';


const validate = (values) =>{
  const errors={};
  if(Object.values(values.otp).some((data)=>data === "")){
    errors.otp="this fields is required"
  }
  return errors;
}


function App() {
  const inputRef = useRef({})
  // const formik = useFormik({
  //   initialValues:{
  //     otp:{
  //       digitOne: "",
  //       digitTwo: "",
  //       digitThree: "",
  //       digitFour: "",
  //       digitFive: "",
  //       digitSix: "",
    
  //     }
  //   }
  // });


  const formik = useFormik({
    initialValues:{
      otp:Array.from({length:6}).fill("")
    },
    validate,
    onSubmit: values =>{
      console.log(values);
    }
  });


  // console.log(formik.values);
  // const [otp, setOtp] = useState({
  //   digitOne: "",
  //   digitTwo: "",
  //   digitThree: "",
  //   digitFour: "",
  //   digitFive: "",
  //   digitSix: "",

  // });

useEffect(()=>{
  inputRef.current[0].focus();
  inputRef.current[0].addEventListener("paste",pasteText);

  return ()=> inputRef.current[0].removeEventListener("paste",pasteText);

},[]);

const pasteText=(event)=>{
  const pastedText = event.clipboardData.getData("text");
  const fieldValues={};
  Object.keys(otp).forEach((keys,index)=>{
    fieldValues[keys]=pastedText[index];
    console.log(fieldValues);
  });
 setOtp(fieldValues);
 inputRef.current[5].focus();

}



  const handleChange = (event,index) => {
    const { value } = event.target;
    if(/[a-z]/gi.test(value)) return;

    const currentOTP=[...formik.values.otp]
    currentOTP[index]=value.slice(-1)
    formik.setValues((prev)=>({
      ...prev,
      // otp:{
      //   ...prev.otp,
      //   [name]:value,
      // }
      otp:currentOTP,
    }));

    // setOtp((prev) => ({
    //   ...prev,
    //   [name]: value.slice(-1),
    // }));
    // event.target.nextSibling.focus();
    // inputRef.current[index+1].focus()
    if( value && index<5){
      inputRef.current[index+1].focus()
    }
  }
  const handleBackSpace=(event,index)=>{
    if(event.key==="Backspace"){
      if(index>0){
        inputRef.current[index-1].focus()
      }
      
    }
  }

  // console.log(inputRef.current);
  function renderInput() {
    return formik.values.otp.map((value,index)=>(
      <input
      ref={(element)=>(inputRef.current[index]=element)}
      key={index}
      // value={formik.values.otp[index]}
      value={value}

      type="text"
       name={index}
        className='w-16 h-12 rounded-md mr-3 text-center text-xl'
      onChange={(evnent)=>handleChange(evnent,index)}
      onKeyUp={(event)=>handleBackSpace(event,index)}
    />
    ))
  

  }

  return (
    <form action=''>
      <h3 className="text-3xl mb-8">Please fill in the otp</h3>
      <Formik>
      <div>
        {renderInput()}
        
      </div>

      </Formik>
     {formik.errors.otp && <p>please fill the fields </p>}
      <button
      type='button' className='mt-4 w-32 border bg-[#3b3b3b] rounded border-solid hover:bg-[#252525]'
      onClick={formik.handleSubmit}
      >Submit</button>
    </form>
  )
}

export default App
