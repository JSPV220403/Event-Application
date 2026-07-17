const categoryServiceTest:any={}

categoryServiceTest.user={
    id:"ae8882db-b577-4230-91fb-f72a7b353386",
    name:"user1",
    phoneNumber:"1221212212",
    email:"user1@gmail.com",
    role:"USER",
    status:"PENDING",
};

categoryServiceTest.approvedOrganizer={
    id:"8751959b-85d4-4f02-99de-57dae86ff6de",
    name:"Organizer1",
    phoneNumber:"9090980808",
    email:"organizer1@gmail.com",
    role:"ORGANIZER",
    status:"APPROVED",
};

categoryServiceTest.approvedOrganizer2={
    id:"0a50e2eb-885c-405b-a301-e73f2bfc65b0",
    name:"organizerTest1",
    phoneNumber:"+91 12345 67999",
    email:"organizerTest1@gmail.com",
    role:"ORGANIZER",
    status:"APPROVED",
};

categoryServiceTest.pendingOrganizer={
    id:"eaabf406-e86d-4c6c-ad92-c039b66bff65",
    name:"Organiiizer2",
    phoneNumber:"1233211231",
    email:"organizer2@gmail.com",
    role:"ORGANIZER",
    status:"PENDING",
};

categoryServiceTest.pendingAdmin={
    id:"672593ca-face-4250-b9be-ae2437bd57b5",
    name:"admin2",
    phoneNumber:"9009000909",
    email:"admin2@gmail.com",
    role:"ADMIN",
    status:"PENDING",
};

// categoryServiceTest.validAdmin={
//     id:"7c2294c7-3efc-4690-9371-208688c1c240",
//     name:"admin1",
//     phoneNumber:"9999900000",
//     email:"admin1@gmail.com",
//     role:"ADMIN",
//     status:"APPROVED",
// };

categoryServiceTest.invalidCategoryId={
    id:"123",
    name:"dance"
}

categoryServiceTest.withoutId={
    name:"dance"
}
categoryServiceTest.validIdWithoutName={
    id:"76f4680c-838c-4350-8999-2c057d38e603"
}

categoryServiceTest.validIdExistingName={
    id:"76f4680c-838c-4350-8999-2c057d38e603",
    name:"pottery"
}


export default categoryServiceTest;