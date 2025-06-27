import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/*

! To run seed, use command 'npx prisma db seed'

 * MCAS: core requirements generated (use for other schools)
  * COMPLETED MAJORS: Computer Science (BA),
* 
* Randomly created courses: 
*/

//TODO: 1. Connect logic for MATH2216 to the OR group below, Connect to MATH1103 using an AND group (2)
//1.  await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "OR",
  //     requiredFor: { connect: { id: courseMap["CSCI2244"].id } },
  //     prerequisites: { connect: [{ id: courseMap["CSCI2243"].id }] }
  //   }
  // });

  //2.  await prisma.prerequisiteGroup.create({
  //   data: {
  //     type: "AND",
  //     requiredFor: { connect: { id: courseMap["CSCI2244"].id } },
  //     prerequisites: { connect: [{ id: <MATH1103.id> }] }
  //   }
  // });

try {

    //! Get / Create the Major

    //! Get / Create the school 

    const MCAS = await prisma.school.findUnique({
      where: {
        acronym: "MCAS"
      }
    })

    //! Create some Courses
    // await prisma.course.createMany({
    //   data: [
    //     { title: "Art Core", credits: 3 },
    //     { title: "Cultural Diversity Core", credits: 3 },
    //     { title: "History Core 1", credits: 3 },
    //     { title: "History Core 2", credits: 3 },
    //     { title: "Literature Core", credits: 3 },
    //     { title: "Math Core", credits: 3 },
    //     { title: "Natural Science Core 1", credits: 3 },
    //     { title: "Natural Science Core 2", credits: 3 },
    //     { title: "Philosophy Core 1", credits: 3 },
    //     { title: "Philosophy Core 2", credits: 3 },
    //     { title: "Social Science Core 1", credits: 3 },
    //     { title: "Social Science Core 2", credits: 3 },
    //     { title: "Theology Core 1", credits: 3 },
    //     { title: "Theology Core 2", credits: 3 },
    //     { title: "Writing Core", credits: 3 },
    //   ],
    // });

  //! Manually retrieve the created courses
  const courseNames = [
    "Art Core", "Cultural Diversity Core", "History Core 1", "History Core 2",
    "Literature Core", "Math Core", "Natural Science Core 1",  "Natural Science Core 2",
    "Philosophy Core 1", "Philosophy Core 2", "Social Science Core 1", "Social Science Core 2",
    "Theology Core 1", "Theology Core 2", "Writing Core"
  ];

  const courseMap = {};
  for (const name of courseNames) {
    const course = await prisma.course.findUnique({ 
      where: {
         title: name 
      } 
    });
    courseMap[name] = course;
  }

  //! Add prerequisites 
  await prisma.prerequisiteGroup.create({
    data: {
      type: "AND",
      requiredFor: { connect: { id: courseMap["History Core 2"].id } },
      prerequisites: { connect: [{ id: courseMap["History Core 1"].id }] }
    }
  });
  await prisma.prerequisiteGroup.create({
    data: {
      type: "AND",
      requiredFor: { connect: { id: courseMap["Natural Science Core 2"].id } },
      prerequisites: { connect: [{ id: courseMap["Natural Science Core 1"].id }] }
    }
  });
  await prisma.prerequisiteGroup.create({
    data: {
      type: "AND",
      requiredFor: { connect: { id: courseMap["Philosophy Core 2"].id } },
      prerequisites: { connect: [{ id: courseMap["Philosophy Core 1"].id }] }
    }
  });
  await prisma.prerequisiteGroup.create({
    data: {
      type: "AND",
      requiredFor: { connect: { id: courseMap["Social Science Core 2"].id } },
      prerequisites: { connect: [{ id: courseMap["Social Science Core 1"].id }] }
    }
  });
  await prisma.prerequisiteGroup.create({
    data: {
      type: "AND",
      requiredFor: { connect: { id: courseMap["Theology Core 2"].id } },
      prerequisites: { connect: [{ id: courseMap["Theology Core 1"].id }] }
    }
  });

  //! Create Requirements 
  await prisma.requirement.createMany({
    data: Object.values(courseMap).map(course => ({
      requirementType: "CORE",
      schoolId: MCAS.id,
      courseId: course.id
    }))
  });

  console.log('full seed successful');
} catch (error) {
  console.error('❌ Error during seed:', error);
} finally {
  await prisma.$disconnect();
}