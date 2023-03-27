import { PrismaClient, Gyms, Prisma} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.users.upsert({
        where: { email: "user1@gmail.com" },
        update: {},
        create: {
            email: "user1@gmail.com",
            username: "user1",
            password: "password1",
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            credits: 0,
            calories: 0,
        }
    })

    const user2 = await prisma.users.upsert({
        where: { email: "user2@gmail.com" },
        update: {},
        create: {
            email: "user2@gmail.com",
            username: "user2",
            password: "password2",
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            credits: 0,
            calories: 0,
        }
    })

    const user3 = await prisma.users.upsert({
        where: { email: "user3@gmail.com" },
        update: {},
        create: {
            email: "user3@gamil.com",
            username: "user3",
            password: "password3",
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            credits: 0,
            calories: 0,
        }
    })

    const gymadmin1 = await prisma.users.upsert({
        where: { email: "gymadmin1@gmail.com" },
        update: {},
        create: {
            email: "gymadmin1@gmail.com",
            username: "gymadmin1",
            password: "gymadmin1",
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            credits: 0,
            calories: 0,
        }
    })

    const gymadmin2 = await prisma.users.upsert({
        where: { email: "gymadmin2@gmail.com" },
        update: {},
        create: {
            email: "gymadmin2@gmail.com",
            username: "gymadmin2",
            password: "gymadmin2",
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            credits: 0,
            calories: 0,
        }
    })

    const gymadmin3 = await prisma.users.upsert({
        where: { email: "gymadmin3@gmail.com" },
        update: {},
        create: {
            email: "gymadmin3@gmail.com",
            username: "gymadmin3",
            password: "gymadmin3",
            icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            credits: 0,
            calories: 0,
        }
    })

    const foodTypes = await prisma.foodTypes.upsert({
        where: {name: "LowCarbs"},
        update: {},
        create: {
            name: "LowCarbs",
            icon: "lowcarbs.png",
        },
    })

    const foodTypes2 = await prisma.foodTypes.upsert({
        where: {name: "HighProtein"},
        update: {},
        create: {
            name: "HighProtein",
            icon: "highprotein.png",
        },
    })

    const intensities = await prisma.intensities.upsert({
        where: {level: "Low"},
        update: {},
        create: {
            level: "Low",
        },
    })

    const intensities2 = await prisma.intensities.upsert({
        where: {level: "Medium"},
        update: {},
        create: {
            level: "Medium",
        },
    })

    const intensities3 = await prisma.intensities.upsert({
        where: {level: "High"},
        update: {},
        create: {
            level: "High",
        },
    })

    const attendanceValue: Prisma.AttendanceTypesCreateInput[] = [
        {details: "pending"},
        {details: "attended"},
        {details: "absent"}
    ]
    const attendanceInsert = await prisma.attendanceTypes.createMany({
        data: attendanceValue
    })
    // const attendanceTypes = await prisma.attendanceTypes.upsert({
    //     where: {details: "attennded"},
    //     update: {},
    //     create: {
    //         details: "attennded",
    //     },
    // })

    // const attendanceTypes2 = await prisma.attendanceTypes.upsert({
    //     where: {},
    //     update: {},
    //     create: {
    //         details: "pending",
    //     },
    // })

    const subPlansValue :Prisma.SubPlansCreateInput[] = [
        {name: "Basic",
        unlimited: false,
        credits: 10,
        fee: 2750,
        duration: 30,},
        {name: "Premium",
        unlimited: true,
        credits: 99999,
        fee: 5999,
        duration: 30,}
    ]
    const subPlansInsert = await prisma.subPlans.createMany({
        data:subPlansValue
    })

    // const subPlans = await prisma.subPlans.upsert({
    //     where: {},
    //     update: {},
    //     create: {
    //         name: "Basic",
    //         unlimited: false,
    //         credits: 10,
    //         fee: 2750,
    //         duration: 30,
    //     },
    // })

    // const subPlans2 = await prisma.subPlans.upsert({
    //     where: {},
    //     update: {},
    //     create: {
    //         name: "Premium",
    //         unlimited: true,
    //         credits: 99999,
    //         fee: 5999,
    //         duration: 30,
    //     },
    // })


    const districts1 = await prisma.districts.upsert({
        where: { name: "CausewayBay" },
        update: {},
        create: {
            name: "CausewayBay",
        },
    })

    const district2 = await prisma.districts.upsert({
        where: { name: "Central" },
        update: {},
        create: {
            name: "Central",
        },
    })

    const district3 = await prisma.districts.upsert({
        where: { name: "Wan Chai" },
        update: {},
        create: {
            name: "Wan Chai"
        },
    })

    const district4 = await prisma.districts.upsert({
        where: { name: "Tsim Sha Tsui" },
        update: {},
        create: {
            name: "Tsim Sha Tsui"
        },
    })

    const district5 = await prisma.districts.upsert({
        where: { name: "Monk Kok" },
        update: {},
        create: {
            name: "Monk Kok"
        }
    })

    const franchise1 = await prisma.franchise.upsert({
        where: { name: "PureFitness" },
        update: {},
        create: {
            name: "PureFitness",
            email: "purefitness@gmail",
            telephone: "12345678",
        },
    })

    const franchise2 = await prisma.franchise.upsert({
        where: { name: "24/7Fitness" },
        update: {},
        create: {
            name: "24/7Fitness",
            email: "247fitness@gmail",
            telephone: "23456789",
        },
    })

    const franchise3 = await prisma.franchise.upsert({
        where: { name: "SnapFitness" },
        update: {},
        create: {
            name: "SnapFitness",
            email: "Snapfitness@gmail",
            telephone: "34567890",
        },
    })


    const gym1 = await prisma.gyms.upsert({
        where: { username: "purefitnesscausewaybay" },
        update: {},
        create: {
            name: "PureFitness Causeway Bay",
            username: "purefitnesscausewaybay",
            password: "purefitnesscausewaybay",
            opening_hour: 1000,
            closing_hour: 2300,
            no_close: false,
            address: "Shop 101, 1/F, 1-3 Paterson Street, Causeway Bay, Hong Kong",
            google_position: "22.2793,114.1827",
            franchise_id: franchise1.id,
            district_id: districts1.id,
        } as Gyms & { franchise_id?: number, district_id?: number },
    })

    const gym2 = await prisma.gyms.upsert({
        where: { username: "purefitnesscentral" },
        update: {},
        create: {
            name: "PureFitness Central",
            username: "purefitnesscentral",
            password: "purefitnesscentral",
            opening_hour: 1000,
            closing_hour: 2300,
            no_close: false,
            address: "Shop 1001, 10/F, 27-29 Paterson Street, Central, Hong Kong",
            google_position: "24.6744,117.1298",
            franchise_id: franchise1.id,
            district_id: district2.id,
        } as Gyms & { franchise_id?: number, district_id?: number },
    })

    const gym3 = await prisma.gyms.upsert({
        where: { username: "purefitnesswanchai" },
        update: {},
        create: {
            name: "PureFitness Wan Chai",
            username: "purefitnesswanchai",
            password: "purefitnesswanchai",
            opening_hour: 1000,
            closing_hour: 2300,
            no_close: false,
            address: "Shop 101, 1/F, 39 Hinnessy Road,Wan Chai, Hong Kong",
            google_position: "19.1568,104.3564",
            franchise_id: franchise1.id,
            district_id: district3.id,
        } as Gyms & { franchise_id?: number, district_id?: number },
    })

    const gym4 = await prisma.gyms.upsert({
        where: { username: "purefitnesstsimshatsui" },
        update: {},
        create: {
            name: "PureFitness Tsim Sha Tsui",
            username: "purefitnesstsimshatsui",
            password: "purefitnesstsimshatsui",
            opening_hour: 1000,
            closing_hour: 2300,
            no_close: false,
            address: "Shop 501, 5/F, 1-3 Star Road, Tsim Sha Tsui, Hong Kong",
            google_position: "19.1568,104.3564",
            franchise_id: franchise1.id,
            district_id: district4.id,
        } as Gyms & { franchise_id?: number, district_id?: number },
    })

    const gym5 = await prisma.gyms.upsert({
        where: { username: "purefitnessmonkkok" },
        update: {},
        create: {
            name: "PureFitness Monk Kok",
            username: "purefitnessmonkkok",
            password: "purefitnessmonkkok",
            opening_hour: 1000,
            closing_hour: 2300,
            no_close: false,
            address: "Shop 301, 3/F, 11-15 Neton Road, Monk Kok, Hong Kong",
            google_position: "19.1568,104.3564",
            franchise_id: franchise1.id,
            district_id: district5.id,
        } as Gyms & { franchise_id?: number, district_id?: number },
    })

    const gym6 = await prisma.gyms.upsert({
        where: { username: "247fitnesscausewaybay" },
        update: {},
        create: {
            name: "247Fitness Causeway Bay",
            username: "247fitnesscausewaybay",
            password: "247fitnesscausewaybay",
            opening_hour: 1000,
            closing_hour: 2000,
            no_close: true,
            address: "Shop 101, 1/F, 1-3 LeaGarden, Causeway Bay, Hong Kong",
            google_position: "22.2793,114.1827",
            franchise_id: franchise2.id,
            district_id: districts1.id,
        } as Gyms & { franchise_id?: number, district_id?: number },
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
