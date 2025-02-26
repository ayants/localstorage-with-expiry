const myLocalStorage = {
    setItem:(key, value, expiry)=>{
      const valueToSave = JSON.stringify({value, expiry: new Date().getTime()+expiry})
      localStorage.setItem(key, valueToSave)
    },
    getItem:(key)=>{
      const savedValue = localStorage.getItem(key)
      try{
         const parsedValue = JSON.parse(savedValue)
        if(parsedValue.expiry> new Date().getTime()){
          return parsedValue.value
        }else{
            localStorage.removeItem(key)
          return null
        }
      }catch(err){
        return null
      }
    }
  };
export default myLocalStorage