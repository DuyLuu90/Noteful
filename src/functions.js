export const getFolderName=(folders=[],id)=> {
  const folder= folders.find(folder=>folder.id===id)
  if (folder) return folder.name
  else return ''
}