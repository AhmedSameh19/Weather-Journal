// Personal API Key for OpenWeatherMap API
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const APIKey="&appid=9e728bbb07e32572d4f94986d9b257fd&units=metric";
const URL=`https://api.openweathermap.org/data/2.5/weather?`;
const server="http://127.0.0.1:8000";


document.getElementById("generate").addEventListener("click",generateData);

const generateData=()=>{
    console.log("clicked")
    const zipCode ="zip="+document.getElementById("zip").value; 
    const feelings=document.getElementById("feelings").value;
    
    getWeatherData(zipCode).then((data)=>{
        console.log(data);

    
    postData(server+'/website',data)
    updatingUI();
})
};

const getWeatherData=async(zipCode)=>{
    try{
        const res=await fetch(URL+zipCode+APIKey);
        const data=await res.json();
        return data.main.temp;
    }
    catch(error){
        console.log("ERROR",error);
    }
}

const postData = async ( url = '', data = {})=>{
    console.log(data)
      const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      
      }
  }
  

  
updatingUI=async()=>{
    const res=await fetch(server+"/website");
    try{
        data=res.json();
        document.getElementById('date').innerHTML=data.newDate;
        document.getElementById('temp').innerHTML=data.main.temp;
        
    }
    catch(error){
        console("UpdatingUi error",error);
    }
}