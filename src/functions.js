export const getFolderName=(folders=[],id)=> {
  const folder= folders.find(folder=>folder.id===id)
  if (folder) return folder.name
  else return ''
}

export const randomId = () => {
  return Math.random().toString(36).substring(2,6)+ Math.random().toString(36).substring(2,6)
}

export const validateName= (array=[],propName='',name='')=> {
  propName= propName.toLocaleLowerCase()
  name = name.trim().toLocaleLowerCase()
  const item= array.find(item=>item.name.toLocaleLowerCase()===name)
  if (name.length === 0) return 'Name is required'
  else if (name.length < 3) return 'Name must be at least 3 characters long'
  else if (item && name!==propName) return 'Name already exists' 
}

export const validateId=(array=[], propId='',id='')=> {
  id = id.trim().toLocaleLowerCase();
  propId= propId.toLocaleLowerCase()
  const item=array.find(item=>item.id===id)
  if (id.length === 0) return 'ID is required'
  else if (id.length < 8) return 'ID must be at least 8 characters long'
  else if (item&& id!==propId) return 'ID already exists' 
}
