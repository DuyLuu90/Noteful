export const validateName= (array=[],name='')=> {
   if(name.length===0) return 'Name is required'
   const nameExists= array.find(i=>i.name===name)
   if (nameExists) return 'This name already exists!'
   return null
}
export const validateNote=(arr=[],name='',id)=>{
  const nameExists= arr.find(i=>i.name === name && i.folderid===id)
  if (nameExists) return 'This name already exists!'
  return null
}
/*
export const getFolderName=(folders=[],id)=> {
  const folder= folders.find(folder=>folder.id===id)
  if (folder) return folder.name
  else return ''
}

export const randomId = () => {
  return Math.random().toString(36).substring(2,6)+ Math.random().toString(36).substring(2,6)
}

export const validateId=(array=[], propId='',id='')=> {
  id = id.trim().toLocaleLowerCase();
  propId= propId.toLocaleLowerCase()
  const item=array.find(item=>item.id===id)
  if (id.length === 0) return 'ID is required'
  else if (id.length < 8) return 'ID must be at least 8 characters long'
  else if (item&& id!==propId) return 'ID already exists' 
}*/
