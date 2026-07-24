import { PrismaClient, Gender, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");

  await prisma.payments.deleteMany();
  await prisma.sold_Tickets.deleteMany();
  await prisma.addresses.deleteMany();
  await prisma.approvals.deleteMany();
  await prisma.event_Schedules.deleteMany();
  await prisma.events.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.users.deleteMany();

  console.log("Creating Users...");

  await prisma.users.createMany({
    data: [
      {
        name: "Admin1",
        gender: Gender.MALE,
        phone_number: "9999900000",
        email: "admin1@gmail.com",
        password: "Admin@01",
        role: Role.ADMIN,
      },
      {
        name: "Admin2",
        gender: Gender.MALE,
        phone_number: "9999906000",
        email: "admin2@gmail.com",
        password: "Admin@01",
        role: Role.ADMIN,
      },
      {
        name: "Organizer1",
        gender: Gender.MALE,
        phone_number: "9090980808",
        email: "organizer1@gmail.com",
        password: "Organizer@1",
        role: Role.ORGANIZER,
      },
      {
        name: "Organizer2",
        gender: Gender.MALE,
        phone_number: "8080808080",
        email: "organizer2@gmail.com",
        password: "Organizer@1",
        role: Role.ORGANIZER,
      },
      {
        name: "User1",
        gender: Gender.MALE,
        phone_number: "1221212212",
        email: "user1@gmail.com",
        password: "User@001",
        role: Role.USER,
      },
      {
        name: "User2",
        gender: Gender.FEMALE,
        phone_number: "7777777777",
        email: "user2@gmail.com",
        password: "User@001",
        role: Role.USER,
      },
    ],
  });

  console.log("Creating Categories...");

  const Admin= await prisma.users.findFirst({
    where:{
        email:"admin1@gmail.com",
        role:Role.ADMIN
    }
  });

  await prisma.categories.createMany({
    data: [
      {
        name: "Pottery",
        created_by: Admin?.id??"",
      },
      {
        name: "Dance",
        created_by: Admin?.id??"",
      },
    ],
  });

  console.log("Creating Event...");

  const Category = await prisma.categories.findFirst({
    where:{
        name:"Pottery"
    }
  });
  const Organizer= await prisma.users.findFirst({
    where:{
        email:"organizer1@gmail.com",
        role: Role.ORGANIZER
    }
  })

  await prisma.events.create({
    data: {
      name: "Pottery Workshop",
      description: "Learn pottery",
      category_id: Category?.id??"",
      organizer_id: Organizer?.id??"",
    },
  });

  console.log("Creating Approval...");
  const Event= await prisma.events.findFirst({
    where:{
        name:"Pottery Workshop"
    }
  });

  await prisma.approvals.createMany({
    data: [
      {
        user_id: Admin?.id,
        approved_by: Admin?.id,
      },
      {
        user_id: Organizer?.id,
        // approved_by: Admin?.id,
      },
      {
        event_id: Event?.id??"",
      },
    ],
  });

  console.log("Creating Schedule...");

  await prisma.event_Schedules.create({
    data: {
      event_id: Event?.id??"",
      date: new Date("2026-10-10"),
      time: "10:00",
      price: 100,
      venue_capacity: 100,
    },
  });

  console.log("Creating Address...");

  const Schedule = await prisma.event_Schedules.findFirst();
  await prisma.addresses.create({
    data: {
      schedule_id: Schedule?.id,
      address: "Chennai",
      pincode: "600001",
    },
  });

  console.log("Creating Sold Tickets...");

  const User = await prisma.users.findFirst({
    where:{
        role: Role.USER
    }
  })

  await prisma.sold_Tickets.createMany({
    data: [
      {
        schedule_id: Schedule?.id??"",
        user_id: User?.id??"",
        seat_count: 2,
      },
      {
        schedule_id: Schedule?.id??"",
        user_id: User?.id??"",
        seat_count: 1,
      },
    ],
  });

  console.log("Creating Payments...");

  console.log("Seed completed successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });