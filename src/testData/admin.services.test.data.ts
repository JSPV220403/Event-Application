const adminServiceTest:any={}

adminServiceTest.user={
    id:"ae8882db-b577-4230-91fb-f72a7b353386",
    name:"user1",
    phoneNumber:"1221212212",
    email:"user1@gmail.com",
    role:"USER",
    status:"PENDING",
};

adminServiceTest.organizer={
    id:"8751959b-85d4-4f02-99de-57dae86ff6de",
    name:"Organizer1",
    phoneNumber:"9090980808",
    email:"organizer1@gmail.com",
    role:"ORGANIZER",
    status:"APPROVED",
};

adminServiceTest.pendingOrganizer={
    id:"eaabf406-e86d-4c6c-ad92-c039b66bff65",
    name:"Organiiizer2",
    phoneNumber:"1233211231",
    email:"organizer2@gmail.com",
    role:"ORGANIZER",
    status:"PENDING",
};

adminServiceTest.pendingAdmin={
    id:"672593ca-face-4250-b9be-ae2437bd57b5",
    name:"admin2",
    phoneNumber:"9009000909",
    email:"admin2@gmail.com",
    role:"ADMIN",
    status:"PENDING",
};

adminServiceTest.validAdmin={
    id:"7c2294c7-3efc-4690-9371-208688c1c240",
    name:"admin1",
    phoneNumber:"9999900000",
    email:"admin1@gmail.com",
    role:"ADMIN",
    status:"APPROVED",
};

adminServiceTest.notExistingEventId={
    id:"1234567"
}

adminServiceTest.alreadyApprovedEventId={
    id:"1f97ff24-4be6-423e-b3c4-36865ebd0a72"
}

adminServiceTest.notExistingOrganizerOrAdminId={
    id:"8989"
}

adminServiceTest.alreadyApprovedOrganizerOrAdminId={
    id:"7c2294c7-3efc-4690-9371-208688c1c240"
}

export default adminServiceTest;