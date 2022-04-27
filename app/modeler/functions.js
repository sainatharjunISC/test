
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db=admin.firestore()


  const updateStatusFun=async (orderID,status)=>{
    var docRef = db.collection("Orders");
    var updateDoc=""
    var docid=""
            // Set the "capital" field of the city 'DC'
            await docRef.where('orderID','==',orderID).get().then((s)=>{
              s.forEach(doc=>{
                docRef.doc(doc.id).update({
                  status:status
              })
              .then(() => {
                  console.log("Updated ",status);
              })
              .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
              });
              })

          
            })
            
             
  }

  const updateToPreparingToWash = (orderID) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            status = 'Preparing to wash';
            updateStatusFun(orderID,status)
            resolve(true);
        }, 2000);
    });
};

const updateToPreparingToIron = (orderID) => {
  return new Promise((resolve, reject) => {
      setTimeout(()=>{
          status = 'Preparing to iron';
          updateStatusFun(orderID,status)
          resolve(true);
      }, 2000);
  });
};

const updateToWashing = (orderID) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            status = 'Washing';
            updateStatusFun(orderID,status)
            resolve(true);
        }, 60000*30);
    });
};

const updateToDrying = (orderID) => {
  return new Promise((resolve, reject) => {
      setTimeout(()=>{
          status = 'Drying';
          updateStatusFun(orderID,status)
          resolve(true);
      }, 60000*60);
  });
};

const updateToIroning = async (orderID,totalItems) => {
  let ret;
  await db.collection('orderCount').doc('orderCountPerDay').get().then(async (res)=>{
    if(res.data().Ironing+parseInt(totalItems)<100){
      await db.collection('orderCount').doc('orderCountPerDay').update({Ironing:parseInt(res.data().Ironing)+parseInt(totalItems)}).then(()=>{
        ret= new Promise((resolve, reject) => {
          setTimeout(()=>{
              status = 'Ironing';
              updateStatusFun(orderID,status)
              resolve(true);
          }, 60000*60);
      });
      
      })

    }
  else{
    ret="100 clothes reached"
  }
  })
  return ret;
};
const readyToPickUp = (orderID) => {
  return new Promise((resolve, reject) => {
      setTimeout(()=>{
          status = 'Ready to pick up';
          updateStatusFun(orderID,status)
          resolve(true);
      }, 5000);
  });
};

const washProcess = async (orderID,totalItems) => {
  db.collection('orderCount').doc('orderCountPerDay').get().then((res)=>{
    if(res.data().Washing+parseInt(totalItems)<100){
      db.collection('orderCount').doc('orderCountPerDay').update({Washing:parseInt(res.data().Washing)+parseInt(totalItems)}).then(()=>{
        updateToPreparingToWash(orderID).then(()=>{
          updateToWashing(orderID).then(()=>{
            updateToDrying(orderID).then(()=>{
              updateToIroning(orderID,totalItems).then((res)=>{
                if(res=='100 clothes reached'){
                  return res
                }
                readyToPickUp(orderID).then(()=>{
                  console.log('Washing process finished')
                })
              })
            })
          })
         });
      })
      return 'Pushed for washing'
    }
    else{
      return '100 clothes reached'
    }
  })
     
}

const ironProcess = async (orderID,totalItems) => {
  db.collection('orderCount').doc('orderCountPerDay').get().then((res)=>{
    if(res.Ironing+parseInt(totalItems)<100){
      db.collection('orderCount').doc('orderCountPerDay').update({Ironing:parseInt(res.Ironing)+parseInt(totalItems)}).then(()=>{
        updateToPreparingToIron(orderID).then(()=>{
              updateToIroning(orderID).then(()=>{
                readyToPickUp(orderID).then(()=>{
                  console.log('Ironing process finished')
                })
            })
         });
      })
      return 'Pushed for ironing'
    }
    else{
      return '100 clothes reached'
    }
  })
     
}


module.exports.washingFun = (orderID,totalItems,res)=>{
    let ret=washProcess(orderID,totalItems)
    res.send(ret)
  
}

module.exports.ironingFun = (orderID,totalItems,res)=>{

  let ret=ironProcess(orderID,totalItems)
  res.send(ret)

}

module.exports.resetFun = ()=>{

  db.collection('orderCount').doc('orderCountPerDay').update({
    Washing:0,
    Ironing:0
  })

}