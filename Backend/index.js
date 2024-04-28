const express = require("express")
const Sequelize = require("sequelize")
const app = express()

app.use(express.json())

const sequelize_Patients = new Sequelize("database","username","password",{
    host: "localhost",
    dialect:"sqlite",
    storage: "./Database/SQLPatients.sqlite",
})
const Patient = sequelize_Patients.define("patient",{
    Patient_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    First_Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Last_Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Gender:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Age:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Address:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Phone_Number:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize_Patients.sync()

//------------------------------------------

const sequelize_MedicalHistory = new Sequelize("database","username","password",{
    host: "localhost",
    dialect:"sqlite",
    storage: "./Database/SQLMedicalHistory.sqlite",
})
const MedicalHistory = sequelize_MedicalHistory.define("medicalHistory",{
    MedicalHistory_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Patient_ID:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Start_Date:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    End_Date:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Disease_ID:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Additional_Details:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize_MedicalHistory.sync()

//-----------------------------------------

const sequelize_Diseases = new Sequelize("database","username","password",{
    host: "localhost",
    dialect:"sqlite",
    storage: "./Database/SQLDiseasesData.sqlite",
})
const Diseases = sequelize_Diseases.define("disease",{
    Disease_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Disease_Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Disease_Details:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize_Diseases.sync()

//-----get-----post-----put-----delete-----Patients//

app.get("/Patients",(req,res) =>{
    Patient.findAll().then((Patients) =>{
        res.json(Patients)
    }).catch((err) =>{
        res.status(500).send(err)    
    })
})

app.get("/Patients/:Patient_ID",(req,res) =>{
    Patient.findByPk(req.params.Patient_ID)
    .then((Patients) =>{
        if (!Patients){
            res.status(404).send("Patient not found")
        } else {
            res.json(Patients)
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.post("/Patients",(req,res) =>{
    Patient.create(req.body)
    .then((Patients)=>{
        res.send(Patients)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.put("/Patients/:Patient_ID", (req, res) => {

    Patient.findByPk(req.params.Patient_ID)
        .then((patient) => {
            if (!patient) {
                res.status.send("Patient not found");
            } else {
                patient
                    .update(req.body)
                    .then(() => {
                        res.send(patient);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

// app.delete("/Patients/:Patient_ID",(req,res) =>{
//     MedicalHistory.destroy({
//         where:{
//             Patient_ID: req.params.Patient_ID
//         }
//     })
//     Patient.destroy({
//         where:{
//             Patient_ID: req.params.Patient_ID
//         }
//     })

//     Patient.findByPk(req.params.Patient_ID).then((Patients) =>{
//         if(!Patients){
//             res.status.send("Patient not found")
//         }else{
//             Patients.destroy().then(() =>{
//                 res.send({})
//             }).catch((err) =>{
//                 res.status(500).send(err)
//             })
//         }
//     }).catch((err) =>{
//         res.status(500).send(err)
//     })
// })
app.delete("/Patients/:Patient_ID", (req, res) => {
    Patient.findByPk(req.params.Patient_ID)
      .then((patient) => {
        if (!patient) {
          res.status(404).send("Patient not found");
        } else {
          MedicalHistory.destroy({
            where: {
              Patient_ID: req.params.Patient_ID
            }
          }).then(() => {
            patient.destroy().then(() => {
              res.send({});
            }).catch((err) => {
              res.status(500).send(err);
            });
          }).catch((err) => {
            res.status(500).send(err);
          });
        }
      }).catch((err) => {
        res.status(500).send(err);
      });
  });

  

//-----get-----post-----put-----delete-----MedicalHistory//

app.get("/MedicalHistory",(req,res) =>{
    MedicalHistory.findAll().then((MedicalHistorys) =>{
        res.json(MedicalHistorys)
    }).catch((err) =>{
        res.status(500).send(err)    
    })
})

app.get("/MedicalHistory/MedicalHistory_ID",(req,res) =>{
    MedicalHistory.findByPk(req.params.MedicalHistory_ID)
    .then((MedicalHistorys) =>{
        if (!MedicalHistorys){
            res.status(404).send("MedicalHistory not found")
        } else {
            res.json(MedicalHistorys)
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.post("/MedicalHistory",(req,res) =>{
    MedicalHistory.create(req.body)
    .then((MedicalHistorys)=>{
        res.send(MedicalHistorys)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.put("/MedicalHistory/:MedicalHistory_ID", (req, res) => {

    MedicalHistory.findByPk(req.params.MedicalHistory_ID)
        .then((MedicalHistorys) => {
            if (!MedicalHistorys) {
                res.status.send("MedicalHistory not found");
            } else {
                MedicalHistorys
                    .update(req.body)
                    .then(() => {
                        res.send(MedicalHistorys);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

app.delete("/MedicalHistory/:MedicalHistory_ID",(req,res) =>{
    MedicalHistory.findByPk(req.params.MedicalHistory_ID)
      .then((medicalHistory) =>{
        if(!medicalHistory){
            res.status(404).send("MedicalHistory not found")
        }else{
            medicalHistory.destroy().then(() =>{
                res.send({})
            }).catch((err) =>{
                res.status(500).send(err)
            })
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

//-----get-----post-----put-----delete-----DiseasesData//

app.get("/Diseases",(req,res) =>{
    Diseases.findAll().then((diseases) =>{
        res.json(diseases)
    }).catch((err) =>{
        res.status(500).send(err)    
    })
})

app.get("/Diseases/Disease_ID",(req,res) =>{
    Diseases.findByPk(req.params.Disease_ID)
    .then((diseases) =>{
        if (!diseases){
            res.status(404).send("Disease not found")
        } else {
            res.json(diseases)
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.post("/Diseases",(req,res) =>{
    Diseases.create(req.body)
    .then((diseases)=>{
        res.send(diseases)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.put("/Diseases/:Disease_ID", (req, res) => {

    Diseases.findByPk(req.params.Disease_ID)
        .then((diseases) => {
            if (!diseases) {
                res.status.send("Disease not found");
            } else {
                diseases
                    .update(req.body)
                    .then(() => {
                        res.send(diseases);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

// app.delete("/Diseases/:Disease_ID",(req,res) =>{
//     MedicalHistory.destroy({
//         where:{
//             Disease_ID: req.params.Disease_ID
//         }
//     })
//     Diseases.destroy({
//         where:{
//             Disease_ID: req.params.Disease_ID
//         }
//     })

//     Diseases.findByPk(req.params.Disease_ID).then((diseases) =>{
//         if(!diseases){
//             res.status.send("Disease not found")
//         }else{
//             diseases.destroy().then(() =>{
//                 res.send({})
//             }).catch((err) =>{
//                 res.status(500).send(err)
//             })
//         }
//     }).catch((err) =>{
//         res.status(500).send(err)
//     })
// })
app.delete("/Diseases/:Disease_ID", (req, res) => {
    Diseases.findByPk(req.params.Disease_ID)
      .then((disease) => {
        if (!disease) {
          res.status(404).send("Disease not found");
        } else {
          MedicalHistory.destroy({
            where: {
              Disease_ID: req.params.Disease_ID
            }
          }).then(() => {
            disease.destroy().then(() => {
              res.send({});
            }).catch((err) => {
              res.status(500).send(err);
            });
          }).catch((err) => {
            res.status(500).send(err);
          });
        }
      }).catch((err) => {
        res.status(500).send(err);
      });
  });


const port = process.env.PORT || 5000;
app.listen(port,() => console.log (`Server is running on port ${port}`));