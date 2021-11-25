let array = []
for(let i=0; i<=100000000; i++){
    array.push(i)
    
}
let newdate = new Date() .getSeconds()
console.log(newdate);
array.map(value=>{
    return value = value*2    
})
console.log(newdate - (new Date() .getSeconds()));