import { PrismaClient, Gyms, Prisma } from "@prisma/client";
import { hashPassword } from "../utils/hash";
import { UserSchedule } from "src/user_schedules/entities/user_schedule.entity";

const prisma = new PrismaClient();

async function main() {
    const subPlansValue: Prisma.SubPlansCreateInput[] = [
        {
            name: "Basic",
            unlimited: false,
            credits: 10,
            fee: 2750,
            duration: 30,
        },
        {
            name: "Premium",
            unlimited: true,
            credits: 9999,
            fee: 5999,
            duration: 30,
        }
    ]
    const subPlansInsert = await prisma.subPlans.createMany({
        data: subPlansValue
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

    const calorieTransactionAdd = await prisma.calorieTransactionType.create({
        data: {
            name: "add",
        }
    })

    const calorieTransactionMinus = await prisma.calorieTransactionType.create({
        data: {
            name: "minus"
        }
    })

    const user1 = await prisma.users.upsert({
        where: { email: "user1@gmail.com" },
        update: {},
        create: {
            email: "user1@gmail.com",
            username: "user1",
            password: await hashPassword('user1'),
            subscribed: true,
            sub_plan_id: 2,
            sub_plan_start: new Date('2023-04-01T17:00:00+08:00'),
            sub_plan_end: new Date(Date.now() + 2592000000),
            CalorieTransaction: {
                create: {
                    calorie: 3000,
                    transaction_type_id: 1,
                    details: "default",
                }
            }
        }
    })

    const user2 = await prisma.users.upsert({
        where: { email: "user2@gmail.com" },
        update: {},
        create: {
            email: "user2@gmail.com",
            username: "user2",
            password: await hashPassword('user2'),
            subscribed: true,
            sub_plan_id: 1,
            sub_plan_start: new Date('2023-04-01T17:00:00+08:00'),
            sub_plan_end: new Date(Date.now() + 2592000000),
            CalorieTransaction: {
                create: {
                    calorie: 1500,
                    transaction_type_id: 1,
                    details: "default",
                }
            }
        }
    })

    const user3 = await prisma.users.upsert({
        where: { email: "user3@gmail.com" },
        update: {},
        create: {
            email: "user3@gmail.com",
            username: "user3",
            password: await hashPassword('user3'),
            subscribed: true,
            sub_plan_id: 1,
            sub_plan_start: new Date('2023-04-01T17:00:00+08:00'),
            sub_plan_end: new Date(Date.now() + 2592000000),
            CalorieTransaction: {
                create: {
                    calorie: 0,
                    transaction_type_id: 1,
                    details: "default",
                }
            }
        }
    })

    const user4 = await prisma.users.upsert({
        where: { email: "user4@gmail.com" },
        update: {},
        create: {
            email: "user4@gmail.com",
            username: "user4",
            password: await hashPassword('user4'),
        }
    })

    const user5 = await prisma.users.upsert({
        where: { email: "user5@gmail.com" },
        update: {},
        create: {
            email: "user5@gmail.com",
            username: "user5",
            password: await hashPassword('user5'),
        }
    })

    const user6 = await prisma.users.upsert({
        where: { email: "user6@gmail.com" },
        update: {},
        create: {
            email: "user6@gmail.com",
            username: "user6",
            password: await hashPassword('user6'),
        }
    })

    const foodTypes = await prisma.foodTypes.upsert({
        where: { name: "Low Carbs" },
        update: {},
        create: {
            name: "Low Carbs",
            icon: "lowcarbs.png",
        },
    })

    const foodTypes2 = await prisma.foodTypes.upsert({
        where: { name: "High Protein" },
        update: {},
        create: {
            name: "High Protein",
            icon: "highprotein.png",
        },
    })

    const foodTypes3 = await prisma.foodTypes.upsert({
        where: { name: "Recommended" },
        update: {},
        create: {
            name: "Recommended",
            icon: "recommended.png",
        },
    })

    const foodTypes4 = await prisma.foodTypes.upsert({
        where: { name: "Whey Protein" },
        update: {},
        create: {
            name: "WheyProtein",
            icon: "wheyprotein.png",
        },
    })

    const foodTypes5 = await prisma.foodTypes.upsert({
        where: { name: "SNACKS AND DRINKS" },
        update: {},
        create: {
            name: "SNACKS AND DRINKS",
            icon: "snacks.png",
        },
    })

    const food1 = await prisma.foods.upsert({
        where: { name: "MEATBALLS WITH SPANAKOPITA RICE" },
        update: {},
        create: {
            name: "MEATBALLS WITH SPANAKOPITA RICE",
            image: "Meatballs-with-Spanakopita-Rice_1120x.webp",
            calories: 536,
            description: "Our Meatballs and Spanakopita Rice dish is a highly nutritious, low-fat source of Vitamin E, B, and Potassium that boosts energy and well-being.",
            ingredients: { ingredients: "Spanakopita rice (44.1%), Basmati Rice (99.9%), Curly Kale (24%), Olive Oil (3.4%), Beef Meatballs (44.1%), Tomato and Basil Sauce (11.8%), Carrots (5.5%), Onions (4.4%), Olive Oil (2.6%), Basil (0.66%), Salt (0.22%), Dried basil (0.09%), White pepper (0.04%)." },
            allergens: [],
            food_type_id: 3,
        },
    })

    const food2 = await prisma.foods.upsert({
        where: { name: "BEEF MEX LOADED & SWEET POTATO" },
        update: {},
        create: {
            name: "BEEF MEX LOADED & SWEET POTATO",
            image: "BEEF-MEX-LOADED-_-SWEET-POTATO_1120x.webp",
            calories: 406,
            description: "Enjoy our natural and flavorful Mexican beef with sweet potato - a wholesome meal that boosts your immune system and body function.",
            ingredients: { ingredients: "Sweet Potato (55%), Chilli Con Carne (41.7%), Carrots (5.9%), Diced Tomatoes (5.9%), Red Chilli Peppers (5.9%), Kidney Beans (5.9%), Onions (0.88%), Lemon Juice (0.59%), Ground Cinnamon (0.29%), Garlic (0.29%), Cumin Seeds (0.29%), Chilli Powder (0.29%), Mozzarella Cheese (3.3%), Salt, Non-animal Rennet." },
            allergens: ["Dairy"],
            food_type_id: 3,
        },
    })

    const food3 = await prisma.foods.upsert({
        where: { name: "CREAMY CHICKEN KORMA" },
        update: {},
        create: {
            name: "CREAMY CHICKEN KORMA",
            image: "Creamy-Chicken-Korma_1120x.webp",
            calories: 290,
            description: "Improve your digestive health and brain function with our slow-cooked Korma dish, rich in ancient herbs and spices that can lower blood sugar and blood pressure levels.",
            ingredients: { ingredients: "Chicken (41.5%), Coconut Milk Canned (33.2%), Peas (10.4%), Broccoli (6.5%), Coriander Seeds (1.2%), Onions (1.1%), Ginger Paste (1%), Chaat Masala Spice Blend (0.79%), Garlic (0.62%), Turmeric (0.46%)." },
            allergens: [],
            food_type_id: 3,
        },
    })

    const food4 = await prisma.foods.upsert({
        where: { name: "CHILLI CON CARNE" },
        update: {},
        create: {
            name: "CHILLI CON CARNE",
            image: "chilliconcarne_1120x.webp",
            calories: 478,
            description: "With its hotly-contested origins, our Chilli con Carne spice stew has enormous appeal as a healthy, low-fat option that will kick start your metabolism. Containing chilli peppers, ground meat, tomatoes together with garlic and onions, this dish is sure to ignite visions of Texas or Mexico!!!! ",
            ingredients: { ingredients: "Chilli Con Carne (55.7%), Carrots (5.9%), Diced Tomatoes (5.9%), Red Chilli Peppers (5.9%), Kidney Beans (5.9%), Onions (0.88%), Lemon Juice (0.59%), Ground Cinnamon (0.29%), Garlic (0.29%), Cumin Seeds (0.29%), Chilli Powder (0.29%)], Basmati Rice (42.6%), Parsley (1.6%)." },
            allergens: [],
            food_type_id: 3,
        },
    })

    const food5 = await prisma.foods.upsert({
        where: { name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE", },
        update: {},
        create: {
            name: "PORTUGUESE CHICKEN WITH BROCCOLI RICE",
            calories: 353,
            image: "Portuguese-Chicken-with-Broccoli-Rice_1120x.webp",
            description: "Ignite the senses with the superfood which superbly caters to all your health needs. Broccoli Rice is not only fat-free but also has powerful antioxidant and anti-inflammatory qualities to supercharge your metabolism. The succulently curated Portuguese chicken, not only juicy and crunchy but heavenly due to its earthy and aromatic qualities designed to invigorate your taste buds.",
            ingredients: { ingredients: "Broccoli Rice (46.9%) [Broccoli, Onion, Garlic, Lemon Juice], Portuguese Chicken (40.6%) [Chicken, Dried Spices, Garlic, Chilli, Salt, Pepper], Portuguese Marinade (12.5%), Iodised Salt, Sugar Garlic, Onion, Vegetable Fat, Potato Starch, Mineral Salt (Potassium Chloride) SPICES: Chilli (13%), Paprika HERBS: Oregano, Parsley (1%)." },
            allergens: [],
            food_type_id: 1,
        },
    })

    const food6 = await prisma.foods.upsert({
        where: { name: "CHIPOTLE CHICKEN BURRITO BOWL" },
        update: {},
        create: {
            name: "CHIPOTLE CHICKEN BURRITO BOWL",
            calories: 675,
            image: "ChipotleChickenWorkoutMeals_1120x.jpg",
            description: "A delectable classic with seasoned chicken breast pieces, black beans, basmati Rice and colourful vegetable mix lightly covered in chipotle mayo.",
            ingredients: { ingredients: "Basmati Bean Mix (35%)[Water,  Basmati Rice, Black Beans), Taco Chicken (33%)[Diced Chicken Breast (33%), Canola Oil, Taco Seasoning (Natural Flavour, Yeast Extract, Oleoresin Spice Extracts, Food Acid (330)], Chipotle Sauce (18%) [Mayonnaise (2%) (Free-Range Whole Egg, Food Acid (330), Colour (161b), Sour Cream (Milk, Cultures), Chipotle Peppers (Food Acid (260)), Lemon Juice (Preservative (202)), Corn Starch, Smoky Chipotle Powder, Garlic, Salt, Sugar] Capsicum Onion Mix (13%)(Red Capsicum, Yellow Capsicum, Onion, Red Cabbage, Canola Oil, Taco Seasoning, Salt)" },
            allergens: ["Gluten", "Wheat", "Peanuts"],
            food_type_id: 3,
        },
    })

    const food7 = await prisma.foods.upsert({
        where: { name: "MANGO CHICKEN & BASMATI RICE" },
        update: {},
        create: {
            name: "MANGO CHICKEN & BASMATI RICE",
            calories: 419,
            image: "MangoChickenWorkoutMeals_1120x.jpg",
            description: "Mango Chicken with corn, peas and basmati rice.",
            ingredients: { ingredients: "Chicken Breast 36%, Corn, Pea & Basmati Rice36%, Mango Chicken Sauce (Mango Frozen, Red Capsicum, Coriander, Cream coconut, Thickened Cream, garlic, ginger, sweet chilli sauce, Spanish onion, olive oil, corn flour 27%, " },
            allergens: ["Dairy", "Gluten"],
            food_type_id: 3,
        },
    })

    const food8 = await prisma.foods.upsert({
        where: { name: "DELUXE CHICKEN & QUINOA BROWN RICE" },
        update: {},
        create: {
            name: "DELUXE CHICKEN & QUINOA BROWN RICE",
            calories: 409,
            image: "DeluxeChickenWorkoutMeals_1120x.jpg",
            description: "Chicken Breast with Quinoa brown rice.",
            ingredients: { ingredients: "Chicken Breast36%, Vegetable Quinoa Brown Rice 36%, Deluxe Sauce (Onion Brown, Mushroom, Thickened Cream, Butter unsalted, Parsley, Salt, Capsicum red, Chili, Oregano, Vegeta )27%" },
            allergens: ["Dairy"],
            food_type_id: 3,
        },
    })

    const food9 = await prisma.foods.upsert({
        where: { name: "CRUMBED CHICKEN PARMIGIANA" },
        update: {},
        create: {
            name: "CRUMBED CHICKEN PARMIGIANA",
            calories: 435,
            image: "Low-Carb-Chicken-Parmigiana_1120x.jpg",
            description: "Our exquisitely prepared Chicken Parmigiana with Roasted Potatoes and Peas dish will improve your overall health biomarkers, but the added protein will curb your cravings.",
            ingredients: { ingredients: "Panko Crumbed Chicken 46%, Roasted Potato 30%, Napolitana Sauce 6% (Tomato crushed, Onion Brown, Olive Oil, Basil, Garlic, Pepper, Salt, Sugar white, Vegeta, Tomato Past), Peas 12%, Cheese (Cheese Mozzarella, Cheese Cheddar) 6%" },
            allergens: ["Dairy", "Gluten"],
            food_type_id: 1,
        },
    })

    const food10 = await prisma.foods.upsert({
        where: { name: "BUTTER CHICKEN & CAULIFLOWER RICE" },
        update: {},
        create: {
            name: "BUTTER CHICKEN & CAULIFLOWER RICE",
            calories: 438,
            image: "ButterChickenCauliflowerRiceWorkoutMeals_1120x.webp",
            description: "Moroccan Chicken with cauliflower rice",
            ingredients: { ingredients: "Cauliflower (33%), Chicken Tenderloin (32%), Water, Green Peas (3.5%), Corn (3.5%), Crushed Tomato (Tomatoes, Tomato Juice, Citric Acid), Thickened Cream (Milk), Onion, Tandoori Paste ((1.23%) Oil, Durum Wheat Semolina, Salt, Sugar, Acetic Acid, Citric Acid, Cumin, Ginger, Chilli, Mustard, Coriander, Cinnamon, Garlic, Paprika, Onion, Fenugreek, Colour, Celery Seeds, Stabilisers, Black Pepper), Yoghurt (Milk), Vegetable Oil (Soybean), Ghee (Milk), Salt, Garlic Crushed, Ginger Crushed (Soybean), Cumin, Paprika, Curry Powder, Garam Masala, Sugar, Cayenne Pepper, Chilli, Cinnamon, Turmeric. Black Mustard Seeds, Curry Leaves, Lemon Juice" },
            allergens: ["Milk", "tree nut", "soybean"],
            food_type_id: 2,
        },
    })

    const food11 = await prisma.foods.upsert({
        where: { name: "MOROCCAN CHICKEN & PUMPKIN PUREE" },
        update: {},
        create: {
            name: "MOROCCAN CHICKEN & PUMPKIN PUREE",
            calories: 333,
            image: "MoroccanChicken_PumpkinPuree_1120x.webp",
            description: "Moroccan Chicken with pumpkin puree and vegetables.",
            ingredients: { ingredients: "Chicken Tenderloin (36%), Thickened Cream (Milk), Pumpkin (18%), Green Peas (15%), Potato (9%), Vegetable Oil (Soybean), Butter (Milk), Moroccan Spice ((1.05%) Salt, Chicken Flavour, Pepper, Garlic, Sugar, Rice Flour, Onion, Paprika, Rosemary, Turmeric, Citric Acid, Capsicum, Coriander, Cumin, Vegetable Oil, Lemon Oil, Ginger), Water, Salt, Roasted Red Pepper, Honey, Red Hot Pepper, Cumin, Sweet Paprika, Coriander, Parsley, Lemon Juice, White Pepper, Garlic Crushed, Carraway." },
            allergens: ["Milk", "Soybean"],
            food_type_id: 2,
        },
    })

    const food12 = await prisma.foods.upsert({
        where: { name: "HONEY SOY CHICKEN STIR FRY" },
        update: {},
        create: {
            name: "HONEY SOY CHICKEN STIR FRY",
            calories: 367,
            image: "Honey-Soy-Chicken-Stir-Frycopy_1120x.webp",
            description: "Keep it fresh – keep it simple. We use Basmati rice, it's gluten-free and low in fat. It contains all eight essential amino acids, folic acid, and is low in sodium, and has no cholesterol. With a delectable honey soy sauce for maximum flavour and a perfectly tangy mouth-watering result.",
            ingredients: { ingredients: "Honey Soy Chicken Stir-fry (52.5%), Green Beans (6.7%), Broccoli (6.7%), Carrots (3.3%), Oyster Sauce (3.3%), Onions (3.3%), Red Chilli Peppers (3.3%), Honey (2.3%), Low Sodium SOY Sauce (2%), Garlic (1%), Chilli Flakes (0.73%), Basmati Rice (45.9%), Spring onions (1.6%)." },
            allergens: ["Gluten", "Molluscs", "Soy"],
            food_type_id: 2,
        },
    })

    const food13 = await prisma.foods.upsert({
        where: { name: "THAI GREEN CURRY WITH CAULIFLOWER RICE" },
        update: {},
        create: {
            name: "THAI GREEN CURRY WITH CAULIFLOWER RICE",
            calories: 244,
            image: "Thai-Green-Curry-with-Cauliflower-Rice_1120x.webp",
            description: "Our famous Thai Green curry will ignite your exotic journey to superfood heaven! Awash with tantalising herbs and spices experience the wonders of the orient without leaving home!",
            ingredients: { ingredients: "Chicken, Coconut Cream, Water, Onion, Broccoli, Carrot, Capsicum, Green Curry Paste, kaffir lime peel, coriander seed, pepper, cumin, turmeric, Vegetable Oil, Garlic, Salt, Kaffir lime powder Cauliflower." },
            allergens: ["null"],
            food_type_id: 1,
        },
    })

    const food14 = await prisma.foods.upsert({
        where: { name: "BUTTER CHICKEN & BASMATI RICE" },
        update: {},
        create: {
            name: "BUTTER CHICKEN & BASMATI RICE",
            calories: 475,
            image: "ButterChickenWorkoutMeals_1120x.jpg",
            description: "A creamy and scrumptious dish loaded rich in protein chicken promotes excellent brain function and keeps the immune system strong. An excellent source of Vitamin B6 and B12!  This meal also reduces appetite and hunger levels whilst boosting your metabolism.",
            ingredients: { ingredients: "Chicken Breast 36%g, Basmati Rice Pea & Corn 36%, Butter chicken Sauce (Butter Chicken Mix, Ghee, Brown onion, ginger, Garlic, Tomato Puree, Sugar brown, Thickened Cream, Butter Unsalted, Paprika sweet, Turmeric, Cumin, Salt, Chicken Stock, Food Colouring, Tomato Paste, Cashew Paste, Fenugreek leaves, Chilli powder, Garam Masala) 27%. " },
            allergens: ["Dairy, Tree nut"],
            food_type_id: 3
        },
    })

    const food15 = await prisma.foods.upsert({
        where: { name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE" },
        update: {},
        create: {
            name: "BLACK PEPPER BEEF, PICKLED CABBAGE & VEGGIE FRIED RICE",
            calories: 340,
            image: "BlackPepperBeef_1120x.jpg",
            description: "Tge pepper make you eat more!",
            ingredients: { ingredients: "Black Pepper Beef (50%) [Beef (70%), Black Pepper Sauce (30%) [Water (53.1%), Oyster Sauce (26.5%), Low Sodium SOY Sauce (13.3%) (WHEAT), Corn Flour (3.2%) [Cornflour], Sugar (2.7%), White Pepper (1.3%) [Pepper]]], Brown Veggie Fried Rice (33.3%) [Brown Rice (60.3%), Carrots (9%), Bean Sprouts (9%), Broccoli Rice (9%) [Broccoli, Shallot, Garlic, Lemon Juice], Fried Rice Dressing (7.5%) [Oyster Sauce (52.6%), SESAME Oil (28.6%), Low Sodium SOY Sauce (10.5%) (WHEAT), Garlic (7.9%), Olive Oil (0.44%)], Shallot (5.1%)], Sour Cabbage (16.7%) [Cabbage (54.3%), Rice Vinegar (24.4%), Ginger (10.9%), Olive Oil (5.8%), Brown Sugar (2.7%), Low Sodium SOY Sauce (1.1%) (WHEAT), Mustard Seed, Yellow (0.27%), Fennel Seeds (0.27%), Chinese Five Spice (0.27%)]" },
            allergens: ["Soy, Wheat, Sesame"],
            food_type_id: 2,
        },
    })

    const food16 = await prisma.foods.upsert({
        where: { name: "MOROCCAN MEATBALLS & COUS COUS" },
        update: {},
        create: {
            name: "MOROCCAN MEATBALLS & COUS COUS",
            calories: 689,
            image: "MoroccanMeatballsWorkoutMeals_1120x.jpg",
            description: "A delectable classic with Beef Meatballs with a Moroccan Style sauce served with Roasted pumpkin and Couscous.",
            ingredients: { ingredients: "Moroccan Sauce [Roasted Capsicum [Red Peppers (60%), Water, Vinegar, Salt, Sugar], Passata [Tomato, Acidity regulator (330)], Diced Onion, Water, Canola Oil, Tomato Paste [Tomato Paste, Acidity regulator (330)], Crushed Garlic [Garlic, Salt], Corn Starch, Salt, Coriander, Ground Coriander, Ground Cumin, Smoked Paprika, Caraway Seeds, Ground Black Pepper, Preservative (234) [Nisin, Sodium chloride]], SUB4034 Couscous Cooked [Couscous [Durum Wheat Semolina, Water], Water, Canola Oil, Salt, Ground Black Pepper], SUB1003 Beef & Oregano Meatballs Cooked [Meatballs [Beef, Water, Onion, Rice Flour, Vegetable Fibre (460), Salt, Dextrose, Vegetable Powders, Pea Protein, Acidity Regulator (331), Vegetable Gums (407, 415), Yeast Extract, Hydrolysed Vegetable Protein (Maize), Gluten Free Breadcrumbs [rice Flour, Maize Flour, Mineral Salts 450, 500], Dried Oregano, Herbs And Spices]], SUB3004 Roasted Pumpkin 30mm Skin On [Pumpkin Diced 3x3, Canola Oil, Salt, Ground Black Pepper], SUB3033 Roasted Chickpeas [Chickpeas [Chickpeas (60%), Water, Salt], Canola Oil, Salt, Cracked Black Pepper]" },
            allergens: ["Gluten"],
            food_type_id: 2,
        },
    })

    const food17 = await prisma.foods.upsert({
        where: { name: "BEEF BOLOGNESE & PASTA" },
        update: {},
        create: {
            name: "BEEF BOLOGNESE & PASTA",
            calories: 663,
            image: "Beef-Bolognese-_-Pasta_1120x.webp",
            description: "Experience a heavenly journey to Bella Roma with our flavoursome beef bolognese dish straight from Nonna's kitchen chockfull of tasty goodness and healthy life-enhancing good fats!",
            ingredients: { ingredients: "Pasta (50%), Bolognese (50%), Carrots (10%), Onions (6.7%), Olive Oil (3.3%), White Pepper (0.47%), Salt (0.4%), Italian Herbs (0.27%)." },
            allergens: ["Gluten"],
            food_type_id: 3,
        },
    })

    const food18 = await prisma.foods.upsert({
        where: { name: "BEEF HOKKIEN NOODLES" },
        update: {},
        create: {
            name: "BEEF HOKKIEN NOODLES",
            calories: 435,
            image: "beef-hokkien-noodles_1120x.jpg",
            description: "Beef Hokkien Noodles with sesame.",
            ingredients: { ingredients: "Ingredients: Beef (40%), Hokkien Noodle (24%) (Wheat Flour, Water, Vegetable Oil, Salt, Colours (102, 110)), Onion (13%), Capsicum (13%), Ginger (4%), Garlic (2%), Rice Malt Syrup (2%), Olive Oil (1%), Tamari Sauce (SOY), Sesame Seeds (SESAME). " },
            allergens: ["Soy", "Wheat", "Sesame"],
            food_type_id: 3,
        },
    })

    const food19 = await prisma.foods.upsert({
        where: { name: "PEPPERCORN STEAK & CHIPS" },
        update: {},
        create: {
            name: "PEPPERCORN STEAK & CHIPS",
            calories: 260,
            image: "ScreenShot2021-05-24at12.14.12pm.webp",
            description: "Celebrate everything great about classic Aussie pub meals without the calorific overload. We have re-created this classic traditional dish using organic condiments to add extra zest and relish to an already epic meal combination.",
            ingredients: { ingredients: "White Potato Chips (43.7%), Beef (43.7%), Water, Cream, Pink Pepper, Green Pepper, Spices, Canola Oil, Dijon Mustard, Onion, Garlic, Green Peas." },
            allergens: ["Dairy"],
            food_type_id: 2,
        },
    })

    const food20 = await prisma.foods.upsert({
        where: { name: "THYME LEMON CHICKEN & PUMPKIN PUREE" },
        update: {},
        create: {
            name: "THYME LEMON CHICKEN & PUMPKIN PUREE",
            calories: 316,
            image: "ThymeLemonChicken_PumpkinPureeWorkoutMeals_1120x.webp",
            description: "Moroccan Chicken with cauliflower rice",
            ingredients: { ingredients: "Chicken Tenderloin (36%), Pumpkin (30%), Chicken Stock ((12%) Water, Chicken, Carrots, Celery, Cabbage, Onions, Parsley, Sage Extract, Natural Antioxidant (Rosemary Extract), Sugar, Salt, Glucose, Yeast Extract), Green Peas (15%), Butter (Milk), Thickened Cream (Milk), Vegetable Oil (Soybean), Vegetable Stock Powder, Lemon Juice (1.40%), Corn Flour Wheaten (Wheat), Water, Salt, Sugar, Thyme (0.04%), Garlic Crushed, White Pepper." },
            allergens: ["Milk", "Wheat"],
            food_type_id: 1,
        },
    })

    const food21 = await prisma.foods.upsert({
        where: { name: "MONGOLIAN BEEF WITH BROWN RICE" },
        update: {},
        create: {
            name: "MONGOLIAN BEEF WITH BROWN RICE",
            calories: 437,
            image: "MongolianBeef_1120x.webp",
            description: "Visit the orient and experience our mouthwatering and tantalising Mongolian beef dish crammed with zesty herbs and spices to ignite the senses.",
            ingredients: { ingredients: "Beef (68.4%), Brown Rice (19%), Soy sauce (3%), Rice Vinegar (2.3%), Hoisin Sauce (2.3%), Olive Oil (1.6%), Garlic minced (1.5%), Cornstarch (0.76%), Spring Onion Raw (0.76%), Sesame seeds (0.3%)." },
            allergens: ["Wheat", "Soy", "Sesame"],
            food_type_id: 3,
        },
    })

    const food22 = await prisma.foods.upsert({
        where: { name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES" },
        update: {},
        create: {
            name: "ASIAN CHICKEN STIR FRY & HOKKIEN NOODLES",
            calories: 513,
            image: "AsianChickenStirFryWorkoutMeals_1120x.jpg",
            description: "A delectable classic with Asian Chicken Stir Fry & Hokkien Noodles!",
            ingredients: { ingredients: "Water, Higher Welfare Chicken (18%), Hokkien Noodles (17%) [Wheat Flour, Water, Gluten, Salt, Mineral salts (500, 501, 341), Vegetable oil (Canola oil), Natural Colour (160b), Preservative (202)], Roasted Red Capsicum (10%) (Red Peppers, Water, Vinegar, Salt, Sugar), Wombok (7%), Red Onion (6%), Soy Sauce (6%) (Soy Bean, Wheat, Salt, Water), Bean Cross Cut (4%), Demerara Sugar (3.5%), Ginger Crushed (1%) (Acidity Regulator (270)), Canola Oil, Garlic Minced, Corn Starch, White Sesame Seeds, Salt, Black Pepper" },
            allergens: ["Gluten", "Wheat", "Sesame", "Soy"],
            food_type_id: 3,
        },
    })

    const food23 = await prisma.foods.upsert({
        where: { name: "CHICKEN & CHORIZO PAELLA" },
        update: {},
        create: {
            name: "CHICKEN & CHORIZO PAELLA",
            calories: 563,
            image: "ChickenChrizoWorkoutMeals_1120x.jpg",
            description: "A delectable classic with traditional Spanish style Paella with Australian chicken, chorizo and mixed vegetables.",
            ingredients: { ingredients: "Cooked Long Grain Rice (35%) (Long Grain Rice, Water), Chicken Breast(22%), Water, Chorizo (9%) [Pork, Salt, Modified Starch (1412), Spices,Corn Syrup Solids, Garlic, Wheat Fibre, Mineral Salt (451), Antioxidant(316), Preservative (250). Wood Smoked], Onion, Peas, Carrots, Celery, Fire Roasted Capsicum, Vegetable Oil, Chicken Style Stock Powder, Corn Starch, Crushed Garlic, Cajun Spice [Anticaking Agent (551), Colour (160a)],Paprika Powder, Turmeric, Cumin, Cracked Black Pepper." },
            allergens: ["Gluten", "Milk", "Soy"],
            food_type_id: 3,
        },
    })

    const food24 = await prisma.foods.upsert({
        where: { name: "PERI PERI CHICKEN & VEG" },
        update: {},
        create: {
            name: "PERI PERI CHICKEN & VEG",
            calories: 242,
            image: "PeriPeriChickenLowcarbWorkoutMeals_1120x.jpg",
            description: "Peri Peri Chicken & Vegetables",
            ingredients: { ingredients: "Chicken Breast (50%), Broccoli (20%), Green Beans (16%), Carrot (14%)" },
            allergens: [],
            food_type_id: 2,
        },
    })

    const food25 = await prisma.foods.upsert({
        where: { name: "TURKEY MINCE POKE BOWL" },
        update: {},
        create: {
            name: "TURKEY MINCE POKE BOWL",
            calories: 403,
            image: "pokebowl_1120x.webp",
            description: "You don’t need to be a hipster to enjoy our Turkey Poke Bowl! This the dish is loaded with good fats to support muscle strength and growth. You will love the Star Power of this deconstructed Poke, an all-year-round, health-orientated wonder meal.",
            ingredients: { ingredients: "Vermicelli rice noodles (53.8%), Turkey San Choy Bao (44.6%), Onion, Garlic, Soy Sauce, Chilli, Honey, Lemon Juice, Wombok, Carrots, Mint, Coriander, Crushed Peanuts, Spring Onion Raw (1.5%)." },
            allergens: ["Peanuts", "Sesame", "Soy", "Tree nuts"],
            food_type_id: 3,
        },
    })

    const food26 = await prisma.foods.upsert({
        where: { name: "BBQ GRILLED CHICKEN & SWEET POTATO" },
        update: {},
        create: {
            name: "BBQ GRILLED CHICKEN & SWEET POTATO",
            calories: 318,
            image: "0Z8FfSmw_1120x.jpg",
            description: "Savour this tantalising and zesty dish packed with delicious superfoods and loaded with hearty good fats.",
            ingredients: { ingredients: "Plain Sweet Potato Mash (50%) [sweet potato, olive oil, salt, pepper], Chicken (41.7%) [Chicken Breast], BBQ Sauce (8.3%) [Tomatoes (from Paste, Food Acid (Citric)) 45%, Sugar, Water, Cornflour (from WHEAT), Food Acids (Acetic, Citric), Salt, Glucose Syrup, Colour (Caramel (150c)), Thickener (Pectin), Tamarind Paste, Yeast Extract, Clove, Nutmeg, Onion 0.5%, Pepper]" },
            allergens: ["Gluten"],
            food_type_id: 2,
        },
    })

    const food27 = await prisma.foods.upsert({
        where: { name: "Whey Protein Isolate Chocolate" },
        update: {},
        create: {
            name: "Whey Protein Isolate Chocolate",
            calories: 120,
            image: "WheyProteinIsolateChocolate_1120x.jpg",
            description: "Whey Protein Isolate Chocolate",
            ingredients: { ingredients: "Whey Protein Isolate (Milk), Cocoa Powder, Natural Flavour, Sweetener (Sucralose)." },
            allergens: ["Milk"],
            food_type_id: 4,
        },
    })

    const food28 = await prisma.foods.upsert({
        where: { name: "Whey Protein Isolate Vanilla" },
        update: {},
        create: {
            name: "Whey Protein Isolate Vanilla",
            calories: 124,
            image: "WheyProteinIsolateVanilla_1120x.jpg",
            description: "Whey Protein Isolate Vanilla",
            ingredients: { ingredients: "Whey Protein Isolate (Milk), Natural Flavour, Sweetener (Sucralose)." },
            allergens: ["Milk"],
            food_type_id: 4,
        },
    })

    const food29 = await prisma.foods.upsert({
        where: { name: "Whey Protein Isolate Strawberry" },
        update: {},
        create: {
            name: "Whey Protein Isolate Strawberry",
            calories: 127,
            image: "WheyProteinIsolateStrawberry_1120x.jpg",
            description: "Whey Protein Isolate Strawberry",
            ingredients: { ingredients: "Whey Protein Isolate (Milk), Natural Flavour, Sweetener (Sucralose)." },
            allergens: ["Milk"],
            food_type_id: 4,
        },
    })

    const food30 = await prisma.foods.upsert({
        where: { name: "Whey Protein Isolate Banana" },
        update: {},
        create: {
            name: "Whey Protein Isolate Banana",
            calories: 127,
            image: "WheyProteinIsolateBanana_1120x.jpg",
            description: "Whey Protein Isolate Banana",
            ingredients: { ingredients: "Whey Protein Isolate (Milk), Natural Flavour, Sweetener (Sucralose)." },
            allergens: ["Milk"],
            food_type_id: 4,
        },
    })

    const food31 = await prisma.foods.upsert({
        where: { name: "PROTEIN BAR COOKIES & CREAM" },
        update: {},
        create: {
            name: "PROTEIN BAR COOKIES & CREAM",
            calories: 200,
            image: "ProteinBarCookiesCream_1120x.jpg",
            description: "Amazing source of Vitamin E laden with antioxidants and unsaturated fats to promote heart health and lowering cholesterol properties.",
            ingredients: { ingredients: "Protein Blend (Whey Protein Isolate (Milk), Whey Protein Concentrate (Milk), Milk Protein Isolate (Milk)), Milk Chocolate Coating (Sugar, Cocoa Butter, Whole Milk Powder, Cocoa Mass, Emulsifier (Soy Lecithin), Natural Vanilla Flavour), Humectant (Glycerol), Vegetable Oils (Palm, Palm Kernel, Coconut), Oligofructose, Sweetener (Sucralose), Flavouring, Salt, Emulsifier (Soy Lecithin), Colour (Caramel)." },
            allergens: ["Milk", "Soy"],
            food_type_id: 5,
        },
    })

    const food32 = await prisma.foods.upsert({
        where: { name: "PROBIOTICS, GINGER & CAYENNE PEPPER Juice" },
        update: {},
        create: {
            name: "PROBIOTICS, GINGER & CAYENNE PEPPER JUICE",
            calories: 20,
            image: "ProbioticsGingerCayennePepperJuice_1120x.jpg",
            description: "Amazing source of Vitamin E laden with antioxidants and unsaturated fats to promote heart health and lowering cholesterol properties.",
            ingredients: { ingredients: "Probiotics, Ginger & Cayenne Pepper Juice" },
            allergens: [],
            food_type_id: 5,
        },
    })

    const food33 = await prisma.foods.upsert({
        where: { name: "JUST ORANGE JUICE" },
        update: {},
        create: {
            name: "JUST ORANGE JUICE",
            calories: 93,
            image: "JustOrangeJuice_1120x.jpg",
            description: "Amazing source of Vitamin E laden with antioxidants and unsaturated fats to promote heart health and lowering cholesterol properties.",
            ingredients: { ingredients: "Orange Juice" },
            allergens: [],
            food_type_id: 5,
        },
    })

    const food34 = await prisma.foods.upsert({
        where: { name: "JUST APPLE JUICE" },
        update: {},
        create: {
            name: "JUST APPLE JUICE",
            calories: 96,
            image: "JustAppleJuice_1120x.jpg",
            description: "Amazing source of Vitamin E laden with antioxidants and unsaturated fats to promote heart health and lowering cholesterol properties.",
            ingredients: { ingredients: "Apple Juice" },
            allergens: [],
            food_type_id: 5,
        },
    })

    const food35 = await prisma.foods.upsert({
        where: { name: "JUST WATERMELON APPLE MINT" },
        update: {},
        create: {
            name: "JUST WATERMELON APPLE MINT",
            calories: 80,
            image: "JustWatermelonAppleMint_1120x.jpg",
            description: "Amazing source of Vitamin E laden with antioxidants and unsaturated fats to promote heart health and lowering cholesterol properties.",
            ingredients: { ingredients: "Watermelon, Apple, Mint" },
            allergens: [],
            food_type_id: 5,
        },
    })

    const intensities1 = await prisma.intensities.upsert({
        where: { level: "Low" },
        update: {},
        create: {
            level: "Low",
        },
    })

    const intensities2 = await prisma.intensities.upsert({
        where: { level: "Medium" },
        update: {},
        create: {
            level: "Medium",
        },
    })

    const intensities3 = await prisma.intensities.upsert({
        where: { level: "High" },
        update: {},
        create: {
            level: "High",
        },
    })

    const attendanceValue: Prisma.AttendanceTypesCreateInput[] = [
        { details: "pending" },
        { details: "attended" },
        { details: "absent" }
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




    const district1 = await prisma.districts.upsert({
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
            email: "purefitness@gmail.com",
            telephone: "12345678",
        },
    })

    const franchise2 = await prisma.franchise.upsert({
        where: { name: "24/7Fitness" },
        update: {},
        create: {
            name: "24/7Fitness",
            email: "247fitness@gmail.com",
            telephone: "23456789",
        },
    })

    const franchise3 = await prisma.franchise.upsert({
        where: { name: "SnapFitness" },
        update: {},
        create: {
            name: "SnapFitness",
            email: "Snapfitness@gmail.com",
            telephone: "34567890",
        },
    })

    const foodData = [
        {
            foods_id: food1.id,
            quantity: 10
        },
        {
            foods_id: food2.id,
            quantity: 10
        },
        {
            foods_id: food3.id,
            quantity: 10
        },
        {
            foods_id: food4.id,
            quantity: 10
        },
        {
            foods_id: food5.id,
            quantity: 10
        },
        {
            foods_id: food6.id,
            quantity: 10
        },
        {
            foods_id: food7.id,
            quantity: 10
        },
        {
            foods_id: food8.id,
            quantity: 10
        },
        {
            foods_id: food9.id,
            quantity: 10
        },
        {
            foods_id: food10.id,
            quantity: 10
        },
        {
            foods_id: food11.id,
            quantity: 10
        },
        {
            foods_id: food12.id,
            quantity: 10
        }, {
            foods_id: food13.id,
            quantity: 10
        }, {
            foods_id: food14.id,
            quantity: 10
        }, {
            foods_id: food15.id,
            quantity: 10
        }, {
            foods_id: food16.id,
            quantity: 10
        }, {
            foods_id: food17.id,
            quantity: 10
        }, {
            foods_id: food18.id,
            quantity: 10
        }, {
            foods_id: food19.id,
            quantity: 10
        }, {
            foods_id: food20.id,
            quantity: 10
        }, {
            foods_id: food21.id,
            quantity: 10
        }, {
            foods_id: food22.id,
            quantity: 10
        }, {
            foods_id: food23.id,
            quantity: 10
        }, {
            foods_id: food24.id,
            quantity: 10
        }, {
            foods_id: food25.id,
            quantity: 10
        }, {
            foods_id: food26.id,
            quantity: 10
        }, {
            foods_id: food27.id,
            quantity: 10
        }, {
            foods_id: food28.id,
            quantity: 10
        }, {
            foods_id: food29.id,
            quantity: 10
        }, {
            foods_id: food30.id,
            quantity: 10
        }, {
            foods_id: food31.id,
            quantity: 10
        }, {
            foods_id: food32.id,
            quantity: 10
        }, {
            foods_id: food33.id,
            quantity: 10
        }, {
            foods_id: food34.id,
            quantity: 10
        }, {
            foods_id: food35.id,
            quantity: 10
        }
    ]

    const gym1 = await prisma.gyms.create({
        data: {
            name: "PureFitness Causeway Bay",
            username: "pure_cwb",
            password: await hashPassword('pfcwb'),
            opening_hour: "10:00",
            closing_hour: "23:00",
            no_close: false,
            address: "Shop 101, 1/F, 1-3 Paterson Street, Causeway Bay, Hong Kong",
            google_position: { lat: 22.27847, lng: 114.18320 },
            franchise_id: franchise1.id,
            district_id: district1.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })

    const gym2 = await prisma.gyms.create({
        data: {
            name: "PureFitness Central",
            username: "pure_central",
            password: await hashPassword('pfcentral'),
            opening_hour: "10:00",
            closing_hour: "23:00",
            no_close: false,
            address: "Shop 1001, 10/F, 27-29 Paterson Street, Central, Hong Kong",
            google_position: { lat: 22.286163428803967, lng: 114.15916750054413 },
            franchise_id: franchise1.id,
            district_id: district2.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })

    const gym3 = await prisma.gyms.create({
        data: {
            name: "PureFitness Wan Chai",
            username: "pure_wc",
            password: await hashPassword('pfwc'),
            opening_hour: "10:00",
            closing_hour: "23:00",
            no_close: false,
            address: "Shop 101, 1/F, 39 Hinnessy Road,Wan Chai, Hong Kong",
            google_position: { lat: 22.278287400747722, lng: 114.16885263948282 },
            franchise_id: franchise1.id,
            district_id: district3.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })

    const gym4 = await prisma.gyms.create({
        data: {
            name: "PureFitness Tsim Sha Tsui",
            username: "pure_tst",
            password: await hashPassword('pftst'),
            opening_hour: "10:00",
            closing_hour: "23:00",
            no_close: false,
            address: "Shop 501, 5/F, 1-3 Star Road, Tsim Sha Tsui, Hong Kong",
            google_position: { lat: 22.29421531793089, lng: 114.17532064270728 },
            franchise_id: franchise1.id,
            district_id: district4.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })

    const gym5 = await prisma.gyms.create({
        data: {
            name: "PureFitness Monk Kok",
            username: "pure_mk",
            password: await hashPassword('pfmk'),
            opening_hour: "10:00",
            closing_hour: "23:00",
            no_close: false,
            address: "Shop 301, 3/F, 11-15 Neton Road, Monk Kok, Hong Kong",
            google_position: { lat: 22.318871736905805, lng: 114.1685881394834 },
            franchise_id: franchise1.id,
            district_id: district5.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })

    const gym6 = await prisma.gyms.create({
        data: {
            name: "24/7 Fitness Causeway Bay",
            username: "247_cwb",
            password: await hashPassword('247cwb'),
            no_close: true,
            address: "Shop 101, 1/F, 1-3 LeaGarden, Causeway Bay, Hong Kong",
            google_position: { lat: 22.28020809554962, lng: 114.1822722244828 },
            franchise_id: franchise2.id,
            district_id: district1.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })
    const gym7 = await prisma.gyms.create({
        data: {
            name: "24/7 Mongkok (Golden Era)",
            username: "247_mk",
            password: await hashPassword('247mk'),
            no_close: true,
            address: "7th Floor, Golden Era Plaza, 39-55 Sai Yee Street, Mongkok",
            google_position: { lat: 22.318378665803944, lng: 114.17175293726268 },
            franchise_id: franchise2.id,
            district_id: district1.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })
    const gym8 = await prisma.gyms.create({
        data: {
            name: "Snap Fitness Tin Hau",
            username: "sf_th",
            password: await hashPassword('sfth'),
            no_close: true,
            address: "1/F Kiu Hing Mansion 14 Kings Road, Tin Hau Hong Kong Eastern",
            google_position: { lat: 22.28295607090984, lng: 114.1924671612818 },
            franchise_id: franchise3.id,
            district_id: district1.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })
    const gym9 = await prisma.gyms.create({
        data: {
            name: "Snap Fitness Wan Chai",
            username: "sf_wc",
            password: await hashPassword('sfwc'),
            no_close: true,
            address: "1F, The Morrison 28 Yat Sin Street, Wan Chai Hong Kong Wan Chai",
            google_position: { lat: 22.277800953346745, lng: 114.17939403123557 },
            franchise_id: franchise3.id,
            district_id: district3.id,
            GymFoodStock: {
                createMany: {
                    data: foodData
                }
            }
        }
    })

    const trainers1 = await prisma.trainers.upsert({
        where: { name: "John" },
        update: {},
        create: {
            name: "John Chan",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/Alex-Ko.jpg",
            certifications: "Certified Personal Trainer, PFA Personal Fitness Trainer (Level II) Certification, NASM CERTIFIED PERSONAL TRAINER COURSE",
            franchise_id: franchise1.id,
        },
    })

    const trainers2 = await prisma.trainers.upsert({
        where: { name: "Ceci" },
        update: {},
        create: {
            name: "Ceci Lee",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/Jessica-Yau.jpg",
            certifications: " 200 Hour RYT Arcata, California 2022, Certified Strength and Conditioning Specialist® (CSCS®) 2022, NASM Certified Personal Trainer 2022",
            franchise_id: franchise1.id,
        },
    })

    const trainers3 = await prisma.trainers.upsert({
        where: { name: "James" },
        update: {},
        create: {
            name: "James Chou",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/bio_Alvin.jpg",
            certifications: "Fitness Kickboxing Instructor Certification ,NSCA Certified Personal Trainer®(NSCA-CPT®), Tactical Strength & Conditioning Facilitator®(TSAC-F®)",
            franchise_id: franchise1.id,
        },
    })

    const trainers4 = await prisma.trainers.upsert({
        where: { name: "Cindy" },
        update: {},
        create: {
            name: "Cindy Chan",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/bio_vera.jpg",
            certifications: "Myths and Science of Pilates Breathing , Pilates Touch ,Certified Personal Trainer, PFA Personal Fitness Trainer (Level II) Certification, NASM CERTIFIED PERSONAL TRAINER COURSE",
            franchise_id: franchise1.id,
        },
    })

    const trainers5 = await prisma.trainers.upsert({
        where: { name: "Angela Ming" },
        update: {},
        create: {
            name: "Angela Ming",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/Web-Bio42.jpg",
            certifications: "Total Body Tabata™ HIIT Instructor ,Certified Personal Trainer, PFA Personal Fitness Trainer (Level II) Certification, NASM CERTIFIED PERSONAL TRAINER COURSE",
            franchise_id: franchise2.id,
        },
    })

    const trainers6 = await prisma.trainers.upsert({
        where: { name: "Jason Wong" },
        update: {},
        create: {
            name: "Jason Wong",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/bio_Alex.jpg",
            certifications: "Certified Personal Trainer, PFA Personal Fitness Trainer (Level II) Certification, NASM CERTIFIED PERSONAL TRAINER COURSE",
            franchise_id: franchise2.id,
        },
    })
    const trainers7 = await prisma.trainers.create({
        data: {
            name: "Chris Hemsworth",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/chris.jpg",
            certifications: "",
            franchise_id: franchise3.id
        }
    })
    const trainers8 = await prisma.trainers.create({
        data: {
            name: "Dwayne Johnson",
            icon: "https://doeat.s3.ap-southeast-1.amazonaws.com/dwayne.jpg",
            certifications: "",
            franchise_id: franchise3.id
        }
    })


    const courseTypes1 = await prisma.courseTypes.upsert({
        where: { name: "Yoga" },
        update: {},
        create: {
            name: "Yoga",
        },
    })

    const courseTypes2 = await prisma.courseTypes.upsert({
        where: { name: "Pilates" },
        update: {},
        create: {
            name: "Pilates",
        },
    })

    const courseTypes3 = await prisma.courseTypes.upsert({
        where: { name: "HIIT" },
        update: {},
        create: {
            name: "HIIT",
        },
    })

    const courseTypes4 = await prisma.courseTypes.upsert({
        where: { name: "Boxing" },
        update: {},
        create: {
            name: "Boxing",
        },
    })

    const course1 = await prisma.courses.create({
        data: {
            name: "Yoga Beginner",
            credits: 1,
            course_type_id: courseTypes1.id,
            gym_id: gym1.id,
            intensity_id: intensities1.id,
            duration: 60,
            calories: 450,
            default_trainer_id: trainers2.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers2.id,
                            quota: 20,
                            time: new Date('2023-04-20T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers1.id,
                            quota: 20,
                            time: new Date('2023-04-21T17:00:00+08:00')
                        },
                        {
                            trainer_id: trainers2.id,
                            quota: 20,
                            time: new Date('2023-04-22T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course2 = await prisma.courses.create({
        data: {
            name: "Yoga Intermediate",
            credits: 2,
            course_type_id: courseTypes1.id,
            gym_id: gym1.id,
            intensity_id: intensities2.id,
            duration: 60,
            calories: 600,
            default_trainer_id: trainers2.id,
            default_quota: 20,

        },
    })

    const course3 = await prisma.courses.create({
        data: {
            name: "Yoga Advanced",
            credits: 3,
            course_type_id: courseTypes1.id,
            gym_id: gym3.id,
            intensity_id: intensities3.id,
            duration: 60,
            calories: 800,
            default_trainer_id: trainers2.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers2.id,
                            quota: 20,
                            time: new Date('2023-04-20T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers2.id,
                            quota: 20,
                            time: new Date('2023-04-21T17:00:00+08:00')
                        },
                        {
                            trainer_id: trainers2.id,
                            quota: 20,
                            time: new Date('2023-04-22T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course4 = await prisma.courses.create({
        data: {
            name: "Pilates Beginner",
            credits: 1,
            course_type_id: courseTypes2.id,
            gym_id: gym2.id,
            intensity_id: intensities1.id,
            duration: 60,
            calories: 450,
            default_trainer_id: trainers4.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers3.id,
                            quota: 20,
                            time: new Date('2023-04-20T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers4.id,
                            quota: 20,
                            time: new Date('2023-04-21T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers3.id,
                            quota: 20,
                            time: new Date('2023-04-25T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course5 = await prisma.courses.create({
        data: {
            name: "Pilates Intermediate",
            credits: 2,
            course_type_id: courseTypes2.id,
            gym_id: gym2.id,
            intensity_id: intensities2.id,
            duration: 60,
            calories: 600,
            default_trainer_id: trainers4.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers4.id,
                            quota: 20,
                            time: new Date('2023-04-20T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers1.id,
                            quota: 20,
                            time: new Date('2023-04-21T17:00:00+08:00')
                        },
                        {
                            trainer_id: trainers2.id,
                            quota: 20,
                            time: new Date('2023-04-22T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course6 = await prisma.courses.create({
        data: {
            name: "Pilates Advanced",
            credits: 3,
            course_type_id: courseTypes2.id,
            gym_id: gym4.id,
            intensity_id: intensities3.id,
            duration: 60,
            calories: 800,
            default_trainer_id: trainers4.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-02T09:00:00+08:00'),
                        },
                        {
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-03T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-04T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-05T09:00:00+08:00')
                        }
                        ,{
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-06T09:00:00+08:00')
                        }
                        ,{
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-07T09:00:00+08:00')
                        }
                        ,{
                            trainer_id: trainers4.id,
                            quota: 1,
                            time: new Date('2023-04-08T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course7 = await prisma.courses.create({
        data: {
            name: "HIIT Beginner",
            credits: 1,
            course_type_id: courseTypes3.id,
            gym_id: gym6.id,
            intensity_id: intensities1.id,
            duration: 60,
            calories: 450,
            default_trainer_id: trainers5.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers5.id,
                            quota: 20,
                            time: new Date('2023-04-23T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers5.id,
                            quota: 20,
                            time: new Date('2023-04-26T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers5.id,
                            quota: 20,
                            time: new Date('2023-04-28T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course8 = await prisma.courses.create({
        data: {
            name: "HIIT Intermediate",
            credits: 2,
            course_type_id: courseTypes3.id,
            gym_id: gym6.id,
            intensity_id: intensities2.id,
            duration: 60,
            calories: 600,
            default_trainer_id: trainers5.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers5.id,
                            quota: 20,
                            time: new Date('2023-04-28T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers5.id,
                            quota: 20,
                            time: new Date('2023-04-29T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers5.id,
                            quota: 20,
                            time: new Date('2023-04-30T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course9 = await prisma.courses.create({
        data: {
            name: "HIIT Advanced",
            credits: 3,
            course_type_id: courseTypes3.id,
            gym_id: gym7.id,
            intensity_id: intensities3.id,
            duration: 60,
            calories: 800,
            default_trainer_id: trainers6.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-02T17:00:00+08:00')
                        },
                        {
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-03T17:00:00+08:00')
                        },
                        {
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-04T17:00:00+08:00')
                        },
                        {
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-05T17:00:00+08:00')
                        }
                        ,{
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-06T17:00:00+08:00')
                        }
                        ,{
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-07T17:00:00+08:00')
                        }
                        ,{
                            trainer_id: trainers6.id,
                            quota: 1,
                            time: new Date('2023-04-08T17:00:00+08:00')
                        },{
                            trainer_id: trainers6.id,
                            quota: 10,
                            time: new Date('2023-04-23T17:00:00+08:00')
                        }

                    ]
                }
            }
        },
    })

    const course10 = await prisma.courses.create({
        data: {
            name: "Boxing Beginner",
            credits: 1,
            course_type_id: courseTypes4.id,
            gym_id: gym8.id,
            intensity_id: intensities1.id,
            duration: 60,
            calories: 450,
            default_trainer_id: trainers8.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers8.id,
                            quota: 20,
                            time: new Date('2023-04-23T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers8.id,
                            quota: 20,
                            time: new Date('2023-04-25T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers8.id,
                            quota: 20,
                            time: new Date('2023-04-26T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course11 = await prisma.courses.create({
        data: {
            name: "Boxing Intermediate",
            credits: 2,
            course_type_id: courseTypes4.id,
            gym_id: gym8.id,
            intensity_id: intensities2.id,
            duration: 60,
            calories: 600,
            default_trainer_id: trainers7.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers7.id,
                            quota: 20,
                            time: new Date('2023-04-22T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers7.id,
                            quota: 20,
                            time: new Date('2023-04-23T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers7.id,
                            quota: 20,
                            time: new Date('2023-04-27T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const course12 = await prisma.courses.create({
        data: {
            name: "Boxing Advanced",
            credits: 3,
            course_type_id: courseTypes4.id,
            gym_id: gym8.id,
            intensity_id: intensities3.id,
            duration: 60,
            calories: 800,
            default_trainer_id: trainers8.id,
            default_quota: 20,
            courseSchedules: {
                createMany: {
                    data: [
                        {
                            trainer_id: trainers8.id,
                            quota: 20,
                            time: new Date('2023-04-22T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers8.id,
                            quota: 20,
                            time: new Date('2023-04-23T09:00:00+08:00')
                        },
                        {
                            trainer_id: trainers8.id,
                            quota: 20,
                            time: new Date('2023-04-27T09:00:00+08:00')
                        }
                    ]
                }
            }
        },
    })

    const UserScheduleAddData = []
    const calorieTransactionData = []
    const coursesdata = await prisma.courseSchedules.findMany({
        include:{
            courses:{
                select:{
                    calories:true
                }
            }
        },
        where:{
            OR:[
                {course_id:course9.id},
                {course_id:course6.id}
            ]
        }
    })
    coursesdata.map(elem=>{
        UserScheduleAddData.push(
            {
                user_id: user1.id,
                course_schedule_id:elem.id,
                attendance_type_id: 2
            }
        )
        calorieTransactionData.push(
            {
                user_id:user1.id,
                calorie: elem.courses.calories,
                transaction_type_id: calorieTransactionAdd.id,
                details: "joined course"
            }
        )
    })


    const UserScheduleAdd = await prisma.userSchedule.createMany({
        data: UserScheduleAddData
    })
    const creditTransactionAdd = await prisma.creditTransactionType.create({
        data: {
            name: "add",
        }
    })

    const creditTransactionMinus = await prisma.creditTransactionType.create({
        data: {
            name: "minus"
        }
    })

    const creditTransaction1 = await prisma.creditTransaction.create({
        data: {
            credit: 0,
            credit_transaction_type_id: creditTransactionAdd.id,
            user_id: user1.id,
            details: "test add"
        }
    })

    const creditTransaction2 = await prisma.creditTransaction.create({
        data: {
            credit: 20,
            credit_transaction_type_id: creditTransactionAdd.id,
            user_id: user2.id,
            details: "test add"
        }
    })

    const calorieTransaction = await prisma.calorieTransaction.createMany({
        data:calorieTransactionData
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
