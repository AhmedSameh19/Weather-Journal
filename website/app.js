// Personal API Key for OpenWeatherMap API
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const APIKey="&appid=9e728bbb07e32572d4f94986d9b257fd&units=metric";
const URL=`https://api.openweathermap.org/data/2.5/weather?`;
const server="http://127.0.0.1:8000";

//generate the data function
document.getElementById("generate").addEventListener("click",()=>{
    console.log("clicked")
    const zipCode ="zip="+document.getElementById("zip").value; 
    const feelings=document.getElementById("feelings").value;
    getWeatherData(zipCode).then((data)=>{
        const Mydata={
            temp:data[0],
            country:data[1],
            weather:data[2]
        };
        console.log(Mydata);
    
    postData(server+'/add',data);

    updatingUI();
});

});

//send request to get the data function

const getWeatherData=async(zipCode)=>{
    try{
        const res=await fetch(URL+zipCode+APIKey);
        const data=await res.json();
        const data2=[data.main.temp,data.name+" , "+data.sys.country,data.weather[0].descriptions]
        return data2;
        
    }
    catch(error){
        console.log("ERROR",error);
    }
};


//Post data function
const postData = async ( url = '', data = {})=>{
      const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await res.json();
        return newData;
      }
      catch(error) {
        console.log("ERROR",error);
      
      }
  };
  
//update UI function
async function updatingUI(){
    const res=await fetch(server+"/all");
    try{
        const data=await res.json();
        console.log(data);
        document.getElementById('date').innerHTML=newDate;
        document.getElementById('temp').innerHTML=data[0]+"\u00B0"+"C";
        document.getElementById('country').innerHTML=data[1];
        document.getElementById('content').innerHTML=data[2];
    }
    catch(error){
        console.log("Updating Ui error",error);
    }
}
