import {organizerAdminApproval, organizersAdminsList, approval} from "../services/admin.service"
import adminTestData from "../testData/admin.services.test.data"
import { describe, test } from "node:test"
import assert from "node:assert"

describe("Admin & Organizer List", ()=>{
    test("It should return 401 for trying to access as a User", async()=>{
        const result= await organizersAdminsList({},adminTestData.user)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Admin & Organizer List", ()=>{
    test("It should return 401 for trying to access as a Organizer", async()=>{
        const result= await organizersAdminsList({},adminTestData.organizer)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Admin & Organizer List", ()=>{
    test("It should return 401 for trying to access as a pending Organizer", async()=>{
        const result= await organizersAdminsList({},adminTestData.pendingOrganizer)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Admin & Organizer List", ()=>{
    test("It should return 401 for trying to access as a pending Admin", async()=>{
        const result= await organizersAdminsList({},adminTestData.pendingAdmin)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Admin & Organizer List", ()=>{
    test("It should return 200 for trying to access as a pending Admin", async()=>{
        const result= await organizersAdminsList({},adminTestData.validAdmin)
        assert.strictEqual(result.status, 200);
        assert.strictEqual(result.message, "Successful")
    })
})

describe("Event Approval", ()=>{
    test("It should return 401 for trying to access as a User", async()=>{
        const result= await approval({},adminTestData.user)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Event Approval", ()=>{
    test("It should return 401 for trying to access as a Organizer", async()=>{
        const result= await approval({},adminTestData.organizer)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Event Approval", ()=>{
    test("It should return 401 for trying to access as a pending Organizer", async()=>{
        const result= await approval({},adminTestData.pendingOrganizer)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Event Approval", ()=>{
    test("It should return 401 for trying to access as a pending Admin", async()=>{
        const result= await approval({},adminTestData.pendingAdmin)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Event Approval", ()=>{
    test("It should return 401 for trying to approve not existing event", async()=>{
        const result= await approval(adminTestData.notExistingEventId,adminTestData.validAdmin)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "No event found")
    })
})

describe("Event Approval", ()=>{
    test("It should return 400 for trying to approve already approved event", async()=>{
        const result= await approval(adminTestData.alreadyApprovedEventId,adminTestData.validAdmin)
        assert.strictEqual(result.status, 400);
        assert.strictEqual(result.message, "Already approved")
    })
})

describe("Organizer or Admin Approval", ()=>{
    test("It should return 401 for trying to access as a User", async()=>{
        const result= await organizerAdminApproval({},adminTestData.user)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Organizer or Admin Approval", ()=>{
    test("It should return 401 for trying to access as a Organizer", async()=>{
        const result= await organizerAdminApproval({},adminTestData.organizer)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Organizer or Admin Approval", ()=>{
    test("It should return 401 for trying to access as a pending Organizer", async()=>{
        const result= await organizerAdminApproval({},adminTestData.pendingOrganizer)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Organizer or Admin Approval", ()=>{
    test("It should return 401 for trying to access as a pending Admin", async()=>{
        const result= await organizerAdminApproval({},adminTestData.pendingAdmin)
        assert.strictEqual(result.status, 401);
        assert.strictEqual(result.message, "UnAuthorized person")
    })
})

describe("Organizer or Admin Approval", ()=>{
    test("It should return 401 for trying to approve not existing Organizer or Admin id", async()=>{
        const result= await organizerAdminApproval(adminTestData.notExistingOrganizerOrAdminId,adminTestData.validAdmin)
        assert.strictEqual(result.status, 404);
        assert.strictEqual(result.message, "No user found")
    })
})

describe("Organizer or Admin Approval", ()=>{
    test("It should return 400 for trying to approve already approved event", async()=>{
        const result= await organizerAdminApproval(adminTestData.alreadyApprovedOrganizerOrAdminId,adminTestData.validAdmin)
        assert.strictEqual(result.status, 400);
        assert.strictEqual(result.message, "Already Approved")
    })
})
