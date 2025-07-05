//schema (db table details here)

//it should be from pg-core, because we are using the postgressSql, but if added export by indirect way may come inside the sql related import, not do that.
import { pgTable,json,serial,varchar } from "drizzle-orm/pg-core";

//pgTable to create a table, inside it contains the variables in the table

export const CourseList=pgTable('courseList',{ //the tab;ename, should be same as the export name
    id:serial('id').primaryKey(), //serial means auto generated value and its here primarykey
    courseId: varchar('courseId').notNull(), //type of varchar and it cannot be null
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput:json('courseOutput').notNull(), // the course Details from the gemini, should be of type json
    createdBy: varchar('createdBy').notNull(),
    userName:varchar('userName').notNull(),
    UserProfileImage:varchar('UserProfileImage') //not mandatory
})