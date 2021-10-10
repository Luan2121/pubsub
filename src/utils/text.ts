
const toCammelCase = ( str : string ) : string => {
    return str.substring(0,1).toUpperCase() + str.substring(1,str.length);
}

export { toCammelCase };