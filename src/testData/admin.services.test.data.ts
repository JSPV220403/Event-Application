import { prisma } from "../prisma";

const getAdminServiceTest = async () => {
  const [
    user,
    organizer,
    pendingOrganizer,
    admin,
    pendingAdmin,
    Event,
  ] = await Promise.all([
    prisma.users.findFirst({
      where: {
        email: "user1@gmail.com",
      },
    }),

    prisma.users.findFirst({
      where: {
        email: "organizer1@gmail.com",
      },
    }),

    prisma.users.findFirst({
      where: {
        email: "organizer2@gmail.com",
      },
    }),

    prisma.users.findFirst({
      where: {
        email: "admin1@gmail.com",
      },
    }),

    prisma.users.findFirst({
      where: {
        email: "admin2@gmail.com",
      },
    }),

    prisma.events.findFirst({
        where:{
            name:"Pottery Workshop"
        }
    })
  ]);

  return {
    user: {
      id: user?.id,
      name: user?.name,
      phoneNumber: user?.phone_number,
      email: user?.email,
      role: user?.role,
      status: "PENDING",
    },

    organizer: {
      id: organizer?.id,
      name: organizer?.name,
      phoneNumber: organizer?.phone_number,
      email: organizer?.email,
      role: organizer?.role,
      status: "APPROVED",
    },

    pendingOrganizer: {
      id: pendingOrganizer?.id,
      name: pendingOrganizer?.name,
      phoneNumber: pendingOrganizer?.phone_number,
      email: pendingOrganizer?.email,
      role: pendingOrganizer?.role,
      status: "PENDING",
    },

    pendingAdmin: {
      id: pendingAdmin?.id,
      name: pendingAdmin?.name,
      phoneNumber: pendingAdmin?.phone_number,
      email: pendingAdmin?.email,
      role: pendingAdmin?.role,
      status: "PENDING",
    },

    admin: {
      id: admin?.id,
      name: admin?.name,
      phoneNumber: admin?.phone_number,
      email: admin?.email,
      role: admin?.role,
      status: "APPROVED",
    },

    notExistingEventId: {
      id: "1234567",
    },

    pendingEventId:{
        id: Event?.id,
    },

    alreadyApprovedEventId: {
      id: Event?.id,
    },

    notExistingOrganizerOrAdminId: {
      id: "8989",
    },

    alreadyApprovedOrganizerOrAdminId: {
      id: admin?.id,
    },
  };
};

export default getAdminServiceTest;