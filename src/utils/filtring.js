export  const filtering = (data,community , lastStatus , accept)=>{
    let output = data

        output = data.filter((el)=>{
            if(el.firstCommunity === community || el.secondCommunity === community || community === "All") return true;
            return false 
        })

        output = output.filter((el)=>{
            let oldstatus = el.status
            let l = oldstatus.reduce((acc , el)=>{
                if(el.done === true){
                    return el
                }
                else{
                    return acc
                }
            }, {})
            if(l.state === lastStatus || lastStatus === "All") return true
            return false 
        })
        output = output.filter((el)=>{
            if(el.acceptedIn.includes(accept) || accept === "All") return true;
            return false 
        })
    return output
}


