export async function delay(ms:number){
    return new Promise ((resolve)=>{
        setTimeout(()=>{ 
            resolve("") // 비동기 작업 종료 
        }
    , ms)
    })
} 