/*
  The Promise.all() method is actually a method of Promise object (which is also an object under JavaScript used to handle all the 
  asynchronous operations), that takes an array of promises(an iterable) as an input. It returns a single Promise that resolves 
  when all of the promises passed as an iterable, which have resolved or when the iterable contains no promises. 
  In simple way, if any of the passed-in promises reject, the Promise.all() method asynchronously rejects the value of the
  promise that already rejected, whether or not the other promises have resolved. 
*/


function createPromise(msg,cond,delay){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            if (cond){
                res(`resolve ${msg} time ${delay}`)
            } else {
                rej(`reject ${msg} time ${delay}`)
            }
        }, delay)
    })
}

let promise1 = createPromise("prom", true , 500)
let promise2 = createPromise("prom2", false , 700)
let promise3 = createPromise("prom3", true , 340)

// Actuall Promise function

let res = Promise.all([promise1, promise2, promise3])

res.then(msg=>{
    console.log("kll",msg)
}).catch(err=>{
    console.log(err)
})

//Pollyfill of Promise.all 

let MyPromise = {}
 MyPromise.all = (promise)=>{
     
     let response = []
     let errList  = []
     return new Promise((res,rej)=>{
          
          promise.forEach(prom=>{
            
              prom.then((msg)=>{
                  response.push(msg)
                  
                  if (response.length === promise.length){
                      res(response)
                  }
              }).catch(err=>{
                   console.log(response, errList)
                  rej(err)
              })
          })  
     })
 }
 
res =   MyPromise.all([promise1, promise2, promise3])

res.then(msg=>{
    console.log("59",msg)
}).catch(err=>{
    console.log("line 61",err)
})



// Promise All Settled

function createPromise(msg,cond,delay){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            if (cond){
                res(`resolve ${msg} time ${delay}`)
            } else {
                rej(`reject ${msg} time ${delay}`)
            }
        }, delay)
    })
}

let promise1 = createPromise("prom", true , 500)
let promise2 = createPromise("prom2", false , 700)
let promise3 = createPromise("prom3", true , 340)

let res = Promise.allSettled([promise1, promise2, promise3])

res.then(msg=>{
    console.log("line 92",msg)
}).catch(err=>{
    console.log(err)
})

/*
Output:
[
{status: 'fulfilled', value: 'resolve prom time 500'}
{status: 'rejected', reason: 'reject prom2 time 700'}
{status: 'fulfilled', value: 'resolve prom3 time 340'}
]
*/

//Pollyfill of Promise.allSettled

MyPromise.allSettled = (promise)=>{
     
     let response = []
    
     return new Promise((res,rej)=>{
          
          promise.forEach(prom=>{
            
              prom.then((msg)=>{
                  response.push({ status:'fulfilled', value: msg})
                  if (response.length === promise.length){
                      res(response)
                  }
              }).catch(err=>{
                   console.log(response)
                    response.push({ status:'rejected', reason: err})
                     if (response.length === promise.length){
                      res(response)
                  }
              })
          })
     })
 }
 

  res =   MyPromise.allSettled([promise1, promise2, promise3])

res.then(msg=>{
    console.log("59",msg)
}).catch(err=>{
    console.log("line 61",err)
})
