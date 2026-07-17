const register:any  = {}

const validData={
    name: "organizerTest",
    gender:"MALE",
    phone_number: "+91 12375 67999",
    email: "organizerTest@gmail.com",
    password: "Organizer@1",
    role:"ORGANIZER",
    address: "Kandhachavadi",
    pincode: "654321"
}

register.existingEmail={
    name: "organizer3",
    gender:"MALE",
    phone_number: "+91 12345 67899",
    email: "organizerTest1@gmail.com",
    password: "organizer",
    role:"ORGANIZER",
    address: "Kotturpuram",
    pincode: "654321"
}

register.withUnSatisfiedPassword={
    name: "organizer3",
    gender:"MALE",
    phone_number: "+91 12345 67899",
    email: "organizer@gmail.com",
    password: "organizer",
    role:"ORGANIZER",
    address: "Kotturpuram",
    pincode: "654321"
}

register.withoutName={
    gender:"MALE",
    phone_number: "+91 12345 67899",
    email: "organizer@gmail.com",
    password: "organizer",
    role:"ORGANIZER",
    address: "Kotturpuram",
    pincode: "654321"
}

register.withoutGender={
    name: "organizerTest",
    phone_number: "+91 12375 67999",
    email: "organizerTest@gmail.com",
    password: "Organizer@1",
    role:"ORGANIZER",
    address: "Kandhachavadi",
    pincode: "654321"
}

register.withoutPhoneNumber={
    name: "organizerTest",
    gender:"MALE",
    email: "organizerTest@gmail.com",
    password: "Organizer@1",
    role:"ORGANIZER",
    address: "Kandhachavadi",
    pincode: "654321"
}

register.withoutEmail={
    name: "organizerTest",
    gender:"MALE",
    phone_number: "+91 12375 67999",
    password: "Organizer@1",
    role:"ORGANIZER",
    address: "Kandhachavadi",
    pincode: "654321"
}

register. withoutPassword={
    name: "organizerTest",
    gender:"MALE",
    phone_number: "+91 12375 67999",
    email: "organizerTest@gmail.com",
    role:"ORGANIZER",
    address: "Kandhachavadi",
    pincode: "654321"
}

register.withoutRole={
    name: "organizerTest",
    gender:"MALE",
    phone_number: "+91 12375 67999",
    email: "organizerTest@gmail.com",
    password: "Organizer@1",
    address: "Kandhachavadi",
    pincode: "654321"
}

register.withoutAddress={
    name: "organizerTest",
    gender:"MALE",
    phone_number: "+91 12375 67999",
    email: "organizerTest@gmail.com",
    password: "Organizer@1",
    role:"ORGANIZER",
    pincode: "654321"
}

register.withoutPincode={
    name: "organizerTest",
    gender:"MALE",
    phone_number: "+91 12375 67999",
    email: "organizerTest@gmail.com",
    password: "Organizer@1",
    role:"ORGANIZER",
    address: "Kandhachavadi",
}

const login:any = {}

login.withoutEmail={
    password:"123"
}

login.withoutPassword={
    email:"abc@gmail.com"
}

login.wrongMail={
    email:"123@gmail.com",
    password:"Organizer@1"
}

login.wrongPassword={
    email:"organizerTest1@gmail.com",
    password:"Organizer"
}

login.validCredentials={
    email: "organizerTest1@gmail.com",
    password:"Organizer@1"
}


export default {register, login};

