import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

try {
    // Create the School
    // const school = await prisma.school.create({
    //   data: {
    //   name: "Morrissey College of Arts and Sciences",
    //   acronym: "MCAS"
    //   }, 
    // });

    // Get the Major
    const CS = await prisma.major.findUnique({
      where: {
          name: "Computer Science",
          majorType: "BA",
      },
    });

    // // Create some Courses
    // await prisma.course.createMany({
    //   data: [
    //     { title: "Computer Science 1", code: "CSCI1101", credits: 3 },
    //     { title: "Computer Science 2", code: "CSCI1102", credits: 3 },
    //     { title: "Computer Systems", code: "CSCI2271", credits: 3 },
    //     { title: "Computer Organization", code: "CSCI2272", credits: 4 },
    //     { title: "Logic and Computation", code: "CSCI2243", credits: 3 },
    //     { title: "Randomness and Computation", code: "CSCI2244", credits: 3 },
    //     { title: "Algorithms", code: "CSCI3383", credits: 3 },
    //     { title: "Computer Science Elective 2000+", code: "CSCI2000+", credits: 3},
    //     { title: "Computer Science Elective 3000+", code: "CSCI3000+", credits: 3},
    //   ],
    // });

  // Manually retrieve the created courses
  const courseCodes = [
    "CSCI1101", "CSCI1102", "CSCI2271", "CSCI2272",
    "CSCI2243", "CSCI2244", "CSCI3383", "CSCI2000+", "CSCI3000+"
  ];

  const courseMap = {};
  for (const code of courseCodes) {
    const course = await prisma.course.findUnique({ where: { code } });
    courseMap[code] = course;
  }
  // // Add prerequisites 

  // await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "AND",
  //     requiredFor: { connect: { id: courseMap["CSCI1102"].id } },
  //     prerequisites: { connect: [{ id: courseMap["CSCI1101"].id }] }
  //   }
  // });

  // await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "AND",
  //     requiredFor: { connect: { id: courseMap["CSCI2271"].id } },
  //     prerequisites: { connect: [{ id: courseMap["CSCI1102"].id }] }
  //   }
  // });

  // await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "AND",
  //     requiredFor: { connect: { id: courseMap["CSCI2272"].id } },
  //     prerequisites: { connect: [{ id: courseMap["CSCI1101"].id }] }
  //   }
  // });

  // await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "AND",
  //     requiredFor: { connect: { id: courseMap["CSCI2243"].id } },
  //     prerequisites: { connect: [{ id: courseMap["CSCI1101"].id }] }
  //   }
  // });

  // // Logic OR MATH2216 (only Logic exists for now), must add MATH2216 Later
  // await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "OR",
  //     requiredFor: { connect: { id: courseMap["CSCI2244"].id } },
  //     prerequisites: { connect: [{ id: courseMap["CSCI2243"].id }] }
  //   }
  // });

  // // Add MATH1103 separately when it exists
  // // await prisma.prerequisiteGroup.create({
  // //   data: {
  // //     type: "AND",
  // //     requiredFor: { connect: { id: courseMap["CSCI2244"].id } },
  // //     prerequisites: { connect: [{ id: <MATH1103.id> }] }
  // //   }
  // // });

  // await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "AND",
  //     requiredFor: { connect: { id: courseMap["CSCI3383"].id } },
  //     prerequisites: {
  //       connect: [
  //         { id: courseMap["CSCI1102"].id },
  //         { id: courseMap["CSCI2243"].id },
  //         { id: courseMap["CSCI2244"].id },
  //       ]
  //     }
  //   }
  // });

  // Create Major Requirements 
  await prisma.requirement.createMany({
    data: Object.values(courseMap).map(course => ({
      requirementType: "MAJOR",
      majorId: CS.id,
      courseId: course.id
    }))
  });

  console.log('full seed successful');
} catch (error) {
  console.error('❌ Error during seed:', error);
} finally {
  await prisma.$disconnect();
}