

const url  = 'https://script.google.com/macros/s/AKfycbzaleD4ha4ZVJ_fF2MI_PA5fnulqxfSh23YizLiDSJLy59XnFRTZFukzD9gXmetI3Go/exec'


function test()
{
    var SendDATA = {
        "dataName" : 'test',
     };
     
      var postparam = 
            {
              "method"     : "POST",
              "mode"       : "no-cors",
              "Content-Type" : "application/x-www-form-urlencoded",
              "body" : JSON.stringify(SendDATA)
            };
     
      
    const promise = fetch(url, postparam);
    console.log(promise.text());
}